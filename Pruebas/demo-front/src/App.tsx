import { useEffect, useState } from 'react';
import './App.css';

interface User {
  name: string,
  lastName: string,
  birthday: Date
}


function App() {
  const [date, setDate] = useState('');
  const [formattedDate, setFormattedDate] = useState('');

  async function getDateFromBackend() {
    const urlServer = 'http://localhost:8080/api/user'; // Adjust the endpoint if necessary
    const response = await fetch(urlServer, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'cors'
    });
    return await response.json();
  }

  useEffect(() => {
    async function fetchDate() {
      try {
        const data = await getDateFromBackend();
        const formattedDate = formatDateToDDMMYYYY(data.birthday); // Adjust based on your response structure
        setDate(data.birthday);
        setFormattedDate(formattedDate);
      } catch (error) {
        console.error('Error fetching date:', error);
      }
    }
    fetchDate();
  }, []);

  function formatDateToDDMMYYYY(dateString: string) {
    const [day, month, year] = dateString.split('-');
    return `${day}-${month}-${year}`;
  }

  function formatDateToYYYYMMDD(dateString: string) {
    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
  }

  const handleDateChange = (e) => {
    const value = e.target.value;
    setDate(value);
    const convertedDate = formatDateToYYYYMMDD(value);
    setFormattedDate(formatDateToDDMMYYYY(convertedDate));
  };

  const handleFormattedDateChange = (e) => {
    const value = e.target.value;
    setFormattedDate(value);
    const convertedDate = formatDateToYYYYMMDD(value);
    setDate(convertedDate);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ birthday: date }), // Send date in yyyy-MM-dd format
      });
      const result = await response.json();
      console.log("response from back", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="container">
        <input type="date" value={date} onChange={handleDateChange} />
        <input type="text" value={formattedDate} onChange={handleFormattedDateChange} />
        <button onClick={handleClick}>Enviar</button>
      </div>
    </>
  );
}

export default App;



