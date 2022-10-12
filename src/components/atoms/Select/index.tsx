import { useState } from "react";
import {
	FormControl,
	Select,
	MenuItem,
	SelectChangeEvent,
	OutlinedInput,
	Grid,
	Box
} from "@mui/material";
import * as React from "react";
import { BodyCopy } from "../Typography";
import { ISelectProps } from "./types";

import AddProgramGroup from "components/organisms/ProgramGroup/AddProgramGroup";
import ModalAddProgramGroup from "components/organisms/ProgramGroup/ModalAddProgramGroup";

const Index: React.FunctionComponent<ISelectProps> = ({
	label,
	placeholder,
	options,
	optionLabel = "set_value",
	optionValue = "_id",
	value,
	handleChange,
	totalColumn = 10,
	leftColumn = 4,
	rightColumn = 6,
	direction = "row",
	isRequired = true,
	handleRefetch,
	...props
}) => {
	const [showInput, setShowInput] = useState<boolean>(false);

	return (
		<Grid
			container
			columns={!label || direction === "column" ? rightColumn : totalColumn}
			alignItems={"center"}
		>
			{showInput && (
				<ModalAddProgramGroup
					open={showInput}
					handleClose={() => setShowInput(false)}
					handleRefetch={handleRefetch}
					handleChange={handleChange}
				/>
			)}
			<Grid
				item
				xs={!label ? 0 : direction === "column" ? rightColumn : leftColumn}
				pt={0.8}
			>
				<Grid container>
					<Grid>
						<BodyCopy>{label}</BodyCopy>
					</Grid>
					{isRequired && (
						<Grid>
							<BodyCopy color={"red"} sx={{ marginLeft: "5px" }}>
								*
							</BodyCopy>
						</Grid>
					)}
				</Grid>
			</Grid>
			<Grid item xs={rightColumn} mt={direction === "column" ? "0.3vw" : 0}>
				<FormControl sx={{ width: "100%" }}>
					<Select
						required={isRequired}
						value={value}
						onChange={(event: SelectChangeEvent) => {
							handleChange(event.target.value);
						}}
						displayEmpty
						size="small"
						input={<OutlinedInput />}
						inputProps={{ "aria-label": "Without label" }}
						MenuProps={{ style: { zIndex: 9999 } }}
						{...props}
					>
						<MenuItem value="">{placeholder}</MenuItem>
						{typeof options !== "undefined" &&
							options.map((data: any, idx: number) => (
								<MenuItem
									key={`option__item__${idx}`}
									value={data?.[optionValue]}
								>
									{data?.[optionLabel]}
								</MenuItem>
							))}

						{label === "Program Group" && (
							<AddProgramGroup handleShow={() => setShowInput(true)} />
						)}
					</Select>
				</FormControl>
			</Grid>
		</Grid>
	);
};

export default Index;
