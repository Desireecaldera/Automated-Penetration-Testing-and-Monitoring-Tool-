import React from "react";
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

class PieGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPie: {
        labels: ["High", "Medium", "Low", "Information"],
        datasets: [
          {
            data: props.riskArray, //props.riskArray is the data passed in from Resultstest.js
            backgroundColor: [ //each color corresponds to the labels respectively
              "#F7464A",
              "#46BFBD",
              "#FDB45C",
              "#949FB1"
            ],
            hoverBackgroundColor: [
              "#FF5A5E",
              "#5AD3D1",
              "#FFC870",
              "#A8B3C5"
            ]
          }
        ]
      }
    }
  }

  render() {
    return (
      <MDBContainer>
        {/*These classes adjusts the height and width of the pie chart element*/}
        {/*className="w-25 p-3"*/}
        <div className="h-25 d-inline-block">
          <h3 className="mt-5">Current Issues</h3>
          <Pie data={this.state.dataPie} options={{ responsive: true }} />
        </div>
      </MDBContainer>
    );
  }
}

export default PieGraph;