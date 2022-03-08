import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

//filter
const filter_reducer = (state, action) => {
  // LOAD_PRODUCTS)
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((p) => p.price);
    maxPrice = Math.max(...maxPrice); //here we can not pass the array,so we have to use the spread operator

    //here we use the spread operator to spread the product in both all_products and the filterd_products cause both of them points to he same memory js engin and we dont do that we wont be able to go back once we filter the products
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      //we must use the spread operator to copy the old values of our state or else we will overide them if dont do so
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }
  // SET_GRIDVIEW)
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }
  // SET_LISTVIEW;
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }
  // UPDATE_SORT;
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }
  // SORT_PRODUCTS;
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    //just in case our condtion doesnt match we dont want our filtered products to be set to an empty array thats y we asign it to tempProducts
    let tempProducts = [...filtered_products];
    // sort by price lowest to highest
    if (sort === "price-lowest") {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price);
    }
    // sort by price highest to lowest
    if (sort === "price-highest") {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }
    // sort by name a-z
    if (sort === "name-a") {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    // sort by name z-a
    if (sort === "name-z") {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    return { ...state, filtered_products: tempProducts };
  }

  // UPDATE_FILTERS
  if (action.type === UPDATE_FILTERS) {
    const { value, name } = action.payload;
    return {
      ...state,
      //accessing properties dynamicly we set name = to value [name]:value
      filters: { ...state.filters, [name]: value },
    };
  }
  //FILTER_PRODUCTS
  if (action.type === FILTER_PRODUCTS) {
    return { ...state };
  }
  // CLEAR_FILTERS
  if (action.type === CLEAR_FILTERS) {
    return { ...state };
  }
  return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
