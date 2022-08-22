import React from 'react';
import './SearchItem.css';
const SearchItem = () => {
  return (
    <div className="searchItem">
      <img className="siImg" src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/65472318.jpg?k=2ccd785184dc3f14126267d996f9374fb01737f8844d1c0f0a6726ff36920991&o=&hp=1" alt="" />
      <div className="siDesc">
        <h1 className="siTitle">Tower Street Apartments</h1>
        <span className="siDistance">500m from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">Studio Apartment with Air conditioning</span>
        <span className="siFeatures">Entire studio • 1 bathroom • 21m² 1 full bed</span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">You can cancel later, so lock in this great price today!</span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>Excellent</span>
          <button>8.9</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">$112</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton">See availability</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
