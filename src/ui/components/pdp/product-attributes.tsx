"use client";

import { type ReactNode } from "react";
import { useParams } from "next/navigation";
import { Shirt, Leaf, Droplets, Ruler, Sparkles } from "lucide-react";
import {
	Accordion,
	AccordionItemWithContext,
	AccordionTrigger,
	AccordionContent,
} from "@/ui/components/ui/accordion";
import { Badge } from "@/ui/components/ui/badge";

interface Attribute {
	name: string;
	value: string | boolean | string[];
}

interface ProductAttributesProps {
	/**
	 * Description as an array of HTML strings (from EditorJS via edjsHTML parser)
	 * Already sanitized with xss on the server
	 */
	descriptionHtml?: string[] | null;
	attributes?: Attribute[];
	careInstructions?: string | null;
}

// Map attribute names to icons
const attributeIcons: Record<string, ReactNode> = {
	Material: <Shirt className="h-4 w-4" />,
	"Made with Recycled Fibers": <Leaf className="h-4 w-4" />,
	Waterproof: <Droplets className="h-4 w-4" />,
	Fit: <Ruler className="h-4 w-4" />,
	"Key Features": <Sparkles className="h-4 w-4" />,
};

const translations = {
	it: {
		description: "Descrizione",
		productDetails: "Dettagli Prodotto",
		yes: "Sì",
		no: "No",
		shipping: {
			title: "Spedizione e Resi",
			freeShipping: "Spedizione gratuita per ordini superiori a 100€. Consegna standard in 3-5 giorni lavorativi.",
			returns: "Resi entro 30 giorni (solo per confezioni alimentari sigillate e integre)."
		}
	},
	en: {
		description: "Description",
		productDetails: "Product Details",
		yes: "Yes",
		no: "No",
		shipping: {
			title: "Shipping & Returns",
			freeShipping: "Free shipping on orders over €100. Standard delivery 3-5 business days.",
			returns: "Returns within 30 days (only for sealed and intact food packages)."
		}
	}
};

function formatValue(value: string | boolean | string[], t: typeof translations.en): ReactNode {
	if (typeof value === "boolean") return value ? t.yes : t.no;
	if (Array.isArray(value)) {
		return (
			<div className="flex flex-wrap justify-end gap-1">
				{value.map((v) => (
					<Badge key={v} variant="secondary" className="font-normal">
						{v}
					</Badge>
				))}
			</div>
		);
	}
	return value;
}

export function ProductAttributes({
	descriptionHtml,
	attributes = [],
	careInstructions,
}: ProductAttributesProps) {
	const params = useParams();
	const channel = (params?.channel as string) || "it";
	const isItalian = channel.includes("it") || channel === "default-channel";
	const t = isItalian ? translations.it : translations.en;

	// Filter out variant attributes that are shown elsewhere (Size, Color)
	const displayAttributes = attributes.filter((attr) => !["Size", "Color"].includes(attr.name));

	return (
		<Accordion type="multiple" defaultValue={["description"]} className="w-full">
			{descriptionHtml && descriptionHtml.length > 0 && (
				<AccordionItemWithContext value="description" className="border-border">
					<AccordionTrigger className="py-4 text-sm font-medium hover:no-underline">
						Description
					</AccordionTrigger>
					<AccordionContent>
						<div className="prose prose-sm max-w-none text-muted-foreground prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-foreground prose-strong:text-foreground">
							{descriptionHtml.map((html) => (
								<div key={html} dangerouslySetInnerHTML={{ __html: html }} />
							))}
						</div>
					</AccordionContent>
				</AccordionItemWithContext>
			)}

			{displayAttributes.length > 0 && (
				<AccordionItemWithContext value="details" className="border-border">
					<AccordionTrigger className="py-4 text-sm font-medium hover:no-underline">
						Product Details
					</AccordionTrigger>
					<AccordionContent>
						<div className="grid gap-3">
							{displayAttributes.map((attr) => (
								<div key={attr.name} className="flex items-start justify-between gap-4 text-sm">
									<span className="flex items-center gap-2 text-muted-foreground">
										{attributeIcons[attr.name]}
										{attr.name}
									</span>
									<span className="text-right font-medium">{formatValue(attr.value, t)}</span>
								</div>
							))}
						</div>
					</AccordionContent>
				</AccordionItemWithContext>
			)}

			{careInstructions && (
				<AccordionItemWithContext value="care" className="border-border">
					<AccordionTrigger className="py-4 text-sm font-medium hover:no-underline">
						Care Instructions
					</AccordionTrigger>
					<AccordionContent className="leading-relaxed text-muted-foreground">
						{careInstructions}
					</AccordionContent>
				</AccordionItemWithContext>
			)}

			<AccordionItemWithContext value="shipping" className="border-border">
				<AccordionTrigger className="py-4 text-sm font-medium hover:no-underline">
					{t.shipping.title}
				</AccordionTrigger>
				<AccordionContent className="leading-relaxed text-muted-foreground">
					<p className="mb-2">{t.shipping.freeShipping}</p>
					<p>{t.shipping.returns}</p>
				</AccordionContent>
			</AccordionItemWithContext>
		</Accordion>
	);
}
