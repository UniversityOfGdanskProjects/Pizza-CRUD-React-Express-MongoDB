import React, { useState } from "react";
import Pizza from "./Pizza";
import { useGetPizzasQuery } from "../../app/store/pizzaListApi-slice";
import { useDebounce } from "use-debounce";

const PizzaList = (props) => {

  const [searchTerm, setSearchTerm] = useState("");
  const [showGluten, setShowGluten] = useState(true)

  console.log(showGluten)

  const [value] = useDebounce(searchTerm, 350);

  const toggleShowGluten = () => {
    setShowGluten(!showGluten)
  };

  const {
    data: pizzas,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPizzasQuery({name: value, withGluten: showGluten}, {
    pollingInterval: 5 * 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    
    const { entities } = pizzas;

    // console.log(entities);

    const pizzasArr = Object.values(entities);

    const listContent = pizzasArr.length
      ? pizzasArr.map((pizza) => <Pizza key={pizza.id} pizza={pizza} />)
      : null;

    content = (
      <section className="list">
        <h5 className="list-title">PIZZA MENU</h5>
        <div className="list-items">{listContent}</div>
      </section>
    );
  }

  return (
    <React.Fragment>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by pizza name"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <label>
          Pokaż tylko bez glutenu:
          <input type="checkbox" onChange={toggleShowGluten} />
        </label>
      </div>
      {content}
    </React.Fragment>
  );
};

export default PizzaList;
