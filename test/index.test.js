import { navigator, window } from './support/mocks';
import PagePerformance from '../src/index';

const assert = require('assert');

describe('PagePerformance', () => {
  global.navigator = navigator;
  global.window = window;

  const performance = new PagePerformance();

  describe('toJSONRaw', () => {
    const raw = performance.toJSONRaw();
    it('should deliver integers on time data', () => {
      assert.strictEqual(raw.AppCache.start, 1526059510412);
    });

    it('should return 0 for navigator.connection.rtt', () => {
      assert.strictEqual(raw.Connection.roundtripTime, 0)
    })
  });

  describe('toJSON', () => {
    it('should deliver formatted dates and times', () => {
      const json = performance.toJSON();
      assert.strictEqual(json.AppCache.start, '2018-5-11 - 14:25:10');
    });
  });
});
