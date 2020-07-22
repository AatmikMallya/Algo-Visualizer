import React from 'react';
import Menu from './Menu';
import './SortingTimeVisualizer.css';
import {getSelectionSortAnims} from '../algorithms/SelectionSort';
import UIfx from '../../node_modules/uifx';
import cardFlipWav from '../resources/card-flip.wav';



const purple = "#8a2be2";
const red = "#dc143c";
const green = "#24682d";
const yellow = "#ffff00";

const cardFlip = new UIfx(cardFlipWav, { throttleMs: 10 });

export default class SortingTimeVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array : [], // holds height values
        };
        
        this.bars = [];
        this.animationSpeed = 5;
        this.arrayLength = 25;
        this.arrayHeight = 400;

        this.generateArray = this.generateArray.bind(this);
        this.handleExecute = this.handleExecute.bind(this);
    }
    
    // initialize array to random values
    componentDidMount() {
        this.generateArray();
    }

    generateArray() {
        const newArray = [];
        for (let i = 0; i < this.arrayLength; i++) {
            newArray.push(Math.floor(Math.random()*this.arrayHeight + 15));
        }
        // const newArr = [
        //     306, 419,  14, 452, 378, 456,
        //     251, 416, 440, 148, 101, 173,
        //     167, 10, 225, 445, 20, 462,
        //     107, 156, 276, 506, 189, 15,
        //     201
        // ];
        this.setState({ array: newArray});
        this.bars = newArray.map((element, i) => <div className="array" style={{height: element}} key={i} index={i} />);
    }

    // get animations and put them on the screen in order
    animateSelectionSort() {
        const array = this.state.array;
        const animations = getSelectionSortAnims(array)
        const arrayBars = document.getElementsByClassName("array")
        // console.log(animations)

        for (let i = 0; i < animations.length; i++) {
            if (animations[i][0] === null) {
                setTimeout(() => {}, (i + 1) * this.animationSpeed)
                setTimeout(() => {}, (i + 2) * this.animationSpeed)
            }
            // swapping animations[i][0] and animations[i][1]
            else if (typeof animations[i][1] === "number") {
                const [index1, index2] = animations[i];

                setTimeout(() => {
                    cardFlip.play();
                    arrayBars[index1].style.backgroundColor = yellow;
                    arrayBars[index2].style.backgroundColor = yellow;
                }, i * this.animationSpeed)

                setTimeout(() => {
                    const temp = arrayBars[index1].style.height;
                    arrayBars[index1].style.height = arrayBars[index2].style.height;
                    arrayBars[index2].style.height = temp;
                }, (i + 1) * this.animationSpeed)

                setTimeout(() => {
                    arrayBars[index1].style.backgroundColor = purple;
                    arrayBars[index2].style.backgroundColor = green;
                }, (i + 2) * this.animationSpeed)
            }
            // coloring the bar to represent comparison
            else {
                const [index, color, type] = animations[i];
                setTimeout(() => {
                    arrayBars[index].style.backgroundColor = color;
                    arrayBars[index].type = type;
                    if (color === red) {
                        setTimeout(() => {
                            arrayBars[index].style.backgroundColor = green;
                        }, this.animationSpeed);
                    }
                    else if (color === purple) {
                        for (let j = index - 1; j > 0; j--) {
                            if (arrayBars[j].type === "base") {
                                break;
                            }
                            if (arrayBars[j].style.backgroundColor === "rgb(138, 43, 226)") { //purple
                                arrayBars[j].style.backgroundColor = green;
                                break;
                            }
                        }
                    }
                }, i * this.animationSpeed);
            }
        }
        setTimeout(() => {
            arrayBars[arrayBars.length - 1].style.backgroundColor = purple;
        }, this.animationSpeed * animations.length)

        for (let i = 0; i < arrayBars.length; i++) {
            setTimeout(() => {
                arrayBars[i].style.backgroundColor = green;
                arrayBars[i].type = undefined;
            }, this.animationSpeed * (0.25 * i + animations.length))
        }
    }

    animateInsertionSort() {
        console.log("Todo: Insertion sort")
    }

    animateMergeSort() {
        console.log("Todo: Merge sort")
    }

    animateQuickSort() {
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

    handleExecute(algorithm) {
        switch(algorithm) {
            case 'selection':
                this.animateSelectionSort();
                break;
            case 'insertion':
                this.animateInsertionSort();
                break;
            case 'merge':
                this.animateMergeSort();
                break;
            case 'quick':
                this.animateQuickSort();
                break;
            default:
                this.animateSelectionSort();
                break;
        }
        
    }

    // everything rendered on screen is here
    render() {
        return (
            <div>
                <div id="color-strip" />
                <Menu onExecute={this.handleExecute} onGenerate={this.generateArray} />
                <div id="bars-container">
                    {this.bars}
                    {/* <button id="test-sort" onClick={this.testSort.bind(this, selectionSortAlgo)}>Test Sort</button> */}
                </div>
            </div>
        )
    }
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
};