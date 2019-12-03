export function reducer(state, action) {
  switch (action.type) {
    case 'SAVE_AS_FAVORITE':
      console.log('existing state: ', JSON.stringify(state));
      console.log('payload ', action.payload);
      if (state) {
        return {
          ...state,
          savedCompetition: state.savedCompetition.concat(action.payload)
        };
      } else {
        return {
          ...state,
          savedCompetition: action.payload
        };
      }
    default:
      return state;
  }
}
