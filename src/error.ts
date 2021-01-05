export class ReadError extends Error {
  constructor(filePath: string) {
    super(`Error reading file path ${filePath}`);
  }
}

export class RequiredError extends Error {
  constructor() {
    super('No file path provided');
  }
}

export class InvalidError extends Error {
  constructor() {
    super('Please enter the path to a valid json file');
  }
}

export class ParseError extends Error {
  constructor() {
    super('Error parsing file contents');
  }
}

export class WriteError extends Error {
  constructor(filePath: string) {
    super(`Error writing to file ${filePath}`);
  }
}
