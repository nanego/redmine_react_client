import React from 'react';
import ListCurrentFilters from '../current_filters';
import renderer from 'react-test-renderer';

it('should render CurrentFilters', () => {
  const component = renderer.create(
      <ListCurrentFilters current_filters={{ "projects": { "operator": "=", "value": 1 }, "trackers": { "operator": "=", "value": 2 }, "issue_statuses": { "operator": "=", "value": 2 }, "watched": { "operator": "=", "value": "true" }, "assigned_to": { "operator": "=", "value": 1 }, "updated_at": { "operator": ">", "value": "12/12/2017" }, "text": "test" }}
                          selected_filters={{ "text": "" }}
                          selected_filters_as_text={'projects=eCookbook trackers="Feature request" status="In Progress" watched=true assigned_to=1 updated_at>12/12/2017 test'}/>
  );
  let select = component.toJSON();
  expect(select).toMatchSnapshot();
});
