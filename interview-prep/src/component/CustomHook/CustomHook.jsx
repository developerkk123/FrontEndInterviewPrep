import React from "react";
import useFetch from "./Example";
import useToggle from "./ExampleToggle";
/**
 * @definition : In React, custom hooks allow you to extract component logic into reusable functions.
 *  They start with the word use, and they can use other hooks like useState, useEffect, etc.
 * Custom hooks help organize code and promote reuse without duplicating logic across components.
 */

const CustomHook = () => {
  // custom hook import for toggle
  const [value, toggle] = useToggle(false);
  console.log("Toggle value:", value);
  //   setTimeout(() => {
  //     toggle();
  //   }, 3000); // Toggle after 3 seconds

  const { data, loading, error } = useFetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
  );
  if (loading) return <p>loading.......</p>;
  if (error) return <>{`Error is: ${error}`}</>;
  console.log("Data fetched:", data);
  return (
    <div>
      <h1>Custom Hook Component</h1>
    </div>
  );
};

export default CustomHook;
