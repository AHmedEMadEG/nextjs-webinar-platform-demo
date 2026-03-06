'use client';

import Button from '@/components/Button';
import Circle from '@/components/Circle';
import Heading from '@/components/Heading';
import BGLogo from '@/components/icons/BGLogo';
import PersonPic from '@/components/icons/PersonPic';
import Loading from '@/components/loading';
import CountdownTimer from '@/components/v-webinar/layouts/CountdownTimer';
import { useWebinarLogic } from '@/hooks/webinarHooks/useWebinarLogic';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

const WebinarPage = () => {
	const t = useTranslations('userPanel');
	const commonT = useTranslations('common');
	const router = useRouter();

	const { isHost, error, loading, counterloading, hasWebinarStarted, showStartButton, joinWebinarHandler, countdown } =
		useWebinarLogic();

	if (error) {
		return (
			<div>
				<div className="rounded-md border-l-4 border-red-500 bg-red-100 p-4 text-red-700">{error}</div>;
				<div className="flex justify-center gap-4">
					<Button title={commonT('tooltips.back')} onClick={() => router.back()} type="secondary" />
					<Button title={t('myOffice.common.reload')} onClick={() => router.refresh()} />
				</div>
			</div>
		);
	}

	if (loading) return <Loading />;

	return (
		<section className="bg-light-gray container mb-10 flex max-w-full flex-col gap-4 pt-8">
			<Heading title={t('admin.common.webinarRoom')} />
			<div className="flex justify-center">
				{/* MAIN PAGE CARD */}
				<div className="blue-gradient group relative flex aspect-video min-h-80 w-[68vw] items-center justify-center overflow-hidden rounded-2xl text-3xl font-bold text-white lg:w-[875px]">
					<div className="absolute left-0 top-5">
						<BGLogo />
					</div>
					<div className="z-10 flex flex-col items-center gap-8">
						{!hasWebinarStarted && <CountdownTimer countdown={countdown} counterloading={counterloading} />}
						{showStartButton && !hasWebinarStarted && (
							<div className="flex">
								<Button
									title={`${isHost ? t('admin.common.start') : commonT('buttons.join')} ${t('admin.common.webinar')}`}
									onClick={joinWebinarHandler}
									customClass="!mb-2"
								/>
							</div>
						)}
					</div>
					{/* ABSOLUTE AVATAR ICON */}
					<div className="absolute inset-0 z-0 flex items-center justify-center">
						<Circle
							type={0}
							hasHover={false}
							backgroundClass="m-1 !h-24 md:!w-28 !w-24 md:!h-28 lg:!h-32 lg:!w-32"
							icon={<PersonPic customWidth="85" CustomHeight="85" customFill="black" />}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default WebinarPage;
