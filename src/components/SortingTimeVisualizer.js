import React from 'react';
import Menu from './Menu';
import './SortingTimeVisualizer.css';
import { getSelectionAnimations } from '../algorithms/Selection';
import { getInsertionAnimations, insertionAlgo } from '../algorithms/Insertion';

import UIfx from '../../node_modules/uifx';
import cardFlipMp3 from '../resources/card-flip.mp3';



const purple = "#8a2be2";
const red = "#dc143c";
const green = "#24682d";
const yellow = "#ffff00";

const cardFlip = new UIfx(cardFlipMp3, { throttleMs: 50 });

export default class SortingTimeVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array : [], // holds height values
        };
        
        this.bars = [];
        this.animationInterval = 0;
        this.defaultLength = 60;
        this.maxHeight = 550;
        this.isRunning = false;

        this.generateArray = this.generateArray.bind(this);
        this.speedChange = this.speedChange.bind(this);
        this.handleExecute = this.handleExecute.bind(this);
    }
    
    // initialize array to random values
    componentDidMount() {
        this.generateArray();
    }

    generateArray(length) {
        let arraySize;
        if (length) {
            arraySize = length;
            this.defaultLength = length;
        } else {
            arraySize = this.defaultLength
        }
        if (this.isRunning) {
            const bars = document.getElementsByClassName("array");
            for (let i = 0; i < arraySize; i++) {
                bars[i].style.backgroundColor = green;
            }
            this.isRunning = false;
        }

        const windowWidth = window.innerWidth;
        const arrayMargin = Math.max((windowWidth) / (10*arraySize), 1.5);
        const arrayWidth = Math.max((windowWidth - 100) / (1.75*arraySize), 7);

        // 85% of the distance between array container and menu
        this.maxHeight = 0.85 * (document.getElementById("bars-container").getBoundingClientRect().bottom - document.getElementById("menu-container").getBoundingClientRect().bottom)
        const newArray = [];
        for (let i = 0; i < arraySize; i++) {
            newArray.push(Math.floor(Math.random()*this.maxHeight + 15));
        }

        // const newArray = [306,419,14,650,378,456,251,416,440,148,101,173,167,10,225,445,20,462,107,156,276,506,189,15,201];
        this.setState({ array: newArray});
        this.bars = newArray.map((value, i) => <div className="array" key={i} index={i} color={green} type={undefined} style={{
            height: value,
            width: arrayWidth,
            margin: arrayMargin}}
        />);

    }

    speedChange(interval) {
        // compute reciprocal of interval to make the slider feel linear
        this.animationInterval = interval < 5 ? 300 : 1500/interval - 15;        
    }

    async animateSelectionSort() {
        const animations = getSelectionAnimations(this.state.array)
        const arrayBars = document.getElementsByClassName("array")
        
        // first bar will be purple (current min)
        arrayBars[0].style.backgroundColor = purple;
        await wait(this.animationInterval);

        for (let i = 1; i < animations.length; i++) {
            if (!this.isRunning) return;
            // swapping animations[i][0] and animations[i][1]
            if (typeof animations[i][1] === "number") {
                cardFlip.play();
                // the last arraybar is currently red, change it back
                arrayBars[animations[i - 1][0]].style.backgroundColor = green;
                const [index1, index2] = animations[i];

                arrayBars[index1].style.backgroundColor = yellow;
                arrayBars[index2].style.backgroundColor = yellow;
                await wait(this.animationInterval);

                const temp = arrayBars[index1].style.height;
                arrayBars[index1].style.height = arrayBars[index2].style.height;
                arrayBars[index2].style.height = temp;
                await wait(this.animationInterval);

                arrayBars[index1].style.backgroundColor = purple;
                arrayBars[index2].style.backgroundColor = green;
                await wait(this.animationInterval);
            }
            // coloring a bar red or purple to indicate comparison
            else {
                const [index, color, type] = animations[i];
                arrayBars[index].style.backgroundColor = color;
                arrayBars[index].type = type;

                if (animations[i - 1][1] === red) {
                    arrayBars[animations[i - 1][0]].style.backgroundColor = green;
                }
                // if this is the new min, reset the last min
                if (color === purple) {
                    for (let j = index - 1; j > 0; j--) {
                        if (arrayBars[j].type === "sorted") {
                            break;
                        }
                        if (arrayBars[j].style.backgroundColor === "rgb(138, 43, 226)") { //purple
                            arrayBars[j].style.backgroundColor = green;
                            break;
                        }
                    }
                }
                await wait(this.animationInterval);
            }
        }
        
        arrayBars[arrayBars.length - 1].style.backgroundColor = purple;
        await wait(this.animationInterval);

        for (let i = 0; i < arrayBars.length; i++) {
                arrayBars[i].style.backgroundColor = green;
                arrayBars[i].type = undefined;
                await wait(0.33 * this.animationInterval);
        }
        
        this.isRunning = false;
    }

    async animateInsertionSort() {
        const animations = getInsertionAnimations(this.state.array)
        const arrayBars = document.getElementsByClassName("array")

        // first bar will be purple (current min)
        arrayBars[0].style.backgroundColor = purple;
        await wait(this.animationInterval);

        for (let i = 0; i < animations.length; i++) {
            if (!this.isRunning) {
                for (let i = 0; i < arrayBars.length; i++) {
                    arrayBars[i].style.backgroundColor = green;
                }
                return;
            }

            // swapping
            if (typeof animations[i][1] === "number") {
                const [index1, index2] = animations[i];
                
                arrayBars[index1].style.backgroundColor = yellow;
                arrayBars[index2].style.backgroundColor = yellow;
                await wait(this.animationInterval);

                const temp = arrayBars[index1].style.height;
                arrayBars[index1].style.height = arrayBars[index2].style.height;
                arrayBars[index2].style.height = temp;
                await wait(this.animationInterval);

                arrayBars[index2].style.backgroundColor = purple;
                if (i === animations.length - 1 || typeof animations[i + 1][1] !== "number") {
                    cardFlip.play();
                    arrayBars[index1].style.backgroundColor = purple;
                }
            }
            // coloring
            else {
                const [index, color] = animations[i];
                arrayBars[index].style.backgroundColor = color;
                await wait(this.animationInterval);
            }
        }

        await wait(this.animationInterval);

        for (let i = 0; i < arrayBars.length; i++) {
                arrayBars[i].style.backgroundColor = green;
                await wait(0.33 * this.animationInterval);
        }
        
        this.isRunning = false;
    }

    async animateMergeSort() {
        console.log("Todo: Merge sort")
    }

    async animateQuickSort() {
        console.log("Todo: Quicksort")
    }

    // generates many large arrays, logs "true" for each correct sort
    testSort(mySort) {
        for (let i = 0; i < 1000; i++) {
            const testArr = [];
            for (let j = 0; j < 1000; j++) {
                testArr.push(Math.floor(Math.random()*500 + 20))
            }
            const testArr2 = [...testArr];
    
            mySort(testArr);
            correctSort(testArr2);
    
            console.log(arrayEquality(testArr, testArr2));
        }
    }

    async handleExecute(algorithm) {
        this.isRunning = true;
        switch(algorithm) {
            case 'selection':
                this.animateSelectionSort(); break;
            case 'insertion':
                this.animateInsertionSort(); break;
            case 'merge':
                this.animateMergeSort(); break;
            case 'quick':
                this.animateQuickSort(); break;
            default:
                this.animateSelectionSort(); break;
        }
    }

    // everything rendered on screen is here
    render() {
        return (
            <div>
                <div id="color-strip" />
                <Menu onExecute={this.handleExecute} onGenerate={this.generateArray} onSpeedChange={this.speedChange} />
                    <div id="bars-container">
                        {this.bars}
                        {/* <button id="test-sort" onClick={this.testSort.bind(this, **algo**)}>Test Sort</button> */}
                    </div>
            </div>
        )
    }
}

// effectively a synchronous sleep function
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// for testing purposes
function correctSort(arr) {
    return arr.sort((a, b) => a - b);
}

// checks if two arrays are equal (for testing)
function arrayEquality(arr1, arr2) {
	if (arr1.length !== arr2.length) {
        return false;
    }
	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}
