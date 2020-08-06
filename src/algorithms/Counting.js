let min, max;

// Executes sorting algorithm and determines the sequence of animations
export default function getCountingAnimations(arr) {
    const animations = [];
    max = Math.max(...arr);
    min = Math.min(...arr);
    let i = min;
    let j = 0;
    let count = [];

    for (i; i <= max; i++) {
        count[i] = 0;
    }
    for (i = 0; i < arr.length; i++) {
        count[arr[i]]++;
        const hue = mapToHue(arr[i]);
        animations.push([i, hue]);
    }

    for (i = min; i <= max; i++) {
        while (count[i] > 0) {
            arr[j] = i;
            const hue = mapToHue(i);
            animations.push([j, i, hue]);
            j++;
            count[i]--;
        }
    }
    
    return animations;
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

// Maps a value to the 0-240 range on the hue wheel based on value range
function mapToHue(value) {
    // a1,a2 --> min,max
    // b1,b2 --> 0, 240
    return 240 * (value - min) / (max - min);
}
