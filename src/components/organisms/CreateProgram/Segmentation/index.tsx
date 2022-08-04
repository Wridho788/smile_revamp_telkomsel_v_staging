import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Pagination,
  Stack,
} from "@mui/material";
import { BodyCopy } from "../../../atoms";
import KeywordSearch from "../../../atoms/KeywordSearch";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import DeleteIcon from "@mui/icons-material/Delete";

interface ISegmentationProps {}

const Segmentation: React.FunctionComponent<ISegmentationProps> = (props) => {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const tabTitles = [
    "C. Type",
    "C. Tier",
    "C. Badges",
    "C. Location",
    "C. Brand",
    "C. ARPU",
    "C. Outlet",
    "MSSIDN",
  ];

  return (
    <Box
      border="0.1vw solid rgba(0, 0, 0, 0.1)"
      borderRadius="0.3vw"
      pt="2vw"
      pb="3vw"
      px="3vw"
    >
      <Tabs value={activeTab} onChange={handleChangeTab} centered>
        {tabTitles.map((tabTitle, idx) => (
          <Tab key={`tabTitle__${idx}`} label={tabTitle} sx={{ px: "2vw" }} />
        ))}
      </Tabs>
      <Grid container columns={11} mt="2vw" position="relative">
        <Grid
          item
          xs={5}
          border="0.1vw solid rgba(0, 0, 0, 0.1)"
          borderRadius="0.3vw"
          p="3vw"
        >
          <Stack spacing={"1vw"}>
            <BodyCopy pl="0.5vw">List of {tabTitles[activeTab]} Items</BodyCopy>
            <Grid container columns={10}>
              <Grid
                item
                xs={8}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <KeywordSearch
                  sx={{ minWidth: "100%", borderRadius: "0.3vw" }}
                />
              </Grid>
              <Grid
                item
                xs={2}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <IconButton
                  aria-label="filter"
                  size="large"
                  sx={{ color: "primary.main" }}
                >
                  <FilterAltIcon color="disabled" fontSize="inherit" />
                </IconButton>
              </Grid>
            </Grid>
            <FormGroup>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((_, idx) => (
                <Grid container columns={10} key={`checkActiveItem__${idx}`}>
                  <Grid
                    item
                    xs={8}
                    display="flex"
                    alignItems="center"
                    pl="0.5vw"
                  >
                    <FormControlLabel
                      key={`checkBox__${idx}`}
                      control={<Checkbox />}
                      label="Item List"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    visibility="hidden"
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
            </FormGroup>
          </Stack>
          <Stack direction="row" justifyContent="center" mt="2vw">
            <Pagination count={10} color="primary" shape="rounded" />
          </Stack>
        </Grid>
        <Grid
          item
          xs={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Stack spacing="1vw">
            <IconButton
              aria-label="rightArrow"
              size="large"
              sx={{
                color: "background.paper",
                bgcolor: "primary.main",
                borderRadius: "0.3vw",
              }}
            >
              <KeyboardDoubleArrowRightIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              aria-label="leftArrow"
              size="large"
              sx={{
                color: "background.paper",
                bgcolor: "primary.main",
                borderRadius: "0.3vw",
              }}
            >
              <KeyboardDoubleArrowLeftIcon fontSize="inherit" />
            </IconButton>
          </Stack>
        </Grid>
        <Grid
          item
          xs={5}
          border="0.1vw solid rgba(0, 0, 0, 0.1)"
          borderRadius="0.3vw"
          p="3vw"
        >
          <Stack spacing={"1vw"}>
            <BodyCopy pl="0.5vw">List of Choose Items</BodyCopy>
            <Grid container columns={10}>
              <Grid
                item
                xs={8}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <KeywordSearch
                  sx={{ minWidth: "100%", borderRadius: "0.3vw" }}
                />
              </Grid>
              <Grid
                item
                xs={2}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <IconButton
                  aria-label="filter"
                  size="large"
                  sx={{ color: "primary.main" }}
                >
                  <FilterAltIcon color="disabled" fontSize="inherit" />
                </IconButton>
              </Grid>
            </Grid>
            <FormGroup>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
                (_, idx) => (
                  <Grid container columns={10} key={`checkChooseItem__${idx}`}>
                    <Grid
                      item
                      xs={8}
                      display="flex"
                      alignItems="center"
                      pl="0.5vw"
                    >
                      <FormControlLabel
                        key={`checkBox__${idx}`}
                        control={<Checkbox />}
                        label="Item List"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={2}
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
                )
              )}
            </FormGroup>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Segmentation;
