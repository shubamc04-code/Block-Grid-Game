import React, { useEffect, useRef, useState } from 'react'
import Grid from './Grid'
import Controls from './Controls'
import { frameToCellStates } from './PatternEngine'
import './DynamicGridPattern.css'

export default function DynamicGridPattern(){
  const [rows,setRows] = useState(12)
  const [cols,setCols] = useState(14)
  const [speed,setSpeed] = useState(160)
  const [segmentLength,setSegmentLength] = useState(5)
  const [gap,setGap] = useState(2)

  const [frame,setFrame] = useState(0)
  const [running,setRunning] = useState(false)
  const intervalRef = useRef(null)

  useEffect(()=>{
    if(running){
      intervalRef.current = setInterval(()=> setFrame(f=>f+1), Math.max(30, speed))
      return ()=> clearInterval(intervalRef.current)
    } else {
      if(intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null }
    }
  },[running, speed])

  useEffect(()=> { setFrame(0) }, [rows, cols, segmentLength, gap])

  const start = ()=> setRunning(true)
  const stop = ()=> setRunning(false)
  const reset = ()=> { setRunning(false); setFrame(0) }

  const cellStates = frameToCellStates(rows, cols, frame, { segmentLength, gap })

  return (
    <div className="wrapper">
      <div className="header">
        <div>
          <div className="title">Block Grid Game
            
          </div>
          <div className="small">Dynamic N × M grid • Blocks numbered • Diagonal moving segments</div>
        </div>
        <div className="controls-row">
          <Controls
            rows={rows} cols={cols} speed={speed}
            segmentLength={segmentLength} gap={gap}
            onRowsChange={v=> setRows(Math.max(3, Number(v)||3))}
            onColsChange={v=> setCols(Math.max(3, Number(v)||3))}
            onSpeedChange={v=> setSpeed(Math.max(30, Number(v)||30))}
            onSegmentChange={v=> setSegmentLength(Math.max(1, Number(v)||1))}
            onGapChange={v=> setGap(Math.max(0, Number(v)||0))}
            onStart={start} onStop={stop} onReset={reset}
          />
        </div>
      </div>

      <Grid rows={rows} cols={cols} cellStates={cellStates} />

      <div className="footer">Frame: {frame} • Visible blocks: {Object.values(cellStates).filter(s=>s.number).length}</div>
    </div>
  )
}
