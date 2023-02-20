<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">{{ $t("manage.upload") }}</span>
      <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <div
        class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
        :class="{ 'bg-green-400 border-green-400 border-solid': is_dragover }"
        @drag.prevent.stop=""
        @dragstart.prevent.stop=""
        @dragend.prevent.stop="is_dragover = false"
        @dragover.prevent.stop="is_dragover = true"
        @dragenter.prevent.stop="is_dragover = true"
        @dragleave.prevent.stop="is_dragover = false"
        @drop.prevent.stop="upload($event)"
      >
        <h5>{{ $t("manage.dropfile") }}</h5>
      </div>

      <label>
        <button class="D" onclick="document.getElementById('getFile').click()">{{$t("manage.uploadbtn") }}
        </button>
        <input
          type="file"
          id="getFile"
          style="display: none"
          multiple
          @change="upload($event)"
        />
      </label>
      <!-- <input id="file" type="file" multiple @change="upload($event)" /> -->
      <hr class="my-6" />
      <!-- Progess Bars -->
      <div class="mb-4" v-for="upload in uploads" :key="upload.name">
        <!-- File Name -->
        <div class="font-bold text-sm" :class="upload.text_class">
          <i :class="upload.icon"></i> {{ upload.name }}
        </div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <!-- Inner Progress Bar -->
          <div
            class="transition-all progress-bar"
            :class="upload.variant"
            :style="{ width: upload.current_progress + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storage, auth, songCollection } from "@/includes/firebase";
export default {
  name: "Upload",
  data() {
    return {
      is_dragover: false, // Boolean to check if the user is dragging a file over the dropbox
      uploads: [], // Array of files to be uploaded
    };
  },
  props: ["addSong"],
  methods: {
    upload($event) {
      this.is_dragover = false;
      console.log($event);
      const files = $event.dataTransfer
        ? [...$event.dataTransfer.files]
        : [...$event.target.files];
      files.forEach((file) => {
        if (file.type !== "audio/mpeg") {
          return;
        }
        const storageRef = storage.ref(); // Create a storage reference from our storage service music-7d724.appspot.com
        const songsRef = storageRef.child(`songs/${file.name}`); // Create a reference to 'mountains.mp3'
        const task = songsRef.put(file); // Create a reference to 'songs/mountains.mp3'
        const uploadIndex =
          this.uploads.push({
            task,
            current_progress: 0,
            name: file.name,
            variant: "bg-blue-400",
            icon: "fas fa-spinner fa-spin",
            text_class: "",
          }) - 1;
        task.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploads[uploadIndex].current_progress = progress;
          },
          (error) => {
            this.uploads[uploadIndex].variant = "bg-red-400";
            this.uploads[uploadIndex].icon = "fas fa-exclamation-triangle";
            this.uploads[uploadIndex].text_class = "text-red-400";
            console.log(error);
          },
          async () => {
            const song = {
              uid: auth.currentUser.uid,
              displayName: auth.currentUser.displayName,
              originalName: task.snapshot.ref.name,
              modifiedName: task.snapshot.ref.name,
              genre: "",
              comment_count: 0,
            };
            song.url = await task.snapshot.ref.getDownloadURL();
            const songRef = await songCollection.add(song);
            const songSnapshot = await songRef.get();
            this.addSong(songSnapshot);
            this.uploads[uploadIndex].variant = "bg-green-400";
            this.uploads[uploadIndex].icon = "fas fa-check";
            this.uploads[uploadIndex].text_class = "text-green-400";
          }
        );
      });
      console.log(files);
    },
    cancelUploads() {
      this.uploads.forEach((upload) => {
        upload.task.cancel();
      });
    },
  },
  beforeUnmount() {
    this.uploads.forEach((upload) => {
      upload.task.cancel();
    });
  },
};

</script>

<style>

.D {
  display: block;
  width: 120px;
  height: 30px;
  border: 1 solid;
  padding-left: auto;
  padding-right: auto;
  margin-right: auto;
  margin-left: auto;
  margin-top: 1.25rem;
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
  background-color: #2563eb;
  background-color: #059669;
  color: #ffffff;
  font-weight: 600;
  border-radius: 9999px;
  border-width: 0;
  text-transform: uppercase;
}
</style>
