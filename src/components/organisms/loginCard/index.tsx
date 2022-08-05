import * as React from "react";
import { AlertCard, BodyCopy, Subtitle } from "../../../components";
import {
  Button,
  Card,
  Box,
  TextField,
  Divider,
  Grid,
  Dialog,
} from "@mui/material";
import Theme from "../../../style/Material-UI/theme";

const activeStyle = {
  borderRadius: "8px",
  backgroundColor: Theme.palette.primary.main,
  color: Theme.palette.secondary.main,
  "&:hover": {
    backgroundColor: Theme.palette.secondary.light,
    color: Theme.palette.secondary.main,
  },
};

const nonActiveStyle = {
  borderRadius: "8px",
  borderColor: "black",
  color: "black",
};

interface LoginCardProps {
  label?: string;
  title?: string;
  description?: string;
}

const Index: React.FC<LoginCardProps> = ({
  label,
  title,
  description,
}: LoginCardProps) => {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Card
          style={{
            width: "40%",
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Subtitle
            style={{
              paddingLeft: 30,
              paddingTop: 10,
              paddingBottom: 10,
              backgroundColor: "white",
            }}
          >
            Login Owner
          </Subtitle>
          <Divider
            orientation={"horizontal"}
            sx={{ borderBottomWidth: 2, color: "black" }}
          />
          <form>
            <Grid container alignItems="center" sx={{ padding: "20px" }}>
              <Grid container alignItems="center">
                <Grid item xs={4}>
                  <BodyCopy>Username</BodyCopy>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    name="Username"
                    type="text"
                    placeholder="Username"
                    label="Username"
                    margin="normal"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item xs={4}>
                  <BodyCopy>Password</BodyCopy>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    name="Password"
                    type="password"
                    placeholder="Password"
                    label="Password"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="center" sx={{ paddingTop: "10px" }}>
                <Grid item xs={4}></Grid>
                <Grid item xs={8}>
                  <Box
                    sx={{
                      display: "grid",
                      gridAutoFlow: "row",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: 1,
                    }}
                  >
                    <Button
                      onClick={() => {
                        setOpen(true);
                      }}
                      sx={activeStyle}
                    >
                      Login
                    </Button>
                    <Button sx={nonActiveStyle} variant="outlined">
                      Cancel
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Box>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <AlertCard />
      </Dialog>
    </>
  );
};
export default Index;
