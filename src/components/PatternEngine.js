// Pattern engine that produces a path (anti-diagonal sweep) and assigns visible blocks per frame.
// Returns a map: key -> { state:'red'|'blue'|'green'|'empty', number: integer|null }

export function createPath(rows, cols){
  const path = []
  for(let s=0; s<= rows + cols - 2; s++){
    for(let r=0; r<rows; r++){
      const c = s - r
      if(c>=0 && c<cols) path.push([r,c])
    }
  }
  return path
}

export function frameToCellStates(rows, cols, frame, options = {}){
  const { segmentLength = 5, gap = 2 } = options
  const path = createPath(rows, cols)
  const states = {}
  // top and bottom rows green
  for(let c=0;c<cols;c++){
    states[`0,${c}`] = { state:'green', number:null }
    states[`${rows-1},${c}`] = { state:'green', number:null }
  }

  // Visible window moves along path. We compute a sliding window start index
  const cycle = segmentLength + gap
  // we want blocks to appear as contiguous segment of length `segmentLength` that moves forward each frame
  const startIndex = frame % (path.length + cycle) // allow wrap a bit
  let blockNo = 1
  for(let i=0;i<path.length;i++){
    // compute relative distance from startIndex along the path (forward direction)
    let rel = i - startIndex
    if(rel < 0) rel += path.length
    // if within segmentLength, show it
    if(rel < segmentLength){
      const [r,c] = path[i]
      const key = `${r},${c}`
      const color = (Math.floor(i/segmentLength) % 2 === 0) ? 'red' : 'blue'
      states[key] = { state: color, number: blockNo }
      blockNo++
    } else {
      // leave as default (maybe top/bottom already set)
      const [r,c] = path[i]
      const key = `${r},${c}`
      if(!states[key]) states[key] = { state:'empty', number:null }
    }
  }

  // ensure every other cell has default entry
  for(let r=0;r<rows;r++){
    for(let c=0;c<cols;c++){
      const k = `${r},${c}`
      if(!states[k]) states[k] = { state:'empty', number:null }
    }
  }

  return states
}
