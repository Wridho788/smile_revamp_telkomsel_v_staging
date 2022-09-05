import {
  Box,
  Button,
  Dialog,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  styled,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { FC, MouseEvent, useState } from "react";
import { H2, H3, PreTitle, SmallCopy, Gap } from "../../atoms";
import Title from "../../molecules/Title";
import { TableCustomized } from "../../molecules";

// data
import { DetailProgram as data } from "../../../mocks/program";

interface Data {
  title: string;
  description: string;
  period: string;
  total_redeem: number;
  keywords: any[];
  whitelists: any[];
  notifications: any[];
}
interface Props {
  open: boolean;
  onClose: (event: MouseEvent<HTMLElement>) => void;
  //   data: Data;
}

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));
function generate(element: React.ReactElement) {
  return [0, 1, 2, 3].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  //   border: "1px solid #000",
}));

const DialogDetail: FC<Props> = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog fullWidth maxWidth="md" open={props.open} onClose={props.onClose}>
      <Box
        sx={{
          padding: "20px 50px",
        }}
      >
        <Box>
          <H2>{data.title}</H2>
          <PreTitle>{data.description}</PreTitle>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            width: "100%",
          }}
        >
          <SmallCopy>{`Program Period: ${data.start} - ${data.end}`}</SmallCopy>
          <SmallCopy sx={{ fontStyle: "italic" }}>1 Month Remaining</SmallCopy>
        </Box>

        {/* Keyword */}

        <Gap width={0} height={30} />
        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                sx={{ textTransform: "none", borderRadius: "4px" }}
                color="info"
                size="small"
                variant="contained"
                startIcon={<AddIcon />}
              >
                Link new keyword
              </Button>
            </Box>
          </Box>
          <Box sx={{ width: "100%" }}></Box>
        </Box>
        <Gap width={0} height={5} />
        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: "100%" }}>
            <Grid
              sx={{
                maxHeight: 200,
                overflow: "auto",
              }}
              item
              xs={12}
              md={6}
            >
              <Demo>
                <List>
                  {data.keywords.map((data, idx) => (
                    <SmallCopy
                      key={`keywords__data__${idx}`}
                      sx={{
                        border: "1px solid rgba(0,0,0,.12)",
                        padding: "11px",
                      }}
                    >
                      {data}
                    </SmallCopy>
                  ))}
                </List>
              </Demo>
            </Grid>
          </Box>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            {/* <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                sx={{ textTransform: "none" }}
                color="info"
                size="small"
                variant="contained"
                startIcon={<>icon</>}
              >
                Link new keyword
              </Button>
            </Box> */}
            <Grid
              sx={{ display: "flex", justifyContent: "center" }}
              container
              spacing={2}
            >
              <Grid item md={4} xs={6}>
                <Item
                  sx={{ display: "flex", flexDirection: "column" }}
                  variant="outlined"
                  square
                >
                  <PreTitle>Total Redeem</PreTitle>
                  <PreTitle>{data.totalRedeem} Redeemption</PreTitle>
                </Item>
              </Grid>
              <Grid item md={4} xs={6}>
                <Item
                  sx={{ display: "flex", flexDirection: "column" }}
                  variant="outlined"
                  square
                >
                  <PreTitle>Total Redeem</PreTitle>
                  <PreTitle>{data.totalRedeem} Redeemption</PreTitle>
                </Item>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* end Keyword */}
        <Box sx={{ margin: "15px 0" }}>
          <SmallCopy>
            No keyword linked to this program yet, add new keyword
          </SmallCopy>
        </Box>

        {/* Segmentation */}
        <Title title="Segmentation" />
        <Gap width={0} height={20} />
        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: "100%" }}>
            <SmallCopy>Whitelists</SmallCopy>
            <Grid
              sx={{
                maxHeight: 200,
                overflow: "auto",
              }}
              item
              xs={12}
              md={6}
            >
              <Demo>
                <List>
                  {data.whitelists.map((data, idx) => (
                    <SmallCopy
                      key={`whitelists_data__${idx}`}
                      sx={{
                        border: "1px solid rgba(0,0,0,.12)",
                        padding: "11px",
                      }}
                    >
                      {data}
                    </SmallCopy>
                  ))}
                </List>
              </Demo>
            </Grid>
          </Box>
          <Gap width={30} height={0} />
          <Box sx={{ width: "100%" }}>
            <SmallCopy>Blacklists</SmallCopy>
            <Grid
              sx={{
                maxHeight: 200,
                overflow: "auto",
              }}
              item
              xs={12}
              md={6}
            >
              <Demo>
                <List>
                  {data.blacklists.map((data, idx) => (
                    <SmallCopy
                      key={`blacklists__data__${idx}`}
                      sx={{
                        border: "1px solid rgba(0,0,0,.12)",
                        padding: "11px",
                      }}
                    >
                      {data}
                    </SmallCopy>
                  ))}
                </List>
              </Demo>
            </Grid>
          </Box>
        </Box>
        {/* Notification */}

        <Gap width={0} height={20} />
        <Title title="Notification" />
        <Gap width={0} height={20} />
        <TableCustomized data={data.notifications} />
      </Box>
    </Dialog>
  );
};

export default DialogDetail;
