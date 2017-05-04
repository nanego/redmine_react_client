import React from 'react';
import {shallow} from 'enzyme';
import SelectProjects from '../select_projects';
import renderer from 'react-test-renderer';

var updateSelectedFilters = function(){return true;};

it('should render SelectProjects', () => {
  const component = renderer.create(
      <SelectProjects selected_filters={{}} updateSelectedFilters={updateSelectedFilters} />
  );
  let select = component.toJSON();
  expect(select).toMatchSnapshot();

  // manually trigger the callback
  // select.handleProjectsSelection(undefined, "Project1");
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
  const component = shallow(
      <SelectProjects selected_filters={{}} updateSelectedFilters={updateSelectedFilters} />
  );
  const select = component.find('select');
  const event1 = {target: {value: 'eCookbook'}};
  let handler1 = component.instance().handleProjectsSelection(event1, "eCookbook");
  let handler2 = component.instance().handleProjectsSelection(event1, {value: "eCookbook"});
  var assert = require('assert');
  assert.equal(handler1, undefined); // TODO
  assert.equal(handler2, undefined);

  // select.find('input').simulate('change', {target { value : 'hello'}});
  // component.simulate('change');

  // select.simulate('change', event1);

  // select.props('onDismiss')() //just find the dismiss prop and call the function
  // expect(log).toHaveBeenCalledWith('test')
});
