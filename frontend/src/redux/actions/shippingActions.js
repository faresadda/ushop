import shippingData from "../../data/shipping_prices.json";

// Action Types
export const FETCH_SHIPPING_PRICES = "FETCH_SHIPPING_PRICES";
export const SELECT_STATE = "SELECT_STATE";
export const SELECT_DELIVERY_TYPE = "SELECT_DELIVERY_TYPE";

// Action Creators
export const fetchShippingPrices = () => {
  return {
    type: FETCH_SHIPPING_PRICES,
    payload: shippingData.states,
  };
};

export const selectState = (stateId) => {
  return {
    type: SELECT_STATE,
    payload: stateId,
  };
};

export const selectDeliveryType = (deliveryType) => {
  return {
    type: SELECT_DELIVERY_TYPE,
    payload: deliveryType,
  };
};
