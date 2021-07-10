<template>
<transition name="fade">
      <div id="ipInfo">
      <div v-if="Object.keys(receivedResults).length > 0 && showInfo" class="info--box--outterbox">
        <span @click="hideIpInfo" class="ipInfo--close--icon">&times;</span>
        <div class="info--box--container flex rounded-md">
            <div class="info--box--inner">
              <!-- IP address -->
                <div v-if="receivedResults.ip" :title="receivedResults.ip" class="flex flex-col info--column">
                    <h3>IP address</h3>
                    <span class="text-2xl">{{trimText(receivedResults.ip, 19)}}</span>
                </div>
              <!-- Location -->
              <div v-if="receivedResults.location && receivedResults.location.city" :title="receivedResults.location.city" class="flex flex-col info--column">
                    <h3>Location</h3>
                    <span class="text-2xl">{{trimText(receivedResults.location.city, 25)}}</span>
              </div>
              <!-- Timezone -->
              <div v-if="receivedResults.location && receivedResults.location.timezone" :title="receivedResults.location.timezone" class="flex flex-col info--column">
                    <h3>Timezone</h3>
                    <span class="text-2xl">{{trimText(receivedResults.location.timezone, 15)}}</span>
              </div>
              <!-- ISP -->
              <div v-if="receivedResults.isp" :title="receivedResults.isp" class="flex flex-col info--column">
                    <h3>ISP</h3>
                    <span class="text-2xl">{{trimText(receivedResults.isp, 20)}}</span>
              </div>
            </div>
        </div>
      </div>

    </div>
</transition>

</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      showInfo: true
    }
  },
  props: {
    receivedResults: Object,

  },
  watch: {
    receivedResults(){
      if(!this.showInfo){
        this.showInfo = true;
      } 
    }
  },
  methods: {
    trimText(txt, limit){
      return txt ? (`${txt.split("").length > limit ? txt.split("").slice(0,limit).join("")+"..." : txt}`) : "";
    },
    hideIpInfo(){
      this.showInfo = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  #ipInfo{
    min-height: 130px;
    .info--box--outterbox{
       position: relative;
       box-shadow: var(--box-shaodow);
       &:hover .ipInfo--close--icon{
        display: block;
      }
    }
   
    .ipInfo--close--icon{
      position: absolute;
      right: 0;
      top:0;
      border-radius: 50%;
      background: rgb(228, 228, 228);
      padding:0px 6px;
      font-size: 25px;
     
      cursor: pointer;
      @media only screen and (min-width: 670px) {
         display: none;
      }
    }
    .info--box--container{
      margin-top:30px;
      padding: 12px;
      background-color: #fff;
      z-index: 40;
      display: flex;
      flex-direction: column;
      .info--box--inner{
        display: flex;
        flex-direction: row;
        width:100%;
        > div.info--column {
          margin-right: 29px;
          &:last-of-type{
            margin-right:0;
          }
          span{
            text-overflow: ellipsis;
            white-space: pre-wrap;
          }
          h3{
            text-transform: uppercase;
            margin-bottom: 3px;
            font-size: 1rem;
          }
          align-items: center;
        }
      }
    } 
    @media only screen and (max-width: 570px){
         width: 80%;
        .info--box--container .info--box--inner{
            flex-direction: column;
            justify-content: center;
            flex-wrap: wrap;
            div.info--column{
              margin: 0 0 15px;

            }
        }
        
      }
  }
</style>
