export function globalVue() {
	return {
		methods: {
			getPlayerName(player) {
				const name = player.firstName ? player.firstName : '';
				const surname = player.lastName ? player.lastName : '';
				return name + ' ' + surname;
			}
		}
	};
}
