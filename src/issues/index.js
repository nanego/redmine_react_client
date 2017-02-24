import React, {Component} from 'react'
import { Image, List, Grid, Dimmer, Loader, Button } from 'semantic-ui-react'
import Moment from 'react-moment';

class IssuesList extends Component {

  constructor(props){
    super(props);
  }

  dateFormat(input){
    if(input == null){ return ""; }
    var date = new Date(input);
    var now = new Date();
    if( date.setHours(0,0,0,0) == now.setHours(0,0,0,0) ) {
      var format = 'HH:mm';
    } else {
      var format = 'd MMM';
    }
    return format;
  }

  getClassByPriority(priority){
    if(priority == null){ return ""; }
    return 'priority-'+priority.id
  }

  render() {
    if(this.props.issues)
      console.log(JSON.stringify(this.props.issues[1]));
    return (
      <Grid padded columns={1} divided>

        <Grid.Column>
          <Dimmer active={this.props.isLoading}>
            <Loader />
          </Dimmer>

          <List celled divided selection verticalAlign='middle' className='issues ' >
            {this.props.issues.map(issue =>
              <List.Item key={issue.id} className={this.getClassByPriority(issue.priority)}>
                <List.Content floated='right'>
                  <Moment locale="fr" format={this.dateFormat(issue.updated_on)} >
                    {issue.updated_on}
                  </Moment>
                </List.Content>
                <List.Content className="tracker">
                  <Button circular
                          className={ 'tr-'+issue.tracker.id }
                          content={issue.tracker.name === 'Information' ? issue.tracker.name.substring(0, 3) : issue.tracker.name.substring(0, 2)} />
                </List.Content>
                <List.Content className="issue_id">
                  {issue.id}
                </List.Content>
                <List.Content className="project">
                  {issue.project.name}
                </List.Content>
                <List.Content className="subject">
                  {issue.subject}
                </List.Content>
                <List.Content className="notes_counter">
                  <span className={"count " + issue.notes_count === 0 ? 'zero' : 'at-least-one'}>
                    {issue.notes_count }
                  </span>
                </List.Content>
                <List.Content className="last_note">
                  {issue.last_note}
                </List.Content>
              </List.Item>
            )}
          </List>
        </Grid.Column>
      </Grid>
    )
  }
}

export default IssuesList
