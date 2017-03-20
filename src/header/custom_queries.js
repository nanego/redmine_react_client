import React, {Component} from 'react'
import { Button, Image, List, Menu, Popup, Dropdown } from 'semantic-ui-react'
import FiltersForm from './filters_form'

class CustomQueries extends Component {

  constructor(props) {
    super(props);
    this.simulateClick = this.simulateClick.bind(this);
  }

  simulateClick(e) {
    console.log("simulateClick");
    // console.log(e.target.getAttribute("id"));
    document.getElementById('filters_dropdown').click();
    // this.props.filters_dropdown.click();
  }

  render(){
    return <Menu secondary vertical>
        <Menu.Item link>Mes demandes par priorité</Menu.Item>
        <Menu.Item link>Demandes surveillées</Menu.Item>
        <Menu.Item link>Traité sans activité récente</Menu.Item>
        <Dropdown item text='Recherche avancée'
                  onClick={this.simulateClick}
        >
        </Dropdown>
    </Menu>
  }
}

export default CustomQueries

