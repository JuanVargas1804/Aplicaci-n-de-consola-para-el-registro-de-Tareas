import inquirer from "inquirer";
import colors from "colors";


//Opciones del menú
const menuOpts = [
	{
		type: "list",
		name: "opcion",
		message: "Seleccione una opción",
		choices: [
			{
				value: "1",
				name: `${"1.".bold} Crear tarea`,
			},
			{
				value: "2",
				name: `${"2.".bold} Listar tarea`,
			},
			{
				value: "3",
				name: `${"3.".bold} Listar tareas completadas`,
			},
			{
				value: "4",
				name: `${"4.".bold} Listar tareas pendientes`,
			},
			{
				value: "5",
				name: `${"5.".bold} Completar tareas`,
			},
			{
				value: "6",
				name: `${"6.".bold} Borrar tarea`,
			},
			{
				value: "0",
				name: `${"0.".bold} Salir`,
			},
		],
	},
];


//Para el pausador de pantalla
const menuSalir = [
	{
		type: "input",
		name: "continuar",
		message: "Enter para continuar",
	},
];


//Función para el menu de opciones
const inquirerMenu = async () => {
	console.log("===========================".green);
	console.log("   Seleccione una opción".green);
	console.log("===========================\n".green);

	const { opcion } = await inquirer.prompt(menuOpts);

	return opcion;
};


//Función para la pausa de pantalla
const pausa = async () => {
	console.log("===========================".green);
	console.log("   Seleccione una opción".green);
	console.log("===========================\n".green);

	await inquirer.prompt(menuSalir);

};


// Función para crear una tarea
const leerInput = async(message) => {
	const question = [
		{
			type: "input",
			name: "desc",
			message,
			validate( value ){
				if (value.length === 0 ){
					return "Ingrese un valor por favor";
				}
				return true;
			}
		}
	]



	const {desc} = await inquirer.prompt(question);
	return desc;
	};

const listadoTareasBorrar = async(tareas = []) => {


	const choices = tareas.map( (tarea, i) => {

		const idx = `${i + 1}`.green;
		return {
			value: tarea.id,
			name: `${ idx } ${tarea.description} `,
		}
	})

	choices.unshift({
		value:"0",
		name: '0.' + 'Cancelar',
	})

	const preguntas = [
		{
			type: "list",
			name: "id",
			message: "Borrar",
			choices,
		}
	]

	const { id } = await inquirer.prompt(preguntas);

	return id;

}

const confirmar = async(msg) => {
	const question =[
		{
			type: 'confirm',
			name: 'ok',
			msg,

		}

	]
	
	const { ok } = await inquirer.prompt(question);
	return ok;
}



const listadoCheckList = async(tareas = []) => {


	const choices = tareas.map( (tarea, i) => {

		const idx = `${i + 1}`.green;
		return {
			value: tarea.id,
			name: `${ idx } ${tarea.description} `,
			checked: (tarea.completadoEn) ? true : false,
		}
	})

	choices.unshift({
		value:"0",
		name: '0.' + 'Cancelar',
	})
	
	const pregunta = [
		{
			type: "checkbox",
			name: "ids",
			message: "Seleccione",
			choices,
		}
	]

	const { ids } = await inquirer.prompt(pregunta);

	return ids;

}


export { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, listadoCheckList };
