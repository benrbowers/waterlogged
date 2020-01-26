import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { Line } from 'react-chartjs-2'

import '../styles/TrackerData.css'

class TrackerData extends Component {
  constructor(props) {
    super(props)
  }

  formatDuration = () => {

  }

  render() {
    const { tracker } = this.props
    return (
        <div className="tracker-data">
            <h2 className="h3-size">Daily Statistics</h2>
            <div className="daily">
                <div className="graphs">
                    <div className="graph">
                        <h3 className="h3-size">Water Usage (in minutes)</h3>
                        <Line
                        
                        />
                    </div>
                    <div className="graph">
                        <h3 className="h3-size">Cumulative Water Usage (in minutes)</h3>
                        <Line
                        
                        />
                    </div>
                </div>
                <div className="totals">
                    <span>Total Time: {}</span>
                    <span>Estimated Gallons Used: {}</span>
                </div>
            </div>
            <h2 className="h3-size">Weekly Statistics</h2>
            <div className="weekly">
                <div className="graph">
                    <h3 className="h3-size">Water Usage (in minutes)</h3>
                    <Line
                    
                    />
                </div>
                <div className="graph">
                    <h3 className="h3-size">Cumulative Water Usage (in minutes)</h3>
                    <Line
                    
                    />
                </div>
            </div>
            <h2 className="h3-size">Monthly Statistics</h2>
            <div className="monthly">
                <div className="graph">
                    <h3 className="h3-size">Water Usage (in minutes)</h3>
                    <Line
                    
                    />
                </div>
                <div className="graph">
                    <h3 className="h3-size">Cumulative Water Usage (in minutes)</h3>
                    <Line
                    
                    />
                </div>
            </div>
        </div>
    )
  }
}

export default TrackerData