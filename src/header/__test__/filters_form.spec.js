import React from 'react';
import FiltersForm from '../filters_form';
import renderer from 'react-test-renderer';

it('should render FiltersForm', () => {
  let applyFiltersChanges = function(){};
  let updateSelectedFilters = function(){};
  let searchInputValue = function(){};
  let handleSearchInputChange  = function(){};
  let current_filters = {};
  let selected_filters = {};
  let dirty_filters = {};
  const component = renderer.create(
      <FiltersForm current_filters={current_filters}
                   selected_filters={selected_filters}
                   applyFiltersChanges={applyFiltersChanges}
                   updateSelectedFilters={updateSelectedFilters}
                   searchValue={searchInputValue}
                   updateSearchValue={handleSearchInputChange}
                   dirty_filters={dirty_filters}
      />
  );
  let select = component.toJSON();
  expect(select).toMatchSnapshot();
});