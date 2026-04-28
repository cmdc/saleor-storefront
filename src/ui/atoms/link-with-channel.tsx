"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { type ComponentProps } from "react";

export const LinkWithChannel = ({
	href,
	...props
}: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) => {
	const { channel } = useParams<{ channel?: string }>();

	if (!href.startsWith("/")) {
		return <Link {...props} href={href} />;
	}

	// During hydration there can be a transient moment where params are unavailable.
	// suppressHydrationWarning keeps the server-rendered href and avoids React error #418.
	if (!channel) {
		return <Link {...props} href={href} suppressHydrationWarning />;
	}

	const encodedChannel = encodeURIComponent(channel);
	const hrefWithChannel = `/${encodedChannel}${href}`;
	return <Link {...props} href={hrefWithChannel} suppressHydrationWarning />;
};
