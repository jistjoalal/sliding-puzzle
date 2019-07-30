const { isSolvable, solve, boardTaxiDist, graphSearch } = require("./helpers");

function bruteForce(board) {
  // check solvability
  if (!isSolvable(board)) return null;

  // init
  const solvedKey = JSON.stringify(solve(board));
  const endTest = curr => JSON.stringify(curr) == solvedKey;

  // search
  return graphSearch(board, endTest, boardTaxiDist);
}

module.exports = {
  bruteForce
};
