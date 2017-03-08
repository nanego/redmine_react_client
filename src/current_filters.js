import React, {Component} from 'react'
import { List, Segment } from 'semantic-ui-react'

class ListCurrentFilters extends Component {

  constructor(props){
    super(props);
    this.state = {

    };
    // this.handleFiltersChanges = this.handleFiltersChanges.bind(this);
  }

  render() {
    return (
      <Segment>
      <List>

        <List.Item>
          <List.Icon name='marker' />
          <List.Content>
            <List.Header as='a'>Projets</List.Header>
            <List.Description>{this.props.current_filters.projects.join(', ')}</List.Description>
          </List.Content>
        </List.Item>

      </List>
      </Segment>
      );
  }
}

export default ListCurrentFilters
