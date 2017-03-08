import React, {Component} from 'react'
import { Button, Checkbox, Form, Segment } from 'semantic-ui-react'
import SelectProjects from './select_projects'
import SelectTrackers from './select_trackers'

class FiltersForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected_projects: this.props.current_filters.projects,
      selected_trackers: this.props.current_filters.trackers
    };
    this.handleProjectsChanges = this.handleProjectsChanges.bind(this);
    this.handleTrackersChanges = this.handleTrackersChanges.bind(this);
    this.applyFilters = this.applyFilters.bind(this);
  }

  handleProjectsChanges(value){
    this.setState({
      selected_projects: value
    })
  }

  handleTrackersChanges(value){
    this.setState({
      selected_trackers: value
    })
  }

  applyFilters(e){
     e.preventDefault();
     this.props.handleFiltersChanges({
       projects: this.state.selected_projects,
       trackers: this.state.selected_trackers,
       text: this.props.searchValue
     });
    this.props.onSubmit();
  }

  render() {
    return (
      <Form className='filters_form'>
        <Form.Field inline>
          <label>Projets</label>
          <SelectProjects selected_projects={this.state.selected_projects}
                          onProjectsSelection={this.handleProjectsChanges} />
        </Form.Field>
        <Form.Field inline>
          <label>Trackers</label>
          <SelectTrackers selected_trackers={this.state.selected_trackers}
                          onTrackersSelection={this.handleTrackersChanges} />
        </Form.Field>
        <Form.Input label='Contient' placeholder='contenu recherché' value={this.props.searchValue} onChange={this.props.updateSearchValue} />
        <Button type='submit' name="apply_filters" onClick={this.applyFilters}>Appliquer</Button>
      </Form>
    )
  }
}

export default FiltersForm
