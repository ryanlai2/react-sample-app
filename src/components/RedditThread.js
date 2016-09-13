import React, { PropTypes, Component } from 'react'
import Radium from 'radium'

@Radium
export default class RedditThread extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    comment_count: PropTypes.number,
    onCommentsClick: PropTypes.func.isRequired,
    created: PropTypes.number.isRequired,
    timeAgo: PropTypes.string.isRequired,
    preview: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.handleCommentsClick = this.handleCommentsClick.bind(this)
  }

  handleCommentsClick(e) {
    e.preventDefault()
    this.props.onCommentsClick(this.props.id)
  }

  render() {
    const { id, title, author, url, preview, timeAgo,
            comment_count, onCommentsClick } = this.props
    return (
      <li key={`thread-comments-${id}`}
          className='thread'
          onClick={this.handleCommentsClick}
          style={styles.thread}>
        <div key={`comments-${id}`} className='comments' style={styles.comments}>
          <h4 style={styles.commentsNumber}>{comment_count}</h4>
          <span style={styles.commentsLabel}>comments</span>
        </div>
        <div className='content' style={styles.content}>
          <span style={styles.title}>
            {title}
          </span>
          <p style={styles.submitted}>
            Submitted {timeAgo} by&nbsp;
            <span style={styles.author}>
              {author}
            </span>
          </p>
        </div>
      </li>
    )
  }
}

const styles = {
  thread: {
    fontFamily: "'Open Sans', sans-serif",
    color: '#A9AFB3',
    fontSize: 24,
    height: 'auto',
    position: 'relative',
    border: '1px solid #545454',
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
    ':hover': {
      backgroundImage: 'linear-gradient(-180deg, #FFFDFD 0%, #FFF9F9 100%)',
      border: '1px solid #0086BF',
      borderRadius: 8,
      color: '#181818',
      cursor: 'pointer'
    }
  },
  title: {
    display: 'block',
    lineHeight: 1.4,
    fontSize: 18,
    color: '#545454'
  },
  author: {
    color: '#545454',
    fontWeight: 'bold'
  },
  submitted: {
    fontStyle: 'italic',
    fontWeight: 'lighter',
    color: '#545454',
    fontSize: 10
  },
  content: {
    display: 'inline-block',
    position: 'relative',
    left: 80,
    maxWidth: 694,
    padding: '8px 12px'
  },
  comments: {
    display: 'inline-block',
    position: 'absolute',
    top: 2,
    width: 80,
    ':hover': {
      cursor: 'pointer'
    }
  },
  commentsNumber: {
    display: 'block',
    color: '#545454',
    fontSize: 36,
    fontWeight : 600,
    margin: 0,
    textAlign: 'center',
  },
  commentsLabel: {
    display: 'block',
    color: '#545454',
    marginTop: -8,
    fontSize: 14,
    fontStyle: 'italic',
    fontWeight: 'lighter',
    textAlign: 'center'
  }
}
