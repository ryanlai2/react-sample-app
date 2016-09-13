import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import RedditThreadList from '../components/RedditThreadList'
import { fetchRedditThreads, viewThreadComments } from '../actions'

const mapStateToProps = (state) => {
  return {
    threads: state.threads,
    scrollY: state.preloadedState.listScrollY,
    currentThread: state.preloadedState.currentThread
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRedditThreads: () => {
      dispatch(fetchRedditThreads())
    },
    onCommentsClick: (id) => {
      dispatch(viewThreadComments(id))
    }
  }
}

const RedditThreadListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RedditThreadList)

export default RedditThreadListContainer
