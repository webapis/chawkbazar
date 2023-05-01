import { useAltKategorilerQuery } from "@framework/alt-kategori/get-all-alt-kategori";
import { CheckBox } from "@components/ui/checkbox";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";

export const AltKategoriFilter = ({ altKategoriTitle }) => {
	const { t } = useTranslation("common");
	const router = useRouter();
	const { pathname, query } = router;
	console.log('query.k', query.k)
	debugger
	const { data, isLoading } = useAltKategorilerQuery({

	});
	debugger
	const selectedSubCategories = query?.a
		? (query.a as string).split(",")
		: [];

	const selectedCategories = query?.k
		? (query.k as string).split(",")
		: [];
	const [formState, setFormState] = React.useState<string[]>(
		selectedSubCategories
	);

	const [categories, setCategories] = React.useState<string[]>(selectedCategories)

	React.useEffect(() => {
		setFormState(selectedSubCategories);
	}, [query?.a]);
	React.useEffect(() => {

		setCategories(selectedCategories)
		console.log('selectedCategories', selectedCategories)

	}, [query?.k]);
	if (isLoading) return <p>Loading...</p>;

	function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
		const { value } = e.currentTarget;
		let currentFormState = formState.includes(value)
			? formState.filter((i) => i !== value)
			: [...formState, value];
		const { a, ...restQuery } = query;

		let nextRouteState = {
			pathname,
			query: {
				...restQuery, q: undefined,
				...(!!currentFormState.length
					? { a: currentFormState.join(",") }
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
	const items = data?.altkategoriler.data;
	if (items?.filter(f => f.groupname === altKategoriTitle).filter(item => selectedCategories.some(s => item.kategoriler.find(d => d === s)))?.length) {
		return (
			<div className="block border-b border-gray-300 pb-7 mb-7">
				<h3 className="text-heading text-sm md:text-base font-semibold mb-7">
					{t(altKategoriTitle)}
				</h3>
				<div className="mt-2 flex flex-col space-y-4">
					{items?.filter(f => f.groupname === altKategoriTitle).filter(item => selectedCategories.some(s => item.kategoriler.find(d => d === s))).map((item: any) => (
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
