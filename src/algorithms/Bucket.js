import { insertionAlgo } from './Insertion';
// Executes sorting algorithm and determines the sequence of animations
export default function getBucketAnimations(arr) {
    const animations = [];

    const size = arr.length - 1;
    let min = Math.min(...arr);
    let max = Math.max(...arr);

    const len = Math.floor((max - min) / size) + 1;
    const buckets = [...new Array(len)].map(() => []);

    for (let i = 0; i < arr.length; i++) {
        buckets[Math.floor((arr[i] - min) / size)].push(arr[i]);
    }

    const tempArr = buckets.flat();
    for (let i = 0; i < tempArr.length; i++) {
        const value = Math.floor(i * 10 / arr.length);
        const hue = valueToHue[value];
        animations.push([i, tempArr[i], hue]);
    }

    arr.length = [];
    buckets.forEach(bucket => {
        insertionAlgo(bucket);
        bucket.forEach(element => arr.push(element));
    });

    return animations;
}

// Maps a value to the 0-270 range on the hue wheel
const valueToHue = {
    0: 0, 
    1: 30, 
    2: 60, 
    3: 90, 
    4: 120, 
    5: 150, 
    6: 180, 
    7: 210, 
    8: 240, 
    9: 270
}



// Original bucket sort algorithm
export function bucketAlgo(arr) {
    const size = 10;
    let min = Math.min(...arr);
    let max = Math.max(...arr);

    const len = Math.floor((max - min) / size) + 1;
    const buckets = [...new Array(len)].map(() => []);

    for (let i = 0; i < arr.length; i++) {
        const bucket = Math.floor((arr[i] - min) / size);
        buckets[bucket].push(arr[i]);
    }

    arr.length = [];
    buckets.forEach(bucket => {
        insertionAlgo(bucket);
        bucket.forEach(element => arr.push(element));
    });

    return arr;
}
