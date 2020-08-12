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
        // console.log(this.props.match.params, 'wut is response')
        this.setState({
          logs: res.data,
          deleted: false
        })
        console.log(this.state.logs, 'how many logs')
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

  // totalMacros = () => {
  //   let totalc = 0
  //   let totalf = 0
  //   let totalp = 0
  //   for (let i = 0; i < this.state.logs.length; i++) {
  //     totalc += Number(this.state.logs[i].carb)
  //     // console.log(totalc, 'totals')
  //     totalf += Number(this.state.logs[i].fat)
  //     totalp += Number(this.state.logs[i].protein)
  //   }
  //   // console.log(totalc, 'totals')
  //   return (totalc, totalf, totalp)
  // }

  total = (macro) => {
    let total = 0

    for (let i = 0; i < this.state.logs.length; i++) {
      total += parseFloat(this.state.logs[i][macro])
    }
    // console.log(total, 'is this total')
    return total
  }

  render () {
    // console.log(this.state.food, 'is this food')
    // if (this.state.deleted === true) {
    //   return <Redirect to='/foods' />
    // }

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

    const { year, month, day } = this.props.match.params

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
          <thead>
            <tr>
              <th>Total</th>
              <th>{this.total('carb')}</th>
              <th>{this.total('fat')}</th>
              <th>{this.total('protein')}</th>
            </tr>
          </thead>
        </Table>
      </div>
    )
  }
}

export default ByDayLogs
