import { uiActions } from "./ui-slice";
import { cartActions } from './cart-slice'
export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://food-order-app-4a38c-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }
      const data = await response.json();
      return data;
    };
    try {
        const cartData = await fetchData();
        dispatch(cartActions.replaceCart(cartData))
    } catch(error) {

    }
  };
};
export const sendCartData = (cartData) => {
  return (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending",
        message: "Sending cart data!",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        "https://food-order-app-4a38c-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cartData),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Sending cart data successfully!",
        })
      );
    };

    sendRequest().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Sending cart data failed!",
        })
      );
    });
  };
};
