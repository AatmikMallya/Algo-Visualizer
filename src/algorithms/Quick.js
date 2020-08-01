export default function getQuickAnimations(arr, left, right, animations) {
    let index;
    if (arr.length > 1) {
        index = partitionAnimate(arr, left, right, animations);
        if (left < index - 1) {
            getQuickAnimations(arr, left, index - 1, animations);
        }
        if (index < right) {
            getQuickAnimations(arr, index, right, animations);
        }
    }
    return animations;
}

function partitionAnimate(arr, left, right, animations) {
    const pivotIdx = Math.floor((right + left) / 2)
    const pivot = arr[pivotIdx];
    animations.push([pivotIdx])
    
    let i = left;
    let j = right;

    while (i <= j) {
        while (arr[i] < pivot) {
            i++;
        }
        while (arr[j] > pivot) {
            j--;
        }
        if (i <= j) {
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            animations.push([i, j])
            i++;
            j--;
        }
    }
    return i;
}


// export function quickAlgo(arr, left, right) {
//     let index;
//     if (arr.length > 1) {
//         index = partition(arr, left, right);
//         if (left < index - 1) { // more elements on the left side of the pivot
//             quickAlgo(arr, left, index - 1);
//         }
//         if (index < right) { // more elements on the right side of the pivot
//             quickAlgo(arr, index, right);
//         }
//     }
//     return arr;
// }

// function partition(arr, left, right) {
//     const pivot = arr[Math.floor((right + left) / 2)];
    
//     let i = left;
//     let j = right;

//     while (i <= j) {
//         while (arr[i] < pivot) {
//             i++;
//         }
//         while (arr[j] > pivot) {
//             j--;
//         }
//         if (i <= j) {
//             const temp = arr[i];
//             arr[i] = arr[j];
//             arr[j] = temp;
//             i++;
//             j--;
//         }
//     }
//     return i;
// }
