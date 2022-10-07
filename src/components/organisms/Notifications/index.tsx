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
  ListItem,
} from '@mui/material';
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
  width: 800,
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
          <Stack spacing={2}>
            <List
              sx={{
                width: '100%',
                height: '100%',
              }}>
              <ListItem alignItems='flex-start'>
                <Card>
                  <Stack direction={'row'} justifyContent={'space-between'}>
                    <Stack direction='column' mt={1}>
                      <Grid container>
                        <Grid item xs={2} sm={2}>
                          <Typography sx={fontContent} width={'100%'}>
                            <b>No</b>
                          </Typography>
                          <Typography sx={fontContent}>1</Typography>
                        </Grid>
                        <Grid item xs={10} sm={10} lg={10}>
                          <Typography>
                            Program Kejutan Ramadhan PostPaid need your approval
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
              </ListItem>
              <ListItem alignItems='flex-start'>
                <Card>
                  <Stack direction={'row'} justifyContent={'space-between'}>
                    <Stack direction='column' mt={1}>
                      <Grid container>
                        <Grid item xs={2}>
                          <Typography sx={fontContent} width={'100%'}>
                            <b>No</b>
                          </Typography>
                          <Typography sx={fontContent}>1</Typography>
                        </Grid>
                        <Grid item xs={11} sm={10} lg={2}>
                          <Typography>
                            Program Kejutan Ramadhan PostPaid need your approval
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
              </ListItem>
              <ListItem alignItems='flex-start'>
                <Card>
                  <Stack direction={'row'} justifyContent={'space-between'}>
                    <Stack direction='column' mt={1}>
                      <Grid container>
                        <Grid item xs={2}>
                          <Typography sx={fontContent} width={'100%'}>
                            <b>No</b>
                          </Typography>
                          <Typography sx={fontContent}>1</Typography>
                        </Grid>
                        <Grid item xs={11} sm={10} lg={2}>
                          <Typography>
                            Program Kejutan Ramadhan PostPaid need your approval
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
              </ListItem>
            </List>
          </Stack>
        </Box>
      </Box>
    </ModalCustom>
  );
};

export default NotificationDetail;
