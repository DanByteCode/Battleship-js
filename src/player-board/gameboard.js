import { Ship } from "./ship.js"
export function Gameboard(r = 10, c = 10) {
    const boardRows = r
    const boardCols = r
    let shipCount = 0
    
    const board = createMatrix(boardRows, boardCols)
    const shipsAvailable = ()=>{return shipCount > 0}
    function createMatrix(boardRows, boardCols) {
        const res = new Array(boardRows)
        for (let r = 0; r < boardRows; r++) {
            res[r] = new Array(boardCols).fill(0)
        }
        return res
    }
    function getShip(coords) {
        return board[coords[0]][coords[1]]
    }
    function addShip(coord, len = 1, orientation = "H") {
        if (available(coord, len, orientation)) {
            const newShip = new Ship(len)
            if (orientation == "V") {
                const start = coord[0]
                const end = coord[0] + len
                for (let p = start; p < end; p++) {
                    board[p][coord[1]] = newShip
                    newShip.addCoord([p,coord[1]])
                }

            } else if (orientation == "H") {
                const start = coord[1]
                const end = coord[1] + len
                for (let p = start; p < end; p++) {
                    board[coord[0]][p] = newShip
                    newShip.addCoord([coord[0],p])
                }
            }
            shipCount++
        }
    }

    function available(coord, len = 1, orientation = "V") { 
        if (orientation == "V") {
            const start = coord[0]
            const end = coord[0] + len
            for (let p = start; p < end; p++) {
                if (p >= boardRows || board[p][coord[1]]) {
                    return false
                }
            }

        } else if (orientation == "H") {
            const start = coord[1]
            const end = coord[1] + len
            for (let p = start; p < end; p++) {
                if (p >= boardCols || board[coord[0]][p]) {
                    return false
                }
            }

        }
        return true
    }
    function receiveAttack(coord){
        const atacked = board[coord[0]][coord[1]]
        let hitSuccess = false
        if(atacked !== 0){
            if(atacked.hit(coord) ){
                hitSuccess = true
                if(atacked.itSunk()){
                    shipCount--
                }
            }
        }
        return hitSuccess
    }
    return { shipsAvailable, available, addShip, getShip, receiveAttack, shipCount }
}