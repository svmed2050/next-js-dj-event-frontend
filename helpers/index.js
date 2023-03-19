/* 
1. Get the events from events/me
*/

import cookie from 'cookie'

export function parseCookies(req) {
	return cookie.parse(req ? req.headers.cookie || '' : '')
}
