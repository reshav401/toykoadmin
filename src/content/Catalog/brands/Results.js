import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { useDispatch, useSelector } from 'src/store';
import { 
  getBrands,
  deleteBrand,
  setLimit, 
  setPage, 
  setSortModel, 
  setFilters,
} from 'src/slices/brand';


import {
  Box,
  Card,
  Divider,
  Button,
  Zoom,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles';

import PreviewIcon from '@mui/icons-material/Preview';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import { useSnackbar } from 'notistack';
import DeleteDialog from 'src/components/DeleteDialog';
import { getAllDivisions } from 'src/slices/division';
import { getAllVerticals } from 'src/slices/vertical';

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

  const brands = useSelector((state) => state.brand.brands);
  const brandState = useSelector((state) => state.brand);
  const page = useSelector((state) => state.brand.page);
  const limit = useSelector((state) => state.brand.limit);
  const count = useSelector((state) => state.brand.count);
  const sortModel = useSelector((state) => state.brand.sortModel);
  const loading = useSelector((state) => state.brand.loading);
  const filters = useSelector((state) => state.brand.filters);

  const [Name, setName] = useState(filters.Name || "");
  const [DivisionId, setDivisionId] = useState(filters.DivisionId || "");
  const [VerticalId, setVerticalId] = useState(filters.VerticalId || "")
  const [divisions, setDivisions] = useState([]);
  const [verticals, setVerticals] = useState([]);
  
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    dispatch(getBrands(brandState));
  }, [page, limit, sortModel, filters]);

  const handleConfirmDelete = (id) => {
    setOpenConfirmDelete(true);
    setDeleteId(id);
  };

  const closeConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };

  const handleDeleteCompleted = () => {
    dispatch(deleteBrand(deleteId))
    dispatch(getVerticals(brandState));

    setOpenConfirmDelete(false);

    enqueueSnackbar(("The vertical has been removed"), {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      },
      TransitionComponent: Zoom
    });

    setDeleteId({});
  };

  const handleFilter = (e) => {
    e.preventDefault();

    const filters = {
      Name,
      DivisionId,
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
                xs={2.4}
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
                xs={2.4}
              >
                <FormControl fullWidth>
                    <InputLabel id="division-select-tag">Division</InputLabel>
                    <Select
                      labelId="division-select-tag"
                      name="DivisionId"
                      label="Division"
                      value={DivisionId}
                      onChange={(e) => setDivisionId(e.target.value)}
                      variant="outlined"
                    >
                      <MenuItem value={""}>All</MenuItem>
                      {divisions.map((division, key) => (
                        <MenuItem key={key} value={division.Id}>{division.Name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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

        <div style={{ width: '100' }}>
          <DataGridWrapper
            rows={brands}
            page={page}
            columns={[
              {field: "Name", headerName: "Name", flex: 1},
              {field: "DivisionName", headerName: "Division", flex: 1, sortable: false },
              {field: "CreatedAt", type: "dateTime", headerName:"Created At", flex: 1},
              {field: "UpdatedAt", type: "dateTime", headerName:"Updated At", flex: 1},
              {field: "actions",
                headerName: "Actions",
                sortable: false,
                flex: 1,
                renderCell: (params) => {
                  return (
                    <>
                      <Link href={"/catalog/verticals/" + params.row.id}>
                        <Button color="info"> <PreviewIcon /> </Button>
                      </Link>

                      <Link href={"/catalog/verticals/edit/" + params.row.id}>
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
        openConfirmDelete={openConfirmDelete}
        handleDeleteCompleted={handleDeleteCompleted}
        closeConfirmDelete={closeConfirmDelete}
      />
    </>
  )
};


export default Results;