<template>
	<div>
		<v-main>
			<div class="container">
				<v-card-title>2. Set positons</v-card-title>
					<v-form>
						<v-text-field
							v-for="(value, key, index) in positions"
							:key="index"
							v-model="positions[key]"
							placeholder="Placeholder"
							:label="key"
							type="number"
							required>
						</v-text-field>
					</v-form>
				<v-btn class="ma-2" @click="setNumberOfPostionsMethod" color="primary" dark>Next
					<v-icon dark right>mdi-arrow-right</v-icon>
				</v-btn>
			</div>
		</v-main>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
	name: 'SetNumberOfPositions',
	data() {
		return {
			/* positions: {
				GK: 0,
				DEF: 0,
				MID: 0,
				FOR: 0
			}, TODO */
			positions: {
				goalkeeper: 1,
				defender: 5,
				midfielder: 2,
				forward: 3
			}
		};
	},
	computed: {
		...mapState(['allPlayers'])
	},

	methods: {

		setNumberOfPostionsMethod() {
			console.log('here');
			this.setNumberOfPostions(this.positions);
			this.$router.push({ name: 'TeamSize' });
		},
		...mapActions(['setNumberOfPostions'])
	}
};
</script>

<style lang="scss">
.container {
	.players-wrap {
		display: flex;
		flex-wrap: wrap;

		.v-input--selection-controls.v-input {
			flex: 1 1 30%;
		}
	}
}
</style>
