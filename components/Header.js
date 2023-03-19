import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { useContext } from 'react'
import Link from 'next/link'
import styles from '@/styles/Header.module.css'
import Search from './Search'
import AuthContext from '@/context/AuthContext'

export default function Header() {
	const { user, logout } = useContext(AuthContext)

	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<Link href='/' legacyBehavior>
					<a>DJ Events</a>
				</Link>
			</div>

			<Search />

			<nav>
				<ul>
					<li>
						<Link href='/events' legacyBehavior>
							<a>Events</a>
						</Link>
					</li>
					{user ? (
						// if logged in
						<>
							<li>
								<Link href='/events/add' legacyBehavior>
									Add Event
								</Link>
							</li>
							<li>
								<Link href='/account/dashboard' legacyBehavior>
									<a>Dashboard</a>
								</Link>
							</li>
							<li>
								<button
									className='btn-secondary btn-icon'
									onClick={() => logout()}
								>
									<FaSignOutAlt /> Logout
								</button>
							</li>
						</>
					) : (
						// if logged out
						<>
							<li>
								<Link href='/account/login' legacyBehavior>
									<a className='btn-secondary btn-icon'>
										<FaSignInAlt /> Login
									</a>
								</Link>
							</li>
						</>
					)}
				</ul>
			</nav>
		</header>
	)
}
