import React, { Component } from 'react'
import Radium from 'radium'

@Radium
export default class RedditComment extends React.Component {
  constructor(props) {
    super(props);
  }

  commentStyles = (indentation) => {
    if (indentation > 0) {
      return styles.indented
    } else {
      return styles.comment
    }
  }

  render() {
    const { id, text, author, ups, downs,
            items, indentation, timeAgo } = this.props
    const ratio = ups / (downs || 1)

    return (
      <div className='comment' style={this.commentStyles(indentation)}>
        <p>
          <span className='author' style={styles.author}>{author}</span>
          &nbsp;{timeAgo} | Upvoted: {ups} | Ratio: {ratio}
        </p>
        <div dangerouslySetInnerHTML={{__html: text}} style={styles.text}/>
        <div className='replies'>
          { items.map((comment, i) =>
            <RedditComment key={i}
                           id={comment.id}
                           indentation={indentation + 1}
                           text={comment.text}
                           author={comment.author}
                           created={comment.created}
                           ups={comment.ups}
                           items={comment.items}
                           downs={comment.downs}
                           replies={comment.items}
                           timeAgo={comment.timeAgo}
                           created={comment.created} />
          )}
        </div>
      </div>
    )
  }
}

const styles = {
  comment: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #545454',
    padding: 24,
    fontSize: 12,
    color: '#545454',
    lineHeight: '1.4em',
    marginBottom: 8
  },
  indented: {
    border: 'none',
    padding: '0 24px',
    borderLeft: '1px solid #545454'
  },
  author: {
    fontWeight: 'bold'
  },
  text: {
    fontSize: 12,
    lineHeight: '1.4em'
  }
}
