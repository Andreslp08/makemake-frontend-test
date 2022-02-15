import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InstitutionAPI from "../api/institution.api";
import { BreadCrumbs, BreadCrumbsLink } from "../components/breadcrumbs";
import { InstitutionCard } from "../components/institution-card";
import { SearchInput } from "../components/search-input";
import { Institution } from "../interfaces/data.interfaces";
import { MainStore } from "../interfaces/store.interface";
import { institutionsSlice } from "../redux/slices/institutions.silce";
import { store } from "../redux/store";

export const InstitutionsPage: React.FC = () => {
	const navigate = useNavigate();
	const institutions = useSelector((state: MainStore) => state.institutions);
	const [filtered, setFiltered] = useState<Institution[]>(institutions);
	useEffect(() => {
		const loadInitialData = async () => {
			await InstitutionAPI.getAll().then((result) => {
				store.dispatch(institutionsSlice.actions.set(result));
				setFiltered(result);
			});
		};
		loadInitialData();
	}, []);

	const filter = (value: string) => {
		// eslint-disable-next-line array-callback-return
		const filteredData = institutions.filter((institution) => {
			if (value === "") {
				return institution;
			} else if (institution.name.toLowerCase().includes(value.toLowerCase())) {
				return institution;
			}
		});
		setFiltered(filteredData);
	};

	return (
		<div className="institutions-page">
			<BreadCrumbs>
				<BreadCrumbsLink text="Institutos" onSelect={() => navigate("/institutos")} />
				<BreadCrumbsLink text="Todos los institutos" />
			</BreadCrumbs>
			<section className="info-grid">
				<h3 className="title divide-y divide-dashed hover:divide-solid">
					Tus institutos (Sedes)
				</h3>
				<h4 className="assigned">--/-- sedes asignadas</h4>
				<p className="filter-message">
					Filtra por instituto y podras ver los cursos asignados.
				</p>
				<p className="suscription-message">
					Su suscripción finaliza el <br /> --/--/--
				</p>
				<SearchInput
					placeholder="Busca aquí el nombre de tu sede"
					onValueChange={(value) => filter(value)}
				/>
			</section>
			<div className="flex flex-wrap flex-row items-center justify-center p-2">
				{filtered.length > 0 ? (
					filtered.map((institution, i) => {
						return (
							<InstitutionCard
								key={`insititution-card-${i}`}
								institution={institution}
							/>
						);
					})
				) : (
					<div className="flex flex-wrap items-center justify-center text-center">
                        <Icon icon={'clarity:sad-face-solid'} width="30px" className="color-orange m-1"/>
						<h4 className="text-md color-onbackground">No se encontraron coincidencias.</h4>
					</div>
				)}
			</div>
		</div>
	);
};
