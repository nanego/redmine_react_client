import React, {Component} from 'react'
import { List, Segment, Header, Container, Grid } from 'semantic-ui-react'
import moment from 'moment'
import sample_projects from './services/samples/projects.json'
import sample_trackers from './services/samples/trackers.json'
import sample_issue_statuses from './services/samples/issue_statuses.json'
import { getNamesFromIds, exists } from './helpers/helper_functions'

const list_of_projects = sample_projects.projects;
const list_of_trackers = sample_trackers.trackers;
const list_of_statuses = sample_issue_statuses.issue_statuses;

function knownFilters(filters){
  return (<Segment attached>
    <span>{JSON.stringify(filters, null, 4)}</span>
    <List>
      {(exists(filters.projects) && exists(filters.projects.value)) &&
      <List.Item>
        <List.Content>
          <List.Header as='a'>Projets :</List.Header>
          <List.Description>{getNamesFromIds(list_of_projects, filters.projects.value).join(', ')}</List.Description>
        </List.Content>
      </List.Item>
      }
      {(exists(filters.trackers) && exists(filters.trackers.value)) &&
      <List.Item>
        <List.Content>
          <List.Header as='a'>Trackers :</List.Header>
          <List.Description>{getNamesFromIds(list_of_trackers, filters.trackers.value).join(', ')}</List.Description>
        </List.Content>
      </List.Item>
      }
      {(exists(filters.issue_statuses) && exists(filters.issue_statuses.value)) &&
      <List.Item>
        <List.Content>
          <List.Header as='a'>Statut :</List.Header>
          <List.Description>{getNamesFromIds(list_of_statuses, filters.issue_statuses.value).join(', ')}</List.Description>
        </List.Content>
      </List.Item>
      }
      {exists(filters.watched) && exists(filters.watched.value) &&
      <List.Item>
        <List.Content>
          <List.Header as='a'>Observateur :</List.Header>
          <List.Description>{filters.watched.value ? 'Oui':'Non'}</List.Description>
        </List.Content>
      </List.Item>
      }
      {filters.updated_before &&
      <List.Item>
        <List.Content>
          <List.Header as='a'>Mis à jour avant le</List.Header>
          <List.Description>{moment(filters.updated_at, 'DD/MM/YYYY').format('LLLL')}</List.Description>
        </List.Content>
      </List.Item>
      }
      {(filters.text && filters.text.length > 0) &&
      <List.Item>
        <List.Content>
          <List.Header as='a'>Contient :</List.Header>
          <List.Description>{filters.text}</List.Description>
        </List.Content>
      </List.Item>
      }
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
