<template>
  <form @submit="onFormSubmission" class="w-full max-w-screen-sm search--form">
    <h1 class="text-white text-center text-3xl pb-4">IP Address Tracker</h1>
    <div class="flex form--box">
      <input
        :disabled="isLoadingResults"
        v-model.trim="searchIP"
        type="text"
        class="flex-1 py-3 px-4 rounded-tl-md rounded-bl-md search--input"
        placeholder="Search for any IP address or leave it empty to get your IP info"
      />
      <button
        type="submit"
        :disabled="isLoadingResults"
        role="submit"
        :class="{ 'disabled': isLoadingResults }"
        class="submit--btn cursor-pointer bg-black text-white rounded-tr-md rounded-br-md flex items-center px-4"
      >
       <i :class="`${isLoadingResults ? 'fas fa-spinner spin-anim' : 'fas fa-chevron-right'}`"></i>
      </button>
    </div>
  </form>
</template>

<script>
import API from "../services/API";
import Vue from "vue";

export default {
  props: {
    isLoadingResults: Boolean,
  },
  data() {
    return {
      searchIP: "",
    };
  },
  methods: {
    notify({ type, msg }) {
      Vue.$toast.open({
        message: msg,
        type: type,
      });
    },
    onFormSubmission(e) {
      e.preventDefault();
      if (!this.isLoadingResults) {
        const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if (this.searchIP !== "" ? ipRegex.test(this.searchIP) : true) {
          this.$store.dispatch("updateLoading", true);
          new Promise((resolve, reject) => {
            API()
              .get(
                `/v1?apiKey=at_UksQuY2IDZIFLmaW5DcYpFLmv2oVu&ipAddress=${this.searchIP}`
              )
              .then((res) => {
                const data = res.data;
                if (data) {
                  this.$store.dispatch("updateLoading", false);
                  this.$store.dispatch("updateSearchResults", data);
                  this.searchIP = data?.ip;
                  if(!data?.isp && !data.location?.city && !data.location?.region){
                      this.notify({ type: "error", msg: "Most likely this IP address does not exist." });
                  }
                } else {
                  this.notify({ type: "error", msg: "An error occurred." });
                }

                resolve();
              })
              .catch((err) => {
                reject();
                this.$store.dispatch("updateLoading", false);
                this.notify({
                  type: "error",
                  msg: err || "An error occurred.",
                });
              });
          });
        } else {
          this.notify({
            type: "error",
            msg: "Please type a valid IP address.",
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.search--form .form--box{
  box-shadow: var(--box-shaodow);
}
form,
form div,
form input {
  width: 100%;
}
.submit--btn {
  border: none;
  transition: all 0.5s ease-out;
}
.submit--btn,
.search--input {
  &:focus {
    outline: none;
  }
}
</style>