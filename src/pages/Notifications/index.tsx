import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  TextField,
} from '@mui/material';
import {
  DrawerNav,
  Gap,
  H2,
  InputSearchable,
  PreTitle,
  SmallCopy,
} from '../../components';
const Notifications = () => {
  return (
    <DrawerNav>
      <Box
        sx={{
          paddingTop: '3vw',
          paddingLeft: '50px',
          paddingRight: '50px',
        }}>
        <H2>Notifications</H2>
      </Box>
    </DrawerNav>
  );
};

export default Notifications;
