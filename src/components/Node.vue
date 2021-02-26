<template>
	<div class="person child"
			:class="person.gender"
			@click="emitOnEdit(EditMode.PERSON)">
		<person :person="person"/>
		<div v-if="canEdit" class="delete"
			@click.stop="onDelete(EditMode.PERSON)">[X]</div>
	</div>
	<template v-if="person.parent">
		<div class="parent">
			<div class="person"
					:class="person.parent.gender"
					@click="emitOnEdit(EditMode.PARENT)">
				<person :person="person.parent"/>
				<div v-if="canEdit" class="delete"
					@click.stop="onDelete(EditMode.PARENT)">[X]</div>
			</div>
			<ul v-if="person.parent.children.length > 0">
				<li v-for="(child, index) in person.parent.children" :key="index">
					<div class="family" :class="{ stepparent: child.spouse }" :style="{ width: (child.nodeCount * 222 + (child.nodeCount - 1) * 10) + 'px' }">
						<node :person="child"
							@edit="emitOnEdit"
							@delete="onDeleteChild(index)"/>
					</div>
				</li>
			</ul>
		</div>
	</template>
	<div v-if="person.spouse" class="person spouse"
			:class="person.spouse.gender"
			@click="emitOnEdit(EditMode.SPOUSE)">
		<person :person="person.spouse"/>
		<div v-if="canEdit" class="delete"
			@click.stop="onDelete(EditMode.SPOUSE)">[X]</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { IPerson } from '../misc/Person';
import { EditMode } from '../misc/Utils';

import Person from './Person.vue';

const EMIT_DELETE = 'delete';
const EMIT_EDIT = 'edit';

export default defineComponent({
	name: 'Node',
	components: {
		Person,
	},
	props: {
		person: {
			type: Object as PropType<IPerson>,
			required: true,
		},
	},
	emits: [EMIT_DELETE, EMIT_EDIT],
	setup: (props, { emit }) => {
		const canEdit = import.meta.env.DEV;

		function emitOnEdit(mode: EditMode, person?: IPerson): void {
			if (person) {
				emit(EMIT_EDIT, mode, person);
			} else {
				switch (mode) {
					case EditMode.PARENT:
						emit(EMIT_EDIT, mode, props.person.parent);
						break;
					case EditMode.SPOUSE:
						emit(EMIT_EDIT, mode, props.person.spouse);
						break;
					case EditMode.PERSON:
					default:
						emit(EMIT_EDIT, mode, props.person);
						break;
				}
			}
		}
		function onDelete(mode: EditMode): void {
			switch (mode) {
				case EditMode.PARENT:
					props.person.parent = null;
					break;
				case EditMode.SPOUSE:
					props.person.spouse = null;
					break;
				case EditMode.PERSON:
				default:
					emit(EMIT_DELETE);
					break;
			}
		}
		function onDeleteChild(index: number): void {
			props.person.parent?.children.splice(index, 1);
		}
		return {
			canEdit,
			EditMode,
			emitOnEdit,
			onDelete,
			onDeleteChild,
		};
	},
});
</script>

<style>
.person {
	border: 2px solid #000000;
	padding: 10px;
	min-width: 200px;
	min-height: 84px;
	background-color: #ffffff;
	display: inline-block;
	position: relative;
}
.person .found {
	background: #c8e4f8;
}

.person.f,
.person.female {
	border-color: #f45b69;
}

.person.m,
.person.male {
	border-color: #456990;
}

.person .delete {
	position: absolute;
	bottom: 5px;
	right: 5px;
	cursor: pointer;
}
</style>

