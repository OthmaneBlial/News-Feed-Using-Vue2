<template>
  <div>
    <div class="container" v-if="showAll">
      <ul class="menu-style">
        <li v-for="source, key in sources" @click="showChannelNews(source.id)">
          <a id="the-news-channel">{{ source.name }}</a>
        </li>
      </ul>
    </div>

    <div class="container" v-if="showAll">
      <div class="col-md-4 col-sm-6" v-for="article in articles">
        <figure class="figure-style" @click="showOneArticle(article)">
          <img :src="article.urlToImage" style="height: 300px;">
          <figcaption>
            <h4>{{ article.title }}</h4>
          </figcaption>
          <a></a>
        </figure>
      </div>
    </div>

    <div class="container" v-if="showOne" style="margin-top: 5%;">
      <div class="col-md-6 one-fig">
        <figure class="figure-style">
          <img :src="chosenArticle.urlToImage" style="height: 510px; width: 100%;">
          <figcaption>
            <h4>{{ chosenArticle.title }}</h4>
          </figcaption>
          <a href="#"></a>
        </figure>
      </div>
      <div class="col-md-6 one-fig">
        <a id="return" @click="returnBack">Return Back</a>
        <a
          id="view-website"
          @click="vienOnWebsite"
          :href="chosenArticle.url"
          target="_blank"
        >View On Website</a>
        <blockquote>
          <h1>{{ chosenArticle.title }}</h1>
          <br>
          {{ chosenArticle.description }}
          <br>
          <br>
          <h4 v-if="chosenArticle.author">BY {{ chosenArticle.author }}</h4>
        </blockquote>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  /**
   * The name of the application.
   */
  name: "App",

  data() {
    return {
      articles: [],
      smallChosenNumber: -1,
      bigChosenNumber: 5,
      showMore: true,
      chosenArticle: null,
      showAll: true,
      showOne: false,
      start: 0
    };
  },

  computed: {
    sources() {
      return this.$root.sources;
    }
  },

  /**
   * The methods of this Vue instance.
   */
  methods: {
    showChannelNews(id) {
      this.articles = [];
      this.fetchNews(id);
    },

    fetchNews(sourceId) {
      this.axios
        .get(
          "https://newsapi.org/v1/articles?source=" +
            sourceId +
            "&sortBy=top&apiKey=3dff5d7c24ad4059bb4c97036fbb30a9"
        )
        .then(({ data }) => {
          //console.log(data.articles);

          const obj = data.articles;

          for (const key in obj) {
            //console.log(obj[key]);
            this.articles.push(obj[key]);
          }
        });
    },

    showMoreSourcesRight() {
      this.smallChosenNumber = this.smallChosenNumber + 1;
      this.bigChosenNumber = this.bigChosenNumber + 1;
    },

    showMoreSourcesLeft() {
      this.smallChosenNumber = this.smallChosenNumber - 1;
      this.bigChosenNumber = this.bigChosenNumber - 1;
    },

    showOneArticle(article) {
      this.chosenArticle = article;
      this.showAll = false;
      this.showOne = true;
    },

    returnBack() {
      this.showOne = false;
      this.showAll = true;
    }
  },

  /**
   * The components that are being used in this page.
   */

  mounted() {
    //this.fetchSources();
  }
};
</script>


<style>
body {
  background-color: #212139;
  text-align: center;
}

/*THE MENU PART*/

@import url(https://fonts.googleapis.com/css?family=Work+Sans);

.menu-style {
  font-family: "Work Sans", Arial, sans-serif;
  text-align: center;
  text-transform: uppercase;
  font-weight: 400;
}

.menu-style *,
.menu-style *:after {
  box-sizing: border-box;
  -webkit-transition: all 0.25s linear;
  transition: all 0.25s linear;
}

.menu-style li {
  width: 18%;
  display: inline-block;
  list-style: outside none none;
  margin: 0.3em 0.3em;
  -webkit-perspective: 50em;
  perspective: 50em;
}

.menu-style a {
  backface-visibility: hidden;
  font-size: 70%;
  color: #ffffff;
  display: block;
  line-height: 1.3em;
  padding: 0 1.3em;
  text-decoration: none;
  background-color: #667273;
  font-size: 9%;
}

.menu-style a:hover {
  background-color: #6672c1;
  line-height: 1.3em;
}

/*THE NEWS FIGURES PART*/

@import url(https://fonts.googleapis.com/css?family=Montserrat);
@import url(https://fonts.googleapis.com/css?family=Muli);
.figure-style {
  font-family: "Muli", sans-serif;
  position: relative;
  display: inline-block;
  overflow: hidden;
  margin: 10px 5px;
  min-width: 230px;
  max-width: 315px;
  width: 100%;
  color: #ffffff;
  text-align: left;
  font-size: 16px;
  background-color: #000000;
}

.figure-style * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.45s ease;
  transition: all 0.45s ease;
}

.figure-style img {
  vertical-align: top;
  max-width: 100%;
  backface-visibility: hidden;
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
  opacity: 0.75;
}

.figure-style figcaption {
  z-index: 1;
  align-items: center;
  position: absolute;
  width: 100%;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(195, 86, 97, 0.85);
  background-image: -webkit-linear-gradient(
    left,
    rgba(0, 0, 0, 0.2) 0%,
    transparent 100%
  );
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.2) 0%,
    transparent 100%
  );
  padding: 15px;
}

.figure-style figcaption:before {
  content: "";
  width: 20px;
  height: 20px;
  background-color: #fff;
  bottom: 0;
  left: 50%;
  -webkit-transform: translate(-50%, 50%) rotate(45deg);
  transform: translate(-50%, 50%) rotate(45deg);
  position: absolute;
}

.figure-style h5 {
  margin: 0;
  letter-spacing: 1px;
}

.figure-style h4 {
  font-family: "Montserrat", sans-serif;
  text-transform: uppercase;
  margin-top: 10px;
  font-weight: normal;
}

.figure-style a {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

.figure-style:hover > img,
.figure-style.hover > img {
  opacity: 1;
  -webkit-filter: grayscale(0%);
  filter: grayscale(0%);
}

#more {
  position: absolute;
  top: 17%;
  left: 1%;
  width: 5%;
  background: red;
  text-align: center;
  font-size: 60%;
}

#more:hover {
  cursor: pointer;
}

blockquote {
  margin-top: 110px;
  font-family: "Montserrat", sans-serif;
  color: white;
  font-size: 90%;
  position: absolute;
  top: 23%;
}

.one-fig {
  height: 530px;
  padding: 10px;
}

.one-fig img {
  height: 500px;
  width: 100%;
}

#return {
  margin-top: 3%;
  position: absolute;
  z-index: 999;
  top: 0px;
  left: 3%;
  width: 97%;
  padding: 20px;
  font-size: 23px;
  font-family: "Montserrat", sans-serif;
  font-style: italic;
  background-color: #6672c1;
  border: 0px;
  border-radius: 5px;
  color: white;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
}

#view-website {
  margin-top: 3%;
  position: absolute;
  top: 17%;
  left: 3%;
  z-index: 999;
  width: 97%;
  padding: 20px;
  font-size: 23px;
  font-family: "Montserrat", sans-serif;
  font-style: italic;
  background-color: #5533c1;
  border: 0px;
  border-radius: 5px;
  color: white;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: underline;
}

#forward {
  width: 60%;
  height: 50px;
  padding: 5px;
  font-family: "Montserrat", sans-serif;
  font-style: italic;
  background-color: #331112;
  font-size: 25px;
  color: white;
  border: 0px;
  border-radius: 7px;
  margin: 10px;
  position: absolute;
  left: 20%;
  right: 20%;
}

#loading-more {
  position: relative;
}
</style>