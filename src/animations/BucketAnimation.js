import { cardFlip, wait, colors, isRunning, animationInterval } from '../components/SortingTimeVisualizer';
import getBucketAnimations from '../algorithms/Bucket';
import animateInsertionSort from '../animations/InsertionAnimation';

// Render heap sort animations
export default async function animateBucketSort(stateArray) {
    const animations = getBucketAnimations(stateArray);
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
    }

    const newArr = []
    for (let i = 0; i < arr.length; i++) {
        newArr.push(parseInt(arr[i].style.height.slice(0, -2)));
    }
    await animateInsertionSort(newArr);
    
    await wait(500);
    for (let i = 0; i < arr.length / 2; i++) {
        arr[i].style.backgroundColor = colors.green;
        arr[arr.length - i - 1].style.backgroundColor = colors.green;
        await wait(1000 / arr.length);
    }
}
