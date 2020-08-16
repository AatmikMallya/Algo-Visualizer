import { cardFlip, wait, colors, isRunning, animationInterval } from '../components/SortingTimeVisualizer';
import getCombAnimations from '../algorithms/Comb';

// Render comb sort animations - very similar to bubble sort
export default async function animateCombSort(stateArray) {
    const animations = getCombAnimations(stateArray);
    const arr = document.getElementsByClassName('array');

    for (let i = 0; i < animations.length; i++) {
        if (!isRunning) break;
        // New iteration
        if (animations[i] === null) {
            cardFlip.play();
        }
        // Swapping two elements
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
        }   
        await wait(animationInterval + 10);
    }
    
    await wait(500);
    for (let i = 0; i < arr.length / 2; i++) {
        arr[i].style.backgroundColor = colors.green;
        arr[arr.length - i - 1].style.backgroundColor = colors.green;
        await wait(1000 / arr.length);
    }
}
