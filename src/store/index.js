import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		positions: {},
		players: [],
		allPlayers: [],
		teamSize: 0,
		numberOfCombinations: 0,
		sumOfCaptainPercentage: 0,
		teams: [],
		tournamentBudget: 0
	},
	mutations: {
		ADD_ALL_PLAYERS(state, payload) {
			payload.forEach(player => {
				if (player.lineup === 'expected' || player.lineup === 'possible')
					state.allPlayers.push({ ...player.realPlayer, price: player.price, position: player.position });
			});
		},
		SET_POSITIONS(state, payload) {
			state.positions = payload;
		},
		SET_TOURNAMENT_BUDGET(state, payload) {
			state.tournamentBudget = payload.budget;
		},
		SAVE_SELECTED_PLAYERS(state, payload) {
			state.players = payload;
		},
		SET_TEAM_SIZE(state, payload) {
			state.teamSize = payload;
		},
		SET_COMBINATION_NUMBER(state, payload) {
			state.numberOfCombinations = payload;
		},
		RESET_SUM_COUNTER(state) {
			state.sumOfCaptainPercentage = 0;
		},
		SET_SKELETON(state) {
			const team = [];
			// add GK positions to skeleton
			for (let i = 0; i < state.positions.goalkeeper; i++) {
				team.push({
					player: '',
					captain: false,
					viceCaptain: false,
					position: 'goalkeeper'
				});
			}
			// add DEF positions to skeleton
			for (let i = 0; i < state.positions.defender; i++) {
				team.push({
					player: '',
					captain: false,
					viceCaptain: false,
					position: 'defender'
				});
			}
			// add MID positions to skeleton
			for (let i = 0; i < state.positions.midfielder; i++) {
				team.push({
					player: '',
					captain: false,
					viceCaptain: false,
					position: 'midfielder'
				});
			}
			// add FOR positions to skeleton
			for (let i = 0; i < state.positions.forward; i++) {
				team.push({
					player: '',
					captain: false,
					viceCaptain: false,
					position: 'forward'
				});
			}
			for (let i = 0; i < state.numberOfCombinations; i++) {
				state.teams.push(
					{
						players: JSON.parse(JSON.stringify(team)),
						playersCost: 0
					});
			}
		},
		SET_CAPTAIN(state, [captainToSet, percentage, isCaptainRule]) {
			// if it is vice captain rule, reset sumOfCaptainPercentage counter
			let freePositionOnTeam;
			let isPlayerAffordable;
			let isCaptainPositionAvailable;
			let isPlayerNotAlreadyInTeam;
			state.sumOfCaptainPercentage += parseInt(percentage);
			let numberOfTeamsToSetCaptain = Math.floor((state.numberOfCombinations * percentage) / 100);
			if (state.sumOfCaptainPercentage <= 100) {
				for (let i = 0; i < state.numberOfCombinations; i++) {
					if (numberOfTeamsToSetCaptain === 0)
						break;
					else {
						isPlayerAffordable = state.teams[i].playersCost + captainToSet.price <= state.tournamentBudget;
						freePositionOnTeam = state.teams[i].players.find(player => player.position === captainToSet.position && player.player === '');
						isCaptainPositionAvailable = !state.teams[i].players.find(player => isCaptainRule ? player.captain : player.viceCaptain);
						// if you cannot find captain in this team, then position is available
						isPlayerNotAlreadyInTeam = !state.teams[i].players.find(player => player.player !== '' && player.player.id === captainToSet.id);

						console.log(isCaptainPositionAvailable);
						console.log(!isCaptainPositionAvailable);
						if (freePositionOnTeam && isPlayerAffordable && isCaptainPositionAvailable && isPlayerNotAlreadyInTeam) {
							freePositionOnTeam.player = captainToSet;
							isCaptainRule ? freePositionOnTeam.captain = true : freePositionOnTeam.viceCaptain = true;
							state.teams[i].playersCost += captainToSet.price;
							numberOfTeamsToSetCaptain--;
						}
					}
				}
			}
			else {
				state.sumOfCaptainPercentage -= parseInt(percentage);
				console.log(state.sumOfCaptainPercentage);
				Vue.$toast.error(`error: percentage of teams without captain is ${100 - state.sumOfCaptainPercentage}`);
			}
			// check if condition is fulfilled
			if (numberOfTeamsToSetCaptain > 0)
				Vue.$toast.error("budget error: condition isn't fulfilled");
			else
				Vue.$toast.info(`player ${captainToSet.firstName} will be captain in ${percentage} % of the teams`);
		},
		SET_TEAMMATES(state, [subTeamToSet, percentage]) {
			console.log(subTeamToSet);
			let isTeamHaveAvailableSpots;
			let isTeamHaveBudget;
			let teamMatesSumBudget = 0;
			state.sumOfCaptainPercentage += parseInt(percentage);
			const numberOfTeamsToSetCaptain = Math.floor((state.numberOfCombinations * percentage) / 100);
			if (state.sumOfCaptainPercentage <= 100) {
				for (let i = 0; i < state.numberOfCombinations; i++) {
					if (numberOfTeamsToSetCaptain === 0)
						break;
					else {
						isTeamHaveAvailableSpots = state.teams[i].players.filter(playerInTeam => playerInTeam.player === '').length >= subTeamToSet.length;
						subTeamToSet.forEach(teamMate => {
							console.log(teamMate.price);
							teamMatesSumBudget += teamMate.price;
						});
						isTeamHaveBudget = teamMatesSumBudget + state.teams[i].playersCost <= state.tournamentBudget;
						console.log(teamMatesSumBudget);
						console.log(isTeamHaveBudget);
						console.log(isTeamHaveAvailableSpots);
						/* if (isTeamHaveAvailableSpots) {
							freePositionOnTeam.player = captainToSet;
							isCaptainRule ? freePositionOnTeam.captain = true : freePositionOnTeam.viceCaptain = true;
							state.teams[i].budget += captainToSet.price;
							numberOfTeamsToSetCaptain--;
						} */
					}
					// reset teammate cost
					teamMatesSumBudget = 0;
				}
			}
			else {
				state.sumOfCaptainPercentage -= parseInt(percentage);
				console.log(state.sumOfCaptainPercentage);
				Vue.$toast.error(`error: percentage of teams without captain is ${100 - state.sumOfCaptainPercentage}`);
			}
			// check if condition is fulfilled
			if (numberOfTeamsToSetCaptain > 0)
				Vue.$toast.error("budget error: condition isn't fulfilled");
			else
				Vue.$toast.info(`player will be captain in ${percentage} % of the teams`);
		}
		/*		SET_CAPTAIN(state, [captainToSet, percentage, isCaptainRule]) {
			// if it is vice captain rule, reset sumOfCaptainPercentage counter
			let captainInCurrentTeam;
			let isPlayerAffordable;
			state.sumOfCaptainPercentage += parseInt(percentage);
			let numberOfTeamsToSetCaptain = Math.floor((state.numberOfCombinations * percentage) / 100);
			if (state.sumOfCaptainPercentage <= 100) {
				for (let i = 0; i < state.numberOfCombinations; i++) {
					if (numberOfTeamsToSetCaptain === 0)
						break;
					else {
						console.log(isCaptainRule);
						captainInCurrentTeam = state.teams[i].players.find(player => isCaptainRule ? player.captain : player.viceCaptain);
						console.log(captainInCurrentTeam);
						isPlayerAffordable = state.teams[i].budget + captainToSet.price <= state.tournamentBudget;
						if (captainInCurrentTeam.player === '' && isPlayerAffordable) {
							captainInCurrentTeam.player = captainToSet;
							state.teams[i].budget += captainToSet.price;
							numberOfTeamsToSetCaptain--;
						}
					}
				}
			}
			else {
				state.sumOfCaptainPercentage -= parseInt(percentage);
				console.log(state.sumOfCaptainPercentage);
				Vue.$toast.error(`error: percentage of teams without captain is ${100 - state.sumOfCaptainPercentage}`);
			}
			// check if condition is fulfilled
			if (numberOfTeamsToSetCaptain > 0)
				Vue.$toast.error("budget error: condition isn't fulfilled");
			else
				Vue.$toast.info(`player ${captainToSet.firstName} will be captain in ${percentage} % of the teams`);
		} */
	},
	actions: {
		setNumberOfPostions({ commit }, positions) {
			commit('SET_POSITIONS', positions);
			commit('SET_TEAM_SIZE', parseInt(positions.goalkeeper) + parseInt(positions.defender) + parseInt(positions.midfielder) + parseInt(positions.forward));
		},
		setPlayers({ commit }, [playerList, tournament]) {
			commit('ADD_ALL_PLAYERS', playerList);
			commit('SET_TOURNAMENT_BUDGET', tournament);
		},
		saveSelectedPlayers({ commit }, playersList) {
			commit('SAVE_SELECTED_PLAYERS', playersList);
		},
		setTeamData({ commit }, [teamSize, numberOfCombinations]) {
			commit('SET_COMBINATION_NUMBER', numberOfCombinations);
			commit('SET_SKELETON');
		},
		addCaptainRule({ commit }, [captain, percentage, isCaptainRule]) {
			commit('SET_CAPTAIN', [captain, percentage, isCaptainRule]);
		},
		resetSumPercantageCounter({ commit }) {
			commit('RESET_SUM_COUNTER');
		},
		setTeammates({ commit }, [teammates, percentage]) {
			commit('SET_TEAMMATES', [teammates, percentage]);
		}
	}
});
