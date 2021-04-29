import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Game } from './shared/client/game.model';
import { AddGame } from './actions/app.actions';

export interface AppStateModel {
    readonly games: Game[];
    readonly hasLoaded: boolean;
}


@State<AppStateModel>({
    name: 'games',
    defaults: {
        hasLoaded: false,
        games: []
    }
})

export class AppState {
    @Selector()
    static getGames(state: AppStateModel){
        return state.games;
    }

    @Selector()
    static getHasLoaded(state: AppStateModel){
        return state.hasLoaded;
    }

    @Action(AddGame)
    add({getState, patchState} : StateContext<AppStateModel>, { payload }:AddGame){
        const state = getState();
        patchState({
            games: [...state.games, payload],
            hasLoaded: true
        });
    }
}
