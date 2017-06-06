import React, { Component } from 'react';
import './App.css';

// import ServiceAPI from './services/service_api'
import sample_issues from './services/samples/issues.json';

import NavBarMenu from './header/navbarmenu'
import IssuesList from './issues/index'
import ListCurrentFilters from './current_filters'

import {convertFiltersToText, normalizeFilter, removeBlankAttributes, log, parseInput, value_of, exists, merge} from './helpers/helper_functions'

const default_filters = {text:""}; /*{
  projects: 0,
  trackers: 0,
  text: ""
};
*/

// Check if a filter has been entered in the Content form textfield
let lookForFiltersInText = function(selected_filters){
  if (exists(selected_filters.text)){
    let filtersInText = parseInput(selected_filters.text);
    Object.keys(filtersInText).forEach(function(key) {
      if(key=='text'){
        selected_filters = merge(selected_filters, {
          text: filtersInText.text.trim(),
        });
      }else{
        let new_obj = {};
        new_obj[key] = filtersInText[key];
        selected_filters = merge(selected_filters, new_obj);
      }
    });
  }
  return selected_filters;
};

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      current_filters: default_filters,
      selected_filters: default_filters,
      selected_filters_as_text: "",
      displayed_issues: [],
      loading: true,
      areFiltersDirty: false
    };
    this.replaceSelectedFilters = this.replaceSelectedFilters.bind(this);
    this.updateSelectedFilters = this.updateSelectedFilters.bind(this);
    this.updateSelectedFiltersAsText = this.updateSelectedFiltersAsText.bind(this);
    this.applyFiltersChanges = this.applyFiltersChanges.bind(this);
    this.updateIssues = this.updateIssues.bind(this);
    this.compareSelectedAndAppliedFilters = this.compareSelectedAndAppliedFilters.bind(this);
    this.syncSelectedFiltersWithCurrents = this.syncSelectedFiltersWithCurrents.bind(this);
  }

  replaceSelectedFilters(new_filter, and_apply=false){
    log("START replace selected filters", new_filter);

    new_filter = normalizeFilter(new_filter);

    log("normalized", new_filter);

    var new_selection;
    if(JSON.stringify(new_filter)===JSON.stringify({})){ // Re-init filters
      new_selection = default_filters;
    }else{
      new_selection = removeBlankAttributes(new_filter);
      log("no blank attributes", new_selection);
    }
    this.setState({selected_filters: new_selection}, function() {

      console.log("001 : state = " + JSON.stringify(this.state.selected_filters));

      if(and_apply){
        this.applyFiltersChanges();
      }else{
        this.compareSelectedAndAppliedFilters();
      }
    });
  }

  updateSelectedFilters(new_filter, and_apply=false){
    console.log("START update selected filters : " + JSON.stringify(new_filter));
    new_filter = normalizeFilter(new_filter);
    var new_selection;
    if(JSON.stringify(new_filter)===JSON.stringify({})){ // Re-init filters
      // console.log("REINIT FILTERS");
      new_selection = default_filters;
    }else{
      // log("2 new_filter", new_filter);
      new_selection = Object.assign({},this.state.selected_filters, new_filter);
      // log("3 new_selection", new_selection);
      new_selection = removeBlankAttributes(new_selection);
    }
    this.setState({selected_filters: new_selection}, function() {
      // console.log("001 : state = " + JSON.stringify(this.state.selected_filters));
      this.updateSelectedFiltersAsText();
      if(and_apply){
        this.applyFiltersChanges();
      }else{
        this.compareSelectedAndAppliedFilters();
      }
    });
    return this.selected_filters;
  }

  updateSelectedFiltersAsText() {
    log("SELECTED FILTERS AS TEXT", this.state.selected_filters);
    let text_filter = convertFiltersToText(this.state.selected_filters);
    this.setState({selected_filters_as_text: text_filter});
    // log("new main text", text_filter);
  };

  compareSelectedAndAppliedFilters(){
    if(JSON.stringify(removeBlankAttributes(this.state.selected_filters)) === JSON.stringify(removeBlankAttributes(this.state.current_filters))){
      this.setState({areFiltersDirty: false});
    }else{
      this.setState({areFiltersDirty: true});
    }
  };

  applyFiltersChanges(){
    let selected_filters =  lookForFiltersInText(this.state.selected_filters);
    this.setState({current_filters: selected_filters}, function(){
      this.updateIssues();
      this.updateSelectedFiltersAsText(); // Ensure the input field is up to date
      this.compareSelectedAndAppliedFilters();
      this.syncSelectedFiltersWithCurrents();
    });
  }

  syncSelectedFiltersWithCurrents(){
    this.setState({selected_filters: this.state.current_filters});
  }

  componentDidMount() {
    this.updateIssues();
  }

  updateIssues(){

    /*
    filters = this.state.current_filters;

    this.setState({loading: true});
    ServiceAPI.getFilteredIssues(filters, res => {
      this.setState({loading: false});
      this.setState({displayed_issues: res.issues});
    });
    */

    this.setState({displayed_issues: sample_issues.issues});
    this.setState({loading: false});
  }

  render() {
    return (
      <div className="App">
        <NavBarMenu current_filters={this.state.current_filters}
                    selected_filters={this.state.selected_filters}
                    selected_filters_as_text={this.state.selected_filters_as_text}
                    applyFiltersChanges={this.applyFiltersChanges}
                    updateSelectedFilters={this.updateSelectedFilters}
                    replaceSelectedFilters={this.replaceSelectedFilters}
                    areFiltersDirty={this.state.areFiltersDirty}
        />
        <IssuesList current_filters={this.state.current_filters}
                    issues={this.state.displayed_issues}
                    isLoading={this.state.loading}
        />
        <ListCurrentFilters current_filters={this.state.current_filters}
                            selected_filters={this.state.selected_filters}
                            selected_filters_as_text={this.state.selected_filters_as_text}/>

      </div>
    );
  }
}

export default App;
