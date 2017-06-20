import {filter_value, surroundWithQuotesIfNecessary} from "../helpers/helper_functions"
import {AVAILABLE_FILTERS} from "../helpers/constants"
import moment from 'moment'

export const custom_queries = [
    {title: "Mes demandes par priorité",
      filter: {assigned_to:filter_value('=', "me"),
               order:filter_value('=', "priority")}},
    {title: "Demandes surveillées",
      filter: {watched:filter_value('=', "true")}},
    {title: "Traité sans activité récente",
      filter: {status:filter_value('=', 3),
               updated_at:filter_value('<', moment().subtract(2, 'months').format("DD/MM/YYYY"))}},
    {title: "Filtres du permanent",
      filter: {status:filter_value('=',"open"),
               assigned_to:filter_value('!*')}}
];

// Init available filters for Auto-Complete
export const basic_options = initBasicOptions();
export const advanced_options = initAdvancedOptions();
export const custom_queries_options = initCustomQueriesOptions();

function initCustomQueriesOptions(){
  let custom_queries_options = [];
  {
    custom_queries.forEach(function (query) {
      custom_queries_options.push({title: query.title,
        key: query.title,
        filter: query.filter,
        action: "custom_query"
      });
    })
  }
  custom_queries_options.push({title: "Recherche avancée",
    key: "Recherche avancée",
    action: "open_form"
  });

  return custom_queries_options;
}

function initBasicOptions() {
  let options = [];
  {
    Object.keys(AVAILABLE_FILTERS).forEach(function (key) {
      let operators = AVAILABLE_FILTERS[key].type.operators;
      if (operators.length > 1) {
        options.push({title: key, key: key});
      } else {
        operators.map(function (operator, i) {
          let option = key + operator;
          options.push({title: option, key: key + i});
        });
      }
    })
  }
  return options;
}

export function initAdvancedOptions() {
  let options = [];
  {
    Object.keys(AVAILABLE_FILTERS).forEach(function (key) {
      AVAILABLE_FILTERS[key].type.operators.map(function (operator, i) {

        let option = key + operator;
        let possible_values = AVAILABLE_FILTERS[key].values;
        let magic_values = AVAILABLE_FILTERS[key].magic_values;
        if(magic_values && magic_values.length>0){
          for (let [index, val] of magic_values.entries()) {
            let key = `${option}-${i}-${index}`;
            options.push({title: option + surroundWithQuotesIfNecessary(val.text), key: key});
          }
        }else if (possible_values && possible_values.length > 0 && possible_values.length < 5) {
          for (let [index, val] of possible_values.entries()) {
            let key = `${option}-${i}-${index}`;
            options.push({title: option + surroundWithQuotesIfNecessary(val.name), key: key});
          }
        }
        options.push({title: option, key: `${option}-${i}`});
      });

    })
  }
  return options;
}
