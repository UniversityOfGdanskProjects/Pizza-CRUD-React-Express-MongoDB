import React from "react";

import { useSelector } from "react-redux";
import { selectUserById } from "../../app/store/userListApi-slice";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteUserMutation } from "../../app/store/userListApi-slice";
import useAuth from "../../hooks/useAuth";

const User = (props) => {

  const { username, isAdmin } = useAuth();

  const userId = props.userId

  const navigate = useNavigate();

  const user = useSelector(state => selectUserById(state, userId))

  const [deleteUser, {
    isSuccess,
    isError,
    error
  }] = useDeleteUserMutation()

  const deleteHandler = async () => {
    console.log(userId);
    const res = await deleteUser({id: userId});
    console.log(res);
  }

  if (user) {

      const handleEdit = () => navigate(`/dash/users/${userId}`)

      const userRolesString = user.roles.toString().replaceAll(',', ', ')

      const ifAdmin = userRolesString.includes("admin")

      return (
          <div className="item user">
              <span className="nth">{props.nth + 1}. </span>
              <div className="username"><span>Username: </span>{user.username}</div>
              <div className="roles"><span>Roles: </span>{userRolesString}</div>
              <div className="actions">
                { !ifAdmin && isAdmin && <button className="del" onClick={deleteHandler}>DELETE</button>}
               { ((user.username === username) || isAdmin ) && <button className="upd" onClick={handleEdit}> UPDATE</button> }
              </div>
          </div>
      )

  } else return null
}
export default User