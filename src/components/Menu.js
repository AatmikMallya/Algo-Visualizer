import React from 'react';
import LengthSlider from './LengthSlider';
import SpeedSlider from './SpeedSlider';
import './Menu.css';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            algorithm: "selection"
        }
    }

    handleSpeedChange(interval) {
        this.props.onSpeedChange(interval);
    }

    handleGenerate(length) {
        this.props.onGenerate(length);
    }

    handleExecute() {
        const selectedAlgorithm = document.getElementById("menu-select").value;
        this.props.onExecute(selectedAlgorithm);
    }

    render() {
        return (
            <div id="menu-container">
                <div className="menu-item" id="selection-sort" onClick={() => this.handleGenerate()}>New Array</div>
                <SpeedSlider onSlide={interval => this.handleSpeedChange(interval)} />
                <LengthSlider onSlide={length => this.handleGenerate(length)} />
                <select className="menu-item" id="menu-select" >
                    <option value="insertion">Selection Sort</option>
                    <option value="selecton">Insertion Sort</option>
                    <option value="merge">Merge Sort</option>
                    <option value="quick">Quicksort</option>
                </select>
                <div className="menu-item" id="execute" onClick={() => this.handleExecute()}>Execute</div>
            </div>
        );
    }
}
