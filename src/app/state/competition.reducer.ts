import { CompetitionsState } from './app.state';

export function reducer(state: CompetitionsState, action): CompetitionsState {
  switch (action.type) {
    case 'SAVE_AS_FAVORITE':
      if (state) {
        return {
          ...state,
          favorites: state.favorites.concat(action.payload)
        };
      } else {
        return {
          ...state,
          favorites: action.payload
        };
      }
    case 'REMOVE_FROM_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter((comp) => comp.id !== action.payload)
      };
    default:
      return state;
  }
}
