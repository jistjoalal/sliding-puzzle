# Sliding Puzzle Solver

Learning advanced graph traversal with the famous sliding puzzle.

![puzzle](https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/15-puzzle_magical.svg/220px-15-puzzle_magical.svg.png)

## Links

- [Implementing A-star(A\*) to solve N-Puzzle](https://algorithmsinsight.wordpress.com/graph-theory-2/a-star-in-general/implementing-a-star-to-solve-n-puzzle/)
- [How to check if an instance of 15 puzzle is solvable?](https://www.geeksforgeeks.org/check-instance-15-puzzle-solvable/)
- [Sliding Block Puzzle Solver Algorithm](https://www.stevenlanders.com/2014/10/05/slding-block-puzzle-solving.html)

## Notes

The "brute force" method was a BFS w/ cost heuristics calculated by summing all tile's distances to their solved position (x + y). Binary search insertion and including the current path length in the heuristic sped up 4x4 solves, but slowed down around 5x5's.

The "manual" method was a first attempt at a more fine-grained approach. The main idea is to solve the top row and left-most column recursively until left with a 2x2 puzzle which can be "rotated" until solved. This method was a hybrid of dumb and smart. I thought that breaking the solve into steps and graph-searching for solutions to those smaller steps would be faster than searching for a solution all at once. I was wrong. The heart of my problem _must_ be that I am still BFS searching through an enormous `(n*n)!` search space. Various tricks like sorting and shuffling edges only got us up to a few lucky 6x6 solves. This brings us to the third method which will try to solve this problem by redefining the graph and using a smart DFS for each smaller step.

Lucky "number3" will be the name of the third and _final_ method, which I'm going to code from scratch because I have a different understanding of the problem now. This will be a redefinition of the problem as more of an algorithm than a brute force search. Similar to a "human" method of solving a rubik's cube, the solutions will be far from optimal but easier to compute due to a more narrow view of each step. In the CFOP method of solving a rubik's cube, you solve the "cross" on the first layer, then the first two layers, orienting the last layer, and finally permuting it. These steps work because there are algorithms to solve each step that do not undo previous steps and, crucially, each step concerns itself with fewer than all pieces of the cube. The sliding puzzle being a kind of 2-dimensional rubik's cube, it can be conquered with a similar approach. Good old runescape taught me this method, and it's finally time to turn it into an algorithm. I found a blog post (third link above) that describes this method, but the code is in Groovy. Still gonna send it in JS.

It worked. Our goal of solving up to 10x10 puzzles quickly has been achieved. Lesson learned that just because you can model a problem as a graph search doesn't mean you should. There's a trade off between mathematical simplicity and computational practicality. For huge, e.g. `(10*10)!` node graphs, you need something smarter than short-term heuristics. Solving a rubik's cube is not a series of individual rotations that each get you closer to a solved cube. GPS finding a route from Seattle to NYC is not a series of individual turns. Although the solutions can be described as a series of discrete steps, the method for finding them efficiently is anything but. Sometimes an algorithm can appear to be scrambling the cube, and GPS can lead you west on a trip to the east. But once the algorithm or short detour is done, it's effect becomes clear. You may have moved further from your destination in some abstract ideal mathematical sense, but you're now going 70mph on the highway with signs every few miles reminding you that this is the right way.

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

- [x] better way of sorting by insertion instead of whole queue?

  - [x] binary search for insertion point
    - [x] refactor
    - [x] figure out how to apply to queue

* [x] check for solvability
  - [x] count # inversions
  - [x] check solvability:

- [x] better heuristic?

  - [x] taxicab/manhattan distance

- [x] "manual" method of rows/blocks at a time?

  - [ ] solve 1st row and col, repeat
    - [x] move pieces to destination
      - [x] specifying excluded tiles from moves
    - we wrote a `solveGroup` method which attempts the manual method by moving pieces at a time w/ graphSearch
    - it sucks
    - need a more precise method of moving individual tiles into place

- [x] abstract graph search using HOFs for solution and heuristic tests

### Progress

- BFS is slow, `b2`: 4x4, ~14 moves deep
- improved enough to beat `b2` in .5s, still very slow
- now solving `b2` in .1s, still no `b3`
- up to `b3` (5x5) in .2s w/ solid priority queue insertion
- solves 5x5's pretty quick, still too slow
- up to 6x6, barely by shuffling neighbors and pruning queue
- DONE! giant leaps were made reimplementing from scratch w/ the fully manual method
