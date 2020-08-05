<template>
	<div>
		<v-main>
			<div class="container">
				<v-card-title>3. Set Captain Rule</v-card-title>
				<v-radio-group v-model="captain" :mandatory="false">
					<v-radio v-for="player in players" :key="player.id" :label="getPlayerName(player)" :value="player"></v-radio>
				</v-radio-group>
				<v-text-field single-line solo v-model="percentage" label="Set percentage" type="number" required></v-text-field>
				<v-btn @click="addCaptainRuleMethod" :disabled="percentage <= 0 && percentage < 100" color="primary">Add captain rule</v-btn>

				<v-btn class="ma-2" @click="goToVCaptain" color="primary" dark>Next
					<v-icon dark right>mdi-arrow-right</v-icon>
				</v-btn>
			</div>
		</v-main>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
	name: 'CaptainRule',
	data() {
		return {
			captain: [],
			percentage: 0
		};
	},
	computed: {
		...mapState(['players', 'teams'])
	},

	methods: {
		...mapActions(['addCaptainRule', 'resetSumPercantageCounter']),
		addCaptainRuleMethod() {
			// true is flag for captain, false is for vice captain
			this.addCaptainRule([this.captain, this.percentage, true]);
			// Vue.$toast.error(`error: there aren’t that many teams without a captain`);
		},
		goToVCaptain() {
			// reset sumOfCaptainPercentage counter for viceCaptain rule so we can use same function
			this.resetSumPercantageCounter();
			this.$router.push({ name: 'ViceCaptainRule' });
		}
	}
};
</script>

<style lang="scss">
.container {

}
</style>
