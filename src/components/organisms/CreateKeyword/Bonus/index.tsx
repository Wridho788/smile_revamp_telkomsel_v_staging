import * as React from "react";
import { Grid, Stack, IconButton, Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Select } from "../../../atoms";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { options } from "../../../../mocks/options";
import {useGetBonusTypeQuery, useGetKeywordTypeQuery} from "../../../../redux/features/lov/lov-api-slice";
import {useLocationBucketQuery} from "../../../../redux/features/location/location-api-slice";
import {FilterInitial} from "../../../../redux/utils/initial-general";
import {useEffect} from "react";
import {CreateKeywordInitial, KeywordBonusInitial} from "../../../../pages/CreateKeyword/initial";
interface IBonusProps {}

const Bonus: React.FunctionComponent<IBonusProps> = (props) => {
  const keywordCreate = CreateKeywordInitial
  const keywordBonus = KeywordBonusInitial
  const {data: bucketOption = {data: []}} = useLocationBucketQuery(FilterInitial)
  const {data: bonusTypeOption = {data: []}} = useGetBonusTypeQuery()
  const [index, setIndex] = React.useState<number>(0);
  const [type, setType] = React.useState<string>("");
  const [bucket, setBucket] = React.useState<string>(keywordCreate.keyword_bonus[index].bucket);
  const [quantity, setQuantity] = React.useState<string>("");
  const [granular, setGranular] = React.useState<string>("");
  const [bid, setBid] = React.useState<string>("");
  const [bonus, setBonus] = React.useState<string>("");
  const [totalRow, setTotalRow] = React.useState<number[]>([1]);
  const handleAddBonus = () =>{
    setIndex(index + 1)
    setTotalRow((prevState) => [...prevState, prevState.length])
    keywordBonus.bonus_type =type
    keywordBonus.bucket =bucket
    keywordCreate.keyword_bonus.push(keywordBonus)

  }
useEffect(()=>{
},[
    type,
    bucket
])
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
                options={bonusTypeOption.data}
                value={type}
                handleChange={setType}
              />
            </Grid>
            <Grid item xs={5} pr={"1.5vw"}>
              <Select
                direction="column"
                label="Bucket"
                placeholder="Option"
                options={bucketOption.data}
                value={bucket}
                handleChange={setBucket}
              />
            </Grid>
            <Grid item xs={5} pr={"1.5vw"}>
              <Select
                direction="column"
                label="Quantity"
                placeholder="Option"
                options={options}
                value={quantity}
                // handleChange={setQuantity}
              />
            </Grid>
            <Grid item xs={5} pr={"1.5vw"}>
              <Select
                direction="column"
                label="Granular"
                placeholder="Option"
                options={options}
                value={granular}
                // handleChange={setGranular}
              />
            </Grid>
            <Grid item xs={5} pr={"1.5vw"}>
              <Select
                direction="column"
                label="Bid"
                placeholder="Option"
                options={options}
                value={bid}
                // handleChange={setBid}
              />
            </Grid>
            <Grid item xs={5} pr={"1.5vw"}>
              <Select
                direction="column"
                label="Bonus"
                placeholder="Option"
                options={options}
                value={bonus}
                // handleChange={setBonus}
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
            onClick={() => handleAddBonus()}
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
