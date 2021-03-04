<template>
	<div v-if="person.portrait" class="image" :title="person.portrait.dateTaken">
		<img :src="`/portraits/${person.portrait.fileName}`">
	</div>
	<div class="name" :data-first-name="person.firstName" :data-last-name="person.lastName">
		{{ person.firstName }}{{ middle }}{{ person.lastName }}
	</div>
	<div class="dates">
		<span class="birth" v-if="person.dateOfBirth" :title="person.placeOfBirth">• {{getYear(person.dateOfBirth)}}</span>
		<span class="death" v-if="person.dateOfDeath" :title="person.placeOfDeath"> - † {{getYear(person.dateOfDeath)}}</span>
		<span class="unknown" v-if="!person.dateOfBirth && !person.dateOfDeath">unknown</span>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

import { IPerson } from '../misc/Person';

export default defineComponent({
	name: 'Person',
	props: {
		person: {
			type: Object as PropType<IPerson>,
			required: true,
		},
	},
	setup: (prop) => {
		function getYear(dateString: string): number {
			const date = new Date(dateString);
			return date.getFullYear();
		}
		const middle = computed(() => {
			if (prop.person.middleNames.length > 0) {
				return ` ${prop.person.middleNames.join(' ')} `;
			}
			return ' ';
		});
		return {
			middle,
			getYear,
		};
	},
});
</script>

<style>
.person .image {
	float: left;
    height: 80px;
    overflow-y: hidden;
}
.person .image img {
	width: 60px;
}
.person .name {
	font-size: 16px;
	text-align: center;
}
.person .dates {
	text-align: center;
}
</style>
