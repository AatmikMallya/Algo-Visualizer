import React from 'react';
import Menu from './Menu';
import Timer from './Timer';
import UIfx from 'uifx';
import cardFlipMp3 from '../resources/card-flip.mp3';
import cardFlip2Mp3 from '../resources/card-flip-2.mp3';
import './SortingTimeVisualizer.css';

import animateInsertionSort from '../animations/InsertionAnimation';
import animateMergeSort from '../animations/MergeAnimation';
import animateQuickSort from '../animations/QuickAnimation';
import animateSelectionSort from '../animations/SelectionAnimation';
import animateBubbleSort from '../animations/BubbleAnimation';
import animateHeapSort from '../animations/HeapAnimation';
import animateCountingSort from '../animations/CountingAnimation';

// import { countingAlgo } from '../algorithms/Counting';

// Not very React-y, but these are only passed to animation/algorithm scripts that execute the sort
export let isRunning = false;
export let animationInterval = 0;
export const cardFlip = new UIfx(cardFlipMp3, { throttleMs: 60, volume: 0.7 });
export const cardFlip2= new UIfx(cardFlip2Mp3,{ throttleMs: 120,volume: 0.6 });
export const colors = {
    purple: '#8a2be2',
    red: '#dc143c',
    green: '#24682d',
    yellow: '#ffff00',
    blue: '#0076b8'
};


//* Main component of application *//
export default class SortingTimeVisualizer extends React.Component {
    constructor(props) {
        super(props);
        // array holds height values, bars holds the actual divs
        this.state = {
            array: [],
            bars: [],
            algorithm: 'selection'
        };
        
        this.cachedArray = [];
        this.defaultLength = 60;
        this.maxHeight = 550;
        this.timerElement = React.createRef();
    }

    componentDidMount = () => {
        // 85% of the distance between array container and menu
        this.maxHeight = Math.floor(0.85 * (document.getElementById('bars-container').getBoundingClientRect().bottom -
                                            document.getElementById('menu-container').getBoundingClientRect().bottom));
    }
    
    // True if algorithm is currently running, false otherwise
    setRunning = async bool => {
        isRunning = bool;
        this.timerElement.current.setStatus(bool);
        if (bool) {
            document.getElementById('execute').classList.add('running');
        } else {
            document.getElementById('execute').classList.remove('running');

            // Fade back menu color
            const menu = document.getElementById('menu-container');
            const oldHue = getMenuHue();
            if (oldHue === menuColors.blue.hue) {
                return;
            }
            await wait(1000);
            await fade(oldHue, menuColors.blue.hue);
            const r = menuColors.blue.shadow.r, g = menuColors.blue.shadow.g, b = menuColors.blue.shadow.b
            menu.style.setProperty('box-shadow', `-1.5px 1.5px 2.5px rgb(${r},${g},${b})`);
        }            
    }

    // Compute reciprocal of interval to make the slider feel linear
    speedChange = interval => {
        animationInterval = interval < 5 ? 300 : 1500/interval - 15;
    }

    // Display a new randomized array, possibly with a new length
    generateArray = length => {
        const array = document.getElementsByClassName('array');
        if (isRunning) {
            this.setRunning(false);
        }
        let arraySize;
        if (length) {
            arraySize = length;
            this.defaultLength = length;
        } else {
            arraySize = this.defaultLength;
        }

        // The constant values are arbitrary and were chosen because they look nice
        const windowWidth = window.innerWidth;
        const margin = Math.max((windowWidth) / (10 * arraySize), 1.5);
        const width = Math.max((windowWidth - 100) / (1.75 * arraySize), 7);
        const radius = Math.max(width / 10, 3);
        
        const newArray = [];
        for (let i = 0; i < arraySize; i++) {
            newArray.push(Math.floor(Math.random() * this.maxHeight + 25));
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
        cardFlip.play()
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

    // Response to selecting algorithm from dropdown
    selectAlgorithm = async selection => {
        this.setState({ algorithm: selection });
        if (!isRunning) {
            const menu = document.getElementById('menu-container');
            const oldHue = getMenuHue();
            const newColor = algoColors[selection];
            const r = newColor.shadow.r, g = newColor.shadow.g, b = newColor.shadow.b;
            menu.style.setProperty('box-shadow', `-1.5px 1.5px 2.5px rgb(${r},${g},${b})`);
            await fade(oldHue, newColor.hue);
        }
    }

    // Runs selected algorithm
    handleExecute = async () => {
        if (isRunning) return;
        cardFlip.play(0);
        this.setRunning(true);

        const array = this.state.array;
        switch (this.state.algorithm) {
            case 'selection': await animateSelectionSort(array); break;
            case 'insertion': await animateInsertionSort(array); break;
            case 'merge': await animateMergeSort(array); break;
            case 'quick': await animateQuickSort(array); break;
            case 'bubble': await animateBubbleSort(array); break;
            case 'heap': await animateHeapSort(array); break;
            case 'counting': await animateCountingSort(array); break;
            default: await animateSelectionSort(array);
        }

        this.setRunning(false);
    }

    // Everything on screen is rendered here
    render = () => {
        return (
            <div>
                <div id='color-strip' />
                <Menu onGenerate={this.generateArray} onReset={this.resetArray} onSpeedChange={this.speedChange} onExecute={this.handleExecute} onSelect={this.selectAlgorithm}/>
                <div id='bars-container'>
                    {this.state.bars}
                    {/* Used for testing algorithms */}
                    {/* <button id='test-sort' onClick={this.testSort.bind(this, countingAlgo)}>Test Sort</button> */}
                </div>
                <Timer status={isRunning} ref={this.timerElement}/>
            </div>
        )
    }
}


//* Helpers *//
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

// For menu color fading
const menuColors = {
    blue:   { hue: 210, shadow: {r:9,   g:55, b:97} },
    red:    { hue: 5,   shadow: {r:83,  g:7,  b:7} },
    orange: { hue: 25,  shadow: {r:83,  g:37, b:6} },
    yellow: { hue: 45,  shadow: {r:109, g:82, b:9} }
};

const algoColors = {
    'selection': menuColors.red,
    'insertion': menuColors.red,
    'merge': menuColors.orange,
    'quick': menuColors.orange,
    'bubble': menuColors.red,
    'heap': menuColors.orange,
    'counting': menuColors.yellow
};

// Linear interpolation
const lerp = (a,b,u) => (1-u) * a + u * b;

const fade = async (start, end) => {
    const duration = 1000;
    const interval = 10;
    const step_u = 10 / duration;
    const menu = document.getElementById('menu-container').style;
    for (let u = 0.0; u < 1.0; u += step_u) {
      const hue = parseInt(lerp(start, end, u));
      menu.setProperty('background-color', `hsl(${hue}, 95%, 35%)`);
      await wait(interval);
    }
};

const getMenuHue = () => {
    const menu = document.getElementById('menu-container');
    const currentColor = menu.style.backgroundColor.match(/\d+/g)?.map(Number);
    if (!currentColor) return menuColors.blue.hue;
    const [r, g, b] = [currentColor[0]/255, currentColor[1]/255, currentColor[2]/255];
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let hue = 0;
    if (max !== min) {
        const d = max - min;
        switch (max) {
            case r: hue = (g - b) / d + (g < b ? 6 : 0); break;
            case g: hue = (b - r) / d + 2; break;
            case b: hue = (r - g) / d + 4; break;
            default: break;
        }
    }
    return hue * 60;
};

// RGB Version
// const fade = async (element, property, start, end, duration) => {
//   const interval = 10;
//   const step_u = interval / duration;
//   console.log(step_u)
//   for (let u = 0.0; u < 1.0; u += step_u) {
//     const r = parseInt(lerp(start.r, end.r, u));
//     const g = parseInt(lerp(start.g, end.g, u));
//     const b = parseInt(lerp(start.b, end.b, u));
//     element.style.setProperty(property, `rgb(${r},${g},${b})`);
//     await wait(interval);
//   }
// };
// const menuColors = {
//     blue: { r:22, g:94, b:161, shadow:{r:12, g:65, b:116} },
//     red: { r:170, g:8, b:8, shadow:{r:80, g:0, b:0} },
//     orange: {r:194, g:108, b:11, shadow:{r:97, g:63, b:0} },
//     yellow: {r:202, g:165, b:0, shadow:{r:73, g:66, b:0} }
// };
