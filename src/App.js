import React, { Component } from 'react';
import './App.css';

import ServiceAPI from './services/service_api'

import sample_issues from './services/samples/issues.json';

import NavBarMenu from './header/navbarmenu'
import IssuesList from './issues/index'
import ListCurrentFilters from './current_filters'

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      current_filters: {
        projects: [],
        trackers: [],
        text: ""
      },
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

    /*
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
                    handleFiltersChanges={this.handleFiltersChanges}
        />
        <IssuesList current_filters={this.state.current_filters}
                    issues={this.state.displayed_issues}
                    isLoading={this.state.loading}
        />
        <ListCurrentFilters current_filters={this.state.current_filters} />
      </div>
    );
  }
}

export default App;
