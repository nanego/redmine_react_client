import React, {Component} from 'react'
import { Grid, Header, Icon, Form, Segment, Button, Message } from 'semantic-ui-react'

import ServiceAPI from '../services/service_api'

class LoginForm extends Component {

  state = { formData: {} }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      formData: {}
    };
  }

  handleSubmit = (event, {formData}) => {
    event.preventDefault();
    this.setState({ formData })
    alert(JSON.stringify(formData, "", 4));
    ServiceAPI.login(formData, res => {
      // callback
    });
  }

  render() {
    // const { formData } = this.state
    return (
      <Grid centered columns={1}>
        <Grid.Column>
          <Header as='h2' icon textAlign='center'>
            <Icon name='users' circular />
            <Header.Content>
              Connexion
            </Header.Content>
          </Header>
          <Form size={'small'} error onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Field>
                <Form.Input icon='user' iconPosition='left' name="email" placeholder='Adresse email' type={'email'} />
              </Form.Field>
              <Form.Field>
                <Form.Input icon='lock' iconPosition='left' name="password" placeholder='Mot de passe' type={'password'} />
              </Form.Field>
              <Button type='submit' fluid color='green'>Valider</Button>

              <Message error
                       header='Erreurs lors de la validation'
                       content='test du message'>
              </Message>

            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }

}

export default LoginForm
