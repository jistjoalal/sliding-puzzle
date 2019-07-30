const assert = require("assert");
const { boards } = require("./fixture");

const { solve, isSolvable } = require("../src/helpers");

const { bruteForce } = require("../src/bruteForce");

const { runSolution } = require("./testHelpers");

describe("bruteForce", function() {
  this.timeout(10000);
  for (let i in boards) {
    testSolution(i);
  }
});

function testSolution(b) {
  const board = boards[b];
  const size = board.length;
  it(`solves board ${b} (${size}x${size})`, () => {
    const solvable = isSolvable(board);
    const solution = bruteForce(board);
    if (!solvable) {
      assert.equal(solution, null);
    } else {
      const exp = solve(board);
      const res = runSolution(board, solution);
      assert.deepEqual(res, exp);
    }
  });
}
