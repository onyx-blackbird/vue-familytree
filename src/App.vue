<template >
	<h1>Family Tree</h1>
	<div class="panel">
		<div class="tree" v-if="root"
			@mousedown="onMouseDown($event)"
			@mouseleave="onMouseLeave()"
			@mouseup="onMouseUp()"
			@mousemove="onMouseMove($event)">
			<ul>
				<li>
					<node :person="root"
						@edit="onEditPerson"/>
				</li>
			</ul>
		</div>
	</div>
	<search/>
	<edit-person v-if="canEdit && currentPerson !== null"
		:person="currentPerson"
		:mode="editMode"
		@close="onClose()"/>
	<button v-if="canEdit" class="save"
		@click="onSave()">Save tree to JSON</button>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import axios from 'axios';

import { IPerson } from './misc/Person';
import { EditMode, saveTree } from './misc/Utils';

import EditPerson from './components/EditPerson.vue';
import Node from './components/Node.vue';
import Search from './components/Search.vue';

export default defineComponent({
	name: 'App',
	components: {
		EditPerson,
		Node,
		Search,
	},
	setup() {
		let isDown = false;
		let startX: number;
		let scrollLeft: number;

		const canEdit = import.meta.env.DEV;
		const currentPerson = ref<IPerson | null>(null);
		const editMode = ref(EditMode.PERSON);

		const root = ref<IPerson|null>(null);
		axios.get<IPerson>('/tree.json').then((response) => root.value = response.data);

		function onMouseDown(e: MouseEvent): void {
			const treeDiv = e.currentTarget as HTMLElement;
			isDown = true;
			startX = e.pageX - treeDiv.offsetLeft;
			scrollLeft = treeDiv.scrollLeft;
		}
		function onMouseLeave(): void {
			isDown = false;
		}
		function onMouseUp(): void {
			isDown = false;
		}
		function onMouseMove(e: MouseEvent): void {
			if (!isDown) return;
			e.preventDefault();
			const treeDiv = e.currentTarget as HTMLElement;
			const x = e.pageX - treeDiv.offsetLeft;
			const walk = x - startX;
			treeDiv.scrollLeft = scrollLeft - walk;
		}

		function onEditPerson(mode: EditMode, person: IPerson): void {
			editMode.value = mode;
			currentPerson.value = person;
		}

		function onClose(): void {
			currentPerson.value = null;
		}
		function onSave(): void {
			if (root.value) {
				saveTree(root.value);
			}
			currentPerson.value = null;
		}
		return {
			canEdit,
			editMode,
			currentPerson,
			root,
			onMouseDown,
			onMouseLeave,
			onMouseUp,
			onMouseMove,
			onEditPerson,
			onClose,
			onSave,
		};
	},
});

</script>

<style>
.save {
	position: fixed;
	right: 50px;
	bottom: 50px;
}
</style>
