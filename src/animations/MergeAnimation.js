import { cardFlip, wait, colors, isRunning, animationInterval } from '../components/SortingTimeVisualizer';
import getMergeAnimations from '../algorithms/Merge';

// Render merge sort animations
export default async function animateMergeSort(stateArray) {
    const animations = getMergeAnimations(stateArray);
    const arr = document.getElementsByClassName('array');

    for (let i = 0; i < animations.length; i++) {
        if (!isRunning) return;
        // New merge iteration
        if (!animations[i]) {
            cardFlip.play();
        }
        // Swap two elements
        else if (animations[i].length === 3) {
            const [color, idx1, idx2] = animations[i];

            arr[idx2].style.backgroundColor = colors.yellow;
            await wait(animationInterval);

            const temp = arr[idx2].style.height;
            for (let i = idx2; i > idx1; i--) {
                arr[i].style.height = arr[i - 1].style.height;
            }
            arr[idx1].style.height = temp;
            arr[idx1].style.backgroundColor = colors.yellow;
            arr[idx2].style.backgroundColor = color;
            await wait(animationInterval);

            arr[idx1].style.backgroundColor = color;
            await wait(animationInterval);
        }
        // Color one element
        else {
            const [color, idx] = animations[i];
            arr[idx].style.backgroundColor = colors.yellow;
            await wait(animationInterval);

            arr[idx].style.backgroundColor = color;
            await wait(animationInterval);
        }
    }

    for (let i = 0; i < arr.length / 2; i++) {
        arr[i].style.backgroundColor = colors.green;
        arr[arr.length - i - 1].style.backgroundColor = colors.green;
        await wait(0.5 * animationInterval);
    }
}
