const assert = require("assert");
const { boards } = require("./fixture");
const { find, print } = require("../src/helpers");
const { moveTiles } = require("../src/manual");
const { runSolution } = require("./testHelpers");

describe("moveTiles", () => {
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
    print(boards[bIdx]);
    console.log(path);
    for (let i = 0; i < tiles.length; i++) {
      const pos = find(res, tiles[i]);
      assert.deepEqual(pos, targets[i]);
    }
  });
}
