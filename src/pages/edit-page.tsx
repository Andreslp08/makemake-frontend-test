import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { BreadCrumbs, BreadCrumbsLink } from "../components/breadcrumbs";
import { isEmail, notEmpty } from "../helpers/form-validations";
import { ReactComponent as ThrashIcon } from "../assets/svg/icons/basura.svg";
import { useSelector } from "react-redux";
import { MainStore } from "../interfaces/store.interface";
import InstitutionAPI from "../api/institution.api";
import { store } from "../redux/store";
import { institutionsSlice } from "../redux/slices/institutions.silce";
import { ColorSelector } from "../components/color-selector";
import { Institution } from "../interfaces/data.interfaces";
type EditForm = {
	name: string;
	phone: string;
	email: string;
	color: string;
	package: string;
};

type EditableInputs = {
	name: boolean;
	phone: boolean;
	email: boolean;
	package: boolean;
};

export const EditPage: React.FC = () => {
	const params = useParams();
	const institution = useSelector((state: MainStore) =>
		state.institutions.find((institution) => institution.id == params.id)
	);
	const institutions = useSelector((state: MainStore) => state.institutions);
	const navigate = useNavigate();
	const {
		formState: { errors },
		handleSubmit,
		register,
		getFieldState,
		getValues,
		setValue,
	} = useForm<EditForm>({ mode: "all", reValidateMode: "onSubmit" });
	const [editableInputs, setEditableInputs] = useState<EditableInputs>({
		email: true,
		name: true,
		package: true,
		phone: true,
	});

	const submit: SubmitHandler<EditForm> = (data: EditForm) => {
		if (institution) {
			const updatedData: Institution = {
				...institution,
				email: data.email,
				phone: data.phone,
				color: data.color,
				name: data.name,
				assignedPackage: data.package,
				id: data.name.trim().replace(" ", "-").toLowerCase(),
			};
			store.dispatch(
				institutionsSlice.actions.updateOne({
					id: institution.id,
					institution: updatedData,
				})
			);
			navigate(`/institutos/${updatedData.id}/editar`);
		}
	};

	const emptyValidation = (value: string): string | boolean => {
		if (notEmpty(value)) {
			return true;
		} else {
			return "El campo no puede estar vacio.";
		}
	};

	const emailValidation = (value: string): string | boolean => {
		const notEmpty = emptyValidation(value);
		if (typeof notEmpty == "string") {
			return notEmpty;
		}
		if (isEmail(value)) {
			return true;
		} else {
			return "El correo ingresado no tiene un formato valido.";
		}
	};

	useEffect(() => {
		window.scrollTo({ top: 0 });
		const loadStore = async () => {
			if (institutions.length <= 0)
				await InstitutionAPI.getAll().then((result) => {
					store.dispatch(institutionsSlice.actions.set(result));
				});
		};
		loadStore();
	}, []);

	useEffect(() => {
		const loadInstitutionData = () => {
			setValue("name", institution?.name || "N/A");
			setValue("email", institution?.email || "N/A");
			setValue("phone", institution?.phone || "N/A");
			setValue("package", institution?.assignedPackage || "N/A");
			setValue("color", institution?.color || "");
		};
		loadInstitutionData();
	}, [institution]);

	const setEditableInput = (
		editable: boolean,
		inputName: "name" | "email" | "package" | "phone"
	) => {
		setEditableInputs({ ...editableInputs, [inputName]: editable });
	};

	return (
		<div className="w-full">
			<BreadCrumbs>
				<BreadCrumbsLink text="institutos" onSelect={() => navigate("/institutos")} />
				<BreadCrumbsLink text="Editar instituto" current />
			</BreadCrumbs>
			<form className="form w-full" autoComplete="off" onSubmit={handleSubmit(submit)}>
				<legend className="legend">Editar sede</legend>
				<fieldset className="fieldset">
					<label htmlFor="name" className="label">
						Nombre<span className="required">*</span>
					</label>
					<div className="field flex items-center ">
						<input
							type="text"
							className={`text-field ${getFieldState("name").invalid && "invalid"}`}
							id="name"
							placeholder="Nombre"
							defaultValue={getValues("name")}
							readOnly={editableInputs.name}
							{...register("name", {
								validate: (value) => emptyValidation(value),
							})}
						/>
						<button
							className="underlined-button-red  text-xs"
							type="button"
							onClick={() => setEditableInput(!editableInputs.name, "name")}
						>
							{`${editableInputs.name ? "Editar" : "Cancelar"}`}
						</button>
					</div>
					<p className="message color-red">{errors.name?.message}</p>
				</fieldset>
				<fieldset className="fieldset">
					<label htmlFor="phone" className="label">
						Teléfono de contacto
						<p className="description">
							El número que ingreses corresponde al número de contacto donde los
							usuarios podrán llamar si es necesario.
						</p>
					</label>
					<div className="field flex items-center ">
						<input
							type="text"
							className={`text-field ${getFieldState("phone").invalid && "invalid"}`}
							id="phone"
							placeholder="Número de contacto"
							defaultValue={getValues("phone")}
							readOnly={editableInputs.phone}
							{...register("phone", {
								validate: (value) => emptyValidation(value),
							})}
						/>
						<button
							className="underlined-button-red  text-xs"
							type="button"
							onClick={() => setEditableInput(!editableInputs.phone, "phone")}
						>
							{`${editableInputs.phone ? "Editar" : "Cancelar"}`}
						</button>
					</div>
					<p className="message color-red">{errors.phone?.message}</p>
				</fieldset>
				<fieldset className="fieldset">
					<label htmlFor="package" className="label">
						Paquete asignado <span className="required">*</span>
						<p className="description">Ya no se puede cambiar</p>
					</label>
					<div className="field flex items-center ">
						<input
							type="text"
							className={`text-field`}
							id="package"
							placeholder="Paquete"
							defaultValue={getValues("package")}
							readOnly={editableInputs.package}
						/>
					</div>
				</fieldset>
				<fieldset className="fieldset">
					<label htmlFor="email" className="label">
						Correo de contacto
						<p className="description">
							El correo que ingreses corresponde al correo de contacto donde los
							usuarios podrán contactarte si es necesario.
						</p>
					</label>
					<div className="field flex items-center ">
						<input
							type="text"
							className={`text-field ${getFieldState("email").invalid && "invalid"}`}
							id="email"
							placeholder="Correo electronico"
							defaultValue={getValues("email")}
							readOnly={editableInputs.email}
							{...register("email", {
								validate: (value) => emailValidation(value),
							})}
						/>
						<button
							className="underlined-button-red  text-xs"
							type="button"
							onClick={() => setEditableInput(!editableInputs.email, "email")}
						>
							{`${editableInputs.email ? "Editar" : "Cancelar"}`}
						</button>
					</div>
					<p className="message color-red">{errors.email?.message}</p>
				</fieldset>
				<fieldset className="fieldset">
					<label className="label">
						Color del instituto (opcional)
						<p className="description">
							Esta imagen será usada para mostrar el instituto en búsquedas y en su
							página de inicio.
						</p>
					</label>
					<div className="field flex items-center ">
						<ColorSelector onSelect={(color) => setValue("color", color)} defaultColor={institution?.color} />
					</div>
				</fieldset>
				<div className="flex place-self-end items-center">
					<button
						className="underlined-button-red flex text-sm"
						type="button"
						onClick={() => alert("Debería eliminar la sede :)")}
					>
						<ThrashIcon width={"20px"} className="fill-red" />
						Eliminar sede
					</button>
					<button className="bordered-button text-sm" type="submit">
						Actualizar
					</button>
				</div>
			</form>
		</div>
	);
};
