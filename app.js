const createPlayer = (name, sign)=>{
    return{name, sign}
}
const gameboard = document.getElementById('board')

const GameBoard = (() => {

        const cell = document.querySelectorAll('.square');
        
        function startGame(){
            game.setCurrentClass
            cell.forEach((cell) =>{
                removeStuff(cell)
                cell.addEventListener('click', handleClick, {once:true})
            })
            game.playsLeft = 9
            game.message.classList.remove('show')
            //game.setCurrentClass()
        }
    
    function removeStuff(cell){
        cell.innerHTML = ''
        cell.removeEventListener('click', handleClick)
        cell.classList.remove(game.X_CLASS)
        cell.classList.remove(game.O_CLASS)
    }

    function handleClick(e){
        const currentCell = e.target;
        game.placeMarker(currentCell, game.circleTurn)
        //let winner = game.checkWinner(`${game.currentClass}`)
        game.circleTurn=game.switchTurns(game.circleTurn)
    }

    return{
        startGame, cell
    }
})();

const game = (()=>{
    const PLAYERONE = createPlayer("Player One", "X")
    const PLAYERTWO = createPlayer("Player Two", "O")
    const X_CLASS = 'X';
    const O_CLASS = 'O';
    let circleTurn = false
    let currentClass = circleTurn ? O_CLASS:X_CLASS;
    const message = document.querySelector('.winning-message')
    const winningmessage = document.getElementById('message')
    let playsLeft = 9;
    const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    
    function placeMarker(cell, circleTurn){ 
        if(!circleTurn){
            cell.innerText = `${X_CLASS}`
        }
        else cell.innerText = `${O_CLASS}`
        cell.classList.add(currentClass)
        console.log(cell.classList)
        game.playsLeft--;
        if(checkWinner(currentClass)){
            message.classList.add('show')
            winningmessage.innerHTML=(`${currentClass} wins`)
        }
        if(game.playsLeft == 0 && !checkWinner(currentClass)){
            message.classList.add('show')
            winningmessage.innerHTML=(`It's a draw`)
        }
    }

    function setCurrentClass(){
        game.circleTurn=false
    }

    function switchTurns(circleTurn){
        if(currentClass==X_CLASS){
            currentClass = O_CLASS
        }
        else currentClass = X_CLASS

        return circleTurn = !circleTurn
    }

    function checkWinner(currentClass){
        return winningCombinations.some(combination =>{
            return combination.every(index =>{
                return GameBoard.cell[index].classList.contains(currentClass)  
            })
        })
    }


    return{PLAYERONE, PLAYERTWO, winningCombinations, 
        placeMarker, switchTurns, circleTurn, X_CLASS, O_CLASS,
        checkWinner, currentClass, message, winningmessage, playsLeft,
        setCurrentClass
    }
})();

window.onload=()=>GameBoard.startGame()
const restart = document.getElementById('btn')

restart.addEventListener('click', ()=>{
    GameBoard.startGame()
    game.playsLeft = 9
    console.log(game.playsLeft)
    
})