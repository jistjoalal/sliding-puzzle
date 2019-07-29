const assert = require("assert");
const { boards } = require("./fixture");

const {
  solve,
  find,
  applyMove,
  slidePuzzle,
  isSolvable
} = require("../src/main");

describe("slidePuzzle", function() {
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
    const solution = slidePuzzle(board);
    if (!solvable) {
      assert.equal(solution, null);
    } else {
      const exp = solve(board);
      const res = runSolution(board, solution);
      assert.deepEqual(res, exp);
    }
  });
}

function runSolution(board, solution) {
  for (let move of solution) {
    board = applyMove(board, find(board, 0), find(board, move));
  }
  return board;
}
