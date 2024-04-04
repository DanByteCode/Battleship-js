import { Game } from "./game.js";
import { $g, $c, $t } from "./dom-controler.js";

function Main() {
   const game = new Game()
   function init() {
      game.init()
      createBoard("board-two")
      createBoard("board-one", true)
      $g("btn").addEventListener("click", () => {
         const name1 = $g("input-one").value
         game.init(name1)
         $t("name-one", name1)
      })
   }

   function createBoard(board, player = false) {
      for (let i = 0; i < 10; i++) {
         const row = $c("div", board)
         row.classList.add("row")
         for (let j = 0; j < 10; j++) {
            const box = $c("div")
            box.classList.add("box")
            box.id = `${board}-r${i}-c${j}`
            if (player) {
               if (!game.getPlayer1().getBoard().available([i, j])) {
                  box.classList.add("ship")
               }
            } else {
               addEvent(box, i, j)

            }

            row.append(box)
         }
      }
   }

   function addEvent(item, row, col) {
      item.addEventListener("click", () => {
         if(item.className == "box"){
            comprobate(item, game.play([row, col]))
            const last = game.autoPlay()
            comprobate(findBox(game.getLastPlay()), last)
         } 
      })
   }
   function comprobate(item, hit) {
      if (hit) {
         item.classList.add("hit")
      } else {
         item.classList.add("fail")
      }
   }
   function findBox(coord) {
      return $g(`board-one-r${coord[0]}-c${coord[1]}`)
   }
   return { init }
}
const main = new Main()
main.init()