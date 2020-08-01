import { cardFlip, wait, colors, isRunning, animationInterval } from '../components/SortingTimeVisualizer';
import getSelectionAnimations from '../algorithms/Selection';

export default async function animateSelectionSort(stateArray) {
    const animations = getSelectionAnimations(stateArray);
    const arr = document.getElementsByClassName('array');
    
    // first bar will be purple (current min)
    arr[0].style.backgroundColor = colors.purple;
    await wait(animationInterval);
    
    for (let i = 1; i < animations.length; i++) {
        if (!isRunning) return;
        // swapping animations[i][0] and animations[i][1]
        if (typeof animations[i][1] === 'number') {
            cardFlip.play();
            // the last arraybar is currently colors.red, change it back
            arr[animations[i - 1][0]].style.backgroundColor = colors.green;
            const [idx1, idx2] = animations[i];

            arr[idx1].style.backgroundColor = colors.yellow;
            arr[idx2].style.backgroundColor = colors.yellow;
            await wait(animationInterval);

            const temp = arr[idx1].style.height;
            arr[idx1].style.height = arr[idx2].style.height;
            arr[idx2].style.height = temp;
            await wait(animationInterval);

            arr[idx1].style.backgroundColor = colors.purple;
            arr[idx2].style.backgroundColor = colors.green;
            await wait(animationInterval);
        }
        // coloring a bar red or purple to indicate comparison
        else {
            const [idx, color, type] = animations[i];
            arr[idx].style.backgroundColor = color;
            arr[idx].type = type;

            if (animations[i - 1][1] === colors.red) {
                arr[animations[i - 1][0]].style.backgroundColor = colors.green;
            }
            // if is the new min, reset the last min
            if (color === colors.purple) {
                for (let j = idx - 1; j > 0; j--) {
                    if (arr[j].type === 'sorted') {
                        break;
                    }
                    if (arr[j].style.backgroundColor === 'rgb(138, 43, 226)') { //purple
                        arr[j].style.backgroundColor = colors.green;
                        break;
                    }
                }
            }
            await wait(animationInterval);
        }
    }
    
    arr[arr.length - 1].style.backgroundColor = colors.purple;
    await wait(animationInterval);

    for (let i = 0; i < arr.length / 2; i++) {
        arr[i].style.backgroundColor = colors.green;
        arr[i].type = undefined;
        arr[arr.length - i - 1].style.backgroundColor = colors.green;
        arr[arr.length - i - 1].type = undefined;
        await wait(0.5 * animationInterval);
    }
}
