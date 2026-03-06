'use client';
import * as Tooltip from '@radix-ui/react-tooltip';
import clsx from 'clsx';
import { ReactNode } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { ChatTag } from '../utils/types';
import './tooltip.css';

type Props = {
	title?: string | ChatTag;
	customClasses?: string;
	children: ReactNode;
	open?: boolean;
	setOpen?: (open: boolean) => void;
	zIndex?: number;
	customTriggerCLasses?: string;
	isCursorPointer?: boolean;
};

const TooltipComponent = (props: Props) => {
	const {
		title,
		children,
		customClasses,
		open,
		setOpen,
		zIndex = 10,
		customTriggerCLasses,
		isCursorPointer = true,
	} = props;

	const screenSize = useMediaQuery();

	if (!title) {
		return children;
	}
	return (
		<Tooltip.Provider delayDuration={0}>
			<Tooltip.Root open={open} onOpenChange={setOpen}>
				<Tooltip.Trigger asChild>
					<div className={clsx(`${isCursorPointer && 'cursor-pointer'} !p-0`, customTriggerCLasses)}>{children}</div>
				</Tooltip.Trigger>
				{!screenSize.isMobile && (
					<Tooltip.Portal>
						<Tooltip.Content
							side="top"
							align="center"
							className={clsx('TooltipContent', customClasses)}
							sideOffset={5}
							style={{ zIndex }}
						>
							{title}
							<Tooltip.Arrow className="TooltipArrow" />
						</Tooltip.Content>
					</Tooltip.Portal>
				)}
			</Tooltip.Root>
		</Tooltip.Provider>
	);
};

export default TooltipComponent;
