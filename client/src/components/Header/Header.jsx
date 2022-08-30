import React, { useContext, useState } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../Contexts/SearchContext';
import { AuthContext } from '../../Contexts/AuthContext';
const Header = ({ type }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [destination, setDestination] = useState('');
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adults: 1,
    childrens: 0,
    rooms: 1,
  });
  const handleOption = (name, operation) => {
    setOptions({ ...options, [name]: operation === '+' ? options[name] + 1 : options[name] - 1 });
  };

  const { dispatch } = useContext(SearchContext);
  const handleSearch = () => {
    dispatch({ type: 'NEW_SEARCH', payload: { destination, dates, options } });
    navigate('/hotels', { state: { destination, dates, options } });
  };
  return (
    <div className="header">
      <div className={type === 'list' ? 'headerContainer listMode' : 'headerContainer'}>
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        {type !== 'list' && (
          <>
            <h1 className="headerTitle"> A lifetime of discounts? It's Genius. </h1>
            <p className="headerDesc">Get rewarded for your travels – unlock instant savings of 10% or more with a free Lamabooking account</p>
            {!user && <button className="headerBtn">Sign in / Register</button>}
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon className="headerIcon" icon={faBed} />
                <input type="text" placeholder="Where are you going?" className="headerSearchInput" onChange={(e) => setDestination(e.target.value)} />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon className="headerIcon" icon={faCalendarDays} />
                <span
                  className="headerSearchText"
                  onClick={() => {
                    setOpenDate(!openDate);
                  }}
                >{`${format(dates[0].startDate, 'dd/MM/yyyy')} to ${format(dates[0].endDate, 'dd/MM/yyyy')}`}</span>
                {openDate && <DateRange minDate={new Date()} className="date" editableDateInputs={true} onChange={(item) => setDates([item.selection])} moveRangeOnFirstSelection={false} ranges={dates} />}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon className="headerIcon" icon={faPerson} />
                <span onClick={() => setOpenOptions(!openOptions)} className="headerSearchText">{`${options.adults} adult · ${options.childrens} children · ${options.rooms} room`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button className="optionCounterButton" onClick={() => handleOption('adults', '-')} disabled={options.adults <= 1}>
                          -
                        </button>
                        <span className="optionCounterNumber">{options.adults}</span>
                        <button className="optionCounterButton" onClick={() => handleOption('adults', '+')}>
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button className="optionCounterButton" onClick={() => handleOption('childrens', '-')} disabled={options.childrens === 0}>
                          -
                        </button>
                        <span className="optionCounterNumber">{options.childrens}</span>
                        <button className="optionCounterButton" onClick={() => handleOption('childrens', '+')}>
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button className="optionCounterButton" onClick={() => handleOption('rooms', '-')} disabled={options.rooms <= 1}>
                          -
                        </button>
                        <span className="optionCounterNumber">{options.rooms}</span>
                        <button className="optionCounterButton" onClick={() => handleOption('rooms', '+')}>
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button
                  className="headerBtn"
                  onClick={() => {
                    handleSearch();
                  }}
                >
                  {' '}
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
