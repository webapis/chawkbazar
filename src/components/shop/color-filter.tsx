import { CheckBox } from "@components/ui/checkbox";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";
const colorFilterItems = [
	{
		id: "1",
		name: "Siyah",
		slug: "siyah",
		hexColor: "#000",
	},
	{
		id: "2",
		name: "Mavi",
		slug: "mavi",
		hexColor: "#3310ce",
	},
	{
		id: "3",
		name: "Zeytin",
		slug: "zeytin",
		hexColor: "#0c7448",
	},
	{
		id: "4",
		name: "Bordo",
		slug: "bordo",
		hexColor: "#5f0e0e",
	},
	{
		id: "5",
		name: "Kahverengi",
		slug: "kahverengi",
		hexColor: "#362727",
	},
	{
		id: "6",
		name: "Beyaz",
		slug: "beyaz",
		hexColor: "#fff",
	},
	{
		id: "7",
		name: "Gri",
		slug: "gri",
		hexColor: "#e1e1e1",

	},
	{
		id: "8",
		name: "Kırmızı",
		slug: "kırmızı",
		hexColor: "#ff0000",
		
	},
	{
		id: "9",
		name: "Sarı",
		slug: "sarı",
		hexColor: "#FFFF00",
		
	},
	{
		id: "10",
		name: "Yeşil",
		slug: "yeşil",
		hexColor: "#008000",
		
	},
	{
		id: "11",
		name: "Pembe",
		slug: "pembe",
		hexColor: "#FFC0CB",
		
	},
	{
		id: "12",
		name: "Fuşya",
		slug: "fuşya",
		hexColor: "#FF00FF",
		
	},
	{
		id: "13",
		name: "Turuncu",
		slug: "turuncu",
		hexColor: "#ffa500",
		
	},
	{
		id: "14",
		name: "Mor",
		slug: "mor",
		hexColor: "#a020f0",
		
	},
];
export const ColorFilter = () => {
	const { t } = useTranslation("common");
	const router = useRouter();
	const { pathname, query } = router;
	const selectedColors = query?.color ? (query.color as string).split(",") : [];
	const [formState, setFormState] = React.useState<string[]>(selectedColors);
	React.useEffect(() => {
		setFormState(selectedColors);
	}, [query?.color]);
	function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
		const { value } = e.currentTarget;
		let currentFormState = formState.includes(value)
			? formState.filter((i) => i !== value)
			: [...formState, value];
		// setFormState(currentFormState);
		const { color, ...restQuery } = query;
		router.push(
			{
				pathname,
				query: {
					...restQuery,
					...(!!currentFormState.length
						? { color: currentFormState.join(",") }
						: {}),
				},
			},
			undefined,
			{ scroll: false }
		);
		window.scrollTo(0, 0);
	}
	const items = colorFilterItems;

	return (
		<div className="block border-b border-gray-300 pb-7">
			<h3 className="text-heading text-sm md:text-base font-semibold mb-7">
				{t("text-colors")}
			</h3>
			<div className="mt-2 flex flex-col space-y-4">
				{items?.map((item: any) => (
					<CheckBox
						key={item.id}
						label={
							<span className="flex items-center">
								<span
									className={`w-5 h-5 rounded-full block me-3 mt-0.5 border border-black border-opacity-20`}
									style={{ backgroundColor: item.hexColor }}
								/>
								{item.name}
							</span>
						}
						name={item.name.toLowerCase()}
						checked={formState.includes(item.slug)}
						value={item.slug}
						onChange={handleItemClick}
					/>
				))}
			</div>
		</div>
	);
};
