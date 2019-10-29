<template>
  <div class="edit-smoothie container">
    <div v-if="smoothie">
      <h2>Edit Smoothie: {{smoothie.title}}</h2>

      <form @submit.prevent="EditSmoothie">
        <div class="field title">
          <label for="title">Smoothie Title</label>
          <input type="text" name="title" v-model="smoothie.title" />
        </div>
        <div v-for="(ing, index) in smoothie.ingredients" :key="index" class="field">
          <label for="ingredient">Ingredients</label>
          <input type="text" name="ingredient" v-model="smoothie.ingredients[index]" />
          <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
        </div>
        <div class="field edit-ingredient">
          <label for="edit-ingredient">Add an Ingredient</label>
          <input type="text" name="edit-ingredient" @keydown.tab.prevent="addIng" v-model="another" />
          <p v-if="feedback" class="red-text">{{feedback}}</p>
        </div>
        <div class="field center-align">
          <button class="btn pink">Update Smoothie</button>
        </div>
      </form>
    </div>
    <div v-else class="preloader-wrapper active loader">
      <div class="spinner-layer spinner-blue-only">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "EditSmoothie",

  data() {
    return {
      smoothie: null,
      another: null,
      feedback: null
    };
  },

  methods: {
    EditSmoothie() {
      if (this.smoothie.title) {
        this.feedback = null;
        //create a slug
        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: "-",
          remove: /[*+~.()'"!:@§]/g,
          lower: true
        });
        db.collection("smoothies")
          .doc(this.smoothie.id)
          .update({
            title: this.smoothie.title,
            ingredients: this.smoothie.ingredients,
            slug: this.smoothie.slug
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.feedback = "You must insert a Title";
      }
    },
    addIng() {
      if (this.another) {
        this.smoothie.ingredients.push(this.another);
        //console.log(this.ingredients);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You must fill in some Ingredients to move on";
      }
    },

    deleteIng(ing) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter(item => {
        return ing != item;
      });
    }
  },

  created() {
    let ref = db
      .collection("smoothies")
      .where("slug", "==", this.$route.params.smoothie_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.data());
        this.smoothie = doc.data();
        this.smoothie.id = doc.id;
      });
    });
  }
};
</script>

<style>
.loader {
  position: absolute;
  top: 30%;
  right: 50%;
}

.edit-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}

.edit-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}

.edit-smoothie .field {
  position: relative;
  margin: 20px auto;
}

.edit-smoothie .delete {
  position: absolute;
  right: 0;
  top: 0.5em;
  font-size: 1.4em;
  color: rgb(148, 146, 146);
  cursor: pointer;
}
</style>