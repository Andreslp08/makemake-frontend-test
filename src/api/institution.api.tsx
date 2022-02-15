import { Institution, Student, Course } from "../interfaces/data.interfaces";
import INSTITUTIONS_JSON from "./data.json";

export default class InstitutionAPI {
	/**
	 * retorna un arreglo con todas las instituciones desde el archivo JSON, esto solo se utiliza para cargar la información inicial, luego solo se hace uso de la store de redux
	 * @returns
	 */
	static async getAll(): Promise<Institution[]> {
		try {
			const data = INSTITUTIONS_JSON.data;
			const insititutions: Institution[] = data.map((_institution, i) => {
				const institution: Institution = {
					id: _institution.nombre.replace(" ", "-").toLowerCase(),
					color: _institution.color,
					assignedBooks: _institution.librosAsignados,
					teachers: _institution.profesores,
					email: _institution.correo,
					assignedPackage: _institution.paqueteAsignado,
					name: _institution.nombre,
					phone: _institution.telefono,
					students: _institution.estudiantes.map((student) => {
						return { id: student.id, name: student.estudianteNombre };
					}),
					courses: _institution.cursos.map((course) => {
						return { id: course.id, name: course.cursoNombre };
					}),
				};
				return institution;
			});
			return Promise.resolve(insititutions);
		} catch (error) {
			return Promise.reject(error);
		}
	}

}
