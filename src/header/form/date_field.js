import React, {Component} from 'react'
import { Input, Form, Select, Dropdown } from 'semantic-ui-react'
import {log, value_of, operator_of, exists} from '../../helpers/helper_functions'
import moment from 'moment'

const placeholder = 'Indéterminée';
const shortcut_options = [
  { key: 0, text: placeholder, value: '' },
  { key: 1, text: "Aujourd'hui", value: '0 day' },
  { key: 2, text: "Il y a une semaine", value: '1 week' },
  { key: 3, text: "Il y a un mois", value: '1 month' },
  { key: 4, text: "Autre", value: 'other'}
];

const operator_options = [
  { key: '=', text: '=', value: '=' },
  { key: '<', text: '<', value: '<' },
  { key: '>', text: '>', value: '>' },
];

class DateField extends Component {

  constructor(props){
    super(props);
    this.state = {
      current_operator: '=',
      visible_input: false,
      shortcut_value: ''
    };
    this.updateFilter = this.updateFilter.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleOperatorChange = this.handleOperatorChange.bind(this);
    this.handleShortcutSelection = this.handleShortcutSelection.bind(this);
  }

  handleShortcutSelection(e, {value}){
    if(value){
      if(value==='other'){
        this.setState({visible_input: true, shortcut_value: value});
      }else{
        this.setState({visible_input: false, shortcut_value: value});
        let values = value.split(" ");
        let op = this.state.current_operator;
        let date = moment().subtract(parseInt(values[0]), values[1]).format("DD/MM/YYYY");
        this.updateFilter(op, date);
      }
    }else{
      this.updateFilter('=', '');
      this.setState({visible_input: false, shortcut_value: ''});
    }
  }

  handleValueChange(e, {value}){
    let op = operator_of(this.props.selected_filters[this.props.filter_name]);
    this.updateFilter(op, value);
  }

  handleOperatorChange(e, {value}){
    log(filter_value);
    let filter_value = value_of(this.props.selected_filters[this.props.filter_name]);
    let filter_op = value;
    this.setState({current_operator:filter_op});
    if(filter_value){
      log('UPDATE FILTER');
      this.updateFilter(filter_op, filter_value);
    }
  }

  updateFilter(operator, value){
    let new_filter = {};
    if(value){
      new_filter[this.props.filter_name] = {
        operator: operator,
        value: value
      };
    }else{
      new_filter[this.props.filter_name] = {};
    }
    this.props.updateSelectedFilters(new_filter);
  }

  componentWillReceiveProps(nextProps) {
    // log("Date field received new props. nextProps", nextProps);
    let filter_value = value_of(nextProps.selected_filters[nextProps.filter_name]);
    // log("filter_value", filter_value);

    if(!exists(filter_value)){
      this.setState({ shortcut_value: '', visible_input: false});
    }else{
      let shortcut_date_selected = false;
      for(let option of shortcut_options){
        if(option.value !== '' && option.value!=='other'){
          // log("shortcut_option", option);
          let values = option.value.split(" ");
          let shortcut_date = moment().subtract(parseInt(values[0]), values[1]).format("DD/MM/YYYY");
          // log("shortcut_date", shortcut_date);
          if(shortcut_date==filter_value){
            this.setState({ shortcut_value: option.value, visible_input: false});
            shortcut_date_selected = true;
          }
        }
      }
      if(shortcut_date_selected === false){
        this.setState({ shortcut_value: 'other', visible_input: true});
      }
    }

  }

  render() {
    return (
        <Form.Field inline>
            <label>{this.props.label}</label>
            <Input type='text' placeholder='DD/MM/YYYY' action actionPosition={'left'} onChange={this.handleValueChange} className='date_input' >
              <Select compact options={operator_options} value={operator_of(this.props.selected_filters[this.props.filter_name]) || this.state.current_operator} onChange={this.handleOperatorChange} />
              <Dropdown selection
                        className='link item'
                        placeholder={placeholder}
                        options={shortcut_options}
                        value={this.state.shortcut_value}
                        onChange={this.handleShortcutSelection}
              />
              <input value={value_of(this.props.selected_filters[this.props.filter_name])} className={this.state.visible_input ? '' : 'hidden'} />
            </Input>
        </Form.Field>
    )
  }

}

export default DateField
