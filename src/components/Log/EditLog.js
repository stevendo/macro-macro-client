import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'

import { logEdit } from '../../api/log'
import messages from '../AutoDismissAlert/messages'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class EditLog extends Component {
  constructor (props) {
    super(props)
    console.log(this.props, 'editlog')
    this.state = {
      name: this.props.location.state.name,
      carb: this.props.location.state.carb,
      fat: this.props.location.state.fat,
      protein: this.props.location.state.protein
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onEditLog = event => {
    event.preventDefault()

    const { user, history, msgAlert, match } = this.props
    logEdit(this.state, match.params.id, user)
      .then(() => msgAlert({
        heading: 'Edit Success',
        message: messages.logEditSuccess,
        variant: 'success'
      }))
      .then(() => history.push(`/logs/${match.params.id}`))
      .catch(error => {
        msgAlert({
          heading: 'Edit Failure: ' + error.message,
          message: messages.logEditFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { name, carb, fat, protein } = this.state
    return (
      <div>
        <h3>edit log</h3>
        <Form onSubmit={this.onEditLog}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              value={name}
              placeholder="Food Name"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="carb">
            <Form.Label>Carbohydrates</Form.Label>
            <Form.Control
              required
              type="text"
              name="carb"
              value={carb}
              placeholder="Carb Count"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="fat">
            <Form.Label>Carbohydrates</Form.Label>
            <Form.Control
              required
              type="text"
              name="fat"
              value={fat}
              placeholder="Fat Count"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="protein">
            <Form.Label>Carbohydrates</Form.Label>
            <Form.Control
              required
              type="text"
              name="protein"
              value={protein}
              placeholder="Protein Count"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button
            variant="dark"
            type="submit"
            size="sm"
          >
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}

export default EditLog
