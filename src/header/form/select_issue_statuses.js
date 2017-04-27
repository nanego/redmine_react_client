import React, {Component} from 'react'
import { Dropdown } from 'semantic-ui-react'
import ServiceAPI from '../../services/service_api'
import sample_issue_statuses from '../../services/samples/issue_statuses.json';
import {findByAttribute} from '../../helpers/helper_functions'

class SelectIssueStatuses extends Component {

  constructor(props){
    super(props);
    this.state = {
      issue_statuses: []
    };
    this.handleIssueStatusesSelection = this.handleIssueStatusesSelection.bind(this);
  }

  handleIssueStatusesSelection(e, {value}){
    if(value)
      this.props.updateSelectedFilters({issue_statuses: value});
  }

  componentDidMount() {
    this.setState({issue_statuses: sample_issue_statuses.issue_statuses});
    /*
    ServiceAPI.getAllIssueStatuses('', res => {
      const issue_statuses = res.issue_statuses;
      this.setState({issue_statuses});
    });
    */
  }

  render() {
    var selected_value = this.props.selected_filters.issue_statuses;
    var options = this.state.issue_statuses.map(p => { return {'key': p.id, 'value': p.id, 'text': p.name}});
    var selected_option = {'key':selected_value,
      'value':selected_value,
      'text':selected_value};
    if(findByAttribute(options, 'key', selected_value) == undefined){
      options.push(selected_option);
    }
    return (
      <Dropdown search fluid selection allowAdditions
                loading={this.state.issue_statuses.length===0}
                placeholder='Issue Statuses'
                closeOnBlur={false}
                options={options}
                value={selected_value}
                onChange={this.handleIssueStatusesSelection}
      />
    )
  }

}

export default SelectIssueStatuses
