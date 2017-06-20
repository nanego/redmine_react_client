import {initAdvancedOptions} from '../auto_completion';

test('initAdvancedOptions', () => {
  expect(initAdvancedOptions().find(x => x.key === 'projects:-0').title).toEqual("projects:");
  expect(initAdvancedOptions().find(x => x.key === 'assigned_to:-0').title).toEqual("assigned_to:");
  expect(initAdvancedOptions().find(x => x.key === 'assigned_to:-0-0').title).toEqual("assigned_to:me");
  expect(initAdvancedOptions().find(x => x.key === 'updated_at:-0-1').title).toEqual('updated_at:"Il y a une semaine"');
});
