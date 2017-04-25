import React from 'react';
import SubMenu from '../submenu';
import renderer from 'react-test-renderer';

it('should render NavBarMenu', () => {
  const component = renderer.create(
      <SubMenu />
  );
  let menu = component.toJSON();
  expect(menu).toMatchSnapshot();
});