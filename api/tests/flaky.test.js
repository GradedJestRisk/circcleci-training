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

   it('should fail regularly, half of the time', function () {
      const number = randomBetween(0,100);
      console.log("should fail regularly - test executed ")
      assert.strictEqual((number > 25), false);
   });

   it('should fail most of the time, when an random number is not in a range', function () {
      const number = randomBetween(0,100);
      console.log("should fail most of the time, - test executed ")
      assert.strictEqual((number > 75), false);
   });

});
