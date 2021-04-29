import { Game } from '../shared/client/game.model';

export class AddGame {
    static readonly type = '[GAMES] Add'

    constructor(public payload: Game){}
}
/*
export class RemoveGames {
    static readonly type = '[GAMES] Remove'

    constructor(public payload: string){}
}
*/