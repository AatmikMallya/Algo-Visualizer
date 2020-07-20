import React from 'react';
import './AlgoVisualizer.css';

export default class AlgoVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array : [], // holds height values
            bars : []   // divs that are directly displayed
        };
    }

    // initialize array to random values
    componentDidMount() {
        for (let i = 0; i < 20; i++) {
            this.state.array.push(Math.floor(Math.random()*500 + 20))
        }
        this.setState({
            bars : this.state.array.map((element, i) => <div className="array" style={{height: element}} key={i} />)
        })
    }

    render() {
        return (
            <div>
                {this.state.bars}
            </div>
        )
    }
}