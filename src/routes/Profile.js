import React from "react";
import { useHistory } from "react-router-dom";
import { authService } from "../fbase";

const Profile = () => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    // 강제로 "/"로 돌려보내기
    history.push("/");
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
};

export default Profile;
