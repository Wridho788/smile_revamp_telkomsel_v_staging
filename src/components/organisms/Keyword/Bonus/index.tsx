import * as React from "react";
import { Grid, Stack, IconButton, Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Select } from "../../../atoms";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { options } from "../../../../mocks/options";

interface IBonusProps {}

const Bonus: React.FunctionComponent<IBonusProps> = (props) => {
  const [type, setType] = React.useState<string>("");
  const [bucket, setBucket] = React.useState<string>("");
  const [quantity, setQuantity] = React.useState<string>("");
  const [granular, setGranular] = React.useState<string>("");
  const [bid, setBid] = React.useState<string>("");
  const [bonus, setBonus] = React.useState<string>("");
  const [totalRow, setTotalRow] = React.useState<number[]>([1]);

  return (
    <Box pt="1vw">
      <Stack maxWidth={"100%"} spacing="3vw">
        {totalRow.map((_, idx) => (
          <Grid
            key={`rowItem__${idx}`}
            container
            columns={31}
            border="0.1vw solid rgba(0, 0, 0, 0.1)"
            borderRadius="0.3vw"
            p="3vw"
          >
            <Grid item xs={5} pr={"1.5vw"}>
              <Select
                direction="column"
                label="Type"
                placeholder="Option"
                options={options}
                value={type}
                setValue={setType}
              />
            </Grid>
            <Grid item xs={5} pr={"1.5vw"}>
              <Select
                direction="column"
                label="Bucket"
                placeholder="Option"
                options={options}
                value={bucket}
                setValue={setBucket}
              />
            </Grid>
            <Grid item xs={5} pr={"1.5vw"}>
              <Select
                direction="column"
                label="Quantity"
                placeholder="Option"
                options={options}
                value={quantity}
                setValue={setQuantity}
              />
            </Grid>
            <Grid item xs={5} pr={"1.5vw"}>
              <Select
                direction="column"
                label="Granular"
                placeholder="Option"
                options={options}
                value={granular}
                setValue={setGranular}
              />
            </Grid>
            <Grid item xs={5} pr={"1.5vw"}>
              <Select
                direction="column"
                label="Bid"
                placeholder="Option"
                options={options}
                value={bid}
                setValue={setBid}
              />
            </Grid>
            <Grid item xs={5} pr={"1.5vw"}>
              <Select
                direction="column"
                label="Bonus"
                placeholder="Option"
                options={options}
                value={bonus}
                setValue={setBonus}
              />
            </Grid>
            <Grid
              item
              xs={1}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <IconButton
                aria-label="delete"
                size="large"
                sx={{ color: "primary.main" }}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Box display="flex" justifyContent="center">
          <Button
            onClick={() =>
              setTotalRow((prevState) => [...prevState, prevState.length])
            }
            color="primary"
            variant="contained"
            startIcon={<AddBoxIcon fontSize="large" />}
            sx={{
              borderRadius: "0.3vw",
              paddingInline: "1.5vw",
              paddingBlock: "0.5vw",
            }}
          >
            Add
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default Bonus;
