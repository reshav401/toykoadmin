import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { useDispatch, useSelector } from 'src/store';
import { 
  getDivisions,
  deleteDivision, 
  setLimit, 
  setPage, 
  setSortModel,
  setFilters,
} from 'src/slices/division';

import {
  Card,
  Divider,
  Button,
  Zoom,
  Box,
  TextField,
  Grid,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';

import PreviewIcon from '@mui/icons-material/Preview';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import { useSnackbar } from 'notistack';
import DeleteDialog from 'src/components/DeleteDialog';

const DataGridWrapper = styled(DataGrid)(
  () => ({
      border: 0,

  '& .MuiDataGrid-columnHeader': {
    backgroundColor: 'rgba(128,128,128,0.1)',
    height: 100
  }
}));

const Results = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const divisions = useSelector((state) => state.division.divisions);
  const divisionState = useSelector((state) => state.division);
  const page = useSelector((state) => state.division.page);
  const limit = useSelector((state) => state.division.limit);
  const count = useSelector((state) => state.division.count);
  const sortModel = useSelector((state) => state.division.sortModel);
  const loading = useSelector((state) => state.division.loading);
  const filters = useSelector((state) => state.division.filters);

  const [Name, setName] = useState(filters.Name || "");
  const [Abbreviation, setAbbreviation] = useState(filters.Abbreviation || "");
  
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    dispatch(getDivisions(divisionState));
  }, [page, limit, sortModel, filters, ])

  const handleConfirmDelete = (id) => {
    setOpenConfirmDelete(true);
    setDeleteId(id);
  };

  const closeConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };

  const handleDeleteCompleted = () => {
    dispatch(deleteDivision(deleteId));
    dispatch(getDivisions(divisionState));
    setOpenConfirmDelete(false);

    enqueueSnackbar(("Deleted Successfully"), {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      },
      TransitionComponent: Zoom
    });
    setDeleteId("");
  };

  const handleFilter = (e) => {
    e.preventDefault();

    const filters = {
      Name,
      Abbreviation
    }

    dispatch(setFilters(filters))
  }

  return (
    <>
      <Card
        sx={{
          mx: 4
        }}
      >
        <Box
          p={2}
        >
          <form onSubmit={handleFilter}>
            <Grid
              container
              alignItems="center"
              spacing={3}
            >
              <Grid
                item
                xs={2}
              >
                <TextField 
                  fullWidth
                  label="Name"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                  InputProps={{
                    endAdornment: 
                      Name && 
                        (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => {
                                setName("")
                              }}
                              edge="end"
                            >
                              <CancelIcon fontSize='small' /> 
                            </IconButton>
                          </InputAdornment>
                        )
                  }}
                />
              </Grid>

              <Grid
                item
                xs={2}
              >
                <TextField 
                  fullWidth
                  label="Abbreviation"
                  value={Abbreviation}
                  onChange={(e) => setAbbreviation(e.target.value)}
                  InputProps={{
                    endAdornment: 
                      Abbreviation && 
                        (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => {
                                setAbbreviation("")
                              }}
                              edge="end"
                            >
                              <CancelIcon fontSize='small' /> 
                            </IconButton>
                          </InputAdornment>
                        )
                  }}
                />
              </Grid>

              <Grid
                item
                xs={1.2}
              >
                <Button
                  fullWidth
                  startIcon={<FilterAltIcon />}
                  variant="contained"
                  type="submit"
                >
                  Filter
                </Button>
              </Grid>
            </Grid>
          </form>
          
          
        </Box>
        <Divider />

        {/* List Data Table /Data Grid */}
        <div style={{ width: '100' }}>
          <DataGridWrapper
            rows={divisions}
            page={page}
            columns={[
              //Table Data
              { field: 'Name', headerName: 'Name', flex: 1 },
              { field: 'Abbreviation', headerName: 'Abbreviation', flex: 1 },
              {
                field: 'CreatedAt',
                type: 'dateTime',
                headerName: 'Created At',
                flex: 1
              },
              {
                field: 'UpdatedAt',
                type: 'dateTime',
                headerName: 'Updated At',
                flex: 1
              },
              {
                field: 'actions',
                headerName: 'Actions',
                sortable: false,
                flex: 1,
                renderCell: (params) => {
                  return (
                    <>
                      <Link href={'/catalog/divisions/' + params.row.id}>
                        <Button color="info">
                          {' '}
                          <PreviewIcon />{' '}
                        </Button>
                      </Link>

                      <Link href={"/catalog/divisions/edit/" + params.row.id}>
                        <Button color="warning"> <EditIcon /> </Button>
                      </Link>
                    
                      <Button color="error" onClick={()=>handleConfirmDelete(params.row.id)}> <DeleteForeverIcon /> </Button>
                    </>
                  );
                }
              }
            ]}
            sortingMode="server"
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
        openConfirmDelete = {openConfirmDelete}
        closeConfirmDelete = {closeConfirmDelete}
      />
    </>
  );
};

export default Results;
