
const purple = "#8a2be2";
const red = "#dc143c";

// export function getAnimations(arr) {
//     const animations = []
//     for (let i = 0; i < arr.length; i+=3) {
//         animations.push([i, purple]);
//     }
//     for (let i = 0; i < arr.length; i+=5) {
//         animations.push([i, red]);
//     }
//     return animations;
// }

export function getSelectionSortAnims(arr) {
    let minIdx, temp;
    const animations = [];
    
    for (let i = 0; i < arr.length; i++) {
        minIdx = i;
        // arr[i] = purple
        animations.push([i, purple, "base"])
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
                // arr[j] = purple
                animations.push([j, purple])
            }
            else {
                // arr[j] = red
                animations.push([j, red])
            }
        }

        if (minIdx > i) {
            temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
            // swap heights a[i], a[minIdx]
            animations.push([i, minIdx]);
            animations.push([null]);
            animations.push([null]);
        }
    }

    return animations;
}

// function selectionSortAlgo(arr) {
//     let minIdx, temp;
    
//     for (let i = 0; i < arr.length; i++) {
//         minIdx = i;
//         for (let j = i + 1; j < arr.length; j++) {
//             if (arr[j] < arr[minIdx]) {
//                 minIdx = j;
//             }
//         }

//         if (minIdx > i) {
//             temp = arr[minIdx];
//             arr[minIdx] = arr[i];
//             arr[i] = temp;
//         }
//     }

//     return arr;
// }
