const assert = require('assert');

describe('flaky', function () {
   it('should fail when seconds are even', function () {
      const seconds = new Date().getSeconds();
      assert.strictEqual(((seconds % 2) === 0), false);
   });
});
