<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
		<router-link :to="{name: 'MatchID'}"><h2>Fantasy generator</h2></router-link>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

	<router-view>

	</router-view>

  </v-app>
</template>

<script>

export default {
	name: 'App',
	components: {
	}
};
</script>
