import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import './List.css';
import SearchItem from '../../components/SearchItem/SearchItem';
import useFetch from '../../hooks/useFetch.js';

const List = () => {
  const location = useLocation();

  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const { data, loading, error, reFetchData } = useFetch(`http://localhost:8800/hotels?city=${destination}`);

  const handleClick = () => {
    reFetchData(`http://localhost:8800/hotels?city=${destination}&min=${min || 0}$max=${max || 9999}`);
  };
  return (
    <>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} type="text" />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(date[0].startDate, 'dd/MM/yyyy')} to ${format(date[0].endDate, 'dd/MM/yyyy')}`}</span>
              {openDate && <DateRange onChange={(item) => setDate([item.selection])} minDate={new Date()} rannges={date} />}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    {' '}
                    Min Price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" onChange={(e) => setMin(e.target.value)} min="0" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    {' '}
                    Max Price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" onChange={(e) => setMax(e.target.value)} min="0" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText"> Adults</span>
                  <input type="number" min={1} className="lsOptionInput" placeholder={options.adults} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText"> childrens</span>
                  <input type="number" min={0} className="lsOptionInput" placeholder={options.childrens} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText"> Rooms</span>
                  <input type="number" min={1} className="lsOptionInput" placeholder={options.rooms} />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              'loading'
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
