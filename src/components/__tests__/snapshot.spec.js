import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import SongItem from "@/components/SongItem.vue";
import { describe } from "vitest";

describe( 'snapshot', () =>
{
    test( 'renders correctly', () =>
    { 
        const song = {
            docId: "abc",
            modifiedName: "test",
            displayName: "test",
            comment_count: 5,
        };
        const wrapper = shallowMount( SongItem, {
            propsData: { song },
            global: {
                components: {
                    "router-link": RouterLinkStub,
                },
            },
        } );
        expect( wrapper.element).toMatchSnapshot();
     });
} );