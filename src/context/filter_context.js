import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: false,
  sort: "price-lowest",
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  //remember we cant access the products directly,which mean we cant pass to the state, so we have to use useEffect to dispatch an action and fecth the products
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  const updateSort = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  const updateFilters = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    if (name === "category") {
      value = e.target.textContent;
    }
    if (name === "color") {
      value = e.target.dataset.color;
    }
    if (name === "price") {
      value = Number(value); //format from string an a Number
    }
    if (name === "shipping") {
      value = e.target.checked;
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };

  const clearFilters = (e) => {
    dispatch({ type: CLEAR_FILTERS });
  };

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort, state.filters]);

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
