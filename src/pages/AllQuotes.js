import { useEffect } from "react";
import { getAllQuotes } from "../lib/api";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/useHttp";

const AllQuotes = () => {
  const {
    data: quotes,
    status,
    sendRequest,
  } = useHttp(getAllQuotes, "pending");
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  
  if (status === "completed" && !quotes) {
    return (
      <div className="centered focus">
        <NoQuotesFound />
      </div>
    );
  }

  return <QuoteList quotes={quotes} />;
};

export default AllQuotes;
