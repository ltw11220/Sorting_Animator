export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxArray, animations, true);
    return animations;
  }
  
function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxArray,
  animations,
  firstTime
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxArray, startIdx, middleIdx, mainArray, animations, false);
  mergeSortHelper(auxArray, middleIdx + 1, endIdx, mainArray, animations, false);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxArray, animations, firstTime);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxArray,
  animations,
  lastMerge
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  if(lastMerge){
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxArray[i] <= auxArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the aux array.
        animations.push([k, auxArray[i], true]);
        mainArray[k++] = auxArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the aux array.
        animations.push([k, auxArray[j], true]);
        mainArray[k++] = auxArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the aux array.
      animations.push([k, auxArray[i]]);
      mainArray[k++] = auxArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the aux array.
      animations.push([k, auxArray[j]]);
      mainArray[k++] = auxArray[j++];
    }
  } else{
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxArray[i] <= auxArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the aux array.
        animations.push([k, auxArray[i]]);
        mainArray[k++] = auxArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the aux array.
        animations.push([k, auxArray[j]]);
        mainArray[k++] = auxArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the aux array.
      animations.push([k, auxArray[i]]);
      mainArray[k++] = auxArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the aux array.
      animations.push([k, auxArray[j]]);
      mainArray[k++] = auxArray[j++];
    }
  }
  
}
export function getSelectSortAnimations(array){
  var auxArray = array.slice();
  var animations = [];
  for(var i = 0; i < auxArray.length; i++){
    var min = [0, 10000];
    var prevMin = null;

    for(var j = i; j < auxArray.length; j++){
      if(auxArray[j] < min[1]){
        min = [j, auxArray[j]];
        
        if(prevMin === null){
          animations.push([1, j]);
        } else{
          animations.push([1, j, prevMin]);
        }
        prevMin = j;
      } else{
        animations.push([2, j]);
      }
    }

    animations.push([3, min[0], i]);
    var temp = min[1];
    auxArray[min[0]] = auxArray[i];
    auxArray[i] = temp;
  }
  return animations;
}


/*
Situation 1: We find a new min while iterating over unsorted and change color to black. We must also revert the previous min to its old color.
Situation 2: We simply pass over a value that isn't a new min. We must change its color to red and then revert it back after a short delay. 
Situation 3: After finding our new minimum, we swap the heights of our new min with the first element of the unsorted portion of the array.
We then change the color of the min's original position back to what it was and change the color of the min's new position to purple. 

*/


export function getHeapSortAnimations(array){
  var animations = [];
  var auxArray = array.slice();

  for(let i = auxArray.length; i > 1; i--){
    heapify(auxArray, animations);
    var temp = auxArray[auxArray.length - 1];
    auxArray[auxArray.length - 1] = auxArray[0];
    auxArray[0] = temp;
    animations.push([3, auxArray.length - 1]);
    auxArray.pop();

  }

  return animations;
}

function heapify(array, animations){
  for(let i = Math.floor(((array.length - 1) / 2) - 1); i >= 0; i--){
    var larger = array[(2*i) + 1] > array[(2*i) + 2] ? (2*i) + 1 : (2*i) + 2;
    if(array[larger] > array[i]){
      animations.push([2, i, larger]);
      var temp = array[i];
      array[i] = array[larger];
      array[larger] = temp;
    } else{
      animations.push([1, i, larger]);
    }

  }
}


/*
Situation 1: We compare but do not swap (flash red).
Situation 2: We compare and swap. (flash red).
Situation 3: We place the root in its final position and remove it from the heap (flash red, turn and keep purple)
*/


export function getQuickSortAnimations(array){
  var animations = [];
  var auxArray = array.slice();
  quicksort(auxArray, 0, auxArray.length - 1, animations, 1);





  return animations;
}

function quicksort(array, start, end, animations, depth){
  if(start < end){
    var pi = partition(array, start, end, animations);
    quicksort(array, start, pi- 1, animations, depth++);
    quicksort(array, pi + 1, end, animations, depth);
  }
}


function partition(array, start, end, animations){ //Assuming we partition from end. 
  var i = start - 1;
  var pivot = array[end];
  animations.push([1, end]);
  for(let j = start; j < end; j++){
    if(array[j] < pivot){
      i++; 
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      animations.push([3, j, i]);
    } else{
      animations.push([2, j]);
    }
  }
  array[end] = array[i + 1];
  array[i + 1] = pivot;
  end === i + 1 ? animations.push([5, i + 1]): animations.push([4, i + 1, end]);
  return i + 1;
  
}

/*
Situation 1: in the partition function, we select an end which gets continuously compared to with other values to determine its 
absolute position. We should change this to blue, and then keep it blue. 

Situation 2: In the partition function when we are comparing a value to the partition value, we should have it turn red for a second. 
[2, flash red index]
Situation 3: If needed to be siwtched in situation 2, both should flash red for a sec and then switch. 
[3, j, i]
Situation 4: When we know the absolute point where one value should be, we should change it from red to purple.
[4, correct position, blue position]


*/