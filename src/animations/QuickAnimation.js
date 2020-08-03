import { cardFlip, wait, colors, isRunning, animationInterval } from '../components/SortingTimeVisualizer';
import getQuickAnimations from '../algorithms/Quick';

export default async function animateQuickSort(stateArray) {
    const animations = getQuickAnimations(stateArray, 0, stateArray.length - 1, []);
    const arr = document.getElementsByClassName('array');
    stateArray.sort((a, b) => a - b);

    for (let i = 0; i < animations.length; i++) {
        if (!isRunning) return;

        if (animations[i].length === 1) {
            cardFlip.play();
            const [idx] = animations[i];

            arr[idx].style.backgroundColor = colors.red;
            await wait(animationInterval + 10);
        }
        else {
            const [idx1, idx2] = animations[i];

            arr[idx1].style.backgroundColor = colors.yellow;
            arr[idx2].style.backgroundColor = colors.yellow;
            await wait(animationInterval + 10);

            const temp = arr[idx1].style.height;
            arr[idx1].style.height = arr[idx2].style.height;
            arr[idx2].style.height = temp;
            await wait(animationInterval + 10);

            const value1 = parseInt(arr[idx1].style.height.slice(0, -2));
            const value2 = parseInt(arr[idx2].style.height.slice(0, -2));
            arr[idx1].style.backgroundColor = value1 === stateArray[idx1] ? colors.purple : colors.blue;
            arr[idx2].style.backgroundColor = value2 === stateArray[idx2] ? colors.purple : colors.blue;
            await wait(animationInterval + 10);
        }
    }
    
    for (let i = 0; i < arr.length / 2; i++) {
        arr[i].style.backgroundColor = colors.green;
        arr[arr.length - i - 1].style.backgroundColor = colors.green;
        await wait(0.5 * (animationInterval + 10));
    }
}
