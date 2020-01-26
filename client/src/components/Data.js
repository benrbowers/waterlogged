import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { connect } from 'react-redux'

import '../styles/Data.css'
import { getData, computeData } from '../redux/actions'
import TrackerData from './TrackerData'
import url from '../server'

export class Data extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      data: null
    }
  }

  formatDuration = (totalTime) => {
    let seconds = totalTime
    let minutes = Math.floor(seconds / 60)
    seconds = seconds % 60
    let hours = Math.floor(minutes / 60) 
    minutes = minutes % 60
    let days = Math.floor(hours / 24) 
    hours = hours % 24
    let output = ""
    if(days) output += `${days} ${days === 1 ? 'day' : 'days'}, `
    if(hours) output += `${hours} ${hours === 1 ? 'hour' : 'hours'}, `
    if(minutes) output += `${minutes} ${hours === 1 ? 'minute' : 'minutes'}, `
    if(seconds) {
      output += `${seconds} ${seconds === 1 ? 'second' : 'seconds'}`
    } else {
      //Cut out ending comma and space
      output = output.substr(0, output.length-2)
    }
    return output
  }

  componentDidUpdate(prevProps) {
    // Token is populated, retrieve data
    if (this.props.token !== prevProps.token) {
      this.props.getData(`${url}/api/data`, { 'Authorization': this.props.token})
    }

    // Data has been retrieved, compute totals
    if (this.props.data !== prevProps.data) {
      if(!this.props.data.totalData) {
        this.setState({ data: this.props.data }, this.computeTotalData)
      }
    }
  }

  computeDiffDays = (date1, date2) => {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays
  }

  computeEstGallons = (total, appliance) => {
    let totalMins = total / 60.0
    const kitchenFaucetGPM = 2.5
    const showerGPM = 2.25
    const dishwasherGPM = 3
    const washingMachineGPM = 4
    const bathtubGPM = 5.5
    const defaultGPM = 3.25

    switch(appliance) {
      case 'Kitchen Faucet':
        return totalMins * kitchenFaucetGPM
      case 'Showerhead':
        return totalMins * showerGPM
      case 'Dishwasher':
        return totalMins * dishwasherGPM
      case 'Washing Machine':
        return totalMins * washingMachineGPM
      case 'Bathtub Faucet':
        return totalMins * bathtubGPM
      default:
        return totalMins * defaultGPM
    }
  }

  computeTotalData = () => {
    let allData = { ...this.state.data }
    let trackers = allData.trackers

    if(trackers) {
      let allTrackersMonthlyTotal = 0
      let allTrackersWeeklyTotal = 0
      let allTrackersDailyTotal = 0
      let allTrackersMonthlyGallons = 0
      let allTrackersWeeklyGallons = 0
      let allTrackersDailyGallons = 0

      let today = new Date()
      Object.values(trackers).forEach((value) => {
        let data = value.data ? Object.values(value.data) : null
        if(data) {
          let monthly = []
          let monthlyTotal = 0
          let weekly = []
          let weeklyTotal = 0
          let daily = []
          let dailyTotal = 0

          data.forEach((dataValue) => {
            let dataDate = new Date(parseInt(dataValue.timestamp)*1000)
            let diffDays = this.computeDiffDays(today, dataDate)

            if(diffDays <= 30) {
              monthly.push({ x: dataValue.timestamp, y: parseInt(dataValue.elapsedTime) / 60.0 })
              monthlyTotal += parseInt(dataValue.elapsedTime)
            }
            if(diffDays <= 7) {
              weekly.push({ x: dataValue.timestamp, y: parseInt(dataValue.elapsedTime) / 60.0 })
              weeklyTotal += parseInt(dataValue.elapsedTime)
            }
            if(diffDays <= 1) {
              daily.push({ x: dataValue.timestamp, y: parseInt(dataValue.elapsedTime) / 60.0 })
              dailyTotal += parseInt(dataValue.elapsedTime)
            }
          })

          value.data.monthly = monthly
          value.data.weekly = weekly
          value.data.daily = daily

          let monthlyEstGallons = this.computeEstGallons(monthlyTotal, value.appliance)
          let weeklyEstGallons = this.computeEstGallons(weeklyTotal, value.appliance)
          let dailyEstGallons = this.computeEstGallons(dailyTotal, value.appliance)
          value.totalData = {
            monthly: {
              elapsedTime: monthlyTotal,
              estGallons: monthlyEstGallons,
            },
            weekly: {
              elapsedTime: weeklyTotal,
              estGallons: weeklyEstGallons,
            },
            daily: {
              elapsedTime: dailyTotal,
              estGallons: dailyEstGallons,
            }
          }

          allTrackersMonthlyTotal += monthlyTotal
          allTrackersWeeklyTotal += weeklyTotal
          allTrackersDailyTotal += dailyTotal
          allTrackersMonthlyGallons += monthlyEstGallons
          allTrackersWeeklyGallons += weeklyEstGallons
          allTrackersDailyGallons += dailyEstGallons
        }
      })

      allData.totalData = {
        monthly: {
          elapsedTime: allTrackersMonthlyTotal,
          estGallons: allTrackersMonthlyGallons,
        },
        weekly: {
          elapsedTime: allTrackersWeeklyTotal,
          estGallons: allTrackersWeeklyGallons,
        },
        daily: {
          elapsedTime: allTrackersDailyTotal,
          estGallons: allTrackersDailyGallons,
        }
      }
      this.setState({ data: allData }, () => {
        this.props.computeData(allData)
      })
    }
  }

  render() {
    const { data } = this.state
    return (
      <Container className="data-container" fluid>
        {
          data &&
          Object.values(data.trackers).map((tracker) => 
            <TrackerData formatDuration={this.formatDuration} tracker={tracker} {...this.props} />
          )
        }
        {
          data &&
          Object.values(data.trackers).length > 1 &&
            <div className="tracker-totals">
                <h3>Total Water Usage Across All Trackers</h3>
                <span>Total Time: {data.totalData ? this.formatDuration(data.totalData.monthly.elapsedTime) : '0 seconds' }</span>
                <span>Estimated Gallons Used: {data.totalData ? data.totalData.monthly.estGallons : 0} gallons</span>
            </div>
        }
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth ? state.auth.token : null,
    data: state.data ? state.data.getData : null
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
    getData: (url, headers) => dispatch(getData(url, headers)),
    computeData: (data) => dispatch(computeData(data)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Data)