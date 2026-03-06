import clsx from 'clsx';
import { InputHTMLAttributes, ReactNode } from 'react';
import TooltipComponent from './TooltipComponent';

type Props = {
	title?: string | ReactNode;
	buttonType?: 'submit' | 'button';
	type?:
		| 'primaryReverse'
		| 'primary'
		| 'secondary'
		| 'outline'
		| 'blue'
		| 'secondaryGradient'
		| 'secondaryBorder'
		| 'green'
		| 'red';
	customClass?: string;
	innerCustomClass?: string;
	customTextClass?: string;
	startIcon?: ReactNode;
	endIcon?: ReactNode;
	icon?: ReactNode;
	tooltip?: string;
	isProfileStats?: boolean;
	processing?: boolean;
	isMobile?: boolean;
	toolTipZIndex?: number;
} & InputHTMLAttributes<HTMLButtonElement>;

const Button = (props: Props) => {
	const {
		title,
		buttonType = 'button',
		type = 'primary',
		customClass,
		innerCustomClass,
		customTextClass,
		startIcon,
		endIcon,
		icon,
		tooltip,
		isProfileStats,
		processing,
		isMobile,
		toolTipZIndex,
		...inputProps
	} = props;
	return (
		<button
			type={buttonType}
			className={clsx(
				'flex items-center rounded-full transition-all duration-150 ease-in-out disabled:cursor-not-allowed',
				!inputProps.disabled && type === 'primaryReverse' && 'hover:default-border-gradient default-gradient',
				!inputProps.disabled && type === 'primary' && 'default-border-gradient hover:default-gradient',
				!inputProps.disabled && type === 'secondary' && 'secondary-gradient text-white',
				!inputProps.disabled &&
					type === 'secondaryBorder' &&
					'secondary-border-gradient border-1 border-[#5200A5] text-white',
				!inputProps.disabled && type === 'secondaryGradient' && 'secondary-border-gradient',
				!inputProps.disabled && type === 'blue' ? 'blue-gradient relative' : '',
				!inputProps.disabled && type === 'red' ? 'red-gradient relative' : '',
				!inputProps.disabled && type === 'green' ? 'green-gradient' : '',
				inputProps.disabled && '!bg-transparent',
				customClass,
				'capitalize'
			)}
			{...inputProps}
		>
			<TooltipComponent title={tooltip ?? ''} zIndex={toolTipZIndex}>
				<div
					className={clsx(
						'flex w-full cursor-pointer flex-nowrap items-center space-x-[5px] text-nowrap rounded-full px-[18px] py-[12px] text-sm/none font-semibold',
						{
							'hover:default-gradient default-border-gradient text-white':
								!inputProps.disabled && type === 'primaryReverse',
							'default-gradient hover:default-border-gradient text-white': !inputProps.disabled && type === 'primary',
							'secondary-gradient hover:secondary-hover-gradient text-white':
								!inputProps.disabled && type === 'secondary',
							'secondary-border-gradient text-white': !inputProps.disabled && type === 'secondaryGradient',
							'secondary-gradient text-white': !inputProps.disabled && type === 'secondaryBorder',
							'!cursor-not-allowed border border-black/10 !bg-black/40 text-white': inputProps.disabled,
							'border text-black/50': !inputProps.disabled && type === 'outline',
							'm-px text-white': !inputProps.disabled && type === 'blue',
							'green-gradient text-white': !inputProps.disabled && type === 'green',
							'red-gradient relative text-white': !inputProps.disabled && type === 'red',
							'p-px': !(!inputProps.disabled && type === 'red'),
							'bg-black/10 !px-[10px] !py-[7px] !text-sm/none !font-semibold': isProfileStats,
						},
						innerCustomClass
					)}
				>
					{type === 'blue' && <div className="absolute inset-0 rounded-full border-[1px] border-[#0000001A]" />}
					<div className={`flex w-full items-center justify-center gap-[5px] text-center ${customTextClass}`}>
						{(startIcon || icon) && (
							<div>
								{startIcon}
								{icon}
							</div>
						)}
						{processing && (
							<svg
								className="size-3 animate-spin text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
						)}

						<span className={`${isMobile ? 'hidden md:block' : ''}`}>{title}</span>
					</div>
					{endIcon && <div>{endIcon}</div>}
				</div>
			</TooltipComponent>
		</button>
	);
};

export default Button;
