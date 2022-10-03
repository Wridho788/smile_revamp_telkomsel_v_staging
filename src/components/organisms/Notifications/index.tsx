import { FC } from 'react';
import ModalCustom from '@mui/material/Modal';
import { Grid, Stack, Box, Typography } from '@mui/material';
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
          <H2>{'User Detail'}</H2>
          <H2>{size} unread Notifications</H2>
          <Stack direction='column' mt={1}>
            <Typography sx={fontContent}>
              <b>tes</b>
            </Typography>
          </Stack>
        </Box>
      </Box>
    </ModalCustom>
  );
};

export default NotificationDetail;
