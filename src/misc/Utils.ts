import { IPerson } from "./Person";

export enum EditMode {
	PERSON = 'person',
	PARENT = 'parent',
	SPOUSE = 'spouse',
	CHILD = 'child',
}

export function countNodes(person: IPerson): number {
	let count = 0;
	person.children.forEach((child) => {
		count += countNodes(child);
	});
	if (person.parent) {
		count += countNodes(person.parent);
	}
	if (person.spouse && count === 1) {
		count += 1;
	}
	if (count === 0) {
		count = 1;
	}
	person.nodeCount = count;
	return count;
}

export function saveTree(root: IPerson): void {
	countNodes(root);
	const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(root));
	const dlAnchorElem = document.createElement('a')
	dlAnchorElem.setAttribute('href', dataStr);
	dlAnchorElem.setAttribute('download', 'tree.json');
	dlAnchorElem.click();
}
