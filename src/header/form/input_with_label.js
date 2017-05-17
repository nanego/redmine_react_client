import React, {Component} from 'react'
import { Input, Form, Select } from 'semantic-ui-react'
import {log} from '../../helpers/helper_functions'

const options = [
  { key: '=', text: '=', value: '=' },
  { key: '<', text: '<', value: '<' },
  { key: '>', text: '>', value: '>' },
];

const operator_of = function(filter){
  if (filter){
    return filter.operator;
  }else{
    return "=";
  }
};

const value_of = function(filter){
  if (filter){
    return filter.value;
  }else{
    return undefined;
  }
};

class InputField extends Component {

  constructor(props){
    super(props);
    this.updateValue = this.updateValue.bind(this);
    this.updateOperator = this.updateOperator.bind(this);
  }

  updateValue(e, {value}){
    log("param value", value);
    let new_filter = {};
    new_filter[this.props.filter_name] = {
      operator: operator_of(this.props.selected_filters[this.props.filter_name]),
      value: value
    };
    this.props.updateSelectedFilters(new_filter);
  }

  updateOperator(e, {value}){
    let operator = value;
    let new_filter = {};
    new_filter[this.props.filter_name] = {
      operator: operator,
      value: value_of(this.props.selected_filters[this.props.filter_name])
    };
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
