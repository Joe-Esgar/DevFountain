import React, { useState, useEffect } from "react";
import { setDevelopers } from "../../dux/reducers/marketplaceReducer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UseFetch from "../usefetch";
import AppHeader from '../AppHeader/AppHeader';

function MarketPlace(props) {
  // Setting all users who are developers into the marketplaceReducer
  const { data: devs, fetchData: allDevs } = UseFetch("/api/marketplace");

  useEffect(() => {
    props.setDevelopers(devs);
  }, [devs]);

  

  // Rendering each developers info on marketplace
  const developers = props.marketplace.allDevelopers;
  console.log(developers)
  console.log(props)
  let mappedDevs;
  if (developers !== null) {
    mappedDevs = developers.map(dev => {
      const encoded = encodeURIComponent(dev.email);
      return (  
        <div>
            <Link to={`/api/profile/${encoded}`}>
          <div key={dev.user_id}>
            <img src={dev.profile_pic} />
            <h1>{`${dev.first} ${dev.last}`}</h1>
            <h2>{dev.title}</h2>
            <h2>{dev.email}</h2>
          </div>
        </Link>

        </div>
      
      );
    });
  }

  return (
    <div>
     <AppHeader/>
      Mapped Devs
      {mappedDevs}
    </div>
  );
}

const mapPropsToState = reduxState => {
  return reduxState;
};

const mappedDispatchToProps = {
  setDevelopers
};
const myConnect = connect(
  mapPropsToState,
  mappedDispatchToProps
);

export default myConnect(MarketPlace);
