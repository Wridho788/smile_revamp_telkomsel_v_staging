import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const DarkButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  textTransform: "none",
  borderRadius: 50,
}));

export default DarkButton;
