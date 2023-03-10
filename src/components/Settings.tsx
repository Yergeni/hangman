import React, { useEffect, useState } from "react";

import { Button, Box } from "@mui/material";
import AlertDialog from "./ui/molecules/AlertDialog";

import { LS_LEVEL_KEY } from "common/constants";
import { CacheService } from "common/localstorage.service";

import { LevelType } from "common/types";

import "./Settings.css";

type SettingsProps = {
	handleApplyChanges: () => void;
};

function Settings({ handleApplyChanges }: SettingsProps) {
	const [selecteLevel, setselecteLevel] = useState<LevelType>("medium");
	const [openDialog, setOpenDialog] = useState(false);

	const { getProperty, setProperty } = CacheService;

	const onLevelChange = ({
		target: { value },
	}: React.ChangeEvent<HTMLInputElement>) => {
		setselecteLevel(value as LevelType);
		setProperty(LS_LEVEL_KEY, value);
	};

	const handleOpenAlertDialog = () => {
		setOpenDialog((prev) => !prev);
	};

	useEffect(() => {
		const levelFromLS = getProperty(LS_LEVEL_KEY);
		if (levelFromLS) setselecteLevel(levelFromLS as LevelType);
	}, []);

	return (
		<Box px={6}>
			<p className="settings-level-title">Difficulty</p>
			<form className="form">
				<div className="form-control">
					<label className="label">
						<input
							type="radio"
							value="easy"
							checked={selecteLevel === "easy"}
							onChange={onLevelChange}
						/>
						Easy
					</label>
				</div>
				<div className="form-control">
					<label className="label">
						<input
							type="radio"
							value="medium"
							checked={selecteLevel === "medium"}
							onChange={onLevelChange}
						/>
						Medium
					</label>
				</div>
				<div className="form-control">
					<label className="label">
						<input
							type="radio"
							value="hard"
							checked={selecteLevel === "hard"}
							onChange={onLevelChange}
						/>
						Hard
					</label>
				</div>
			</form>
			<Button
				variant="contained"
				disableElevation
				size="large"
				color="info"
				sx={{ mt: 3, float: "right" }}
				onClick={handleOpenAlertDialog}
			>
				Apply
			</Button>
			<AlertDialog
				open={openDialog}
				title="Apply Settings?"
				description="Current game in progress will be lost. Do you want to continue?"
				handleClose={() => setOpenDialog(!openDialog)}
				confirmAction={handleApplyChanges}
			/>
		</Box>
	);
}

export default Settings;
