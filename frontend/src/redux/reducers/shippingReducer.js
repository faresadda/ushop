import {
  FETCH_SHIPPING_PRICES,
  SELECT_STATE,
  SELECT_DELIVERY_TYPE,
} from "../actions/shippingActions";

const initialState = {
  states: [],
  selectedState: null,
  deliveryType: "home", // 'home' or 'office'
  loading: false,
  error: null,
};

const shippingReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SHIPPING_PRICES:
      return {
        ...state,
        states: action.payload,
        loading: false,
      };

    case SELECT_STATE:
      return {
        ...state,
        selectedState: action.payload,
      };

    case SELECT_DELIVERY_TYPE:
      return {
        ...state,
        deliveryType: action.payload,
      };

    default:
      return state;
  }
};

export default shippingReducer;
