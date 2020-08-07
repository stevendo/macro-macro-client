import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'

import { foodIndex } from '../../api/food'

class AllFood extends Component {
  constructor (props) {
    super(props)
    this.state = {
      foods: []
    }
  }

  componentDidMount () {
    const { user } = this.props
    foodIndex(user)
      .then(response => {
        this.setState({
          foods: response.data
        })
        // console.log(response, 'wut is response')
      })
      .catch(error => {
        this.setState({
          foods: null
        })
        this.props.msgAlert({
          heading: 'Could not reach server: ' + error.message,
          message: messages.indexFoodFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    if (!this.state.foods) {
      return (
        <div className="index-not-found">
          <p>Could not connect to server, please try again.</p>
        </div>
      )
    }

    return (
      <ul>
        {this.state.foods.map(food => {
          return (
            <li key={food.id}>
              {food.name}: {food.fat}f {food.carb}c {food.protein}p
            </li>
          )
        })}
      </ul>
    )
  }
}

export default withRouter(AllFood)
