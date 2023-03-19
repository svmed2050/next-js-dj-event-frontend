import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import Pagination from '@/components/Pagination'
import { API_URL, PER_PAGE } from '@/config/index'

export default function EventsPage({ events, page, total }) {
	return (
		<Layout>
			<h1>Events</h1>
			{events.length === 0 && <h3>No events to show</h3>}

			{events.map((evt) => (
				<EventItem key={evt.id} evt={evt.attributes} />
			))}

			<Pagination page={page} total={total} />
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

// export async function getStaticProps() {
// 	const res = await fetch(`${API_URL}/api/events?populate=*&sort=date%3Aasc`)
// 	const { data: events } = await res.json()

// 	// console.log(events)

// 	return {
// 		props: { events },
// 		revalidate: 1,
// 	}
// }
export async function getServerSideProps({ query: { page = 1 } }) {
	// console.log(page)

	// Calculate start page
	// const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE

	// Fetch total/count
	const totalRes = await fetch(`${API_URL}/api/events`)
	const {
		meta: {
			pagination: { total },
		},
	} = await totalRes.json()

	// console.log(total)

	// Fetch events
	const eventRes = await fetch(
		`${API_URL}/api/events?populate=*&sort=date%3Aasc&pagination[pageSize]=${PER_PAGE}&pagination[page]=${page}`
	)
	const { data: events } = await eventRes.json()

	// console.log(events)

	return {
		props: { events, page: +page, total },
	}
}
