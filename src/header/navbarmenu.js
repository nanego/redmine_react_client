import React, {Component} from 'react'
import { Menu, Input, Button, Icon, Popup, Modal } from 'semantic-ui-react'
import FiltersForm from './form/filters_form'
import CustomQueries from './custom_queries'
import LoginForm from '../account/login'
import {removeBlankAttributes, parseInput} from '../helpers/helper_functions'

class NavBarMenu extends Component {

  constructor(props){
    super(props);
    this.state = {
      searchInputValue: this.props.selected_filters_as_text,
      isPopupOpen: false,
      isFormOpen: false
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
    let input_value = event.target.value;
    this.setState({searchInputValue: input_value});

    let filters = parseInput(input_value);
    this.props.replaceSelectedFilters({
      text: filters.text.trim(),
      projects: filters.projects,
      trackers: filters.trackers,
      issue_statuses: filters.issue_statuses,
      updated_at: filters.updated_at,
      watched: filters.watched
    });
  }

  openPopup = () => {
    this.setState({ isPopupOpen: true })
  };

  closePopup = (e, data) => {
    console.log("close popup");
    console.log(e.currentTarget);
    console.log(data);
    this.setState({ isPopupOpen: false })
  };

  openForm = () => {
    this.setState({ isFormOpen: true })
  };

  closeForm = (e, data) => {
    console.log("close form");
    console.log(e.currentTarget);
    console.log(data);
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
              content={<CustomQueries replaceSelectedFilters={this.props.replaceSelectedFilters}
                                      closePopup={this.closePopup}
                                      openForm={this.openForm}
              />}
              on='focus'
              id="custom_queries_popup"
              flowing
              // offset={50}
              position='bottom left'
              open={this.state.isPopupOpen}
              onClose={this.closePopup}
              onOpen={this.openPopup}
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

export default NavBarMenu
