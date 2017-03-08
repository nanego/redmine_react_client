import React from 'react'
import { Button, Image, List, Menu, Popup, Dropdown } from 'semantic-ui-react'
import FiltersForm from './filters_form'

const CustomQueries = () => (
  <Menu secondary vertical>
    <Menu.Item link>Mes demandes par priorité</Menu.Item>
    <Menu.Item link>Demandes surveillées</Menu.Item>
    <Menu.Item link>Traité sans activité récente</Menu.Item>
    <Dropdown item text='Recherche avancée'>
    </Dropdown>
  </Menu>
);

export default CustomQueries
