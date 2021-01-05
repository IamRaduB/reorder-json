# Reorder JSON
Small tool that reorders JSON keys alphabetically

## Installation
`npm i -g @hovrcat/reorder-json`

#### Testing
1. `
npm i
`

2. `
npm test
`


## Usage
#### From command line
| Option | Required | Description |
| --- | --- | --- |
| --i | ❌ | Path to the JSON file to be reordered |
| --o | ✔ | Where to save the reordered JSON file |

Example: `reorder -i /path/to/file.json`

#### In code
```javascript
const { Reorder } = require('@hovrcat/reorder-json');
const handler = new Reorder();
// then await the promise
await handler.reorderJSON(inputPath, outputPath);
// or handle it in the traditional way
handler.reorderJSON(inputPath, outputPath)
        .then(() => { 
            //... 
        });
```
