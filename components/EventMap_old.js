// import Image from 'next/image'
// import { useState, useEffect } from 'react'
// import ReactMapGL, { Marker } from 'react-map-gl'
// import 'mapbox-gl/dist/mapbox-gl.css'
// import Geocode from 'react-geocode'

// export default function EventMap({ evt }) {
// 	const [pageIsMounted, setPageIsMounted] = useState(false)
// 	const [lat, setLat] = useState(null)
// 	const [lng, setLng] = useState(null)
// 	const [loading, setLoading] = useState(true)
// 	const [viewport, setViewport] = useState({
// 		latitude: 40.712772,
// 		longitude: -73.935242,
// 		width: '100%',
// 		height: '500px',
// 		zoom: 12,
// 	})

// 	console.log(process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN)
// 	console.log(evt.address)

// 	useEffect(() => {
// 		Geocode.fromAddress(evt.address).then(
// 			(response) => {
// 				const { lat, lng } = response.results[0].geometry.location
// 				setLat(lat)
// 				setLng(lng)
// 				setViewport({ ...viewport, latitude: lat, longitude: lng })
// 				setLoading(false)
// 			},
// 			(error) => {
// 				console.error(error)
// 			}
// 		)
// 	}, [])

// 	Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY)

// 	if (loading) return false

// 	return (
// 		<>
// 			<h1>Text</h1>

// 			<ReactMapGL
// 				mapStyle='mapbox://styles/mapbox/streets-v9'
// 				mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
// 				{...viewport}
// 				onViewportChange={(viewport) => setViewport({ viewport })}
// 			/>

// 			{/* <Map
// 				initialViewState={viewport}
// 				mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
// 				// onViewportChange={(vp) => setViewport(vp)}
// 				mapStyle={'mapbox://styles/mapbox/basic-v9'}
// 			>
// 				<Marker key={evt.id} latitude={lat} longitude={lng}>
// 					Hello
// 				</Marker>
// 			</Map> */}
// 		</>
// 	)
// }
