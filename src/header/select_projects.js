import React, {Component} from 'react'
import { Dropdown } from 'semantic-ui-react'
import ServiceAPI from '../services/service_api'

class SelectProjects extends Component {

  constructor(props){
    super(props);
    this.state = {
      projects: []
    };
    this.handleProjectsSelection = this.handleProjectsSelection.bind(this);
  }

  handleProjectsSelection(e, {value}){
    if(value)
      this.props.onProjectsSelection(value)
  }

  componentDidMount() {
    ServiceAPI.getAllProjects('', res => {
      const projects = res.projects;
      this.setState({projects});
    });
  }

  render() {
    return (
      <Dropdown search fluid multiple selection
                loading={this.state.projects.length===0}
                placeholder='Projets'
                options={this.state.projects.map(p => { return {'key': p.id, 'value': p.id, 'text': p.name}})}
                value={this.props.selected_projects}
                onChange={this.handleProjectsSelection}
      />
    )
  }
}

export default SelectProjects
