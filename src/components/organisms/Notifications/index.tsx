import { FC } from 'react';
import ModalCustom from '@mui/material/Modal';
import {
  Typography,
  Box,
  Divider,
  Grid,
  IconButton,
  Stack,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Edit } from '@mui/icons-material';
import { BodyCopy, StepperPaper } from '../../atoms';
import { H2 } from 'components';

interface ModalProps {
  open: any;
  handleClose?: any;
  data?: any;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '45vw',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const fontContent = {
  fontSize: 12,
  overflowWrap: 'break-word',
};

const NotificationDetail: FC<ModalProps> = ({ open, handleClose, data }) => {
  const { _id, title, date_time, size } = data;

  return (
    <ModalCustom
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby='keep-mounted-modal-title'
      aria-describedby='keep-mounted-modal-description'
      sx={{ overflow: 'scroll' }}>
      <Box sx={style} minWidth={'30vw'} maxHeight={'90vh'}>
        {' '}
        <Box px={2}>
          <H2>Notifications</H2>
          <H2>2 unread Notifications</H2>
          <Table aria-label='simple table'>
            <TableRow>
              <TableCell>
                <Grid>
                  <Stack spacing={'1vw'}>
                    <Grid container columns={12.3}>
                      <Grid>
                        <Grid item xs={6}>
                          <Typography>No</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>1</Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={0.3} />
                      <Grid>
                        <Grid item xs={6}>
                          <Typography>Program Kejutan</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>2 Hours Ago</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Stack>
                </Grid>
              </TableCell>
            </TableRow>
          </Table>
        </Box>
      </Box>
    </ModalCustom>
  );
};

export default NotificationDetail;
