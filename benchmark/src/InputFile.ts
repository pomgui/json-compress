import fs from 'fs';
import { gzipSync } from 'zlib';
import { EngineResult } from './EngineResult';
import { engines } from './Engines';
import { fmt, readUrl, timeOf } from './tools';

export class InputFile {
  static totals = Array.from(
    { length: engines.length },
    () => new EngineResult({ isTotal: true }),
  );

  fname: string;
  label: string;
  url: string;
  fileLen!: number;
  zipLen!: number;
  engineResults: Record<string, EngineResult> = {};

  isCached = false;
  json: any;

  constructor(input: any[]) {
    let type, level, size, min, name;
    if (input[0] == 1) {
      //'Amazon_1-level_10-KB_minified.json' => 'https://files.jsons.live/Amazon/1-level/10-KB/minified.json'
      [, type, level, size, min] = input[2]
        ? input
        : [input[0], ...input[1].split('_')];

      this.fname = __dirname + `/../cache/${type}_${level}_${size}_${min}`;
      this.label = `${type} (${size})`;
      this.url = `https://files.jsons.live/${type}/${level}/${size}/${min}`;
    } else {
      [, size, name] = input;
      this.fname = __dirname + '/../cache/' + name;
      this.label = `${name} (${size})`;
      if (input[0] == 2)
        this.url = `https://github.com/antonmedv/json-examples/raw/refs/heads/master/${name}`;
      else if (input[0] == 3)
        this.url = `https://www.timestored.com/data/sample/${name}`;
      else if (input[0] == 4) this.url = `https://samplelib.com/json/${name}`;
      else throw new Error(`InputFile type ${input[0]} not known`);
    }
  }

  async load(): Promise<void> {
    const cacheFile = this._getCacheName('cache');
    if (fs.existsSync(cacheFile)) {
      this.isCached = true;
      const cache = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
      this.fileLen = cache.fileLen;
      this.zipLen = cache.zipLen;
      this.engineResults = Object.fromEntries(
        Object.entries(cache.engineResults).map(([k, v]) => [
          k,
          new EngineResult(v),
        ]),
      );
    } else {
      let text;
      if (fs.existsSync(this.fname)) {
        text = fs.readFileSync(this.fname, 'utf8');
        this.json = JSON.parse(text);
      } else {
        ({ text, json: this.json } = await readUrl(this.url));
        fs.writeFileSync(this.fname, text, 'utf8');
      }
      this.zipLen = gzipSync(text).length;
      this.fileLen = text.length;
    }
  }

  private _getCacheName(suffix: string): string {
    return this.fname.replace(/(?:[-_]min.*)?\.json/, `-${suffix}.json`);
  }

  run(): void {
    let minLen = Infinity;
    let minIdx = -1;
    engines.forEach((engine, i) => {
      const result = this._runEngine(engine);
      if (result.compressedLen < minLen) {
        minLen = result.compressedLen;
        minIdx = i;
      }
      InputFile.totals[i].pct += result.pct;
      InputFile.totals[i].compressedLen += result.compressedLen;
    });
    this.engineResults[engines[minIdx].name].isStarred = 1;
    InputFile.totals[minIdx].isStarred++;
  }

  private _runEngine(engine: (typeof engines)[number]): EngineResult {
    if (this.isCached) {
      return this.engineResults[engine.name];
    }
    const ret = timeOf(() => engine.run(this.json));
    const compressedText = JSON.stringify(ret.json);
    const zipLen = gzipSync(compressedText).length;
    return (this.engineResults[engine.name] = new EngineResult({
      compressedText,
      compressedLen: compressedText.length,
      zipLen,
      pct: compressedText.length / this.fileLen,
      time: ret.time,
    }));
  }

  toString() {
    return [
      `[${this.label}](${this.url})`,
      fmt(this.fileLen) + ' bytes',
      `gzip: ${fmt(this.zipLen)} bytes`,
    ].join('<br>');
  }

  static getReport(list: InputFile[]): string {
    // Header
    let s = `The following comparison was made using public JSON files from various data websites, and running the following npm packages: `;
    s += engines.map((e) => e.name).join(', ') + '.\n\n';
    s += `| File | ${engines.map((e) => e.name).join('|')}|\n`;
    s += '|' + ' --- |'.repeat(engines.length + 1) + '\n';
    // All files
    for (const file of list) {
      s += `|${file}|`;
      s += engines.map((e) => file.engineResults[e.name]).join('|');
      s += '|\n';
    }
    // Footer
    InputFile.totals.forEach((t) => (t.pct = t.pct / list.length));
    s += '|Average |';
    s += InputFile.totals.join('|');
    s += '|\n';
    return s;
  }

  saveCache() {
    const fname = this._getCacheName('cache');
    const cache = {
      label: this.label,
      url: this.url,
      fileLen: this.fileLen!,
      zipLen: this.zipLen!,
      engineResults: this.engineResults,
    };
    fs.writeFileSync(fname, JSON.stringify(cache), 'utf8');
  }
}
