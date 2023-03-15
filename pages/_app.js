import '@/styles/globals.css';

/* Help initialize pages */
export default function App({ Component, pageProps }) {
	return (
		<>
			<Component {...pageProps} />
		</>
	);
}
