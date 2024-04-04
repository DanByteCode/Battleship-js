import { Player } from "./player-board/player.js";

export function Game(){
   let player1 = {}
   let player2 = {}
   let playerTurn = {}

   const getCurrentPlayer = ()=> { return playerTurn.getName() } 
   const switchPlayer = ()=> { playerTurn = playerTurn === player1 ? player2 : player1 }

   function init(name1 = "Player 1", name2 = "Player 2"){
      player1 = new Player(name1)
      player2 = new Player(name2)
      player1.randomBuild()
      player2.randomBuild()
      playerTurn = player1
   }
   function play(coord){
      switchPlayer()
      if(playerTurn.getBoard().receiveAttack(coord)){
         return true
      }else{
         return false
      }
   }
   function autoPlay(){
      switchPlayer()
      return playerTurn.randomPlay()
   }
   function getLastPlay(){
      return playerTurn.lastPlay()
   }
   function getPlayer1(){return player1}
   return { init, switchPlayer, play, getCurrentPlayer,
       autoPlay, getLastPlay, getPlayer1 }
}
