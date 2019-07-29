const assert = require("assert");
const { b0, b1, b2, b3 } = require("./fixture");
const {
  solve,
  find,
  neighbors,
  slidePuzzle,
  binaryInsert
} = require("../src/main");

describe("solve", () => {
  it("returns solved version of b0", () => {
    const exp = "[[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,0]]";
    const res = JSON.stringify(solve(b0));
    assert.equal(res, exp);
  });
});

describe("find", () => {
  it("finds 0 in b0", () => {
    const exp = [1, 1];
    const res = find(b0, 0);
    assert.deepEqual(res, exp);
  });
});

describe("neighbors", () => {
  it("finds neighbors for [1,0] in b0", () => {
    const exp = [[0, 0], [2, 0], [1, 1]];
    const res = neighbors(b0, [1, 0]);
    assert.deepEqual(res, exp);
  });

  it("finds neighbors for [1,1] in b0", () => {
    const exp = [[0, 1], [2, 1], [1, 2], [1, 0]];
    const res = neighbors(b0, [1, 1]);
    assert.deepEqual(res, exp);
  });
});

describe("binaryInsert", () => {
  it("inserts 3 into [1,2,4,5]", () => {
    const list = [1, 2, 4, 5];
    const exp = [1, 2, 3, 4, 5];
    const res = binaryInsert(list, 3);
    assert.deepEqual(res, exp);
  });
  it("inserts 37 into [1,2,4,5,33,49,51,52,53,54,65,66,71,89]", () => {
    const list = [1, 2, 4, 5, 22, 33, 49, 51, 52, 53, 54, 65, 66, 71, 89];
    const exp = [1, 2, 4, 5, 22, 33, 37, 49, 51, 52, 53, 54, 65, 66, 71, 89];
    const res = binaryInsert(list, 37);
    assert.deepEqual(res, exp);
  });
});

describe("slidePuzzle", () => {
  it("solves b0", () => {
    const exp = [6, 7, 11, 12];
    const res = slidePuzzle(b0);
    assert.deepEqual(res, exp);
  });
  it("solves b1", () => {
    const exp = [5, 6, 8, 2, 4, 1, 2, 5, 6];
    const res = slidePuzzle(b1);
    assert.deepEqual(res, exp);
  });
  it("solves b2", () => {
    const exp =
      "[8,6,3,5,6,7,15,11,12,15,11,12,15,9,13,2,14,13,9,15,12,11,2,9,13,14,9,2,11,12,15,11,7,6,5,10,1,5,6,7,11,13,14,9,2,14,13,11,14,2,9,13,11,14,2,11,14,15,12,8,7,2,11,6,2,7,8,11,7,2,10,3,2,7,11,8,7,10,6,11,10,7,8,10,11,14,15,11,10,12,11,15,14,10,7,8,12,11,15,7,11,12,8,11,7,15,12,7,11,8,7,12,15,11,8,7,12,8,11,15,8,12,7,2,3,6,2,7,4,3,6,2,7,6,3,4,6,7,10,11,7,6,12,8,15,7,11,10,6,11,7,15,8,12,11,7,12,11,7,12,11,8,15,11,12,7,8,12,11,15]";
    const res = JSON.stringify(slidePuzzle(b2));
    assert.deepEqual(res, exp);
  });
});
