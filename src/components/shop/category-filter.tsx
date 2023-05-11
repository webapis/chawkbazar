import { useCategoriesQuery } from "@framework/category/get-all-categories";
import { CheckBox } from "@components/ui/checkbox";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";

export const CategoryFilter = () => {
	const { t } = useTranslation("common");
	const router = useRouter();
	const { pathname, query } = router;
	const { data, isLoading } = useCategoriesQuery({
		limit: 10,
	});
	const selectedGenders = query?.g
		? (query.g as string).split(",")
		: [];
	const selectedCategories = query?.category
		? (query.category as string).split(",")
		: [];
	const [formState, setFormState] = React.useState<string[]>(
		selectedCategories
	);
	const [genders, setGenders] = React.useState<string[]>(selectedGenders)
	console.log('selectedGenders',selectedGenders)
	React.useEffect(() => {
		setFormState(selectedCategories);
	}, [query?.category]);
	React.useEffect(() => {

		setGenders(selectedGenders)


	}, [query?.g]);
	if (isLoading) return <p>Loading...</p>;

	function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
		const { value } = e.currentTarget;
		let currentFormState = formState.includes(value)
			? formState.filter((i) => i !== value)
			: [...formState, value];
		const { category, ...restQuery } = query;
		router.push(
			{
				pathname,
				query: {
					...restQuery,
					...(!!currentFormState.length
						? { category: currentFormState.join(",") }
						: {}),
				},
			},
			undefined,
			{ scroll: false }
		);
	}
	const items = data?.categories.data;
	if (items?.filter(item => genders.some(s => item.gender.find(d => d === s))) ) {
		return (
			<div className="block border-b border-gray-300 pb-7 mb-7">
				<h3 className="text-heading text-sm md:text-base font-semibold mb-7">
					{t("text-category")}
				</h3>
				<div className="mt-2 flex flex-col space-y-4" >
					{items?.filter(item => genders.some(s => item.gender.find(d => d === s))).map((item: any) => (
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
	} else {
		return null
	}

};
