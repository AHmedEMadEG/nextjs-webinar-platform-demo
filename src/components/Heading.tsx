'use client';
import clsx from 'clsx';
import { ReactNode } from 'react';
import Button from './Button';

type Props = {
	buttonEndIcon?: ReactNode;
	buttonLabel?: any;
	buttonStartIcon?: ReactNode;
	onClick?: () => void;
	title: string | object;
	customClass?: string;
	customContainerClass?: string;
	customLine?: string;
	buttonDisabled?: boolean;
	type?: 'primary' | 'secondary';
	rightChild?: ReactNode;
	lineHidden?: boolean;
	stroke?: string | undefined;
	customLabel?: string;
};

const Heading = (props: Props) => {
	const {
		title,
		buttonLabel,
		onClick,
		type,
		buttonStartIcon,
		buttonEndIcon,
		customClass,
		customLine,
		customContainerClass,
		buttonDisabled,
		rightChild,
		lineHidden = true,
		stroke = undefined,
		customLabel,
	} = props;
	return (
		<div
			className={clsx(
				'flex min-h-6 flex-col items-center gap-2.5 self-stretch sm:flex-row',
				customClass,
				customContainerClass
			)}
		>
			<div className="flex">
				{title && typeof title === 'object' ? (
					Object.values(title).map((t, ind) => (
						<div key={ind} className="flex">
							<h3
								className={clsx(
									'font-poppins whitespace-nowrap bg-[linear-gradient(62deg,#016DEA_27.41%,#FA0101_95.02%)] bg-clip-text text-xl/6 font-bold not-italic leading-6 text-transparent',
									customClass
								)}
							>
								{t}
							</h3>
							{title && ind !== Object.values(title).length - 1 && (
								<svg
									className="rtl:rotate-180"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M9 18L15 12L9 6"
										stroke={stroke || 'url(#paint0_linear_7041_649673)'}
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<defs>
										<linearGradient
											id="paint0_linear_7041_649673"
											x1="11.3472"
											y1="17.4091"
											x2="17.1256"
											y2="15.9034"
											gradientUnits="userSpaceOnUse"
										>
											<stop stopColor="#016DEA" />
											<stop offset="1" stopColor="#FA0101" />
										</linearGradient>
									</defs>
								</svg>
							)}
						</div>
					))
				) : (
					<h3
						className={clsx(
							'font-poppins mx-2 whitespace-nowrap text-wrap bg-[linear-gradient(62deg,#016DEA_27.41%,#FA0101_95.02%)] bg-clip-text text-xl font-bold not-italic leading-6 text-transparent sm:mx-0 sm:text-xl/6 md:text-2xl',
							customClass
						)}
					>
						{title}
					</h3>
				)}
			</div>

			{lineHidden && (
				<div
					className={clsx(
						'h-[1px] w-full flex-1 bg-[linear-gradient(62deg,#016DEA_27.41%,#FA0101_95.02%)]',
						customLine
					)}
				></div>
			)}

			{rightChild ? (
				rightChild
			) : (
				<>
					{buttonLabel && !buttonDisabled && (
						<div className={`${type == 'primary' ? 'mb-3' : ''}`}>
							<Button
								customTextClass={customLabel}
								title={buttonLabel}
								type={type}
								onClick={onClick}
								startIcon={buttonStartIcon}
								endIcon={buttonEndIcon}
								innerCustomClass={'px-[20px] py-[13px]'}
								disabled={buttonDisabled}
							/>
						</div>
					)}

					{buttonLabel && buttonDisabled && (
						<div className="whitespace-pre rounded-full px-5 py-[9px] text-sm font-medium text-black/50 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.10)]">
							{buttonLabel}
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default Heading;
