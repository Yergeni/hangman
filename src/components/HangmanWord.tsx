import classNames from "classnames";

import "./HangmanWord.css";

type HangmanWordProps = {
	selectedLetters: string[];
	wordToGuess: string;
	reveal?: boolean; // reveals when player loses
	isWinner?: boolean;
};

function HangmanWord({
	selectedLetters,
	wordToGuess,
	reveal = false,
	isWinner = false,
}: HangmanWordProps) {
	return (
		<div className="container">
			{wordToGuess.split("").map((letter, index) => (
				<span key={index} className="letter">
					<span
						className={classNames({
							"letter-hidden": !selectedLetters.includes(letter) && !reveal,
							"letter-visible": selectedLetters.includes(letter) || reveal,
							"letter-missed": !selectedLetters.includes(letter) && reveal,
							"letter-winner": isWinner
						})}
					>
						{letter}
					</span>
				</span>
			))}
		</div>
	);
}

export default HangmanWord;
