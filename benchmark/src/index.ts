/**
 * Gera o arquivo /docs/tool_comparison.json
 */
import fs from 'fs';
import path from 'path';
import { InputFile } from './InputFile';

const inputFileList: InputFile[] = [
  [2, '2-MB', 'data_2mb.json'],
  [2, '5-MB', 'data_5mb.json'],
  [2, '50-MB', 'data_50mb.json'],
  [1, 'crypto_historical_365days', '1-level', '1-MB', 'minified.json'],
  [1, 'crypto_historical_365days', '1-level', '10-MB', 'minified.json'],
  [1, 'Amazon_1-level_1-KB_minified.json'],
  [1, 'Amazon_1-level_10-KB_minified.json'],
  [1, 'Amazon_1-level_1-MB_minified.json'],
  [1, 'Amazon_1-level_10-MB_minified.json'],
  [1, 'Bookings_1-level_10-KB_minified.json'],
  [1, 'Bookings_1-level_1-MB_minified.json'],
  [1, 'Bookings_1-level_10-MB_minified.json'],
  [1, 'Chess-Game-Dataset_1-level_1-MB_minified.json'],
  [1, 'Chess-Game-Dataset_1-level_10-MB_minified.json'],
  [1, 'cumulative_1-level_1-MB_minified.json'],
  [1, 'EAFC26-Men_1-level_10-MB_minified.json'],
  [1, 'EAFC26-Men_1-level_1-MB_minified.json'],
  [1, 'employees_5-level_100-KB_minified.json'],
  [1, 'employees_5-level_1-MB_minified.json'],
  [1, 'employees_5-level_5-MB_minified.json'],
  [3, '8-KB', 'types.json'],
  [3, '112-KB', 'price.json'],
  [3, '64-KB', 'dummy-data.json'],
  [3, '372-KB', 'github-key-shortcuts.json'],
  [4, '456-KB', 'sample-large.json'],
].map((c) => new InputFile(c));

async function main(): Promise<void> {
  fs.mkdirSync(__dirname + '/../cache', { recursive: true });
  for (let file of inputFileList) {
    console.log(`Processing ${path.basename(file.fname)}...`);
    await file.load();
    file.run();
    file.saveCache();
  }
  fs.writeFileSync(
    __dirname + '/../../docs/tool_comparison.md',
    InputFile.getReport(inputFileList),
    'utf8',
  );
  console.log('File generated.');
}

main();
