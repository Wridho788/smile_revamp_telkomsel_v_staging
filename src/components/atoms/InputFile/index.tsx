import React from "react";
import { CardContent, Fab, Grid, InputLabel } from "@mui/material";
import { AddPhotoAlternate } from "@mui/icons-material";

interface IProps {
  height: number;
  onSelectFile: (event: React.FormEvent<HTMLInputElement>) => void;
  preview: string;
}
const InputFile = ({ height, onSelectFile, preview }: IProps) => {
  return (
    <React.Fragment>
      <InputLabel>Partner Logo</InputLabel>
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: `${height}px`,
          background: "rgb(245, 245, 245)",
          borderRadius: "5px",
        }}
      >
        {preview ? (
          <img
            src={preview}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            alt="preview"
          />
        ) : (
          <>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="contained-button-file"
              multiple
              type="file"
              onChange={onSelectFile}
              value=""
            />
            <label htmlFor="contained-button-file">
              <Fab component="span">
                <AddPhotoAlternate />
              </Fab>
            </label>
          </>
        )}
      </CardContent>
    </React.Fragment>
  );
};

export default InputFile;
