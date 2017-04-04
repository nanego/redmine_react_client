import React, {Component} from 'react'
import { Dropdown, Menu, Input, Button, Icon, Popup, Radio } from 'semantic-ui-react'
import FiltersForm from './filters_form'
import CustomQueries from './custom_queries'
import SelectProjects from './select_projects'
import LoginForm from '../account/login'
import sample_projects from '../services/samples/projects.json'
import sample_trackers from '../services/samples/trackers.json'
import {getNamesFromIds, getIdByValue, splitByKeyValue, removeBlankAttributes} from '../helpers/helper_functions'

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
    this.convertFiltersToOptions = this.convertFiltersToOptions.bind(this);
    this.defaultValues = this.defaultValues.bind(this);
    this.applyIfEnter = this.applyIfEnter.bind(this);
  }

  closeDropdown(event){
    document.getElementById('filters_dropdown').click();
    // console.log("closeDropdown : event : "+ event.target);
  }

  clearSearchInput(event) {
    this.props.updateSelectedFilters({}, true);
  }

  handleSearchInputChange(event){
    this.setState({searchInputValue: event.target.value});
  }

  componentWillReceiveProps(nextProps) {

    console.log("Just received new props. document.activeElement = " + document.activeElement);

    if (document.getElementById('mainSearchInput').getElementsByTagName('input')[0] !== document.activeElement &&
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

    console.log("words :");
    console.log(words);

    words.forEach(function(word){

      console.log(word);

      if(word.indexOf(':') > 0){
        let key_value = word.split(':');
        switch(key_value[0].toLowerCase()){
          case 'projects':
            projects_filter = getIdByValue(projects, key_value[1]) || key_value[1];
            // text = word + ' ' + text;
            break;
          case 'trackers':
            trackers_filter = getIdByValue(trackers, key_value[1]) || key_value[1];
            // text = word + ' ' + text;
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

    _this.props.replaceSelectedFilters({text: content_filter.trim(),
      projects: projects_filter,
      trackers: trackers_filter
    });
  }

  convertFiltersToOptions(){
    var options = [
    //  { key: 1, text: 'One', value: 1 },
    //  { key: 2, text: 'Two', value: 2 },
    //  { key: 3, text: 'Three', value: 3 },
    ];

    for (var key in this.props.current_filters) {
      if(this.props.current_filters[key] && this.props.current_filters[key] !== "" ){
        var content;
        switch(key) {
          case 'projects':
            content = 'projet : ' + getNamesFromIds(projects, this.props.current_filters[key]).join(', ');
            break;
          case 'trackers':
            content = 'tracker : ' + getNamesFromIds(trackers, this.props.current_filters[key]).join(', ');
            break;
          default:
            content = key + ": " + this.props.current_filters[key];
        }


        options.push({key: options.length, text: content, value:key });
      }
    }

    return options;
  }

  defaultValues(){
    var options = this.convertFiltersToOptions();
    var values = [];
    options.forEach(function (option){
      values.push(option.value);
    });
    console.log('values = ' + values);
    return values;
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
            <Button icon onClick={this.props.applyFiltersChanges} {...this.props.dirty_filters ? {color:'blue'} : {}}><Icon name='search' /></Button>
            {/*
            <Dropdown
                className="current_filters_dropdown"
                multiple
                icon={false}
                selection
                fluid
                options={this.convertFiltersToOptions()}
                // placeholder='Choose an option'
                // renderLabel={renderLabel}
                value={this.defaultValues()}
            />*/}
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
              content={<CustomQueries />}
              on='focus'
              id="custom_queries_popup"
              flowing
              offset={50}
              position='bottom left'
              basic
            />
            <Icon circular link name='cancel' onClick={this.clearSearchInput}
                  disabled={this.props.dirty_filters === false && JSON.stringify(removeBlankAttributes(this.props.current_filters)) === JSON.stringify({}) }
            />
            <Popup
              trigger={<Button icon className="last" id="filters_dropdown"><Icon name='dropdown' /></Button>}
              content={<FiltersForm current_filters={this.props.current_filters}
                                    selected_filters={this.props.selected_filters}
                                    applyFiltersChanges={this.props.applyFiltersChanges}
                                    updateSelectedFilters={this.props.updateSelectedFilters}
                                    onSubmit={this.closeDropdown}
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
