<template>
  <div class="add-smoothie container">
    <h2 class="align-center indigo-text">Add Smoothie</h2>
    <form @submit.prevent="AddSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title</label>
        <input type="text" name="title" v-model="title" />
      </div>
      <div v-for="(ing, index) in ingredients" :key="index" class="field">
        <label for="ingredient">Ingredients</label>
        <input type="text" name="ingredient" v-model="ingredients[index]" />
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an Ingredient</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another" />
        <p v-if="feedback" class="red-text">{{feedback}}</p>
      </div>
      <div class="field center-align">
        <button class="btn pink">Add Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slug from "slugify";
import slugify from "slugify";
//import capitalizeFirstLetter from "../helpers/capitalizeFirstLetter";

export default {
  name: "AddSmoothie",
  data() {
    return {
      title: null,
      another: null,
      ingredients: [],
      feedback: null,
      slug: null
    };
  },

  methods: {
    AddSmoothie() {
      /*       console.log(this.title, this.ingredients);
       */ if (this.title) {
        this.feedback = null;
        //create a slug
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[*+~.()'"!:@§]/g,
          lower: true
        });
        db.collection("smoothies")
          .add({
            title: this.title,
            ingredients: this.ingredients,
            slug: this.slug
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          });
      } else {
        this.feedback = "You must insert a Title";
      }
    },

    addIng() {
      if (this.another) {
        this.ingredients.push(this.another);
        //console.log(this.ingredients);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You must fill in some Ingredients to move on";
      }
    },

    deleteIng(ing) {
      this.ingredients = this.ingredients.filter(item => {
        return ing != item;
      });
    }
  }
};
</script>

<style>
.add-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}

.add-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}

.add-smoothie .field {
  position: relative;
  margin: 20px auto;
}

.add-smoothie .delete {
  position: absolute;
  right: 0;
  top: 0.5em;
  font-size: 1.4em;
  color: rgb(148, 146, 146);
  cursor: pointer;
}
</style>