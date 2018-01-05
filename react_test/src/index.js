import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button >
  );
}

function Board(props) {
  function renderSquare(i) {
    return <Square
      value={props.squares[i]}
      onClick={() => props.onClick(i)}
    />;
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      winner: false,
      step_number: 0
    };
  }

  player = function(){
    return this.state.step_number % 2 === 0 ? "X" : "O";
  }

  calculateWinner = function (squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  handleClick = function (i) {
    const history = [...this.state.history];
    let squares = [...history[history.length - 1]]
    if (!this.state.winner && !squares[i]) {
      squares[i] = this.player();

      let player = this.player();
      let winner = true;
      if (!this.calculateWinner(squares)) {
        winner = false;
      }

      history.push(squares);

      this.setState({
        player: player,
        history: history,
        winner: winner,
        step_number: this.state.step_number + 1
      });
    }
  }

  jumpTo = function(woo){
    const history = this.state.history.slice(0, woo + 1);
    this.setState({
      step_number: woo,
      history: history,
      winner: !!this.calculateWinner(this.state.history[woo])
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.step_number];

    const winner = this.calculateWinner(current);
    let status;
    if (winner) {
      status = 'Winner!      ' + this.player();
    } else {
      status = 'Next player: ' + this.player();
    }

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key = {"move" + move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current} onClick={(i) => this.handleClick(i)} player={this.player()} />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
