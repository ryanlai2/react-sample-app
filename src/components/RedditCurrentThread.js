import React, { Component } from 'react'
import Radium from 'radium'

@Radium
export default class RedditCurrentThread extends Component {
  constructor(props) {
    super(props);
    this.handleCommentsClick = this.handleCommentsClick.bind(this)
  }

  handleCommentsClick(e) {
    e.preventDefault()
    this.props.onCommentsClick(this.props.id)
  }

  authorURL() {
    let author = this.props.author
    return `https://www.reddit.com/user/${author}`
  }

  contentStyle() {
    const { preview } = this.props
    if ( preview ) {
      return [styles.content]
    } else {
      return [styles.content, styles.noImage]
    }
  }

  renderWithImage() {
    const { preview } = this.props

    return (
      <div style={styles.thread}>
        <div className='image' style={[styles.image, {backgroundImage: preview ? `url('${preview}')` : null}]}/>
        { this.renderContent() }
      </div>
    )
  }

  renderWithoutImage() {
    return (
      <div style={styles.thread}>
        { this.renderContent() }
      </div>
    )
  }

  renderContent() {
    const { id, title, author, url, preview, text, timeAgo,
            comment_count, onCommentsClick } = this.props

    return (
      <div className='content' style={this.contentStyle()}>
        <a key={`title-${id}`}
           href={url}
           target="_blank"
           style={[styles.title, styles.link]}>
          {title}
        </a>
        <p style={styles.submitted}>
          Submitted {timeAgo} by&nbsp;
          <a key={`author-${id}`} href={this.authorURL()}
                                  target="_blank"
                                  style={styles.link}>
            {author}
          </a>
        </p>
        <div dangerouslySetInnerHTML={{__html: text}} style={styles.text}/>
      </div>
    )
  }

  render() {
    if (this.props.preview) {
      return this.renderWithImage()
    } else {
      return this.renderWithoutImage()
    }
  }
}

const styles = {
  thread: {
    width: 740,
    float: 'right',
    fontFamily: "'Open Sans', sans-serif",
    color: '#545454',
    fontSize: 24,
    height: 'auto',
    position: 'relative',
    border: '1px solid #545454',
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    marginBottom: 8
  },
  link: {
    color: '#0086BF',
    textDecoration: 'none',
    ':hover': {
      color: '#184380',
      textDecoration: 'none',
      cursor: 'pointer'
    }
  },
  title: {
    display: 'block',
    lineHeight: 1.4,
    fontSize: 18,
    textDecoration: 'none'
  },
  submitted: {
    fontStyle: 'italic',
    fontWeight: 'lighter',
    color: '#545454',
    fontSize: 10
  },
  image: {
    position: 'absolute',
    width: 80,
    height: '100%',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7
  },
  content: {
    display: 'inline-block',
    position: 'relative',
    left: 80,
    maxWidth: 636,
    width: '100%',
    padding: '8px 12px'
  },
  noImage: {
    maxWidth: 716,
    left: 0
  },
  text: {
    fontSize: 12,
    lineHeight: '1.4em'
  }
}
