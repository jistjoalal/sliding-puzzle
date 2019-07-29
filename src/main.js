const rng = n => [...Array(n).keys()];

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

const heuristic = (solved, board) => {
  let r = 0;
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      const [sy, sx] = find(solved, board[y][x]);
      r += Math.abs(y - sy) + Math.abs(x - sx);
    }
  }
  return r;
};

const insertIdx = (list, e) => {
  let h = 0;
  let t = list.length - 1;
  while (h <= t) {
    let mid = ~~((h + t) / 2);
    if (e == list[mid]) return mid;
    else if (e > list[mid]) h = mid + 1;
    else t = mid - 1;
  }
  return h;
};

const sortedInsert = (queue, e) => {
  const costs = queue.map(v => v[2]);
  const idx = insertIdx(costs, e[2]);
  queue.splice(idx, 0, e);
};

const slidePuzzle = board => {
  const solved = solve(board);
  const solvedKey = JSON.stringify(solved);
  let queue = [[board, [], Infinity]];
  let visited = new Set([JSON.stringify(board)]);

  while (queue.length) {
    const [b, path] = queue.shift();

    const zero = find(b, 0);
    const moves = neighbors(b, zero);
    for (let [y, x] of moves) {
      const newPath = [...path, b[y][x]];
      const newBoard = applyMove(b, zero, [y, x]);
      const key = JSON.stringify(newBoard);
      const cost = newPath.length + heuristic(solved, newBoard);

      if (key == solvedKey) {
        return newPath;
      }

      if (!visited.has(key)) {
        const e = [newBoard, newPath, cost];
        sortedInsert(queue, e);
      }
      visited.add(key);
    }
  }

  return [];
};

module.exports = {
  solve,
  find,
  neighbors,
  slidePuzzle,
  insertIdx,
  applyMove
};
