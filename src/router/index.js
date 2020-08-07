import Vue from 'vue';
import VueRouter from 'vue-router';
import Players from '../views/Players.vue';
import TeamSize from '../views/TeamSize.vue';
import MatchID from '../views/MatchID.vue';
import SelectionOfPlayers from '../views/SelectionOfPlayers.vue';
import CaptainRule from '../views/CaptainRule.vue';
import ViceCaptainRule from '../views/ViceCaptain.vue';
import SetPositions from '../views/setPostions';
import SetTeammates from '../views/setTeammates';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'MatchID',
		component: MatchID
	},
	{
		path: '/select-players',
		name: 'SelectionOfPlayers',
		component: SelectionOfPlayers
	},
	{
		path: '/captain-rule',
		name: 'CaptainRule',
		component: CaptainRule
	},
	{
		path: '/vice-captain-rule',
		name: 'ViceCaptainRule',
		component: ViceCaptainRule
	},
	{
		path: '/players',
		name: 'Players',
		component: Players
	},
	{
		path: '/team-size',
		name: 'TeamSize',
		component: TeamSize
	},
	{
		path: '/team-size',
		name: 'SetPositions',
		component: SetPositions
	},
	{
		path: '/stack',
		name: 'SetTeammates',
		component: SetTeammates
	}
];

const router = new VueRouter({
	routes
});

export default router;
