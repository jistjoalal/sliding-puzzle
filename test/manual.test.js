const assert = require("assert");
const { boards } = require("./fixture");
const { find } = require("../src/helpers");
const { moveTo } = require("../src/manual");
const { runSolution } = require("./testHelpers");

describe("moveTo", () => {
  testMoveTo(0, 0, [3, 3]);
  testMoveTo(1, 1, [0, 0]);
  testMoveTo(1, 2, [0, 1]);
});

function testMoveTo(bIdx, moving, target) {
  it(`moves ${moving} to ${target} on board ${bIdx}`, () => {
    const path = moveTo(boards[bIdx], moving, target);
    const res = runSolution(boards[bIdx], path);
    const pos = find(res, moving);
    assert.deepEqual(pos, target);
  });
}
