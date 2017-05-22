import {log, getNameFromValue, convertToStringDate, removeBlankAttributes, convertFilterToText, normalizeFilter,
  parseInput, getIdFromName, getIdByValue, splitByKeyValue} from '../helper_functions'
// import moment from 'moment'

it('should provide log() function', () => {
  // with 1 param (string)
  expect(log("test")).toEqual("test");
  // with 2 params (string + object)
  const value = {val:3};
  expect(log("test", value)).toEqual('test : {\"val\":3}');
});

test("parseInput function", () => {
  expect(parseInput('watched:true').watched).toEqual({operator:':', value:true});
  expect(parseInput('watched:anything').watched).toEqual({operator:':', value:true});

  expect(parseInput('projects:eCookbook').projects).toEqual({operator:':', value:1});
  expect(parseInput('projects:2').projects).toEqual({operator:':', value:2});
  expect(parseInput('projects=3').projects).toEqual({operator:'=', value:3});

  expect(parseInput('trackers:Bug').trackers).toEqual({operator:':', value:1});
  expect(parseInput('trackers:Bug').trackers).toEqual({operator:':', value:1});
  expect(parseInput('trackers:"Bug"').trackers).toEqual({operator:':', value:1});
  expect(parseInput('trackers="Feature request"').trackers).toEqual({operator:'=', value:2});

  expect(parseInput('status:"In Progress"').issue_statuses).toEqual({operator:':', value:2});
  // TODO expect(parseInput('status:"Terminated"').issue_statuses).toEqual("Terminated");

  expect(parseInput('anykey:anything').text).toEqual("anykey:anything");
  expect(parseInput('anything').text).toEqual("anything");

  expect(parseInput('assigned_to:2').assigned_to).toEqual({operator:':', value:2});

  expect(parseInput('updated_at:26/02/2017').updated_at).toEqual({operator:':', value:"26/02/2017"});
  expect(parseInput('updated_at<26/02/2017    ').updated_at).toEqual({operator:'<', value:"26/02/2017"});
  expect(parseInput('updated_at>26/02/2017').updated_at).toEqual({operator:'>', value:"26/02/2017"});

  //Combine them
  expect(parseInput('anything twice')).toEqual({"text":"anything twice"});
  expect(parseInput('anything twice projects:2')).toEqual({"projects":{operator:':', value:2}, "text":"anything twice"});

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

test('getIdFromName', () => {
  expect(getIdFromName([{id:1, name:'test1'}, {id:2, name:'test2'}], 'test2')).toEqual(2);
  expect(getIdFromName([{id:1, name:'test with space 1'}, {id:2, name:'test with space 2'}], 'test with space 2')).toEqual(2);
});

test('getIdByValue', () => {
  expect(getIdByValue([{id:1, name:'test1'}, {id:2, name:'test2'}], 2)).toEqual(2);
  expect(getIdByValue([{id:1, name:'test with space 1'}, {id:2, name:'test with space 2'}], 'test with space 2')).toEqual(2);
  expect(getIdByValue([{id:1, name:'test1'}, {id:2, name:'test2'}], '"test2"')).toEqual(2);
});

test('splitByKeyValue', () => {
  expect(splitByKeyValue('test:2')).toEqual(['test:2']);
  expect(splitByKeyValue('test with spaces')).toEqual(["test", "with", "spaces"]);
  expect(splitByKeyValue('test with spaces:')).toEqual(["test", "with", "spaces:"]);
  expect(splitByKeyValue('test with spaces:value')).toEqual(["test", "with", "spaces:value"]);
  expect(splitByKeyValue('test with spaces=value')).toEqual(["test", "with", "spaces=value"]);
  expect(splitByKeyValue('test with spaces:"value"')).toEqual(["test", "with", "spaces:\"value\""]);
  expect(splitByKeyValue('test with spaces:"value with spaces"')).toEqual(["test", "with", "spaces:\"value with spaces\""]);
  expect(splitByKeyValue('test with spaces="value with spaces"')).toEqual(["test", "with", "spaces=\"value with spaces\""]);
});
