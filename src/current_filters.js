import React, {Component} from 'react'
import { List, Segment, Header, Container, Grid } from 'semantic-ui-react'
import moment from 'moment'
import { getNamesFromIds, exists, convertToBoolean, to_s } from './helpers/helper_functions'
import { LIST_OF_PROJECTS, LIST_OF_TRACKERS, LIST_OF_STATUSES, LIST_OF_USERS } from './helpers/constants'

function item(label, filter, description){
  return (exists(filter)) &&
    <List.Item>
      <List.Content>
        <List.Header as='a'>{label + (exists(filter.operator) ? (' ' + to_s(filter.operator)) : ' :')}</List.Header>
        <List.Description>{description}</List.Description>
      </List.Content>
    </List.Item>
}

function knownFilters(filters){
  return (<Segment attached>
    <span>{JSON.stringify(filters, null, 4)}</span>
    <List>
      {item('Projets', filters.projects, (exists(filters.projects) && exists(filters.projects.value) && getNamesFromIds(LIST_OF_PROJECTS, filters.projects.value).join(', ')))}
      {item('Trackers', filters.trackers, (exists(filters.trackers) && exists(filters.trackers.value) && getNamesFromIds(LIST_OF_TRACKERS, filters.trackers.value).join(', ')))}
      {item('Statut', filters.issue_statuses, (exists(filters.issue_statuses) && exists(filters.issue_statuses.value) && getNamesFromIds(LIST_OF_STATUSES, filters.issue_statuses.value).join(', ')))}
      {item('Observateur', filters.watched, (exists(filters.watched) && exists(filters.watched.value) && convertToBoolean(filters.watched.value) ? 'Oui':'Non'))}
      {item('Assigné à', filters.assigned_to, (exists(filters.assigned_to) && exists(filters.assigned_to.value) && getNamesFromIds(LIST_OF_USERS, filters.assigned_to.value).join(', ')))}
      {exists(filters.updated_at) && exists(filters.updated_at.value) && item('Mis à jour', filters.updated_at, moment(filters.updated_at.value, 'DD/MM/YYYY').format('LLLL'))}
      {(filters.text && filters.text.length > 0) && item('Contient', filters.text, filters.text)}
    </List>
  </Segment>)
}

class ListCurrentFilters extends Component {
  render() {
    return (
    <Grid columns={2} centered className="list_current_filters">
      <Grid.Column>
        <Container text>
          <Header attached='top'>
            <List.Icon name='filter' />
            Filtres appliqués
          </Header>
          {knownFilters(this.props.current_filters)}
        </Container>
      </Grid.Column>
      <Grid.Column>
        <Container text>
          <Header attached='top'>
            <List.Icon name='filter' />
            Filtres en cours de modification
          </Header>
          {knownFilters(this.props.selected_filters)}
        </Container>
      </Grid.Column>
    </Grid>
    );
  }
}

export default ListCurrentFilters
