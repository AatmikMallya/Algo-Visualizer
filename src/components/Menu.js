import React from 'react';
import LengthSlider from './LengthSlider';
import SpeedSlider from './SpeedSlider';
import './Menu.css';

export default class Menu extends React.Component {
    // Event handlers for menu items
    handleSpeedChange = interval => this.props.onSpeedChange(interval);
    handleGenerate = length => this.props.onGenerate(length);
    handleExecute = () => this.props.onExecute();
    handleReset = () => this.props.onReset();

    handleSelect = () => this.props.onSelect(document.getElementById('menu-select').value);

    render = () => {
        return (
            <div id='menu-container'>
                <div className='menu-item' id='generate' onClick={() => this.handleGenerate()}>New Array</div>
                <div className='menu-item' id='reset' onClick={() => this.handleReset()}>Reset Array</div>
                <SpeedSlider onSlide={interval => this.handleSpeedChange(interval)} />
                <LengthSlider onSlide={length => this.handleGenerate(length)} />
                <select className='menu-item' id='menu-select' onChange={() => this.handleSelect()}>
                    <optgroup className='group' label='Simple Sorts'>
                        <option value='selection'>Selection sort</option>
                        <option value='insertion'>Insertion sort</option>
                    </optgroup>
                    <optgroup className='group' label='Efficient Sorts'>
                        <option value='merge'>Merge sort</option>
                        <option value='quick'>Quicksort</option>
                        <option value='heap'>Heapsort</option>
                        <option value='shell'>Shell sort</option>
                    </optgroup>
                    <optgroup className='group' label='Distribution Sorts'>
                        <option value='counting'>Counting sort</option>
                        <option value='radix'>Radix sort</option>
                        <option value='bucket'>Bucket sort</option>
                    </optgroup>
                    <optgroup className='group' label='Other Sorts'>
                        <option value='bubble'>Bubble sort</option>
                        <option value='comb'>Comb sort</option>
                    </optgroup>
                </select>
                <div className='menu-item' id='execute' onClick={() => this.handleExecute()}>Execute</div>
            </div>
        );
    }
}
