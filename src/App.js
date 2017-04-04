import React, { Component } from 'react';
import './App.css';

// import ServiceAPI from './services/service_api'

import sample_issues from './services/samples/issues.json';
import sample_projects from './services/samples/projects.json'
import sample_trackers from './services/samples/trackers.json'

import NavBarMenu from './header/navbarmenu'
import IssuesList from './issues/index'
import ListCurrentFilters from './current_filters'

import {convertFiltersToText, normalizeFilter, removeBlankAttributes} from './helpers/helper_functions'

const default_filters = {text:''}; /*{
  projects: 0,
  trackers: 0,
  text: ""
};
*/

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      current_filters: default_filters,
      selected_filters: default_filters,
      selected_filters_as_text: "",
      displayed_issues: [],
      loading: true,
      dirty_filters: false
    };
    this.replaceSelectedFilters = this.replaceSelectedFilters.bind(this);
    this.updateSelectedFilters = this.updateSelectedFilters.bind(this);
    this.updateSelectedFiltersAsText = this.updateSelectedFiltersAsText.bind(this);
    this.applyFiltersChanges = this.applyFiltersChanges.bind(this);
    this.updateIssues = this.updateIssues.bind(this);
    this.compareSelectedAndAppliedFilters = this.compareSelectedAndAppliedFilters.bind(this);
  }

  replaceSelectedFilters(new_filter){
    console.log("START replace selected filters : " + JSON.stringify(new_filter));

    new_filter = normalizeFilter(new_filter);

    var new_selection;
    if(JSON.stringify(new_filter)===JSON.stringify({})){ // Re-init filters
      new_selection = default_filters;
    }else{
      new_selection = removeBlankAttributes(new_filter);
    }
    this.setState({selected_filters: new_selection}, function() {

      console.log("001 : state = " + JSON.stringify(this.state.selected_filters));

      // this.updateSelectedFiltersAsText();
      this.compareSelectedAndAppliedFilters();
    });

  }

  updateSelectedFilters(new_filter, and_apply=false){
    console.log("START update selected filters : " + JSON.stringify(new_filter));

    new_filter = normalizeFilter(new_filter);

    var new_selection;
    if(JSON.stringify(new_filter)===JSON.stringify({})){ // Re-init filters
      console.log("REINIT FILTERS");
      new_selection = default_filters;
    }else{
      new_selection = Object.assign({},this.state.selected_filters, new_filter);
      new_selection = removeBlankAttributes(new_selection);
    }
    this.setState({selected_filters: new_selection}, function() {

      console.log("001 : state = " + JSON.stringify(this.state.selected_filters));

      this.updateSelectedFiltersAsText();
      if(and_apply){
        this.applyFiltersChanges();
      }else{
        this.compareSelectedAndAppliedFilters();
      }
    });
  }

  updateSelectedFiltersAsText() {
    console.log("SELECTED FILTERS AS TEXT : " + JSON.stringify(this.state.selected_filters));
    this.setState({selected_filters_as_text: convertFiltersToText(this.state.selected_filters)})
  };

  compareSelectedAndAppliedFilters(){
    if(JSON.stringify(removeBlankAttributes(this.state.selected_filters)) === JSON.stringify(removeBlankAttributes(this.state.current_filters))){
      this.setState({dirty_filters: false});
    }else{
      this.setState({dirty_filters: true});
    }
  };

  applyFiltersChanges(){
    this.setState({current_filters: this.state.selected_filters}, function(){
      this.updateIssues();
      this.compareSelectedAndAppliedFilters();
    });
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
                    dirty_filters={this.state.dirty_filters}
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
