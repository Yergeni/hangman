import { useState } from "react";
import "./Keyboard.css";

const ALPHABET = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
];

type KeyboardProps = {
	correctLetters: string[];
	incorrectLetters: string[];
	addToSelectedLetters: (letter: string) => void;
	isGameOver: boolean;
};

function Keyboard({
	correctLetters,
	incorrectLetters,
	addToSelectedLetters,
	isGameOver = false
}: KeyboardProps) {
	return (
		<div className="keyboard">
			{ALPHABET.map((letter) => {
				const isCorrect = correctLetters.includes(letter);
				const isIncorrect = incorrectLetters.includes(letter);
				return (
					<button
						key={letter}
						className={`btn ${isCorrect ? "active" : ""} ${
							isIncorrect ? "inactive" : ""
						}`}
						onClick={() => addToSelectedLetters(letter)}
            disabled={isIncorrect || isGameOver}
					>
						{letter}
					</button>
				);
			})}
		</div>
	);
}

export default Keyboard;
