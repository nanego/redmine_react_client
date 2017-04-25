import React from 'react';
import CustomQueries from '../custom_queries';
import renderer from 'react-test-renderer';

it('should render CustomQueries', () => {
  var replaceSelectedFilters = function(){};
  const component = renderer.create(
      <CustomQueries replaceSelectedFilters={replaceSelectedFilters} />
  );
  let select = component.toJSON();
  expect(select).toMatchSnapshot();
});