import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import ShippingCalculator from "./components/ShippingCalculator";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ShippingCalculator />
      </div>
    </Provider>
  );
}

export default App;
