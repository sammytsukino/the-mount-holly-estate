# Blue Prince Blueprint Playground

A 5x9 blueprint inspired by the Blue Prince universe. Guide the crown-bearing protagonist across rooms, rotate the crown to face the right direction, and avoid colored rooms that block movement.

## Commands

- `PLACE_ROOM X,Y,COLOR` — drop a blocking room in `RED | GREEN | PURPLE`.
- `MOVE` — move one tile forward (wraps around edges).
- `LEFT` / `RIGHT` — rotate the crown.
- `REPORT` — print the current position and facing.

## Rules

- The prince always spawns at `row=1, col=3` (bottom-center).
- The objective is to reach **Room 46** at `row=9, col=3`.
- The blueprint drafts a handful of **blocking colored rooms** (mostly in the middle band) each run to force alternate routes. Use the **Redraft Rooms** button to reroll.
- Commands are case-insensitive.
- Coordinates are `row,col` with `row` in `1–9` and `col` in `1–5`.
