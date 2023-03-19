/** @type {import('next').NextConfig} */
const nextConfig = {
	// reactStrictMode: true,
	images: {
		domains: ['res.cloudinary.com'],
	},
	compiler: {
		// ssr and displayName are configured by default
		styledComponents: true,
	},
}

module.exports = nextConfig
