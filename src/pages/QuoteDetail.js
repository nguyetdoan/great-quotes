import { Fragment, useEffect } from "react";
import { Route, useParams, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import { getSingleQuote } from "../lib/api";
import Comments from "../components/comments/Comments";
import HighLightedQuote from "../components/quotes/HighlightedQuote";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/useHttp";

const QuoteDetail = () => {
  const params = useParams()
  const match = useRouteMatch(); // same same location but get the path but not the actual path from the url
  const {data: quote, status, sendRequest} = useHttp(getSingleQuote, 'pending');

  useEffect(() => {
    sendRequest(params.quoteId);
  }, [sendRequest, params.quoteId]);

  
  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    )
  }

  if (status === 'completed' && !quote) {
    return <div className='centerd'>
      <NoQuotesFound />
    </div>
  }
  

  return (
    <Fragment>
      <HighLightedQuote text={quote.text} author={quote.author} />
      <Route exact path={match.path}>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
