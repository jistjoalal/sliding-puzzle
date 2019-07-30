const {
  find,
  neighbors,
  tileHeuristic,
  sortedInsert,
  applyMove
} = require("./helpers");

function moveTo(board, tile, [y, x]) {
  // init
  const target = JSON.stringify([y, x]);
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
      const pos = JSON.stringify(find(board, tile));
      if (pos == target) return path;

      // score new state, add to queue
      const cost = path.length + tileHeuristic(board, tile, [y, x]);
      const e = { board, path, cost };
      sortedInsert(queue, e);
    }
  }
}

module.exports = {
  moveTo
};
