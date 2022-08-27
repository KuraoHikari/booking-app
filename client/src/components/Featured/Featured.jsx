import React from 'react';
import useFetch from '../../hooks/useFetch';
import './Featured.css';
const Featured = () => {
  const { data, loading, error } = useFetch('http://localhost:8800/hotels/countByCity?cities=Jakarta,Lombok,Indonesia');
  console.log(data);
  return (
    <div className="featured">
      {loading ? (
        'Loading please wait'
      ) : (
        <>
          <div className="featuredItem">
            <img className="featuredImg" src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/367628780.jpg?k=2c7b9a67b5b07d684a863ae30bb35f8c235d090c1324524d05d2dfdb4a43085d&o=&hp=1" alt="" />
            <div className="featuredTitles">
              <h1>Jakarta</h1>
              <h2>{data[0]} miaw miaw</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img className="featuredImg" src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/367628780.jpg?k=2c7b9a67b5b07d684a863ae30bb35f8c235d090c1324524d05d2dfdb4a43085d&o=&hp=1" alt="" />
            <div className="featuredTitles">
              <h1>Lombok</h1>
              <h2>{data[1]} miaw miaw</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img className="featuredImg" src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/367628780.jpg?k=2c7b9a67b5b07d684a863ae30bb35f8c235d090c1324524d05d2dfdb4a43085d&o=&hp=1" alt="" />
            <div className="featuredTitles">
              <h1>Indonesia</h1>
              <h2>{data[2]} miaw miaw</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
