import React, {Component} from 'react'
import { Menu, Input, Search, Button, Icon, Popup, Modal } from 'semantic-ui-react'
import FiltersForm from './form/filters_form'
import CustomQueries from './custom_queries'
import LoginForm from '../account/login'
import {removeBlankAttributes, parseInput, lastWordIn, log, surroundWithQuotesIfNecessary} from '../helpers/helper_functions'
import _ from 'lodash'
import { AVAILABLE_FILTERS } from '../helpers/constants';

// Init available filters for Auto-Complete
const basic_options = init_basic_options();
const advanced_options = initAdvancedOptions();

function init_basic_options() {
  let options = [];
  {
    Object.keys(AVAILABLE_FILTERS).forEach(function (key) {
      let operators = AVAILABLE_FILTERS[key].type.operators;
      if (operators.length > 1) {
        options.push({title: key, key: key});
      } else {
        operators.map(function (operator, i) {
          let option = key + operator;
          options.push({title: option, key: key + i});
        });
      }
    })
  }
  return options;
}

export function initAdvancedOptions() {
  let options = [];
  {
    Object.keys(AVAILABLE_FILTERS).forEach(function (key) {
      AVAILABLE_FILTERS[key].type.operators.map(function (operator, i) {

        let option = key + operator;
        let possible_values = AVAILABLE_FILTERS[key].values;
        let magic_values = AVAILABLE_FILTERS[key].magic_values;
        if(magic_values && magic_values.length>0){
          for (let [index, val] of magic_values.entries()) {
            let key = `${option}-${i}-${index}`;
            options.push({title: option + surroundWithQuotesIfNecessary(val.text), key: key});
          }
        }else if (possible_values && possible_values.length > 0 && possible_values.length < 5) {
          for (let [index, val] of possible_values.entries()) {
            let key = `${option}-${i}-${index}`;
            options.push({title: option + surroundWithQuotesIfNecessary(val.name), key: key});
          }
        }
        options.push({title: option, key: `${option}-${i}`});
      });

    })
  }
  return options;
}

export default class NavBarMenu extends Component {

  constructor(props){
    super(props);
    this.state = {
      searchInputValue: this.props.selected_filters_as_text,
      isQueriesPopupOpen: false,
      isFormOpen: false,
      auto_complete_results: []
    };
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.selectAutoCompleteResult = this.selectAutoCompleteResult.bind(this);
    this.clearSearchInput = this.clearSearchInput.bind(this);
    this.clearAndFocusSearchInput = this.clearAndFocusSearchInput.bind(this);
    this.applyIfEnter = this.applyIfEnter.bind(this);
    this.selectCustomQuery = this.selectCustomQuery.bind(this);
  }

  clearAndFocusSearchInput(){
    this.clearSearchInput();
    this.mainSearchInput.focus();
  }

  clearSearchInput() {
    log("-- Clear Search Input -- ");
    this.setState({searchInputValue: ''});
    this.props.updateSelectedFilters({}, true);
  }

  componentWillReceiveProps(nextProps) {
    log("Just received new props. nextProps", nextProps);
    if ((!this.searchInputHasFocus()) &&
        nextProps.selected_filters_as_text !== this.state.searchInputValue) {
      this.setState({ searchInputValue: nextProps.selected_filters_as_text });
    }
  }

  searchInputHasFocus() {
    return document.getElementById('mainSearchInput') === document.activeElement;
  }

  applyIfEnter(event){
    log("*** onKeyPRESSED ***", event.key);
    if(event.key === 'Enter'){
      this.props.applyFiltersChanges();
    }
  }

  validateSearchInputChange(new_input_value){
    this.setState({searchInputValue: new_input_value});
    this.toggleInputPopups(new_input_value);
    this.parseInputAndUpdateFilters(new_input_value);

    // AutoComplete
    if(new_input_value.slice(-1)===' ') {
      this.setState({
        auto_complete_results: basic_options
      })
    }else{
      let current_word = lastWordIn(new_input_value);
      const re = new RegExp('^'+_.escapeRegExp(current_word), 'i');
      const isMatch = (result) => re.test(result.title);
      this.setState({
        auto_complete_results: _.filter(advanced_options, isMatch)
      })
    }
  }

  handleSearchInputChange(event){
    this.validateSearchInputChange(event.target.value);
  }

  selectAutoCompleteResult(event, data){
    let selected_value = data.title;
    let new_input_value;
    if(this.state.searchInputValue.slice(-1)===' ') {
      new_input_value = this.state.searchInputValue + selected_value;
    }else{
      new_input_value = this.state.searchInputValue.replace(new RegExp(lastWordIn(this.state.searchInputValue) + '$'), selected_value);
    }
    this.setState({searchInputValue: new_input_value, isQueriesPopupOpen: false});
    this.mainSearchInput.focus();
    this.parseInputAndUpdateFilters(new_input_value);
  }

  toggleInputPopups(input_value) {
    if (input_value.length === 0 && this.state.isFormOpen === false) {
      this.setState({isQueriesPopupOpen: true})
    } else {
      this.setState({isQueriesPopupOpen: false})
    }
  }

  parseInputAndUpdateFilters(input_value) {
    let filters = parseInput(input_value);

    log('parseInputAndUpdateFilters', filters);
    this.props.replaceSelectedFilters({
      text: filters.text.trim(),
      projects: filters.projects,
      trackers: filters.trackers,
      status: filters.status,
      assigned_to: filters.assigned_to,
      updated_at: filters.updated_at,
      watched: filters.watched
    });
  }

  selectCustomQuery = (filters) => {
    // log("SELECT CUSTOM QUERY");
    this.closePopup();
    this.props.updateSelectedFilters(filters, true);
  };

  openPopup = () => {
    if (this.state.searchInputValue.length === 0) {
      this.setState({isQueriesPopupOpen: true, isFormOpen: false})
    }
  };

  closePopup = (e, data) => {
    this.setState({ isQueriesPopupOpen: false });
  };

  openForm = () => {
    log("OPEN FORM");
    this.setState({ isFormOpen: true, isQueriesPopupOpen: false })
  };

  closeForm = (e, data) => {
    log("close form");
    this.setState({ isFormOpen: false }, function(){
      this.mainSearchInput.focus();
    });
  };

  onInputFocus = () => {
    log("-- OnInputFocus --");
    if(this.state.isFormOpen === true){
      this.setState({ isFormOpen: false })
    }
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
            <Button icon id="mainSearchButton" onClick={this.props.applyFiltersChanges} {...this.props.areFiltersDirty ? {color:'blue'} : {}}><Icon name='search' /></Button>
            <Popup
              trigger={<Search input={{placeholder: 'Rechercher',
                                       actionPosition: "left",
                                       labelPosition: 'right',
                                       className: "searchInput",
                                       ref:(input) => { this.mainSearchInput = input; },
                                       onFocus: this.onInputFocus
                                     }}
                               fluid
                               minCharacters={1}
                               showNoResults={false}
                               noResultsMessage="Aucun filtre trouvé."
                               icon={false}
                               id="mainSearchInput"
                               className="searchInput"
                               onSearchChange={this.handleSearchInputChange}
                               onResultSelect={this.selectAutoCompleteResult}
                               results={this.state.auto_complete_results}
                               value={this.state.searchInputValue}
                               onKeyPress={this.applyIfEnter}
              />}
              content={<CustomQueries selectCustomQuery={this.selectCustomQuery}
                                      openForm={this.openForm} />}
              on='click'
              id="custom_queries_popup"
              flowing
              // offset={50}
              position='bottom left'
              open={this.state.isQueriesPopupOpen}
              onClose={this.closePopup}
              onOpen={this.openPopup}
              basic
            />
            <Icon link name='cancel' className='reset'
                  onClick={this.clearAndFocusSearchInput}
                  disabled={this.props.areFiltersDirty === false && JSON.stringify(removeBlankAttributes(this.props.current_filters)) === JSON.stringify({}) }
            />
            <Popup
              trigger={<Button icon className="last" id="filters_dropdown"><Icon name='dropdown' /></Button>}
              content={<FiltersForm current_filters={this.props.current_filters}
                                    selected_filters={this.props.selected_filters}
                                    applyFiltersChanges={this.props.applyFiltersChanges}
                                    updateSelectedFilters={this.props.updateSelectedFilters}
                                    areFiltersDirty={this.props.areFiltersDirty}
                                    closeForm={this.closeForm}
                                    clearSearchInput={this.clearSearchInput}
              />}
              on='click'
              flowing
              position='bottom right'
              basic
              wide
              id="filters_form_popup"
              open={this.state.isFormOpen}
              onClose={this.closeForm}
              onOpen={this.openForm}
            />
          </Input>
        </Menu.Item>

        <Menu.Menu position='right'>
          {/*
          <Menu.Item>
            <Radio toggle />
          </Menu.Item>
          */}
          <Modal
            trigger={<Menu.Item name='signup' onClick={this.handleSignInClick} >Connexion</Menu.Item>}
            content={<LoginForm />}
          />
        </Menu.Menu>

      </Menu>
    )
  }
}
