let $start = document.querySelector('#start'),
    $game = document.querySelector('#game'),
    $time = document.querySelector('#time'),
    $timeHeader = document.querySelector('#time-header'),
    $resultHeader = document.querySelector('#result-header'),
    $result = document.querySelector('#result'),
    $gameTime = document.querySelector('#game-time');

let score = 0,
    isGameStarted = false;
function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
$gameTime.addEventListener('input', setGameTime);


let box = document.createElement('div'),
    gameSize = $game.getBoundingClientRect();

function show($el) {
    $el.classList.remove('hide');
};

function hide($el) {
    $el.classList.add('hide');
};

function startGame(){
    $game.insertAdjacentElement('afterbegin', box);
    setGameTime();
    score = 0;
    isGameStarted = true;
    $start.classList.add('hide');
    $game.style.backgroundColor = '#fff';
    $timeHeader.classList.remove('hide');
    $resultHeader.classList.add('hide');
    let interval = setInterval(function(){
        let time = parseFloat($time.textContent);
        if(time <= 0) {
            clearInterval(interval);
            endGame();
        } else{
            $time.textContent = (time - 0.1).toFixed(1);
        }
    }, 100);
    $gameTime.setAttribute('disabled', '');
    renderBox();
};

function endGame(){
    setGameScore();
    isGameStarted = false;
    $start.classList.remove('hide');
    $game.style.backgroundColor = '#ccc';
    $game.innerHTML = '';
    $timeHeader.classList.add('hide');
    $resultHeader.classList.remove('hide');
    $gameTime.removeAttribute('disabled');
};

function handleBoxClick(event){
    if(!isGameStarted) {
        return;
    }
    if(event.target.dataset.box) {
        score++;
        renderBox();
    }
};

function setGameScore(){
    $result.textContent = score.toString();
};

function setGameTime(){
    let time = +$gameTime.value;
    $time.textContent = time.toFixed(1);
    $timeHeader.classList.remove('hide');
    $resultHeader.classList.add('hide');
};

function renderBox(){
    let boxSize = getRandom(70, 100);
    let maxTop = gameSize.height - boxSize;
    let maxLeft = gameSize.width - boxSize;
    box.style.height = box.style.width = boxSize + 'px';
    box.style.position = 'absolute';
    box.style.backgroundColor = getRandomColor();
    box.style.top = getRandom(0, maxTop) + 'px';
    box.style.left = getRandom(0, maxLeft) + 'px';
    box.style.cursor = 'pointer';
    box.style.transition = 'all 80ms ease-in-out';

    box.setAttribute('data-box', 'true');
};

function getRandom(min, max){
    return Math.floor(Math.random() * (max - min) + min);
};