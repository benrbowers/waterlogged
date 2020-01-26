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
            let dataDate = new Date(parseInt(dataValue.timestamp))
            let diffDays = this.computeDiffDays(today, dataDate)

            if(diffDays <= 30) {
              monthly.push(dataValue)
              monthlyTotal += parseInt(dataValue.elapsedTime)
            }
            if(diffDays <= 7) {
              weekly.push(dataValue)
              weeklyTotal += parseInt(dataValue.elapsedTime)
            }
            if(diffDays <= 1) {
              daily.push(dataValue)
              dailyTotal += parseInt(dataValue.elapsedTime)
            }
          })

          value.data.monthly = monthly
          value.data.weekly = weekly
          value.data.daily = daily
          // TODO: Add estGallons

          let monthlyEstGallons = 0
          let weeklyEstGallons = 0
          let dailyEstGallons = 0
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
    return (
      <Container className="data-container" fluid>
        {
          this.state.data &&
          Object.values(this.state.data.trackers).map((tracker) => 
            <TrackerData tracker={tracker} {...this.props} />
          )
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