import React from 'react';
import { useState, useEffect } from 'react';
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
import { Toolbar } from 'primereact/toolbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {
  Add,
  DeleteForeverOutlined,
  DriveFileRenameOutlineOutlined,
} from '@mui/icons-material';

import { DrawerNav, Gap, H2, SmallCopy } from '../../components';
import PicInital from './initial';
import {
  useLazyPicTemplateForPrimeQuery,
  useAddPicMutation,
  useUpdatePicMutation,
  useDeletePicMutation,
} from 'redux/features/pic/pic-api-slice';
import { IPm } from 'redux/features/pic/interface';
import Swal from 'sweetalert2';

const Index = () => {
  // local state
  const [pics, setPics] = useState<any>();
  const [totalRecords, setTotalRecords] = useState<any>(0);
  const [lazyParams, setLazyParams] = useState<any>({
    first: 0,
    rows: 10,
    sortField: null,
    created_at: null,
    sortOrder: 1,
    filters: {
      msisdn: { value: '', matchMode: 'contains' },
      name: { value: '', matchMode: 'contains' },
    },
  });
  const [initialPic, setInitialPic] = useState({
    name: '',
    msisdn: '',
    email: '',
  });

  const [open, setOpen] = useState({
    filter: false,
    detail: false,
    add: false,
    edit: false,
    delete: false,
  });

  const [paginationPic, setPaginationPic] = useState({
    page: 0,
    limit: 10,
  });
  const [triger, setTriger] = useState(false);

  const [picDetail, setPicDetail] = useState<IPm | null>();

  const [loading, setLoading] = useState(false);

  const onPage = (event: any) => setLazyParams(event);

  const onSort = (event: any) => {
    setLazyParams(event);
  };

  const onFilter = (event: any) => {
    event['first'] = 0;
    setLazyParams(event);
  };
  // fetch Redux
  const [
    getPicList,
    { data: picList = { data: [PicInital] } },
  ] = useLazyPicTemplateForPrimeQuery();
  const [addPic, { isLoading: loadingAdd }] = useAddPicMutation();
  const [updatePic, { isLoading: loadingUpdate }] = useUpdatePicMutation();
  const [deletePic, { isLoading: loadingDelete }] = useDeletePicMutation();

  // spread data from fetch
  const dataPic = picList.data;

  // handler
  const onRowSelect = (event: any) => {
    setOpen({ ...open, detail: true });
    setPicDetail(event.data);
  };

  const onChange = (e: any) => {
    setInitialPic({ ...initialPic, [e.target.name]: e.target.value });
  };

  const onAddPic = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addPic(initialPic);
    setTriger((prev) => !prev);
    setInitialPic({
      name: '',
      msisdn: '',
      email: '',
    });
    setOpen({ ...open, add: false });
  };

  const onShowUpdateForm = async (data: typeof PicInital) => {
    setOpen({ ...open, edit: true });
    setPicDetail(data);
    setInitialPic(data as any);
  };
  const onUpdatePic = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = {
        _id: picDetail?._id,
        name: picDetail?.msisdn,
        msisdn: picDetail?.name,
        email: picDetail?.email,
      };
      await updatePic(data);
      Swal.fire({
        icon: 'success',
        title: 'Success...',
        text: 'PIC success updated.',
      });
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Update merchant is failed',
      });
    }

    setTriger((prev) => !prev);
    setOpen({ ...open, edit: false });
  };
  const onDeletePic = async (data: typeof picDetail) => {
    Swal.fire({
      title: 'Do you want to delete data?',
      showDenyButton: true,
      confirmButtonText: `Delete`,
      denyButtonText: `Don't Delete`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deletePic(data ? data._id : '');
        await Swal.fire('Deleted!', '', 'success');
        setTriger((prev) => !prev);
      } else if (result.isDenied) {
        Swal.fire('Data are not deleted', '', 'info');
      }
    });
  };
  // handle prime react

  let loadLazyTimeout: any = null;

  const loadLazyData = () => {
    setLoading(true);

    if (loadLazyTimeout) {
      clearTimeout(loadLazyTimeout);
    }

    loadLazyTimeout = setTimeout(async () => {
      const { data }: any = await getPicList({
        lazyEvent: JSON.stringify(lazyParams),
      });
      console.log(data?.payload, 'data payload');
      setPics(data.payload.data);
      setTotalRecords(data.payload.totalRecords);
      setLoading(false);
    }, Math.random() * 1000 + 250);
  };

  useEffect(() => {
    loadLazyData();
  }, [lazyParams]);

  //  Add
  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          sx={{ minWidth: '100px', backgroundColor: '#7B61FF' }}
          // icon="pi pi-plus"
          className='p-button-success mr-2'
          variant='contained'
          startIcon={<Add />}
          onClick={() => setOpen({ ...open, add: true })}>
          New
        </Button>
      </React.Fragment>
    );
  };
  // edit and delete
  const actionBodyTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        <IconButton
          sx={{ backgroundColor: '#83BB57', color: '#FFF' }}
          onClick={() => onShowUpdateForm(rowData)}>
          <DriveFileRenameOutlineOutlined />
        </IconButton>
        <IconButton
          sx={{ backgroundColor: '#ED0226', color: '#FFF' }}
          onClick={() => onDeletePic(rowData)}>
          <DeleteForeverOutlined />
        </IconButton>
      </React.Fragment>
    );
  };
  return (
    <DrawerNav>
      <Box
        sx={{
          paddingTop: '3vw',
          paddingLeft: '50px',
          paddingRight: '50px',
        }}>
        <H2>PIC MANAGEMENT</H2>
        <Gap width={0} height={20} />

        <Box>
          <Paper>
            <div className='card'>
              <Toolbar left={leftToolbarTemplate} />

              <DataTable
                lazy
                paginator
                scrollable
                dataKey='_id'
                filterDisplay='row'
                responsiveLayout='scroll'
                scrollDirection='both'
                selectionMode='single'
                rows={10}
                loading={loading}
                onPage={onPage}
                value={pics}
                onFilter={onFilter}
                totalRecords={totalRecords}
                first={lazyParams.first}
                filters={lazyParams.filters}
                onRowSelect={onRowSelect}>
                <Column
                  footer='MSISDN'
                  style={{ flexGrow: 1, flexBasis: '250px' }}
                  field='msisdn'
                  header='MSISDN'
                  sortable
                  filter
                  filterPlaceholder='Search by msisdn'
                />
                <Column
                  footer='NAME'
                  field='name'
                  header='Nama'
                  sortable
                  filter
                  filterPlaceholder='Search by name'
                  style={{ flexGrow: 1, flexBasis: '250px' }}
                />
                <Column
                  field='email'
                  footer='EMAIL'
                  header='EMAIL'
                  sortable
                  filter
                  filterPlaceholder='Search by email  '
                  style={{ flexGrow: 1, flexBasis: '250px' }}
                />
                <Column
                  body={actionBodyTemplate}
                  exportable={false}
                  style={{ minWidth: '8rem' }}
                />
              </DataTable>
            </div>
          </Paper>
        </Box>
      </Box>
      {/*=========================== Dialog of detail PIC ======================== */}
      <Dialog
        fullWidth
        open={open.detail}
        onClose={() => setOpen({ ...open, detail: false })}>
        <DialogTitle variant='h5'>
          PIC: {picDetail?.name && picDetail?.msisdn}
        </DialogTitle>
        <DialogContent>
          <SmallCopy>
            PIC Profile:{' '}
            {picDetail?.name && picDetail?.msisdn && picDetail?.email}
          </SmallCopy>
          <SmallCopy>
            Pic ID: {''}
            {picDetail?._id}
          </SmallCopy>
          <SmallCopy>
            PIC Level / Tier:{' '}
            {picDetail?.created_by?.job_level &&
              picDetail?.created_by?.job_level}
          </SmallCopy>
          <SmallCopy>
            PIC Location: {''}
            {picDetail?.created_by?.account_location.location}
          </SmallCopy>
        </DialogContent>
      </Dialog>
      {/*=========================== Dialog of Add PIC ======================== */}
      <Dialog
        fullWidth
        open={open.add}
        onClose={() => setOpen({ ...open, add: false })}
        sx={{ '& .MuiPaper-root': { overflowY: 'initial' } }}>
        <DialogTitle variant='h5'>Add Pic</DialogTitle>
        <Gap width={0} height={10} />
        <form onSubmit={onAddPic}>
          <DialogContent>
            <Stack sx={{ display: 'flex' }} px='3vw'>
              <Box sx={{ display: 'flex' }}>
                <TextField
                  size='small'
                  fullWidth
                  label='PIC Name'
                  value={picDetail?.name}
                  name='name'
                  onChange={onChange}
                  required
                />
              </Box>
              <Gap width={0} height={20} />
              <Box sx={{ display: 'flex' }}>
                <TextField
                  size='small'
                  fullWidth
                  label='PIC MSISDN'
                  value={picDetail?.msisdn}
                  name='msisdn'
                  onChange={onChange}
                  required
                />
              </Box>
              <Gap width={0} height={20} />
              <Box sx={{ display: 'flex' }}>
                <TextField
                  size='small'
                  fullWidth
                  label='PIC Email'
                  value={picDetail?.email}
                  name='email'
                  onChange={onChange}
                  required
                />
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Stack px='3vw'>
              <Button
                sx={{
                  background: '#7B61FF',
                  color: '#FFF',
                  '&:hover': {
                    color: '#7B61FF',
                  },
                }}
                autoFocus
                type='submit'>
                Create PIC
              </Button>
            </Stack>
          </DialogActions>
        </form>
        <Gap width={0} height={20} />
      </Dialog>

      {/*=========================== Dialog of Edit PIC ======================== */}
      {/* ============================================================================== */}
      <Dialog
        fullWidth
        open={open.edit}
        onClose={() => setOpen({ ...open, edit: false })}
        sx={{ '& .MuiPaper-root': { overflowY: 'initial' } }}>
        <DialogTitle variant='h5'>Update PIC</DialogTitle>
        <Gap width={0} height={10} />
        <form onSubmit={onUpdatePic}>
          <DialogContent>
            <Stack sx={{ display: 'flex' }} px='3vw'>
              <Box sx={{ display: 'flex' }}>
                <TextField
                  size='small'
                  fullWidth
                  label='PIC Name'
                  value={picDetail?.name}
                  name='name'
                  onChange={onChange}
                  required
                />
              </Box>
              <Gap width={0} height={20} />
              <Box sx={{ display: 'flex' }}>
                <TextField
                  size='small'
                  fullWidth
                  label='PIC MSISDN'
                  value={picDetail?.msisdn}
                  name='msisdn'
                  onChange={onChange}
                  required
                />
              </Box>
              <Gap width={0} height={20} />
              <Box sx={{ display: 'flex' }}>
                <TextField
                  size='small'
                  fullWidth
                  label='PIC Email'
                  value={picDetail?.email}
                  name='email'
                  onChange={onChange}
                  required
                />
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Stack px='3vw'>
              <Button
                sx={{
                  background: '#7B61FF',
                  color: '#FFF',
                  '&:hover': {
                    color: '#7B61FF',
                  },
                }}
                autoFocus
                type='submit'>
                Update Pic
              </Button>
            </Stack>
          </DialogActions>
        </form>
      </Dialog>
    </DrawerNav>
  );
};

export default Index;
