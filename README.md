# Sliding Puzzle Solver

Learning advanced graph traversal with the famous sliding puzzle.

![puzzle](https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/15-puzzle_magical.svg/220px-15-puzzle_magical.svg.png)

## Notes

Current Implementation is a BFS w/ cost heuristics calculated by summing all tile's distances to their solved position (x + y). A naive approach of applying the heuristic helped me solve the 4x4. Next, we try a binary search insertion method into the queue.

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

- BFS is slow, `b2`: 4x4, ~14 moves deep
- improved enough to beat `b2` in .5s, still very slow

- [ ] better heuristic?
- [ ] better way of sorting by insertion instead of whole queue?
  - [x] binary search for insertion point
    - [ ] refactor
    - [ ] figure out how to apply to queue
      - [ ] insert into `queue.map(v => v[2])` (return index)
        - [ ] use index to insert queue element
      - [ ] or just write custom func that digs through to the cost
        - [ ] rewrite queue elements as objects?
