import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [username, setUsername] = useState('');
    const [date, setDate] = useState('');
    const [isAvailable, setIsAvailable] = useState(true);
    const [availabilities, setAvailabilities] = useState([]);

    const fetchAvailabilities = async () => {
        const response = await axios.get('http://localhost:5000/availability');
        setAvailabilities(response.data);
    };

    useEffect(() => {
        fetchAvailabilities();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/availability', {
            username,
            date,
            isAvailable
        });
        fetchAvailabilities();
    };

    return (
        <div>
            <h1>Community Calendar</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
                <input type="date" value={date} onChange={e => setDate(e.target.value)} />
                <select value={isAvailable} onChange={e => setIsAvailable(e.target.value === 'true')}>
                    <option value="true">Available</option>
                    <option value="false">Not Available</option>
                </select>
                <button type="submit">Submit</button>
            </form>
            <h2>Availabilities</h2>
            <ul>
                {availabilities.map((availability, index) => (
                    <li key={index}>{availability.username} - {availability.date} - {availability.isAvailable ? 'Available' : 'Not Available'}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
