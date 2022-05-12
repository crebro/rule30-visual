amt = 15
squareSize = window.innerHeight / amt

grid = []
rule30 = {
  222: 1,
  221: 1,
  212: 1,
  211: 2,
  122: 2,
  121: 2,
  112: 2,
  111: 1,
}
sc = 1

function getGrid(n) {
  retGrid = []
  for (let i = 0; i < n; i++) {
    if (i === 0) {
      retGrid.push([2])
      continue
    }
    temp = JSON.parse(JSON.stringify(retGrid[i - 1]))
    temp.push(1)
    temp.unshift(1)
    retGrid.push([])
    for (let j = 0; j < temp.length; j++) {
      q = `${temp[j - 1] ?? 1}${temp[j] ?? 1}${temp[j + 1] ?? 1}`
      retGrid[i].push(rule30[q])
    }
  }
  return retGrid
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  grid = getGrid(amt)
}

function draw() {
  background(220)
  translate(windowWidth / 2 - (amt + 1) * squareSize, 10)
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == 2) {
        fill('black')
        rect(
          (amt - (i + 1)) * squareSize + j * squareSize,
          i * squareSize,
          squareSize,
          squareSize,
        )
      } else {
        fill('white')
        rect(
          (amt - (i + 1)) * squareSize + j * squareSize,
          i * squareSize,
          squareSize,
          squareSize,
        )
      }
    }
  }
}

function mouseWheel(e) {
  if (e.deltaY > 0) {
    sc = sc * 1.5
    amt = amt * sc
    grid = getGrid(amt)
    squareSize = windowHeight / amt
  } else if (e.deltaY < 0) {
    sc = sc / 1.5
    amt = amt * sc
    grid = getGrid(amt)
    squareSize = windowHeight / amt
  }
}
