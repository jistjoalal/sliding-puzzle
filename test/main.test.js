const assert = require("assert");
const { boards } = require("./fixture");

const {
  solve,
  find,
  applyMove,
  neighbors,
  slidePuzzle,
  inversions,
  isSolvable
} = require("../src/main");

describe("solve", () => {
  it("returns solved version of b0", () => {
    const exp = "[[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,0]]";
    const res = JSON.stringify(solve(boards[0]));
    assert.equal(res, exp);
  });
});

describe("find", () => {
  it("finds 0 in b0", () => {
    const exp = [1, 1];
    const res = find(boards[0], 0);
    assert.deepEqual(res, exp);
  });
});

describe("neighbors", () => {
  it("finds neighbors for [1,0] in b0", () => {
    const exp = [[0, 0], [2, 0], [1, 1]];
    const res = neighbors(boards[0], [1, 0]);
    assert.deepEqual(res, exp);
  });

  it("finds neighbors for [1,1] in b0", () => {
    const exp = [[0, 1], [2, 1], [1, 2], [1, 0]];
    const res = neighbors(boards[0], [1, 1]);
    assert.deepEqual(res, exp);
  });
});

describe("inversions", () => {
  it("counts inversions for board 0", () => {
    const exp = 6;
    const res = inversions(boards[0]);
    assert.equal(res, exp);
  });
  it("counts inversions for board 1", () => {
    const exp = 10;
    const res = inversions(boards[1]);
    assert.equal(res, exp);
  });
});

describe("isSolvable", () => {
  it("determines if board 0 is isSolvable", () => {
    const exp = true;
    const res = isSolvable(boards[0]);
    assert.equal(res, exp);
  });
  it("determines if board 1 is isSolvable", () => {
    const exp = true;
    const res = isSolvable(boards[1]);
    assert.equal(res, exp);
  });
  it("determines if board 2 is isSolvable", () => {
    const exp = true;
    const res = isSolvable(boards[2]);
    assert.equal(res, exp);
  });
  it("determines if board 5 is isSolvable", () => {
    const exp = false;
    const res = isSolvable(boards[5]);
    assert.equal(res, exp);
  });
});

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
