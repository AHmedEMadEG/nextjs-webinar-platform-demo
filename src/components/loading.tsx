import { SVGProps } from 'react';

const Loading = (props: SVGProps<SVGSVGElement>) => {
	return (
		<div className="relative flex w-full justify-center">
			<svg
				width={96}
				height={96}
				viewBox="0 0 236 235"
				fill="none"
				className="spin-slow"
				xmlns="http://www.w3.org/2000/svg"
				{...props}
			>
				<g id="Group 1707478842">
					<mask
						id="mask0_6141_246622"
						style={{
							maskType: 'alpha',
						}}
						maskUnits="userSpaceOnUse"
						x={0}
						y={0}
						width={236}
						height={235}
					>
						<g id="Group 1707478841">
							<path
								id="Vector"
								d="M118 10.979V53.6457"
								stroke="white"
								strokeWidth={21}
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								id="Vector_2"
								d="M118 181.646V224.313"
								stroke="white"
								strokeWidth={21}
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								id="Vector_3"
								d="M42.5867 42.2324L72.7733 72.4191"
								stroke="white"
								strokeWidth={21}
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								id="Vector_4"
								d="M163 162.645L193.187 192.832"
								stroke="white"
								strokeWidth={21}
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								id="Vector_5"
								d="M11.3333 117.646H53.9999"
								stroke="white"
								strokeWidth={21}
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								id="Vector_6"
								d="M182 117.646H224.667"
								stroke="white"
								strokeWidth={21}
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								id="Vector_7"
								d="M42.5867 193.059L72.7733 162.873"
								stroke="white"
								strokeWidth={21}
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								id="Vector_8"
								d="M163.227 72.4191L193.413 42.2324"
								stroke="white"
								strokeWidth={21}
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</g>
					</mask>
					<g mask="url(#mask0_6141_246622)">
						<rect
							id="Rectangle 2095"
							x={-10}
							y={-10.355}
							width={256}
							height={256}
							fill="url(#paint0_linear_6141_246622)"
						/>
					</g>
				</g>
				<defs>
					<linearGradient
						id="paint0_linear_6141_246622"
						x1={90.1481}
						y1={233.039}
						x2={297.202}
						y2={125.137}
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="#016DEA" />
						<stop offset={1} stopColor="#FA0101" />
					</linearGradient>
				</defs>
			</svg>
			<div className="absolute inset-0 mt-1 flex items-center justify-center">
				<svg width={30} height={30} viewBox="0 0 76 62" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
					<path
						d="M53.3378 46.5414C53.3378 48.9201 52.7915 51.1801 51.8041 53.1928L51.7088 53.3857C49.1627 58.41 43.8799 61.8816 37.7952 61.8816C31.6954 61.8816 26.4276 58.41 23.8815 53.3857L23.7863 53.1928L1.1214 8.46789C-0.813287 4.6452 2.00353 0.14502 6.33902 0.14502H28.0666C30.277 0.14502 32.2918 1.37639 33.2792 3.32482L37.7901 12.2263L51.7991 39.8901C52.7915 41.9028 53.3378 44.1677 53.3378 46.5414Z"
						fill="url(#paint0_linear_6141_246606)"
					/>
					<path
						d="M69.2634 0.14502C73.5989 0.14502 76.4157 4.6452 74.476 8.46789L55.1793 46.5414L51.7961 53.1928C52.7885 51.1801 53.3299 48.9152 53.3299 46.5414C53.3299 44.1677 52.7835 41.9028 51.7961 39.8901L37.7922 12.2263L42.3032 3.32482C43.2905 1.37639 45.3104 0.14502 47.5158 0.14502H69.2634Z"
						fill="url(#paint1_linear_6141_246606)"
					/>
					<defs>
						<linearGradient
							id="paint0_linear_6141_246606"
							x1={0.499892}
							y1={31.0131}
							x2={53.3365}
							y2={31.0131}
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="#FA4001" />
							<stop offset={0.333333} stopColor="#CD0D14" />
							<stop offset={0.666667} stopColor="#A91D1E" />
							<stop offset={1} stopColor="#812924" />
						</linearGradient>
						<linearGradient
							id="paint1_linear_6141_246606"
							x1={37.793}
							y1={26.6705}
							x2={75.1021}
							y2={26.6705}
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="#016DEA" />
							<stop offset={0.334096} stopColor="#005FCD" />
							<stop offset={0.634882} stopColor="#0052B1" />
							<stop offset={1} stopColor="#003B7E" />
						</linearGradient>
					</defs>
				</svg>
			</div>
		</div>
	);
};
export default Loading;
