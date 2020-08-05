<template>
	<div>
		<v-main>
			<div class="container">
				<v-card-title>1. MatchID </v-card-title>
				<v-form>
					{{matchId}}
					<v-text-field single-line solo v-model="matchId" :counter="10" label="Match id"  type="number" required></v-text-field>
				</v-form>
				<v-btn class="ma-2" @click="setMatchIdAndGetData" color="primary" dark>Next
					<v-icon dark right>mdi-arrow-right</v-icon>
				</v-btn>
			</div>
		</v-main>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import axios from '../services/axios';
import Vue from 'vue';
export default {
	name: 'Match',
	data() {
		return {
			matchId: '',
		};
	},

	methods: {
		setMatchIdAndGetData() {
			// this.setMatchId(this.matchId);

			// axios.getTournamentData(this.matchId).then((response) => {
			// axios.getTournamentData('291187').then((response) => { nba
			axios.getTournamentData('291852').then((response) => {
				if (response.data.playerChoices) {
					this.setPlayers([response.data.playerChoices, response.data.tournament]);
					this.$router.push({ name: 'SetPositions' });
				}
				else
					Vue.$toast.error('No players in this match');
			});
		},
		...mapActions(['setPlayers'])
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
</style>
