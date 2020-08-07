<template>
	<div>
		<v-content>
			<div class="container">
				<v-card-title>3. Set team Size</v-card-title>
				<v-form>
					<v-text-field single-line solo v-model="numberOfCombinations" label="Number of combinations" type="number" required></v-text-field>
				</v-form>

				<v-btn class="ma-2" @click="setTeamDataMethod" color="primary" dark>Next
					<v-icon dark right>mdi-arrow-right</v-icon>
				</v-btn>
			</div>
		</v-content>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
	name: 'TeamSize',
	data() {
		return {
			numberOfCombinations: 10 // TODO
		};
	},
	computed: {
		...mapState(['teams'])
	},
	methods: {
		setTeamDataMethod() {
			console.log('here');
			this.setTeamData([this.teamSize, this.numberOfCombinations]);
			this.$router.push({ name: 'SelectionOfPlayers' });
		},
		...mapActions(['setTeamData', 'setSkeleton'])
	}
};
</script>

<style lang="scss">
.container {
	max-width: 800px;
	.v-card__title { padding-left: 0; }
	.player-card {
		margin-top: 40px;
	}
}
	.v-toolbar__content a h2 { color: #fff !important; }
</style>
