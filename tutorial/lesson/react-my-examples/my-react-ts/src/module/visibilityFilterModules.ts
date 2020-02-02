import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { FilterType } from '../@types';

function initialState(): FilterType {
  return 'SHOW_ALL';
}

// actions と reducers の定義
const visibilityFilterModules = createSlice({
  name: "visibilityFilter",
  initialState: initialState(),
  reducers: {
    visibilityFilter: (state, action: PayloadAction<FilterType>) => action.payload,
  }
});
export default visibilityFilterModules;

export const useVisibleFilter = () => {
  return useSelector((state: { visibleFilter: ReturnType<typeof visibilityFilterModules.reducer> }) => state.visibleFilter);
}
