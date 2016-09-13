import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Radium from 'radium'
import FontAwesome from 'react-fontawesome'
import RedditComment from './RedditComment'
import RedditCurrentThread from './RedditCurrentThread'
import DropSelect from './DropSelect'

@Radium
export default class RedditCommentList extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackClick = this.handleBackClick.bind(this)
  }

  scrollToTop() {
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100)
  }

  componentWillUpdate(nextProps) {
    if ( nextProps.currentThread &&
         nextProps.currentThread !== this.props.currentThread) {
      this.scrollToTop()
    }
  }

  listClass() {
    let classes = ['page', 'comments-list', 'transition']
    this.props.currentThread ? classes.push('center') : classes.push('right')
    return classes.join(' ')
  }

  handleBackClick(e) {
    e.preventDefault()
    this.props.onBackClick(this.props.scrollY)
  }

  renderCurrentThread() {
    const { currentThreadItem } = this.props
    const thread = currentThreadItem || {}

    return (
      <div className='current-thread'>
        { this.renderBackButton() }
        <RedditCurrentThread id={thread.id}
                             title={thread.title}
                             author={thread.author}
                             url={thread.url}
                             text={thread.text}
                             preview={thread.preview ? thread.preview.url : null}
                             comment_count={thread.comment_count}
                             onCommentsClick={() => {}}
                             timeAgo={thread.timeAgo}
                             created={thread.created} />
        <div style={{clear:'both'}} />
      </div>
    )
  }

  renderBackButton() {
    return (
      <a className='back-btn'
         href='#'
         onClick={this.handleBackClick}
         style={styles.backBtn}>
        <FontAwesome name='arrow-circle-left' size='3x'/>
        <span className='back-btn-text' style={styles.backBtnText}>
          BACK
        </span>
      </a>
    )
  }

  renderSortSelect() {
    const { comments, sortComments, currentThread, sortKey } = this.props
    let sortStyles = [styles.sortBy]
    if ( comments.length == 0 ) { sortStyles.push({display: 'none'}) }

    return (
      <div className='sort-by' style={sortStyles}>
        <span className='sort-label' style={styles.sortLabel}>
          SORT BY
        </span>
        <DropSelect dropValue={sortKey}
                    dropOptions={['Time', 'Upvotes', 'Ratio']}
                    updateKey='sortKey'
                    updateArgs={{currentThread: currentThread}}
                    updateAction={sortComments} />
      </div>
    )
  }

  render() {
    const { comments } = this.props

    return (
      <div className={this.listClass()}>
        { this.renderCurrentThread() }
        { this.renderSortSelect() }
        <ol style={styles.list}>
          { comments.map((comment, i) =>
            <RedditComment key={`comment-${i}-${comment.id}`}
                           id={comment.id}
                           indentation={0}
                           even={i % 2 == 0 ? true : false}
                           text={comment.text}
                           author={comment.author}
                           created={comment.created}
                           ups={comment.ups}
                           downs={comment.downs}
                           items={comment.items}
                           timeAgo={comment.timeAgo}
                           created={comment.created} />
          )}
        </ol>
      </div>
    )
  }
}


let styles = {
  list: {
    // width: 800,
    margin: '8px auto',
    paddingLeft: 0,
    listStyleType: 'none',
    fontFamily: "'Open Sans', sans-serif"
  },
  backBtn: {
    fontFamily: "'Open Sans', sans-serif",
    float: 'left',
    color: '#545454',
    textAlign: 'left',
    display: 'block',
    width: 40,
    height: 40,
    fontSize: 12,
    textDecoration: 'none',
    ':hover': {
      color: '#181818',
      cursor: 'pointer'
    }
  },
  backBtnText: {
    display: 'block'
  },
  sortBy: {
    marginLeft: 60,
    fontFamily: "'Open Sans', sans-serif",
    color: '#545454',
    fontSize: 12
  },
  sortLabel: {
    display: 'inline-block',
    minWidth: 90
  }
}
