import sample_projects from '../services/samples/projects.json'
import sample_trackers from '../services/samples/trackers.json'

const projects = sample_projects.projects;
const trackers = sample_trackers.trackers;

export function getNamesFromIds(array, ids){
  var names = [];
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
  var element = array.find(function (d) {
    return d.id == id;
  });
  if(element){
    return element.name
  }else{
    return undefined
  }
}

export function getIdFromName(array, name){
  var element = array.find(function (d) {
    return d.name.toLowerCase() === name.toLowerCase();
  });
  if(element){
    return element.id
  }else{
    return 0
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

export function convertFilterToText(key, value){
  if(key==='text'){
    return value;
  }else{
    value = getNameFromValue(key, value);
    if(exists(value)){
      value = surroundWithQuotesIfNecessary(value);
      return key + ':' + value + ' ';
    }else{
      return "";
    }
  }
}

export function surroundWithQuotesIfNecessary(value){
  if(value.indexOf(' ')>0){
    return "\"" + value + "\""
  }else{
    return value
  }
}

export function getNameFromValue(key, value){
  if(exists(value)){
    switch(key){
      case 'projects':
        return getNameFromId(projects, getIdByValue(projects, value));
      case 'trackers':
        return getNameFromId(trackers, getIdByValue(trackers, value));
      default:
        return value;
    }
  }else{
    return "";
  }
}

export function exists(value){
  if(value && (value > 0 || value.length > 0)){
    return true;
  }else{
    return false;
  }
}

export function convertFiltersToText(filters){
  let complete_filters_as_text = "";
  for(var key in filters){
    if(key!=='text')
      complete_filters_as_text += convertFilterToText(key, filters[key]);
  }
  if(filters['text'] && filters['text'].length>0){
    complete_filters_as_text += convertFilterToText('text', filters['text']);
  }
  return complete_filters_as_text;
}

export function removeBlankAttributes(object){
  var obj = Object.assign({}, object);
  Object.keys(obj).forEach(key => !obj[key] && delete obj[key]);
  return obj;
}

export function normalizeFilter(filters){
  var normalized_filter = {};
  for (var filter_key in filters) {
    if(filters[filter_key] == parseInt(filters[filter_key])){
      normalized_filter[filter_key] = parseInt(filters[filter_key]);
    }else{
      normalized_filter[filter_key] = filters[filter_key];
    }
  }
  return normalized_filter;
}
