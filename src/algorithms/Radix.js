// Executes sorting algorithm and determines the sequence of animations
export default function getRadixAnimations(arr) {
    const animations = [];

    const digits = Math.max(...arr).toString().length;
	for (let i = 0; i < digits; i++) {
        const buckets = Array.from({ length: 10 }, () => []);
		for (let j = 0; j < arr.length; j++) {
            buckets[getDigit(arr[j], i)].push(arr[j]);
        }
        arr = buckets.flat();
        for (let k = 0; k < arr.length; k++) {
            const hue = valueToHue[getDigit(arr[k], i)];
            animations.push([k, arr[k], hue]);
        }
	}

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


// Original radix sort algorithm
export function radixAlgo(arr) {
    const digits = Math.max(...arr).toString().length;
	for (let i = 0; i < digits; i++) {
        const buckets = Array.from({ length: 10 }, () => []);
		for (let j = 0; j < arr.length; j++) {
            buckets[getDigit(arr[j], i)].push(arr[j]);
            
        }
        arr = buckets.flat()
	}
    return arr;
}

function getDigit(num, place) {
    return Math.floor(num / Math.pow(10, place)) % 10;
}
