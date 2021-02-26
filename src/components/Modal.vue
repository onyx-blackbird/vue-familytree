<template>
	<div class="modal-mask" aria-role="dialog" v-show="show"
		@click.self="emitOnClose">
		<div class="modal-wrapper"
			@click.self="emitOnClose">
			<div class="modal-content" :class="{ fit: fitContent }">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const EMIT_CLOSE = 'close';

export default defineComponent({
	name: 'Modal',
	props: {
		show: {
			type: Boolean,
			required: true,
		},
		fitContent: {
			type: Boolean,
			default: false,
		},
	},
	emits: [EMIT_CLOSE],
	setup(props, { emit }) {
		function emitOnClose(): void {
			emit(EMIT_CLOSE);
		}
		return {
			emitOnClose,
		};
	},
});
</script>

<style>
.modal-mask {
	background-color: rgba(0, 0, 0, 0.5);
	display: table;
	position: fixed;
	left: 0;
	top: 0;
	height: 100%;
	width: 100%;
	transition: opacity 0.3s ease;
	z-index: 100;
}
.modal-wrapper {
	display: table-cell;
}
.modal-content {
	background-color: #fff;
	border: 1px solid #333333;
	margin: 10vh auto;
	max-height: 90vh;
	padding: 20px;
	overflow-y: auto;
	transition: all 0.3s ease;
	width: 350px;
}
.modal-content.fit {
	width: fit-content;
	padding: 0;
}
</style>
