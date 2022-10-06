import { FC } from 'react';
import ModalCustom from '@mui/material/Modal';
import {
  Typography,
  Box,
  Divider,
  Grid,
  IconButton,
  Stack,
  Paper,
  Card,
  CardContent,
  List,
} from '@mui/material';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { BodyCopy, Gap, SmallCopy, StepperPaper, Subtitle } from '../../atoms';
import { H2 } from 'components';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Close, Edit } from '@mui/icons-material';

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
  width: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const fontContent = {
  fontSize: 15,
  overflowWrap: 'break-word',
  paddingLeft: 5,
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
      <Box sx={style}>
        <Box>
          <H2>Notifications</H2>
          <BodyCopy>2 Unread Notifications</BodyCopy>
        </Box>
        <Gap width={0} height={3} />
        <Box sx={{ paddingTop: '3vw' }}>
          <Stack spacing={1}>
            <List>
              <Card>
                <Stack direction={'row'} justifyContent={'space-between'}>
                  <Stack direction='column' mt={1}>
                    <Grid container columnSpacing={2} rowSpacing={2}>
                      <Grid item xs={4}>
                        <Typography sx={fontContent}>
                          <b>No</b>
                        </Typography>
                        <Typography sx={fontContent}>1</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography sx={fontContent}>
                          <b>
                            Program Kejutan Ramadhan PostPaid need your approval
                          </b>
                        </Typography>
                        <Gap width={0} height={2} />
                        <Typography sx={fontContent}>3 Hours ago</Typography>
                      </Grid>
                    </Grid>
                  </Stack>
                  <IconButton>
                    <Close></Close>
                  </IconButton>
                </Stack>
              </Card>
            </List>
          </Stack>
        </Box>
      </Box>
    </ModalCustom>
  );
};

export default NotificationDetail;
