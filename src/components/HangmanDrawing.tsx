import {
	Body,
	Head,
	LeftHand,
	LeftLeg,
	RighHand,
	RightLeg,
} from "./HangmanBody";

import "./HangmanDrawing.css";

type HangmanDrawingProps = {
	incorrectLetters: number;
};

const BODY_PARTS = [
	<Head />,
	<Body />,
	<RighHand />,
	<LeftHand />,
	<RightLeg />,
	<LeftLeg />,
];
function HangmanDrawing({ incorrectLetters }: HangmanDrawingProps) {
	return (
		<div className="drawing-container">
			{/* {BODY_PARTS.slice(0, incorrectLetters)} */}
			{incorrectLetters > 0 && <Head />}
			{incorrectLetters > 1 && <Body />}
			{incorrectLetters > 2 && <RighHand />}
			{incorrectLetters > 3 && <LeftHand />}
			{incorrectLetters > 4 && <RightLeg />}
			{incorrectLetters > 5 && <LeftLeg />}
			{/* Hang hook */}
			<div className="hang-hook" />
			{/* Hang top */}
			<div className="hang-top" />
			{/* Hang Pole */}
			<div className="hang-pole" />
			{/* Hang Base */}
			<div className="hang-base" />
		</div>
	);
}

export default HangmanDrawing;
