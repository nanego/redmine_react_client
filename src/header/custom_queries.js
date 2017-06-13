import React, {Component} from 'react'
import { Item, Button, Image, List, Menu, Popup, Divider } from 'semantic-ui-react'
import {filter_value} from "../helpers/helper_functions"
import moment from 'moment'

class CustomQueries extends Component {

  constructor(props) {
    super(props);
    this.applyCustomQuery = this.applyCustomQuery.bind(this);
  }

  applyCustomQuery(event, data){
    switch(event.currentTarget.textContent){
      case "Mes demandes par priorité":
        this.props.selectCustomQuery({assigned_to:filter_value('=', "me"), order:filter_value('=', "priority")}, true);
        break;
      case "Demandes surveillées":
        this.props.selectCustomQuery({watched:filter_value('=', "true")}, true);
        break;
      case "Traité sans activité récente":
        let date = moment().subtract(60, 'days').format("DD/MM/YYYY");
        this.props.selectCustomQuery({status:filter_value('=', 3), updated_at:filter_value('<', date)}, true);
        break;
      case "Filtres du permanent":
        this.props.selectCustomQuery({status:filter_value('=',"open"), assigned_to:filter_value('!*')}, true);
        break;
    }
  }

  render() {
    return (
      <Menu vertical secondary>
        <Menu.Item icon={false} onClick={this.applyCustomQuery}>Mes demandes par priorité</Menu.Item>
        <Menu.Item icon={false} onClick={this.applyCustomQuery} >Demandes surveillées</Menu.Item>
        <Menu.Item icon={false} onClick={this.applyCustomQuery} >Traité sans activité récente</Menu.Item>
        <Menu.Item icon={false} onClick={this.applyCustomQuery} >Filtres du permanent</Menu.Item>
        <Divider />
        <Menu.Item onClick={this.props.openForm}>Recherche avancée</Menu.Item>
      </Menu>
    )
  }
}

export default CustomQueries

