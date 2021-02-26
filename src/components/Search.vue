<template>
	<div class="search">
		<div class="title">Find person</div>
		<div class="table">
			<div class="row">
				<label for="lastName">Last name:</label>
				<input id="lastName" type="text"
					v-model="lastName"
					@input="findNext(0)"
					@keydown="onKeyDown($event)"/>
			</div>
			<div class="row">
				<label for="firstName">First name:</label>
				<input id="firstName" type="text"
					v-model="firstName"
					@input="findNext(0)"
					@keydown="onKeyDown($event)"/>
			</div>
		</div>
		<button @click="findNext()">Find next person</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
	name: 'Search',
	setup: () => {
		const firstName = ref('');
		const lastName = ref('');
		const foundIndex = ref(0);

		function getQuery(): string {
			let query = '';
			if (firstName.value !== '') {
				query += `[data-first-name^=${firstName.value} i]`;
			}
			if (lastName.value !== '') {
				query += `[data-last-name^=${lastName.value} i]`;
			}
			return query;
		}
		
		function findNext(index?: number): void {
			document.querySelectorAll<HTMLElement>('.found').forEach((found) => found.classList.remove('found'));
			const query = getQuery();
			if (query !== '') {
				const persons = document.querySelectorAll<HTMLElement>(query);
				if (persons && persons.length > 0) {
					if (index !== undefined) {
						foundIndex.value = index;
					} else {
						foundIndex.value++;
					}
					if (foundIndex.value === persons.length) {
						foundIndex.value = 0;
					}
					const person = persons.item(foundIndex.value);
					person.classList.add('found');
					person.scrollIntoView({
						behavior: (index === undefined) ? 'smooth' : 'auto',
						inline: 'center',
					});
				}
			}
		}

		function onKeyDown(event: KeyboardEvent): void {
			if (event.key === 'Enter') {
				findNext();
			}
		};

		return {
			firstName,
			lastName,
			findNext,
			onKeyDown,
		};
	},
});
</script>

<style>
.search {
	background-color: #eee;
	border: 1px solid #000;
	position: fixed;
	right: 50px;
	top: 50px;
}
.search .title {
	font-size: 1.5em;
	font-weight: bold;
	padding: 0.5em
}
.search button {
	float: right;
	margin: 0.5em;
}
</style>
