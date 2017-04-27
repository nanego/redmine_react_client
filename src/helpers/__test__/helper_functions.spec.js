import {log} from '../helper_functions'

it('should provide log() function', () => {
  // with 1 param (string)
  expect(log("test")).toEqual("test");
  // with 2 params (string + object)
  const value = {val:3};
  expect(log("test", value)).toEqual('test : {\"val\":3}');
});
