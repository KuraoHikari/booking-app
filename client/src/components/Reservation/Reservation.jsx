import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import useFetch from '../../hooks/useFetch';
import './Reservation.css';

const Reservation = ({ setOpen, hotelId }) => {
  const { data, loading, error } = useFetch(`http://localhost:8800/hotels/room/${hotelId}`);
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => setOpen(false)} />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div key={item._id} className="rItem">
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservation;
