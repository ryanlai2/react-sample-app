import React, { Component } from 'react'
import Radium from 'radium'
import ReactLogo from './ReactLogo'

@Radium
export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  url() {
    return 'https://www.reddit.com/r/reactjs'
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.column}>
          <h1 style={styles.h1}>
            View <a href={this.url()} target="_blank" style={styles.a}>ReactJS</a><br/>
            subreddit comments
          </h1>
        </div>
        <div style={[styles.logoOffset]}>
          <ReactLogo/>
        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    fontFamily: "'Open Sans', sans-serif",
    height: 120
  },
  column: {
    width: '40%',
    float: 'left'
  },
  h1: {
    // width: '60%',
    // display: 'block',
    marginTop: 60,
    color: '#545454',
    fontSize: 18,
    fontWeight: 'bold',
    // textDecoration: 'none',
    lineHeight: '1.4em',

  },
  logoOffset: {
    position: 'absolute',
    top: 24,
    left: `${(800-120)/2}px`
  },
  a: {
    color: '#0086BF',
    textDecoration: 'none'
  },
}
