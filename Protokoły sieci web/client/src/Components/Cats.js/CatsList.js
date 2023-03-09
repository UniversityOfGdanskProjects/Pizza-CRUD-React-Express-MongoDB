import React from "react";
import Cat from "./Cat";
import { useGetCatsQuery } from "../../app/store/catListApi-slice"; 

const CatsList = (props) => {

  const {
    data: cats,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCatsQuery();

  // console.log(pizzas);

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = cats;

    const listContent = ids?.length
      ? ids.map((catId, index) => <Cat key={catId} catId={catId} nth={index}/>)
      : null;

    content = (
      <section className="list">
        <h5 className="list-title">CATS LIST</h5>
        <div className="list-items">{ listContent }</div>
      </section>
    );
  }

  return content;

};

export default CatsList;