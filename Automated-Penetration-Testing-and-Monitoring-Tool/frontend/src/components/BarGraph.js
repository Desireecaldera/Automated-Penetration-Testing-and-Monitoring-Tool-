import React from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

class BarGraph extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            dataHorizontal: {               
                labels:props.vNameArray,
                datasets: [
                  {                      
                    label: 'Number of Occurances',
                    data:  props.vCountArray,
                    fill: false,
                    backgroundColor:'rgba(255, 99, 132, 0.2)' ,
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 1
                  }
                ]
              }
        }
    }


    render() {
        return (
          <MDBContainer>
            <h3 className='mt-5'>Most Serious Vulnerabilities</h3>
            <Bar
              data={this.state.dataHorizontal}
              options={{ responsive: true }}
            />
          </MDBContainer>
        );
      }
}
export default BarGraph;