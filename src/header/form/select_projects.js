import React, {Component} from 'react'
import { Dropdown } from 'semantic-ui-react'
// import ServiceAPI from '../services/service_api'

import {findByAttribute} from '../../helpers/helper_functions'

import sample_projects from '../../services/samples/projects.json';

class SelectProjects extends Component {

  constructor(props){
    super(props);
    this.state = {
      projects: []
    };
    this.handleProjectsSelection = this.handleProjectsSelection.bind(this);
  }

  handleProjectsSelection(e, {value}){
    console.log("Projects : new value = " + value);
    if(value)
      this.props.updateSelectedFilters({projects: value});
  }

  componentDidMount() {
    /*
    ServiceAPI.getAllProjects('', res => {

      const projects = res.projects;

      console.log('getAllProjects => ' + projects);

      this.setState({projects});
    });
    */

    const projects = sample_projects.projects;
    this.setState({projects});

  }

  render() {
    var selected_value = this.props.selected_filters.projects;
    var options = this.state.projects.map(p => { return {'key': p.id, 'value': p.id, 'text': p.name}});
    var selected_option = {'key':selected_value,
        'value':selected_value,
        'text':selected_value};
    if(findByAttribute(options, 'key', selected_value) == undefined){
      options.push(selected_option);
    }
    return (
      <Dropdown search fluid selection allowAdditions
                loading={this.state.projects.length===0}
                placeholder='Projets'
                options={options}
                value={selected_value}
                onChange={this.handleProjectsSelection}
      />
    )
  }
}

export default SelectProjects
