import { describe, it, expect } from 'vitest'; 
import { User } from './user';

describe('User', () => {

    it( 'soll eine Instanz erstellen', () => {

        const user = new User( 'demo' );

        expect( user ).toBeInstanceOf( User );

    });


    it( 'soll den Benutzernamen korrekt speichern', () => {

        const user = new User( 'demo' );

        expect( user.username ).toBe( 'demo' );

    });


    it( 'soll unterschiedliche Benutzernamen speichern können', () => {

        const user1 = new User( 'demo'  );
        const user2 = new User( 'admin' );

        expect( user1.username ).toBe( 'demo'  );
        expect( user2.username ).toBe( 'admin' );

    });

});