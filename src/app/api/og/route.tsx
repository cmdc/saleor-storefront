import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

/**
 * Dynamic OG Image Generator — Sophie Coffee branding
 *
 * @example
 * /api/og?title=Miscela+Vulcanica&price=€14.90
 * /api/og?title=Le+Nostre+Origini&subtitle=Camerun
 */
export async function GET(request: NextRequest) {
	const { searchParams } = request.nextUrl;

	const title = searchParams.get("title") || "Sophie Coffee";
	const subtitle = searchParams.get("subtitle") || "il piacere condiviso";
	const price = searchParams.get("price") || "";

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
					backgroundColor: "#F5EFE6",
					fontFamily: "system-ui, serif",
					padding: "60px",
					gap: "48px",
				}}
			>
				{/* Logo */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						flexShrink: 0,
					}}
				>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src={logoBase64} alt="Sophie Coffee" width={200} height={200} />
				</div>

				{/* Divider */}
				<div
					style={{
						width: "2px",
						height: "260px",
						backgroundColor: "#4A2C17",
						opacity: 0.2,
						flexShrink: 0,
					}}
				/>

				{/* Text */}
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						flex: 1,
					}}
				>
					{/* Brand */}
					<div
						style={{
							fontSize: "20px",
							fontWeight: "600",
							color: "#7A5C3A",
							letterSpacing: "0.08em",
							textTransform: "uppercase",
							marginBottom: "16px",
						}}
					>
						Sophie Coffee
					</div>

					{/* Title */}
					<div
						style={{
							fontSize: title.length > 30 ? "48px" : "60px",
							fontWeight: "800",
							color: "#4A2C17",
							lineHeight: 1.1,
							letterSpacing: "-0.02em",
							marginBottom: "16px",
						}}
					>
						{title}
					</div>

					{/* Subtitle */}
					{subtitle && (
						<div
							style={{
								fontSize: "24px",
								color: "#7A5C3A",
								fontStyle: "italic",
								marginBottom: price ? "20px" : "0",
							}}
						>
							{subtitle}
						</div>
					)}

					{/* Price */}
					{price && (
						<div
							style={{
								display: "flex",
								marginTop: "8px",
							}}
						>
							<div
								style={{
									fontSize: "32px",
									fontWeight: "700",
									color: "#F5EFE6",
									backgroundColor: "#4A2C17",
									padding: "10px 28px",
									borderRadius: "8px",
								}}
							>
								{price}
							</div>
						</div>
					)}
				</div>
			</div>
		),
		{ width: 1200, height: 630 },
	);
}
