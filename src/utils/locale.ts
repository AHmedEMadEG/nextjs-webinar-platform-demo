export function getLocale(): string {
	if (typeof document === 'undefined') {
		return 'en'; // Default locale (server-side fallback)
	}

	// Read the cookie manually
	const match = document.cookie.split('; ').find((row) => row.startsWith('v-verse-locale='));

	return match ? (match.split('=')[1] === 'ar' ? 'ar' : 'en') : 'en';
}
