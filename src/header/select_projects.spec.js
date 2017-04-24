import React from 'react';
import SelectProjects from './select_projects';
import renderer from 'react-test-renderer';

it('loads SelectProjects', () => {
  var updateSelectedFilters = function(){};
  const component = renderer.create(
      <SelectProjects selected_filters={{}} updateSelectedFilters={updateSelectedFilters} />
  );
  let select = component.toJSON();
  expect(select).toMatchSnapshot();

  // manually trigger the callback
  // select.handleProjectsSelection();
  // re-rendering
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();

  // manually trigger the callback
  // tree.props.onMouseLeave();
  // re-rendering
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
});