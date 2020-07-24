import React from 'react';
import InputSlider from './Slider';
import './Menu.css';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            algorithm: "selection"
        }
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
                <InputSlider onSlide={length => this.handleGenerate(length)}/>
                <select className="menu-item" id="menu-select" >
                    <option value="selection">Selection Sort</option>
                    <option value="insertion">Insertion Sort</option>
                    <option value="merge">Merge Sort</option>
                    <option value="quick">Quicksort</option>
                </select>
                <div className="menu-item" id="execute" onClick={() => this.handleExecute()}>Execute</div>
            </div>
        );
    }
}
