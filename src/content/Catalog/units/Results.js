import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { useDispatch, useSelector } from 'src/store';
import { 
  getUnits,
  deleteUnit, 
  setLimit, 
  setPage, 
  setSortModel,
} from 'src/slices/unit';

import {
  Card,
  Divider,
  Button,
  Zoom,
  Box,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles';

import PreviewIcon from '@mui/icons-material/Preview';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import { useSnackbar } from 'notistack';
import DeleteDialog from 'src/components/DeleteDialog';

const DataGridWrapper = styled(DataGrid)(
  () => ({
      border: 0,

      '& .MuiDataGrid-columnHeader': {
        backgroundColor: 'rgba(128,128,128,0.1)',
      },
    })
);

const Results = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const units = useSelector((state) => state.unit.units);
  const unitState = useSelector((state) => state.unit);
  const page = useSelector((state) => state.unit.page);
  const limit = useSelector((state) => state.unit.limit);
  const count = useSelector((state) => state.unit.count);
  const sortModel = useSelector((state) => state.unit.sortModel);
  const loading = useSelector((state) => state.unit.loading);
  const filters = useSelector((state) => state.unit.filters);
  
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    dispatch(getUnits(unitState));
  }, [page, limit, sortModel, loading, ]);

  const handleConfirmDelete = (id) => {
    setOpenConfirmDelete(true);
    setDeleteId(id);
  };

  const closeConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };

  const handleDeleteCompleted = () => {
    dispatch(deleteDivision(deleteId));

    setOpenConfirmDelete(false);

    enqueueSnackbar(("The unit has been removed"), {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      },
      TransitionComponent: Zoom
    });
    setDeleteId("");
  };

  return (
    <>
      <Card
        sx={{
          mx: 4
        }}
      >
        <Box p={2}>
          
        </Box>

        <Divider />

        <div style={{ width: '100' }}>
          <DataGridWrapper
            rows={units}
            page={page}
            columns={[
              {field: "Name", headerName: "Name", flex: 1},
              {field: "CreatedAt", type: "dateTime", headerName:"Created At", flex: 1},
              {field: "UpdatedAt", type: "dateTime", headerName:"Updated At", flex: 1},
              {field: "actions",
                headerName: "Actions",
                sortable: false,
                flex: 1,
                renderCell: (params) => {
                  return (
                    <>
                      <Link href={"/catalog/units/" + params.row.id}>
                        <Button color="info"> <PreviewIcon /> </Button>
                      </Link>

                      <Link href={"/catalog/units/edit/" + params.row.id}>
                        <Button color="warning"> <EditIcon /> </Button>
                      </Link>
                    
                      <Button color="error" onClick={()=>handleConfirmDelete(params.row.id)}> <DeleteForeverIcon /> </Button>
                    </>
                  )
                }
              }
            ]}
            sortingMode='server'
            sortingOrder={['asc', 'desc']}
            sortModel = {sortModel}
            onSortModelChange={(newModel) => {
              dispatch(setSortModel(newModel))
              dispatch(setPage(0));
            }}
            pagination
            pageSize={limit}
            rowsPerPageOptions={[5, 10, 15]}
            rowCount={count}
            paginationMode="server"
            onPageChange={(newPage) => dispatch(setPage(newPage))}
            onPageSizeChange={(newPageSize) => dispatch(setLimit(newPageSize))}
            loading={loading}
            autoHeight
          />      
        </div>
      </Card>
      
      <DeleteDialog 
        handleDeleteCompleted = {handleDeleteCompleted}
        openConfirmDelete={openConfirmDelete}
        closeConfirmDelete={closeConfirmDelete}
      />
    </>
  )
};

export default Results;