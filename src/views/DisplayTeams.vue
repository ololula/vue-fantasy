<template>
	<div>
		<v-content>
			<div class="container wider" >
				<v-card-title>8. Teams:</v-card-title>
				<div class="teams">
					<v-card v-for="(team, index) in teams" :key="index" >
						<v-card-title> Team {{index + 1}}</v-card-title>
						<v-card-subtitle> Price: {{ team.playersCost}}</v-card-subtitle>
						<div class="players">
							<v-card-text v-for="player in team.players" :key="player.id">
								<span class="position">{{player.position}}</span>
								<div v-if="player.player">
									<span v-if="player.captain" class="captain">C</span>
									<span v-else-if="player.viceCaptain" class=" captain vice-captain">VC</span>
									<span class="player-name">{{ getPlayerName(player.player) }}</span>
								</div>
								<div v-else>-</div>
							</v-card-text>
						</div>
					</v-card>
				</div>
			</div>
		</v-content>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'DisplayTeams',
	data() {
		return {
		};
	},
	computed: {
		...mapState(['teams'])
	},
};
</script>

<style lang="scss">
.container.wider {
	max-width: 1600px;
}
	.teams {
		display: flex;
		flex-wrap: wrap;
		.v-card {
			flex: 0 1 31%;
			margin: 19px 20px 0 0;
		}

		.v-card__title {
			padding-left: 16px;
		}
	}
	.players {
		display: flex;
		flex-wrap: wrap;

		.v-card__text {
			width: auto;
			flex: 0 1 33%;
		}
		.player-name {
			font-weight: bold;
		}

		.captain {
			position: relative;
			display: inline-block;
			background-color: transparent;
			z-index: 1;
			padding-right: 14px;
			&:before {
				content: "";
				display: block;
				position: absolute;
				background: #c7c746;
				color: white;
				border-radius: 50%;
				width: 16px;
				height: 16px;
				z-index: -1;
				top: 3px;
				left: -2px;
			}
			&.vice-captain {
				&:before {
					background: #b3b3987d;
					width: 26px;
					height: 19px;
					top: 1px;
					left: -3px;
				}
			}
			}
		}

</style>
