// Contains all text displayed in the info box
// const sq = `${'2'.sup()}`;
const sq = `<sup style='vertical-align: top; font-size: 0.6em;'>2</sup>`;
const info = {
    selection: {
        header: `Selection Sort`,
        best: `n${sq}`,
        avg: `n${sq}`,
        worst: `n${sq}`,
        space: `1`,
        body: ``    
    },
    insertion: {
        header: `Insertion Sort`,
        best: `n`,
        avg: `n${sq}`,
        worst: `n${sq}`,
        space: `1`,
        body: ``
    },
    merge: {
        header: `Merge Sort`,
        best: `n log(n)`,
        avg: `n log(n)`,
        worst: `n log(n)`,
        space: `n`,
        body: ``
    },
    quick: {
        header: `Quicksort`,
        best: `n log(n)`,
        avg: `n log(n)`,
        worst: `n${sq}`,
        space: `log(n)`,
        body: ``
    },
    bubble: {
        header: `Bubble Sort`,
        best: `n`,
        avg: `n${sq}`,
        worst: `n${sq}`,
        space: `1`,
        body: ``
    },
    heap: {
        header: `Heapsort`,
        best: `n log(n)`,
        avg: `n log(n)`,
        worst: `n log(n)`,
        space: `1`,
        body: ``
    },
    counting: {
        header: `Counting Sort`,
        best: `n+k`,
        avg: `n+k`,
        worst: `n+k`,
        space: `k`,
        body: ``
    },
    shell: {
        header: `Shell Sort`,
        best: `n log(n)`,
        avg: `n log(n)${sq}`,
        worst: `n log(n)${sq}`,
        space: `1`,
        body: ``
    }
};
export default info;
