import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
} from '@mui/material';
import { Add, Save, Edit } from '@mui/icons-material';

const initialClients = [
  { id: 1, name: 'Client A' },
  { id: 2, name: 'Client B' },
  { id: 3, name: 'Client C' },
];

const initialData = [
  { id: 1, clientName: 'Client A', money: 1000, type: 'Received' },
  { id: 2, clientName: 'Client B', money: 500, type: 'Given' },
  { id: 3, clientName: 'Client C', money: 1500, type: 'Received' },
];

const MoneyTransactions = () => {
  const [data, setData] = useState(initialData);
  const [clientFilter, setClientFilter] = useState('');
  const [editingRow, setEditingRow] = useState(null);
  const [newRow, setNewRow] = useState({ clientName: '', money: '', type: '' });

  const handleFilter = () => {
    let filteredData = initialData;

    if (clientFilter) {
      filteredData = filteredData.filter((item) => item.clientName === clientFilter);
    }

    setData(filteredData);
  };

  const handleEdit = (row) => {
    setEditingRow(row);
  };

  const handleSave = (id) => {
    const updatedData = data.map((item) =>
      item.id === id ? editingRow : item
    );
    setData(updatedData);
    setEditingRow(null);
  };

  const handleAdd = () => {
    const newData = [...data, { ...newRow, id: data.length + 1 }];
    setData(newData);
    setNewRow({ clientName: '', money: '', type: '' });
  };

  return (
    <Container style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Money Transactions
      </Typography>
      <Grid container spacing={2} style={{ marginBottom: '20px' }}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Client Name"
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
            select
            fullWidth
            size="small"
          >
            <MenuItem value="">All</MenuItem>
            {initialClients.map((client) => (
              <MenuItem key={client.id} value={client.name}>
                {client.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFilter}
            fullWidth
            size="small"
          >
            Filter
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Client Name</TableCell>
              <TableCell>Money</TableCell>
              <TableCell>Received or Given</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  {editingRow && editingRow.id === row.id ? (
                    <TextField
                      value={editingRow.clientName}
                      onChange={(e) =>
                        setEditingRow({ ...editingRow, clientName: e.target.value })
                      }
                      select
                      fullWidth
                      size="small"
                    >
                      {initialClients.map((client) => (
                        <MenuItem key={client.id} value={client.name}>
                          {client.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  ) : (
                    row.clientName
                  )}
                </TableCell>
                <TableCell>
                  {editingRow && editingRow.id === row.id ? (
                    <TextField
                      value={editingRow.money}
                      onChange={(e) =>
                        setEditingRow({ ...editingRow, money: e.target.value })
                      }
                      type="number"
                      fullWidth
                      size="small"
                    />
                  ) : (
                    row.money
                  )}
                </TableCell>
                <TableCell>
                  {editingRow && editingRow.id === row.id ? (
                    <TextField
                      value={editingRow.type}
                      onChange={(e) =>
                        setEditingRow({ ...editingRow, type: e.target.value })
                      }
                      select
                      fullWidth
                      size="small"
                    >
                      <MenuItem value="Received">Received</MenuItem>
                      <MenuItem value="Given">Given</MenuItem>
                    </TextField>
                  ) : (
                    row.type
                  )}
                </TableCell>
                <TableCell>
                  {editingRow && editingRow.id === row.id ? (
                    <IconButton onClick={() => handleSave(row.id)}>
                      <Save />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => handleEdit(row)}>
                      <Edit />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <TextField
                  value={newRow.clientName}
                  onChange={(e) =>
                    setNewRow({ ...newRow, clientName: e.target.value })
                  }
                  select
                  fullWidth
                  size="small"
                >
                  {initialClients.map((client) => (
                    <MenuItem key={client.id} value={client.name}>
                      {client.name}
                    </MenuItem>
                  ))}
                </TextField>
              </TableCell>
              <TableCell>
                <TextField
                  value={newRow.money}
                  onChange={(e) => setNewRow({ ...newRow, money: e.target.value })}
                  type="number"
                  fullWidth
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={newRow.type}
                  onChange={(e) => setNewRow({ ...newRow, type: e.target.value })}
                  select
                  fullWidth
                  size="small"
                >
                  <MenuItem value="Received">Received</MenuItem>
                  <MenuItem value="Given">Given</MenuItem>
                </TextField>
              </TableCell>
              <TableCell>
                <IconButton onClick={handleAdd}>
                  <Add />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default MoneyTransactions;