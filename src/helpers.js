const rng = n => [...Array(n).keys()];

const flat = arr => arr.reduce((a, c) => [...a, ...c], []);

const print = b => {
  for (let row of b) {
    console.log(row.join` `.replace(/(\b\d\b)/g, " $1"));
  }
};

const solve = b => {
  const y = b.length;
  const x = b[0].length;
  const sb = rng(y).map(r => rng(x).map(c => r * x + c + 1));
  sb[y - 1][x - 1] = 0;
  return sb;
};

const find = (b, n) => {
  for (let y = 0; y < b.length; y++) {
    for (let x = 0; x < b[0].length; x++) {
      if (b[y][x] == n) return [y, x];
    }
  }
  return [-1, -1];
};

const NB = [[-1, 0], [1, 0], [0, 1], [0, -1]];
const neighbors = (b, [y, x]) => {
  let r = [];
  for (let [dy, dx] of NB) {
    const ny = dy + y;
    const nx = dx + x;
    if (b[ny] && b[ny][nx] != undefined) r.push([ny, nx]);
  }
  return r;
};

const applyMove = (b, [zy, zx], [y, x]) => {
  const r = b.map(r => r.slice());
  r[zy][zx] = b[y][x];
  r[y][x] = 0;
  return r;
};

const tileHeuristic = (board, tile, [y, x]) => {
  const size = board.length;
  const sy = ~~((tile - 1) / size);
  const sx = (tile - 1) % size;
  const cost = Math.abs(y - sy) + Math.abs(x - sx);
  return cost;
};

const heuristic = board => {
  const size = board.length;
  let r = 0;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const tile = board[y][x];
      // don't include blank tile in calculation
      if (tile == 0) continue;
      r += tileHeuristic(board, tile, [y, x]);
    }
  }
  return r;
};

const insertIdx = (list, e) => {
  let h = 0;
  let t = list.length - 1;
  while (h <= t) {
    let mid = ~~((h + t) / 2);
    if (e.cost == list[mid].cost) return mid;
    else if (e.cost > list[mid].cost) h = mid + 1;
    else t = mid - 1;
  }
  return h;
};

const sortedInsert = (queue, e) => {
  const idx = insertIdx(queue, e);
  queue.splice(idx, 0, e);
};

const inversions = board => {
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
};

const isSolvable = board => {
  const invs = inversions(board);
  const size = board.length;
  const [row] = find(board, 0);
  if (size % 2 && invs % 2 == 0) return true;
  if (size % 2 == 0) {
    if (row % 2 != invs % 2) return true;
  }
  return false;
};

module.exports = {
  solve,
  find,
  applyMove,
  isSolvable,
  neighbors,
  sortedInsert,
  tileHeuristic,
  heuristic
};
