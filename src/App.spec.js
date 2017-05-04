import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow} from 'enzyme';

var assert = require('assert');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('render component with Enzyme', () => {
  const component = shallow(
      <App />
  );
  // const select = component.find('select');
  // const event1 = {target: {value: 'eCookbook'}};
  let handler1 = component.instance().updateSelectedFilters({}, false);
  assert.equal(handler1, undefined); // TODO change
  // assert.equal(component.instance().updateSelectedFiltersAsText.toHaveBeenCalled, true);
  // expect().toHaveBeenCalled

  let handler2 = component.instance().updateSelectedFilters({projects: {operator: '=', value:'3'}}, false);
  assert.equal(handler2, undefined); // TODO

  let handler3 = component.instance().updateSelectedFilters({projects: {operator: '=', value:'3'}}, true);
  assert.equal(handler3, undefined); // TODO

  // select.find('input').simulate('change', {target { value : 'hello'}});
  // component.simulate('change');

  // select.simulate('change', event1);

  // select.props('onDismiss')() //just find the dismiss prop and call the function
  // expect(log).toHaveBeenCalledWith('test')
});
