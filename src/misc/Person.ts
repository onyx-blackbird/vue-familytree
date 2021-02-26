export enum Gender {
	MALE = 'male',
	FEMALE = 'female',
}

export interface Portrait {
	fileName: string;
	mimeType: string;
	dateTaken?: string;
}

export interface IPerson {
	firstName: string;
	middleNames: Array<string>;
	lastName: string;
	gender: Gender | null;
	portrait: Portrait | null;
	dateOfBirth: string;
	placeOfBirth: string;
	dateOfMarriage: string;
	placeOfMarriage: string;
	dateOfDeath: string;
	placeOfDeath: string;
	parent: IPerson | null;
	spouse: IPerson | null;
	children: Array<IPerson>;
	nodeCount: number;
}

export function newPerson(): IPerson {
	return {
		firstName: '',
		middleNames: [],
		lastName: '',
		gender: null,
		portrait: null,
		dateOfBirth: '',
		placeOfBirth: '',
		dateOfMarriage: '',
		placeOfMarriage: '',
		dateOfDeath: '',
		placeOfDeath: '',
		parent: null,
		spouse: null,
		children: [],
		nodeCount: 1,
	};
}