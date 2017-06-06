import React from 'react';
import FiltersForm from '../filters_form';
import renderer from 'react-test-renderer';

let applyFiltersChanges = function(){};
let updateSelectedFilters = function(){};
let searchInputValue = function(){};
let handleSearchInputChange  = function(){};

it('should render FiltersForm with empty filters', () => {
  let current_filters = {};
  let selected_filters = {};
  let areFiltersDirty = false;
  const component = renderer.create(
      <FiltersForm current_filters={current_filters}
                   selected_filters={selected_filters}
                   applyFiltersChanges={applyFiltersChanges}
                   updateSelectedFilters={updateSelectedFilters}
                   searchValue={searchInputValue}
                   updateSearchValue={handleSearchInputChange}
                   areFiltersDirty={areFiltersDirty}
      />
  );
  let select = component.toJSON();
  expect(select).toMatchSnapshot();
});

it('should render FiltersForm with NOT empty filters', () => {
  let current_filters = { "projects": { "operator": "=", "value": 1 }, "trackers": { "operator": "=", "value": 2 }, "status": { "operator": "=", "value": 2 }, "watched": { "operator": "=", "value": "true" }, "assigned_to": { "operator": "=", "value": 1 }, "updated_at": { "operator": ">", "value": "12/12/2017" }, "text": "test" };
  let selected_filters = { "text": "" };
  let areFiltersDirty = true;
  const component = renderer.create(
      <FiltersForm current_filters={current_filters}
                   selected_filters={selected_filters}
                   applyFiltersChanges={applyFiltersChanges}
                   updateSelectedFilters={updateSelectedFilters}
                   searchValue={searchInputValue}
                   updateSearchValue={handleSearchInputChange}
                   areFiltersDirty={areFiltersDirty}
      />
  );
  let select = component.toJSON();
  expect(select).toMatchSnapshot();
});
