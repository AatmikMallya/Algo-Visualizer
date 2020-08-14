import { cardFlip, wait, colors, isRunning, animationInterval } from '../components/SortingTimeVisualizer';
import getCombAnimations from '../algorithms/Comb';

// Render heap sort animations
export default async function animateCombSort(stateArray) {
    const animations = getCombAnimations(stateArray);
    const arr = document.getElementsByClassName('array');

    console.log("TODO: Comb sort")
    
    await wait(500);
    for (let i = 0; i < arr.length / 2; i++) {
        arr[i].style.backgroundColor = colors.green;
        arr[arr.length - i - 1].style.backgroundColor = colors.green;
        await wait(1000 / arr.length);
    }
}
