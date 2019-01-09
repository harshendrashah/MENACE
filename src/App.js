import React from 'react';

import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			player: 0,
			boxes: ['', '', '', '', '', '', '', '', '', '', '', '']
		};

		this.move = this.move.bind(this);
	}

	move(index) {
		const playerMove = this.state.player === 0 ? 'X' : 'O';
		let { boxes, player } = this.state;

		if (boxes[index] === '') {
			player = (player + 1) % 2;
			boxes[index] = playerMove;
			this.setState({ boxes, player });
		}
	}

	render() {
		return (
			<div className="board">
				<h1 className="heading">MENACE</h1>
				<div className="row">
					<div className="box box0" onClick={() => this.move(0)}>
						{this.state.boxes[0]}
					</div>
					<div className="box box1" onClick={() => this.move(1)}>
						{this.state.boxes[1]}
					</div>
					<div className="box box2" onClick={() => this.move(2)}>
						{this.state.boxes[2]}
					</div>
				</div>
				<div className="row">
					<div className="box box3" onClick={() => this.move(3)}>
						{this.state.boxes[3]}
					</div>
					<div className="box box4" onClick={() => this.move(4)}>
						{this.state.boxes[4]}
					</div>
					<div className="box box5" onClick={() => this.move(5)}>
						{this.state.boxes[5]}
					</div>
				</div>
				<div className="row">
					<div className="box box6" onClick={() => this.move(6)}>
						{this.state.boxes[6]}
					</div>
					<div className="box box7" onClick={() => this.move(7)}>
						{this.state.boxes[7]}
					</div>
					<div className="box box18" onClick={() => this.move(8)}>
						{this.state.boxes[8]}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
