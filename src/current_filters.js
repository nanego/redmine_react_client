import React, {Component} from 'react'
import { List, Segment, Header, Container, Grid } from 'semantic-ui-react'
import sample_projects from './services/samples/projects.json'
import sample_trackers from './services/samples/trackers.json'
import { getNamesFromIds } from './helpers/helper_functions'

const projects = sample_projects.projects;
const trackers = sample_trackers.trackers;

function knownFilters(filters){
  return (<Segment attached>
    <span>{JSON.stringify(filters)}</span>
    <List>
      {(filters.projects && (filters.projects > 0 || filters.projects.length > 0)) &&
      <List.Item>
        <List.Content>
          <List.Header as='a'>Projets :</List.Header>
          <List.Description>{getNamesFromIds(projects, filters.projects).join(', ')}</List.Description>
        </List.Content>
      </List.Item>
      }
      {(filters.trackers && (filters.trackers > 0 || filters.trackers.length > 0)) &&
      <List.Item>
        <List.Content>
          <List.Header as='a'>Trackers :</List.Header>
          <List.Description>{getNamesFromIds(trackers, filters.trackers).join(', ')}</List.Description>
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
