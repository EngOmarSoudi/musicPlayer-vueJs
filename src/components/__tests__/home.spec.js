import { ShallowMount } from "vue";
import Home from "@/views/Home.vue";
import SongItem from "@/components/SongItem.vue";
import { describe, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";

describe("Home.vue", () => {
  test("renders list of songs", () => {
    const songs = [{}, {}, {}];
    const component = shallowMount(Home, {
      data() {
        return {
          songs,
        };
      },
    });
    const items = component.findAllComponents(SongItem);
    expect(items).toHaveLength(songs.length);
  });
});
