<template>
	<div>
		<v-main>
			<div class="container">
				<v-card-title>4. Select Players</v-card-title>
				<div class="players-wrap">
					<v-checkbox
						v-model="selected"
						v-for="(player, index) in allPlayers" :key="index"
						:label="getPlayerInfo(player)"
						:value="player"
					></v-checkbox>
				</div>
				<v-btn class="ma-2" @click="saveSelectedPlayersMethod" color="primary" dark>Next
					<v-icon dark right>mdi-arrow-right</v-icon>
				</v-btn>
			</div>
		</v-main>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
	name: 'SelectionOfPlayers',
	data() {
		return {
			matchId: '',
			selected: []
		};
	},
	computed: {
		...mapState(['allPlayers']),
	},

	methods: {
		getPlayerInfo(player) {
			return `${this.getPlayerName(player)} / ${player.price} / ${player.position}`;
		},
		saveSelectedPlayersMethod() {
			this.saveSelectedPlayers(this.selected);
			this.$router.push({ name: 'CaptainRule' });
		},
		...mapActions(['saveSelectedPlayers'])
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
