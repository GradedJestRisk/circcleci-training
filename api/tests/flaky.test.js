const assert = require('assert');

const randomBetween = (min, max)=>{
   return Math.floor(
      Math.random() * (max - min) + min
   )
}

describe('flaky', function () {

   it('should fail sometimes, when an random number is not in a range', function () {
      const number = randomBetween(0,100);
      assert.strictEqual((number > 25), false);
   });

   it('should fail regularly, when seconds are even', function () {
      const seconds = new Date().getSeconds();
      assert.strictEqual(((seconds % 2) === 0), false);
   });

   it('should fail most of the time, when an random number is not in a range', function () {
      const number = randomBetween(0,100);
      assert.strictEqual((number > 75), false);
   });

});
