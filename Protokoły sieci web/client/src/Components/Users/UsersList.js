import React from "react";
import { useGetUsersQuery } from "../../app/store/userListApi-slice";
import User from "./User";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = users;

    const listContent = ids?.length
      ? ids.map((userId, index) => <User key={userId} userId={userId} nth={index}/>)
      : null;

    content = (
      <section className="users-list">
          <h1>USERS:</h1>
          {listContent}
      </section>
    );

    return content;
  }
};

export default UsersList;
