import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import EventItem from '@/components/EventItem'
import { API_URL } from '@/config/index'
// import qs from 'qs'
import Stencil from 'stencil-qs'
import Link from 'next/link'

export default function SearchPage({ events }) {
	const router = useRouter()

	return (
		<Layout title='Search Results'>
			<Link href='/events'>Go Back</Link>
			<h1>Search Results for '{router.query.term}'</h1>
			{events.length === 0 && <h3>No events to show</h3>}

			{events.map((evt) => (
				<EventItem key={evt.id} evt={evt.attributes} />
			))}
		</Layout>
	)
}

/* 
getStaticProps - make request in build time
(and not updated for the next time)
getServerSideProps - make request 
every time we come to the page

revalidate: 1 (only for getStatic functions)
Revalidate every 1 seconds 
if the data is ghanged
*/

export async function getServerSideProps({ query: { term } }) {
	/* 
  
  Search query:
  http://localhost:3000/events/search?term=manny

  const res = await fetch(
	`${API_URL}/api/events?populate=*&filters[name][$contains]=${term}`
	// )
  */

	const query = Stencil.stringify({
		filters: {
			$or: [
				{
					name: {
						$contains: term,
					},
				},
				{
					description: {
						$contains: term,
					},
				},
				{
					performers: {
						$contains: term,
					},
				},
				{
					venue: {
						$contains: term,
					},
				},
			],
		},
	})

	// console.log(query)

	const res = await fetch(`${API_URL}/api/events?populate=*&${query}`)

	const { data: events } = await res.json()

	return {
		props: { events: events || [] },
	}
}
