import { styled } from "@mui/material/styles";
import GridViewIcon from "@mui/icons-material/GridView";

const CardButton = styled(GridViewIcon)(({ theme }) => ({
  borderRadius: "0.5vw",
  padding: "0.3vw",
  fontSize: "1.5vw",
  cursor: "pointer",
}));

export default CardButton;
