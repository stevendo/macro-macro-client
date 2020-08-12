import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'
import { Link, withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'

import { foodIndex } from '../../api/food'
import { logCreate } from '../../api/log'

import { Table, Button } from 'react-bootstrap'

class AllFood extends Component {
  constructor (props) {
    super(props)

    this.state = {
      food: [],
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

  addLog (id) {
    event.preventDefault()
    // console.log(this.state, 'state')
    // console.log(id, 'id')
    const data = this.state.foods[id]
    console.log(data, 'data')
    logCreate(this.props.user, data)
  }

  render () {
    if (!this.state.foods) {
      return (
        <div className="index-not-found">
          <p>Could not connect to server, please try again.</p>
        </div>
      )
    }

    const renderTable = (food, id) => {
      return (
        <tr key={id}>
          <td><Link to={`/foods/${food.id}`}>{food.name}</Link></td>
          <td>{food.carb}</td>
          <td>{food.fat}</td>
          <td>{food.protein}</td>
          <td><Button onClick={() => this.addLog(id)} size="sm">Add</Button></td>
        </tr>
      )
    }

    return (
      <div>
        <br/>
        <Table striped borderless hover variant="light">
          <thead>
            <tr>
              <th>Name</th>
              <th>Carbs</th>
              <th>Fats</th>
              <th>Protein</th>
              <th>Add</th>
            </tr>
          </thead>
          <tbody>
            {this.state.foods.map(renderTable)}
          </tbody>
        </Table>
      </div>
      // <ul>
      //   {this.state.foods.map(food => {
      //     return (
      //       <li key={food.id}>
      //         <Link to={`/foods/${food.id}`}>
      //           {food.id}. {food.name}: {food.fat}f {food.carb}c {food.protein}p
      //         </Link>
      //       </li>
      //     )
      //   })}
      // </ul>
    )
  }
}

export default withRouter(AllFood)
