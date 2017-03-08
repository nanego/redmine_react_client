import React, {Component} from 'react'
import { List, Segment, Header, Container } from 'semantic-ui-react'
import sample_projects from './services/samples/projects.json'
import sample_trackers from './services/samples/trackers.json'

class ListCurrentFilters extends Component {

  constructor(props){
    super(props);
    this.state = {

    };
    this.getNamesFromIds = this.getNamesFromIds.bind(this);
  }

  getNamesFromIds(array, ids){
    var names = [];
    for (let id of ids) {
      names.push(array.find(function (d) {
        return d.id === id;
      }).name);
    }
    return names;
  }

  render() {
    const projects = sample_projects.projects;
    const trackers = sample_trackers.trackers;

    return (
      <Container text>
        <Header attached='top'>
          <List.Icon name='filter' />
          Filtres actuels
        </Header>
        <Segment attached>
          <List>
            {this.props.current_filters.projects.length > 0 &&
              <List.Item>
                <List.Content>
                  <List.Header as='a'>Projets</List.Header>
                  <List.Description>{this.getNamesFromIds(projects, this.props.current_filters.projects).join(', ')}</List.Description>
                </List.Content>
              </List.Item>
            }
            {this.props.current_filters.trackers.length > 0 &&
            <List.Item>
              <List.Content>
                <List.Header as='a'>Trackers</List.Header>
                <List.Description>{this.getNamesFromIds(trackers, this.props.current_filters.trackers).join(', ')}</List.Description>
              </List.Content>
            </List.Item>
            }
            {this.props.current_filters.text.length > 0 &&
            <List.Item>
              <List.Content>
                <List.Header as='a'>Contient</List.Header>
                <List.Description>{this.props.current_filters.text}</List.Description>
              </List.Content>
            </List.Item>
            }
          </List>
        </Segment>
      </Container>
      );
  }
}

export default ListCurrentFilters
