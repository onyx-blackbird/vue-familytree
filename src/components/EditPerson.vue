<template>
	<modal :show="showModal" @close="onCloseModal()">
		<div class="table">
			<div class="row">
				<label>Gender:</label>
				<div class="radioGroup">
					<label><input type="radio" name="gender" value="male"
							v-model="currentPerson.gender"/>
						male
					</label>
					<label>
						<input type="radio"	name="gender" value="female"
							v-model="currentPerson.gender"/>
						female
					</label>
				</div>
			</div>
			<div class="row">
				<label for="firstName">First name:</label>
				<input type="text" id="firstName" v-model="currentPerson.firstName" />
			</div>
			<div class="row">
				<label>Middle names</label>
				<div class="multifield">
					<div v-for="(name, index) in currentPerson.middleNames" :key="index" class="field">
						<input type="text" required	v-model="currentPerson.middleNames[index]"/>
						<button @click="onRemoveName(index)" class="removeField">[-]</button>
					</div>
					<button @click="onAddName()">[+]</button>
				</div>
			</div>
			<div class="row">
				<label for="lastName">Last name:</label>
				<input type="text" id="lastName" v-model="currentPerson.lastName" />
			</div>
			<div class="row">
				<label for="dateOfBirth">Date of birth:</label>
				<input type="date" id="dateOfBirth" v-model="currentPerson.dateOfBirth" />
			</div>
			<div class="row">
				<label for="placeOfBirth">Place of birth:</label>
				<input type="text" id="placeOfBirth" v-model="currentPerson.placeOfBirth"/>
			</div>
			<div class="row">
				<label for="dateOfDeath">Date of death:</label>
				<input type="date" id="dateOfDeath" v-model="currentPerson.dateOfDeath" />
			</div>
			<div class="row">
				<label for="placeOfDeath">Place of death:</label>
				<input type="text" id="placeOfDeath" v-model="currentPerson.placeOfDeath"/>
			</div>
			<div class="row">
				<label for="portrait">Portrait</label>
				<div class="dropbox">
					<input type="file" id="portrait" class="input-file"	accept="image/jpeg,image/png"
						@change="onFileChange($event)"/>
					<img v-if="base64" width="60" :src="base64" @load="onLoad()" />
					<p v-else>Drag image here or click to select from disk</p>
				</div>
			</div>
		</div>
		<div class="buttonrow">
			<button v-if="(editMode === EditMode.PERSON || editMode === EditMode.CHILD) && !currentPerson.spouse"
				@click="onAddPartner()">add partner</button>
			<button v-if="editMode === EditMode.PARENT"
				@click="onAddChild()">add child</button>
			<button @click="onCloseModal()">close</button>
		</div>
	</modal>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

import { IPerson, newPerson } from '../misc/Person';
import { EditMode } from '../misc/Utils';

import Modal from './Modal.vue';

const EMIT_CLOSE = 'close';

export default defineComponent({
	name: 'EditPerson',
	components: {
		Modal,
	},
	props: {
		person: {
			type: Object as PropType<IPerson>,
			required: true,
		},
		mode: {
			type: String as PropType<EditMode>,
			required: true,
		},
	},
	emits: [EMIT_CLOSE],
	setup: (props, { emit }) => {
		const base64 = ref('');
		const showModal = ref(true);
		const currentPerson = ref<IPerson>(props.person);
		const editMode = ref(props.mode);

		function onAddName(): void {
			currentPerson.value.middleNames.push('');
		}
		function onRemoveName(index: number): void {
			currentPerson.value.middleNames.splice(index, 1);
		}

		function onFileChange(event: Event): void {
			const fileInput: HTMLInputElement = event.target as HTMLInputElement;
			if (fileInput.files && fileInput.files.length > 0) {
				const file = fileInput.files.item(0);
				if (file) {
					currentPerson.value.portrait = {
						fileName: file.name,
						mimeType: file.type,
					};
					base64.value = URL.createObjectURL(file);
				}
				fileInput.value = '';
			}
		}
		function onLoad(): void {
			URL.revokeObjectURL(base64.value);
		}

		function onAddChild(): void {
			const child = newPerson();
			currentPerson.value?.children.push(child);
			currentPerson.value = child;
			editMode.value = EditMode.CHILD;
			base64.value = '';
		}
		function onAddPartner(): void {
			if (currentPerson.value) {
				const partner = newPerson();
				if (currentPerson.value.parent) {
					currentPerson.value.spouse = partner;
					editMode.value = EditMode.SPOUSE;
				} else {
					currentPerson.value.parent = partner;
					editMode.value = EditMode.PARENT;
				}
				currentPerson.value = partner;
				base64.value = '';
			}
		}
		function onCloseModal(): void {
			showModal.value = false;
			emit(EMIT_CLOSE);
		}
		return {
			base64,
			currentPerson,
			EditMode,
			editMode,
			showModal,
			onAddName,
			onRemoveName,
			onFileChange,
			onLoad,
			onAddChild,
			onAddPartner,
			onCloseModal,
		};
	},
});
</script>
