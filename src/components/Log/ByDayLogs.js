import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { logByDay } from '../../api/log'
import messages from '../AutoDismissAlert/messages'
import { Table } from 'react-bootstrap'
// import Button from 'react-bootstrap/Button'
// import 'bootstrap/dist/css/bootstrap.min.css'

class ByDayLogs extends Component {
  constructor (props) {
    super(props)

    this.state = {
      logs: null,
      deleted: false
    }
  }

  componentDidMount () {
    // const id = this.props.match
    const { year, month, day } = this.props.match.params
    // console.log(id, 'wut is match')
    // year = this.props.match.params.year
    // month = this.props.match.params.month
    // day = this.props.match.params.day
    const { user } = this.props
    logByDay(user, year, month, day)
      .then(res => {
        console.log(this.props.match.params, 'wut is response')
        this.setState({
          logs: res.data,
          deleted: false
        })
      })
      .catch(error => {
        this.setState({
          logs: null,
          deleted: true
        })
        this.props.msgAlert({
          heading: 'Could not find logs for this day: ' + error.message,
          message: messages.byDayLogFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    // console.log(this.state.food, 'is this food')
    // if (this.state.deleted === true) {
    //   return <Redirect to='/foods' />
    // }

    const { year, month, day } = this.props.match.params

    if (!this.state.logs) {
      return (
        <div className ="index-not-found">
          <p>Could not connect to server, please try again.</p>
        </div>
      )
    }

    const renderTable = (log, index) => {
      return (
        <tr key={index}>
          <td><Link to={`/logs/${log.id}/`}>{log.name}</Link></td>
          <td>{log.carb}</td>
          <td>{log.fat}</td>
          <td>{log.protein}</td>
        </tr>
      )
    }

    return (
      <div>
        <br/>
        <h2>Food Log for {month}/{day}/{year}</h2>
        <Table striped borderless hover variant="dark">
          <thead>
            <tr>
              <th>Name</th>
              <th>Carbs</th>
              <th>Fats</th>
              <th>Protein</th>
            </tr>
          </thead>
          <tbody>
            {this.state.logs.map(renderTable)}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default ByDayLogs
