// Executes sorting algorithm and determines the sequence of animations
export default function getCountingAnimations(arr) {
    const animations = [];
    const max = Math.max(...arr);
    const min = Math.min(...arr);

    let i = min;
    let j = 0;
    let count = [];

    for (i; i <= max; i++) {
        count[i] = 0;
    }
    for (i = 0; i < arr.length; i++) {
        count[arr[i]]++;
        const hue = mapToHue(arr[i], min, max);
        animations.push([i, hue]);
    }

    for (i = min; i <= max; i++) {
        while (count[i] > 0) {
            arr[j] = i;
            const hue = mapToHue(i, min, max);
            animations.push([j, i, hue]);
            j++;
            count[i]--;
        }
    }
    
    return animations;
}

// Maps a value to the 0-270 range on the hue wheel
function mapToHue(value, min, max) {
    return 270 * (value - min) / (max - min);
}


// Original counting sort algorithm
// export function countingAlgo(arr) {
//     max = Math.max(...arr);
//     min = Math.min(...arr);
//     let i = min;
//     let j = 0;
//     let count = [];

//     for (i; i <= max; i++) {
//         count[i] = 0;
//     }
//     for (i = 0; i < arr.length; i++) {
//         count[arr[i]]++;
//     }

//     for (i = min; i <= max; i++) {
//         while (count[i] > 0) {
//             arr[j] = i;
//             j++;
//             count[i]--;
//         }
//     }

//     return arr;
// }
