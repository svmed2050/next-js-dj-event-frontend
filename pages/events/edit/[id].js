import { parseCookies } from '@/helpers/index'
import moment from 'moment'
import { FaImage } from 'react-icons/fa'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'
import Layout from '@/components/Layout'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Modal from '@/components/Modal'
import ImageUpload from '@/components/ImageUpload'

const EditEventPage = ({ evt, token }) => {
	const { name, performers, venue, address, date, time, description } =
		evt.attributes

	const [values, setValues] = useState({
		name,
		performers,
		venue,
		address,
		date,
		time,
		description,
	})

	// console.log(evt.attributes.image.data.attributes.formats.thumbnail.url)

	const [imagePreview, setImagePreview] = useState(
		evt.attributes.image && evt.attributes.image.data
			? evt.attributes.image.data.attributes.formats.thumbnail.url
			: ''
	)

	const [showModal, setShowModal] = useState(false)

	const router = useRouter()

	const handleSubmit = async (e) => {
		e.preventDefault()

		// Validation
		const hasEmptyFields = Object.values(values).some(
			(element) => element === ''
		)
		if (hasEmptyFields) {
			toast.error('Please fill in all fields')
		}

		const slug = values.name.toLowerCase().split(' ').join('-')

		const res = await fetch(`${API_URL}/api/events/${evt.id}?populate=*`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				data: { ...values, slug },
			}),
		})

		if (!res.ok) {
			if (res.status === 404) {
				toast.error('Unauthorized')
				return
			}
			toast.error('Something Went Wrong')
		} else {
			// const { data: evt } = await res.json()
			const { data: evt } = await res.json()

			router.push(`/events/${evt.attributes.slug}`)
		}
	}

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setValues({ ...values, [name]: value })
	}

	const imageUploaded = async (e) => {
		const res = await fetch(`${API_URL}/api/events/${evt.id}?populate=*`)
		const { data: events } = await res.json()
		setImagePreview(
			events.attributes.image.data.attributes.formats.thumbnail.url
		)
		// console.log('events', events)
		setShowModal(false)
	}

	return (
		<Layout title='Edit Event'>
			<Link href='/events'>Go Back</Link>
			<h1>Edit Event</h1>
			<ToastContainer />
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.grid}>
					<div>
						<label htmlFor='name'>Event Name</label>
						<input
							type='text'
							id='name'
							name='name'
							value={values.name}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='parformers'>Performers</label>
						<input
							type='text'
							id='performers'
							name='performers'
							value={values.performers}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='venue'>Venue</label>
						<input
							type='text'
							id='venue'
							name='venue'
							value={values.venue}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='address'>Address</label>
						<input
							type='text'
							id='address'
							name='address'
							value={values.address}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='date'>Date</label>
						<input
							type='date'
							id='date'
							name='date'
							value={moment(values.date).format('yyyy-MM-DD')}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='time'>Time</label>
						<input
							type='text'
							id='time'
							name='time'
							value={values.time}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div>
					<label htmlFor='description'>Event Description</label>
					<textarea
						type='text'
						name='description'
						id='description'
						value={values.description}
						onChange={handleInputChange}
					></textarea>
				</div>

				<input type='submit' value='Update Event' className='btn' />
			</form>
			{/* /images/event-default.png */}
			<h2>Event Image</h2>
			{imagePreview ? (
				<Image
					src={imagePreview}
					height={100}
					width={170}
					alt={name}
					priority
				/>
			) : (
				<div>
					<p>No image uploaded</p>
				</div>
			)}

			<div>
				<button className='btn-secondary' onClick={() => setShowModal(true)}>
					<FaImage /> Set Image
				</button>
			</div>

			<Modal show={showModal} onClose={() => setShowModal(false)}>
				<ImageUpload
					evtId={evt.id}
					imageUploaded={imageUploaded}
					token={token}
				/>
			</Modal>
		</Layout>
	)
}

export default EditEventPage

export async function getServerSideProps({ params: { id }, req }) {
	const { token } = parseCookies(req)
	const res = await fetch(`${API_URL}/api/events/${id}?populate=*`)
	const { data: evt } = await res.json()

	// console.log(req.headers.cookie)

	return {
		props: {
			evt,
			token,
		},
	}
}
