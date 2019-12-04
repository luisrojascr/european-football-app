import { CompetitionsState } from './app.state';

export function reducer(state: CompetitionsState, action): CompetitionsState {
  switch (action.type) {
    case 'SAVE_AS_FAVORITE':
      if (state) {
        return {
          ...state,
          savedTeam: state.savedTeam.concat(action.payload)
        };
      } else {
        return {
          ...state,
          savedTeam: action.payload
        };
      }
    case 'REMOVE_FROM_FAVORITE':
      return {
        ...state,
        savedTeam: state.savedTeam.filter((comp) => comp.id !== action.payload)
      };
    default:
      return state;
  }
}
