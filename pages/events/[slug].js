import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/Layout'
import EventMap from '@/components/EventMap'
import { API_URL } from '@/config/index'
import styles from '@/styles/Event.module.css'
import { useRouter } from 'next/router'
// import dynamic from 'next/dynamic'
// const EventMap = dynamic(() => import('../../components/EventMap'), {
// 	loading: () => 'Loading...',
// 	ssr: false,
// })

import dynamic from 'next/dynamic'

export default function EventPage({ evt }) {
	const router = useRouter()

	const { name, venue, description, date, address, time, performers } =
		evt && evt[0].attributes

	const { url: imageUrl } =
		evt && evt[0].attributes.image.data
			? evt[0].attributes.image.data.attributes.formats.medium
			: { url: '/images/event-default.png' }

	return (
		<Layout>
			<Link href='/events' legacyBehavior>
				<a className={styles.back}>{'<'} Go Back</a>
			</Link>
			<div className={styles.event}>
				<span>
					{new Date(date).toLocaleDateString('en-US')} at {time}
				</span>
				<h1>{name}</h1>
				<ToastContainer />
				{imageUrl && (
					<div className={styles.image}>
						<Image src={imageUrl} width={960} height={600} alt={name} />
					</div>
				)}

				<h3>Performers</h3>
				<p>{performers}</p>
				<h3>Description:</h3>
				<p>{description}</p>
				<h3>Venue: {venue}</h3>
				<p>{address}</p>

				<EventMap evt={evt[0].attributes} />

				<Link href='/events' legacyBehavior>
					<a className={styles.back}>{'<'} Go Back</a>
				</Link>
			</div>
		</Layout>
	)
}

/* 
Get static paths for our events.
These paths will be used in getStaticProps function
*/
export async function getStaticPaths() {
	const res = await fetch(`${API_URL}/api/events`)
	const { data: events } = await res.json()

	const paths = events.map((evt) => ({
		params: { slug: evt.attributes.slug },
	}))

	// console.log(paths)
	// console.log(evt.attributes.slug)

	return {
		paths,
		fallback: true, // generate new request to find a new path
	}
}

export async function getStaticProps({ params: { slug } }) {
	const res = await fetch(
		`${API_URL}/api/events?filters[slug]=${slug}&populate=*`
	)
	const { data: events } = await res.json()

	return {
		props: {
			evt: events,
		},
		revalidate: 1,
	}
}

// export async function getServerSideProps({ query: { slug } }) {
// 	const res = await fetch(`${API_URL}/api/events/${slug}`)
// 	const events = await res.json()

// 	return {
// 		props: {
// 			evt: events[0],
// 		},
// 	}
// }
