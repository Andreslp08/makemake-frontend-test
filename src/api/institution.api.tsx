import { Institution, Student, Course } from "../interfaces/data.interfaces";
import DATA from "./data.json";

export default class InstitutionAPI {

    private static data:Institution[];
	/**
	 * retorna un arreglo con todas las instituciones
	 * @returns
	 */
	static async getAll(): Promise<Institution[]> {
		try {
			const data = DATA.data;
			const insititutions: Institution[] = data.map((_institution) => {
				const institution: Institution = {
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

	/**
	 * busca y retorna institución por el nombre
	 * @param{string} name - nombre de la institución
	 * @returns retorna una institución por el nombre, si no la encuentra retorna undefined.
	 */
	static async find(name: string): Promise<Institution | undefined> {
		try {
			const data = DATA.data.find((_institution) => _institution.nombre == name);
			let institution: Institution | undefined;
			if (data) {
				institution = {
					color: data.color,
					assignedBooks: data.librosAsignados,
					teachers: data.profesores,
					email: data.correo,
					assignedPackage: data.paqueteAsignado,
					name: data.nombre,
					phone: data.telefono,
					students: data.estudiantes.map((student) => {
						return { id: student.id, name: student.estudianteNombre };
					}),
					courses: data.cursos.map((course) => {
						return { id: course.id, name: course.cursoNombre };
					}),
				};
			} else {
				institution = undefined;
			}

			return Promise.resolve(institution);
		} catch (error) {
			return Promise.reject(error);
		}
	}
}
