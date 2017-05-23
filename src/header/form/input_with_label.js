import React, {Component} from 'react'
import { Input, Form, Select } from 'semantic-ui-react'
import {log, value_of, operator_of} from '../../helpers/helper_functions'

const options = [
  { key: '=', text: '=', value: '=' },
  { key: '<', text: '<', value: '<' },
  { key: '>', text: '>', value: '>' },
];

class InputField extends Component {

  constructor(props){
    super(props);
    this.updateValue = this.updateValue.bind(this);
    this.updateOperator = this.updateOperator.bind(this);
  }

  updateValue(e, {value}){
    // log("param value", value);
    let new_filter = {};
    if(value){
      new_filter[this.props.filter_name] = {
        operator: operator_of(this.props.selected_filters[this.props.filter_name]),
        value: value
      };
    }else{
      new_filter[this.props.filter_name] = {};
    }
    this.props.updateSelectedFilters(new_filter);
  }

  updateOperator(e, {value}){
    let operator = value;
    let new_filter = {};
    let input_value = value_of(this.props.selected_filters[this.props.filter_name]);
    if(input_value){
      new_filter[this.props.filter_name] = {
        operator: operator,
        value: input_value
      };
    }else{
      new_filter[this.props.filter_name] = {};
    }
    this.props.updateSelectedFilters(new_filter);
  }

  render() {
    return (
        <Form.Field inline>
            <label>{this.props.label}</label>
            <Input type='text' placeholder='DD/MM/YYYY' action actionPosition={'left'} onChange={this.updateValue} >
              <Select compact options={options} defaultValue={operator_of(this.props.selected_filters[this.props.filter_name])} onChange={this.updateOperator} />
              <input value={value_of(this.props.selected_filters[this.props.filter_name])} />
            </Input>
        </Form.Field>
    )
  }

}

export default InputField
