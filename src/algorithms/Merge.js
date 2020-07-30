const purple = '#8a2be2';

const gradients = {
  3: { 1: '#00747f', 2: '#0073e7', 4: purple },
  4: { 1: '#007264', 2: '#0076b8', 4: '#006cf5', 8: purple },
  5: { 1: '#007056', 2: '#007596', 4: '#0075d7', 8: '#0066f9', 16: purple },
  6: { 1: '#006f4d', 2: '#00747f', 4: '#0076b8', 8: '#0073e7', 16: '#0061fa', 32: purple },
  7: { 1: '#006e47', 2: '#00736f', 4: '#0076a0', 8: '#0076cf', 16: '#0070f0', 32: '#005df9', 64: purple }
};

export function getMergeAnimations(a) {
  const animations = [], b = [];
  const level = Math.ceil(Math.log2(a.length))

  for (let width = 1; width < a.length; width *= 2) {
    const color = gradients[level][width];
    
    for (let i = 0; i < a.length; i += 2 * width) {
      mergeAnimate(a, i, Math.min(i + width, a.length), Math.min(i + 2*width, a.length), b, animations, color);
    }
    for (let i = 0; i < a.length; i++) {
      a[i] = b[i];
    }
  }
  return animations
}

function mergeAnimate(a, left, right, end, b, animations, color) {
  let i = left, j = right;
  for (let k = left; k < end; k++) {
    if (i < right && (j >= end || a[i] <= a[j])) {
      animations.push([color, i]);
      b[k] = a[i++];
    }
    else {
      animations.push([color, k, j]);
      b[k] = a[j++];
    }
  }
}



export function mergeAlgo(a) {
  const b = [];

  for (let width = 1; width < a.length; width *= 2) {
    for (let i = 0; i < a.length; i += 2 * width) {
      merge(a, i, Math.min(i + width, a.length), Math.min(i + 2*width, a.length), b);
    }
    for (let i = 0; i < a.length; i++) {
      a[i] = b[i];
    }
  }

  return a
}

function merge(a, left, right, end, b) {
  let i = left, j = right;
  
  for (let k = left; k < end; k++) {
    if (i < right && (j >= end || a[i] <= a[j])) {
      b[k] = a[i++];
    }
    else {
      b[k] = a[j++];
    }
  }
}
