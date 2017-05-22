import sample_projects from '../services/samples/projects.json'
import sample_trackers from '../services/samples/trackers.json'
import sample_issue_statuses from '../services/samples/issue_statuses.json';
import sample_users from '../services/samples/users.json';
import moment from 'moment'

const projects = sample_projects.projects;
const trackers = sample_trackers.trackers;
const list_of_statuses = sample_issue_statuses.issue_statuses;
const list_of_users = sample_users.users;

export function findOperatorIn(string){
  if(string.indexOf(':') > 0)
    return ':';
  if(string.indexOf('=') > 0)
    return '=';
  if(string.indexOf('<') > 0)
    return '<';
  if(string.indexOf('>') > 0)
    return '>';
}

export function to_s(object){

  if(isString(object)){
    return object;
  }else{
    if (object.name){
      return object.name;
    }else{
      if (object.firstname && object.lastname){
        return object.firstname + ' ' + object.lastname;
      }else{
        return JSON.stringify(object);
      }
    }
  }
}

export function parseInput(input){

  log(input);

  let words = splitByKeyValue(input);
  let filters = {text:""};

  log("words", words);

  words.forEach(function(word){

    log(word);

    let operator = findOperatorIn(word);

    if(operator){
      let key_value = word.split(operator);
      let key = key_value[0];
      let value = key_value[1];
      switch(key.toLowerCase()){
        case 'projects':
          filters.projects = {operator: operator, value: getIdByValue(projects, value) || value};
          break;
        case 'trackers':
          filters.trackers = {operator: operator, value: getIdByValue(trackers, value) || value};
          break;
        case 'status':
          filters.issue_statuses = {operator: operator, value: getIdByValue(list_of_statuses, value) || value};
          break;
        case 'watched':
          filters.watched = {operator: operator, value: convertToBoolean(value)};
          break;
        case 'assigned_to':
          filters.assigned_to = {operator: operator, value: getIdByValue(list_of_users, value) || value};
          break;
        case 'updated_at':
          filters.updated_at = {operator: operator, value: convertToStringDate(value)};
          break;
        default:
          if(exists(word)){
            if(exists(filters.text))
              filters.text += " ";
            filters.text += word;
          }
          // _this.props.updateSelectedFilters({text: content_filter});
          // text += word + " ";
      }
      console.log("key="+key_value[0]);
      console.log("value="+key_value[1]);
    }else{
      if(exists(word)){
        if(exists(filters.text))
          filters.text += " ";
        filters.text += word;
      }
      // _this.props.updateSelectedFilters({text: content_filter});
      // text += word + ' ';
    }
  });

  return filters;
}

export function findByAttribute(array, attr, value) {
  if(array != undefined){
    for(let i = 0; i < array.length; i += 1) {
      if(array[i][attr] === value) {
        return i;
      }
    }
  }else{
    return undefined;
  }
}

export function log(string, object = undefined){
  let print = "";
  if(object){
    print = string + " : " + JSON.stringify(object);
  }else{
    print = string;
  }
  console.log(print);
  return print;
}

export function splitByKeyValue(input){
  // Split input by key:value (with quotes)
  const regexp = /[^\W]+(:|=)"([^"]*)"|[^\s"]+/gi;
  let words = [];
  let match;
  do {
    //Each call to exec returns the next regex match as an array
    match = regexp.exec(input);
    if (match != null)
    {
      //Index 1 in the array is the captured group if it exists
      //Index 0 is the matched text, which we use if no captured group exists
      // words.push(match[1] ? match[1] : match[0]);
      words.push(match[0]);
    }
  } while (match != null);
  return words
}

export function merge(o1, o2){
  let merged_object = {};
  Object.assign(merged_object, o1, o2);
  return merged_object;
}

export function operator_of(filter){
  if (filter){
    return filter.operator;
  }else{
    return "=";
  }
}

export function value_of(filter){
  if (filter){
    return filter.value;
  }else{
    return undefined;
  }
}

export function getNamesFromIds(array, ids){
  let names = [];
  if(ids instanceof Array){
    for (let id of ids) {
      let name = getNameFromId(array, id);
      if(name){
        names.push(name);
      }
    }
  }else{
    let name = getNameFromId(array, ids);
    if(name) {
      names.push(name);
    }
  }
  return names;
}

export function getNameFromId(array, id){
  let element = array.find(function (d) {
    return d.id == id;
  });
  if(element){
    return to_s(element);
  }else{
    return undefined;
  }
}

export function getIdFromName(array, name){
  let element = array.find(function (d) {
    return to_s(d).toLowerCase() === name.toLowerCase();
  });
  if(element){
    return element.id
  }else{
    return undefined
  }
}

export function getIdByValue(array, value){
  if(value==parseInt(value)){
    // value is an ID
    return parseInt(value)
  }else{
    // value is a string
    value = value.replace(/"/g, '');
    return getIdFromName(array, value)
  }
}

export function convertFilterToText(key, content){
  let operator = content.operator;
  let value = content.value;

  log("convertFilterToText(key)", key);
  log("convertFilterToText(operator)", operator);
  log("convertFilterToText(value)", value);

  if(key==="issue_statuses")
    key="status";
  if(key==="text"){
    return content;
  }else{
    value = getNameFromValue(key, value);
    if(exists(value)){
      value = surroundWithQuotesIfNecessary(value);
      return key + operator + value + ' ';
    }else{
      return "";
    }
  }
}

export function surroundWithQuotesIfNecessary(value){
  log("surroud if necessary", value);
  if(isString(value) && value.indexOf(' ')>0){
    return "\"" + value + "\""
  }else{
    return value
  }
}

export function isString(value){
  return (typeof value === 'string' || value instanceof String);
}

export function getNameFromValue(key, value){
  if(exists(value)){
    switch(key){
      case 'projects':
        return getNameFromId(projects, getIdByValue(projects, value)) || value;
      case 'trackers':
        return getNameFromId(trackers, getIdByValue(trackers, value)) || value;
      case 'status':
        return getNameFromId(list_of_statuses, getIdByValue(list_of_statuses, value)) || value;
      default:
        return value;
    }
  }else{
    return "";
  }
}

export function exists(value){
  if( value != undefined && (value > 0 || value.length > 0 || typeof value === "boolean" || typeof value === "object") ){
    return true;
  }else{
    return false;
  }
}

export function convertFiltersToText(filters){
  let complete_filters_as_text = "";
  for(let key in filters){
    if(key!=='text') {
      complete_filters_as_text += convertFilterToText(key, filters[key]);
    }
  }
  if(exists(filters['text'])){
    complete_filters_as_text += convertFilterToText('text', filters['text']);
  }
  return complete_filters_as_text;
}

export function removeBlankAttributes(object){

  log("start", object);

  let obj = Object.assign({}, object);
  Object.keys(obj).forEach(key => ((obj[key]!==false && !obj[key]) || JSON.stringify(obj[key])===JSON.stringify({}) ) && delete obj[key]);

  log("removeBlankAttributes", obj);

  return obj;
}

export function normalizeFilter(filters){
  log("10 - normalizeFilter", filters);

  let normalized_filter = {};
  for (let filter_key in filters) {

    if(filter_key=="text"){
      normalized_filter[filter_key] = filters[filter_key];
    }else{
      if(filters[filter_key]){
        normalized_filter[filter_key] = normalized_filter[filter_key] || {};
        normalized_filter[filter_key].operator = filters[filter_key].operator;

        if(filters[filter_key].value == parseInt(filters[filter_key].value)){
          normalized_filter[filter_key].value = parseInt(filters[filter_key].value);
        }else{
          normalized_filter[filter_key].value = filters[filter_key].value;
        }
      }
    }
  }
  log("19 - normalizeFilter", normalized_filter);
  return normalized_filter;
}

export function filter_value(op, val){
  return {operator: op, value: val}
}

export function convertToBoolean(value){

  log('convertToBoolean', value);

  if (isString(value)){
    value = value.toLowerCase();
  }
  return (value != 'false' && value != '0' && value != 'no' && value!==false);
}

export function convertToStringDate(value){
  log(value);
  let date = moment(value, "DD/MM/YYYY");
  if(date.isValid()){
    return date.format("DD/MM/YYYY");
  }else{
    return "";
  }
}

export function getFilterValue(filter){
  if(filter){
    if(filter.value){
      return filter.value
    }else{
      return filter
    }
  }else{
    return "";
  }
}
