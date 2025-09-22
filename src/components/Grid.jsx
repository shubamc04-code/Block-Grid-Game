import React from 'react'
import Cell from './Cell'
import './Grid.css'

export default function Grid({ rows, cols, cellStates }){
  // flatten entries for ordering as in video: we show all cells with numbering if present
  const cells = []
  let label = 1
  for(let r=0;r<rows;r++){
    for(let c=0;c<cols;c++){
      const key = `${r},${c}`
      const s = cellStates[key] || { state: 'empty', number: null }
      cells.push({ r,c, key, state: s.state, number: s.number !== undefined ? s.number : null, label })
      label++
    }
  }
  return (
    <div className="board" style={{ gridTemplateColumns: `repeat(${cols}, 48px)` }}>
      {cells.map(cell=> <Cell key={cell.key} state={cell.state} number={cell.number} label={cell.label} />)}
    </div>
  )
}
