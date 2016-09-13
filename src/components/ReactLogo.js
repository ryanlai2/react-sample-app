import React, { Component } from 'react'
import Radium from 'radium'

import '../css/react-logo.scss'

export default class ReactLogo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='react-logo'>
        <div className='proton' />
        <div className='valence-1'>
          <div className='valence delay-1'>
            <div className='electron' />
          </div>
        </div>
        <div className='valence-2'>
          <div className='valence delay-2'>
            <div className='electron' />
          </div>
        </div>
        <div className='valence-3'>
          <div className='valence delay-3'>
            <div className='electron' />
          </div>
        </div>
      </div>
    )
  }
}
