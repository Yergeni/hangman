import { easyWords } from "data/englishWords.json";
import { mediumWords } from "data/englishWords.json";
import { hardWords } from "data/englishWords.json";

import { LS_LEVEL_KEY } from "common/constants";
import { CacheService } from "common/localstorage.service"

import { LevelType } from "./types";

/**
 * Gets a random English word based on difficult
 * @returns A random English common word from the list
 */
export const getRandomWord = () => {
	const { getProperty } = CacheService;
	const level = getProperty(LS_LEVEL_KEY) as LevelType;
	
	let words = mediumWords;
	if (level === "easy") words = easyWords;
	if (level === "hard") words = hardWords;

	return words[Math.floor(Math.random() * words.length)];
};
