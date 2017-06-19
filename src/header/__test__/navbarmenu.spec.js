import React from 'react';
import NavBarMenu, {initAdvancedOptions} from '../navbarmenu';
import renderer from 'react-test-renderer';

it('should render NavBarMenu', () => {
  let applyFiltersChanges = function(){};
  let updateSelectedFilters = function(){};
  let selected_filters_as_text = function(){};
  let replaceSelectedFilters = function(){};
  let current_filters = { "projects": { "operator": "=", "value": 1 }, "trackers": { "operator": "=", "value": 2 }, "status": { "operator": "=", "value": 2 }, "watched": { "operator": "=", "value": "true" }, "assigned_to": { "operator": "=", "value": 1 }, "updated_at": { "operator": ">", "value": "12/12/2017" }, "text": "test" };
  let selected_filters = { "text": "" };
  let areFiltersDirty = true;

  /* TODO Fix it
  const component = renderer.create(
      <NavBarMenu current_filters={current_filters}
                  selected_filters={selected_filters}
                  selected_filters_as_text={selected_filters_as_text}
                  applyFiltersChanges={applyFiltersChanges}
                  updateSelectedFilters={updateSelectedFilters}
                  replaceSelectedFilters={replaceSelectedFilters}
                  areFiltersDirty={areFiltersDirty}
      />
  );
  let navbar = component.toJSON();
  expect(navbar).toMatchSnapshot();
  */

});

test('initAdvancedOptions', () => {
  expect(initAdvancedOptions().find(x => x.key === 'projects:-0').title).toEqual("projects:");
  expect(initAdvancedOptions().find(x => x.key === 'assigned_to:-0').title).toEqual("assigned_to:");
  expect(initAdvancedOptions().find(x => x.key === 'assigned_to:-0-0').title).toEqual("assigned_to:me");
  // TODO expect(initAdvancedOptions().find(x => x.key === 'assigned_to1me').title).toEqual("assigned_to:me");
});
