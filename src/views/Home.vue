<template>
  <div id="home" class="flex flex-col h-screen max-h-screen">
    <!-- Search / results  -->
    <div
      class="flex justify-center items-center flex-col relative bg-hero-pattern bg-cover px-4 pt-9 pb-9 home--inner"
    >
      <!-- Search input -->
      <SearchForm :isLoadingResults="isLoadingResults" />
      <!-- IP Info -->
      <IpInfo :receivedResults="receivedResults" />
    </div>
    <!-- Map -->
    <Map :receivedResults="receivedResults"  />
  </div>
</template>

<script>
// @ is an alias to /src

import SearchForm from "../components/SeachForm";
import Map from "../components/Map";
import IpInfo from "../components/IpInfo";

export default {
  name: "Home",
  computed: {
    receivedResults() {
      return this.$store.getters.getSearchResults
    },
    isLoadingResults () {
      return this.$store.getters.getLoadingState
    }
  },
  components: {
    SearchForm,
    IpInfo,
    Map
  },
  created() {
    // experiment
        // var d = new Date();
        // var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        // var nd = new Date(utc + (3600000* -4));
        // console.log( nd.toLocaleString(), 10800);

        // console.log(`${new Date(this.currentCity?.dt * 1000).toLocaleString('en-us', {weekday: "long"})} ${new Date(this.currentCity?.dt * 1000).toLocaleString('en-us', {hour: "numeric"})}`);
        // 
    // let unix_timestamp = 10800;
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    // var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    // var hours = date.getHours();
    // Minutes part from the timestamp
    // var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    // var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    // var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    // console.log(formattedTime);
  }
};
</script>

<style>
#mapid {
  height: 100%;
  z-index: 10;
}
#home,
#home .home--inner,
#mapid {
  width: 100%;
}
</style>
