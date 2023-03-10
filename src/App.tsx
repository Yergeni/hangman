import { KeyboardEvent, useCallback, useEffect, useState } from "react";

import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Settings from "./components/Settings";
import Keyboard from "./components/Keyboard";
import HangmanWord from "./components/HangmanWord";
import HangmanDrawing from "./components/HangmanDrawing";
import SettingsIcon from "@mui/icons-material/Settings";

import { getRandomWord } from "./common/utils";

import "./App.css";

const tryAgainWording = "- Refresh or press ENTER to try again";

function App() {
	const [wordToGuess, setWordToGuess] = useState<string>(getRandomWord());
	const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
	const [openSettings, setOpenSettings] = useState(false);

	// Incorrect selected letters
	const incorrectLetters = selectedLetters.filter(
		(letter) => !wordToGuess.includes(letter)
	);

	// Correct selected letters
	const correctLetters = selectedLetters.filter((letter) =>
		wordToGuess.includes(letter)
	);

	const isLoser = incorrectLetters.length >= 6;
	const isWinner = wordToGuess
		.split("")
		.every((letter) => selectedLetters.includes(letter));

	const isGameOver = isWinner || isLoser;

	// Use useCallback to avoid rerenders
	const addToSelectedLetter = useCallback(
		(letter: string) => {
			if (selectedLetters.includes(letter) || isGameOver) return;
			setSelectedLetters((letters) => [...letters, letter]);
		},
		[selectedLetters, isGameOver]
	);

	const handleOpenCloseSettings = () => {
		setOpenSettings((prev) => !prev);
	};

	const restartGame = () => {
		setSelectedLetters([]);
		setWordToGuess(getRandomWord());
	};

	const handleApplySettings = () => {
		restartGame();
		handleOpenCloseSettings();
	};

	// Handle real keyboard event letters
	useEffect(() => {
		const handler = (event: KeyboardEvent) => {
			const { key } = event;
			if (!key.match(/^[a-z]$/)) return;

			event.preventDefault();
			addToSelectedLetter(key);
		};
		//@ts-ignore
		document.addEventListener("keypress", handler);
		
		//@ts-ignore
		return () => document.removeEventListener("keypress", handler);
	}, [selectedLetters]);
	
	// Handle pressing ENTER key
	useEffect(() => {
		const handler = (event: KeyboardEvent) => {
			const { key } = event;
			if (key !== "Enter") return;
			
			event.preventDefault();
			restartGame();
		};
		
		//@ts-ignore
		document.addEventListener("keypress", handler);
		
		//@ts-ignore
		return () => document.removeEventListener("keypress", handler);
	}, [selectedLetters]);

	return (
		<>
			<SettingsIcon
				color="disabled"
				sx={{ cursor: "pointer", fontSize: 40 }}
				onClick={handleOpenCloseSettings}
			/>
			<div className="main-container">
				<Drawer
					open={openSettings}
					onClose={handleOpenCloseSettings}
					anchor="left"
				>
					<Settings handleApplyChanges={handleApplySettings} />
				</Drawer>
				{/* Result */}
				<Typography variant="subtitle1" textAlign="center">
					{isWinner && `Winner!!! ${tryAgainWording}`}
					{isLoser && `Nice try ${tryAgainWording}`}
				</Typography>

				<HangmanDrawing incorrectLetters={incorrectLetters.length} />

				<HangmanWord
					wordToGuess={wordToGuess}
					selectedLetters={selectedLetters}
					reveal={isLoser}
					isWinner={isWinner}
				/>

				<div className="keyboard-container">
					<Keyboard
						correctLetters={correctLetters}
						incorrectLetters={incorrectLetters}
						addToSelectedLetters={addToSelectedLetter}
						isGameOver={isGameOver}
					/>
				</div>
			</div>
		</>
	);
}

export default App;
