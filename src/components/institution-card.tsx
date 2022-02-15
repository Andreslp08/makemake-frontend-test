import React from "react";
import { Institution } from "../interfaces/data.interfaces";
import { ReactComponent as BirreteIcon } from "../assets/svg/icons/birrete.svg";
import { ReactComponent as BookIcon } from "../assets/svg/icons/libro.svg";
import { ReactComponent as UserIcon } from "../assets/svg/icons/usuario.svg";
import { ReactComponent as StatsIcon } from "../assets/svg/icons/estadisticas-barra.svg";
import { Icon } from "@iconify/react";

interface InstitutionCardProps {
	institution: Institution;
	onEditClick?(insititution: Institution): void; //callback para cuando el boton de editar sea presionado
}

export const InstitutionCard: React.FC<InstitutionCardProps> = ({ institution, onEditClick }) => {
	return (
		<div className="institution-card">
			<h3 className="title" style={{ backgroundColor: institution.color }}>
				{institution.name}
			</h3>
			<div className="option">
				<div className="flex flex-wrap items-center">
					<BirreteIcon className="icon" />
					<p className="text-bold text-md">{institution.courses.length || 0} cursos</p>
				</div>
				<p className="underlined-button-red">Ver todos</p>
			</div>
			<div className="option">
				<div className="flex flex-wrap items-center">
					<UserIcon className="icon" />
					<p className="text-bold text-md">
						{institution.students.length || 0} estudiantes
					</p>
				</div>
				<p className="underlined-button-red">Ver todos</p>
			</div>
			<div className="option">
				<div className="flex flex-wrap items-center">
					<BookIcon className="icon" />
					<p className="text-bold text-md">
						{institution.assignedBooks} libros asignados
					</p>
				</div>
				<p className="underlined-button-red">Ver todos</p>
			</div>
			<div className="option">
				<div className="flex flex-wrap items-center">
					<Icon className="icon" icon={"fa-solid:book-reader"} />
					<p className="text-bold text-md">{institution.teachers} profesores</p>
				</div>
				<p className="underlined-button-red">Ver todos</p>
			</div>
			<div className="flex flex-wrap items-center">
				<StatsIcon className="icon fill-red" />
				<button className="underlined-button-red">Ver estadisticas</button>
			</div>
			<button
				className="button-yellow text-black"
				onClick={() => onEditClick && onEditClick(institution)}
			>
				Editar sede
			</button>
		</div>
	);
};
