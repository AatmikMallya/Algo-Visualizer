import { cardFlip, cardFlip2, wait, colors, isRunning, animationInterval } from '../components/SortingTimeVisualizer';
import { barFade } from '../components/SortingHelpers';
import getHeapAnimations from '../algorithms/Heap';

// Render heap sort animations
export default async function animateHeapSort(stateArray) {
    const animations = getHeapAnimations(stateArray);
    const arr = document.getElementsByClassName('array');

    let playCount = 0;
    for (let i = 0; i < animations.length; i++) {
        if (!isRunning) return;
        // Only procedure is swapping
        const [idx1, idx2, isGreen] = animations[i];
        arr[idx1].style.backgroundColor = colors.yellow;
        arr[idx2].style.backgroundColor = colors.yellow;
        await wait(animationInterval);

        [arr[idx1].style.height, arr[idx2].style.height] = [arr[idx2].style.height, arr[idx1].style.height];
        arr[idx1].innerHTML = arr[idx1].style.height.slice(0, -2);
        arr[idx2].innerHTML = arr[idx2].style.height.slice(0, -2);
        await wait(animationInterval);
        
        arr[idx1].style.backgroundColor = colors.green;
        if (isGreen) {
            if (++playCount === 2) {
                playCount = 0;
                cardFlip.play();
            }
            arr[idx2].style.backgroundColor = colors.green;
        }
        else {
            playCount = 4;
            cardFlip2.play();
            arr[idx2].style.backgroundColor = colors.purple;
        }
        await wait(animationInterval);
    }
    await barFade();
}