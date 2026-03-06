import { calculateTimeLeft } from '@/utils/helpers';
import { CountdownTime } from '@/utils/types';
import { useEffect, useState } from 'react';

export const useCountdownTimer = (startingDate: string, stopCounter: boolean) => {
	const [timeLeft, setTimeLeft] = useState<CountdownTime>(calculateTimeLeft(startingDate));

	useEffect(() => {
		if (stopCounter) return;
		const timer = setInterval(() => {
			const time = calculateTimeLeft(startingDate);
			if (time.days + time.hours + time.minutes + time.seconds === 0) {
				clearInterval(timer);
			}
			setTimeLeft(time);
		}, 1000);

		return () => clearInterval(timer);
	}, [startingDate, stopCounter]);

	return timeLeft;
};
