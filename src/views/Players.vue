<template>
	<div>
		<v-content>
			<div class="container">
				<v-card-title>1. Enter players</v-card-title>
				<v-form>
					<v-text-field v-model="playerName" :counter="10" label="First name" required></v-text-field>
					<v-btn @click="addPlayerMethod" :disabled="!playerName.length" color="primary">Add player</v-btn>
				</v-form>
				<v-card class="mx-auto player-card" max-width="400" tile>
					<v-list height rounded>
						<v-subheader>Players:</v-subheader>
						<v-list-item>
							<v-list-item-content>
								<v-list-item-title v-for="(player, index) in players" :key="index">{{player}}</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list>
				</v-card>
				<v-btn class="ma-2" @click="$router.push({ name: 'TeamSize' });" color="primary" dark>Next
					<v-icon dark right>mdi-arrow-right</v-icon>
				</v-btn>
			</div>
		</v-content>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
	name: 'Players',
	data() {
		return {
			playerName: ''
		};
	},
	computed: {
		...mapState(['players'])
	},
	methods: {
		addPlayerMethod() {
			this.addPlayer(this.playerName);
			this.playerName = '';
		},
		...mapActions(['addPlayer'])
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
