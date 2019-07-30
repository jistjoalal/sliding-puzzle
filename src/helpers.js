function rng(n) {
  return [...Array(n).keys()];
}

function flat(arr) {
  return arr.reduce((a, c) => [...a, ...c], []);
}

function print(b) {
  for (let row of b) {
    console.log(row.join` `.replace(/(\b\d\b)/g, " $1"));
  }
}

function solve(b) {
  const y = b.length;
  const x = b[0].length;
  const sb = rng(y).map(r => rng(x).map(c => r * x + c + 1));
  sb[y - 1][x - 1] = 0;
  return sb;
}

function find(b, n) {
  for (let y = 0; y < b.length; y++) {
    for (let x = 0; x < b[0].length; x++) {
      if (b[y][x] == n) return [y, x];
    }
  }
  return [-1, -1];
}

const NB = [[-1, 0], [1, 0], [0, 1], [0, -1]];
function neighbors(b, [y, x]) {
  let r = [];
  for (let [dy, dx] of NB) {
    const ny = dy + y;
    const nx = dx + x;
    if (b[ny] && b[ny][nx] != undefined) r.push([ny, nx]);
  }
  return r;
}

function applyMove(b, [zy, zx], [y, x]) {
  const r = b.map(r => r.slice());
  r[zy][zx] = b[y][x];
  r[y][x] = 0;
  return r;
}

function tileSolvedPos(board, tile) {
  const size = board.length;
  const sy = ~~((tile - 1) / size);
  const sx = (tile - 1) % size;
  return [sy, sx];
}

function tileTaxiDist(board, tile, [y, x]) {
  const [sy, sx] = tileSolvedPos(board, tile);
  const cost = Math.abs(y - sy) + Math.abs(x - sx);
  return cost;
}

function boardTaxiDist(board) {
  const size = board.length;
  let r = 0;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const tile = board[y][x];
      // don't include blank tile in calculation
      if (tile == 0) continue;
      r += tileTaxiDist(board, tile, [y, x]);
    }
  }
  return r;
}

function insertIdx(list, e) {
  let h = 0;
  let t = list.length - 1;
  while (h <= t) {
    let mid = ~~((h + t) / 2);
    if (e.cost == list[mid].cost) return mid;
    else if (e.cost > list[mid].cost) h = mid + 1;
    else t = mid - 1;
  }
  return h;
}

function sortedInsert(queue, e) {
  const idx = insertIdx(queue, e);
  queue.splice(idx, 0, e);
}

function inversions(board) {
  let count = 0;
  let tiles = flat(board);
  for (let i = 0; i < tiles.length; i++) {
    for (let j = i + 1; j < tiles.length; j++) {
      if (tiles[i] && tiles[j] && tiles[i] > tiles[j]) {
        count++;
      }
    }
  }
  return count;
}

function isSolvable(board) {
  const invs = inversions(board);
  const size = board.length;
  const [row] = find(board, 0);
  if (size % 2 && invs % 2 == 0) return true;
  if (size % 2 == 0) {
    if (row % 2 != invs % 2) return true;
  }
  return false;
}

function graphSearch(board, endTest, heuristic, abandonTest) {
  // init
  let queue = [{ board, path: [], cost: Infinity }];
  let visited = new Set([JSON.stringify(board)]);

  while (queue.length) {
    const curr = queue.shift();

    // get moves from this state
    const zero = find(curr.board, 0);
    const moves = neighbors(curr.board, zero);
    for (let [y, x] of moves) {
      // get new state
      const at = curr.board[y][x];
      const path = [...curr.path, at];
      const board = applyMove(curr.board, zero, [y, x]);
      const key = JSON.stringify(board);

      // console.log();
      // print(board);

      // already visited
      if (visited.has(key) || abandonTest(at)) continue;
      visited.add(key);

      // solution
      if (endTest(board)) return path;

      // score new state, add to queue
      const cost = heuristic(board, path);
      const e = { board, path, cost };
      sortedInsert(queue, e);
    }
  }
  return [];
}

function runSolution(board, solution) {
  for (let move of solution) {
    board = applyMove(board, find(board, 0), find(board, move));
  }
  return board;
}

module.exports = {
  solve,
  find,
  applyMove,
  isSolvable,
  neighbors,
  sortedInsert,
  tileSolvedPos,
  tileTaxiDist,
  boardTaxiDist,
  print,
  graphSearch,
  runSolution
};
