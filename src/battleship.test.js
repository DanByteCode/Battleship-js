import { Ship } from "./player-board/ship"
import { Gameboard } from "./player-board/gameboard"
import { Player } from "./player-board/player"
import { Game } from "./game"

describe("Ship test:", () => {
    const ship = new Ship(3)
    ship.addCoord([0,0])
    ship.addCoord([0,1])
    ship.addCoord([0,2])
    test("Ship exist", () => {
        expect(ship).not.toBeUndefined()
    })
    test("Ship length", () => {
        expect(ship.length()).toBe(3)
    })
    test("Ship initial hits", () => {
        expect(ship.getHits()).toBe(0)
    })
    test("Hit the Ship", () => {  
        ship.hit([0,0])
        expect(ship.getHits()).toBe(1)
    })
    test("The ship its Sunk", () => {  
        ship.hit([0,1])
        ship.hit([0,2])
        expect(ship.itSunk()).toBeTruthy()
    })
})

describe("Gameboard test:",()=>{
    const gameboard = new Gameboard()
    test("Get available space",()=>{
        expect(gameboard.available([1,1], 2, "H")).toBeTruthy()
    })
    test("Get available space out bounds",()=>{
        expect(gameboard.available([8,4], 3, "V")).toBeFalsy()
    })
    test("Add and get Ship",()=>{
        gameboard.addShip([0,1], 2, "V")
        expect(gameboard.getShip([1,1])).not.toBe(0)
    })
    test("Ship available",()=>{
        expect(gameboard.shipsAvailable()).toBeTruthy()
    })
    test("Fail hit to Ship",()=>{
        expect(gameboard.receiveAttack([1,2])).toBeFalsy()
    })
    test("Success hit to Ship",()=>{
        expect(gameboard.receiveAttack([0,1])).toBeTruthy()
    })
    test("Atack the same coord",()=>{
        expect(gameboard.receiveAttack([0,1])).toBeFalsy()
        expect(gameboard.getShip([0,1]).getHits()).toBe(1)
    })
    test("Sunk the ship",()=>{
        expect(gameboard.receiveAttack([1,1])).toBeTruthy()
        expect(gameboard.getShip([1,1]).itSunk()).toBeTruthy()
    })
    test("All ships are sunk",()=>{
        expect(gameboard.shipsAvailable()).toBeFalsy()
    })
})

describe("Player test", ()=>{
    const player1 = new Player("Name")
    const player2 = new Player("Name")
    
    player1.getBoard().addShip([0,0], 2, "H")
    player2.getBoard().addShip([0,0], 2, "V")

    player2.getBoard().receiveAttack([0,0])
    player1.getBoard().receiveAttack([3,2])
    player2.getBoard().receiveAttack([1,0])
    player1.getBoard().receiveAttack([4,6])
    test("Player 1 have ships", ()=>{
        expect(player1.getBoard().shipsAvailable()).toBeTruthy()
    })
    test("Player 2 does not have ships available", ()=>{
        expect(player2.getBoard().shipsAvailable()).toBeFalsy()
    })
})

describe("Game Test", ()=>{
    const game = new Game()
    game.init("Danny")
    test("Current player name",()=>{
        expect(game.getCurrentPlayer()).toBe("Player 2")
    })
    test("Player turn", ()=>{
        expect(game.play([0,0])).toBeFalsy()
    })
    test("Current second player name",()=>{
        expect(game.getCurrentPlayer()).toBe("Danny")
    })
})