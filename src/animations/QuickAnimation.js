import { cardFlip, wait, colors, isRunning, animationInterval } from '../components/SortingTimeVisualizer';
import getQuickAnimations from '../algorithms/Quick';

// Render quick sort animations
export default async function animateQuickSort(stateArray) {
    const animations = getQuickAnimations(stateArray, 0, stateArray.length - 1, []);
    const arr = document.getElementsByClassName('array');
    stateArray.sort((a, b) => a - b);

    for (let i = 0; i < animations.length; i++) {
        if (!isRunning) return;
        // Select new pivot
        if (animations[i].length === 1) {
            cardFlip.play();
            const [idx] = animations[i];

            arr[idx].style.backgroundColor = colors.red;
            await wait(animationInterval + 10);
        }
        // Swap two elements
        else {
            const [idx1, idx2] = animations[i];

            arr[idx1].style.backgroundColor = colors.yellow;
            arr[idx2].style.backgroundColor = colors.yellow;
            await wait(animationInterval + 10);

            [arr[idx1].style.height, arr[idx2].style.height] = [arr[idx2].style.height, arr[idx1].style.height];
            arr[idx1].innerHTML = arr[idx1].style.height.slice(0, -2);
            arr[idx2].innerHTML = arr[idx2].style.height.slice(0, -2);
            await wait(animationInterval + 10);

            const value1 = parseInt(arr[idx1].innerHTML);
            const value2 = parseInt(arr[idx2].innerHTML);
            arr[idx1].style.backgroundColor = value1 === stateArray[idx1] ? colors.purple : colors.green;
            arr[idx2].style.backgroundColor = value2 === stateArray[idx2] ? colors.purple : colors.green;
            await wait(animationInterval + 10);
        }
    }

    arr[arr.length - 1].style.backgroundColor = colors.purple;
}
