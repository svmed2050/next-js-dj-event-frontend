import { AuthProvider } from '@/context/AuthContext'
import '@/styles/globals.css'

/* Help initialize pages */
export default function App({ Component, pageProps }) {
	return (
		<AuthProvider>
			<Component {...pageProps} />
		</AuthProvider>
	)
}
