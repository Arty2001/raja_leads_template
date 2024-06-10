'use client'

import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DashboardLayout from '../../components/DashboardLayout';
import DashboardTable from '../../components/DashboardTable';


const Dashboard = () => {

  return (
    <DashboardLayout>
      <DashboardTable/>
    </DashboardLayout>
  );
};

export default Dashboard;