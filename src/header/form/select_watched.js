import React, {Component} from 'react'
import { Dropdown } from 'semantic-ui-react'
import {convertToBoolean, exists, log} from '../../helpers/helper_functions'

const placeholder = 'Indéterminé';

const options = [
  { key: 0, text: placeholder, value: '' },
  { key: 1, text: 'Oui', value: 'true' },
  { key: 2, text: 'Non', value: 'false' },
];

class SelectWatched extends Component {

  constructor(props){
    super(props);
    this.handleWatchedSelection = this.handleWatchedSelection.bind(this);
  }

  handleWatchedSelection(e, {value}){
    if(value){
      this.props.updateSelectedFilters({watched: {operator: '=', value: value}});
    }else{
      this.props.updateSelectedFilters({watched: {}});
    }
  }

  render() {
    var selected_value;
    if(exists(this.props.selected_filters.watched)){
      selected_value = ( convertToBoolean(this.props.selected_filters.watched.value) ? 'true' : 'false' );
    }else{
      selected_value = '';
    }

    return (
      <Dropdown search selection allowAdditions
                pointing='left'
                className='link item'
                placeholder={placeholder}
                closeOnBlur={false}
                options={options}
                value={selected_value}
                onChange={this.handleWatchedSelection}
      />
    )
  }

}

export default SelectWatched
