import React, { useEffect } from "react";
import "../App.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// components
import MyForm from "../components/MyForm";
// redux
import { getUsersData } from "../redux/userReducer";

function UserEditDataPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentUser = useSelector((state) => state.user.usersData.find((user) =>  user._id === id));
  useEffect(() => {
    getUsersData(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return (
    <div className='container'>
      <MyForm
        isEdit
        currentUser={currentUser}
      />
    </div>
  );
}

export default UserEditDataPage;
