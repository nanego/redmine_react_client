import React, {Component} from 'react'
import { Menu, Input, Search, Button, Icon, Popup, Modal } from 'semantic-ui-react'
import FiltersForm from './form/filters_form'
import CustomQueries from './custom_queries'
import LoginForm from '../account/login'
import {removeBlankAttributes, parseInput, lastWordIn, log} from '../helpers/helper_functions'
import _ from 'lodash'
import { AVAILABLE_FILTERS } from '../helpers/constants';

// Init available filters for Auto-Complete
let options = [];
{Object.keys(AVAILABLE_FILTERS).forEach(function (key) {
  options.push({title: key});
})}

export default class NavBarMenu extends Component {

  constructor(props){
    super(props);
    this.state = {
      searchInputValue: this.props.selected_filters_as_text,
      isQueriesPopupOpen: false,
      isFormOpen: false,
      auto_complete_results: []
    };
    this.validateSearchInputChange = this.validateSearchInputChange.bind(this);
    this.selectAutoCompleteResult = this.selectAutoCompleteResult.bind(this);
    this.clearSearchInput = this.clearSearchInput.bind(this);
    this.applyIfEnter = this.applyIfEnter.bind(this);
    this.selectCustomQuery = this.selectCustomQuery.bind(this);
  }

  clearSearchInput(event) {
    this.props.updateSelectedFilters({}, true);
  }

  componentWillReceiveProps(nextProps) {

    log("Just received new props. nextProps", nextProps);

    if (document.getElementById('mainSearchInput') !== document.activeElement &&
        nextProps.selected_filters_as_text !== this.state.searchInputValue) {
      this.setState({ searchInputValue: nextProps.selected_filters_as_text });
      this.mainSearchInput.focus();
    }
  }

  applyIfEnter(event){
    log("*** onKeyPRESSED ***", event.key);
    if(event.key === 'Enter'){
      this.props.applyFiltersChanges();
    }
  }

  validateSearchInputChange(event){
    let input_value = event.target.value;
    this.setState({searchInputValue: input_value});
    this.toggleInputPopups(input_value);
    this.parseInputAndUpdateFilters(input_value);

    // AutoComplete
    if(input_value.slice(-1)===' ') {
      this.setState({
        auto_complete_results: []
      })
    }else{
      const re = new RegExp(_.escapeRegExp(lastWordIn(input_value)), 'i');
      const isMatch = (result) => re.test(result.title);
      this.setState({
        auto_complete_results: _.filter(options, isMatch)
      })
    }
  }

  selectAutoCompleteResult(event, data){
    let selected_value = data.title;
    let new_input_value = this.state.searchInputValue.replace(new RegExp(lastWordIn(this.state.searchInputValue) + '$'), selected_value);
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
    // console.log(e.currentTarget);
    // console.log(data);
    this.setState({ isFormOpen: false })
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
                                       ref:(input) => { this.mainSearchInput = input; }
                                     }}
                               fluid
                               minCharacters={1}
                               showNoResults={false}
                               noResultsMessage="Aucun filtre trouvé."
                               icon={false}
                               id="mainSearchInput"
                               className="searchInput"
                               onSearchChange={this.validateSearchInputChange}
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
                  onClick={this.clearSearchInput}
                  disabled={this.props.areFiltersDirty === false && JSON.stringify(removeBlankAttributes(this.props.current_filters)) === JSON.stringify({}) }
            />
            <Popup
              trigger={<Button icon className="last" id="filters_dropdown"><Icon name='dropdown' /></Button>}
              content={<FiltersForm current_filters={this.props.current_filters}
                                    selected_filters={this.props.selected_filters}
                                    applyFiltersChanges={this.props.applyFiltersChanges}
                                    updateSelectedFilters={this.props.updateSelectedFilters}
                                    searchValue={this.state.searchInputValue}
                                    areFiltersDirty={this.props.areFiltersDirty}
                                    closeForm={this.closeForm}
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
