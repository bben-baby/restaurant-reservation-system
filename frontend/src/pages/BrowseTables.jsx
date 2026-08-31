import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axiosConfig';

function BrowseTables() {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [partySize, setPartySize] = useState(2);
  const [tables, setTables] = useState([]);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.get('/tables/available', {
        params: { date, startTime, endTime, partySize },
      });
      setTables(response.data);
      setSearched(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tables');
    }
  };

  const handleBook = (table) => {
    navigate('/reserve', { state: { table, date, startTime, endTime, partySize } });
  };

  return (
    <div style={{ maxWidth: 600, margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h2>Browse Available Tables</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSearch} style={{ marginBottom: 20 }}>
        <div>
          <label>Date</label><br />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required style={{ padding: 8, marginBottom: 10, width: '100%' }} />
        </div>
        <div>
          <label>Start Time</label><br />
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required style={{ padding: 8, marginBottom: 10, width: '100%' }} />
        </div>
        <div>
          <label>End Time</label><br />
          <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required style={{ padding: 8, marginBottom: 10, width: '100%' }} />
        </div>
        <div>
          <label>Party Size</label><br />
          <input type="number" min="1" value={partySize} onChange={(e) => setPartySize(e.target.value)} required style={{ padding: 8, marginBottom: 10, width: '100%' }} />
        </div>
        <button type="submit" style={{ padding: 10, width: '100%' }}>Search</button>
      </form>

      {searched && tables.length === 0 && <p>No tables available for this selection.</p>}

      {tables.map((table) => (
        <div key={table._id} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
          <p>Table {table.tableNumber} — Capacity: {table.capacity} — {table.location}</p>
          <button onClick={() => handleBook(table)}>Book This Table</button>
        </div>
      ))}
    </div>
  );
}

export default BrowseTables;