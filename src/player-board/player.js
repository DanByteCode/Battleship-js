import { Gameboard } from "./gameboard.js"

export function Player(n = "", a = false){
   let name = n
   let board = new Gameboard()
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
      return board.receiveAttack([randomR,randomC])
   }
   function randomBuild(){
      let randomR = 0
      let randomC = 0
      let dir = "H"
      for (let i = 4; i > 1; i--) {
         do{
            randomR = Math.floor(Math.random()*10) 
            randomC = Math.floor(Math.random()*10) 
            dir = Math.floor(Math.random()*8) % 2 == 0 ? "V" : "H" 
         } while(!board.available([randomR,randomC], i, dir))
         board.addShip([randomR,randomC], i, dir)
         
      }

   }
   return {getName, getBoard, randomPlay, isArtificial, setName, randomBuild, lastPlay}
}