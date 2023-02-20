<template>
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <app-upload ref="upload"  :addSong="addSong"/>
      </div>
      <div class="col-span-2">
        <div
          class="bg-white rounded border border-gray-200 relative flex flex-col"
        >
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">{{ $t("manage.mysongs") }}</span>
            <i
              class="fa fa-compact-disc float-right text-green-400 text-2xl"
            ></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <composition-item
              v-for="( song, i) in songs"
              :key="song.docID"
              :song="song"
              :updateSong="updateSong"
              :index="i"
              :removeSong="removeSong"
              :updateUnsavedFlag="updateUnsavedFlag"
            />
            
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
// import useUserStore from "@/stores/user";
import AppUpload from "@/components/Upload.vue";
import { songCollection, auth } from "@/includes/firebase";
import CompositionItem from "@/components/CompositionItem.vue";
export default {
  name: "manage",
  components: {
    AppUpload,
    CompositionItem,
  },
  data() {
    return {
      songs: [],
      unsavedFlag: false,
    };

  },
  async created() {
    const snapshot = await songCollection
      .where("uid", "==", auth.currentUser.uid)
      .get();
    snapshot.forEach(this.addSong);
  },
  methods: {
    removeSong(i) {
      this.songs.splice(i, 1);
    },
    updateSong(i, values) {
      this.songs[i].modifiedName = values.modifiedName;
      this.songs[i].genre = values.genre;
    },
    addSong (document)
    {
      const song = {
        ...document.data(),
        docId: document.id,
      };
      this.songs.push(song);
      // this.songs.push(song);
    },
    updateUnsavedFlag( value) {
      this.unsavedFlag = value;
    },
  },
  beforeRouteLeave ( to, from, next )
  {
    if (!this.unsavedFlag )
    {
      next();
    }else{
      const answer = confirm("You have unsaved changes, are you sure you want to leave?");
      next(answer);
    }
  },
  // beforeRouteLeave ( to, from, next )
  // {
  //   this.$refs.upload.cancelUploads();
  //   next();
  //   console.log("beforeRouteLeave Garud");
  // },
  // beforeRouteEnter(to, from, next) {
  //   const store = useUserStore();
  //   if (store.userLoggedIn) {
  //     next();
  //   } else {
  //     next({ name: "home" });
  //   }
  // console.log( 'beforeRouteEnter Garud' );
  // },
};
</script>

<!-- <style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style> -->
