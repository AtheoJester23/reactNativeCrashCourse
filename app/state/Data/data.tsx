import { createSlice } from "@reduxjs/toolkit";

export type initialType = {
  pokemons: {
    name: string;
    image: string;
  }[];
};

const initialState: initialType = {
  pokemons: [],
};

const data = createSlice({
  name: "data",
  initialState,
  reducers: {
    setPokemons(state, action) {
      state.pokemons = action.payload;
    },
  },
});

export const { setPokemons } = data.actions;
export default data.reducer;
