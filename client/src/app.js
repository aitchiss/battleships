import React from 'react'
import { render } from 'react-dom'
import GameContainer from './containers/GameContainer'

window.onload = () => {
  render(
    <GameContainer />,
    document.getElementById('app')
  )
  
}