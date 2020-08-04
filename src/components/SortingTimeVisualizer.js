import React from 'react';
import Menu from './Menu';
import Timer from './Timer';
import UIfx from '../../node_modules/uifx';
import cardFlipMp3 from '../resources/card-flip.mp3';
import './SortingTimeVisualizer.css';

import animateInsertionSort from '../animations/InsertionAnimation';
import animateMergeSort from '../animations/MergeAnimation';
import animateQuickSort from '../animations/QuickAnimation';
import animateSelectionSort from '../animations/SelectionAnimation';
import animateBubbleSort from '../animations/BubbleAnimation';

import {bubbleAlgo} from '../algorithms/Bubble';


// Not very React-y, but these are only passed to animation/algorithm scripts that execute the sort
export let isRunning = false;
export let animationInterval = 0;
export const cardFlip = new UIfx(cardFlipMp3, {
    throttleMs: 60,
    volume: 0.7
});
export const colors = {
    purple: '#8a2be2',
    red: '#dc143c',
    green: '#24682d',
    yellow: '#ffff00',
    blue: '#0076b8'
};


// Main component of application
export default class SortingTimeVisualizer extends React.Component {
    constructor(props) {
        super(props);
        // array holds height values, bars holds the actual divs
        this.state = { array: [], bars: [], };
        
        this.cachedArray = [];
        this.defaultLength = 60;
        this.maxHeight = 550;
        this.timerElement = React.createRef();
    }
    
    // True if algorithm is currently running, false otherwise
    setRunning = bool => {
        isRunning = bool;
        this.timerElement.current.setStatus(bool);
    }

    // Compute reciprocal of interval to make the slider feel linear
    speedChange = interval => {
        animationInterval = interval < 5 ? 300 : 1500/interval - 15;
    }

    // Display a new randomized array, possibly with a new length
    generateArray = length => {
        const array = document.getElementsByClassName('array');
        this.setRunning(false);
        let arraySize;
        if (length) {
            arraySize = length;
            this.defaultLength = length;
        } else {
            arraySize = this.defaultLength;
        }

        const windowWidth = window.innerWidth;
        const margin = Math.max((windowWidth) / (10 * arraySize), 1.5);
        const width = Math.max((windowWidth - 100) / (1.75 * arraySize), 7);
        const radius = Math.max(width / 10, 3);

        // 85% of the distance between array container and menu
        this.maxHeight = 0.85 * (document.getElementById('bars-container').getBoundingClientRect().bottom -
                                 document.getElementById('menu-container').getBoundingClientRect().bottom);
        
        const newArray = [];
        for (let i = 0; i < arraySize; i++) {
            newArray.push(Math.floor(Math.random()*this.maxHeight + 25));
        }
        //const newArray = [ 15, 200, 150, 25, 300 ];
        this.setState({
            array: newArray,
            bars: newArray.map((value, i) => <div className='array' key={i} idx={i} color={colors.green} type={undefined} style={{
                height: value,
                margin: margin,
                width: width,
                borderRadius: radius,
            }} />)
        });

        // Deep copy to allow resetting to original state
        this.cachedArray = [];
        for (let i = 0; i < newArray.length; i++) {
            this.cachedArray.push(newArray[i]);
        }

        // In case we are currently in execution
        for (let i = 0; i < array.length; i++) {
            array[i].style.backgroundColor = colors.green;
        }
    }

    // Return bar heights and colors to pre-sorted state
    resetArray = async () => {
        const array = document.getElementsByClassName('array');
        const arraySize = array.length;

        this.setRunning(false);

        const oldArray = []
        for (let i = 0; i < arraySize; i++) {
            array[i].style.height = this.cachedArray[i] + "px";
            array[i].type = undefined;
            oldArray.push(this.cachedArray[i]);
        }

        this.setState({array: oldArray});
        
        for (let i = 0; i < arraySize; i++) {
            array[i].style.backgroundColor = "#07ad1d";
        }
        await wait(333);
        for (let i = 0; i < arraySize; i++) {
            array[i].style.backgroundColor = colors.green;
        }
    }

    // Generates many large arrays, logs 'true' for each correct sort
    testSort = mySort => {
        const startTime = new Date();
        for (let i = 0; i < 100; i++) {
            const testArr = [];
            const length = Math.floor(Math.random()*1001);
            for (let j = 0; j < length; j++) {
                testArr.push(Math.floor(Math.random()*501));
            }
            const testArr2 = [...testArr];
    
            mySort(testArr, 0, testArr.length - 1);
            correctSort(testArr2);
    
            console.log(arrayEquality(testArr, testArr2));
        }
        const elapsedTime = new Date() - startTime;
        console.log("Elapsed time: ", elapsedTime, " ms");
    }

    // Runs selected algorithm from dropdown
    handleExecute = async algorithm => {
        if (isRunning) return;
        this.setRunning(true);
        const array = this.state.array;

        switch(algorithm) {
            case 'selection': await animateSelectionSort(array); break;
            case 'insertion': await animateInsertionSort(array); break;
            case 'merge': await animateMergeSort(array); break;
            case 'quick': await animateQuickSort(array); break;
            case 'bubble': await animateBubbleSort(array); break;
            default: await animateSelectionSort(array);
        }
        
        // if (algorithm === 'selection')
        //     await animateSelectionSort(this.state.array);
        // else if (algorithm === 'insertion')
        //     await animateInsertionSort(this.state.array);
        // else if (algorithm === 'merge')
        //     await animateMergeSort(this.state.array);
        // else if (algorithm === 'quick')
        //     await animateQuickSort(this.state.array);
        // else if (algorithm === 'bubble')
        //     await animateBubbleSort(this.state.array);

        this.setRunning(false);
    }

    // Everything on screen is rendered here
    render = () => {
        return (
            <div>
                <div id='color-strip' />
                <Menu onGenerate={this.generateArray} onReset={this.resetArray} onSpeedChange={this.speedChange} onExecute={this.handleExecute} />
                <div id='bars-container'>
                    {this.state.bars}
                    {/* <button id='test-sort' onClick={this.testSort.bind(this, bubbleAlgo)}>Test Sort</button> */}
                </div>
                <Timer status={isRunning} ref={this.timerElement}/>
            </div>
        )
    }
}


// Effectively a synchronous sleep function
export const wait = ms => new Promise(res => setTimeout(res, ms));

// For testing purposes
const correctSort = arr => arr.sort((a, b) => a - b);

// Also for testing purposes
const arrayEquality = (a, b) => {
	if (a.length !== b.length) {
        return false;
    }
	for (let i = 0; i < a.length; i++) {
		if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}
