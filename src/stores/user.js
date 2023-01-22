import { defineStore } from "pinia";
import { auth, usersCollection } from "@/includes/firebase";
export default defineStore("user", {
  state: () => ({
    userLoggedIn: false,
  }),
  actions: {
    // register user
     async register ( value )
      {
        await  auth.createUserWithEmailAndPassword( value.email, value.password );
        await  usersCollection.add( {
            name: value.name,
            email: value.email,
            age: value.age,
            country: value.country,
        } );
        this.userLoggedIn = true; 

    },
  },
});
