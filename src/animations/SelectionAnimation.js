import { cardFlip, wait, colors, isRunning, animationInterval } from '../components/SortingTimeVisualizer';
import { barFade } from '../components/SortingHelpers';
import getSelectionAnimations from '../algorithms/Selection';

// Render selection sort animations
export default async function animateSelectionSort(stateArray) {
    const animations = getSelectionAnimations(stateArray);
    const arr = document.getElementsByClassName('array');
    
    // First bar will be purple (current min)
    arr[0].style.backgroundColor = colors.purple;
    await wait(animationInterval);
    
    for (let i = 1; i < animations.length; i++) {
        if (!isRunning) return;
        // Swap two elements
        if (typeof animations[i][1] === 'number') {
            cardFlip.play();
            // Last element is still red
            arr[animations[i - 1][0]].style.backgroundColor = colors.green;
            const [idx1, idx2] = animations[i];

            arr[idx1].style.backgroundColor = colors.yellow;
            arr[idx2].style.backgroundColor = colors.yellow;
            await wait(animationInterval);

            [arr[idx1].style.height, arr[idx2].style.height] = [arr[idx2].style.height, arr[idx1].style.height];
            arr[idx1].innerHTML = arr[idx1].style.height.slice(0, -2);
            arr[idx2].innerHTML = arr[idx2].style.height.slice(0, -2);
            await wait(animationInterval);

            arr[idx1].style.backgroundColor = colors.purple;
            arr[idx2].style.backgroundColor = colors.green;
            await wait(animationInterval);
        }
        // Color a bar red/purple to indicate result of comparison
        else {
            const [idx, color, type] = animations[i];
            arr[idx].style.backgroundColor = color;
            arr[idx].type = type;

            if (animations[i - 1][1] === colors.red) {
                arr[animations[i - 1][0]].style.backgroundColor = colors.green;
            }
            // Reset the previous min to green
            if (color === colors.purple) {
                for (let j = idx - 1; j > 0; j--) {
                    if (arr[j].type !== 'sorted' && arr[j].style.backgroundColor === 'rgb(138, 43, 226)') { //purple
                        arr[j].style.backgroundColor = colors.green;
                    }
                }
            }
            await wait(animationInterval);
        }
    }
    
    arr[arr.length - 1].style.backgroundColor = colors.purple;
    // await barFade();
}
