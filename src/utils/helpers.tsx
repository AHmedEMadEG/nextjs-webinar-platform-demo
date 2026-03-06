import { updateWebinarEventStatus } from '@/firebase/webinars';

import { TypedLazyQueryTrigger } from '@reduxjs/toolkit/query/react';
import { Dispatch, SetStateAction } from 'react';

import { CountdownTime, WebinarHandoutType, WebinarOfferType, WebinarPollType, WebinarType } from './types';

/**
 * Formats a number to a more readable string format, supporting various styles including currency and plain number formats with optional K (thousand) abbreviations.
 * @param number The number to format.
 * @param formatType The format type: 'currency', 'currencyWithComma', or 'plain'. Defaults to 'currency'.
 * @returns A formatted string based on the specified format type.
 */
export const formatNumber = (
	number: number,
	formatType: 'currency' | 'currencyWithComma' | 'plain' = 'currency'
): string => {
	if (number >= 1000) {
		const thousands = number / 1000;
		const roundedThousands = Math.round(thousands * 10) / 10; // Round to nearest tenth
		let suffix = `${roundedThousands}`; // Initialize suffix without 'K'
		if (roundedThousands % 1 === 0) {
			suffix = `${roundedThousands}K`; // Append 'K' for whole numbers
		} else {
			suffix = `${roundedThousands.toFixed(1)}K`; // Append 'K' with one decimal place
		}
		switch (formatType) {
			case 'currency':
				return `$${suffix}`;
			case 'currencyWithComma':
				return `$${number.toLocaleString()}`;
			case 'plain':
				return `${suffix}`;
			default:
				return `$${suffix}`;
		}
	} else {
		switch (formatType) {
			case 'currency':
			case 'currencyWithComma':
				return `$${number}`;
			case 'plain':
				return `${number}`;
			default:
				return `$${number}`;
		}
	}
};

export const formatCounts = (count?: number) => {
	if (!count) {
		return 0;
	}
	if (count >= 1_000_000) {
		return `${(count / 1_000_000).toFixed(1)}M`;
	} else if (count >= 1_000) {
		return `${(count / 1_000).toFixed(1)}K`;
	}
	return count % 1 === 0 ? count : count.toFixed(1);
};

export function downloadFile(fileUrl: string) {
	fetch(fileUrl)
		.then((response) => {
			// Check if the response is successful (status 200-299)
			if (!response.ok) {
				throw new Error(`Failed to fetch: ${response.statusText}`);
			}
			return response.blob(); // Convert the response to a Blob
		})
		.then((blob) => {
			const blobURL = window.URL.createObjectURL(new Blob([blob])); // Create an object URL for the Blob
			const fileName = fileUrl.split('/').pop(); // Extract the file name from the URL

			if (!fileName) {
				throw new Error('File name could not be determined.');
			}

			const aTag = document.createElement('a'); // Create an anchor tag for downloading
			aTag.href = blobURL;
			aTag.setAttribute('download', fileName); // Set the download attribute to the file name
			document.body.appendChild(aTag);
			aTag.click(); // Trigger the download
			aTag.remove(); // Remove the anchor tag after the download is triggered

			// Revoke the object URL to free up memory
			window.URL.revokeObjectURL(blobURL);
		})
		.catch((error) => {
			console.error('Error downloading file:', error);
		});
}

// _________________Chat_V2________________________________

export function formatTimestamp(timestamp: number): string {
	if (!timestamp) return '';

	// Convert seconds to milliseconds if necessary
	if (timestamp < 10000000000) {
		// Likely in seconds
		timestamp *= 1000;
	}

	const date = typeof timestamp === 'number' ? new Date(timestamp) : timestamp;

	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
	const year = date.getFullYear();

	let hours = date.getHours();
	const minutes = date.getMinutes().toString().padStart(2, '0');
	const period = hours >= 12 ? 'PM' : 'AM';

	// Convert to 12-hour format
	hours = hours % 12;
	const formattedHours = (hours === 0 ? 12 : hours).toString().padStart(2, '0');

	return `${day}-${month}-${year} ${formattedHours}:${minutes} ${period}`;
}

export function arraysAreEqual<T>(arr1: T[], arr2: T[]): boolean {
	return (
		arr1.length === arr2.length && arr1.every((item, index) => JSON.stringify(item) === JSON.stringify(arr2[index]))
	);
}

export const countEditorCharacters = (htmlString: string): number => {
	// Create a DOM parser
	const parser = new DOMParser();
	const doc = parser.parseFromString(htmlString, 'text/html');

	// Extract only the text content
	const plainText = doc.body.textContent || '';

	// Count the characters in the plain text
	return plainText.length;
};

export function hasObjectChanged(originalObj: Record<string, any>, compareObj: Record<string, any>): boolean {
	// Check if they have the same keys
	if (originalObj && compareObj) {
		const keys1 = Object.keys(originalObj);
		const keys2 = Object.keys(compareObj);

		if (keys1.length !== keys2.length) {
			return true; // Objects have a different number of keys
		}

		// Check if any key's value is different
		for (const key of keys1) {
			if (originalObj[key] !== compareObj[key]) {
				return true; // A difference is found
			}
		}
	}

	return false; // No differences
}

export const handleEventsBackButton = ({ setSection, form }: { setSection: (section: string) => void; form: any }) => {
	setSection('main');
	// form.setFieldValue('social_post_life_event', {});
};

// WEBINAR HELPERS
export const calculateTimeLeft = (startDate: string): CountdownTime => {
	const currentTime = new Date().getTime();
	const targetTime = new Date(startDate).getTime();
	const difference = targetTime - currentTime;

	if (difference <= 0) {
		return {
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
		};
	}

	const days = Math.floor(difference / (1000 * 60 * 60 * 24));
	const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
	const minutes = Math.floor((difference / (1000 * 60)) % 60);
	const seconds = Math.floor((difference / 1000) % 60);

	return { days, hours, minutes, seconds };
};

export const calcVideoEllapsedTime = (starting_date: string) => {
	const webinarStartTime = new Date(starting_date).getTime();
	const currentTime = new Date().getTime();
	const elapsedTime = currentTime - webinarStartTime;
	return elapsedTime / 1000;
};

export const getActiveInteractiveElements = (
	webinar: WebinarType,
	webinarVideoRef: React.RefObject<HTMLVideoElement>,
	setActivePolls: React.Dispatch<React.SetStateAction<WebinarPollType[]>>,
	setActiveOffers: React.Dispatch<React.SetStateAction<WebinarOfferType[]>>,
	setActiveHandouts: React.Dispatch<React.SetStateAction<WebinarHandoutType[]>>
) => {
	const videoElement = webinarVideoRef.current;
	if (!videoElement || !webinar.polls || !webinar.offers || !webinar.handouts) return;

	const currentTime = videoElement.currentTime;

	const activePolls = webinar.polls.filter((element) => {
		const elementTimeInSeconds =
			Number(element.scheduled_at_hours) * 3600 +
			Number(element.scheduled_at_minutes) * 60 +
			Number(element.scheduled_at_seconds);
		return currentTime >= elementTimeInSeconds;
	});
	const activeOffers = webinar.offers.filter((element) => {
		const elementTimeInSeconds =
			Number(element.scheduled_at_hours) * 3600 +
			Number(element.scheduled_at_minutes) * 60 +
			Number(element.scheduled_at_seconds);
		return currentTime >= elementTimeInSeconds;
	});
	const activeHandouts = webinar.handouts.filter((element) => {
		const elementTimeInSeconds =
			Number(element.scheduled_at_hours) * 3600 +
			Number(element.scheduled_at_minutes) * 60 +
			Number(element.scheduled_at_seconds);
		return currentTime >= elementTimeInSeconds;
	});

	setActivePolls((prev) => {
		const uniquePolls = new Map(prev.map((poll) => [poll.id, poll]));
		activePolls.forEach((poll) => uniquePolls.set(poll.id, poll));
		return Array.from(uniquePolls.values());
	});
	setActiveOffers((prev) => {
		const uniqueOffers = new Map(prev.map((offer) => [offer.id, offer]));
		activeOffers.forEach((offer) => uniqueOffers.set(offer.id, offer));
		return Array.from(uniqueOffers.values());
	});
	setActiveHandouts((prev) => {
		const uniqueHandouts = new Map(prev.map((handout) => [handout.id, handout]));
		activeHandouts.forEach((handout) => uniqueHandouts.set(handout.id, handout));
		return Array.from(uniqueHandouts.values());
	});
};

export const pollVoteHandler = async (
	webinarId: string,
	index: number,
	setActivePolls: Dispatch<SetStateAction<WebinarPollType[]>>,
	setWebinarPolls: Dispatch<SetStateAction<WebinarPollType[] | null>>,
	activePollsSelectedAnswers: { id: number; name: string }[],
	setActivePollsSelectedAnswersErrors: Dispatch<SetStateAction<string[]>>,
	pollVoteQuery: TypedLazyQueryTrigger<any, any, any>,
	setChangingVotes: Dispatch<SetStateAction<boolean[]>>
) => {
	if (activePollsSelectedAnswers[index].id) {
		const response: any = await pollVoteQuery(activePollsSelectedAnswers[index].id);
		if (response.isSuccess) {
			await updateWebinarEventStatus(webinarId, response.data.poll.id, 'Polls', 'update');
			setActivePolls((prev) => {
				const newPolls = [...prev];
				const newPoll = { ...newPolls[index], ...response.data.poll };
				newPolls[index] = newPoll;
				return newPolls;
			});
			setWebinarPolls((prev) => {
				if (!prev) return null;
				const newPolls = [...prev];
				const newPoll = { ...newPolls[index], ...response.data.poll };
				newPolls[index] = newPoll;
				return newPolls;
			});
			setChangingVotes((prev) => {
				const newVotes = [...prev];
				newVotes[index] = false;
				return newVotes;
			});
			setActivePollsSelectedAnswersErrors((prev) => {
				const newErrors = [...prev];
				newErrors[index] = '';
				return newErrors;
			});
		} else {
			return setActivePollsSelectedAnswersErrors((prev) => {
				const newErrors = [...prev];
				newErrors[index] = 'error occurred while voting for this poll, please try again';
				return newErrors;
			});
		}
	} else {
		setActivePollsSelectedAnswersErrors((prev) => {
			const newErrors = [...prev];
			newErrors[index] = 'Please select an answer';
			return newErrors;
		});
	}
};

export const formatNumberInto2Digits = (num: number) => String(num).padStart(2, '0');

export function formatDateBlogs(dateString: string): string {
	const date = new Date(dateString);
	const day = date.getDate().toString().padStart(2, '0');
	const month = date.toLocaleString('default', { month: 'short' });
	const year = date.getFullYear();
	const time = date
		.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: true,
		})
		.replace(/^(\d+):(\d+) ([AP]M)$/i, (match, hour, minute, period) => `${hour}:${minute} ${period}`.toUpperCase());

	return `${day}-${month}-${year} ${time}`;
}

export function formatOrConvertDuration(input: number | string, t: (s: string) => string): string {
	if (typeof input === 'number') {
		const duration = new Date(input * 1000).toISOString().substr(11, 8);
		const [hours, minutes, seconds] = duration.split(':').map(Number);

		const formattedDuration = [
			hours ? `${hours} ${t('labels.hours')}` : '',
			minutes ? `${minutes} ${t('labels.minutes')}` : '',
			seconds ? `${seconds} ${t('labels.seconds')}` : '',
		]
			.filter(Boolean)
			.join(' | ');

		return formattedDuration;
	} else if (typeof input === 'string') {
		const timeParts = input.split(':');
		const hours = parseInt(timeParts[0].replace(' H', ''), 10);
		const minutes = parseInt(timeParts[1].replace(' M', ''), 10);
		const seconds = parseInt(timeParts[2].replace(' S', ''), 10);

		const formattedDuration = [
			hours ? `${hours} ${t('labels.hours')}` : '',
			minutes ? `${minutes} ${t('labels.minutes')}` : '',
			seconds ? `${seconds} ${t('labels.seconds')}` : '',
		]
			.filter(Boolean)
			.join(' ');

		return formattedDuration;
	}
	throw new Error('Invalid input type');
}

export function extractErrors(errors: Record<string, any>): string[] {
	const messages: string[] = [];

	function traverse(obj: any): void {
		if (typeof obj === 'string') {
			messages.push(obj);
		} else if (Array.isArray(obj)) {
			obj.forEach(traverse);
		} else if (typeof obj === 'object' && obj !== null) {
			Object.values(obj).forEach(traverse);
		}
	}

	traverse(errors);
	return messages;
}

export function formatCurrency(value: string): string {
	const num = parseFloat(value);
	if (isNaN(num)) return '$0';

	if (num >= 1_000_000) {
		return `$${(num / 1_000_000).toFixed(1)}m`;
	} else if (num >= 1_000) {
		return `$${(num / 1_000).toFixed(1)}k`;
	} else if (num >= 100) {
		return `$${num.toFixed(0)}`;
	}

	return `$${num}`;
}

// Calculates the total size of an array of files in megabytes.
export const calculateTotalSize = (files: any) => {
	let totalSize = 0;
	files?.map((file: any) => {
		totalSize = totalSize + file.file_size;
	});
	return (totalSize / 1000000).toFixed(2).toLocaleString();
};

export const transformTimeFormat = (timeStr: string = '00 H: 00 M: 00 S') => {
	const [hours, mins] = timeStr.split(' H: ').map((part) => part.split(' ')[0]);
	return `${parseInt(hours)} Hours ${parseInt(mins)} Mins`;
};
type CustomDate = {
	calendar: {
		identifier: 'gregory';
	};
	era: 'AD';
	year: number;
	month: number;
	day: number;
};

export const getCustomDate = (date: Date = new Date()): CustomDate => {
	return {
		calendar: { identifier: 'gregory' },
		era: 'AD',
		year: date.getFullYear(),
		month: date.getMonth() + 1,
		day: date.getDate(),
	};
};
