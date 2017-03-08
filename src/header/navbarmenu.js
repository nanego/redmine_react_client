import React, {Component} from 'react'
import { DropDown, Menu, Input, Button, Icon, Popup } from 'semantic-ui-react'
import FiltersForm from './filters_form'
import CustomQueries from './custom_queries'
import SelectProjects from './select_projects'
import LoginForm from '../account/login'

class NavBarMenu extends Component {

  constructor(props){
    super(props);
    this.state = {
      // show_dropdown: false
      searchInputValue: ""
    };
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.clearSearchInput = this.clearSearchInput.bind(this);
    this.applySearchInput = this.applySearchInput.bind(this);
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

  applySearchInput(event){
    this.props.handleFiltersChanges({text: this.state.searchInputValue})
  }

  render(){
    return (
      <div>
        <Menu attached='top'>

          <Menu.Item>
            {JSON.stringify(this.props.current_filters)}
          </Menu.Item>

          <Menu.Item>
            <Input type="text"
                   action
                   actionPosition="left"
                   placeholder='Rechercher'>
              <Button icon onClick={this.applySearchInput}><Icon name='search' /></Button>
              <Popup
                trigger={<Input placeholder='Rechercher'
                                actionPosition="left"
                                labelPosition={'right'}
                                value={this.state.searchInputValue}
                                onChange={this.handleSearchInputChange}  />}
                content={<CustomQueries />}
                on='focus'
                flowing
                offset={50}
                position='bottom left'
                basic
              />
              <Button icon onClick={this.clearSearchInput}><Icon name='cancel' /></Button>
              <Popup
                trigger={<Button icon className="last"><Icon name='dropdown' /></Button>}
                content={<FiltersForm current_filters={this.props.current_filters}
                                      handleFiltersChanges={this.props.handleFiltersChanges}
                                      onSubmit={this.closeDropdown} />}
                on='click'
                flowing
                offset={-5}
                position='bottom right'
                basic
              />
            </Input>
          </Menu.Item>

          <Menu.Menu position='right'>
            <Popup
              trigger={<Menu.Item name='signup' onClick={this.handleSignInClick} >Connexion</Menu.Item>}
              content={<LoginForm />}
              on='click'
              flowing
              position='bottom right'
            />
          </Menu.Menu>

        </Menu>
      </div>
    )
  }
}

export default NavBarMenu
