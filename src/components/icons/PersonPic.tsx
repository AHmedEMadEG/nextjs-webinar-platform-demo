import { SVGProps } from 'react';

export interface IconsType {
	className?: string;
	customWidth?: string;
	CustomHeight?: string;
	customFill?: string;
}

const PersonPic = ({
	className,
	customWidth = '176',
	CustomHeight = '175',
	customFill = 'white',
	...props
}: SVGProps<SVGSVGElement> & IconsType) => (
	<svg
		width={customWidth}
		height={CustomHeight}
		viewBox="0 0 176 175"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<g clipPath="url(#clip0_8575_519514)">
			<path
				d="M117.373 121.827C110.297 117.508 107.757 117.943 107.757 109.314C107.757 106.293 107.757 100.681 107.757 95.5039C111.641 91.1904 113.054 91.7274 116.339 74.792C122.981 74.792 122.551 66.1623 125.684 58.5075C128.237 52.2738 126.098 49.7465 123.947 48.7136C125.705 25.9971 125.705 10.3517 99.9216 5.49818C90.5755 -2.51252 76.4726 0.207159 69.7895 1.54393C63.1121 2.88069 57.0887 1.54393 57.0887 1.54393L58.2357 12.3071C48.4576 24.0417 53.3473 39.6871 51.773 48.8507C49.7216 49.9683 47.8711 52.5452 50.3139 58.5075C53.4465 66.1623 53.0161 74.792 59.6586 74.792C62.9433 91.7274 64.3556 91.1904 68.2401 95.5039C68.2401 100.681 68.2401 106.293 68.2401 109.314C68.2401 117.943 65.3072 118.092 58.6244 121.827C42.512 130.833 21.5158 136.066 17.754 164.214C17.0649 169.362 46.6249 174.982 87.9987 175C129.373 174.982 158.931 169.362 158.244 164.214C154.482 136.066 133.293 131.54 117.373 121.827Z"
				fill={customFill}
			/>
		</g>
		<defs>
			<clipPath id="clip0_8575_519514">
				<rect width="175" height="175" fill={customFill} transform="translate(0.5)" />
			</clipPath>
		</defs>
	</svg>
);
export default PersonPic;
