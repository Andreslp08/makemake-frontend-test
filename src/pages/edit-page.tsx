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
type EditForm = {
	name: string;
	phone: string;
	email: string;
	color: string;
	package: string;
};

type DisabledInputs = {
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
		setFocus,
	} = useForm<EditForm>({ mode: "all", reValidateMode: "onSubmit" });
	const [disabledInputs, setDisabledInputs] = useState<DisabledInputs>({
		email: true,
		name: true,
		package: true,
		phone: true,
	});

	const submit: SubmitHandler<EditForm> = (data: EditForm) => {
		console.log(data);
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

	const disabledInput = (
		disabled: boolean,
		inputName: "name" | "email" | "package" | "phone"
	) => {
		setDisabledInputs({ ...disabledInputs, [inputName]: disabled });
	};

	return (
		<div className="edit-page">
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
							{...register("name", {
								validate: (value) => emptyValidation(value),
								disabled: disabledInputs.name,
							})}
						/>
						<button
							className="underlined-button-red  text-xs"
							type="button"
							onClick={() => disabledInput(!disabledInputs.name, "name")}
						>
							 {`${disabledInputs.name?'Editar':'Cancelar'}`}
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
							{...register("phone", {
								validate: (value) => emptyValidation(value),
								disabled: disabledInputs.phone,
							})}
						/>
						<button
							className="underlined-button-red  text-xs"
							type="button"
							onClick={() => disabledInput(!disabledInputs.phone, "phone")}
						>
                            {`${disabledInputs.phone?'Editar':'Cancelar'}`}
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
							{...register("package", { disabled: disabledInputs.package })}
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
							{...register("email", {
								validate: (value) => emailValidation(value),
								disabled: disabledInputs.email,
							})}
						/>
						<button
							className="underlined-button-red  text-xs"
							type="button"
							onClick={() => disabledInput(!disabledInputs.email, "email")}
						>
							 {`${disabledInputs.email?'Editar':'Cancelar'}`}
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
					<div className="field flex items-center ">imagenes</div>
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
