import {log, getNameFromValue, convertToStringDate, removeBlankAttributes, convertFilterToText, normalizeFilter} from '../helper_functions'
// import moment from 'moment'

it('should provide log() function', () => {
  // with 1 param (string)
  expect(log("test")).toEqual("test");
  // with 2 params (string + object)
  const value = {val:3};
  expect(log("test", value)).toEqual('test : {\"val\":3}');
});

test('getNameFromValue(key, value) function', () => {
  // Search by name
  var name = getNameFromValue('status', 'Done');
  expect(name).toEqual('Done');
  // Search by missing name
  var name = getNameFromValue('status', 'Terminated');
  expect(name).toEqual('Terminated');
  // Search by id
  var name = getNameFromValue('status', 3);
  expect(name).toEqual('Done');
});

test('removeBlankAttributes', () => {
  expect(removeBlankAttributes({date:'26/01/2016'})).toEqual({date:'26/01/2016'});
  expect(removeBlankAttributes({date:'26/01/2016', empty_attr: undefined})).toEqual({date:'26/01/2016'});
  expect(removeBlankAttributes({date:'26/01/2016', empty_attr: ""})).toEqual({date:'26/01/2016'});
  expect(removeBlankAttributes({projects:{}})).toEqual({});
  expect(removeBlankAttributes({date:'26/01/2016', projects:{}})).toEqual({date:'26/01/2016'});
});

test('convertToStringDate function', () => {
  // moment.locale('fr');
  expect(convertToStringDate('26/01/2016')).toEqual('26/01/2016');
  expect(convertToStringDate('30/02/2016')).toEqual(''); // Invalid date
});

test('convertFilterToText', () => {
  expect(convertFilterToText('projects', {operator:'=', value:'1'})).toEqual("projects=eCookbook ");
});

test('normalizeFilter', () => {
  expect(normalizeFilter({"projects":{operator:':', value:'1'}})).toEqual({"projects":{operator:':', value:1}});
  expect(normalizeFilter({"text":"a"})).toEqual({"text":"a"});
});
