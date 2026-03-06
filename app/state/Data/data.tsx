import { createSlice } from "@reduxjs/toolkit";

type PokemonType = {
  type: {
    name: string;
    url: string;
  };
};

export type initialType = {
  pokemons: {
    name: string;
    image: string;
    imageBack: string;
    types: PokemonType[];
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
