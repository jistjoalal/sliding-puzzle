const { b0, b1, b2, b3 } = require("../test/fixture");

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
  // print(solved);
  // print(board);
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      const [sy, sx] = find(solved, board[y][x]);
      // console.log(y, x, sy, sx);
      r += Math.abs(y - sy) + Math.abs(x - sx);
    }
  }
  return r;
};

const binaryInsert = (list, e) => {
  if (list.length == 0) return [e];
  if (list.length == 1) {
    if (e >= list[0]) return [list[0], e];
    return [e, list[0]];
  }
  const midIdx = ~~(list.length / 2);
  const mid = list[midIdx];
  const next = list[midIdx + 1];
  const left = list.slice(0, midIdx);
  const right = list.slice(midIdx + 1);
  if (mid <= e && next >= e) {
    return [...left, mid, e, ...right];
  }
  if (mid > e) return [...binaryInsert(left, e), mid, ...right];
  if (mid < e) return [...left, mid, ...binaryInsert(right, e)];
};

const slidePuzzle = board => {
  const solved = solve(board);
  const solvedKey = JSON.stringify(solved);
  let queue = [[board, [], Infinity]];
  const visited = new Set([JSON.stringify(board)]);

  while (queue.length) {
    queue.sort((a, b) => a[2] - b[2]);
    const [b, path] = queue.shift();

    const zero = find(b, 0);
    const moves = neighbors(b, zero);
    for (let [y, x] of moves) {
      const newPath = [...path, b[y][x]];
      const newBoard = applyMove(b, zero, [y, x]);
      const key = JSON.stringify(newBoard);
      const cost = heuristic(solved, b);

      if (key == solvedKey) {
        return newPath;
      }

      if (!visited.has(key)) {
        queue.push([newBoard, newPath, cost]);
        // queue = sortedInsert(queue, e);
      }
      visited.add(key);
    }
  }

  return [];
};

const run = b => {
  console.log();
  print(b);
  console.time("runtime");
  const t = slidePuzzle(b);
  console.log(t);
  console.timeEnd("runtime");
  console.log();
};

// run(b0);
// run(b1);
// run(b2);
// run(b3);

module.exports = {
  solve,
  find,
  neighbors,
  slidePuzzle,
  binaryInsert
};
