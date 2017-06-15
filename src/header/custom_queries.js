import React, {Component} from 'react'
import { Menu, Divider } from 'semantic-ui-react'
import {filter_value, log} from "../helpers/helper_functions"
import moment from 'moment'

const queries = [{title: "Mes demandes par priorité", filter: {assigned_to:filter_value('=', "me"), order:filter_value('=', "priority")}},
  {title: "Demandes surveillées", filter: {watched:filter_value('=', "true")}},
  {title: "Traité sans activité récente", filter: {status:filter_value('=', 3), updated_at:filter_value('<', moment().subtract(60, 'days').format("DD/MM/YYYY"))}},
  {title: "Filtres du permanent", filter: {status:filter_value('=',"open"), assigned_to:filter_value('!*')}}
];

class CustomQueries extends Component {

  constructor(props) {
    super(props);
    this.applyCustomQuery = this.applyCustomQuery.bind(this);
  }

  applyCustomQuery(event, data){
    this.props.selectCustomQuery(queries[data.index].filter, true);
  }

  render() {
    let _this = this;
    return (
      <Menu vertical secondary>
        {queries.map(function(query, i){
          return <Menu.Item icon={false} onClick={_this.applyCustomQuery} index={i} key={i}>{query.title}</Menu.Item>;
        })}
        <Divider />
        <Menu.Item onClick={this.props.openForm}>Recherche avancée</Menu.Item>
      </Menu>
    )
  }
}

export default CustomQueries

