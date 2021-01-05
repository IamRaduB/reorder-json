import { parse } from 'path';

export class UtilService {
  parsePath(path: string) {
    try {
      const file = parse(path);
      return file.ext === '.json';
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
