import React from 'react';
import NavBarMenu, {parseInput} from '../navbarmenu';
import renderer from 'react-test-renderer';

it('should render NavBarMenu', () => {
  let applyFiltersChanges = function(){};
  let updateSelectedFilters = function(){};
  let selected_filters_as_text = function(){};
  let replaceSelectedFilters = function(){};
  let current_filters = {};
  let selected_filters = {};
  let dirty_filters = {};

  /* FIX IT
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
  */
});

test("parseInput function", () => {
  expect(parseInput('watched:true').watched).toEqual(true);
  expect(parseInput('watched:anything').watched).toEqual(true);

  expect(parseInput('projects:eCookbook').projects).toEqual(1);
  expect(parseInput('projects:2').projects).toEqual(2);

  expect(parseInput('trackers:Bug').trackers).toEqual(1);

  expect(parseInput('status:"In Progress"').issue_statuses).toEqual(2);
  // TODO expect(parseInput('status:"Terminated"').issue_statuses).toEqual("Terminated");

  expect(parseInput('anykey:anything').text).toEqual("anykey:anything");
  expect(parseInput('anything').text).toEqual("anything");

  //Combine them
  expect(parseInput('anything twice')).toEqual({"text":"anything twice"});
  expect(parseInput('anything twice projects:2')).toEqual({"projects":2, "text":"anything twice"});

});
