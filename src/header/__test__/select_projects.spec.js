import React from 'react';
import {shallow} from 'enzyme';
import SelectProjects from '../select_projects';
import renderer from 'react-test-renderer';

var updateSelectedFilters = function(){};

it('should render SelectProjects', () => {
  const component = renderer.create(
      <SelectProjects selected_filters={{}} updateSelectedFilters={updateSelectedFilters} />
  );
  let select = component.toJSON();
  expect(select).toMatchSnapshot();

  // manually trigger the callback
  // select.props.handleProjectsSelection();
  // re-rendering
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();

  // manually trigger the callback
  // tree.props.onMouseLeave();
  // re-rendering
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
});

it('render component with Enzyme', () => {
  const select = shallow(
      <SelectProjects selected_filters={{}} updateSelectedFilters={updateSelectedFilters} />
  );
  expect(select.find('input').value).toEqual(undefined);

  // select.find('input').simulate('change', {target { value : 'hello'}});
  // select.find('select').simulate('change');
});