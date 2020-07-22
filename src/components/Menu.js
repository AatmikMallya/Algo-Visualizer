import React from 'react';
import './Menu.css';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            algorithm: "selection"
        }
    }

    handleExecute() {
        this.props.onClick();
    }

    render() {
        return (
            <div id="menu-container">
                <div className="menu-button" id="selection-sort" onClick={this.handleExecute}>New Array</div>
                <select>

                </select>
                <div className="menu-button" id="selection-sort" onClick={this.handleExecute}>Selection Sort</div>
                <div className="menu-button" id="insertion-sort" onClick={this.handleExecute}>Insertion Sort</div>
                <div className="menu-button" id="execute" onClick={() => this.handleExecute()}>Execute</div>
            </div>
        );
    }
}
