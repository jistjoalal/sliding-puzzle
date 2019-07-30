const {
  isSolvable,
  solve,
  find,
  neighbors,
  applyMove,
  heuristic,
  sortedInsert
} = require("./helpers");

const bruteForce = board => {
  // check solvability
  const solvable = isSolvable(board);
  if (!solvable) return null;

  // init
  const solved = solve(board);
  const solvedKey = JSON.stringify(solved);
  let queue = [{ board, path: [], cost: Infinity }];
  let visited = new Set([JSON.stringify(board)]);

  while (queue.length) {
    const curr = queue.shift();

    // get moves from this state
    const zero = find(curr.board, 0);
    const moves = neighbors(curr.board, zero);
    for (let [y, x] of moves) {
      // get new state
      const path = [...curr.path, curr.board[y][x]];
      const board = applyMove(curr.board, zero, [y, x]);
      const key = JSON.stringify(board);

      // already visited
      if (visited.has(key)) continue;
      visited.add(key);

      // solution
      if (key == solvedKey) return path;

      // score new state, add to queue
      const cost = heuristic(board);
      const e = { board, path, cost };
      sortedInsert(queue, e);
    }
  }
};

module.exports = {
  bruteForce
};
