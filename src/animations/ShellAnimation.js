import { cardFlip, wait, colors, isRunning, animationInterval } from '../components/SortingTimeVisualizer';
import { barFade } from '../components/SortingHelpers';
import getShellAnimations from '../algorithms/Shell';

// Render shell sort animations
export default async function animateShellSort(stateArray) {
    const animations = getShellAnimations(stateArray);
    const arr = document.getElementsByClassName('array');

    for (let i = 0; i < animations.length; i++) {
        if (!isRunning) return;
        // New iteration
        if (animations[i] === null) {
            cardFlip.play();
        }
        // Swap two elements
        else if (animations[i].length > 1) {
            // cardFlip.play();
            const [idx1, idx2] = animations[i];
            arr[idx1].style.backgroundColor = colors.yellow;
            arr[idx2].style.backgroundColor = colors.yellow;
            await wait(animationInterval);

            [arr[idx1].style.height, arr[idx2].style.height] = [arr[idx2].style.height, arr[idx1].style.height];
            arr[idx1].innerHTML = arr[idx1].style.height.slice(0, -2);
            arr[idx2].innerHTML = arr[idx2].style.height.slice(0, -2);
            await wait(animationInterval);
            
            const value1 = parseInt(arr[idx1].innerHTML);
            const value2 = parseInt(arr[idx2].innerHTML);
            arr[idx1].style.backgroundColor = value1 === stateArray[idx1] ? colors.purple : colors.green;
            arr[idx2].style.backgroundColor = value2 === stateArray[idx2] ? colors.purple : colors.green;
            await wait(animationInterval);
        }
        // Color an element
        else {
            const [idx] = animations[i];
            const oldColor = arr[idx].style.backgroundColor;
            arr[idx].style.backgroundColor = colors.yellow;
            await wait(animationInterval);
            arr[idx].style.backgroundColor = oldColor;
            await wait(animationInterval);
        }
    }
    await barFade();
}
