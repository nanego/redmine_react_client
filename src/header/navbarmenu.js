import React, {Component} from 'react'
import { Dropdown, Menu, Input } from 'semantic-ui-react'
import FiltersForm from './filters_form'

class NavBarMenu extends Component {

  constructor(props){
    super(props);
    this.state = {
      // show_dropdown: false
    }
  }

  preventClose(event){
    if (event) {
      console.log("preventClose : event : " + event.target);
      if (event.target.name == "apply_filters") {
        return false;
      } else {
        throw new Error('This is not an error. This is just to abort javascript');
      }
    }
    return false;
  }

  closeDropdown(event){
    console.log("closeDropdown : event : "+ event.target);
  }

  render(){
    return (
      <div>
        <Menu attached='top'>
          <Dropdown item icon='wrench' className='filters_dropdown'
                    closeOnBlur={false} closeOnChange={false} openOnFocus={true}
                    onClose={this.preventClose}>
            <Dropdown.Menu>
              <FiltersForm current_filters={this.props.current_filters}
                           handleFiltersChanges={this.props.handleFiltersChanges}
                           onSubmit={this.closeDropdown}
              />
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Item>
            {JSON.stringify(this.props.current_filters)}
          </Menu.Item>

          <Menu.Menu position='right'>
            <Menu.Item>
              <Input action={{ type: 'submit', content: 'Go' }} placeholder='Rechercher' />
            </Menu.Item>
            <Menu.Item name='signup' onClick={this.handleItemClick} >
              Mon compte
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

export default NavBarMenu
