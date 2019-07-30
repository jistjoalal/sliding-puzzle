const {
  find,
  tileTaxiDist,
  graphSearch,
  tileSolvedPos,
  print,
  runSolution
} = require("./helpers");

function moveTiles(board, tiles, targets, doNotDisturb) {
  // init
  const endTest = board => {
    for (let i = 0; i < tiles.length; i++) {
      if (JSON.stringify(find(board, tiles[i])) != JSON.stringify(targets[i]))
        return false;
    }
    return true;
  };
  const heuristic = (board, path) => {
    const zero = find(board, 0);
    const dist = tiles.reduce(
      (a, tile, i) =>
        a +
        tileTaxiDist(board, tile, targets[i]) +
        tileTaxiDist(board, tile, zero)
    );
    return path.length + dist;
  };
  const abandonTest = node => new Set(doNotDisturb).has(node);

  // search
  return graphSearch(board, endTest, heuristic, abandonTest);
}

function solveGroup(board, group) {
  let sumPath = [];
  let dnd = [];
  const saveForLastSize = Math.ceil(group.length / 2);
  for (let i = 0; i < group.length - saveForLastSize; i++) {
    const tile = group[i];
    const target = tileSolvedPos(board, tile);
    const path = moveTiles(board, [tile], [target], dnd);
    board = runSolution(board, path);
    dnd.push(tile);
    sumPath.push(...path);
  }
  const saveForLast = group.slice(-saveForLastSize);
  const targets = saveForLast.map(tile => tileSolvedPos(board, tile));
  const path = moveTiles(board, saveForLast, targets, dnd);
  sumPath.push(...path);
  return sumPath;
}

module.exports = {
  solveGroup,
  moveTiles
};
