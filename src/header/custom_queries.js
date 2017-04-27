import React, {Component} from 'react'
import { Item, Button, Image, List, Menu, Popup, Dropdown } from 'semantic-ui-react'
import moment from 'moment'

var closePopup = function(){
  // Dirty hack to close popup
  document.getElementsByClassName('filters_module')[0].click();
};

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
        closePopup();
        break;
      case "Demandes surveillées":
        this.props.replaceSelectedFilters({watched:"true"}, true);
        closePopup();
        break;
      case "Traité sans activité récente":
        var date = moment().subtract(60, 'days').format("DD/MM/YYYY");
        this.props.replaceSelectedFilters({issue_statuses:3, updated_before:date}, true);
        closePopup();
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

