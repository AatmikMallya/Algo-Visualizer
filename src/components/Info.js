// Contains all text displayed in the info box
// Rendered in InfoBox.js
const sq = `<sup style='vertical-align: top; font-size: 0.6em;'>2</sup>`;
const t = `&nbsp;&nbsp;&nbsp;&nbsp;`;
const info = {
    selection: {
        header: `Selection Sort`,
        best: `n${sq}`,
        avg: `n${sq}`,
        worst: `n${sq}`,
        space: `1`,
        algo: `
        function selectionSort(arr) {<br/>
        ${t}for (let i = 0; i < arr.length; i++) {<br/>
        ${t}${t}let minIdx = i;<br/>
        ${t}${t}for (let j = i+1; j < arr.length; j++) {<br/>
        ${t}${t}${t}if (arr[j] < arr[minIdx]) {<br/>
        ${t}${t}${t}${t}minIdx = j;<br/>
        ${t}${t}${t}}<br/>
        ${t}${t}}<br/>
        ${t}${t}if (minIdx > i) {<br/>
        ${t}${t}${t}[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];<br/>
        ${t}${t}}<br/>
        ${t}}<br/>
        ${t}return arr;<br/>
        }`
    },
    insertion: {
        header: `Insertion Sort`,
        best: `n`,
        avg: `n${sq}`,
        worst: `n${sq}`,
        space: `1`,
        algo: `
        function insertionSort(arr) {<br/>
        ${t}for (let i = 1; i < arr.length; i++) {<br/>
        ${t}${t}let j = i-1;<br/>
        ${t}${t}const temp = arr[i];<br/>
        ${t}${t}while (j >= 0 && arr[j] > temp) {<br/>
        ${t}${t}${t}arr[j+1] = arr[j];<br/>
        ${t}${t}${t}j--;<br/>
        ${t}${t}}<br/>
        ${t}${t}arr[j+1] = temp;<br/>
        ${t}}<br/>
        ${t}return arr;<br/>
        }`
    },
    merge: {
        header: `Merge Sort`,
        best: `n log(n)`,
        avg: `n log(n)`,
        worst: `n log(n)`,
        space: `n`,
        algo: `
        function mergeSort(arr) {<br/>
        ${t}if (arr.length < 2) return arr;<br/><br/>
        ${t}var mid = Math.floor(arr.length / 2);<br/>
        ${t}var left = mergeSort(arr.slice(0, mid));<br/>
        ${t}var right = mergeSort(arr.slice(mid));<br/><br/>
        ${t}return merge(left, right);<br/>
        }<br/>
        <br/>
        function merge(a, b) {<br/>
        ${t}var result = [];<br/><br/>
        ${t}while (a.length > 0 && b.length > 0) {<br/>
        ${t}${t}result.push(a[0] < b[0] ? a.shift() : b.shift());<br/>
        ${t}}<br/><br/>
        ${t}return result.concat(a.length? a : b);<br/>
        }`
    },
    quick: {
        header: `Quicksort`,
        best: `n log(n)`,
        avg: `n log(n)`,
        worst: `n${sq}`,
        space: `log(n)`,
        algo: `
        function quicksort(arr, left, right) {<br/>
        ${t}let index;<br/>
        ${t}if (arr.length > 1) {<br/>
        ${t}${t}index = partition(arr, left, right);<br/>
        ${t}${t}if (left < index-1) {<br/>
        ${t}${t}${t}quickAlgo(arr, left, index-1);<br/>
        ${t}${t}}<br/>
        ${t}${t}if (index < right) {<br/>
        ${t}${t}${t}quickAlgo(arr, index, right);<br/>
        ${t}${t}}<br/>
        ${t}}<br/>
        ${t}return arr;<br/>
        }<br/>
        <br/>
        function partition(arr, left, right) {<br/>
        ${t}const pivot = arr[Math.floor((right+left) / 2)];<br/>
        <br/>
        ${t}let i = left;<br/>
        ${t}let j = right;<br/>
        <br/>
        ${t}while (i < j+1) {<br/>
        ${t}${t}while (arr[i] < pivot) {<br/>
        ${t}${t}${t}i++;<br/>
        ${t}${t}}<br/>
        ${t}${t}while (arr[j] > pivot) {<br/>
        ${t}${t}${t}j--;<br/>
        ${t}${t}}<br/>
        ${t}${t}if (i < j+1) {<br/>
        ${t}${t}${t}[arr[i], arr[j]] = [arr[j], arr[i]];<br/>
        ${t}${t}${t}i++;<br/>
        ${t}${t}${t}j--;<br/>
        ${t}${t}}<br/>
        ${t}}<br/>
        ${t}return i;<br/>
        }`
    },
    bubble: {
        header: `Bubble Sort`,
        best: `n`,
        avg: `n${sq}`,
        worst: `n${sq}`,
        space: `1`,
        algo: `
        function bubbleSort(arr) {<br/>
        ${t}for (let i = 0; i < arr.length; i++) {<br/>
        ${t}${t}for (let j = 0; j < arr.length; j++) {<br/>
        ${t}${t}${t}if (arr[j] > arr[j+1]) {<br/>
        ${t}${t}${t}${t}[arr[j], arr[j+1]] = [arr[j+1], arr[j]];<br/>
        ${t}${t}${t}}<br/>
        ${t}${t}}<br/>
        ${t}}<br/>
        ${t}return arr;<br/>
        }`
    },
    heap: {
        header: `Heapsort`,
        best: `n log(n)`,
        avg: `n log(n)`,
        worst: `n log(n)`,
        space: `1`,
        algo: `
        function heapsort(arr) {<br/>
        ${t}const len = arr.length;<br/>
        ${t}let i  = Math.floor(len/2 - 1);<br/>
        ${t}let j = len - 1;<br/>
        <br/>
        ${t}while (i >= 0) {<br/>
        ${t}${t}heapify(arr, len, i);<br/>
        ${t}${t}i--;<br/>
        ${t}}<br/>
        <br/>
        ${t}while (j >= 0) {<br/>
        ${t}${t}[arr[0], arr[j]] = [arr[j], arr[0]];<br/>
        ${t}${t}heapify(arr, j, 0);<br/>
        ${t}${t}j--;<br/>
        ${t}}<br/>
        <br/>
        ${t}return arr;<br/>
        }<br/>
        <br/>
        function heapify(arr, len, i) {<br/>
        ${t}let largest = i;<br/>
        ${t}const left = i*2 + 1;<br/>
        ${t}const right = left + 1;<br/>
        <br/>
        ${t}if (left < len && arr[left] > arr[largest]) {<br/>
        ${t}${t}largest = left;<br/>
        ${t}}<br/>
        ${t}if (right < len && arr[right] > arr[largest]) {<br/>
        ${t}${t}largest = right;<br/>
        ${t}}<br/>
        <br/>
        ${t}if (largest !== i) {<br/>
        ${t}${t}[arr[i], arr[largest]] = [arr[largest], arr[i]];<br/>
        ${t}${t}heapify(arr, len, largest);<br/>
        ${t}}<br/>
        }`
    },
    counting: {
        header: `Counting Sort`,
        best: `n+k`,
        avg: `n+k`,
        worst: `n+k`,
        space: `k`,
        algo: `
        function countingSort(arr) {<br/>
        ${t}max = Math.max(...arr);<br/>
        ${t}min = Math.min(...arr);<br/>
        ${t}let i = min;<br/>
        ${t}let j = 0;<br/>
        ${t}let count = [];<br/>
        <br/>
        ${t}for (i; i < max + 1; i++) {<br/>
        ${t}${t}count[i] = 0;<br/>
        ${t}}<br/>
        ${t}for (i = 0; i < arr.length; i++) {<br/>
        ${t}${t}count[arr[i]]++;<br/>
        ${t}}<br/>
        <br/>
        ${t}for (i = min; i < max + 1; i++) {<br/>
        ${t}${t}while (count[i] > 0) {<br/>
        ${t}${t}${t}arr[j] = i;<br/>
        ${t}${t}${t}j++;<br/>
        ${t}${t}${t}count[i]--;<br/>
        ${t}${t}}<br/>
        ${t}}<br/>
        <br/>
        ${t}return arr;<br/>
        }`
    },
    shell: {
        header: `Shell Sort`,
        best: `n log(n)`,
        avg: `n log(n)${sq}`,
        worst: `n log(n)${sq}`,
        space: `1`,
        algo: `
        function shellSort(arr) {<br/>
        ${t}const len = arr.length;<br/>
        ${t}let gap = Math.floor(len / 2);<br/>
        ${t}while (gap > 0) {<br/>
        ${t}${t}for (let i = gap; i < len; i++) {<br/>
        ${t}${t}${t}const temp = arr[i];<br/>
        ${t}${t}${t}let j = i;<br/>
        ${t}${t}${t}while (j >= gap && arr[j-gap] > temp) {<br/>
        ${t}${t}${t}${t}arr[j] = arr[j-gap];<br/>
        ${t}${t}${t}${t}j -= gap;<br/>
        ${t}${t}${t}}<br/>
        ${t}${t}${t}arr[j] = temp;<br/>
        ${t}${t}}<br/>
        ${t}${t}gap = Math.floor(gap / 2);<br/>
        ${t}}<br/>
        ${t}return arr;<br/>
        }`
    }
};
export default info;
