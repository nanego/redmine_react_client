import React, {Component} from 'react'
import { Button, Checkbox, Form, Segment, Divider, Input } from 'semantic-ui-react'
import SelectFormField from './select_form_field'
import SelectWatched from './select_watched'
import InputField from './input_with_label'
import {removeBlankAttributes, log} from '../../helpers/helper_functions'

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
    log("Update text filter in FORM");
    this.props.updateSelectedFilters({text: value});
  }

  render() {
    return (
      <Form className='filters_form'>
        <SelectFormField filter_name="projects"
                         selected_filters={this.props.selected_filters}
                         updateSelectedFilters={this.props.updateSelectedFilters} />
        <SelectFormField filter_name="trackers"
                         selected_filters={this.props.selected_filters}
                         updateSelectedFilters={this.props.updateSelectedFilters} />
        <SelectFormField filter_name="status"
                         selected_filters={this.props.selected_filters}
                         updateSelectedFilters={this.props.updateSelectedFilters} />
        <Form.Field inline>
          <label>Observateur</label>
          <SelectWatched selected_filters={this.props.selected_filters} updateSelectedFilters={this.props.updateSelectedFilters} />
        </Form.Field>
        <SelectFormField filter_name="assigned_to"
                         selected_filters={this.props.selected_filters}
                         updateSelectedFilters={this.props.updateSelectedFilters} />
        <InputField label="Date de mise à jour"
                    filter_name='updated_at'
                    selected_filters={this.props.selected_filters} updateSelectedFilters={this.props.updateSelectedFilters} />
        <Form.Field inline id='form_content_field'>
          <label>Contient</label>
          <Input placeholder='contenu recherché' value={this.props.selected_filters.text} onChange={this.updateTextFilter} />
        </Form.Field>
        <Divider/>
        <Button type='submit' {...this.props.areFiltersDirty ? {color:'blue'} : {color:'grey'}} name="apply_filters" onClick={this.applyFilters}>Appliquer</Button>
        <Button {...(this.props.areFiltersDirty || JSON.stringify(removeBlankAttributes(this.props.current_filters)) !== JSON.stringify({})) ? {disabled:false} : {disabled:true}} name="reset_filters" onClick={this.resetFilters}>Effacer</Button>
      </Form>
    )
  }
}

export default FiltersForm
