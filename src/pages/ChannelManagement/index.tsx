import { useEffect, useState, Fragment } from 'react';
import {
    Box, Button, Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Paper, IconButton, Stack,
    TextField,
} from "@mui/material";
import { DrawerNav, Gap, H2, SmallCopy, BodyCopy } from "../../components";
import { DataTable } from "primereact/datatable";
import { Toolbar } from "primereact/toolbar";
import { Column } from "primereact/column";
import { useLazyChannelListPrimeQuery, useDeleteChannelMutation } from "../../redux/features/channel/channel-api-slice"
import { Add, DeleteForeverOutlined, DriveFileRenameOutlineOutlined } from '@mui/icons-material';

import Swal from 'sweetalert2';
import moment from "moment";

const Index = () => {

    const [channels, setChannels] = useState<any>();
    const [channelDetail, setChannelDetail] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [triger, setTriger] = useState(false);
    const [totalRecords, setTotalRecords] = useState<any>(0);
    const [open, setOpen] = useState({
        filter: false,
        detail: false,
        add: false,
        edit: false,
        delete: false,
    });

    const [lazyParams, setLazyParams] = useState<any>({
        first: 0,
        rows: 10,
        page: 1,
        sortField: null,
        sortOrder: null,
        filters: {
            code: { value: "", matchMode: "contains" },
            name: { value: "", matchMode: "contains" },
        },
    });

    const [initialChannel, setInitialChannel] = useState({
        name: '',
        code: '',
        ip: '',
        description: ''
    });

    const onChange = (e: any) => {
        setInitialChannel({ ...initialChannel, [e.target.name]: e.target.value });
    };

    const onPage = (event: any) => setLazyParams(event);
    const [getChannelList, { data: channelData }] = useLazyChannelListPrimeQuery();
    const [deleteChannel, { isLoading: loadingDelete }] = useDeleteChannelMutation();

    // handler
    const onRowSelect = (event: any) => {
        setOpen({ ...open, detail: true });
        setChannelDetail(event.data);
    };

    const onShowUpdateForm = async (data: any) => {
        setOpen({ ...open, edit: true });
        setChannelDetail(data);
        setInitialChannel(data);
      };

    const onDeleteChannel = async (data: any) => {
        Swal.fire({
            title: 'Do you want to delete data?',
            showDenyButton: true,
            confirmButtonText: `Delete`,
            denyButtonText: `Don't Delete`,
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                deleteChannel(data ? data._id : '');
                await Swal.fire('Deleted!', '', 'success');
                loadLazyData();
                setTriger((prev) => !prev);
            }
        });
    };

    let loadLazyTimeout: any = null;
    const loadLazyData = () => {
        setLoading(true);

        if (loadLazyTimeout) clearTimeout(loadLazyTimeout);

        loadLazyTimeout = setTimeout(async () => {
            const { data }: any = await getChannelList({
                lazyEvent: JSON.stringify(lazyParams),
            });

            setChannels(data?.payload?.data);
            setTotalRecords(data?.payload?.totalRecords);
            setLoading(false);
        }, Math.random() * 1000 + 250);
    };

    useEffect(() => {
        loadLazyData();
    }, [lazyParams]); // eslint-disable-line react-hooks/exhaustive-deps

    //  Add
    const leftToolbarTemplate = () => {
        return (
            <Fragment>
                <Button
                    sx={{ minWidth: '100px', backgroundColor: '#7B61FF' }}
                    // icon="pi pi-plus"
                    className='p-button-success mr-2'
                    variant='contained'
                    startIcon={<Add />}
                    onClick={() => setOpen({ ...open, add: true })}>
                    New
                </Button>
            </Fragment>
        );
    };

    const CreatedAtRender = (rowData: any) => {
        return <span>{moment(rowData?.created_at).format("MMMM DD, YYYY")}</span>;
    };

    // edit and delete
    const actionBodyTemplate = (rowData: any) => {
        return (
            <Fragment>
                <IconButton
                    sx={{ backgroundColor: '#83BB57', color: '#FFF', marginRight: "0.25rem" }}
                    onClick={() => onShowUpdateForm(rowData)}>
                    <DriveFileRenameOutlineOutlined />
                </IconButton>
                <IconButton
                    sx={{ backgroundColor: '#ED0226', color: '#FFF' }}
                    onClick={() => onDeleteChannel(rowData)}>
                    <DeleteForeverOutlined />
                </IconButton>
            </Fragment>
        );
    };

    return (
        <DrawerNav>
            <Box
                sx={{
                    paddingTop: "3vw",
                    paddingLeft: "50px",
                    paddingRight: "50px",
                }}
            >
                <H2>CHANNEL MANAGEMENT</H2>
                <Gap width={0} height={20} />

                <Box>
                    <Paper>
                        <div className='card'>
                            <Toolbar left={leftToolbarTemplate} />
                            <DataTable
                                lazy
                                paginator
                                scrollable
                                dataKey="_id"
                                responsiveLayout="scroll"
                                scrollDirection="both"
                                selectionMode="single"
                                rows={10}
                                loading={loading}
                                onPage={onPage}
                                onRowSelect={onRowSelect}
                                value={channels}
                                totalRecords={totalRecords}
                                first={lazyParams.first}
                                filters={lazyParams.filters}
                            >
                                <Column
                                    field='code'
                                    header='CODE'
                                    style={{ flexGrow: 1, flexBasis: "250px" }}
                                />

                                <Column
                                    field='name'
                                    header='NAME CHANNEL'
                                    style={{ flexGrow: 1, flexBasis: "250px" }}
                                />
                                <Column
                                    style={{ flexGrow: 1, flexBasis: "250px" }}
                                    field='created_at'
                                    header='CREATED AT'
                                    body={CreatedAtRender}
                                />
                                <Column
                                    style={{ minWidth: '8rem' }}
                                    body={actionBodyTemplate}
                                />
                            </DataTable>
                        </div>
                    </Paper>
                </Box>
            </Box>

            {/*=========================== Dialog of detail Channel ======================== */}
            <Dialog
                fullWidth
                open={open.detail}
                onClose={() => setOpen({ ...open, detail: false })}>
                <DialogTitle variant='h5'>
                    {channelDetail?.name}
                    <BodyCopy>Channel ID: {channelDetail?._id}</BodyCopy>
                </DialogTitle>
                <DialogContent>
                    <SmallCopy>
                        Channel code:
                        {channelDetail?.code}
                    </SmallCopy>
                    <SmallCopy>
                        Channel IP:
                        {channelDetail?.ip}
                    </SmallCopy>
                    <SmallCopy>
                        Created at:
                        {channelDetail?.created_at}
                    </SmallCopy>
                </DialogContent>
            </Dialog>

            {/*=========================== Dialog of add Channel ======================== */}
            <Dialog
                fullWidth
                open={open.add}
                onClose={() => setOpen({ ...open, add: false })}>
                <DialogTitle variant='h5'>Add Channel</DialogTitle>
                <Gap width={0} height={10} />
                <form >
                    <DialogContent>
                        <Stack sx={{ display: 'flex' }} px='3vw'>
                            <Box sx={{ display: 'flex' }}>
                                <TextField
                                    size='small'
                                    fullWidth
                                    label='Channel Name'
                                    value={channelDetail?.name}
                                    name='name'
                                    onChange={onChange}
                                    required
                                />
                                <TextField
                                    size='small'
                                    fullWidth
                                    label='Channel Code'
                                    value={channelDetail?.code}
                                    name='name'
                                    onChange={onChange}
                                    required
                                />
                                <TextField
                                    size='small'
                                    fullWidth
                                    label='Channel IP'
                                    value={channelDetail?.ip}
                                    name='name'
                                    onChange={onChange}
                                    required
                                />
                                <TextField
                                    size='small'
                                    fullWidth
                                    label='Description'
                                    value={channelDetail?.description}
                                    name='name'
                                    onChange={onChange}
                                    required
                                />
                            </Box>
                            <Gap width={0} height={20} />
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
                                Create Channel
                            </Button>
                        </Stack>
                    </DialogActions>
                </form>
                <Gap width={0} height={20} />
            </Dialog>

            {/*=========================== Dialog of Edit Channel ======================== */}
            <Dialog
                fullWidth
                open={open.edit}
                onClose={() => setOpen({ ...open, edit: false })}>
                <DialogTitle variant='h5'>Edit Channel</DialogTitle>
                <Gap width={0} height={10} />
                <form >
                    <DialogContent>
                        <Stack sx={{ display: 'flex' }} px='3vw'>
                            <Box sx={{ display: 'flex' }}>
                                <TextField
                                    size='small'
                                    fullWidth
                                    label='Channel Name'
                                    value={channelDetail?.name}
                                    name='name'
                                    onChange={onChange}
                                    required
                                />
                                <TextField
                                    size='small'
                                    fullWidth
                                    label='Channel Code'
                                    value={channelDetail?.code}
                                    name='name'
                                    onChange={onChange}
                                    required
                                />
                                <TextField
                                    size='small'
                                    fullWidth
                                    label='Channel IP'
                                    value={channelDetail?.ip}
                                    name='name'
                                    onChange={onChange}
                                    required
                                />
                                <TextField
                                    size='small'
                                    fullWidth
                                    label='Description'
                                    value={channelDetail?.description}
                                    name='name'
                                    onChange={onChange}
                                    required
                                />
                            </Box>
                            <Gap width={0} height={20} />
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
                                Update Channel
                            </Button>
                        </Stack>
                    </DialogActions>
                </form>
                <Gap width={0} height={20} />
            </Dialog>
        </DrawerNav>
    )
}

export default Index;