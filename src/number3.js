const { boards } = require("../test/fixture");

function rng(n) {
  return [...Array(n).keys()];
}
function distance(y0, x0, y1, x1) {
  return Math.hypot(y0 - y1, x0 - x1);
}
function blankGrid(size) {
  return rng(size).map(r => rng(size).map(_ => false));
}
function flat(arr) {
  return arr.reduce((a, c) => [...a, ...c], []);
}
class Board {
  constructor(tiles) {
    this.tiles = tiles;
    this.size = tiles.length;
    this.locked = blankGrid(this.size);
    this.path = [];
    this.zero = this.findTile(0);
  }
  findTile(t) {
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        if (this.tiles[y][x] == t) return [y, x];
      }
    }
    return null;
  }
  setLock(y, x, lock) {
    this.locked[y][x] = lock;
  }
  neighbors(y, x) {
    const NB = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    let r = [];
    for (let i = 0; i < NB.length; i++) {
      const [dy, dx] = NB[i];
      const ny = dy + y;
      const nx = dx + x;
      if (ny >= 0 && ny < this.size && nx >= 0 && nx < this.size) {
        r.push([ny, nx]);
      }
    }
    return r;
  }
  swap(y, x) {
    const [zy, zx] = this.zero;
    if (distance(y, x, zy, zx) != 1) {
      console.log(`\nERR: ${[y, x]} not adj to ${[zy, zx]}\n`);
      return false;
    }
    const t = this.tiles[y][x];
    this.tiles[y][x] = 0;
    this.tiles[zy][zx] = t;
    this.zero = [y, x];
    this.path.push(t);
    return true;
  }
  findPath(y0, x0, y1, x1, path = [], seen) {
    if (y0 == y1 && x0 == x1) return path;
    if (!seen) seen = blankGrid(this.size);
    const edges = this.neighbors(y0, x0)
      .filter(([y, x]) => !this.locked[y][x] && !seen[y][x])
      .sort(
        ([ay, ax], [by, bx]) =>
          distance(ay, ax, y1, x1) - distance(by, bx, y1, x1)
      );
    for (let [ey, ex] of edges) {
      seen[ey][ex] = true;
      const newPath = this.findPath(ey, ex, y1, x1, [...path, [ey, ex]], seen);
      if (newPath) return newPath;
    }
    return null;
  }
  applyPath(path) {
    for (let [y, x] of path) {
      if (!this.swap(y, x)) break;
    }
  }
  moveZero(y, x) {
    this.applyPath(this.findPath(...this.zero, y, x));
  }
  moveTile(t, y, x, lock) {
    let [ty, tx] = this.findTile(t);
    const path = this.findPath(ty, tx, y, x);
    for (let [my, mx] of path) {
      this.setLock(ty, tx, true);
      this.moveZero(my, mx);
      this.setLock(ty, tx, false);
      this.swap(ty, tx);
      [ty, tx] = [my, mx];
    }
    this.setLock(y, x, lock);
  }
  solveSlice(idx, isRow) {
    const { size } = this;
    const toSolve = this.goal(idx, isRow);
    // solve all but last 2
    for (let t of toSolve.slice(0, -2)) {
      const [y, x] = this.solvedPos(t);
      this.moveTile(t, y, x, true);
    }
    const [next, last] = toSolve.slice(-2);
    // move last to bottom right
    this.moveTile(last, size - 1, size - 1, false);
    // stage next in top left, lock
    const stageN = isRow ? [idx, size - 1] : [size - 1, idx];
    this.moveTile(next, ...stageN, true);
    // stage last below next, lock
    const stageL = isRow ? [idx + 1, size - 1] : [size - 1, idx + 1];
    this.moveTile(last, ...stageL, true);
    // stage zero to left of next
    const stageZ = isRow ? [idx, size - 2] : [size - 2, idx];
    this.moveZero(...stageZ);
    // unlock next and last
    this.setLock(...stageN, false);
    this.setLock(...stageL, false);
    // rotate into position, lock
    this.swap(...stageN);
    this.swap(...stageL);
    this.setLock(...stageN, true);
    this.setLock(...stageZ, true);
  }
  solvedPos(t) {
    const sy = ~~((t - 1) / this.size);
    const sx = (t - 1) % this.size;
    return [sy, sx];
  }
  goal(idx, isRow) {
    const { size } = this;
    if (isRow) return rng(size).map(v => idx * size + v + 1);
    return rng(size).map(v => size * v + idx + 1);
  }
  solve() {
    if (!this.isSolvable()) return null;
    for (let i = 0; i < this.size - 2; i++) {
      this.solveSlice(i, true);
      this.solveSlice(i, false);
    }
    this.rotate2x2();
    return this.path;
  }
  rotate2x2() {
    const { size } = this;
    const m = size * size - 1;
    const tl = m - size;
    const tr = tl + 1;
    const mTarget = [size - 1, size - 2];
    const tlTarget = [size - 2, size - 2];
    const trTarget = [size - 2, size - 1];
    this.moveTile(m, ...mTarget, true);
    this.moveTile(tl, ...tlTarget, true);
    this.moveTile(tr, ...trTarget);
  }
  inversions() {
    let count = 0;
    let tiles = flat(this.tiles);
    for (let i = 0; i < tiles.length; i++) {
      for (let j = i + 1; j < tiles.length; j++) {
        if (tiles[i] && tiles[j] && tiles[i] > tiles[j]) {
          count++;
        }
      }
    }
    return count;
  }
  isSolvable() {
    const invs = this.inversions();
    const [row] = this.zero;
    if (this.size % 2 && invs % 2 == 0) return true;
    if (this.size % 2 == 0 && row % 2 != invs % 2) {
      return true;
    }
    return false;
  }
}

function print(tiles) {
  console.log();
  for (let r of tiles) {
    console.log(JSON.stringify(r));
  }
  console.log();
}

for (let i = 0; i < boards.length; i++) {
  const b = new Board(boards[i]);
  console.log("\nboard", i);
  print(b.tiles);
  console.log(JSON.stringify(b.solve()));
  print(b.tiles);
}
