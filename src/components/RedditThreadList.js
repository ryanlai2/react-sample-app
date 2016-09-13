import React, { Component } from 'react'
import Radium from 'radium'
import RedditThread from './RedditThread'

class RedditThreadList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { fetchRedditThreads } = this.props
    fetchRedditThreads()
  }

  scrollToLastPosition() {
    setTimeout(() => {
      window.scrollTo(0, this.props.scrollY)
    }, 100)
  }

  componentWillUpdate(nextProps) {
    if ( !nextProps.currentThread &&
         nextProps.currentThread !== this.props.currentThread) {
      this.scrollToLastPosition()
    }
  }

  listClass() {
    let classes = ['page', 'thread-list', 'transition']
    this.props.currentThread ? classes.push('left') : classes.push('center')
    return classes.join(' ')
  }

  render() {
    const { threads, currentThread, onCommentsClick } = this.props

    return (
      <ol className={this.listClass()} style={styles.list}>
        { threads.map((thread, i) =>
          <RedditThread key={i}
                        id={thread.id}
                        // even={i % 2 == 0 ? true : false}
                        title={thread.title}
                        author={thread.author}
                        url={thread.url}
                        preview={thread.preview ? thread.preview.url : null}
                        comment_count={thread.comment_count}
                        onCommentsClick={onCommentsClick}
                        timeAgo={thread.timeAgo}
                        created={thread.created} />
        )}
      </ol>
    )
  }
}

export default RedditThreadList

let styles = {
  list: {
    listStyleType: 'none',
    paddingLeft: 0,
    fontFamily: "'Open Sans', sans-serif"
  }
}
