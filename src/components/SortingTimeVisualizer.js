import React from 'react';
import Menu from './Menu';
import InfoBox from './InfoBox';
import Timer from './Timer';
import UIfx from 'uifx';
import cardFlipMp3 from '../resources/card-flip.mp3';
import cardFlip2Mp3 from '../resources/card-flip-2.mp3';
import '../css/SortingTimeVisualizer.css';
import * as help from './SortingHelpers';

// These are passed to animation/algorithm scripts that execute the sort
export let isRunning = false;
export let isReset = false;
export let animationInterval = 0;
export const cardFlip = new UIfx(cardFlipMp3, { throttleMs: 60, volume: 0.7 });
export const cardFlip2= new UIfx(cardFlip2Mp3,{ throttleMs: 80,volume: 0.6 });
export const colors = {
    purple: '#8a2be2',
    red: '#dc143c',
    green: '#24682d',
    yellow: '#ffff00',
};

// Effectively a synchronous sleep function
export const wait = ms => {
    return new Promise(res => setTimeout(res, ms));
}

//* Main component of application *//
export default class SortingTimeVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            bars: [],
            algorithm: 'selection'
        };
        
        this.storedArray = [];
        this.defaultLength = 60;
        this.maxHeight = 550;
        this.timerElement = React.createRef();
    }

    // Set heights
    componentDidMount = () => {
        this.maxHeight = Math.floor(0.9 * document.getElementById('bars-container').clientHeight);
        document.getElementById('body-container').style.height = (document.body.clientHeight - document.getElementById('menu-container').getBoundingClientRect().bottom) + 'px';
        this.selectAlgorithm('selection')
    }
    
    // True if algorithm is currently running, false otherwise
    setRunning = async bool => {
        isRunning = bool;
        this.timerElement.current.setStatus(bool);
        if (bool) {
            isReset = false;
            document.getElementById('execute').classList.add('running');
        } else {
            document.getElementById('execute').classList.remove('running');
        }
    }

    // Compute reciprocal of interval to make the slider feel linear
    speedChange = interval => {
        animationInterval = interval < 3 ? 500 : 1500/interval - 15;
    }

    // Display a new randomized array, possibly with a new length
    generateArray = length => {
        const array = document.getElementsByClassName('array');
        isRunning && this.setRunning(false);
        isReset = true;
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
            newArray.push(Math.floor(Math.random() * this.maxHeight + 50));
        }
        const newBars = newArray.map((value, i) => <div className='array noselect' key={i} idx={i} color={colors.green} type={undefined} style={{
            height: value,
            marginLeft: margin,
            marginRight: margin,
            width: width,
            borderRadius: radius,
            fontSize: width/2.5
        }} >{value}</div>);
        this.setState({
            array: newArray,
            bars: newBars
        });

        // Deep copy to allow resetting to original state
        this.storedArray = [...newArray];

        setTimeout(() => {
            if (length > 50) {
                for (let i = 0; i < array.length; i++) {
                    array[i].style.backgroundColor = colors.green;
                    array[i].style.color = 'rgba(0,0,0,0)';
                }
            }
            else {
                for (let i = 0; i < array.length; i++) {
                    array[i].style.backgroundColor = colors.green;
                    array[i].style.color = 'black';
                }
            }
        }, 0)
    }

    // Return bar heights and colors to pre-sorted state
    resetArray = async () => {
        cardFlip.play()
        const array = document.getElementsByClassName('array');
        const arraySize = array.length;

        this.setRunning(false);
        isReset = true;

        const oldArray = []
        for (let i = 0; i < arraySize; i++) {
            array[i].style.height = this.storedArray[i] + 'px';
            array[i].innerHTML = array[i].style.height.slice(0, -2);
            array[i].type = undefined;
            oldArray.push(this.storedArray[i]);
        }

        this.setState({array: oldArray});
        
        for (let i = 0; i < arraySize; i++) {
            array[i].style.backgroundColor = '#07ad1d';
        }
        await wait(350);
        for (let i = 0; i < arraySize; i++) {
            array[i].style.backgroundColor = colors.green;
        }
    }

    // Response to selecting algorithm from dropdown
    selectAlgorithm = async selection => {
        this.setState({ algorithm: selection });
        const oldHue = help.getMenuHue();
        const newHue = help.algoColors[selection];
        await help.themeFade(oldHue, newHue);
    }

    // Runs selected algorithm
    handleExecute = async () => {
        if (isRunning) return;
        cardFlip.play(0);
        this.setRunning(true);
        const array = this.state.array;

        switch (this.state.algorithm) {
            case 'selection':  await help.selection(array);  break;
            case 'insertion':  await help.insertion(array);  break;
            case 'merge':      await help.merge(array);      break;
            case 'quick':      await help.quick(array);      break;
            case 'heap':       await help.heap(array);       break;
            case 'shell':      await help.shell(array);      break;
            case 'counting':   await help.counting(array);   break;
            case 'radix':      await help.radix(array);      break;
            case 'bucket':     await help.bucket(array);     break;
            case 'bubble':     await help.bubble(array);     break;
            case 'comb':       await help.comb(array);       break;
            default: await help.selection(array);
        }

        // Sort the state array to match the bars
        array.sort((a, b) => a - b);
        this.setRunning(false);
        await help.barFade();
    }

    // Everything on screen is rendered here
    render = () => {
        return (
            <div id='body-container'>
                <div id='color-strip' />
                <Menu onGenerate={this.generateArray} onReset={this.resetArray} onSpeedChange={this.speedChange} onExecute={this.handleExecute} onSelect={this.selectAlgorithm} />
                <div id='body'>
                    <div id='horizontal-container'>
                        <div id='left-container' />
                        <div id='bars-container'>
                            <div id='bars-cell'>
                                {this.state.bars}
                                {/* Used for testing algorithms */}
                                {/* <button id='test-sort' onClick={help.testSort.bind(this, combAlgo)}>Test Sort</button> */}
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
