import { FaExclamationTriangle } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import Link from 'next/link'
import Layout from '@/components/Layout'
import styles from '@/styles/404.module.css'

export default function NotFoundPage() {
	return (
		<Layout title='Page Not Found'>
			<div className={styles.error}>
				<h1>
					<IconContext.Provider value={{ color: '#ed2f65' }}>
						<FaExclamationTriangle />
					</IconContext.Provider>
					&nbsp; 404
				</h1>
				<h4>Sorry, there is nothing here</h4>
				<Link href='/'>Go Back Home</Link>
			</div>
		</Layout>
	)
}
