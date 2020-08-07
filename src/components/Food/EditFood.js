import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'

import { foodEdit } from '../../api/food'
import messages from '../AutoDismissAlert/messages'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class EditFood extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: this.props.name,
      carb: this.props.carb,
      fat: this.props.fat,
      protein: this.props.protein
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onEditFood = event => {
    event.preventDefault()

    const { user, history, msgAlert, match } = this.props
    foodEdit(this.state, match.params.id, user)
      .then(() => msgAlert({
        heading: 'Edit Success',
        message: messages.foodEditSuccess,
        variant: 'success'
      }))
      .then(() => history.push(`/foods/${match.params.id}`))
      .catch(error => {
        msgAlert({
          heading: 'Edit Failure: ' + error.message,
          message: messages.foodEditFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { name, carb, fat, protein } = this.state
    return (
      <div>
        <h3>edit food</h3>
        <Form onSubmit={this.onEditFood}>
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

export default EditFood
