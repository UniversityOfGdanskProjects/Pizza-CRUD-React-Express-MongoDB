import React from "react";
import { useGetReportQuery } from "../app/store/reportApi-slice";
import PizzaToppingsChart from "../Components/info/PizzaToppingsChart";
import PizzasWithGlutenChart from "../Components/info/PizzasWithGlutenChart";
import PizzaPricesChart from "../Components/info/PizzaPricesChart";

const InfoPage = () => {
  const {
    data: report,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetReportQuery(undefined, {
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

    const {
      totalPizzas,
      pizzasWithoutGluten,
      minAndMaxPriceOfSmallAndLargePizzas,
      avgPriceOfSmallAndLargePizza,
      pizzasGroupedByFlourType,
      pizzaWithMaxToppings,
      pizzaWIthMinToppings,
      toppingsOccurencesInPizzaAmount,
    } = report;

    const { minSmall, maxSmall, minLarge, maxLarge } = minAndMaxPriceOfSmallAndLargePizzas
    const { averageSmallPrice: avgSmallPrice, averageLargePrice: avgLargePrice} = avgPriceOfSmallAndLargePizza

    const pizzasByFlourType = pizzasGroupedByFlourType.map((item, index) => {
      return (
        <tr key={index}>
        <td>{ item._id }</td>
        <td>{ item?.names.join(", ") }</td>
      </tr>
      );
    })

    const toppingsByOccurence = toppingsOccurencesInPizzaAmount.reduce((acc, curr) => acc + ` ${curr._id} (${curr.count}),` , "")

    content = (
  <>
  <table>
  <thead>
    <tr>
      <th colSpan="2">Summary</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Total pizzas:</td>
      <td>{ totalPizzas }</td>
    </tr>
    <tr>
      <td>Pizzas without gluten:</td>
      <td>{ pizzasWithoutGluten?.names.join(", ") }</td>
    </tr>
    <tr>
      <td>Min and max price of small pizzas:</td>
      <td>{minSmall}zł  -  {maxSmall}zł</td>
    </tr>
    <tr>
      <td>Min and max price of large pizzas:</td>
      <td>{minLarge}zł  -  {maxLarge}zł</td>
    </tr>
    <tr>
      <td>Average price of small pizzas:</td>
      <td>{ avgSmallPrice }zł</td>
    </tr>
    <tr>
      <td>Average price of large pizzas:</td>
      <td>{ avgLargePrice }zł</td>
    </tr>
  </tbody>
  <thead>
    <tr>
      <th colSpan="2">Pizzas grouped by flour type</th>
    </tr>
  </thead>
  <tbody>
    {/* <tr>
      <td>Owsiana</td>
      <td>Palermo</td>
    </tr>
    <tr>
      <td>Włoska</td>
      <td>Capricciosa</td>
    </tr>
    <tr>
      <td>Typ 00</td>
      <td>Enna</td>
    </tr> */}
    { pizzasByFlourType }
  </tbody>
  <thead>
    <tr>
      <th colSpan="2">Toppings information</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Pizza with max toppings:</td>
      <td>{pizzaWithMaxToppings?.name} ({pizzaWithMaxToppings?.toppingCount} toppings)</td>
    </tr>
    <tr>
      <td>Pizza with min toppings:</td>
      <td>{pizzaWIthMinToppings?.name} ( {pizzaWIthMinToppings?.toppingCount} toppings)</td>
    </tr>
    <tr>
      <td>Toppings occurrences in pizzas with amount:</td>
      {/* <td>
        sos pomidorowy (4), mozzarella (3), pieczarki (2), rukola (1), pomidor (1), pomidory cherry (1), bazylia (1), szynka (1), ser Grana Padano (1), kurczak (1), szynka parmeńska (1), ser (1)
      </td> */}
      <td>
        { toppingsByOccurence }
      </td>
    </tr>
  </tbody>
</table>
<div className="canvas-holder">
  <PizzaToppingsChart className="diagram" data={toppingsOccurencesInPizzaAmount} />
  <PizzasWithGlutenChart className="diagram" data={{totalPizzas: totalPizzas, ...pizzasWithoutGluten}} />
  <PizzaPricesChart className="diagram" data={{...minAndMaxPriceOfSmallAndLargePizzas, ...avgPriceOfSmallAndLargePizza}} />
</div>
</>
    );
  }

  return <section className="info-section">{content}</section>;
};

export default InfoPage;
