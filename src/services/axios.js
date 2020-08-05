import axios from 'axios';

const apiClient = axios.create({
	withCredentials: false, // This is the default
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		// 'x-use-mock': true
	}
});

export default {
	getTournamentData(id) {
		return apiClient.get(`https://fanteam-game.api.scoutgg.net/tournaments/${id}/players?bearer%5Bwhite_label%5D=fanteam`);
	}
};
