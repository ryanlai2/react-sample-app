import 'isomorphic-fetch'

export const REQUEST_REDDIT_THREADS = 'REQUEST_REDDIT_THREADS'
export const RECEIVE_REDDIT_THREADS = 'RECEIVE_REDDIT_THREADS'
export const REQUEST_COMMENTS_FOR_THREAD = 'REQUEST_COMMENTS_FOR_THREAD'
export const RECEIVE_COMMENTS_FOR_THREAD = 'RECEIVE_COMMENTS_FOR_THREAD'
export const TRANSITION_TO_THREAD = 'TRANSITION_TO_THREAD'
export const TRANSITION_FROM_THREAD = 'TRANSITION_FROM_THREAD'
export const SORT_COMMENTS = 'SORT_COMMENTS'

export const fetchRedditThreads = () => {
  return dispatch => {
    dispatch(requestRedditThreads())
    let subreddit = 'reactjs'
    let url = `https://www.reddit.com/r/${subreddit}.json`
    return fetch(url)
      .then(response => response.json())
      .then(json => {dispatch(receiveRedditThreads(json))})
  }
}

export const requestRedditThreads = () => {
  return {
    type: REQUEST_REDDIT_THREADS
  }
}

export const receiveRedditThreads = (json) => {
  return {
    type: RECEIVE_REDDIT_THREADS,
    threads: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

export const shouldFetchComments = (state, threadID) => {
  const comments = state.commentsByThread[threadID]
  if (!comments) {
    return true
  } else {
    return false
  }
}

export const viewThreadComments = (threadID) => {
  return (dispatch, getState) => {
    dispatch(fetchCommentsIfNeeded(threadID))
    dispatch(transitionToThread(threadID))
  }
}

export const transitionToThread = (threadID) => {
  return {
    type: TRANSITION_TO_THREAD,
    thread: threadID,
    scrollY: window.scrollY
  }
}

export const transitionFromThread = (scrollY) => {
  return {
    type: TRANSITION_FROM_THREAD
  }
}

export const sortComments = (args) => {
  return {
    type: SORT_COMMENTS,
    sortKey: args.sortKey,
    thread: args.currentThread
  }
}

export const fetchCommentsIfNeeded = (threadID) => {
  return (dispatch, getState) => {
    if (shouldFetchComments(getState(), threadID)) {
      dispatch(requestCommentsForThread(threadID))
      let subreddit = 'reactjs'
      let url = `https://www.reddit.com/r/${subreddit}/${threadID}.json`
      return fetch(url)
      .then(response => response.json())
      .then(json => {dispatch(receiveCommentsForThread(threadID, json))})
    }
  }
}

export const requestCommentsForThread = (threadID) => {
  return {
    type: REQUEST_COMMENTS_FOR_THREAD,
    thread: threadID
  }
}

export const receiveCommentsForThread = (threadID, json) => {
  return {
    type: RECEIVE_COMMENTS_FOR_THREAD,
    thread: threadID,
    comments: json[1].data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}
