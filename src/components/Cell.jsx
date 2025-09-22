import React from 'react'
import './Cell.css'

export default function Cell({ state, number, label }){
  const cls = state ? `cell ${state}` : 'cell empty'
  // number: numeric block id to display when block is colored; label: absolute index of cell
  return (
    <div className={cls}>
      { number ? <div className="num">{number}</div> : <div className="lbl">{label}</div> }
    </div>
  )
}
