import * as _ from 'lodash';
import { readFile, writeFile } from 'fs';
import { promisify } from 'util';
import { ParseError, ReadError, WriteError } from './error';

const rf = promisify(readFile);
const wf = promisify(writeFile);

export class Reorder {
  constructor() {
  }

  reorderLevel(level: any) {
    let reordered: any = {};
    _.chain(Object.keys(level))
      .sortBy()
      .each((key: string) => {
        if (typeof level[key] === 'object') {
          reordered[key] = this.reorderLevel(level[key]);
        } else {
          reordered[key] = level[key];
        }
      })
      .value();

    return reordered;
  }

  async reorderJSON(inputPath: string, outputPath: string = inputPath) {
    let reordered: any = {};
    let data;
    try {
      data = await rf(inputPath, 'utf8');
    } catch (e) {
      console.error(e);
      throw new ReadError(inputPath);
    }

    try {
      const json = JSON.parse(data);
      reordered = this.reorderLevel(json);
    } catch (e) {
      console.error(e);
      throw new ParseError();
    }

    try {
      await wf(outputPath, JSON.stringify(reordered, null, 2));
    } catch (e) {
      console.error(e);
      throw new WriteError(outputPath);
    }
  }
}
