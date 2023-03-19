import React, { useState, useEffect, useCallback } from 'react'
import mapboxgl from 'mapbox-gl'
import { Container, CustomMap } from './map.styles.js'
import Geocode from 'react-geocode'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN // YOUR TOKEN HERE (or in a .env file)

const EventMap = ({ evt }) => {
	const [lat, setLat] = useState(null)
	const [lng, setLng] = useState(null)

	const [viewport, setViewport] = useState({
		latitude: 40.712772,
		longitude: -73.935242,
		zoom: 12,
	})

	useEffect(() => {
		Geocode.fromAddress(evt.address).then(
			(response) => {
				const { lat, lng } = response.results[0].geometry.location
				setLat(lat)
				setLng(lng)
				setViewport({ ...viewport, latitude: lat, longitude: lng })
			},
			(error) => {
				console.error(error)
			}
		)
	}, [])

	// # Start the map
	useEffect(() => {
		const map = new mapboxgl.Map({
			container: 'eventMap',
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [viewport.longitude, viewport.latitude],
			zoom: viewport.zoom,
		})

		const marker1 = new mapboxgl.Marker()
			.setLngLat([viewport.longitude, viewport.latitude])
			.addTo(map)
	}, [viewport])

	Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY)

	return (
		<>
			<Container>
				<CustomMap id={'eventMap'} width={'100%'} height={'500px'} />
			</Container>
		</>
	)
}

export default EventMap
