import { useEffect } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setPokemons } from "./state/Data/data";
import type { AppDispatch, RootState } from "./state/store";

export default function Index() {
  const apiUrl = process.env.EXPO_PUBLIC_API;
  const allPokemons = useSelector((state: RootState) => state.data.pokemons);
  const dispatch = useDispatch<AppDispatch>();

  if (!apiUrl) {
    throw new Error("Missing EXPO_PUBLIC_API_URL");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(apiUrl);

        if (!res.ok) {
          throw new Error(`${res.status}`);
        }

        const data = await res.json();

        const detailedPokemons = await Promise.all(
          data.results.map(async (item: any) => {
            const res = await fetch(item.url);

            const details = await res.json();

            return {
              name: item.name,
              image: details.sprites.front_default,
            };
          }),
        );

        dispatch(setPokemons(detailedPokemons));

        console.log(detailedPokemons);
      } catch (error) {
        console.log((error as Error).message);
      }
    };

    fetchData();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScrollView>
        {allPokemons.length <= 0 ? (
          <Text>There's no pokemon</Text>
        ) : (
          <>
            {allPokemons.map((item, index) => (
              <View key={index}>
                <Text>{item.name}</Text>
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 100, height: 100 }}
                />
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}
