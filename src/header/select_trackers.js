import React, {Component} from 'react'
import { Dropdown } from 'semantic-ui-react'
import ServiceAPI from '../services/service_api'
import sample_trackers from '../services/samples/trackers.json';
import {findByAttribute} from '../helpers/helper_functions'

class SelectTrackers extends Component {

  constructor(props){
    super(props);
    this.state = {
      trackers: []
    };
    this.handleTrackersSelection = this.handleTrackersSelection.bind(this);
  }

  handleTrackersSelection(e, {value}){
    if(value)
      this.props.updateSelectedFilters({trackers: value});
  }

  componentDidMount() {
    this.setState({trackers: sample_trackers.trackers});
    /*
    ServiceAPI.getAllTrackers('', res => {
      const trackers = res.trackers;
      this.setState({trackers});
    });
    */
  }

  render() {
    var selected_value = this.props.selected_filters.trackers;
    var options = this.state.trackers.map(p => { return {'key': p.id, 'value': p.id, 'text': p.name}});
    var selected_option = {'key':selected_value,
      'value':selected_value,
      'text':selected_value};
    if(findByAttribute(options, 'key', selected_value) == undefined){
      options.push(selected_option);
    }
    return (
      <Dropdown search fluid selection allowAdditions
                loading={this.state.trackers.length===0}
                placeholder='Trackers'
                closeOnBlur={false}
                options={options}
                value={selected_value}
                onChange={this.handleTrackersSelection}
      />
    )
  }

}

export default SelectTrackers
