import React from 'react';
import { checkFinish, move, changeValue } from './perm2';

import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			player: 0,
			boxes: ['', '', '', '', '', '', '', '', ''],
			gameOver: false,
			permutation: [],
			permutation2: [],
			winner: '',
			train: false
		};

		this.movePlayer = this.movePlayer.bind(this);
		this.train = this.train.bind(this);
	}

	train() {
		const { train } = this.state;

		this.setState({ train: !train }, () => {
			if (this.state.train) {
				for (let i = 0; i < 2000; i++) {
					const state = '000000000';

					let currentMove = {
						reply: checkFinish(state).reply,
						currentPerm: ''
					};

					while (currentMove.reply === 'Continue') {
						currentMove = { ...move(state, '1') };

						const { permutation } = this.state;
						permutation.push(state);
						permutation.push(currentMove.currentPerm);

						this.setState({ permutation });

						if (currentMove.reply === 'Continue') {
							const { permutation2 } = this.state;
							permutation2.push(currentMove.currentPerm);
							currentMove = { ...move(currentMove.currentPerm, '2') };
							permutation2.push(currentMove.currentPerm);

							state = currentMove.currentPerm;

							this.setState({ permutation2 });

							if (currentMove.reply !== 'Continue') {
								if (currentMove.reply === 'Won') {
									changeValue(this.state.permutation, 'Won');
									changeValue(this.state.permutation2, 'Lose');
								} else {
									changeValue(this.state.permutation, 'Lose');
									changeValue(this.state.permutation2, 'Won');
								}
								this.setState({ gameOver: true, winner: checkFinish(currentMove.currentPerm).reply });
								break;
							}
						} else {
							if (currentMove.reply === 'Won') {
								changeValue(this.state.permutation, 'Won');
								changeValue(this.state.permutation2, 'Lose');
							} else {
								changeValue(this.state.permutation, 'Lose');
								changeValue(this.state.permutation2, 'Won');
							}
							this.setState({ gameOver: true, winner: checkFinish(currentMove.currentPerm).reply });
							break;
						}
					}
				}
			}
		});
	}

	movePlayer(index) {
		if (!this.state.gameOver) {
			const playerMove = this.state.player === 0 ? 'X' : 'O';
			let { boxes, permutation } = this.state;

			if (boxes[index] === '') {
				boxes[index] = playerMove;
				this.setState({ boxes }, () => {
					const currentPermutation = this.state.boxes
						.map(box => (box === '' ? '0' : box === 'X' ? '1' : '2'))
						.join('');
					if (checkFinish(currentPermutation).reply === 'Continue') {
						const { currentPerm, reply } = move(currentPermutation);

						let boxes = currentPerm.split('');
						boxes = boxes.map(box => (box === '0' ? '' : box === '1' ? 'X' : 'O'));

						permutation.push(currentPermutation);
						permutation.push(currentPerm);

						if (reply !== 'Continue') {
							changeValue(this.state.permutation, reply);
							this.setState({ gameOver: true, winner: reply });
						}
						this.setState({ boxes, permutation });
					} else {
						changeValue(this.state.permutation, checkFinish(currentPermutation).reply);
						this.setState({ gameOver: true, winner: checkFinish(currentPermutation).reply });
					}
				});
			}
		}
	}

	reload() {
		window.location.reload();
	}

	render() {
		return (
			<div className="board">
				<h1 className="heading">MENACE</h1>
				<div className="row">
					<div className="box box0" onClick={() => this.movePlayer(0)}>
						{this.state.boxes[0]}
					</div>
					<div className="box box1" onClick={() => this.movePlayer(1)}>
						{this.state.boxes[1]}
					</div>
					<div className="box box2" onClick={() => this.movePlayer(2)}>
						{this.state.boxes[2]}
					</div>
				</div>
				<div className="row">
					<div className="box box3" onClick={() => this.movePlayer(3)}>
						{this.state.boxes[3]}
					</div>
					<div className="box box4" onClick={() => this.movePlayer(4)}>
						{this.state.boxes[4]}
					</div>
					<div className="box box5" onClick={() => this.movePlayer(5)}>
						{this.state.boxes[5]}
					</div>
				</div>
				<div className="row">
					<div className="box box6" onClick={() => this.movePlayer(6)}>
						{this.state.boxes[6]}
					</div>
					<div className="box box7" onClick={() => this.movePlayer(7)}>
						{this.state.boxes[7]}
					</div>
					<div className="box box18" onClick={() => this.movePlayer(8)}>
						{this.state.boxes[8]}
					</div>
				</div>
				<div className="winner">
					{this.state.winner !== ''
						? this.state.winner === 'Draw'
							? this.state.winner
							: `You ${this.state.winner}`
						: null}
				</div>
				<div className="reload">
					<button onClick={this.reload}>Reload</button>
					<button onClick={this.train}>MENACE Vs. MENACE</button>
				</div>
			</div>
		);
	}
}

export default App;
