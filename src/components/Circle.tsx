import Logo from '@/components/icons/Logo';
import VerifiedGradient from '@/components/icons/VerifiedGradient';
import XMark from '@/components/icons/XMark';
import TooltipComponent from '@/components/TooltipComponent';
import clsx from 'clsx';
import Image from 'next/image';
import { ReactNode, useEffect, useState } from 'react';

type Props = {
	type?: number;
	icon?: ReactNode;
	hoveredIcon?: ReactNode;
	backgroundClass?: string;
	borderClass?: string;
	statusSizeClass?: string;
	count?: number | string;
	disabled?: boolean;
	status?: string;
	title?: string;
	hasHover?: boolean;
	onClose?: () => void;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
	onClick?: () => void;
	rootElementOnClick?: VoidFunction;
	statusContainerClass?: string;
	statusStrokeClass?: string;
	imageUrl?: string;
	imageWidth?: number;
	imageHeight?: number;
	has1K?: boolean;
	zIndex?: number;
};

const Circle = (props: Props) => {
	const {
		hasHover = true,
		type = 0,
		icon,
		hoveredIcon,
		borderClass,
		backgroundClass,
		count,
		disabled,
		status,
		title,
		onClose,
		onMouseEnter,
		onMouseLeave,
		onClick,
		rootElementOnClick,
		statusSizeClass,
		statusContainerClass,
		statusStrokeClass,
		imageUrl,
		imageWidth = 50,
		imageHeight = 50,
		has1K = false,
		zIndex,
	} = props;

	const [isHovered, setIsHovered] = useState(false);
	const [image, setImage] = useState(imageUrl);

	// Update image state when imageUrl prop changes
	useEffect(() => {
		setImage(imageUrl);
	}, [imageUrl]);

	const handleImageError = () => {
		setImage(''); // Clear image on error
	};

	// console.log(image,"image2")
	return (
		<TooltipComponent title={title} zIndex={zIndex}>
			{has1K && (
				<button className="absolute start-[30%] top-[-2%] z-10 flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(90deg,#FA0101_0%,#016DEA_100%)] p-[1px]">
					<div className="flex items-center justify-center rounded-full bg-white px-3 py-1">
						<VerifiedGradient width={16} height={16} />
						<span className="ms-2 flex items-center bg-[linear-gradient(90deg,#FA0101_0%,#016DEA_100%)] bg-clip-text text-[16px] font-extrabold text-transparent">
							I&apos;M
							<Logo width={16} height={16} />
							1K
						</span>
					</div>
				</button>
			)}
			<div
				className={clsx(
					'group inline-flex items-center justify-center rounded-full p-px',
					!disabled && type == 0 && 'bg-[linear-gradient(90deg,#FA0101_0%,#016DEA_100%)]',
					!disabled && type == 2 && 'bg-[linear-gradient(90deg,#FA0101_0%,#016DEA_100%)]',
					!disabled && type == 1 && 'bg-[linear-gradient(90deg,#016DEA_0%,#FA0101_100%)]',
					disabled && 'bg-gray-700',
					borderClass,
					hasHover && !disabled && 'hover:bg-[linear-gradient(62deg,#016dea_27.41%,#fa0101_95.02%)]'
				)}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				onClick={rootElementOnClick}
			>
				{image ? (
					<div
						className={clsx(
							'relative flex h-[38px] w-[38px] items-center justify-center gap-[10px] rounded-full text-sm/none font-semibold',
							backgroundClass
						)}
					>
						<div className="absolute inset-0 h-full w-full overflow-hidden rounded-full">
							<Image
								width={imageWidth}
								height={imageHeight}
								src={image}
								alt="Profile Image"
								className="h-full w-full bg-cover bg-center object-cover object-center"
								onError={() => handleImageError()}
							/>
						</div>
						{onClose && (
							<div
								onClick={() => onClose()}
								className="blue-gradient absolute -end-0.5 top-1 z-40 flex h-3 w-3 cursor-pointer items-center justify-center rounded-full p-0.5 ring-1 ring-[#E5E5E5]"
							>
								<XMark height={9} />
							</div>
						)}
						{(status == 'online' || status == 'offline') && (
							<div className={clsx('absolute bottom-[-2px] end-[-4px]', statusContainerClass)}>
								<div className={clsx('inline-flex rounded-full bg-white p-[2px]', statusStrokeClass)}>
									<div
										className={clsx(
											'h-[12px] w-[12px] rounded-full',
											status == 'online' && 'bg-[#0ACD5E]',
											status == 'offline' && 'bg-[#FA0101]',
											statusSizeClass
										)}
									></div>
								</div>
							</div>
						)}
					</div>
				) : (
					<div
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
						className={clsx(
							'relative flex h-[38px] w-[38px] items-center justify-center gap-[10px] rounded-full text-sm/none font-semibold',
							!disabled && type == 0 && 'bg-[linear-gradient(62deg,#016dea_27.41%,#fa0101_95.02%)]',
							!disabled && type == 1 && 'bg-[linear-gradient(62deg,#016dea_27.41%,#fa0101_95.02%)]',
							disabled && 'bg-gray-500',
							backgroundClass,
							hasHover && !disabled && 'group-hover:bg-[linear-gradient(270deg,#016DEA_15%,#FA0101_100%)]'
						)}
					>
						{isHovered && hoveredIcon ? hoveredIcon : icon}
						{count && (
							<div onClick={() => onClick && onClick()} className="absolute end-[-8px] top-0 -mt-[1px]">
								<div className="inline-flex rounded-[50px] bg-[linear-gradient(90deg,#FA0101_0%,#016DEA_100%)] p-px">
									<div className="relative gap-[10px] rounded-[50px] bg-white px-[8px] py-[4px]">
										<p className="text-center text-[10px] font-semibold text-[#016DEA]">{count}</p>
									</div>
								</div>
							</div>
						)}

						{(status == 'online' || status == 'offline') && (
							<div className={clsx('absolute bottom-[-2px] end-[-4px]', statusContainerClass)}>
								<div className={clsx('inline-flex rounded-full bg-white p-[2px]', statusStrokeClass)}>
									<div
										className={clsx(
											'h-[12px] w-[12px] rounded-full',
											status == 'online' && 'bg-[#0ACD5E]',
											status == 'offline' && 'bg-[#FA0101]',
											statusSizeClass
										)}
									></div>
								</div>
							</div>
						)}
						{onClose && (
							<div
								onClick={() => onClose()}
								className="blue-gradient absolute -end-0.5 top-1 z-10 flex h-3 w-3 cursor-pointer items-center justify-center rounded-full p-0.5 ring-1 ring-[#E5E5E5]"
							>
								<XMark height={9} />
							</div>
						)}
					</div>
				)}
			</div>
		</TooltipComponent>
	);
};
export default Circle;
