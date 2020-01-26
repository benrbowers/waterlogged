import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { Scatter } from 'react-chartjs-2'

import '../styles/TrackerData.css'

class TrackerData extends Component {
  constructor(props) {
    super(props)
  }

  formatData(tracker, type) {
      return {
        labels: [type],
        datasets: [
          {
            label: type,
            fill: true,
            showLine: true,
            backgroundColor: 'rgba(75,192,192,0.4)',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: tracker.data[type.toLowerCase()]
          }
        ]
      }
  }

  formatCumulativeData(tracker, type) {
    let data = []
    if(tracker.data[type.toLowerCase()]) {
        let total = 0
        tracker.data[type.toLowerCase()].forEach((value) => {
            total += value.y
            data.push({ x: value.x, y: total })
        })
    }

    return {
      labels: [type],
      datasets: [
        {
          label: type,
          fill: true,
          showLine: true,
          backgroundColor: 'rgba(75,192,192,0.4)',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data
        }
      ]
    }
}

  render() {
    const { tracker } = this.props
    return (
        <div className="tracker-data">
            <h1 className="title">{tracker.appliance} Statistics</h1>
            <h2 className="h3-size">Daily Statistics</h2>
            <div className="data-section daily">
                <div className="graphs">
                    <div className="graph-container">
                        <h3 className="h3-size">Water Usage (in minutes)</h3>
                        <Scatter
                            className="graph"
                            width={230}
                            height={125}
                            data={this.formatData(tracker, 'Daily')}
                        />
                    </div>
                    <div className="graph-container">
                        <h3 className="h3-size">Cumulative Water Usage (in minutes)</h3>
                        <Scatter
                            className="graph"
                            width={230}
                            height={125}
                            data={this.formatCumulativeData(tracker, 'Daily')}
                        />
                    </div>
                </div>
                <div className="totals">
                    <h3 className="h3-size">Daily Totals</h3>
                    <span>Total Time: {tracker.totalData ? this.props.formatDuration(tracker.totalData.daily.elapsedTime) : '0 seconds' }</span>
                    <span>Estimated Gallons Used: {tracker.totalData ? tracker.totalData.daily.estGallons : 0} gallons</span>
                </div>
            </div>
            <hr/>
            <h2 className="h3-size">Weekly Statistics</h2>
            <div className="data-section weekly">
                <div className="graphs">
                    <div className="graph-container">
                        <h3 className="h3-size">Water Usage (in minutes)</h3>
                        <Scatter
                            className="graph"
                            width={230}
                            height={125}
                            data={this.formatData(tracker, 'Weekly')}
                        />
                    </div>
                    <div className="graph-container">
                        <h3 className="h3-size">Cumulative Water Usage (in minutes)</h3>
                        <Scatter
                            className="graph"
                            width={230}
                            height={125}
                            data={this.formatCumulativeData(tracker, 'Weekly')}
                        />
                    </div>
                </div>
                <div className="totals">
                    <h3 className="h3-size">Weekly Totals</h3>
                    <span>Total Time: {tracker.totalData ? this.props.formatDuration(tracker.totalData.weekly.elapsedTime) : '0 seconds' }</span>
                    <span>Estimated Gallons Used: {tracker.totalData ? tracker.totalData.weekly.estGallons : 0} gallons</span>
                </div>
            </div>
            <hr/>
            <h2 className="h3-size">Monthly Statistics</h2>
            <div className="data-section monthly">
                <div className="graphs">
                    <div className="graph-container">
                        <h3 className="h3-size">Water Usage (in minutes)</h3>
                        <Scatter
                            className="graph"
                            width={230}
                            height={125}
                            data={this.formatData(tracker, 'Monthly')}
                        />
                    </div>
                    <div className="graph-container">
                        <h3 className="h3-size">Cumulative Water Usage (in minutes)</h3>
                        <Scatter
                            className="graph"
                            width={230}
                            height={125}
                            data={this.formatCumulativeData(tracker, 'Monthly')}
                        />
                    </div>
                </div>
                <div className="totals">
                    <h3 className="h3-size">Monthly Totals</h3>
                    <span>Total Time: {tracker.totalData ? this.props.formatDuration(tracker.totalData.monthly.elapsedTime) : '0 seconds' }</span>
                    <span>Estimated Gallons Used: {tracker.totalData ? tracker.totalData.monthly.estGallons : 0} gallons</span>
                </div>
            </div>
            <hr/>
        </div>
    )
  }
}

export default TrackerData