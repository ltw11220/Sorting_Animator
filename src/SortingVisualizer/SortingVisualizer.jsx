import React from 'react';
import './SortingVisualizer.css';
import './Algos.js';
import { getHeapSortAnimations, getMergeSortAnimations, getQuickSortAnimations, getSelectSortAnimations } from './Algos.js';

// Change this value for the speed of the animations.
var ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
var NUMBER_OF_ARRAY_BARS = 310;

// Main color. 
var PRIMARY_COLOR = 'turquoise';

// Color that bars flash when being compared. 
var SECONDARY_COLOR = 'red';

// Color of bars when sorted into their final position. 
var FINAL_COLOR = "purple"



export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props); 

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  switchButton(){
    const button = document.querySelector('#settings-toggle');
    button.classList.toggle('active');
    const settings = document.querySelector('#settings');
    settings.classList.toggle('active');
  }



  resetArray() {
    var id = window.setTimeout(function() {}, 0);

    while (id--) {
        window.clearTimeout(id); // will do nothing if no timeout with id is present
    }
  //The above code clears all pending animations. 

    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({array});

    var bars = document.getElementsByClassName('array-bar');
      for(let i = 0; i < bars.length; i++){
        bars[i].style.backgroundColor = PRIMARY_COLOR;
      }
    

  }

  resetColors(){
    var id = window.setTimeout(function() {}, 0);

    while (id--) {
        window.clearTimeout(id); // will do nothing if no timeout with id is present
    }

    var bars = document.getElementsByClassName('array-bar');
    for(let i = 0; i < bars.length; i++){
      bars[i].style.backgroundColor = PRIMARY_COLOR;
    }


  }

  mergeSort(){
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = barOneStyle.backgroundColor === FINAL_COLOR ? FINAL_COLOR : color;
          barTwoStyle.backgroundColor = barTwoStyle.backgroundColor === FINAL_COLOR ? FINAL_COLOR : color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        if(animations[i].length === 3){
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
            barOneStyle.backgroundColor = FINAL_COLOR;
          }, i * ANIMATION_SPEED_MS);
        } else{
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
          }, i * ANIMATION_SPEED_MS);
        }
      }
    }
    setTimeout(()=>{
      var arrayBars = document.getElementsByClassName('array-bar');
      for(var i = 0; i < arrayBars.length; i++){
        arrayBars[i].style.backgroundColor = FINAL_COLOR;
      }
    }, animations.length * ANIMATION_SPEED_MS);
  }

  selectSort(){
    const animations = getSelectSortAnimations(this.state.array);
    for(let i = 0; i < animations.length; i++){
      const animation = animations[i];
      const arrayBars = document.getElementsByClassName('array-bar');
      const barIdx = animation[1];


      switch (animation[0]) { //Handles the different animation possibilities accordingly. 
        case 1:
          if(animation.length === 2){
            setTimeout(() => {
              arrayBars[barIdx].style.backgroundColor = 'black';
            }, i * ANIMATION_SPEED_MS);
          } else{
            setTimeout(() => {
            arrayBars[barIdx].style.backgroundColor = 'black';
            arrayBars[animation[2]].style.backgroundColor = PRIMARY_COLOR;
            }, i * ANIMATION_SPEED_MS);
          }
          break;
        
        case 2:
          setTimeout(() => {
            arrayBars[barIdx].style.backgroundColor = SECONDARY_COLOR;
          }, i * ANIMATION_SPEED_MS);
          setTimeout(() => {
            arrayBars[barIdx].style.backgroundColor = PRIMARY_COLOR;
          }, (i + 1) * ANIMATION_SPEED_MS);
          break;

        case 3:
          setTimeout(() => {
            var temp = arrayBars[animation[2]].style.height;
            arrayBars[barIdx].style.backgroundColor = PRIMARY_COLOR;
            arrayBars[animation[2]].style.height = arrayBars[animation[1]].style.height;
            arrayBars[animation[1]].style.height = temp;
            arrayBars[animation[2]].style.backgroundColor = FINAL_COLOR;
          }, i * ANIMATION_SPEED_MS);
      }
  }
}


  heapSort(){
    const animations = getHeapSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');
    var sum = 0;
    for(let i = 0; i < animations.length; i++){
      let animation = animations[i];
      switch (animation[0]){

        case 1:
          sum++;
          setTimeout(()=>{
            arrayBars[animation[1]].style.backgroundColor = SECONDARY_COLOR;
            arrayBars[animation[2]].style.backgroundColor = SECONDARY_COLOR;
          }, i * ANIMATION_SPEED_MS);

          setTimeout(()=>{
            arrayBars[animation[1]].style.backgroundColor = PRIMARY_COLOR;
            arrayBars[animation[2]].style.backgroundColor = PRIMARY_COLOR;
          }, (i + 1) * ANIMATION_SPEED_MS);

          break;

        case 2:
          sum++;
          setTimeout(()=>{
            arrayBars[animation[1]].style.backgroundColor = SECONDARY_COLOR;
            arrayBars[animation[2]].style.backgroundColor = SECONDARY_COLOR;
          }, i * ANIMATION_SPEED_MS);

          setTimeout(()=>{
            var hght =  arrayBars[animation[1]].style.height;
            arrayBars[animation[1]].style.height = arrayBars[animation[2]].style.height;
            arrayBars[animation[2]].style.height = hght;
            arrayBars[animation[1]].style.backgroundColor = PRIMARY_COLOR;
            arrayBars[animation[2]].style.backgroundColor = PRIMARY_COLOR;
          }, (i + 1) * ANIMATION_SPEED_MS);

          break;

          case 3:
            sum++;
            setTimeout(()=>{
              var hght = arrayBars[animation[1]].style.height;
              arrayBars[animation[1]].style.height = arrayBars[0].style.height;
              arrayBars[0].style.height = hght;
              arrayBars[animation[1]].style.backgroundColor = FINAL_COLOR;

            }, i * ANIMATION_SPEED_MS);

            break;
      }
    }
    setTimeout(()=>{
      var arrayBars = document.getElementsByClassName('array-bar');
      for(var i = 0; i < arrayBars.length; i++){
        arrayBars[i].style.backgroundColor = FINAL_COLOR;
      }
    }, animations.length * ANIMATION_SPEED_MS);
  }


  quickSort(){
    const animations = getQuickSortAnimations(this.state.array);
    for(let i = 0; i < animations.length; i++){
      const animation = animations[i];
      var arrayBars = document.getElementsByClassName('array-bar');

      switch(animation[0]){


        case 1:
          setTimeout(()=> {
            arrayBars[animation[1]].style.backgroundColor = 'blue';
          }, i * ANIMATION_SPEED_MS);
          break;

        case 2:
          setTimeout(()=> {
            arrayBars[animation[1]].style.backgroundColor = SECONDARY_COLOR;
          }, i * ANIMATION_SPEED_MS);
          setTimeout(()=> {
            arrayBars[animation[1]].style.backgroundColor = PRIMARY_COLOR;
          }, (i+1) * ANIMATION_SPEED_MS);
          break;

        case 3:
          setTimeout(()=> {
            arrayBars[animation[1]].style.backgroundColor = SECONDARY_COLOR;
            arrayBars[animation[2]].style.backgroundColor = SECONDARY_COLOR;
            var hght = arrayBars[animation[1]].style.height;
            arrayBars[animation[1]].style.height = arrayBars[animation[2]].style.height;
            arrayBars[animation[2]].style.height = hght;
          }, i * ANIMATION_SPEED_MS);
          setTimeout(()=> {
            arrayBars[animation[1]].style.backgroundColor = PRIMARY_COLOR;
            arrayBars[animation[2]].style.backgroundColor = PRIMARY_COLOR;
          }, (i + 1) * ANIMATION_SPEED_MS);
          break;

          case 4:
            setTimeout(()=> {
              arrayBars[animation[1]].style.backgroundColor = FINAL_COLOR;
              arrayBars[animation[2]].style.backgroundColor = PRIMARY_COLOR;
              var hght = arrayBars[animation[1]].style.height;
              arrayBars[animation[1]].style.height = arrayBars[animation[2]].style.height;
              arrayBars[animation[2]].style.height = hght;
            }, i * ANIMATION_SPEED_MS);
            break;
          
          case 5: 
          setTimeout(()=> {
            arrayBars[animation[1]].style.backgroundColor = FINAL_COLOR
          }, i * ANIMATION_SPEED_MS);
          break;
      }
    }
    setTimeout(()=>{
      var arrayBars = document.getElementsByClassName('array-bar');
      for(var i = 0; i < arrayBars.length; i++){
        arrayBars[i].style.backgroundColor = FINAL_COLOR;
      }
    }, animations.length * ANIMATION_SPEED_MS);

  }
  barChanged = event => {
    NUMBER_OF_ARRAY_BARS = document.getElementById('bar-changer').value;
    this.resetArray();
  }

  getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return width;
  }

  timeChanged = event => {
    const num = Number(event.target.value)
    if(Number(num)){
      if(num >= 0 && num <= 1000) ANIMATION_SPEED_MS = event.target.value;
    }

    
  }

  switchPrimary = event => {
    PRIMARY_COLOR = event.target.value;
    this.resetColors();
  };
  switchSecondary = event => {
    SECONDARY_COLOR = event.target.value;
  };
  switchFinal = event => {
    FINAL_COLOR = event.target.value;
  };
  changeTransition = event => {
    console.log(event.target.parent);
    var cont = document.getElementsByClassName('array-container');
    console.log(cont);
    cont[0].style.transition = `${event.target.value}ms height`;
  }
  
  render() {
    const {array} = this.state;

    return (
      <div className='total-page'>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
                width: `${100/NUMBER_OF_ARRAY_BARS}%`
              }}></div>
          ))}
        </div>
        <div className="bottom-settings" style={{backgroundImage: `linear-gradient(to right, ${PRIMARY_COLOR}, ${SECONDARY_COLOR})`}}>
          <button id='generate' onClick={() => this.resetArray()}>
              Generate a new array.
          </button>
          <button id='merge-sort' onClick={() => this.mergeSort()}>
              Merge Sort. 
          </button>
          <button id='select-sort' onClick={() => this.selectSort()}>
              Select Sort.
          </button>

          <button id='heap-sort' onClick={() => this.heapSort()}>
            Heap Sort. 
          </button>
          <button id = "quick-sort" onClick={()=> this.quickSort()}>
            Quick Sort.
          </button>
        </div>
        <div id="settings-toggle" onClick={this.switchButton}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
        </div>
        <div id="settings" style={{backgroundImage: `linear-gradient(to bottom, ${PRIMARY_COLOR}, ${SECONDARY_COLOR})`}}>


          <form>
            <div className='label-holder'>
            <input
              type="range"
              step = "1"
              min = "1"
              max = "310"
              onChange={this.barChanged}
              id = "bar-changer"
              title = "Number of Bars"
            />
            <label htmlFor="bar-changer">Number of Bars</label>
            </div>
            <div className='label-holder'>
            <input
              type="range"
              step = "1"
              min = "0"
              max = "1000"
              onChange={this.changeTransition}
              id = "transition-changer"
              title = "Transition Speed"
            />
            <label htmlFor="transition-changer">Transition Speed</label>
            </div>
            <div className='label-holder'>
            <input
              id = "animation-speed-changer"
              type="text"
              defaultValue= "[1, 1000], units in ms"
              onChange={this.timeChanged}
              id = "time-changer"
              title ="[1, 1000], units in ms"
              style = {{
                width: '90%'
              }}
            />
            <label htmlFor="animation-speed-changer">Animation Speed</label>
            </div>
            <div className='label-holder'>
            <input
              className='color-picker'
              id = "primary-picker"
              type = "color"
              defaultValue={PRIMARY_COLOR}
              onChange={this.switchPrimary}
            />
            <label htmlFor="primary-picker">Primary Color</label>
            </div>
            <div className='label-holder'>
          <input 
              className='color-picker'
              id = "secondary-picker"
              type = "color"
              defaultValue={SECONDARY_COLOR}
              onChange={this.switchSecondary}
            />
            <label htmlFor='secondary-picker'>Secondary Color</label>
            </div>
            <div className='label-holder'>
          <input 
              className='color-picker'
              id = "final-picker"
              type = "color"
              defaultValue={FINAL_COLOR}
              onChange={this.switchFinal}
            />
            <label htmlFor='final-picker'>Final Color</label>
            </div>

            
            
          </form>

        </div>
        <div id = "credits">
          Liam Walsh
          1/1/2022
          ltw244@nyu.edu
        </div>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}



