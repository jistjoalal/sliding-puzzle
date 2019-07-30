const { applyMove, find } = require("../src/helpers");

function runSolution(board, solution) {
  for (let move of solution) {
    board = applyMove(board, find(board, 0), find(board, move));
  }
  return board;
}

module.exports = {
  runSolution
};
