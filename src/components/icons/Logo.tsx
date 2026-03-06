type Props = {
	color?: string;
	width?: number | string;
	height?: number | string;
} & React.SVGProps<SVGSVGElement>;

const Logo = (props: Props) => {
	const { width = 58, height = 48, ...rest } = props;
	return (
		<svg width={60} height={51} viewBox="0 0 60 51" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				d="M42.0812 37.6541C42.0812 39.5035 41.6564 41.2606 40.8887 42.8255L40.8147 42.9755C38.8351 46.8819 34.7277 49.581 29.9969 49.581C25.2543 49.581 21.1587 46.8819 19.179 42.9755L19.105 42.8255L1.48313 8.05205C-0.0210757 5.07993 2.16899 1.58105 5.53982 1.58105H22.4329C24.1515 1.58105 25.718 2.53844 26.4857 4.05334L29.993 10.9742L40.8848 32.4827C41.6564 34.0476 42.0812 35.8085 42.0812 37.6541Z"
				fill="url(#paint0_linear_143_57116)"
			/>
			<path
				d="M54.4622 1.58105C57.8331 1.58105 60.0231 5.07993 58.515 8.05205L43.5119 37.6541L40.8815 42.8255C41.6531 41.2606 42.0739 39.4997 42.0739 37.6541C42.0739 35.8085 41.6492 34.0476 40.8815 32.4827L29.9935 10.9742L33.5007 4.05334C34.2684 2.53844 35.8389 1.58105 37.5535 1.58105H54.4622Z"
				fill="url(#paint1_linear_143_57116)"
			/>
			<defs>
				<linearGradient
					id="paint0_linear_143_57116"
					x1={0.999916}
					y1={25.5809}
					x2={42.0802}
					y2={25.5809}
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#FA4001" />
					<stop offset={0.333333} stopColor="#CD0D14" />
					<stop offset={0.666667} stopColor="#A91D1E" />
					<stop offset={1} stopColor="#812924" />
				</linearGradient>
				<linearGradient
					id="paint1_linear_143_57116"
					x1={29.9941}
					y1={22.2045}
					x2={59.0018}
					y2={22.2045}
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#016DEA" />
					<stop offset={0.334096} stopColor="#005FCD" />
					<stop offset={0.634882} stopColor="#0052B1" />
					<stop offset={1} stopColor="#003B7E" />
				</linearGradient>
			</defs>
		</svg>
	);
};
export default Logo;
