import React, { Component } from 'react'
import RedditThreadListContainer from './RedditThreadListContainer'
import RedditCommentsContainer from './RedditCommentsContainer'
import Header from '../components/Header'

export default class App extends Component {
  constructor() {
    super();
  }


  render() {
    return (
      <div className='app'>
        <Header />
        <div className='pages'>
          <RedditThreadListContainer />
          <RedditCommentsContainer />
        </div>
      </div>
    )
  }
}
