/**
 * Shared Logo Component
 *
 * Single source of truth for the storefront logo.
 * Uses the Sophie Coffee logo.
 *
 * @example
 * <Logo className="h-7 w-auto" />                    // Header (auto light/dark)
 * <Logo className="h-7 w-auto" inverted />          // Footer (inverted for dark bg)
 */

interface LogoProps {
	className?: string;
	/** Accessible label for the logo */
	ariaLabel?: string;
	/** Invert colors (for dark backgrounds like footer) */
	inverted?: boolean;
	/** Transparent background */
	transparent?: boolean;
}

/**
 * Sophie Coffee combined logo (650x650, aspect ratio 1:1)
 *
 * Uses explicit width/height + aspect-ratio to prevent CLS while
 * allowing flexible sizing via className.
 */
export const Logo = ({ className, ariaLabel = "Sophie Coffee", inverted = false, transparent = false }: LogoProps) => {
	const logoSrc = transparent ? "/logo-transparent.png" : inverted ? "/logo-white.png" : "/logo.png";

	// Base styles: preserve aspect ratio to prevent CLS
	// Height classes (e.g., h-7) will work correctly with w-auto
	const baseStyles = "aspect-square object-contain transition-opacity duration-200";

	return (
		<>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={logoSrc}
				alt={ariaLabel}
				width={650}
				height={650}
				className={`${baseStyles} ${className ?? ""}`}
			/>
		</>
	);
};
