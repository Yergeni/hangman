import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type AlertDialogProps = {
	open: boolean;
	title: string;
	description: string;
	handleClose: React.Dispatch<React.SetStateAction<boolean>>;
	confirmAction: () => void;
	cancelAction?: () => void;
};

export default function AlertDialog({
	open,
	title,
	description,
	handleClose,
	confirmAction,
	cancelAction,
}: AlertDialogProps) {
	const handleCancelAction = () => {
		if (cancelAction) {
			cancelAction();
			return;
		}
		handleClose(!open);
	};
	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						<Typography color="">{description}</Typography>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						sx={{ textTransform: "capitalize" }}
						color="error"
						onClick={handleCancelAction}
					>
						Cancel
					</Button>
					<Button
						variant="contained"
						sx={{ textTransform: "capitalize" }}
						onClick={confirmAction}
						autoFocus
					>
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
