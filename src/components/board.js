import React from 'react';
import './board.css';

function BigSquare(props) {
    if (props.player === 0) {
        return (
            <div className="big-square" 
                onClick={() => {props.onClick(props.coord)}}>
            </div>
          );
    } else if (props.player === 1) {
        return (
            <div className="big-square" 
              onClick={() => {props.onClick(props.coord)}}>
              <Player1 />
            </div>
          );
    } else {
        return (
            <div className="big-square" 
              onClick={() => {props.onClick(props.coord)}}>
              <Player2 />
            </div>
          );
    }
}

function HWall(props) {
    if (props.blocked === 0) {
        return (
            <div className="h-wall" 
                onClick={() => {props.onClick(props.coord)}}>
            </div>
        );
    } else {
        return (
            <div className="h-wall-blocked" 
                onClick={() => {props.onClick(props.coord)}}>
            </div>
          );
    }
}

function VWall(props) {
    if (props.blocked === 0) {
        return (
            <div className="v-wall" 
                onClick={() => {props.onClick(props.coord)}}>
            </div>
        );
    } else {
        return (
            <div className="v-wall-blocked" 
                onClick={() => {props.onClick(props.coord)}}>
            </div>
          );
    }
}

function SWall(props) {
    if (props.blocked === 0) {
        return (
            <div className="s-wall">
            </div>
        );
    } else {
        return (
            <div className="s-wall-blocked">
            </div>
          );
    }
}

function Player1(props) {
    return (
        <div className="player1" />
    );
}

function Player2(props) {
    return (
        <div className="player2" />
    );
}

class Board extends React.Component {
    constructor(props) {
      super(props);
      this.onSquareClick = this.onSquareClick.bind(this);
      this.onHWallClick = this.onHWallClick.bind(this);
      this.onVWallClick = this.onVWallClick.bind(this);
      this.state = {
        squares: [
            [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0],
        ],
        playerOneCoord : [0,8],
        playerTwoCoord : [16,8],
        playerTurn : 1,
        playerOneWalls : 10,
        playerTwoWalls : 10,
      };
    }

    nextPlayer() {
        if (this.state.playerTurn === 1) {
            return(2)
        } else {
            return(1)
        }
    }

    isSameCoord(coord1, coord2) {
        if (coord1[0] === coord2[0] && coord1[1] === coord2[1]) {
            return true
        } else {
            return false
        }
    }

    // TODO: if player is already there
    validMoves(player_coord, current_squares) {
        let allValidMoves = [];

        if (player_coord[0]-2 >= 0) {
            if (current_squares[player_coord[0]-1][player_coord[1]] === 0) {
                allValidMoves.push([player_coord[0]-2, player_coord[1]]);
            }
        }

        if (player_coord[1]-2 >= 0) {
            if (current_squares[player_coord[0]][player_coord[1]-1] === 0) {
                allValidMoves.push([player_coord[0], player_coord[1]-2]);
            }
        }

        if (player_coord[0]+2 <= 16) {
            if (current_squares[player_coord[0]+1][player_coord[1]] === 0) {
                allValidMoves.push([player_coord[0]+2, player_coord[1]]);
            }
        }

        if (player_coord[1]+2 <= 16) {
            if (current_squares[player_coord[0]][player_coord[1]+1] === 0) {
                allValidMoves.push([player_coord[0], player_coord[1]+2]);
            }
        }

        return allValidMoves
    }

    hasWallsLeft(player) {
        if (player === 1 && this.state.playerOneWalls > 0) {
            return true
        } else if (player === 2 && this.state.playerTwoWalls > 0) {
            return true
        } else {
            return false
        }
    }

    hasPath(player, current_squares) {
        var stack = [];
        var visited = new Set();
        var target_row;

        if (player === 1) {
            stack.push(this.state.playerOneCoord);
            target_row = 16;
        } else {
            stack.push(this.state.playerTwoCoord);
            target_row = 0;
        }
        while (stack.length > 0) {
            let traverse_node = stack.pop();
            let neighbours = this.validMoves(traverse_node, current_squares);

            if (traverse_node[0] === target_row) {
                return true;
            } else if (!(visited.has(this.formatNodeCoord(traverse_node)))) {
                visited.add(this.formatNodeCoord(traverse_node));
                for (let i=0; i < neighbours.length; i++) {
                    if (!(visited.has(this.formatNodeCoord(neighbours[i])))) {
                        stack.push(neighbours[i]);
                    }
                }
            }
        }

        return false
    }

    formatNodeCoord(coord) {
        return coord[0].toString() + "-" + coord[1].toString();
    }

    isValidWall(coord, wall_type) {
        let hypothetical_state = JSON.parse(JSON.stringify(this.state.squares));
        // console.log(hypothetical_state);
        // console.log(this.state.squares);
        // must have walls left
        if (!this.hasWallsLeft(this.state.playerTurn)) {
            return false;
        }

        if (wall_type === "h") {
            // can't go off board
            if (coord[1] >= 17 - 1) {
                return false;
            };
            // a wall isn't already there
            for (let i = 0; i < 3; i++) {
                if (hypothetical_state[coord[0]][coord[1]+ i] === 1) {
                    return false;
                }
            };
            // if a wall is put there, there is still a path
            for (let i = 0; i < 3; i++) {
                hypothetical_state[coord[0]][coord[1]+ i] = 1;
            };     

        } else if (wall_type === "v") {
            // can't go off board
            if (coord[0] >= 17 - 1) {
                return false;
            };
            // a wall isn't already there
            for (let i = 0; i < 3; i++) {
                if (hypothetical_state[coord[0]+i][coord[1]] === 1) {
                    return false;
                }
            };
            // if a wall is put there, there is still a path
            for (let i = 0; i < 3; i++) {
                hypothetical_state[coord[0]+i][coord[1]] = 1;
            };
        }

        if (this.hasPath(this.state.playerTurn, hypothetical_state) && this.hasPath(this.nextPlayer(), hypothetical_state)) {
            return true;
        } else {
            return false;
        }

    }

    onHWallClick(new_coord) {
        console.log(this.isValidWall(new_coord, "h"));
        if (this.isValidWall(new_coord, "h")) {
            let new_state = this.state.squares.slice();

            for (let i = 0; i < 3; i++) {
                new_state[new_coord[0]][new_coord[1]+ i] = 1;
            };

            if (this.state.playerTurn === 1) {
                this.setState({playerOneWalls: this.state.playerOneWalls - 1});
            } else {
                this.setState({playerTwoWalls: this.state.playerTwoWalls - 1});
            }

            this.setState({squares: new_state, playerTurn: this.nextPlayer()})
        }
    }

    onVWallClick(new_coord) {
        console.log(this.isValidWall(new_coord, "v"));
        if (this.isValidWall(new_coord, "v")) {
            let new_state = this.state.squares.slice();

            for (let i = 0; i < 3; i++) {
                new_state[new_coord[0]+i][new_coord[1]] = 1;
            };

            if (this.state.playerTurn === 1) {
                this.setState({playerOneWalls: this.state.playerOneWalls - 1});
            } else {
                this.setState({playerTwoWalls: this.state.playerTwoWalls - 1});
            };

            this.setState({squares: new_state, playerTurn: this.nextPlayer()})

        }
    }

    onSquareClick(new_coord) {
        let new_state = this.state.squares.slice();
        // console.log(this.validMoves(this.state.playerOneCoord));
        if (this.state.playerTurn === 1) {
            if (this.validMoves(this.state.playerOneCoord,this.state.squares).some((x) => {return(this.isSameCoord(new_coord, x))})) {
                new_state[this.state.playerOneCoord[0]][this.state.playerOneCoord[1]] = 0;
                new_state[new_coord[0]][new_coord[1]] = this.state.playerTurn;
                this.setState({squares: new_state, playerOneCoord: new_coord, playerTurn: this.nextPlayer()});
            }
        } else {
            if (this.validMoves(this.state.playerTwoCoord,this.state.squares).some((x) => {return(this.isSameCoord(new_coord, x))})) {
                new_state[this.state.playerTwoCoord[0]][this.state.playerTwoCoord[1]] = 0;
                new_state[new_coord[0]][new_coord[1]] = this.state.playerTurn;
                this.setState({squares: new_state, playerTwoCoord: new_coord, playerTurn: this.nextPlayer()});
            }
        }


    }

    renderSquare(coord) {
        return (
            <BigSquare coord={coord} player={this.state.squares[coord[0]][coord[1]]} onClick={this.onSquareClick}/>
        );
    }

    renderWall(coord, type) {
        if (type === "h") {
            return(<HWall coord={coord} blocked={this.state.squares[coord[0]][coord[1]]} onClick={this.onHWallClick}/>);
        } else if (type === "v") {
            return(<VWall coord={coord} blocked={this.state.squares[coord[0]][coord[1]]} onClick={this.onVWallClick}/>);
        } else {
            return(<SWall coord={coord} blocked={this.state.squares[coord[0]][coord[1]]}/>);
        }
    }

    makeRow(i) {
        return(
            <div className="row1">
                {this.renderSquare([i,0])}
                {this.renderWall([i,1], "v")}
                {this.renderSquare([i,2])}
                {this.renderWall([i,3], "v")}
                {this.renderSquare([i,4])}
                {this.renderWall([i,5], "v")}
                {this.renderSquare([i,6])}
                {this.renderWall([i,7], "v")}
                {this.renderSquare([i,8])}
                {this.renderWall([i,9], "v")}
                {this.renderSquare([i,10])}
                {this.renderWall([i,11], "v")}
                {this.renderSquare([i,12])}
                {this.renderWall([i,13], "v")}
                {this.renderSquare([i,14])}
                {this.renderWall([i,15], "v")}
                {this.renderSquare([i,16])}
            </div>
        );
    }

    makeWalls(i) {
        return (
            <div className="wall1">
                {this.renderWall([i,0], "h")}
                {this.renderWall([i,1], "s")}
                {this.renderWall([i,2], "h")}
                {this.renderWall([i,3], "s")}
                {this.renderWall([i,4], "h")}
                {this.renderWall([i,5], "s")}
                {this.renderWall([i,6], "h")}
                {this.renderWall([i,7], "s")}
                {this.renderWall([i,8], "h")}
                {this.renderWall([i,9], "s")}
                {this.renderWall([i,10], "h")}
                {this.renderWall([i,11], "s")}
                {this.renderWall([i,12], "h")}
                {this.renderWall([i,13], "s")}
                {this.renderWall([i,14], "h")}
                {this.renderWall([i,15], "s")}
                {this.renderWall([i,16], "h")}
            </div>
        );
    }

    makeBoard() {
        var s = []
        for (var i=0; i<17; i++) {
            if (i%2 === 0) {
                s.push(this.makeRow(i));
            } else {
                s.push(this.makeWalls(i));
            }
        }
        return s;
    }


    render() {
        // console.log(this.state.squares);
        this.makeBoard();

        // if someone won
        let status;
        if (this.state.playerOneCoord[0] === 16) {
            status = 'Winner: Player 1';
        } else if (this.state.playerTwoCoord[0] === 0) {
            status = 'Winner: Player 2';
        } else {
            status = 'Next Player: ' + this.state.playerTurn
        }

        return(
            <div className="screen">
                <h2>{status}</h2>
                <p className="walls-left1">P1 Walls Left: {this.state.playerOneWalls}</p>
                <div className="board">{this.makeBoard()}</div>
                <p className="walls-left2">P2 Walls Left: {this.state.playerTwoWalls}</p>
            </div>

        );
    }
}

class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>

        </div>
     );
    }
}

export default Game