<template>
	<div>
		<v-main>
			<div class="container">
				<v-card-title>7. Set teammates</v-card-title>

				<v-checkbox v-model="selected" v-for="(player, index) in players" :key="index" :label="getPlayerInfo(player)"
										:value="player"></v-checkbox>

				<v-text-field single-line solo v-model="percentage" label="Set percentage" type="number" required></v-text-field>
				<v-btn @click="addTeamMatesRuleMethod" :disabled="percentage <= 0 && percentage < 100" color="primary">Add teammates rule</v-btn>

				<v-btn class="ma-2" @click="goTo" color="primary" dark>Next
					<v-icon dark right>mdi-arrow-right</v-icon>
				</v-btn>
			</div>
		</v-main>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
	name: 'Teammates',
	data() {
		return {
			selected: [],
			percentage: 0
		};
	},
	computed: {
		...mapState(['players', 'teams'])
	},

	methods: {
		...mapActions(['setTeammates']),
		getPlayerInfo(player) {
			return `${this.getPlayerName(player)} / ${player.price} / ${player.position}`;
		},
		addTeamMatesRuleMethod() {
			this.setTeammates([this.selected, this.percentage]);
		},
		goTo() {
			this.$router.push({ name: 'DisplayTeams' });
		}
	}
};
</script>

<style lang="scss">
.container {

}
</style>
