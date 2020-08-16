import React from 'react';
import Menu from './Menu';
import InfoBox from './InfoBox';
import Timer from './Timer';
import UIfx from 'uifx';
import cardFlipMp3 from '../resources/card-flip.mp3';
import cardFlip2Mp3 from '../resources/card-flip-2.mp3';
import './SortingTimeVisualizer.css';

import animateSelectionSort from '../animations/SelectionAnimation';
import animateInsertionSort from '../animations/InsertionAnimation';
import animateMergeSort from '../animations/MergeAnimation';
import animateQuickSort from '../animations/QuickAnimation';
import animateHeapSort from '../animations/HeapAnimation';
import animateShellSort from '../animations/ShellAnimation';
import animateCountingSort from '../animations/CountingAnimation';
import animateRadixSort from '../animations/RadixAnimation';
import animateBucketSort from '../animations/BucketAnimation';
import animateBubbleSort from '../animations/BubbleAnimation';
import animateCombSort from '../animations/CombAnimation';

// import { combAlgo } from '../algorithms/Comb';

// These are passed to animation/algorithm scripts that execute the sort
export let isRunning = false;
export let animationInterval = 0;
export const cardFlip = new UIfx(cardFlipMp3, { throttleMs: 60, volume: 0.7 });
export const cardFlip2= new UIfx(cardFlip2Mp3,{ throttleMs: 140,volume: 0.6 });
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
        // this.maxHeight = Math.floor(0.85 * (document.getElementById('bars-container').getBoundingClientRect().bottom -
        //                                     document.getElementById('menu-container').getBoundingClientRect().bottom));
        this.maxHeight = Math.floor(0.9 * document.getElementById('bars-container').clientHeight);
        document.getElementById('body-container').style.height = (document.body.clientHeight - document.getElementById('menu-container').getBoundingClientRect().bottom) + 'px';
        console.log("SortingTimeVisualizer -> componentDidMount -> document.getElementById('body-container').style.height", document.getElementById('body-container').style.height)
        console.log("SortingTimeVisualizer -> componentDidMount -> document.getElementById('menu-container').getBoundingClientRect().bottom", document.getElementById('menu-container').getBoundingClientRect().bottom)
        this.selectAlgorithm('selection')
    }
    
    // True if algorithm is currently running, false otherwise
    setRunning = async bool => {
        isRunning = bool;
        this.timerElement.current.setStatus(bool);
        if (bool) {
            document.getElementById('execute').classList.add('running');
        } else {
            document.getElementById('execute').classList.remove('running');
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
        const newBars = newArray.map((value, i) => <div className='array' key={i} idx={i} color={colors.green} type={undefined} style={{
            height: value,
            marginLeft: margin,
            marginRight: margin,
            width: width,
            borderRadius: radius,
        }} />);
        this.setState({
            array: newArray,
            bars: newBars
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
            array[i].style.height = this.cachedArray[i] + 'px';
            array[i].type = undefined;
            oldArray.push(this.cachedArray[i]);
        }

        this.setState({array: oldArray});
        
        for (let i = 0; i < arraySize; i++) {
            array[i].style.backgroundColor = '#07ad1d';
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
            let testArr = [];
            const length = Math.floor(Math.random()*1001 + 5);
            for (let j = 0; j < length; j++) {
                testArr.push(Math.floor(Math.random()*501));
            }
            const testArr2 = [...testArr];

            testArr = mySort(testArr);  
            testArr2.sort((a, b) => a - b);
            console.log(arrayEquality(testArr, testArr2));
        }
        const elapsedTime = new Date() - startTime;
        console.log('Elapsed time: ', elapsedTime, ' ms');
    }

    // Response to selecting algorithm from dropdown
    selectAlgorithm = async selection => {
        this.setState({ algorithm: selection });
        const oldHue = getMenuHue();
        const newColor = algoColors[selection];
        await fade(oldHue, newColor);
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
            case 'heap': await animateHeapSort(array); break;
            case 'shell': await animateShellSort(array); break;
            case 'counting': await animateCountingSort(array); break;
            case 'radix': await animateRadixSort(array); break;
            case 'bucket': await animateBucketSort(array); break;
            case 'bubble': await animateBubbleSort(array); break;
            case 'comb': await animateCombSort(array); break;
            default: await animateSelectionSort(array);
        }
        // Ensure that the state array is sorted
        array.sort((a, b) => a - b);
        this.setRunning(false);
    }

    // Everything on screen is rendered here
    render = () => {
        return (
            <div id='body'>
                <div id='color-strip' />
                <Menu onGenerate={this.generateArray} onReset={this.resetArray} onSpeedChange={this.speedChange} onExecute={this.handleExecute} onSelect={this.selectAlgorithm} />
                <div id='body-container'>
                    <div id='horizontal-container'>
                        <div id='left-container'>
                            {/* TODO: ALIGNMENT BUTTONS */}
                        </div>
                        
                        <div id='bars-container'>
                            <div id='bars-cell'>
                                {this.state.bars}
                                {/* Used for testing algorithms */}
                                {/* <button id='test-sort' onClick={this.testSort.bind(this, combAlgo)}>Test Sort</button> */}
                            </div>
                        </div>
                        <div id='right-container'>
                            <InfoBox algorithm={this.state.algorithm} />
                        </div>
                    </div>
                    <div id='bottom-container'>
                        <Timer status={isRunning} ref={this.timerElement}/>
                    </div>
                </div>
            </div>
        )
    }
}


//* Helpers *//
// Effectively a synchronous sleep function
export const wait = ms => {
    return new Promise(res => setTimeout(res, ms));
}

// For testing purposes
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

// For menu color fading - based on average case
export const menuColors = {
    purple: 270,   // Initial
    red: 5,        // O(n^2)
    redOrange: 18, // In between
    orange: 28,    // O(nlogn)
    yellow: 45,    // O(n) possibly
};

export const algoColors = {
    selection: menuColors.red,
    insertion: menuColors.red,
    merge: menuColors.orange,
    quick: menuColors.orange,
    heap: menuColors.orange,
    shell: menuColors.redOrange,
    counting: menuColors.yellow,
    radix: menuColors.yellow,
    bucket: menuColors.yellow,
    bubble: menuColors.red,
    comb: menuColors.redOrange
};

// Linear interpolation
const lerp = (a,b,u) => {
    return (1-u) * a + u * b;
}

// Transition color theme
const fade = async (start, end) => {
    const duration = 1000;
    const interval = 10;
    const step_u = interval / duration;
    const menu = document.getElementById('menu-container').style;
    const icon = document.querySelector('.info-icon').style;
    const infoButton = document.getElementById('info-button').style;
    for (let u = 0.0; u < 1.0; u += step_u) {
        const hue = parseInt(lerp(start, end, u));
        menu.setProperty('background-color', `hsl(${hue}, 95%, 35%)`);
        menu.setProperty('box-shadow', `-1.5px 1.5px 2.5px hsl(${hue}, 95%, 15%)`);
        icon.setProperty('color',`hsl(${hue}, 95%, 20%)`)
        infoButton.setProperty('border-color', `hsl(${hue}, 95%, 25%)`);
        infoButton.setProperty('background-color', `hsla(${hue}, 95%, 30%, 0.1)`);
        await wait(interval);
    }
};

const getMenuHue = () => {
    const menu = document.getElementById('menu-container');
    const currentColor = menu.style.backgroundColor.match(/\d+/g)?.map(Number);
    if (!currentColor) return menuColors.purple;
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
