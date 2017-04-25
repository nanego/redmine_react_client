import React from 'react';
import NavBarMenu from '../navbarmenu';
import renderer from 'react-test-renderer';

it('should render NavBarMenu', () => {
  let applyFiltersChanges = function(){};
  let updateSelectedFilters = function(){};
  let selected_filters_as_text = function(){};
  let replaceSelectedFilters = function(){};
  let current_filters = {};
  let selected_filters = {};
  let dirty_filters = {};
  const component = renderer.create(
      <NavBarMenu current_filters={current_filters}
                  selected_filters={selected_filters}
                  selected_filters_as_text={selected_filters_as_text}
                  applyFiltersChanges={applyFiltersChanges}
                  updateSelectedFilters={updateSelectedFilters}
                  replaceSelectedFilters={replaceSelectedFilters}
                  dirty_filters={dirty_filters}
      />
  );
  let navbar = component.toJSON();
  expect(navbar).toMatchSnapshot();
});