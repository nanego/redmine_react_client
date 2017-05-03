import React, {Component} from 'react'
import { Item, Button, Image, List, Menu, Popup, Dropdown, Divider } from 'semantic-ui-react'
import moment from 'moment'

class CustomQueries extends Component {

  constructor(props) {
    super(props);
    this.applyCustomQuery = this.applyCustomQuery.bind(this);
  }

  applyCustomQuery(event, data){
    switch(event.currentTarget.textContent){
      case "Mes demandes par priorité":
        this.props.replaceSelectedFilters({assigned_to:'me', order:"priority"}, true);
        // this.props.closePopup(event, data);
        break;
      case "Demandes surveillées":
        this.props.replaceSelectedFilters({watched:"true"}, true);
        // closePopup();
        break;
      case "Traité sans activité récente":
        var date = moment().subtract(60, 'days').format("DD/MM/YYYY");
        this.props.replaceSelectedFilters({issue_statuses:3, updated_before:date}, true);
        // closePopup();
        break;
      case "Filtres du permanent":
        this.props.replaceSelectedFilters({assigned_to:"none"}, true);
        // closePopup();
        break;
      default:
        this.props.closePopup(event, data);
    }
  }

  render() {
    return (
      <Menu vertical secondary>
        <Dropdown item icon={false} onClick={this.applyCustomQuery} text="Mes demandes par priorité" />
        <Dropdown item icon={false} onClick={this.applyCustomQuery} text="Demandes surveillées" />
        <Dropdown item icon={false} onClick={this.applyCustomQuery} text="Traité sans activité récente" />
        <Dropdown item icon={false} onClick={this.applyCustomQuery} text="Filtres du permanent" />
        <Divider />
        <Dropdown item text='Recherche avancée' onClick={this.props.openForm} />
      </Menu>
    )
  }
}

export default CustomQueries

