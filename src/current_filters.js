import React, {Component} from 'react'
import { List, Segment, Header, Container, Grid } from 'semantic-ui-react'
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

    console.log("ids : " + ids);

    var names = [];
    if(ids instanceof Array){
      for (let id of ids) {
        names.push(array.find(function (d) {
          return d.id == id;
        }).name);
      }
    }else{
      names.push(array.find(function (d) {
        return d.id == ids;
      }).name);
    }
    return names;
  }

  render() {
    const projects = sample_projects.projects;
    const trackers = sample_trackers.trackers;

    return (

    <Grid columns={2} centered>
      <Grid.Column>
        <Container text>
          <Header attached='top'>
            <List.Icon name='filter' />
            Filtres appliqués
          </Header>
          <Segment attached>
            <span>{JSON.stringify(this.props.current_filters)}</span>
            <List>
              {(this.props.current_filters.projects > 0 || this.props.current_filters.projects.length > 0) &&
              <List.Item>
                <List.Content>
                  <List.Header as='a'>Projets</List.Header>
                  <List.Description>{this.getNamesFromIds(projects, this.props.current_filters.projects).join(', ')}</List.Description>
                </List.Content>
              </List.Item>
              }
              {(this.props.current_filters.trackers > 0 || this.props.current_filters.trackers.length > 0) &&
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
      </Grid.Column>
      <Grid.Column>
        <Container text>
          <Header attached='top'>
            <List.Icon name='filter' />
            Filtres en cours de modification
          </Header>
          <Segment attached>
            <span>{JSON.stringify(this.props.selected_filters)}</span>
            <List>
              {(this.props.selected_filters.projects > 0 || this.props.selected_filters.projects.length > 0) &&
              <List.Item>
                <List.Content>
                  <List.Header as='a'>Projets</List.Header>
                  <List.Description>{this.getNamesFromIds(projects, this.props.selected_filters.projects).join(', ')}</List.Description>
                </List.Content>
              </List.Item>
              }
              {(this.props.selected_filters.trackers > 0 || this.props.selected_filters.trackers.length > 0) &&
              <List.Item>
                <List.Content>
                  <List.Header as='a'>Trackers</List.Header>
                  <List.Description>{this.getNamesFromIds(trackers, this.props.selected_filters.trackers).join(', ')}</List.Description>
                </List.Content>
              </List.Item>
              }
              {this.props.selected_filters.text.length > 0 &&
              <List.Item>
                <List.Content>
                  <List.Header as='a'>Contient</List.Header>
                  <List.Description>{this.props.selected_filters.text}</List.Description>
                </List.Content>
              </List.Item>
              }
            </List>
          </Segment>
        </Container>
      </Grid.Column>
    </Grid>

      );
  }
}

export default ListCurrentFilters
