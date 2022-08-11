import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useState } from 'react';
import './App.css';

function App() {
	const quotesURL =
		'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

	const [quotes, setQuotes] = useState([]);
	const [randomQuote, setRandomQuote] = useState('');

	const fetchQuotes = useCallback(() => {
		fetch(quotesURL)
			.then(response => response.json())
			.then(data => {
				setQuotes(data.quotes);
				const randomIndex = Math.floor(Math.random() * data.quotes.length);
				setRandomQuote(data.quotes[randomIndex]);
			})
			.catch(err => console.error(err));

		// console.log(quotes);
	}, [quotesURL]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const handleNewQuote = () => {
		const randomIndex = Math.floor(Math.random() * quotes.length);
		setRandomQuote(quotes[randomIndex]);
	};

	const twitterIntentQuote = randomQuote.quote?.split(' ').join('%20');
	const twitterIntentAuthor = randomQuote.author?.split(' ').join('%20');

	useEffect(() => {
		fetchQuotes();
	}, []);

	return (
		<div id='quote-bg'>
			<div id='quote-box'>
				<div id='up'>
					<div id='text'>{randomQuote.quote}</div>
				</div>
				<div id='author'>- {randomQuote.author}</div>
				<div id='down'>
					<button id='new-quote' className='rounded' onClick={handleNewQuote}>
						New Quote
					</button>
					<a
						href={`http://twitter.com/intent/tweet?text="${twitterIntentQuote}"%20-%20${twitterIntentAuthor}%20@AliBinTweets`}
						id='tweet-quote'
						className='rounded'>
						<FontAwesomeIcon icon={faTwitter} color='#fff' />
					</a>
				</div>
			</div>
		</div>
	);
}

export default App;
