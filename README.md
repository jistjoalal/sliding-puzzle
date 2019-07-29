# Sliding Puzzle Solver

Learning advanced graph traversal with the famous sliding puzzle.

![puzzle](https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/15-puzzle_magical.svg/220px-15-puzzle_magical.svg.png)

## Notes

Current Implementation is a BFS w/ cost heuristics calculated by summing all tile's distances to their solved position (x + y). Binary search insertion and including the current path length in the heuristic sped up 4x4 solves, but we still can't do bigger puzzles.

- [x] generate solved key
- [x] `queue = [ [ board, moves ] ]`
- [x] BFS

  - [x] shift from queue
  - [x] get possible moves
  - for each move:
    - [x] add to new list of moves
    - [x] change board
    - [x] return if `JSON.stringify(b) == solved`
    - [x] push to queue

- [x] better heuristic?
- [x] better way of sorting by insertion instead of whole queue?

  - [x] binary search for insertion point
    - [x] refactor
    - [x] figure out how to apply to queue

* [x] check for solvability
  - [x] count # inversions
  - [x] check solvability:

- [ ] accumulate heuristic cost by calculating initial heuristic
- [ ] "manual" method of rows/blocks at a time?

### Progress

- BFS is slow, `b2`: 4x4, ~14 moves deep
- improved enough to beat `b2` in .5s, still very slow
- now solving `b2` in .1s, still no `b3`
- up to `b3` (5x5) in .2s w/ solid priority queue insertion
- solves 5x5's pretty quick, still too slow
