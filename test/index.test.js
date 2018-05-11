import { navigator, window } from './support/mocks';
import PagePerformance from '../src/index';

const assert = require('assert');

describe('PagePerformance', () => {
  let json;
  let raw;

  before(() => {
    global.navigator = navigator;
    global.window = window;

    const performance = new PagePerformance();

    json = performance.toJSON();
    raw = performance.toJSONRaw();
  });

  describe('toJSON', () => {
    it('should deliver integers on time data', () => {
      assert.equal(raw.AppCache.start, 1526059510412);
    });
  });

  describe('toJSONRaw', () => {
    it('should deliver formatted dates and times', () => {
      assert.equal(json.AppCache.start, '2018-5-11 - 14:25:10');
    });
  });
});
