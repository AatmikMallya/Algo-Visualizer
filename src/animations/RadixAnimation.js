import { cardFlip, wait, colors, isRunning, animationInterval } from '../components/SortingTimeVisualizer';
import getRadixAnimations from '../algorithms/Radix';

// Render heap sort animations
export default async function animateRadixSort(stateArray) {
    const animations = getRadixAnimations(stateArray);
    const arr = document.getElementsByClassName('array');

    console.log("TODO: Radix sort")
    
    await wait(500);
    for (let i = 0; i < arr.length / 2; i++) {
        arr[i].style.backgroundColor = colors.green;
        arr[arr.length - i - 1].style.backgroundColor = colors.green;
        await wait(1000 / arr.length);
    }
}
