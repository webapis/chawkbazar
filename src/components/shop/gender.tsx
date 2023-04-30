import { useGendersQuery } from "@framework/gender/get-all-genders";
import { CheckBox } from "@components/ui/checkbox";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";

export const GenderFilter = () => {
	const { t } = useTranslation("common");
	const router = useRouter();
	const { pathname, query } = router;
	const { data, isLoading } = useGendersQuery({
		
	});

	const selectedGenders = query?.g
		? (query.g as string).split(",")
		: [];
	const [formState, setFormState] = React.useState<string[]>(
		selectedGenders
	);

	React.useEffect(() => {
		setFormState(selectedGenders);
	}, [query?.g]);

	if (isLoading) return <p>Loading...</p>;

	function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
		const { value } = e.currentTarget;
		let currentFormState = formState.includes(value)
			? formState.filter((i) => i !== value)
			: [...formState, value];
		const { g, ...restQuery } = query;

		let nextRouteState =	{
			pathname,
			query: {
				...restQuery,q:undefined,
				...(!!currentFormState.length
					? { g: currentFormState.join(",") }
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
	const items = data?.genders.data;
	return (
		<div className="block border-b border-gray-300 pb-7 mb-7">
			<h3 className="text-heading text-sm md:text-base font-semibold mb-7">
				{t("text-gender")}
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
