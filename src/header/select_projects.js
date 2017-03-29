import React, {Component} from 'react'
import { Dropdown } from 'semantic-ui-react'
// import ServiceAPI from '../services/service_api'

import sample_projects from '../services/samples/projects.json';

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
    return (
      <Dropdown search fluid selection
                loading={this.state.projects.length===0}
                placeholder='Projets'
                options={this.state.projects.map(p => { return {'key': p.id, 'value': p.id, 'text': p.name}})}
                value={this.props.selected_filters.projects}
                onChange={this.handleProjectsSelection}
      />
    )
  }
}

export default SelectProjects
