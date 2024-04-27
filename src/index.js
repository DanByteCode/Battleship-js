import { Game } from "./game.js";
import { $g, $c, $t } from "./dom-controler.js";

function Main() {
   const game = new Game()
   let moveShip = false
   let lastShip = []
   let turn = true
   let enable = true
   function init() {
      game.init()
      createBoard("board-two")
      createBoard("board-one", true)
      gameStatus()
      $g("btn").addEventListener("click", () => {
         $g("initial").setAttribute("hidden", "true")
         $g("player-two").removeAttribute("hidden")
         enable = false
         showShips()
      })
      $g("btn-new").addEventListener("click", ()=>{
         newGame()
         $g("modal").close()
      })

   }
   function newGame() {
      game.init()
      moveShip = false
      turn = true
      enable = true
      $g("board-one").innerHTML = ""
      $g("board-two").innerHTML = ""
      createBoard("board-two")
      createBoard("board-one", true)
      $g("player-two").setAttribute("hidden", "true")
      $g("initial").removeAttribute("hidden")
      gameStatus()
      showShips()
   }
   function createBoard(board, player = false) {
      for (let i = 0; i < 10; i++) {
         const row = $c("div", board)
         row.classList.add("row")
         for (let j = 0; j < 10; j++) {
            const box = $c("div")
            box.classList.add("box")
            box.dataset.r = i
            box.dataset.c = j
            box.id = `${board}-r${i}-c${j}`
            if (player) {
               moveEvents(box, i, j)
               rotateEvents(box, i, j)
            } else {
               addEvent(box, i, j)
            }
            row.append(box)
            showShips()
         }
      }
   }

   function addEvent(item, row, col) {
      item.addEventListener("click", () => {
         if (item.className == "box" && turn) {
            const hit = game.play([row, col])
            comprobate(item, hit, "two")
            if (!hit) {
               let last = true
               turn = false
               const interval = setInterval(() => {
                  if (last) {
                     last = game.autoPlay()
                     comprobate(findBox("one", game.getLastPlay()), last, "one")
                  } else {
                     turn = true
                     clearInterval(interval);
                  }
               }, 300);
            }
         }
      })
   }
   function moveEvents(item, row, col) {
      const coords = [row, col]
      item.addEventListener("dragstart", (e) => {
         const obj = e.srcElement.className
         if (obj == "box ship" && enable) {
            moveShip = true
            lastShip = game.getBoard().getShip(coords)
            delShip(coords)
            showShips()
         } else {
            moveShip = false
            e.preventDefault()
         }
      })
      item.addEventListener("dragenter", (ev) => {
         const r = parseInt(item.dataset.r)
         const c = parseInt(item.dataset.c)
         const status = game.available([r, c], lastShip.length(), lastShip.getDir()) ? "selected" : "bad"
         item.classList.add(status);
      });

      item.addEventListener("dragleave", () => {
         item.classList.remove("selected");
         item.classList.remove("bad");
      });
      item.addEventListener("dragover", (e) => {
         e.preventDefault()
      })
      item.addEventListener("dragend", (e) => {
         if (e.dataTransfer.dropEffect == "none") {
            game.addShip(lastShip.getCoords()[0].coord, lastShip.length(), lastShip.getDir())
            showShips()
         }
      })
      item.addEventListener("drop", (e) => {
         item.classList.remove("selected");
         item.classList.remove("bad");
         if (moveShip) {
            if (!game.addShip(coords, lastShip.length(), lastShip.getDir())) {
               game.addShip(lastShip.getCoords()[0].coord, lastShip.length(), lastShip.getDir())
            }
            showShips()
            moveShip = false
         }
      })
   }
   function rotateEvents(item, row, col) {
      const coords = [row, col]
      item.addEventListener("click", (e) => {
         const obj = e.srcElement.className
         if (obj == "box ship" && enable) {
            moveShip = true
            lastShip = game.getBoard().getShip(coords)
            delShip(coords)
         } else {
            moveShip = false
         }
         if (moveShip) {
            const rotate = lastShip.getDir() == "H" ? "V" : "H"

            if (!game.addShip(coords, lastShip.length(), rotate)) {
               game.addShip(lastShip.getCoords()[0].coord, lastShip.length(), lastShip.getDir())
            }
         }
         showShips()
         moveShip = false
      })
   }



   function comprobate(item, ship, board) {
      if (ship) {
         item.classList.add("hit")
         if (ship.itSunk()) {
            for (const c of ship.getCoords()) {
               const box = findBox(board, c.coord)
               box.classList.add("sunk")
            }
            gameStatus()
         }
      } else {
         item.classList.add("fail")
      }
   }
   function gameStatus() {
      const state = game.getShipStatus()
      $t("count-one", `${state.shipsPlayerOne}/${state.initialShips}`)
      $t("count-two", `${state.shipsPlayerTwo}/${state.initialShips}`)
      if (state.shipsPlayerOne < 1) {
         $t("game-over", "YOU LOSE")
         $g("modal").showModal();
      } else if (state.shipsPlayerTwo < 1) {
         $t("game-over", "YOU WIN")
         $g("modal").showModal();
      }
   }
   function findBox(board, coord) {
      return $g(`board-${board}-r${coord[0]}-c${coord[1]}`)
   }
   function delShip(coord) {
      if (game.isShip(coord)) {
         game.deleteShip(coord)
      }
   }
   function showShips() {
      const boxList = $g("board-one").getElementsByClassName("box")
      for (let i = 0; i < boxList.length; i++) {
         const actual = boxList[i]
         const r = parseInt(actual.dataset.r)
         const c = parseInt(actual.dataset.c)
         if (game.isShip([r, c])) {
            actual.classList.add("ship")
            actual.classList.remove("warn")
            actual.setAttribute("draggable", true)
         } else {
            actual.classList.remove("ship")
            actual.classList.remove("warn")
            actual.setAttribute("draggable", false)
            if (!game.available([r, c], 1) && enable) {
               actual.classList.add("warn")
            }
         }
      }
   }
   return { init }
}
const main = new Main()
main.init()