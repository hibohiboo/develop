import todos from "./todos";
import visibleFilterModule from '../module/visibilityFilterModules';
const rootReducer = { todos, visibleFilter: visibleFilterModule.reducer };
export default rootReducer;
