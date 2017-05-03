import React, {Component} from 'react'
import { Grid, Header, Icon, Form, Segment, Button, Message, Modal, Dropdown } from 'semantic-ui-react'

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
    this.setState({ formData });
    alert(JSON.stringify(formData, "", 4));
    ServiceAPI.login(formData, res => {
      // callback
    });
  };

  render() {
    // const { formData } = this.state
    const options = [
      { key: 1, text: 'Portail Centre Serveur', value: 1 },
      { key: 2, text: 'Portail PIA recette', value: 2 },
      { key: 3, text: 'Portail SIRH', value: 3 },
    ];

    return (
<Modal.Content>
  <Grid centered columns={3}>
    <Grid.Column />
    <Grid.Column>
          <Header as='h2' icon textAlign='center'>
            <Icon name='user' circular />
            <Header.Content>
              Connexion
            </Header.Content>
          </Header>
          <Form size={'small'} error onSubmit={this.handleSubmit}>
            <Form.Field>
              <Form.Input icon='user' iconPosition='left' name="email" placeholder='Adresse email' type={'email'} />
            </Form.Field>
            <Form.Field>
              <Form.Input icon='lock' iconPosition='left' name="password" placeholder='Mot de passe' type={'password'} />
            </Form.Field>
            <Form.Field>
              <Dropdown placeholder='Sélectionnez une instance Redmine' selection options={options} />
            </Form.Field>
            <Button type='submit' fluid color='green'>Valider</Button>

            {/*
            <Message error
                     header='Erreurs lors de la validation'
                     content='test du message'>
            </Message>
            */}
          </Form>
    </Grid.Column>
    <Grid.Column />
  </Grid>
</Modal.Content>
    )
  }

}

export default LoginForm
