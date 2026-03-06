export function buildQueryString(params: any, prefix: string = ''): string {
	const queryString = Object.keys(params)
		.map((key) => {
			const value = params[key];
			const prefixedKey = prefix ? `${prefix}[${key}]` : key;
			if (value !== null && typeof value === 'object') {
				return buildQueryString(value, prefixedKey);
			} else {
				return `${encodeURIComponent(prefixedKey)}=${encodeURIComponent(value)}`;
			}
		})
		.join('&');
	return queryString;
}
