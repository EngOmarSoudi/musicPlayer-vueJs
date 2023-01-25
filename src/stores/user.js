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
        const userCred = await  auth.createUserWithEmailAndPassword( value.email, value.password );
        await  usersCollection.doc(userCred.user.uid).set( {
            name: value.name,
            email: value.email,
            age: value.age,
            country: value.country,
        } );
          await userCred.user.updateProfile( {
            displayName: value.name,
          } );
        this.userLoggedIn = true; 

    },
    async loginAuthintication ( value )
    {
      await auth.signInWithEmailAndPassword( value.email, value.password );
      this.userLoggedIn = true;
    },
    async sinOut ()
    {
      await auth.signOut();
      this.userLoggedIn = false;
      // window.location.reload();
    }
  },
});
