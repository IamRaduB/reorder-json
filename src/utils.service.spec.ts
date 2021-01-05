import { expect } from 'chai';
import { UtilService } from './util.service';

describe('UtilService', () => {
  let utilService: UtilService;

  beforeEach(() => {
    utilService = new UtilService();
  });

  describe('parsePath', () => {
    it('should throw an error if the file path does not lead to a JSON file', () => {
      const path = 'a/b/c.exe';
      expect(utilService.parsePath(path)).throws;
    });
  });
});
