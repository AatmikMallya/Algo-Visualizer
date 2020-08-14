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

    arr.length = [];
    buckets.forEach(bucket => {
        insertionAlgo(bucket);
        bucket.forEach(element => arr.push(element));
    });

    return animations;
}



// Original bucket sort algorithm
export function bucketAlgo(arr) {
    const size = arr.length - 1;
    let min = Math.min(...arr);
    let max = Math.max(...arr);

    const len = Math.floor((max - min) / size) + 1;
    const buckets = [...new Array(len)].map(() => []);

    for (let i = 0; i < arr.length; i++) {
        buckets[Math.floor((arr[i] - min) / size)].push(arr[i]);
    }

    arr.length = [];
    buckets.forEach(bucket => {
        insertionAlgo(bucket);
        bucket.forEach(element => arr.push(element));
    });

    return arr;
}
