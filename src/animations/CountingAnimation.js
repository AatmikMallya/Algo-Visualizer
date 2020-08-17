import { cardFlip, wait, colors, isRunning, animationInterval } from '../components/SortingTimeVisualizer';
import { barFade } from '../components/SortingHelpers';
import getCountingAnimations from '../algorithms/Counting';

// Render heap sort animations
export default async function animateCountingSort(stateArray) {
    const animations = getCountingAnimations(stateArray);
    const arr = document.getElementsByClassName('array');

    
    // Color array elements according to their value
    let i = 0;
    for (i; i < animations.length / 2; i++) {
        if (!isRunning) return;

        const [idx, hue] = animations[i];
        arr[idx].style.backgroundColor = `hsl(${hue}, 100%, 45%)`;
        await wait(animationInterval + 10);
    }
    await wait(500);

    // Sorting step
    for (i; i < animations.length; i++) {
        if (!isRunning) return;
        const [idx, height, hue] = animations[i];
        if (arr[idx].style.height !== height + 'px') {
            cardFlip.play();
            arr[idx].style.height = height + 'px';
            arr[idx].innerHTML = arr[idx].style.height.slice(0, -2);
        }
        arr[idx].style.backgroundColor = `hsl(${hue}, 100%, 45%)`;

        await wait(animationInterval + 10);
    }
    if (!isRunning) return;
    await wait(500);
    for (let i = 0; i < arr.length; i++) {
        if (!isRunning) return;
        arr[i].style.backgroundColor = colors.purple;
        await wait(500 / arr.length);
    }
    if (!isRunning) return;
    await barFade();
}
