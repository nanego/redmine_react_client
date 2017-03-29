import React, {Component} from 'react'
import { Dropdown, Menu, Input, Button, Icon, Popup, Radio } from 'semantic-ui-react'
import FiltersForm from './filters_form'
import CustomQueries from './custom_queries'
import SelectProjects from './select_projects'
import LoginForm from '../account/login'
import sample_projects from '../services/samples/projects.json'
import sample_trackers from '../services/samples/trackers.json'

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
    this.getNamesFromIds = this.getNamesFromIds.bind(this);
    this.updateSelectedFilters = this.updateSelectedFilters.bind(this);
  }

  getNamesFromIds(array, ids){
    var names = [];
    if(ids instanceof Array){
      for (let id of ids) {
        names.push(array.find(function (d) {
          return d.id === id;
        }).name);
      }
    }else{
      names.push(array.find(function (d) {
        return d.id === ids;
      }).name);
    }
    return names;
  }

  closeDropdown(event){
    // console.log("closeDropdown : event : "+ event.target);
  }

  clearSearchInput(event) {
    this.setState({searchInputValue: ""});
  }

  handleSearchInputChange(event){
    this.setState({searchInputValue: event.target.value});
  }

  updateSelectedFilters(filters){
    this.props.updateSelectedFilters(filters);
    this.state.searchInputValue = this.props.selected_filters_as_text;
  }

  validateSearchInputChange(event, updateFilters){
    // let _this = this;
    if(event.key == 'Enter'){
      console.log('enter');

      let words = this.state.searchInputValue.split(' ');
      let text = '';
      let content_filter = '';

      console.log(words);

      words.forEach(function(word){

        console.log(word);

        if(word.indexOf(':') > 0){
          let key_value = word.split(':');
          switch(key_value[0]){
            case 'projects':
              this.updateSelectedFilters({projects: key_value[1]});
              text = word + ' ' + text;
              break;
            case 'trackers':
              this.updateSelectedFilters({trackers: key_value[1]});
              text = word + ' ' + text;
              break;
            default:
              content_filter += word + " ";
              this.updateSelectedFilters({text: content_filter});
              text += word + " ";
          }
          console.log("key="+key_value[0]);
          console.log("value="+key_value[1]);
        }else{
          content_filter += word + " ";
          text += word + ' ';
        }
      });
      this.setState({searchInputValue: text});
      this.props.applyFiltersChanges();
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
      if(this.props.current_filters[key] && this.props.current_filters[key] != "" ){
        var content;
        switch(key) {
          case 'projects':
            content = 'projet : ' + this.getNamesFromIds(projects, this.props.current_filters[key]).join(', ');
            break;
          case 'trackers':
            content = 'tracker : ' + this.getNamesFromIds(trackers, this.props.current_filters[key]).join(', ');
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
            <Button icon onClick={this.applySearchInput}><Icon name='search' /></Button>
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
                              value={this.props.selected_filters_as_text}
                              onKeyPress={this.validateSearchInputChange}
                              onChange={this.handleSearchInputChange}
              />}
              content={<CustomQueries />}
              on='focus'
              flowing
              offset={50}
              position='bottom left'
              basic
            />
            <Icon circular link name='cancel' onClick={this.clearSearchInput}
                  disabled={this.state.searchInputValue==""}
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
              />}
              on='click'
              flowing
              offset={-5}
              position='bottom right'
              basic
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
