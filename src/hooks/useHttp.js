import { useReducer, useCallback } from "react";

const reducerFunction = (state, action) => {
    if (action.type === 'SEND') {
        return {
            status: 'pending',
            error: null,
            data: null
        }
    }

    if (action.type === 'SUCCESS') {
        return {
            status: 'completed',
            error: null,
            data: action.responseData
        }
    }

    if (action.type === 'ERROR') {
        return {
          data: null,
          error: action.errorMessage,
          status: 'completed',
        };
      }
    
      return state;
};

const useHttp = (requestFunc, startWithPending = false) => {
  const [httpState, dispatch] = useReducer(reducerFunction, {
    status: startWithPending ? "pending" : null,
    error: null,
    data: null,
  });
  
  const sendRequest = useCallback(async (requestData) => {
    dispatch({ type: "SEND" });
    
    try {
      const responseData = await requestFunc(requestData);
      dispatch({ type: "SUCCESS", responseData });
      return responseData;
    } catch (error) {
      dispatch({
        type: "ERROR",
        errorMessage: error.message || "Something went wrong!",
      });
    }
  }, [requestFunc]);
  
  return {
      sendRequest,
      ...httpState
  }
};

export default useHttp;
