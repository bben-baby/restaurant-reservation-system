import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../axiosConfig';

function CreateReservation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { table, date, startTime, endTime, partySize } = location.state || {};

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleConfirm = async () => {
    setError('');
    setSuccess('');
    try {
      await api.post('/reservations', {
        tableId: table._id,
        date,
        startTime,
        endTime,
        partySize,
      });
      setSuccess('Reservation confirmed!');
      setTimeout(() => navigate('/tables'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create reservation');
    }
  };

  if (!table) {
    return <p style={{ textAlign: 'center', marginTop: 50 }}>No table selected. Please go back and search.</p>;
  }

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h2>Confirm Reservation</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <p><strong>Table:</strong> {table.tableNumber} ({table.location})</p>
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Time:</strong> {startTime} - {endTime}</p>
      <p><strong>Party Size:</strong> {partySize}</p>
      <button onClick={handleConfirm} style={{ padding: 10, width: '100%' }}>Confirm Booking</button>
    </div>
  );
}

export default CreateReservation;