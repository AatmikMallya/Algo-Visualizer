import { cardFlip, wait, colors, isRunning, animationInterval } from '../components/SortingTimeVisualizer';
import getBubbleAnimations from '../algorithms/Bubble';

// Render bubble sort animations
export default async function animateBubbleSort(stateArray) {
    const animations = getBubbleAnimations(stateArray);
    const arr = document.getElementsByClassName('array');

    for (let i = 0; i < animations.length; i++) {
        if (!isRunning) break;
        // Only operation is swapping
        const [idx1, idx2] = animations[i];
        arr[idx1].style.backgroundColor = colors.yellow;
        arr[idx2].style.backgroundColor = colors.yellow;
        await wait(animationInterval);

        [arr[idx1].style.height, arr[idx2].style.height] = [arr[idx2].style.height, arr[idx1].style.height];
        await wait(animationInterval);
        
        const value1 = parseInt(arr[idx1].style.height.slice(0, -2));
        const value2 = parseInt(arr[idx2].style.height.slice(0, -2));
        arr[idx1].style.backgroundColor = value1 === stateArray[idx1] ? colors.purple : colors.green;
        if (value2 === stateArray[idx2]) {
            cardFlip.play();
            arr[idx2].style.backgroundColor = colors.purple;
        }
        else {
            arr[idx2].style.backgroundColor = colors.green;
        }
        
        await wait(animationInterval);
    }

    for (let i = 0; i < arr.length / 2; i++) {
        arr[i].style.backgroundColor = colors.green;
        arr[arr.length - i - 1].style.backgroundColor = colors.green;
        await wait(1000 / arr.length);
    }
}

