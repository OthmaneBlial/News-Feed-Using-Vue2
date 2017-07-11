<template>
  <div>
  <div id="pages">
  <div id="choose-page-one">
  <router-link class="page-anchor" :to="{ name: 'all' }">
    ALL NEWS
  </router-link>
  </div>
  <div id="choose-page-two">
  <router-link class="page-anchor" :to="{ name: 'custom' }">
    NEWS BY CHANNEL
  </router-link>
  </div>
  </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import { router } from './bootstrap';

  export default {
    name: 'GitHubApplication',

    router,

    data() {
      return {
        user: null,
        sources: []
      };
    },

    methods: {
      fetchUser(username) {
        this.axios.get(`users/${username}`)
          .then((response) => {
            this.user = response.data;
          })
      },

      fetchSources() {
        this.axios.get("https://newsapi.org/v1/sources")
          .then(({data}) => {
            //console.log(data);

            const obj = data.sources;

            for ( const key in obj ) {
              //console.log(obj[key]);
              this.sources.push(obj[key]);
            }

          });
      },

    },



    mounted() {
      this.fetchUser('peter');
      this.fetchSources();
    }
  }
</script>

<style type="text/css">
  #choose-page-one {
    position: absolute;
    top: -4%;
    left: 40%;
    right: 50%;
    width: 10%;
    height: 30px;
    display: inline;
    background: #5D8AA8;
    font-size: 80%;
    padding: 1%;
    padding-bottom: 2%;
    border-radius: 5px;
    text-align: center;
    z-index: 12;
    transition: all 0.7s ease;
  }

  #choose-page-two {
    position: absolute;
    top: -4%;
    left: 50%;
    right: 40%;
    width: 12%;
    height: 30px;
    display: inline;
    background: #5D8AA8;
    font-size: 80%;
    padding: 1%;
    padding-bottom: 2%;
    border-radius: 5px;
    text-align: center;
    z-index: 12;
    transition: all 0.7s ease;
  }

  .page-anchor {
    text-decoration: none;
    color: white;
    background-image: 
  }

  .page-anchor:hover {
    text-decoration: none;
    color: #F0F8FF;
  }

  #choose-page-one:hover {
    top: 0%;
  }

  #choose-page-two:hover {
    top: 0%;
  }


</style>
