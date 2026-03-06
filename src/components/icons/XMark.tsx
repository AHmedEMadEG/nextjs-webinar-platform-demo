import * as React from 'react';

type Props = {
	color?: string;
	width?: number | string;
	height?: number | string;
} & React.SVGProps<SVGSVGElement>;

const XMark = (props: Props) => {
	const { width = 24, height = 24, color = 'white', ...rest } = props;
	return (
		<svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
			<path d="M18 6L6 18" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M6 6L18 18" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
};

export default XMark;
