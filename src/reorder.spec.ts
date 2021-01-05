import chai, { expect } from 'chai';
import { stub, spy } from 'sinon';
import chaiArrays from 'chai-arrays';
import { Reorder } from './reorder';
import fs from 'fs';

chai.use(chaiArrays);

describe('Reorder', () => {
  let reorder: Reorder;

  before(() => {
    reorder = new Reorder();
  });

  describe('reorderLevel', () => {
    it('should sort alphabetically a one-level json', () => {
      let level = {
        c: '1',
        a: '2',
        b: 3,
      };
      let result = reorder.reorderLevel(level);
      expect(result).to.be.a('object');
      let keys = Object.keys(result);
      expect(keys.length).eq(3);
      expect(keys).to.be.sorted();
      expect(result).deep.eq({
        a: '2',
        b: 3,
        c: '1',
      });
    });
  });

  describe('reorderJSON', () => {
    let rf, wf: any;
    beforeEach(() => {
      rf = stub(fs, 'readFile')
        .resolves({
          "user": {
            "firstName": "John",
            "lastName": "Doe"
          },
          "address": {
            "street": "Main St",
            "number": 1
          }
        });
      wf = spy(fs, 'writeFile');
    });

    it('should write the reordered json', async () => {
      const input = 'examples/test1.json';
      const output = 'examples/test1.output.json';
      await reorder.reorderJSON(input, output);
    });
  });
});
