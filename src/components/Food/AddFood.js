import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { foodCreate } from '../../api/food'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class AddFood extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      carb: '',
      fat: '',
      protein: ''
    }
  }

handleChange = event => {
  this.setState({
    [event.target.name]: event.target.value
  })
}

addFood = event => {
  event.preventDefault()

  const { msgAlert, history, user } = this.props
  // let id = ''

  foodCreate(user, { food: this.state })
    .then(res => {
      // id = res.data.food._id
    })
    .then(() => msgAlert({
      heading: 'New Food Added',
      message: messages.foodAddSuccess,
      variant: 'success'
    }))
    .then(() => history.push('/foods/'))
    .catch(error => {
      this.setState({ name: '', carb: '', fat: '', protein: '' })
      msgAlert({
        heading: 'Failed to post: ' + error.message,
        message: messages.foodAddFailure,
        variant: 'danger'
      })
    })
}

render () {
  const { name, carb, fat, protein } = this.state

  return (
    <div className="col-sm-10 col-md-8 mx-auto mt-5">
      <h3>Add New Foods</h3>
      <Form onSubmit={this.addFood}>
        <Form.Group controlId="name">
          <Form.Label>Food Item</Form.Label>
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
            placeholder="Carb Content"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="fat">
          <Form.Label>Fats</Form.Label>
          <Form.Control
            required
            type="text"
            name="fat"
            value={fat}
            placeholder="Fat Content"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="protein">
          <Form.Label>Proteins</Form.Label>
          <Form.Control
            required
            type="text"
            name="protein"
            value={protein}
            placeholder="Protein Content"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Button variant="dark" type="submit" size="sm">
          Submit
        </Button>
      </Form>
    </div>
  )
}
}

export default withRouter(AddFood)
