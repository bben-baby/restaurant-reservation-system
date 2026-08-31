import { useState } from 'react';
import api from '../axiosConfig';

function AdminTables() {
  const [tableNumber, setTableNumber] = useState('');
  const [capacity, setCapacity] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await api.post('/tables', {
        tableNumber: Number(tableNumber),
        capacity: Number(capacity),
        location,
      });
      setSuccess(`Table ${tableNumber} added successfully!`);
      setTableNumber('');
      setCapacity('');
      setLocation('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add table');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h2>Admin: Manage Tables</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Table Number</label><br />
          <input type="number" value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} required style={{ width: '100%', padding: 8, marginBottom: 10 }} />
        </div>
        <div>
          <label>Capacity</label><br />
          <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} required style={{ width: '100%', padding: 8, marginBottom: 10 }} />
        </div>
        <div>
          <label>Location</label><br />
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required style={{ width: '100%', padding: 8, marginBottom: 10 }} />
        </div>
        <button type="submit" style={{ padding: 10, width: '100%' }}>Add Table</button>
      </form>
    </div>
  );
}

export default AdminTables;