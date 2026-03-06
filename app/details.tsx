import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const details = () => {
  const apiDetails = process.env.EXPO_PUBLIC_DETAILS;
  const [detail, setDetail] = useState("");
  if (!apiDetails) return;

  const { name } = useLocalSearchParams();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(apiDetails + name);

        if (!res.ok) {
          throw new Error(`${res.status}`);
        }

        const data = await res.json();

        const cleanedText = data.flavor_text_entries[0].flavor_text.replace(
          /\n/g,
          " ",
        );

        setDetail(cleanedText);

        console.log(data.flavor_text_entries[0].flavor_text);
      } catch (error) {
        console.error((error as Error).message);
      }
    };

    fetchDetails();
  }, []);

  console.log(name);
  return (
    <>
      <ScrollView
        contentContainerStyle={{
          gap: 16,
          padding: 16,
        }}
      >
        <View>
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            {name}
          </Text>
        </View>
        <View>
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            {detail}
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

export default details;

const styles = StyleSheet.create({});
