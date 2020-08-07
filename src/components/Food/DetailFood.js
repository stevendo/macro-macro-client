import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { foodDetail, foodDelete } from '../../api/food'
import messages from '../AutoDismissAlert/messages'
import Button from 'react-bootstrap/Button'

class DetailFood extends Component {
  constructor (props) {
    super(props)

    this.state = {
      food: null,
      deleted: false
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    const { user } = this.props
    foodDetail(user, id)
      .then(res => {
        // console.log(res, 'wut is response')
        this.setState({
          food: res.data,
          deleted: false
        })
      })
      .catch(error => {
        this.setState({
          food: null,
          deleted: true
        })
        this.props.msgAlert({
          heading: 'Could not find that food: ' + error.message,
          message: messages.detailFoodFailure,
          variant: 'danger'
        })
      })
  }

  deleteFood = () => {
    const id = this.props.match.params.id
    const { user } = this.props
    foodDelete(user, id)
      .then(response => {
        this.setState({
          deleted: true
        })
      })
      .catch(console.error)
  }
  render () {
    // console.log(this.state.food, 'is this food')
    if (this.state.deleted === true) {
      return <Redirect to='/foods' />
    }

    let jsx

    if (this.state.food === null) {
      jsx = <p>Loading ...</p>
    } else {
      jsx = (
        <div>
          <h3>{this.state.food.name}</h3>
          <h4> has {this.state.food.carb}c</h4>
          <h4> has {this.state.food.fat}f</h4>
          <h4> has {this.state.food.protein}p</h4>
          <button onClick={this.deleteFood}>Delete</button>
        </div>
      )
    }

    const { owner } = this.state

    let ownerButtons = ''
    if (this.props.user && owner === this.props.user.id) {
      ownerButtons = (
        <div>
          <Link to={`/foods/${this.props.match.params.id}/edit`}>
            <Button variant="info">Edit Food</Button>
          </Link>
        </div>
      )
    }

    return (
      <div>
        <h2>Food Detail</h2>
        {jsx}
        {ownerButtons}
      </div>
    )
  }
}

export default DetailFood
