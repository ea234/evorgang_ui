
import { Vorgang } from '../../app_vorgang/modell/vorgang';

export class User 
{
    username: string;

    constructor(  username: string ) 
    {
        this.username = username;
    }

    darfVorgangBearbeiten(vorgang: Vorgang): boolean 
    {
        // Vorläufig darf jeder Benutzer jeden Vorgang bearbeiten.
        // Die tatsächliche Berechtigungsprüfung folgt später.

        return true;
    }
}
