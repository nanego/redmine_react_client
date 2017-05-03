import React, {Component} from 'react'
import { Button, Checkbox, Form, Segment, Divider, Input } from 'semantic-ui-react'
import SelectProjects from './select_projects'
import SelectTrackers from './select_trackers'
import SelectIssueStatuses from './select_issue_statuses'
import {removeBlankAttributes} from '../../helpers/helper_functions'

class FiltersForm extends Component {

  constructor(props) {
    super(props);
    this.applyFilters = this.applyFilters.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
    this.updateTextFilter = this.updateTextFilter.bind(this);
  }

  applyFilters(e){
    e.preventDefault();
    this.props.applyFiltersChanges();
    document.getElementById('filters_dropdown').click(); // closeDropdown
  }

  resetFilters(e){
    e.preventDefault();
    this.props.updateSelectedFilters({}, true);
    document.getElementById('filters_dropdown').click(); // closeDropdown
  }

  updateTextFilter(e, {value}){
    this.props.updateSelectedFilters({text: value});
  }

  render() {
    return (
      <Form className='filters_form'>
        <Form.Field inline>
          <label>Projets</label>
          <SelectProjects selected_filters={this.props.selected_filters} updateSelectedFilters={this.props.updateSelectedFilters} />
        </Form.Field>
        <Form.Field inline>
          <label>Trackers</label>
          <SelectTrackers selected_filters={this.props.selected_filters} updateSelectedFilters={this.props.updateSelectedFilters} />
        </Form.Field>
        <Form.Field inline>
          <label>Statuts</label>
          <SelectIssueStatuses selected_filters={this.props.selected_filters} updateSelectedFilters={this.props.updateSelectedFilters} />
        </Form.Field>
        <Form.Field inline>
          <label>Contient</label>
          <Input placeholder='contenu recherché' value={this.props.selected_filters.text} onChange={this.updateTextFilter} />
        </Form.Field>
        <Divider/>
        <Button type='submit' {...this.props.dirty_filters ? {color:'blue'} : {color:'grey'}} name="apply_filters" onClick={this.applyFilters}>Appliquer</Button>
        <Button {...(this.props.dirty_filters || JSON.stringify(removeBlankAttributes(this.props.current_filters)) !== JSON.stringify({})) ? {disabled:false} : {disabled:true}} name="reset_filters" onClick={this.resetFilters}>Effacer</Button>
      </Form>
    )
  }
}

export default FiltersForm
