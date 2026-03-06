import Loading from '@/components/loading';
import { formatNumberInto2Digits } from '@/utils/helpers';
import { CountdownTime } from '@/utils/types';
import { useTranslations } from 'next-intl';

type Props = {
	countdown: CountdownTime;
	counterloading: boolean;
};

const CountdownTimer = ({ countdown, counterloading }: Props) => {
	const t = useTranslations('vWebinars');
	const commonT = useTranslations('common');
	const { days, hours, minutes, seconds } = countdown;

	if (counterloading) return <Loading />;

	return (
		<div className="flex flex-col">
			<p className="text-center text-xs font-bold sm:text-sm">{t('mainPage.thisWebinarStartsIn')}</p>
			<p className="text-center text-2xl font-bold sm:text-4xl lg:text-6xl">
				{formatNumberInto2Digits(days)} : {formatNumberInto2Digits(hours)} : {formatNumberInto2Digits(minutes)} :{' '}
				{formatNumberInto2Digits(seconds)}
			</p>
			<div className="flex justify-between gap-2">
				<p className="flex-[1] text-center text-sm font-bold">{commonT('modals.timeLine.days')}</p>
				<p className="flex-[1] text-center text-sm font-bold">{commonT('modals.timeLine.hours')} </p>
				<p className="flex-[1] text-center text-sm font-bold">{commonT('modals.timeLine.mins')}</p>
				<p className="flex-[1] text-center text-sm font-bold">{commonT('modals.timeLine.sec')}</p>
			</div>
		</div>
	);
};

export default CountdownTimer;
