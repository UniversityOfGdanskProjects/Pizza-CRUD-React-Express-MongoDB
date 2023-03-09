import React from "react";
import Dog from "./Dog";

import { useGetDogsQuery } from "../../app/store/dogListApi-slice";

const DogsList = (props) => {

  const {
    data: dogs,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetDogsQuery(undefined, {
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
    const { ids } = dogs;

    const listContent = ids?.length
      ? ids.map((dogId, index) => <Dog key={dogId} dogId={dogId} nth={index}/>)
      : null;

    content = (
      <section className="list">
        <h5 className="list-title">DOGS LIST</h5>
        <div className="list-items">{ listContent }</div>
      </section>
    );
  }

  return content;

};

export default DogsList;