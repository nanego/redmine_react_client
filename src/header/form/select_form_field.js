import React, {Component} from 'react'
import { Dropdown, Form } from 'semantic-ui-react'
import {findByAttribute} from '../../helpers/helper_functions'

import { getFilterValue, to_s } from '../../helpers/helper_functions'
// import ServiceAPI from '../services/service_api'

class SelectFormField extends Component {

  constructor(props){
    super(props);
    this.state = {
      possible_values: []
    };
    this.handleSelection = this.handleSelection.bind(this);
  }

  handleSelection(e, {value}){
    console.log(this.props.filter_name + " : new value = " + value);
    if(value){
      let current_filter = {};
      current_filter[this.props.filter_name] = {operator: '=', value: value};
      this.props.updateSelectedFilters(current_filter);
    }
  }

  componentDidMount() {
    /*
    ServiceAPI.getAllProjects('', res => {
      const projects = res.projects;
      console.log('getAllProjects => ' + projects);
      this.setState({projects});
    });
    */
    let possible_values = this.props.possible_values;
    this.setState({possible_values: possible_values});
  }

  render() {
    var selected_value = getFilterValue(this.props.selected_filters[this.props.filter_name]);
    var options = this.state.possible_values.map(p => { return {'key': p.id, 'value': p.id, 'text': to_s(p) }});
    var selected_option = {'key':selected_value,
        'value':selected_value,
        'text':selected_value};
    if(selected_value && findByAttribute(options, 'key', selected_value) == undefined){
      options.push(selected_option);
    }
    return (
        <Form.Field inline>
          <label>{this.props.label}</label>
            <Dropdown search
                      selection
                      allowAdditions
                      pointing='left'
                      className='link item'
                      loading={this.state.possible_values.length===0}
                      placeholder={this.props.label}
                      options={options}
                      value={selected_value}
                      onChange={this.handleSelection}
            />
        </Form.Field>
    )
  }
}

export default SelectFormField
