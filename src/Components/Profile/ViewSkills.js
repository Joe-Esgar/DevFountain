import React, { useState, useEffect } from "react";
import useFetch from "../usefetch";
import { connect } from "react-redux";
import { setPersonalSkills } from "../../dux/reducers/skillsReducer";
import AppHeader from "../AppHeader/AppHeader";
import './ViewSkills.scss';

function ViewSkills(props) {
  const { allSkills, mySkills } = props.skills;
  console.log(mySkills);

  const {
    developer,
    email,
    first,
    last,
    linkedin,
    portfolio,
    profile_pic,
    title,
    user_id
  } = props.user.user;

  const { data: mySkillz, fetchDataWithId: getMySkills } = useFetch(
    `/api/skills`,
    false,
    []
  );

  useEffect(() => {
    getMySkills(email);
  }, []);

  useEffect(() => {
    props.setPersonalSkills(mySkillz);
  }, [mySkillz]);

  var mySkillys = [];
  if (mySkills) {
    for (let k = 0; k < allSkills.length; k++) {
      for (let i = 0; i < mySkills.length; i++) {
        if (allSkills[k].skill_id === mySkills[i]) {
          mySkillys.push(allSkills[k]);
        }
      }
    }
  }

  const mappedSkills = mySkillys.map(e => {
    return (
      <div key={e.skill_id}>
        <h5>{e.skill}</h5>
        <img src={e.icon} alt="skill icon" className="skill-icon" />
      </div>
    );
  });
  console.log(allSkills);
  console.log(mySkills);
  console.log("mySkillz: ", mySkillz);
  console.log("mySkillys: ", mySkillys);
  console.log("mapped: ", mappedSkills);

  if (!props.user.user) {
    return (
      <div>
        <AppHeader />
      </div>
    );
  }
  console.log(props);
  return <div>{mappedSkills}</div>;
}

const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setPersonalSkills
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default invokedConnect(ViewSkills);
