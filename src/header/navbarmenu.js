import React, {Component} from 'react'
import { Menu, Input, Search, Button, Icon, Popup, Modal } from 'semantic-ui-react'
import FiltersForm from './form/filters_form'
import {basic_options, advanced_options, custom_queries_options} from './auto_completion'
import LoginForm from '../account/login'
import {removeBlankAttributes, parseInput, lastWordIn, log} from '../helpers/helper_functions'
import _ from 'lodash'

export default class NavBarMenu extends Component {

  constructor(props){
    super(props);
    this.state = {
      searchInputValue: this.props.selected_filters_as_text,
      isFormOpen: false,
      showResultsAsCustomQueries: true,
      auto_complete_results: custom_queries_options
    };
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.selectAutoCompleteResult = this.selectAutoCompleteResult.bind(this);
    this.clearSearchInput = this.clearSearchInput.bind(this);
    this.clearAndFocusSearchInput = this.clearAndFocusSearchInput.bind(this);
    this.applyIfEnter = this.applyIfEnter.bind(this);
    this.resetSearchSuggestions = this.resetSearchSuggestions.bind(this);
  }

  clearAndFocusSearchInput(){
    this.clearSearchInput();
    this.mainSearchInput.focus();
  }

  clearSearchInput() {
    log("-- Clear Search Input -- ");
    this.setState({searchInputValue: ''}, function() {
      this.resetSearchSuggestions('');
    });
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
    this.reset_search_suggestions(new_input_value);
    this.parseInputAndUpdateFilters(new_input_value);
  }

  display_suggestions(new_input_value) {
    // AutoComplete
    if (new_input_value.slice(-1) === ' ') {
      this.setState({
        showResultsAsCustomQueries: false,
        auto_complete_results: basic_options
      })
    } else {
      let current_word = lastWordIn(new_input_value);
      const re = new RegExp('^' + _.escapeRegExp(current_word), 'i');
      const isMatch = (result) => re.test(result.title);
      this.setState({
        showResultsAsCustomQueries: false,
        auto_complete_results: _.filter(advanced_options, isMatch)
      })
    }
  }

  display_custom_queries(){
    this.setState({
      showResultsAsCustomQueries: true,
      auto_complete_results: custom_queries_options
    })
  }

  handleSearchInputChange(event){
    this.validateSearchInputChange(event.target.value);
  }

  selectAutoCompleteResult(event, data){
    switch (data.action){
      case 'custom_query':
        // Apply custom query
        this.selectCustomQuery(data.filter, true);
        break;
      case 'open_form':
        // Open advanced search form
        this.openForm();
        break;
      default:
        // Auto-complete input field
        let selected_value = data.title;
        let new_input_value;
        if(this.state.searchInputValue.slice(-1)===' ') {
          new_input_value = this.state.searchInputValue + selected_value;
        }else{
          new_input_value = this.state.searchInputValue.replace(new RegExp(lastWordIn(this.state.searchInputValue) + '$'), selected_value);
        }
        this.setState({searchInputValue: new_input_value});
        this.mainSearchInput.focus();
        this.parseInputAndUpdateFilters(new_input_value);
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
    this.props.replaceSelectedFilters(filters, true);
  };

  openForm = () => {
    log("OPEN FORM");
    this.setState({ isFormOpen: true })
  };

  closeForm = (e, data) => {
    log("close form");
    this.setState({ isFormOpen: false }, function(){
      this.mainSearchInput.focus();
    });
  };

  onInputFocus = () => {
    log("-- OnInputFocus --");
    this.reset_search_suggestions(this.state.searchInputValue);
    if(this.state.isFormOpen === true){
      this.setState({ isFormOpen: false })
    }
  };

  resetSearchSuggestions(input) {
    if (input.length === 0) {
      this.display_custom_queries();
    } else {
      this.display_suggestions(input);
    }
  }

  render(){

    return (
      <Menu attached='top'>

        <Menu.Item className="filters_module">
          <Input type="text"
                 action
                 icon
                 actionPosition="left"
                 placeholder='Rechercher'
                 className='searchController'>
            <Button icon id="mainSearchButton" onClick={this.props.applyFiltersChanges} {...this.props.areFiltersDirty ? {color:'blue'} : {}}><Icon name='search' /></Button>
            <Search input={{placeholder: 'Rechercher',
              actionPosition: "left",
              labelPosition: 'right',
              className: "searchInput",
              ref:(input) => { this.mainSearchInput = input; },
              onFocus: this.onInputFocus }}
                    fluid
                    minCharacters={0}
                    showNoResults={false}
                    noResultsMessage="Aucun filtre trouvé."
                    icon={false}
                    id="mainSearchInput"
                    className={"searchInput " + (this.state.showResultsAsCustomQueries ? 'custom_queries' : 'suggestions')}
                    onSearchChange={this.handleSearchInputChange}
                    onResultSelect={this.selectAutoCompleteResult}
                    results={this.state.auto_complete_results}
                    value={this.state.searchInputValue}
                    onKeyPress={this.applyIfEnter}
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
