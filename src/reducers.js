import { combineReducers } from 'redux'
import moment from 'moment'
import {
  RECEIVE_REDDIT_THREADS,
  RECEIVE_COMMENTS_FOR_THREAD,
  TRANSITION_TO_THREAD,
  TRANSITION_FROM_THREAD,
  SORT_COMMENTS
} from './actions'

const threads = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_REDDIT_THREADS:
      return mapThreads(action.threads)
    default:
      return state
  }
}

const preloadedState = (state = {
  currentThread: null,
  currentThreadItem: null,
  sortKey: 'Time',
  listScrollY: 0
}, action) => {
  switch (action.type) {
    case TRANSITION_TO_THREAD:
      return Object.assign({}, state, {
        currentThread: action.thread,
        listScrollY: action.scrollY
      })
    case TRANSITION_FROM_THREAD:
      return Object.assign({}, state, {
        currentThread: null
      })
    case SORT_COMMENTS:
      return Object.assign({}, state, {
        sortKey: action.sortKey
      })
    default:
      return state
  }
}

const comments = (state = {
  isFetching: false,
  items: [],
}, action) => {
  switch (action.type) {
    case RECEIVE_COMMENTS_FOR_THREAD:
      return Object.assign({}, state, {
        isFetching: false,
        thread: action.thread,
        items: mapCommentsForThread(action.comments),
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

const commentsByThread = (state = {}, action) => {
   switch (action.type) {
    case RECEIVE_COMMENTS_FOR_THREAD:
      return Object.assign({}, state, {
        [action.thread]: comments(state[action.thread], action)
      })
    default:
      return state
  }
}

const mapThreads = (threads) => {
  return threads.map( (thread) => {
    return {
      id: thread.id,
      url: thread.url,
      title: thread.title,
      author: thread.author,
      text: htmlDecode(thread.selftext_html),
      comment_count: thread.num_comments,
      created: thread.created_utc,
      timeAgo: moment.unix(thread.created_utc).fromNow(),
      preview: thread.preview ? thread.preview.images[0].source : null // Contains url, width, height
    }
  })
}

const repliesForComment = (comment) => {
  if ( comment.replies ) {
    return comment
    .replies.data.children
    .map(reply => reply.data)
  } else {
    return []
  }
}

const htmlDecode = (input) => {
  if ( !input ) { return '' }
  let doc = new DOMParser().parseFromString(input, 'text/html')
  return doc.documentElement.textContent
}

const mapCommentsForThread = (comments) => {
  return comments.map( comment => {
    return {
      id: comment.id,
      author: comment.author,
      text: htmlDecode(comment.body_html),
      score: comment.score,
      items: mapCommentsForThread(repliesForComment(comment)),
      ups: comment.ups,
      downs: comment.downs,
      created: comment.created_utc,
      timeAgo: moment.unix(comment.created_utc).fromNow()
    }
  })
}

export const mapCommentsForThreadSorted = (sortKey, comments) => {
  let sortedComments = Array.from(sortCommentsBy(sortKey, comments))
  return sortedComments.map( comment => {
    return Object.assign({}, comment, {
      items: mapCommentsForThreadSorted(sortKey, comment.items)
    })
  })
}

const ratioForComment = (comment) => {
  return comment.ups / (comment.downs || 1)
}

const sortCommentsBy = (sortKey, comments) => {
  return comments.sort((a,b) => {
    switch (sortKey) {
      case 'Time':
        return a.created > b.created
      case 'Upvotes':
        return a.ups < b.ups
      case 'Ratio':
        return ratioForComment(a) < ratioForComment(b)
      default:
        return a.created > b.created
    }
  })
}

const redditApp = combineReducers({
  preloadedState,
  threads,
  commentsByThread
})

export default redditApp
