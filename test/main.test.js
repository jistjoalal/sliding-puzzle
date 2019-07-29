const assert = require("assert");
const { boards } = require("./fixture");

const {
  solve,
  find,
  applyMove,
  neighbors,
  slidePuzzle,
  insertIdx
} = require("../src/main");

describe("solve", () => {
  it("returns solved version of b0", () => {
    const exp = "[[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,0]]";
    const res = JSON.stringify(solve(boards.b0));
    assert.equal(res, exp);
  });
});

describe("find", () => {
  it("finds 0 in b0", () => {
    const exp = [1, 1];
    const res = find(boards.b0, 0);
    assert.deepEqual(res, exp);
  });
});

describe("neighbors", () => {
  it("finds neighbors for [1,0] in b0", () => {
    const exp = [[0, 0], [2, 0], [1, 1]];
    const res = neighbors(boards.b0, [1, 0]);
    assert.deepEqual(res, exp);
  });

  it("finds neighbors for [1,1] in b0", () => {
    const exp = [[0, 1], [2, 1], [1, 2], [1, 0]];
    const res = neighbors(boards.b0, [1, 1]);
    assert.deepEqual(res, exp);
  });
});

describe("insertIdx", () => {
  it("returns insert idx for 3 into [1,2,4,5]", () => {
    const list = [1, 2, 4, 5];
    const exp = 2;
    const res = insertIdx(list, 3);
    assert.deepEqual(res, exp);
  });
  it("returns insert idx for 37 into [1,2,4,5,33,49,51,52,53,54,65,66,71,89]", () => {
    const list = [1, 2, 4, 5, 22, 33, 49, 51, 52, 53, 54, 65, 66, 71, 89];
    const exp = 6;
    const res = insertIdx(list, 37);
    assert.deepEqual(res, exp);
  });
});

describe("slidePuzzle", function() {
  this.timeout(5000);
  testSolution("b0");
  testSolution("b1");
  testSolution("b2");
  // testSolution("b3");
});

function testSolution(b) {
  it(`solves ${b}`, () => {
    const board = boards[b];
    const exp = solve(board);
    const res = runSolution(board, slidePuzzle(board));
    assert.deepEqual(res, exp);
  });
}

function runSolution(board, solution) {
  for (let move of solution) {
    board = applyMove(board, find(board, 0), find(board, move));
  }
  return board;
}
