import React, { PropTypes, Component} from 'react'
import Radium from 'radium'
import FontAwesome from 'react-fontawesome'

@Radium
export default class DropSelect extends Component {

  static propTypes = {
    dropValue: React.PropTypes.string.isRequired,
    dropOptions: React.PropTypes.array.isRequired,
    dropOpen: React.PropTypes.bool,
    updateKey: React.PropTypes.string.isRequired,
    updateArgs: React.PropTypes.object,
    updateAction: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state =  new Object({dropOpen: false}, this.props)
    this.handleDropClick = this.handleDropClick.bind(this)
    this.handleOptionClick = this.handleOptionClick.bind(this)
    this.hideDrop = this.hideDrop.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({dropValue: nextProps.dropValue})
  }

  handleDropClick(event) {
    this.setState({dropOpen: !this.state.dropOpen})
  }

  handleOptionClick(event) {
    let value = event.currentTarget.getAttribute('value')
    this.setState({
      dropValue: value,
      dropOpen: false
    })

    let update = new Object(this.props.updateArgs || {})
    update[this.props.updateKey] = value
    this.props.updateAction(update)
  }

  hideDrop(e) {
    this.setState({dropOpen: false})
  }

  dropCaratSrc() {
    return this.state.dropOpen ? 'caret-up' : 'caret-down'
  }

  dropOptionStyles(value) {
    if ( this.props.dropValue == value ) {
      return [styles.dropOption, styles.dropOptionActive]
    } else {
      return [styles.dropOption]
    }
  }

  render() {
    return (
      <div className="drop-select" style={styles.dropSelect}
           onMouseLeave={this.hideDrop}
           onClick={this.handleDropClick} >
        <div>
          <span className="drop-placeholder" style={styles.dropPlaceholder} >
            {this.state.dropValue}
            <FontAwesome name={this.dropCaratSrc()}
                         style={styles.dropCarat}/>
          </span>
        </div>
        { this.renderDropSelection() }
      </div>
    )
  }

  renderDropSelection() {
    if (this.state.dropOpen === true) {
      return (
        <ul className="drop-options" style={styles.dropOptions} >
          { this.props.dropOptions.map(function(option, i) {
            return (
              <li key={i}
                  style={this.dropOptionStyles(option)}
                  onClick={this.handleOptionClick}
                  value={option}>
                {option}
              </li>
            )
          }, this)}
        </ul>
      )
    }
  }
}

const styles = {
  dropSelect: {
    position: 'relative',
    fontFamily: "'Open Sans', sans-serif",
    fontSize: 12,
    color: '#545454',
    display: 'inline-block',
    cursor: 'pointer',
    border: '1px solid #545454',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6
  },
  dropPlaceholder: {
    padding: '5px 8px',
    position: 'relative',
    fontWeight: 'bold',
    minWidth: 60,
    textAlign: 'right',
    display: 'block',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    ':hover': {
      backgroundColor: '#EDEDED'
    }
  },
  dropCarat: {
    padding: '8px 8px 7px 4px',
    marginTop: '-1px',
    position: 'absolute',
    right: -24,
    top: 0,
    width: 10,
    float: 'right',
    border: '1px solid #545454',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  dropOptions: {
    minWidth: 190,
    boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)',
    position: 'absolute',
    right: -24,
    listStyle: 'none',
    margin: '-8px 0 0',
    paddingLeft: 0,
    backgroundColor: '#FFFFFF',
    border: '1px solid #545454',
    zIndex: 10
  },
  dropOption: {
    padding: 6,
    ':hover': {
      cursor: 'pointer',
      backgroundColor: '#EDEDED',
    }
  },
  dropOptionActive: {
    backgroundColor: '#EDEDED'
  }
}
