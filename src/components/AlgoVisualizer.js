import React from 'react';
import './AlgoVisualizer.css';
import {selectionSortAlgo, getSelectionSortAnims} from '../algorithms/SelectionSort';

const purple = "#8a2be2";
const red = "#dc143c";
const green = "#24682d";

export default class AlgoVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array : [], // holds height values
        };
        
        this.handleExecute = this.handleExecute.bind(this);

        this.bars = [];
        this.animationSpeed = 100
    }
    
    // initialize array to random values
    componentDidMount() {
        const newArr = []
        for (let i = 0; i < 50; i++) {
            newArr.push(Math.floor(Math.random()*400 + 20))
        }
        // const newArr = [
        //     306, 419,  28, 452, 378, 456,
        //     251, 416, 440, 148, 101, 173,
        //     167, 305, 225, 445, 469, 462,
        //     107, 156, 276, 506, 189, 137,
        //     201
        // ]
        this.setState({ array: newArr})
        this.bars = newArr.map((element, i) => <div className="array" style={{height: element}} key={i} index={i} />)
    }

    // get animations and put them on the screen in order
    animateSort(arr) {
        const animations = getSelectionSortAnims(arr)
        const arrayBars = document.getElementsByClassName("array")
        // console.log(animations)

        for (let i = 0; i < animations.length; i++) {
            // swapping animations[i][0] and animations[i][1]
            if (typeof animations[i][1] === "number") {
                const [index1, index2] = animations[i];
                setTimeout(() => {
                    const temp = arrayBars[index1].style.height;
                    arrayBars[index1].style.height = arrayBars[index2].style.height;
                    arrayBars[index2].style.height = temp;
                    arrayBars[index2].style.backgroundColor = green;
                }, i * this.animationSpeed)
            }

            // coloring the bar to represent comparison
            else {
                const [index, color, type] = animations[i];
                setTimeout(() => {
                    // debugger;
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
                            // if (animations[j].length > 2) {
                            //     break;
                            // }
                            // if (animations[j][1] === purple) {
                            //     arrayBars[j].style.backgroundColor = green;
                            //     break;
                            // }
                        }
                    }
                }, i * this.animationSpeed);
            }
        }
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

    handleExecute() {
        this.animateSort(this.state.array)
    }

    // everything rendered on screen is here
    render() {
        return (
            <div id="bars-container">
                {this.bars}
                <button id="execute" onClick={this.handleExecute}>Execute</button>
                <button id="test-sort" onClick={this.testSort.bind(this, selectionSortAlgo)}>Test Sort</button>
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