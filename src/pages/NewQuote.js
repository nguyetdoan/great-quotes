import QuoteForm from '../components/quotes/QuoteForm'
import { useHistory } from 'react-router';
import useHttp from '../hooks/useHttp';
import { addQuote } from '../lib/api';

const NewQuote = () => {
    const history = useHistory();
    const {sendRequest} = useHttp(addQuote, 'pending')

    const addQuoteHander = async quoteData => {
        await sendRequest(quoteData);
        history.push('/quotes')
    }

    return <QuoteForm onAddQuote={addQuoteHander} />
};

export default NewQuote;