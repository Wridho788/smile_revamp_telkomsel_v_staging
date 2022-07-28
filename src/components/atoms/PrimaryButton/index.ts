import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  textTransform: "none",
  borderRadius: "0.5vw",
  paddingInline: "1.5vw",
  paddingBlock: "0.7vw",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    filter: "brightness(95%)",
  },
}));

export default PrimaryButton;
