import { Suspense } from "react";
import Image from "next/image";
import { cacheLife, cacheTag } from "next/cache";
import { ProductListPaginatedDocument, ProductOrderField, OrderDirection } from "@/gql/graphql";
import { executePublicGraphQL } from "@/lib/graphql";
import { ProductList } from "@/ui/components/product-list";
import { Leaf, HeartHandshake, Coffee, ArrowRight } from "lucide-react";
import { Logo } from "@/ui/components/shared/logo";

export const metadata = {
	title: "Sophie Coffee | Il Piacere Condiviso",
	description: "Caffè etico, sostenibile e di alta qualità, tostato con maestria italiana dalle terre vulcaniche del Camerun.",
};

async function getFeaturedProducts(channel: string) {
	"use cache";
	cacheLife("minutes");
	cacheTag("products:all");

	const result = await executePublicGraphQL(ProductListPaginatedDocument, {
		variables: {
			channel,
			first: 12,
		},
		revalidate: 300,
	});

	if (!result.ok) {
		console.warn(`[Homepage] Failed to fetch featured products for ${channel}:`, result.error.message);
		return [];
	}

	return result.data.products?.edges.map(({ node }) => node) ?? [];
}

const translations = {
	it: {
		heroTitle: "Il Piacere Condiviso",
		heroSubtitle: "Caffè etico, sostenibile e di alta qualità, tostato con maestria italiana dalle terre vulcaniche del Camerun.",
		heroCta: "Scopri le nostre origini",
		features: [
			{ title: "Commercio Diretto", desc: "Senza intermediari, garantiamo dignità ai contadini locali." },
			{ title: "Terroir Vulcanico", desc: "Chicchi coltivati sopra i 1500m in Camerun." },
			{ title: "Sostenibilità", desc: "Packaging compostabile e spedizioni a basse emissioni." }
		],
		productsTitle: "Le Nostre Miscele"
	},
	en: {
		heroTitle: "The Shared Pleasure",
		heroSubtitle: "Ethical, sustainable, high-quality coffee, masterfully roasted in Italy from the volcanic lands of Cameroon.",
		heroCta: "Discover our origins",
		features: [
			{ title: "Direct Trade", desc: "No middlemen, ensuring dignity for local farmers." },
			{ title: "Volcanic Terroir", desc: "Beans grown above 1500m in Cameroon." },
			{ title: "Sustainability", desc: "Compostable packaging and low-emission shipping." }
		],
		productsTitle: "Our Blends"
	}
};

export default async function Page(props: { params: Promise<{ channel: string }> }) {
	const { channel } = await props.params;
	const isItalian = channel.includes("it") || channel === "default-channel";
	const t = isItalian ? translations.it : translations.en;

	return (
		<>
			{/* Custom Brand Hero */}
			<section className="relative overflow-hidden bg-secondary">
				<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
					<div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center">
						
						{/* Text Content */}
						<div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
							<Logo className="mb-6 h-20 w-20 sm:h-28 sm:w-28" transparent />
							<h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl xl:text-7xl">
								{t.heroTitle}
							</h1>
							<p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl">
								{t.heroSubtitle}
							</p>
							<div className="mt-10 flex items-center gap-x-6">
								<a
									href={`/${channel}/products`}
									className="group flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
								>
									{t.heroCta}
									<ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
								</a>
							</div>
						</div>

						{/* Image Content */}
						<div className="relative w-full flex-1 lg:max-w-xl">
							<div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
								<Image
									src="/images/hero-coffee.png"
									alt="Sophie Coffee Beans"
									fill
									priority
									className="object-cover"
									sizes="(max-width: 1024px) 100vw, 50vw"
								/>
								<div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-foreground/10" />
							</div>
						</div>

					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="bg-success py-16 text-success-foreground">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
						<div className="flex flex-col items-center text-center">
							<HeartHandshake className="mb-4 h-12 w-12 text-primary" />
							<h3 className="text-xl font-semibold">{t.features[0].title}</h3>
							<p className="mt-3 text-base opacity-90">{t.features[0].desc}</p>
						</div>
						<div className="flex flex-col items-center text-center">
							<Coffee className="mb-4 h-12 w-12 text-primary" />
							<h3 className="text-xl font-semibold">{t.features[1].title}</h3>
							<p className="mt-3 text-base opacity-90">{t.features[1].desc}</p>
						</div>
						<div className="flex flex-col items-center text-center">
							<Leaf className="mb-4 h-12 w-12 text-primary" />
							<h3 className="text-xl font-semibold">{t.features[2].title}</h3>
							<p className="mt-3 text-base opacity-90">{t.features[2].desc}</p>
						</div>
					</div>
				</div>
			</section>

			{/* Products Grid */}
			<section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
				<div className="mb-10 text-center">
					<h2 className="text-3xl font-bold tracking-tight text-brand-coffee sm:text-4xl">
						{t.productsTitle}
					</h2>
				</div>
				<Suspense
					fallback={
						<ul
							role="list"
							data-testid="ProductList"
							className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
						>
							{Array.from({ length: 12 }).map((_, i) => (
								<li key={i} className="animate-pulse">
									<div className="aspect-square overflow-hidden bg-secondary" />
									<div className="mt-2 flex justify-between">
										<div>
											<div className="mt-1 h-4 w-32 rounded bg-secondary" />
											<div className="mt-1 h-4 w-20 rounded bg-secondary" />
										</div>
										<div className="mt-1 h-4 w-16 rounded bg-secondary" />
									</div>
								</li>
							))}
						</ul>
					}
				>
					<FeaturedProducts params={props.params} />
				</Suspense>
			</section>
		</>
	);
}

async function FeaturedProducts({ params: paramsPromise }: { params: Promise<{ channel: string }> }) {
	const { channel } = await paramsPromise;
	const products = await getFeaturedProducts(channel);

	return <ProductList products={products} />;
}
