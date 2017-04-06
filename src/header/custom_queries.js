import React, {Component} from 'react'
import { Item, Button, Image, List, Menu, Popup, Dropdown } from 'semantic-ui-react'

class CustomQueries extends Component {

  constructor(props) {
    super(props);
    this.simulateClick = this.simulateClick.bind(this);
    this.applyCustomQuery = this.applyCustomQuery.bind(this);
  }

  simulateClick() {
    document.getElementById('filters_dropdown').click();
  }

  applyCustomQuery(event){
    switch(event.currentTarget.textContent){
      case "Mes demandes par priorité":
        this.props.replaceSelectedFilters({assigned_to:'me', order:"priority"}, true);
        break;
      case "Demandes surveillées":
        this.props.replaceSelectedFilters({is:'starred'}, true);
        break;
      case "Traité sans activité récente":
        this.props.replaceSelectedFilters({status:'Done', updated_on:'>60.days.ago'}, true);
        break;
      default:
    }
  }

  render() {
    return (
      <Menu vertical secondary>
        <Dropdown item icon={false} onClick={this.applyCustomQuery} text="Mes demandes par priorité" />
        <Dropdown item icon={false} onClick={this.applyCustomQuery} text="Demandes surveillées" />
        <Dropdown item icon={false} onClick={this.applyCustomQuery} text="Traité sans activité récente" />
        <Dropdown item text='Recherche avancée' onClick={this.simulateClick} />
      </Menu>
    )
  }
}

export default CustomQueries

