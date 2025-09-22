import React from 'react'
import './Controls.css'
export default function Controls({
  rows, cols, speed, segmentLength, gap,
  onRowsChange, onColsChange, onSpeedChange, onSegmentChange, onGapChange,
  onStart, onStop, onReset
}) {
  return (
    <div className="controls">
      <label>Rows
        <input type="number" min="3" value={rows} onChange={e=> onRowsChange(e.target.value)} />
      </label>
      <label>Cols
        <input type="number" min="3" value={cols} onChange={e=> onColsChange(e.target.value)} />
      </label>
      <label>Speed ms
        <input type="number" min="30" value={speed} onChange={e=> onSpeedChange(e.target.value)} />
      </label>
      <label>Segment
        <input type="number" min="1" value={segmentLength} onChange={e=> onSegmentChange(e.target.value)} />
      </label>
      <label>Gap
        <input type="number" min="0" value={gap} onChange={e=> onGapChange(e.target.value)} />
      </label>
      <div className="btns">
        <button onClick={onStart} className="start">Start</button>
        <button onClick={onStop} className="stop">Stop</button>
        <button onClick={onReset} className="reset">Reset</button>
      </div>
    </div>
  )
}
