import { cardFlip, wait, colors, isRunning, animationInterval } from '../components/SortingTimeVisualizer';
import getInsertionAnimations from '../algorithms/Insertion';

// Render insertion sort animations
export default async function animateInsertionSort(stateArray) {
    console.log('hi')
    const animations = getInsertionAnimations(stateArray);
    console.log('bye')
    const arr = document.getElementsByClassName('array');

    console.log(animations)

    // First bar will be purple (current min)
    arr[0].style.backgroundColor = colors.purple;
    await wait(animationInterval);
    
    for (let i = 0; i < animations.length; i++) {
        if (!isRunning) return;
        // Swap two elements
        if (typeof animations[i][1] === 'number') {
            const [idx1, idx2] = animations[i];
            
            arr[idx1].style.backgroundColor = colors.yellow;
            arr[idx2].style.backgroundColor = colors.red;
            await wait(animationInterval);

            [arr[idx1].style.height, arr[idx2].style.height] = [arr[idx2].style.height, arr[idx1].style.height];
            arr[idx1].innerHTML = arr[idx1].style.height.slice(0, -2);
            arr[idx2].innerHTML = arr[idx2].style.height.slice(0, -2);
            arr[idx1].style.backgroundColor = colors.red;
            arr[idx2].style.backgroundColor = colors.yellow;
            await wait(animationInterval);

            arr[idx2].style.backgroundColor = colors.purple;
            if (i === animations.length - 1 || typeof animations[i + 1][1] !== 'number') {
                cardFlip.play();
                await wait(animationInterval);
                arr[idx1].style.backgroundColor = colors.purple;
            }
        }
        // Color an element
        else {
            const [idx, color] = animations[i];
            arr[idx].style.backgroundColor = color;
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
