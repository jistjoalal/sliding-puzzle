const { find, tileTaxiDist, graphSearch } = require("./helpers");

function moveTo(board, tile, [y, x]) {
  // init
  const target = JSON.stringify([y, x]);
  const endTest = board => JSON.stringify(find(board, tile)) == target;
  const heuristic = (board, path) =>
    path.length + tileTaxiDist(board, tile, [y, x]);

  // search
  return graphSearch(board, endTest, heuristic);
}

module.exports = {
  moveTo
};
