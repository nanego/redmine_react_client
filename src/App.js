import React, { Component } from 'react';
import './App.css';

import ServiceAPI from './services/service_api'

import NavBarMenu from './header/navbarmenu'
import IssuesList from './issues/index'
import LoginForm from './account/login'

(function ($, window, document, undefined) {

  // alert('TEST');
  // console.log($.fn.dropdown.settings.selector.item);
  // $.fn.dropdown.settings.selector.item = '.menu > .item:not(.header)' // change selector for all dropdowns

})();

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      current_filters: {projects: [], trackers: []},
      displayed_issues: [],
      loading: true
    };
    this.handleFiltersChanges = this.handleFiltersChanges.bind(this);
    this.updateIssues = this.updateIssues.bind(this);
  }

  handleFiltersChanges(new_filters){
    var updated_filters = Object.assign({},this.state.current_filters, new_filters);

    this.setState({
      current_filters: updated_filters
    });

    this.updateIssues(updated_filters);
  }

  componentDidMount() {
    this.updateIssues();
  }

  updateIssues(filters){
    filters = filters || this.state.current_filters;
    this.setState({loading: true});
    ServiceAPI.getFilteredIssues(filters, res => {
      this.setState({loading: false});
      this.setState({displayed_issues: res.issues});
    });
  }

  render() {
    return (
      <div className="App">
        <NavBarMenu current_filters={this.state.current_filters}
                    handleFiltersChanges={this.handleFiltersChanges}
        />
        <IssuesList current_filters={this.state.current_filters}
                    issues={this.state.displayed_issues}
                    isLoading={this.state.loading}
        />
        <LoginForm />
      </div>
    );
  }
}

export default App;
