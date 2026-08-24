import { fmt } from './tools';

export class EngineResult {
  public isTotal = false;
  public isStarred = 0;
  public compressedText = '';
  public compressedLen = 0;
  public zipLen = 0;
  public pct = 0;
  public time = 0;

  constructor(opt?: any) {
    Object.assign(this, opt);
  }

  toString(): string {
    return (
      this.isTotal
        ? [
            this.isStarred ? this.isStarred + ' ⭐' : '',
            fmt(100 * this.pct, 2) + '%',
            // fmt(this.compressedLen / this.time / 1024) + 'KB/ms',
          ]
        : [
            (this.isStarred ? '⭐ ' : '') + fmt(this.compressedLen) + ' bytes',
            fmt(100 * this.pct, 1) + '%',
            'gzip: ' + fmt(this.zipLen) + ' bytes',
            `time: ${fmt(this.time, 2)}ms`,
          ]
    ).join('<br>');
  }
}
