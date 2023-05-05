import { CheckBox } from "@components/ui/checkbox";
import { useBrandsQuery } from "@framework/brand/get-all-brands";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";

export const BrandFilter = () => {
	const { t } = useTranslation("common");
	const router = useRouter();
	const { pathname, query } = router;
	const { data, isLoading, error } = useBrandsQuery({
		limit: 10,
	});
	const selectedBrands = query?.brand ? (query.brand as string).split(",") : [];
	const [formState, setFormState] = React.useState<string[]>(selectedBrands);
	const [filteredState, setFilteredState] = React.useState<string>('');
	React.useEffect(() => {
		setFormState(selectedBrands);
	}, [query?.brand]);
	React.useEffect(() => {
		console.log('filteredState', filteredState)
	}, [filteredState]);
	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>{error.message}</p>;

	function handleFilter(e: React.FormEvent<HTMLInputElement>): void {
		setFilteredState(e.currentTarget.value)
	}


	function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
		const { value } = e.currentTarget;
		let currentFormState = formState.includes(value)
			? formState.filter((i) => i !== value)
			: [...formState, value];
		// setFormState(currentFormState);
		const { brand, ...restQuery } = query;
		router.push(
			{
				pathname,
				query: {
					...restQuery,
					...(!!currentFormState.length
						? { brand: currentFormState.join(",") }
						: {}),
				},
			},
			undefined,
			{ scroll: false }
		);

	}
	const items = data?.brands;

	return (
		<div className="block border-b border-gray-300 pb-7 mb-7">
			<style>
				{`/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}`}
			</style>
			<h3 className="text-heading text-sm md:text-base font-semibold mb-7">
				{t("text-brands")}
			</h3>
			<input type="search" onChange={handleFilter} placeholder="Marka ara..." style={{ width:'100%',
				fontFamily: 'Open Sans, sans-serif',
				fontSize: 14,
				fontWeight: 400,
				padding: '12px 20px',
				margin: '8px 0',
				boxSizing: 'border-box',
				border: '1px solid #555'
			}} />
			<div className="mt-2 flex flex-col space-y-4" style={{ height: 400, overflow: 'auto' }}>

				{items?.filter(f => f.name.toLowerCase().includes(filteredState.toLocaleLowerCase())).sort((a, b) => {
					var textA = a.name.toUpperCase();
					var textB = b.name.toUpperCase();
					return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
				}).map((item: any) => (
					<CheckBox
						key={item.id}
						label={item.name.toUpperCase()}
						name={item.name.toUpperCase()}
						checked={formState.includes(item.slug)}
						value={item.slug}
						onChange={handleItemClick}
					/>
				))}
			</div>
		</div>
	);
};
