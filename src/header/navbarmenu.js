import React, {Component} from 'react'
import { Dropdown, Menu, Input, Button, Icon, Popup, Radio } from 'semantic-ui-react'
import FiltersForm from './form/filters_form'
import CustomQueries from './custom_queries'
// import SelectProjects from './form/select_projects'
import LoginForm from '../account/login'
import sample_projects from '../services/samples/projects.json'
import sample_trackers from '../services/samples/trackers.json'
import sample_issue_statuses from '../services/samples/issue_statuses.json'
import {getIdByValue, splitByKeyValue, removeBlankAttributes, convertToBoolean, convertToStringDate, log, exists} from '../helpers/helper_functions'

const projects = sample_projects.projects;
const trackers = sample_trackers.trackers;
const list_of_statuses = sample_issue_statuses.issue_statuses;

export function parseInput(input){

  log(input);

  let words = splitByKeyValue(input);
  let filters = {text:""};

  log("words", words);

  words.forEach(function(word){

    log(word);

    if(word.indexOf(':') > 0){
      let key_value = word.split(':');
      let key = key_value[0];
      let value = key_value[1];
      switch(key.toLowerCase()){
        case 'projects':
          filters.projects = getIdByValue(projects, value) || value;
          break;
        case 'trackers':
          filters.trackers = getIdByValue(trackers, value) || value;
          break;
        case 'status':
          filters.issue_statuses = getIdByValue(list_of_statuses, value) || value;
          break;
        case 'watched':
          filters.watched = convertToBoolean(value);
          break;
        case 'updated_before':
          filters.updated_before = convertToStringDate(value);
          break;
        default:
          if(exists(word)){
            if(exists(filters.text))
              filters.text += " ";
            filters.text += word;
          }
          // _this.props.updateSelectedFilters({text: content_filter});
          // text += word + " ";
      }
      console.log("key="+key_value[0]);
      console.log("value="+key_value[1]);
    }else{
      if(exists(word)){
        if(exists(filters.text))
          filters.text += " ";
        filters.text += word;
      }
      // _this.props.updateSelectedFilters({text: content_filter});
      // text += word + ' ';
    }
  });

  return filters;
}

class NavBarMenu extends Component {

  constructor(props){
    super(props);
    this.state = {
      searchInputValue: this.props.selected_filters_as_text,
      isOpen: false
    };
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.validateSearchInputChange = this.validateSearchInputChange.bind(this);
    this.clearSearchInput = this.clearSearchInput.bind(this);
    this.applyIfEnter = this.applyIfEnter.bind(this);
  }

  clearSearchInput(event) {
    this.props.updateSelectedFilters({}, true);
  }

  handleSearchInputChange(event){
    this.setState({searchInputValue: event.target.value});
  }

  componentWillReceiveProps(nextProps) {

    console.log("Just received new props. document.activeElement = " + document.activeElement);

    if (document.getElementById('mainSearchInput') !== document.activeElement &&
        nextProps.selected_filters_as_text !== this.state.searchInputValue) {
      this.setState({ searchInputValue: nextProps.selected_filters_as_text });
    }
  }

  applyIfEnter(event){
    if(event.key === 'Enter'){
      console.log('enter');
      this.props.applyFiltersChanges();
    }
  }

  validateSearchInputChange(event){
    let _this = this;
    let input = event.target.value;
    this.setState({searchInputValue: input});

    let filters = parseInput(input);

    _this.props.replaceSelectedFilters({
      text: filters.text.trim(),
      projects: filters.projects,
      trackers: filters.trackers,
      issue_statuses: filters.issue_statuses,
      updated_before: filters.updated_before,
      watched: filters.watched
    });
  }

  handleOpen = () => {
    this.setState({ isOpen: true })
  };

  closePopup = (e, data) => {
    console.log("close popup");
    console.log(e.currentTarget);
    console.log(data);
    this.setState({ isOpen: false })
  };

  render(){

    return (
      <Menu attached='top'>

        {/*
        <Menu.Item>
          {JSON.stringify(this.props.current_filters)}
        </Menu.Item>
         */}

        <Menu.Item className="filters_module">
          <Input type="text"
                 action
                 icon
                 actionPosition="left"
                 placeholder='Rechercher'
                 className='searchController'>
            <Button icon id="mainSearchButton" onClick={this.props.applyFiltersChanges} {...this.props.dirty_filters ? {color:'blue'} : {}}><Icon name='search' /></Button>
            <Popup
              trigger={<Input id="mainSearchInput"
                              className="searchInput"
                              placeholder='Rechercher'
                              actionPosition="left"
                              labelPosition={'right'}
                              value={this.state.searchInputValue}
                              onChange={this.validateSearchInputChange}
                              onKeyPress={this.applyIfEnter}
              />}
              content={<CustomQueries replaceSelectedFilters={this.props.replaceSelectedFilters} closePopup={this.closePopup} />}
              on='focus'
              id="custom_queries_popup"
              flowing
              // offset={50}
              position='bottom right'
              open={this.state.isOpen}
              // onUnmount={ this.closePopup }
              onClose={this.closePopup}
              onOpen={this.handleOpen}
              basic
            />
            <Icon link name='cancel' className='reset'
                  onClick={this.clearSearchInput}
                  disabled={this.props.dirty_filters === false && JSON.stringify(removeBlankAttributes(this.props.current_filters)) === JSON.stringify({}) }
            />
            <Popup
              trigger={<Button icon className="last" id="filters_dropdown"><Icon name='dropdown' /></Button>}
              content={<FiltersForm current_filters={this.props.current_filters}
                                    selected_filters={this.props.selected_filters}
                                    applyFiltersChanges={this.props.applyFiltersChanges}
                                    updateSelectedFilters={this.props.updateSelectedFilters}
                                    searchValue={this.state.searchInputValue}
                                    updateSearchValue={this.handleSearchInputChange}
                                    dirty_filters={this.props.dirty_filters}
              />}
              on='click'
              flowing
              offset={-5}
              position='bottom right'
              basic
              id="filters_form_popup"
            />
          </Input>
        </Menu.Item>

        <Menu.Menu position='right'>
          {/*
          <Menu.Item>
            <Radio toggle />
          </Menu.Item>
          */}
          <Popup
            trigger={<Menu.Item name='signup' onClick={this.handleSignInClick} >Connexion</Menu.Item>}
            content={<LoginForm />}
            on='click'
            flowing
            position='bottom right'
          />
        </Menu.Menu>

      </Menu>
    )
  }
}

export default NavBarMenu
