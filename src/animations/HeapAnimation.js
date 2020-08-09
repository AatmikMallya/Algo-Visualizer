import { cardFlip, wait, colors, isRunning, animationInterval } from '../components/SortingTimeVisualizer';
import getHeapAnimations from '../algorithms/Heap';

// Render heap sort animations
export default async function animateHeapSort(stateArray) {
    const animations = getHeapAnimations(stateArray);
    const arr = document.getElementsByClassName('array');

    for (let i = 0; i < animations.length; i++) {
        if (!isRunning) break;
        // Only procedure is swapping
        const [idx1, idx2, isGreen] = animations[i];
        arr[idx1].style.backgroundColor = colors.yellow;
        arr[idx2].style.backgroundColor = colors.yellow;
        await wait(animationInterval);

        [arr[idx1].style.height, arr[idx2].style.height] = [arr[idx2].style.height, arr[idx1].style.height];
        await wait(animationInterval);
        
        arr[idx1].style.backgroundColor = colors.green;
        if (isGreen) {
            arr[idx2].style.backgroundColor = colors.green;
        }
        else {
            cardFlip.play();
            arr[idx2].style.backgroundColor = colors.purple;
        }
        await wait(animationInterval);
    }

    for (let i = 0; i < arr.length / 2; i++) {
        arr[i].style.backgroundColor = colors.green;
        arr[arr.length - i - 1].style.backgroundColor = colors.green;
        await wait(1000 / arr.length);
    }
}