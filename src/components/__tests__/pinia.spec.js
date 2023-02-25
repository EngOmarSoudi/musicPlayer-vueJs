import { setActivePinia, createPinia } from "pinia";
import useUserStore from "@/stores/user";
import { beforeEach, describe, expect, test } from "vitest";
vi.mock( "@/includes/firebase", () => ( {
    auth: {
        signInWithEmailAndPassword: ()=> Promise.resolve(  ),
    },
} ));

describe( "store", () =>
{ 
    beforeEach( () =>
    { 
        setActivePinia( createPinia() );
    } );
    test( "authinticates user", async () =>
    { 
        const store = useUserStore();
        expect( store.userLoggedIn ).not.toBe( true );
        await store.loginAuthintication( {} );
        expect( store.userLoggedIn ).toBe( true );
    })
} );