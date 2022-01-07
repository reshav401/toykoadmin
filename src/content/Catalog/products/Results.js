import React, { forwardRef, useEffect, useState } from 'react';
import Link from 'next/link';

import { useDispatch, useSelector } from 'src/store';
import { 
  deleteProduct, 
  getProducts,
  setLimit, 
  setPage, 
  setSortModel, 
} from 'src/slices/product';

import {
  Box,
  Card,
  Divider,
  Button,
  Zoom
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles';

import PreviewIcon from '@mui/icons-material/Preview';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/CloseTwoTone';

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

  const products = useSelector((state) => state.product.products);
  const productState = useSelector((state) => state.product);
  const page = useSelector((state) => state.product.page);
  const limit = useSelector((state) => state.product.limit);
  const count = useSelector((state) => state.product.count);
  const sortModel = useSelector((state) => state.product.sortModel);
  const loading = useSelector((state) => state.product.loading);
  const filters = useSelector((state) => state.product.filters);
  
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    dispatch(getProducts(productState));
  }, [page, limit, loading, sortModel, ]);

  const handleConfirmDelete = (id) => {
    setOpenConfirmDelete(true);
    setDeleteId(id)
  };

  const closeConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };

  const handleDeleteCompleted = () => {
    dispatch(deleteProduct(deleteId))

    setOpenConfirmDelete(false);

    enqueueSnackbar(("The product has been deleted"), {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      },
      TransitionComponent: Zoom
    });

    setDeleteId({});
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
            rows={products}
            page={page}
            columns={[
              {field: "SapCode", headerName: "SAP Code"},
              {field: "Name", headerName: "Name", flex: 2},
              {field: "Dcode", headerName: "Dcode"},
              {field: "Dname", headerName: "Dname", flex: 2},
              {
                field: "IsActive", headerName: "Is Active?", align: "center",
                renderCell: (params) => {
                  if(params.row.IsActive){
                    return(
                      <>
                        <CheckIcon />
                      </>
                    )
                  }

                  return(
                    <>
                      <CloseIcon />
                    </>
                  )
                }
              },
              {field: "CreatedAt", type: "dateTime", headerName:"Created At", flex: 1},
              {field: "UpdatedAt", type: "dateTime", headerName:"Updated At", flex: 1},
              {field: "actions",
                headerName: "Actions",
                sortable: false,
                flex: 2,
                renderCell: (params) => {
                  return (
                    <>
                      <Link href={"/catalog/products/" + params.row.id}>
                        <Button color="info"> <PreviewIcon /> </Button>
                      </Link>

                      <Link href={"/catalog/products/edit/" + params.row.id}>
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