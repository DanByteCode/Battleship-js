import { Gameboard } from "./gameboard.js"

export function Player(n = "", a = false){
   let name = n
   const board = new Gameboard()
   const artificial = a
   const play = []
   
   const getName = ()=>{return name}
   const getBoard = ()=>{return board}
   const isArtificial = ()=>{return artificial}
   const setName = (n) => { name = n }
   const lastPlay = () => { return play[play.length-1]}

   function randomPlay(){
      let randomR = 0
      let randomC = 0
      do{
         randomR = Math.floor(Math.random()*10) 
         randomC = Math.floor(Math.random()*10) 
     } while(play.find((a)=> {return a[0] == randomR && a[1] == randomC}) && play.length < 100)
      play.push([randomR,randomC])
      return [randomR,randomC]
   }
   function randomBuild(storage){
      let randomR = 0
      let randomC = 0
      let dir = "H"
      for (let i = storage.length - 1; i >= 0; i--) {
         for (let s = 0; s < storage[i].stock; s++) {
            do{
               randomR = Math.floor(Math.random()*10) 
               randomC = Math.floor(Math.random()*10) 
               dir = Math.floor(Math.random()*8) % 2 == 0 ? "V" : "H" 
            } while(!board.available([randomR,randomC], storage[i].long, dir))
            board.addShip([randomR,randomC], storage[i].long, dir) 
         }
      }
      
   }
   function getShip(coord){
      return board.getShip(coord)
   }
   return {getName,getShip, getBoard, randomPlay, isArtificial, setName, randomBuild, lastPlay}
}