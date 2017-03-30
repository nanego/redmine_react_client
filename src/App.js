import React, { Component } from 'react';
import './App.css';

// import ServiceAPI from './services/service_api'

import sample_issues from './services/samples/issues.json';

import NavBarMenu from './header/navbarmenu'
import IssuesList from './issues/index'
import ListCurrentFilters from './current_filters'

const default_filters = {}; /*{
  projects: 0,
  trackers: 0,
  text: ""
};
*/
let convertFilterToText = function(key, value){
  if(key=='text'){
    return value;
  }else{
    if(value && (value > 0 || value.length > 0)){
      return key + ':' + value + ' ';
    }else{
      return "";
    }
  }
};

let convertFiltersToText = function(filters){
  let complete_filters_as_text = "";
  for(var key in filters){
    complete_filters_as_text += convertFilterToText(key, filters[key]);
  }
  return complete_filters_as_text;
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
      dirty_filters: false
    };
    this.updateSelectedFilters = this.updateSelectedFilters.bind(this);
    this.updateSelectedFiltersAsText = this.updateSelectedFiltersAsText.bind(this);
    this.applyFiltersChanges = this.applyFiltersChanges.bind(this);
    this.updateIssues = this.updateIssues.bind(this);
    this.compareSelectedAndAppliedFilters = this.compareSelectedAndAppliedFilters.bind(this);
  }

  updateSelectedFilters(new_filter){
    console.log("START update selected filters : " + JSON.stringify(new_filter));
    var new_selection = Object.assign({},this.state.selected_filters, new_filter);
    Object.keys(new_selection).forEach(key => !new_selection[key] && delete new_selection[key]); // Remove blank attributes
    this.setState({selected_filters: new_selection}, function() {
      this.updateSelectedFiltersAsText();
      this.compareSelectedAndAppliedFilters();
    });
  }

  updateSelectedFiltersAsText() {
    console.log("START AS TEXT UPDATE");
    this.setState({selected_filters_as_text: convertFiltersToText(this.state.selected_filters)})
  };

  compareSelectedAndAppliedFilters(){
    if(JSON.stringify(this.state.selected_filters) == JSON.stringify(this.state.current_filters)){
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
