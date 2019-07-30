const { isSolvable, solve, boardTaxiDist, graphSearch } = require("./helpers");

function bruteForce(board) {
  // check solvability
  if (!isSolvable(board)) return null;

  // init
  const solvedKey = JSON.stringify(solve(board));
  const endTest = curr => JSON.stringify(curr) == solvedKey;
  const abandonTest = _ => false;

  // search
  return graphSearch(board, endTest, boardTaxiDist, abandonTest);
}

module.exports = {
  bruteForce
};
