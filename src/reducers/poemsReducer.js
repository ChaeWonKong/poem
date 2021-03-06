import _ from "lodash";
import { FETCH_POEMS, FETCH_POEM, REACT_POEM } from "../actions/types";

const INITIAL_STATE = { results: [] };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_POEMS:
      let newResults = _.unionBy(
        action.payload.results,
        state.results,
        poem => {
          return poem.id;
        }
      );
      return {
        ...action.payload,
        results: newResults
      };
    case FETCH_POEM:
      return action.payload;
    case REACT_POEM:
      return action.payload;
    default:
      return state;
  }
}
