import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { fetchAssets } from '../redux/actions/assetActions';
import { FaSortUp, FaSortDown } from 'react-icons/fa'; // Import sort icons

const Dashboard = () => {
  const dispatch = useDispatch();
  //const { user } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ column: 'id', direction: 'asc' });

  useEffect(() => {
    dispatch(fetchAssets(currentPage, search, sortConfig));
  }, [dispatch, currentPage, search, sortConfig]);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleSort = (column) => {
    setSortConfig((prev) => ({
      column,
      direction: prev.column === column && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
    setCurrentPage(1); // Reset to first page on sort change
  };

  const renderSortIcon = (column) => {
    if (sortConfig.column === column) {
      return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
    }
    return <Button variant="link" onClick={() => handleSort(column)} style={{ padding: 0 }}>Sort</Button>;
  };


};

export default Dashboard;
