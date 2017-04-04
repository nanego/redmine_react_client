import React, {Component} from 'react'
import { Dropdown, Menu, Input, Button, Icon, Popup, Radio } from 'semantic-ui-react'
import FiltersForm from './filters_form'
import CustomQueries from './custom_queries'
import SelectProjects from './select_projects'
import LoginForm from '../account/login'
import sample_projects from '../services/samples/projects.json'
import sample_trackers from '../services/samples/trackers.json'
import {getNamesFromIds, getIdByValue} from '../helpers/helper_functions'

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
    this.applySearchInput = this.applySearchInput.bind(this);
    this.convertFiltersToOptions = this.convertFiltersToOptions.bind(this);
    this.defaultValues = this.defaultValues.bind(this);
    this.updateSelectedFilters = this.updateSelectedFilters.bind(this);
  }

  closeDropdown(event){
    // console.log("closeDropdown : event : "+ event.target);
  }

  clearSearchInput(event) {
    this.updateSelectedFilters({});
    // this.setState({searchInputValue: ""});
  }

  handleSearchInputChange(event){
    this.setState({searchInputValue: event.target.value});
  }

  updateSelectedFilters(filters){
    this.props.updateSelectedFilters(filters);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected_filters_as_text !== this.state.searchInputValue) {
      this.setState({ searchInputValue: nextProps.selected_filters_as_text });
    }
  }

  validateSearchInputChange(event, updateFilters){
    let _this = this;
    if(event.key === 'Enter'){
      console.log('enter');

      // Re-init all selected filters
      _this.updateSelectedFilters({});

      // Split input by key:value (with quotes)
      var regexp = /[^\W]+:"([^"]*)"|[^\s"]+/gi;
      var words = [];
      do {
        //Each call to exec returns the next regex match as an array
        var match = regexp.exec(this.state.searchInputValue);
        if (match != null)
        {
          //Index 1 in the array is the captured group if it exists
          //Index 0 is the matched text, which we use if no captured group exists
          // words.push(match[1] ? match[1] : match[0]);
          words.push(match[0]);
        }
      } while (match != null);

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
              projects_filter = getIdByValue(projects, key_value[1]);
              // text = word + ' ' + text;
              break;
            case 'trackers':
              trackers_filter = getIdByValue(trackers, key_value[1]);
              // text = word + ' ' + text;
              break;
            default:
              content_filter += word + " ";
              // _this.updateSelectedFilters({text: content_filter});
              // text += word + " ";
          }
          console.log("key="+key_value[0]);
          console.log("value="+key_value[1]);
        }else{
          content_filter += word + " ";
          // _this.updateSelectedFilters({text: content_filter});
          // text += word + ' ';
        }
      });

      //if(content_filter.trim().length>0){

      _this.updateSelectedFilters({ text: content_filter.trim(),
                                    projects: projects_filter,
                                    trackers: trackers_filter
      });

      //}

      // this.setState({searchInputValue: text});
      // this.props.applyFiltersChanges();
    }

  }

  applySearchInput(event){
    this.props.applyFiltersChanges();
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
            <Button icon onClick={this.applySearchInput} {...this.props.dirty_filters ? {color:'blue'} : {}}><Icon name='search' /></Button>
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
                              onKeyPress={this.validateSearchInputChange}
                              onChange={this.handleSearchInputChange}
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
                  disabled={this.props.selected_filters_as_text===""}
            />
            <Popup
              trigger={<Button icon className="last" id="filters_dropdown"><Icon name='dropdown' /></Button>}
              content={<FiltersForm current_filters={this.props.current_filters}
                                    selected_filters={this.props.selected_filters}
                                    applyFiltersChanges={this.props.applyFiltersChanges}
                                    updateSelectedFilters={this.updateSelectedFilters}
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
