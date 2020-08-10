import { cardFlip, wait, colors, isRunning, animationInterval } from '../components/SortingTimeVisualizer';
import getShellAnimations from '../algorithms/Shell';

// Render shell sort animations
export default async function animateShellSort(stateArray) {
    const animations = getShellAnimations(stateArray);
    const arr = document.getElementsByClassName('array');

    for (let i = 0; i < animations.length; i++) {
        if (!isRunning) break;
        // Swap two elements
        if (animations[i].length > 1) {
            cardFlip.play();
            const [idx1, idx2] = animations[i];
            arr[idx1].style.backgroundColor = colors.yellow;
            arr[idx2].style.backgroundColor = colors.yellow;
            await wait(animationInterval);

            [arr[idx1].style.height, arr[idx2].style.height] = [arr[idx2].style.height, arr[idx1].style.height];
            await wait(animationInterval);
            
            const value1 = parseInt(arr[idx1].style.height.slice(0, -2));
            const value2 = parseInt(arr[idx2].style.height.slice(0, -2));
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

    await wait(500);    
    for (let i = 0; i < arr.length / 2; i++) {
        arr[i].style.backgroundColor = colors.green;
        arr[arr.length - i - 1].style.backgroundColor = colors.green;
        await wait(1000 / arr.length);
    }
}

