import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import RedditCommentList from '../components/RedditCommentList'
import { transitionFromThread, sortComments } from '../actions'
import { mapCommentsForThreadSorted } from '../reducers'

const mapStateToProps = (state) => {
  let currentThread = state.preloadedState.currentThread
  let commentsByThread = state.commentsByThread[currentThread]
  let currentThreadItem = state.threads.filter((thread) => {
    if (thread.id == currentThread) { return thread }
  }).pop()

  // Use reducer to sort based on key rather than updating tree each time
  let comments = mapCommentsForThreadSorted(
    state.preloadedState.sortKey,
    commentsByThread ? commentsByThread.items : []
  )

  return {
    comments: comments,
    scrollY: state.preloadedState.listScrollY,
    sortKey: state.preloadedState.sortKey,
    currentThread: state.preloadedState.currentThread,
    currentThreadItem: currentThreadItem
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBackClick: (scrollY) => {
      dispatch(transitionFromThread(scrollY))
    },
    sortComments: (sortKey) => {
      dispatch(sortComments(sortKey))
    }
  }
}

const RedditCommentsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RedditCommentList)

export default RedditCommentsContainer
