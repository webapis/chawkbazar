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
	const selectedGenders = query?.g
		? (query.g as string).split(",")
		: [];
	const selectedCategories = query?.k
		? (query.k as string).split(",")
		: [];
	const [formState, setFormState] = React.useState<string[]>(
		selectedCategories
	);
	const [genders, setGenders] = React.useState<string[]>(selectedGenders)
	console.log('selectedGenders', selectedGenders)
	const [filteredState, setFilteredState] = React.useState<string>('');
	React.useEffect(() => {
		setFormState(selectedCategories);
	}, [query?.k]);
	React.useEffect(() => {
		console.log('filteredState', filteredState)
	}, [data?.kategoriler]);

	React.useEffect(() => {

		setGenders(selectedGenders)


	}, [query?.g,data?.kategoriler]);
	function handleFilter(e: React.FormEvent<HTMLInputElement>): void {
		setFilteredState(e.currentTarget.value)
	}
	if (isLoading) return <p>Loading...</p>;

	function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
		const { value } = e.currentTarget;
		let currentFormState = formState.includes(value)
			? formState.filter((i) => i !== value)
			: [...formState, value];
		const { k, ...restQuery } = query;

		let nextRouteState = {
			pathname,
			query: {
				...restQuery, q: undefined,
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
		window.scrollTo(0, 0);
	}
	const items = data?.kategoriler.data;
	const filtered = genders && items?.filter(item => genders.some(s => item.gender?.find(d => d === s)))
	console.log('filtered', filtered)
	return (
		<div className="block border-b border-gray-300 pb-7 mb-7">
			<h3 className="text-heading text-sm md:text-base font-semibold mb-7">
				{t("text-category")}
			</h3>
			<input type="search" onChange={handleFilter} placeholder="Ürün kategori ara..." style={{
				width: '100%',
				fontFamily: 'Open Sans, sans-serif',
				fontSize: 14,
				fontWeight: 400,
				padding: '12px 20px',
				margin: '8px 0',
				boxSizing: 'border-box',
				border: '1px solid #555'
			}} />
			<div className="mt-2 flex flex-col space-y-4" style={{ height: 400, overflow: 'auto' }}>
				{filtered&&filtered?.length === 0 && items?.sort((a, b) => {
					var textA = a.name.toUpperCase();
					var textB = b.name.toUpperCase();
					return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
				}).map((item: any) => (
					<CheckBox
						key={item.id}
						label={item.name}
						name={item.name.toLowerCase()}
						checked={formState.includes(item.slug)}
						value={item.slug}

						onChange={handleItemClick}
					/>
				))}
				{filtered&&filtered?.length > 0 && filtered?.filter(f => f.name.toLowerCase().includes(filteredState.toLocaleLowerCase())).sort((a, b) => {
					var textA = a.name.toUpperCase();
					var textB = b.name.toUpperCase();
					return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
				}).map((item: any) => (
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
