import { Ship } from "./ship.js"
export function Gameboard() {
    const boardRows = 10
    const boardCols = 10
    let shipCount = 0

    const board = createMatrix(boardRows, boardCols)
    const getBoard = () => { return board }
    const shipsAvailable = () => { return shipCount > 0 }
    const getShipCount = () => {return shipCount}

    function createMatrix(boardRows, boardCols) {
        const res = new Array(boardRows)
        for (let r = 0; r < boardRows; r++) {
            res[r] = new Array(boardCols).fill(null)
        }
        return res
    }
    function getShip(coords) {
        const [row, col] = coords
        return board.at(row).at(col)
    }
    function addShip(coord, len = 1, orientation = "H") {
        if (available(coord, len, orientation)) {
            const newShip = new Ship(len, orientation)
            if (orientation == "V") {
                const start = coord[0]
                const end = coord[0] + len
                for (let p = start; p < end; p++) {
                    board[p][coord[1]] = newShip
                    newShip.addCoord([p, coord[1]])
                }

            } else if (orientation == "H") {
                const start = coord[1]
                const end = coord[1] + len
                for (let p = start; p < end; p++) {
                    board[coord[0]][p] = newShip
                    newShip.addCoord([coord[0], p])
                }
            }
            shipCount++
            return true
        } else {
            return false
        }
    }

    function available(coord, len = 1, orientation = "V") {
        let [row, col] = coord
        let start = 0
        let end = 0

        const adjacentsVer = (f) => {
            const adjA = col < boardCols -1 ? board[f][col + 1] : false
            const adjB = col  > 0 ? board[f][col - 1] : false
            return adjA || adjB
        }
        const adjacentsHor = (f) => {
            const adjA = row < boardRows -1 ? board[row + 1][f] : false
            const adjB = row > 0 ? board[row -1][f] : false
            return adjA || adjB
        }
        if (orientation == "V") {
            start = row
            end = row + len
            const adj1 = start > 0 ? board[start-1][col] : false
            const adj2 = end < boardRows ? board[end][col] : false
            if(adj1 || adj2){
                return false
            }
            for (let p = start; p < end; p++) {
                if (p >= boardRows || board[p][col] || adjacentsVer(p)) {
                    return false
                }
            }
        } else if (orientation == "H") {
            start = col
            end = col + len
            const adj1 = start > 0 ? board[row][start-1] : false
            const adj2 = end < boardCols ? board[row][end] : false
            if(adj1 || adj2){
                return false
            }
            for (let p = start; p < end; p++) {
                if (p >= boardCols || board[row][p] || adjacentsHor(p)) {
                    return false
                }
            }
        }
        return true
    }
    function receiveAttack(coord) {
        const atacked = board[coord[0]][coord[1]]
        let hitSuccess = false
        if (atacked != null) {
            if (atacked.hit(coord)) {
                hitSuccess = true
                if (atacked.itSunk()) {
                    shipCount--
                }
            }
        }
        return hitSuccess
    }
    function deleteShip(coord) {
        const ship = getShip(coord)
        ship.getCoords().forEach(c => {
            board[c.coord[0]][c.coord[1]] = null
        });
        shipCount--
    }
    return {
        shipsAvailable, available, addShip, getBoard,
        getShip, receiveAttack, shipCount, board, deleteShip, getShipCount
    }
}