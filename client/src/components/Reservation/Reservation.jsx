import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../Contexts/SearchContext';
import useFetch from '../../hooks/useFetch';
import './Reservation.css';

const Reservation = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { dates } = useContext(SearchContext);
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(`http://localhost:8800/hotels/room/${hotelId}`);
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };
  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) => alldates.includes(new Date(date).getTime()));
    return !isFound;
  };
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    console.log(checked, value);
    setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter((room) => room !== value));
  };
  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`http://localhost:8800/rooms/availability/${roomId}`, { dates: alldates });
          return res.data;
        })
      );
      setOpen(false);
      navigate('/');
    } catch (error) {}
  };
  console.log(selectedRooms, 'ini');
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => setOpen(false)} />
        <span>Select your rooms:</span>
        {data?.map((item) => (
          <div key={item._id} className="rItem">
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item?.roomNumbers?.map((room) => (
                <div className="room" key={room._id}>
                  <label>{room.number}</label>
                  <input type="checkbox" value={room._id} onChange={handleSelect} disabled={!isAvailable(room)} />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reservation;
