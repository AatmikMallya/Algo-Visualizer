import { colors, wait, isReset } from './SortingTimeVisualizer';
export {default as selection} from '../animations/SelectionAnimation';
export {default as insertion} from '../animations/InsertionAnimation';
export {default as merge} from '../animations/MergeAnimation';
export {default as quick} from '../animations/QuickAnimation';
export {default as heap} from '../animations/HeapAnimation';
export {default as shell} from '../animations/ShellAnimation';
export {default as counting} from '../animations/CountingAnimation';
export {default as radix} from '../animations/RadixAnimation';
export {default as bucket} from '../animations/BucketAnimation';
export {default as bubble} from '../animations/BubbleAnimation';
export {default as comb} from '../animations/CombAnimation';

//* Helpers *//
// For testing purposes
export const arrayEquality = (a, b) => {
	if (a.length !== b.length) {
        return false;
    }
	for (let i = 0; i < a.length; i++) {
		if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}

// Generates many large arrays, logs 'true' for each correct sort
export const testSort = mySort => {
    const startTime = new Date();
    for (let i = 0; i < 100; i++) {
        let testArr = [];
        const length = Math.floor(Math.random()*1001 + 5);
        for (let j = 0; j < length; j++) {
            testArr.push(Math.floor(Math.random()*501));
        }
        const testArr2 = [...testArr];

        testArr = mySort(testArr);  
        testArr2.sort((a, b) => a - b);
        console.log(arrayEquality(testArr, testArr2));
    }
    const elapsedTime = new Date() - startTime;
    console.log('Elapsed time: ', elapsedTime, ' ms');
}

// For menu color fading - based on average case
export const menuColors = {
    purple: 270,   // Initial
    red: 5,        // O(n^2)
    redOrange: 18, // In between
    orange: 28,    // O(nlogn)
    yellow: 45,    // O(n) possibly
};

export const algoColors = {
    selection: menuColors.red,
    insertion: menuColors.red,
    merge: menuColors.orange,
    quick: menuColors.orange,
    heap: menuColors.orange,
    shell: menuColors.redOrange,
    counting: menuColors.yellow,
    radix: menuColors.yellow,
    bucket: menuColors.yellow,
    bubble: menuColors.red,
    comb: menuColors.redOrange
};

// Linear interpolation
export const lerp = (a,b,u) => {
    return (1-u) * a + u * b;
}

// Transition color theme
export const themeFade = async (start, end) => {
    const duration = 1500;
    const interval = 10;
    const step_u = interval / duration;
    const menu = document.getElementById('menu-container').style;
    const icon = document.querySelector('.info-icon').style;
    const infoButton = document.getElementById('info-button').style;
    for (let u = 0.0; u < 1.0; u += step_u) {
        const hue = lerp(start, end, u);
        menu.setProperty('background-color', `hsl(${hue}, 95%, 35%)`);
        menu.setProperty('box-shadow', `-1.5px 1.5px 2.5px hsl(${hue}, 95%, 15%)`);
        icon.setProperty('color',`hsl(${hue}, 95%, 20%)`)
        infoButton.setProperty('border-color', `hsl(${hue}, 95%, 25%)`);
        infoButton.setProperty('background-color', `hsla(${hue}, 95%, 30%, 0.1)`);
        await wait(interval);
    }
};

// Change array color to green
export const getMenuHue = () => {
    const menu = document.getElementById('menu-container');
    const color = menu.style.backgroundColor.match(/\d+/g)?.map(Number);
    if (!color) return menuColors.purple;
    const [r, g, b] = [color[0]/255, color[1]/255, color[2]/255];
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let hue = 0;
    if (max !== min) {
        const d = max - min;
        switch (max) {
            case r: hue = (g - b) / d + (g < b ? 6 : 0); break;
            case g: hue = (b - r) / d + 2; break;
            case b: hue = (r - g) / d + 4; break;
            default: break;
        }
    }
    return hue * 60;
};

export const barFade = async () => {
    await wait(500);
    if (isReset) return;
    const arr = document.getElementsByClassName('array');
    const duration = 1000;
    const interval = 10;
    const start = hexToRgb(colors.purple);
    const end = hexToRgb(colors.green);
    const step_u = interval / duration;

    for (let u = 0.0; u < 1.0; u += step_u) {
        if (isReset) return;
        const r = lerp(start.r, end.r, u);
        const g = lerp(start.g, end.g, u);
        const b = lerp(start.b, end.b, u);
        for (let i = 0; i < arr.length; i++) {
            arr[i].style.setProperty('background-color', `rgb(${r},${g},${b})`);
        }
        await wait(interval);
    }
};

export function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
