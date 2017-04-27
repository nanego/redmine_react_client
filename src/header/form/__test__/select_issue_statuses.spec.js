import React from 'react';
import SelectIssueStatuses from '../select_issue_statuses';
import renderer from 'react-test-renderer';

var updateSelectedFilters = function(){};

it('should render SelectIssueStatuses', () => {
  const component = renderer.create(
      <SelectIssueStatuses selected_filters={{}} updateSelectedFilters={updateSelectedFilters} />
  );
  let select = component.toJSON();
  expect(select).toMatchSnapshot();
});
