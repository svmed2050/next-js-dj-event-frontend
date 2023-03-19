import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL } from '@/config/index'
import Link from 'next/link'

export default function HomePage({ events }) {
	// console.log(events)
	return (
		<Layout>
			<h1>Upcoming Events</h1>
			{events.length === 0 && <h3>No events to show</h3>}

			{events.map((evt) => (
				<EventItem key={evt.id} evt={evt.attributes} />
			))}

			{events.length > 0 && (
				<Link href='/events' legacyBehavior>
					<a className='btn-secondary'>View All Events</a>
				</Link>
			)}
		</Layout>
	)
}

/* 
getStaticProps - make request in build time
(and not updated for the next time)
getServerSideProps - make request 
every time we come to the page

revalidate: 1
Revalidate every 1 seconds 
if the data is ghanged
*/

export async function getStaticProps() {
	const res = await fetch(
		`${API_URL}/api/events?populate=*&sort=date%3Aasc&pagination[limit]=3`
	)
	const { data: events } = await res.json()

	// console.log(events)

	return {
		props: { events },
		revalidate: 1,
	}
}

/* 
${API_URL}/api/events?sort=date%3Aasc&pagination[limit]=3
*/
