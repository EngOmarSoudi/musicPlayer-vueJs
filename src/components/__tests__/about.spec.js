import About from "@/views/About.vue";
import { shallowMount } from "@vue/test-utils";
import { expect } from "vitest";
describe("about.vue", () => {
    test( "render inner text", () =>
    {
        const wrapper = shallowMount( About );
        expect( wrapper.text() ).toContain( "This" );
  });
});
