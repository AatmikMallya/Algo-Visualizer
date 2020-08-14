import { cardFlip, wait, colors, isRunning, animationInterval } from '../components/SortingTimeVisualizer';
import getRadixAnimations from '../algorithms/Radix';

// Render heap sort animations
export default async function animateRadixSort(stateArray) {
    const animations = getRadixAnimations(stateArray);
    const arr = document.getElementsByClassName('array');

    for (let i = 0; i < animations.length; i++) {
        if (!isRunning) return;
        const [idx, height, hue] = animations[i];
        if (arr[idx].style.height !== height + 'px') {
            cardFlip.play();
            arr[idx].style.height = height + 'px';
        }
        arr[idx].style.backgroundColor = `hsl(${hue}, 100%, 45%)`;

        await wait(animationInterval + 10);
        if (idx === arr.length - 1 && i !== animations.length - 1) {
            await wait(300);
            for (let j = 0; j < arr.length; j++) {
                arr[j].style.backgroundColor = colors.green;
            }
            await wait(100);
        }
    }
    
    await wait(500);
    for (let i = 0; i < arr.length / 2; i++) {
        arr[i].style.backgroundColor = colors.green;
        arr[arr.length - i - 1].style.backgroundColor = colors.green;
        await wait(1000 / arr.length);
    }
}
