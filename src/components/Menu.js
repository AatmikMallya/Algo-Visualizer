import React from 'react';
import LengthSlider from './LengthSlider';
import SpeedSlider from './SpeedSlider';
import './Menu.css';

export default class Menu extends React.Component {
    // Event handlers for menu items
    handleSpeedChange = interval => this.props.onSpeedChange(interval);
    handleGenerate = length => this.props.onGenerate(length);
    handleReset = () => this.props.onReset();
    handleExecute = () => this.props.onExecute(document.getElementById('menu-select').value);

    render = () => {
        return (
            <div id='menu-container'>
                <div className='menu-item' id='generate' onClick={() => this.handleGenerate()}>New Array</div>
                <div className='menu-item' id='reset' onClick={() => this.handleReset()}>Reset Array</div>
                <SpeedSlider onSlide={interval => this.handleSpeedChange(interval)} />
                <LengthSlider onSlide={length => this.handleGenerate(length)} />
                <select className='menu-item' id='menu-select' >
                    <option value='selection'>Selection Sort</option>
                    <option value='insertion'>Insertion Sort</option>
                    <option value='merge'>Merge Sort</option>
                    <option value='quick'>Quicksort</option>
                    <option value='heap'>Heapsort</option>
                    <option value='bubble'>Bubble Sort</option>
                    {/* <option value='counting'>Counting Sort</option> */}
                    {/* <option value=''></option> */}
                </select>
                <div className='menu-item' id='execute' onClick={() => this.handleExecute()}>Execute</div>
            </div>
        );
    }
}
