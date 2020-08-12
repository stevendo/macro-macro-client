import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { logDetail, logDelete } from '../../api/log'
import messages from '../AutoDismissAlert/messages'
import Button from 'react-bootstrap/Button'

class DetailLog extends Component {
  constructor (props) {
    super(props)

    this.state = {
      log: null,
      deleted: false
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    const { user } = this.props
    logDetail(user, id)
      .then(res => {
        // console.log(res, 'wut is response')
        this.setState({
          log: res.data,
          deleted: false
        })
      })
      .catch(error => {
        this.setState({
          log: null,
          deleted: true
        })
        this.props.msgAlert({
          heading: 'Could not find that log: ' + error.message,
          message: messages.detailFoodFailure,
          variant: 'danger'
        })
      })
  }

  deleteLog = () => {
    const id = this.props.match.params.id
    const { user, history } = this.props
    logDelete(user, id)
      .then(response => {
        this.setState({
          deleted: true
        })
        history.goBack()
      })
      .catch(console.error)
  }
  render () {
    // console.log(this.state.food, 'is this food')
    if (this.state.deleted === true) {
      return <Redirect to='/foods' />
    }

    let jsx

    if (this.state.log === null) {
      jsx = <p>Loading ...</p>
    } else {
      jsx = (
        <div>
          <h3>{this.state.log.name}</h3>
          <h4> has {this.state.log.carb}c</h4>
          <h4> has {this.state.log.fat}f</h4>
          <h4> has {this.state.log.protein}p</h4>
          <Button
            variant="dark"
            size="sm" onClick={this.deleteLog}>Delete</Button>
        </div>
      )
    }

    const { owner } = this.state

    let ownerButtons = ''
    if (this.props.user && owner === this.props.user.id) {
      ownerButtons = (
        <div>
          <Link to={{
            pathname: `/logs/${this.props.match.params.id}/edit`,
            state: this.state.log }}>
            <Button variant="dark" size="sm">Edit Log</Button>
          </Link>
        </div>
      )
    }

    return (
      <div>
        <h2>Log Detail</h2>
        {jsx}
        <br/>
        {ownerButtons}
      </div>
    )
  }
}

export default DetailLog
