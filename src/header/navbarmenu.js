import React, {Component} from 'react'
import { Dropdown, Menu, Input, Button, Icon, Popup, Radio } from 'semantic-ui-react'
import FiltersForm from './form/filters_form'
import CustomQueries from './custom_queries'
// import SelectProjects from './form/select_projects'
import LoginForm from '../account/login'
import sample_projects from '../services/samples/projects.json'
import sample_trackers from '../services/samples/trackers.json'
import {getNamesFromIds, getIdByValue, splitByKeyValue, removeBlankAttributes, convertToBoolean} from '../helpers/helper_functions'

const projects = sample_projects.projects;
const trackers = sample_trackers.trackers;

/*
const renderLabel = (label, index, props) => ({
  color: 'blue',
  content: `Customized label - ${label.text}`,
  icon: 'check',
})
*/

class NavBarMenu extends Component {

  constructor(props){
    super(props);
    this.state = {
      searchInputValue: this.props.selected_filters_as_text
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
    let words = splitByKeyValue(input);

    // let text = '';
    let content_filter = '';
    let projects_filter = undefined;
    let trackers_filter = undefined;
    let watched_filter = undefined;

    console.log("words :");
    console.log(words);

    words.forEach(function(word){

      console.log(word);

      if(word.indexOf(':') > 0){
        let key_value = word.split(':');
        let key = key_value[0];
        let value = key_value[1];
        switch(key.toLowerCase()){
          case 'projects':
            projects_filter = getIdByValue(projects, value) || value;
            break;
          case 'trackers':
            trackers_filter = getIdByValue(trackers, value) || value;
            break;
          case 'watched':
            watched_filter = convertToBoolean(value);
            break;
          default:
            content_filter += word + " ";
            // _this.props.updateSelectedFilters({text: content_filter});
            // text += word + " ";
        }
        console.log("key="+key_value[0]);
        console.log("value="+key_value[1]);
      }else{
        content_filter += word + " ";
        // _this.props.updateSelectedFilters({text: content_filter});
        // text += word + ' ';
      }
    });

    _this.props.replaceSelectedFilters({
      text: content_filter.trim(),
      projects: projects_filter,
      trackers: trackers_filter,
      watched: watched_filter
    });
  }

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
              content={<CustomQueries replaceSelectedFilters={this.props.replaceSelectedFilters} />}
              on='focus'
              id="custom_queries_popup"
              flowing
              // offset={50}
              position='bottom right'
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
