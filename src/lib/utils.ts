import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function formatNumber(num: number | string | undefined): string {
	if (num === undefined || num === null) {
		return 'N/A';
	}

	if (typeof num === 'string') {
		num = parseFloat(num);
	}

	if (isNaN(num)) {
		return 'N/A';
	}

	const formatter = new Intl.NumberFormat('en', {
		notation: 'compact',
	});

	return formatter.format(num);
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const formatDateTime = (dateString: string | null | undefined): string => {
	if (!dateString) {
		return 'Invalid date input';
	}

	const date = new Date(dateString);

	if (isNaN(date.getTime())) {
		return 'Invalid date input';
	}

	const options: Intl.DateTimeFormatOptions = {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
	};
	const formattedDate = date.toLocaleDateString('en-GB', options).toLowerCase();

	const formattedTime = date
		.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: true,
		})
		.replace(/\s/g, '')
		.toUpperCase();

	return `${formattedDate} ${formattedTime}`;
};

export { formatDateTime };
