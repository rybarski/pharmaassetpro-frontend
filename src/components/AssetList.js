import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAssets, deleteAsset } from '../redux/actions/assetActions';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
  IconButton,
  TextField,
  Typography,
  Tooltip,
  TableSortLabel,
} from '@mui/material';
import { Edit, Visibility, Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Modal, Button } from 'react-bootstrap';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.text.primary,
}));

const AssetList = () => {
  const dispatch = useDispatch();
  const { assets, totalCount } = useSelector((state) => state.assets);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ column: 'id', direction: 'asc' });
  const [showModal, setShowModal] = useState(false);
  const [selectedAssetId, setSelectedAssetId] = useState(null);

  useEffect(() => {
    dispatch(fetchAssets(page + 1, search, rowsPerPage, sortConfig.column, sortConfig.direction));
  }, [dispatch, page, rowsPerPage, search, sortConfig]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(0);
  };

  const handleSortRequest = (column) => {
    const columnMap = {
      'Created At': 'createdAt',
      'Serial Number': 'serialNumber',
      'ID': 'id',
      'Type': 'type',
      'Model': 'model',
      'Status': 'status',
    };

    setSortConfig((prevConfig) => ({
      column: columnMap[column] || column.toLowerCase().replace(' ', ''),
      direction:
          prevConfig.column === (columnMap[column] || column.toLowerCase().replace(' ', '')) &&
          prevConfig.direction === 'asc'
              ? 'desc'
              : 'asc',
    }));
  };

  const handleDeleteClick = (assetId) => {
    setSelectedAssetId(assetId);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteAsset(selectedAssetId)).then(() => {
      dispatch(fetchAssets(page + 1, search, rowsPerPage, sortConfig.column, sortConfig.direction));
    });
    setShowModal(false);
    setSelectedAssetId(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAssetId(null);
  };

  return (
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          Asset List
        </Typography>

        <TextField
            label="Search"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleSearchChange}
        />

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {['ID', 'Created At', 'Type', 'Model', 'Serial Number', 'Status'].map((header) => (
                    <StyledTableCell key={header}>
                      <TableSortLabel
                          active={sortConfig.column === header.toLowerCase().replace(' ', '')}
                          direction={sortConfig.column === header.toLowerCase().replace(' ', '') ? sortConfig.direction : 'asc'}
                          onClick={() => handleSortRequest(header.toLowerCase().replace(' ', ''))}
                      >
                        {header}
                      </TableSortLabel>
                    </StyledTableCell>
                ))}
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assets.length > 0 ? (
                  assets.map((asset) => (
                      <StyledTableRow key={asset.id}>
                        <TableCell>{asset.id}</TableCell>
                        <TableCell>{new Date(asset.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{asset.type}</TableCell>
                        <TableCell>{asset.model}</TableCell>
                        <TableCell>{asset.serialNumber}</TableCell>
                        <TableCell>
                          {asset.status && (
                              <Typography
                                  variant="body2"
                                  sx={{
                                    color:
                                        asset.status.toLowerCase() === 'active'
                                            ? 'green'
                                            : asset.status.toLowerCase() === 'in repair'
                                                ? 'orange'
                                                : asset.status.toLowerCase() === 'decommissioned'
                                                    ? 'gray'
                                                    : 'red',
                                    fontWeight: 'bold',
                                  }}
                              >
                                {asset.status}
                              </Typography>
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="View">
                            <IconButton component={Link} to={`/assets/${asset.id}`} color="primary">
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton component={Link} to={`/assets/edit/${asset.id}`} color="secondary">
                              <Edit />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton color="error" onClick={() => handleDeleteClick(asset.id)}>
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </StyledTableRow>
                  ))
              ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No assets found.
                    </TableCell>
                  </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
            component="div"
            count={totalCount || 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
        />

        {/* Confirmation Modal */}
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this asset? This action cannot be undone.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Paper>
  );
};

export default AssetList;
