import { Link } from "expo-router";
import { useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setPokemons } from "./state/Data/data";
import type { AppDispatch, RootState } from "./state/store";

const colorByType = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

export default function Index() {
  const apiUrl = process.env.EXPO_PUBLIC_API;
  const allPokemons = useSelector((state: RootState) => state.data.pokemons);
  const dispatch = useDispatch<AppDispatch>();

  if (!apiUrl) {
    throw new Error("Missing EXPO_PUBLIC_API_URL");
  }

  console.log("-------------------------");
  console.log(JSON.stringify(allPokemons[0], null, 2));
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
              imageBack: details.sprites.back_default,
              types: details.types,
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
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}
    >
      {allPokemons.length <= 0 ? (
        <Text>There's no pokemon</Text>
      ) : (
        <>
          {allPokemons.map((item, index) => (
            <Link
              href={{ pathname: "/details", params: { name: item.name } }}
              key={index}
              style={{
                //@ts-ignore
                backgroundColor: colorByType[item.types[0].type.name] + 50,
                padding: 20,
                borderRadius: 20,
              }}
            >
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.type}>{item.types[0].type.name}</Text>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 150, height: 150 }}
                  />
                  <Image
                    source={{ uri: item.imageBack }}
                    style={{ width: 150, height: 150 }}
                  />
                </View>
              </View>
            </Link>
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  type: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
    textAlign: "center",
  },
});
