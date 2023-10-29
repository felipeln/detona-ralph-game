const state = {
  view: {
    squares: document.querySelectorAll('.square'),
    enemy: document.querySelector('.enemy'),
    time: document.querySelector('#time-left'),
    score: document.querySelector('#game-score'),
    life: document.querySelector('#life-counter'),
    retry: document.querySelector('#retry')
  },
  values: {
    moveVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
    life: 3
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    contDownTimerId: setInterval(countDown, 1000),
  }
}

function playSound(audioName){
  let audio = new Audio(`../../src/audio/${audioName}.m4a`)
  audio.volume = 0.2
  audio.play()
}

function countDown(){
  state.values.currentTime--
  state.view.time.textContent = state.values.currentTime
  
  if(state.values.currentTime <= 0 || state.values.life <= 0){
    playSound('game-over')
    clearInterval(state.actions.contDownTimerId)
    clearInterval(state.actions.timerId)
    alert('Game Over! O seu resultado foi ' + state.values.result)
  }
}

function randomSquare(){
  state.view.squares.forEach((square) => {
    square.classList.remove('enemy')
  })

  let randomNumber = Math.floor(Math.random() * 9)
  let selectedSquare = state.view.squares[randomNumber]
  selectedSquare.classList.add('enemy')
  state.values.hitPosition = selectedSquare.id
}


function addListinerHitbox(){
  state.view.squares.forEach((square) => {
    square.addEventListener('mousedown', () =>{
      if(square.id == state.values.hitPosition){
        playSound('right-hit')
        if(state.values.life > 0 && state.values.currentTime > 0){
          state.values.result++
          state.view.score.textContent = state.values.result
          state.values.hitPosition = null
        }
      }
      if(square.id !== state.values.hitPosition && state.values.hitPosition !== null){
        playSound('wrong-hit')
        if(state.values.life > 0){
          state.values.life--
          state.view.life.textContent = 'x' + state.values.life
        }
        
      }
    })
    
  })
}

function retry(){
  state.view.retry.addEventListener('click', () => {
    location.reload()
  })
}

function init(){
  addListinerHitbox()
  retry()
}


init()

