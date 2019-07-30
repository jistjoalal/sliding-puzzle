const { find, tileTaxiDist, graphSearch } = require("./helpers");

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
    const dist = tiles.reduce(
      (a, tile, i) => a + tileTaxiDist(board, tile, targets[i])
    );
    return path.length + dist;
  };
  const abandonTest = node => new Set(doNotDisturb).has(node);

  // search
  return graphSearch(board, endTest, heuristic, abandonTest);
}

module.exports = {
  moveTiles
};
