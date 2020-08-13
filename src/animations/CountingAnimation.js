import { cardFlip, wait, colors, isRunning, animationInterval } from '../components/SortingTimeVisualizer';
import getCountingAnimations from '../algorithms/Counting';

// Render heap sort animations
export default async function animateCountingSort(stateArray) {
    const animations = getCountingAnimations(stateArray);
    const arr = document.getElementsByClassName('array');

    
    // Color array elements according to their value
    let i = 0;
    for (i; i < animations.length / 2; i++) {
        if (!isRunning) break;

        const [idx, hue] = animations[i];
        arr[idx].style.backgroundColor = `hsl(${hue}, 100%, 45%)`;
        await wait(animationInterval + 10);
    }
    await wait(500);

    // Sorting step
    for (i; i < animations.length; i++) {
        if (!isRunning) break;
        const [idx, height, hue] = animations[i];
        if (arr[idx].style.height !== height + 'px') {
            cardFlip.play();
            arr[idx].style.height = height + 'px';
        }
        arr[idx].style.backgroundColor = `hsl(${hue}, 100%, 45%)`;

        await wait(animationInterval + 10);
    }
    await wait(500);
    for (let i = 0; i < arr.length / 2; i++) {
        arr[i].style.backgroundColor = colors.green;
        arr[arr.length - i - 1].style.backgroundColor = colors.green;
        await wait(1000 / arr.length);
    }
}