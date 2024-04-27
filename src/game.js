import { Player } from "./player-board/player.js";

export function Game(){
   let player1 = {}
   let player2 = {}
   let playerTurn = {}
   let selector = new CreaterSelector(2,2,1,1)
   let maxShips = 0
   const getCurrentPlayer = ()=> { return playerTurn.getName() } 
   const switchPlayer = ()=> { playerTurn = playerTurn === player1 ? player2 : player1 }

   function init(name1 = "Player 1", name2 = "Player 2"){
      player1 = new Player(name1)
      player2 = new Player(name2)
      player1.randomBuild(selector)
      player2.randomBuild(selector)
      playerTurn = player2
      maxShips = player1.getBoard().getShipCount()
   }
   function play(coord){
      if(playerTurn.getBoard().receiveAttack(coord)){
         return playerTurn.getBoard().getShip(coord)
      }else{
         switchPlayer()
         return false
      }
   }

   function autoPlay(){
      return play(player1.randomPlay())
   }
   function getLastPlay(){
      return player1.lastPlay()
   }
   function isShip(coord){
      return player1.getBoard().getShip(coord) !== null
   }
   function addShip(coord, len = selector[pos].long, orientation = dir){
      return player1.getBoard().addShip(coord,len,orientation)
   }
   function deleteShip(del){
     player1.getBoard().deleteShip(del) 
   }
   function getBoard(){
      return player1.getBoard()
   }
   function available(coords, len, dir){
      return player1.getBoard().available(coords, len, dir)
   }
   function getShipStatus() {
      return {
         initialShips: maxShips,
         shipsPlayerOne: player1.getBoard().getShipCount(),
         shipsPlayerTwo: player2.getBoard().getShipCount()
      }
   }
   return { init, switchPlayer, play, getCurrentPlayer,
       autoPlay, getLastPlay, isShip, addShip, deleteShip,
        getBoard, getShipStatus, available }
}

function CreaterSelector(a,b,c,d){
   const build = [
      {
         name: "Frigate",
         long: 2,
         stock: a
      },
      {
         name: "Destroyer",
         long: 3,
         stock: b
      },
      {
         name: "Battleship",
         long: 4,
         stock: c
      },
      {
         name: "War Cruiser",
         long: 5,
         stock: d
      }
   ]
   return build
}
