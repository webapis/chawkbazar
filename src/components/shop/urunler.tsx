import { useKategorilerQuery } from "@framework/kategori/get-all-kategori";
import { CheckBox } from "@components/ui/checkbox";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";

export const UrunFilter = () => {
	const { t } = useTranslation("common");
	const router = useRouter();
	const { pathname, query } = router;
	const { data, isLoading } = useKategorilerQuery({
		limit: 10,
	});
	const selectedCategories = query?.k
		? (query.k as string).split(",")
		: [];
	const [formState, setFormState] = React.useState<string[]>(
		selectedCategories
	);

	React.useEffect(() => {
		setFormState(selectedCategories);
	}, [query?.k]);

	if (isLoading) return <p>Loading...</p>;

	function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
		const { value } = e.currentTarget;
		let currentFormState = formState.includes(value)
			? formState.filter((i) => i !== value)
			: [...formState, value];
		const { k, ...restQuery } = query;

		let nextRouteState =	{
			pathname,
			query: {
				...restQuery,q:undefined,
				...(!!currentFormState.length
					? { k: currentFormState.join(",") }
					: {}),
			},
		}
		delete nextRouteState.query.q
		router.push(
			nextRouteState,
			undefined,
			{ scroll: false }
		);
	}
	const items = data?.kategoriler.data;
	return (
		<div className="block border-b border-gray-300 pb-7 mb-7">
			<h3 className="text-heading text-sm md:text-base font-semibold mb-7">
				{t("text-category")}
			</h3>
			<div className="mt-2 flex flex-col space-y-4">
				{items?.map((item: any) => (
					<CheckBox
						key={item.id}
						label={item.name}
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
