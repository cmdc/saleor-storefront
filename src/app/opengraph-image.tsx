import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
	const logoData = readFileSync(join(process.cwd(), "public", "logo.png"));
	const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

	return new ImageResponse(
		(
			<div
				style={{
					height: "100%",
					width: "100%",
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "#F5EFE6",
					fontFamily: "system-ui, serif",
				}}
			>
				{/* Left: logo */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						width: "380px",
						height: "380px",
						flexShrink: 0,
					}}
				>
					{ }
					<img src={logoBase64} alt="Sophie Coffee" width={340} height={340} />
				</div>

				{/* Divider */}
				<div
					style={{
						width: "2px",
						height: "300px",
						backgroundColor: "#4A2C17",
						opacity: 0.25,
						margin: "0 60px",
						flexShrink: 0,
					}}
				/>

				{/* Right: text */}
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						flex: 1,
					}}
				>
					<div
						style={{
							fontSize: "72px",
							fontWeight: "800",
							color: "#4A2C17",
							lineHeight: 1.05,
							letterSpacing: "-0.02em",
						}}
					>
						Sophie
					</div>
					<div
						style={{
							fontSize: "72px",
							fontWeight: "800",
							color: "#4A2C17",
							lineHeight: 1.05,
							letterSpacing: "-0.02em",
							marginBottom: "20px",
						}}
					>
						Coffee
					</div>
					<div
						style={{
							fontSize: "26px",
							fontWeight: "400",
							color: "#7A5C3A",
							fontStyle: "italic",
							marginBottom: "28px",
							letterSpacing: "0.01em",
						}}
					>
						il piacere condiviso
					</div>
					<div
						style={{
							fontSize: "20px",
							color: "#8A6A4A",
							lineHeight: 1.5,
							maxWidth: "380px",
						}}
					>
						Caffè etico, sostenibile e di alta qualità dalle terre vulcaniche del Camerun.
					</div>
				</div>
			</div>
		),
		{ ...size },
	);
}
