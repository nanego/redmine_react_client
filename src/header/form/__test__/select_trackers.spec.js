import React from 'react';
import SelectTrackers from '../select_trackers';
import renderer from 'react-test-renderer';

var updateSelectedFilters = function(){};

it('should render SelectTrackers', () => {
  const component = renderer.create(
      <SelectTrackers selected_filters={{}} updateSelectedFilters={updateSelectedFilters} />
  );
  let select = component.toJSON();
  expect(select).toMatchSnapshot();
});