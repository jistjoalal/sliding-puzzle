const assert = require("assert");
const { boards } = require("./fixture");
const { find, print, tileSolvedPos, runSolution } = require("../src/helpers");
const { moveTiles, solveGroup } = require("../src/manual");

describe("moveTiles", () => {
  testMoveTiles(1, [5], [[0, 0]], []);
  testMoveTiles(1, [5, 6], [[0, 0], [0, 1]], [8]);
  testMoveTiles(6, [1, 2], [[0, 0], [0, 1]], []);
  testMoveTiles(
    6,
    [11, 18],
    [[1, 1], [1, 2]],
    [3, 7, 14, 15, 10, 1, 16, 17, 21]
  );
  testMoveTiles(
    7,
    [19, 21],
    [[2, 2], [2, 3]],
    [22, 1, 10, 9, 4, 11, 8, 2, 5, 18, 16, 7, 3, 6, 23, 13]
  );
});

function testMoveTiles(bIdx, tiles, targets, dnd) {
  it(`moves ${JSON.stringify(tiles)} to ${JSON.stringify(
    targets
  )} on board ${bIdx} w/o touching ${[...dnd]}`, () => {
    const path = moveTiles(boards[bIdx], tiles, targets, dnd);
    const res = runSolution(boards[bIdx], path);
    for (let i = 0; i < tiles.length; i++) {
      const pos = find(res, tiles[i]);
      assert.deepEqual(pos, targets[i]);
    }
  });
}

describe("solveGroup", () => {
  testSolveGroup(1, [1, 2, 3]);
  testSolveGroup(2, [1, 2, 3, 4]);
  testSolveGroup(6, [1, 2, 3, 4, 5]);
});

function testSolveGroup(bIdx, tiles) {
  it(`solves ${JSON.stringify(tiles)} on board ${bIdx}`, () => {
    const path = solveGroup(boards[bIdx], tiles);
    const res = runSolution(boards[bIdx], path);
    for (let i = 0; i < tiles.length; i++) {
      const pos = find(res, tiles[i]);
      assert.deepEqual(pos, tileSolvedPos(res, tiles[i]));
    }
  });
}
