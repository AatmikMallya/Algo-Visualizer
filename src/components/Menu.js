import React from 'react';
import './Menu.css';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            algorithm: "selection"
        }
    }

    handleGenerate() {
        this.props.onGenerate();
    }

    handleExecute() {
        const selectedAlgorithm = document.getElementById("menu-select").value;
        this.props.onExecute(selectedAlgorithm);
    }

    render() {
        return (
            <div id="menu-container">
                <div className="menu-button" id="selection-sort" onClick={() => this.handleGenerate()}>New Array</div>
                <select className="menu-select" id="menu-select" >
                    <option value="selection">Selection Sort</option>
                    <option value="insertion">Insertion Sort</option>
                    <option value="merge">Merge Sort</option>
                    <option value="quick">Quicksort</option>
                </select>
                <div className="menu-button" id="execute" onClick={() => this.handleExecute()}>Execute</div>
            </div>
        );
    }
}
