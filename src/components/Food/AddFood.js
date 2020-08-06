import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'

import { addFood } from '../../api/food'
// import messages from '../AutoDismissAlert/messages'

// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'

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
}

handleChange = event => {
  this.setState({
    [event.target.name]: event.target.value
  })
}

addFood = event => {
  event.preventDefault()

  const { msgAlert, history, setFood, user } = this.props

  
}
