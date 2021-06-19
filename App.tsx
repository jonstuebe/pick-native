import { Ionicons } from "@expo/vector-icons";
import {
  DarkTheme,
  NavigationContainer,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { atom, useAtom } from "jotai";
import upperFirst from "lodash.upperfirst";
import pluralize from "pluralize";
import React, { useMemo } from "react";
import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { iOSColors, iOSUIKit } from "react-native-typography";

import places from "./places";

import Card from "./components/Card";
import Place from "./components/Place";

import type { CategoryType } from "./types";

type RootStackParamList = {
  Home: undefined;
  Categories: undefined;
  Category: { category: string };
};

const Stack = createStackNavigator<RootStackParamList>();
const mealTypeAtom = atom<"fastfood" | "restaurant">("fastfood");
const useMealType = () => useAtom(mealTypeAtom);

function Home() {
  const [, setMealType] = useMealType();
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView>
        <View style={{ marginBottom: 16 }}>
          <Text
            style={[
              iOSUIKit.largeTitleEmphasizedWhite,
              { textAlign: "center" },
            ]}
          >
            Pick
          </Text>
          <Text
            style={[
              iOSUIKit.title3EmphasizedWhite,
              { color: iOSColors.midGray, textAlign: "center" },
            ]}
          >
            a better way to pick dinner
          </Text>
        </View>
        <Card
          label="Restaurant"
          unsplashID="0uAVsDcyD0M"
          to="/categories"
          onPress={() => setMealType("restaurant")}
        />
        <Card
          label="Fast Food"
          unsplashID="VLu9Zef2_tw"
          to="/categories"
          onPress={() => setMealType("restaurant")}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function Categories() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Card
          label="Mexican"
          to={`/category/mexican`}
          unsplashID="z_PfaGzeN9E"
        />
        <Card
          label="Italian"
          to={`/category/italian`}
          unsplashID="KxcYYoJZehI"
        />
        <Card
          label="American"
          to={`/category/american`}
          unsplashID="FlmXvqlD-nI"
        />
        <Card
          label="Chinese"
          to={`/category/chinese`}
          unsplashID="jFu2L04tMBc"
        />
        <Card
          label="Vietnamese"
          to={`/category/vietnamese`}
          unsplashID="0BhsN70JVA8"
        />
        <Card label="Thai" to={`/category/thai`} unsplashID="XoByiBymX20" />
        <Card
          label="Barbecue"
          to={`/category/barbecue`}
          unsplashID="cpkPJ-U9eUM"
        />
        <Card
          label="Mediterranean"
          to={`/category/mediterranean`}
          unsplashID="C1fMH2Vej8A"
        />
        <Card
          label="Sandwiches"
          to={`/category/sandwiches`}
          unsplashID="uhJfaJ6c9fY"
        />
        <Card label="Salad" to={`/category/salad`} unsplashID="2RrBE90w0T8" />
      </ScrollView>
    </View>
  );
}

function Category() {
  const route = useRoute<RouteProp<RootStackParamList, "Category">>();
  const navigation = useNavigation();
  const { category } = route.params;
  const [type, setMealType] = useMealType();

  const filteredPlaces = useMemo(() => {
    if (!category) return [];
    if (!places[category as CategoryType]) return [];

    return places[category as CategoryType].filter(
      ({ type: placeType, show = () => true }) => {
        return (placeType === type || placeType === "both") && show() === true;
      }
    );
  }, [places, category, type]);

  return (
    <>
      <ScrollView>
        {filteredPlaces.length === 0 ? (
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              paddingVertical: 24,
            }}
          >
            <Text
              style={[
                iOSUIKit.title3EmphasizedWhite,
                {
                  marginBottom: 16,
                  textAlign: "center",
                },
              ]}
            >
              No Places Found
            </Text>
            <Button title="Back" onPress={() => navigation.goBack()} />
          </View>
        ) : (
          <View>
            {filteredPlaces.map((place, idx) => (
              <Place {...place} key={idx} />
            ))}
          </View>
        )}
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          setMealType(type === "fastfood" ? "restaurant" : "fastfood")
        }
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
          backgroundColor: "#4b5563",
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={[iOSUIKit.bodyEmphasizedWhite, { marginRight: 4 }]}>
          {type === "fastfood" ? "Fast Food" : "Restaurant"}
        </Text>
        <Ionicons name="swap-horizontal-outline" color="white" size={24} />
      </TouchableOpacity>
    </>
  );
}

export default function App() {
  const linking = {
    prefixes: ["https://getpick.net", "pick://"],
    config: {
      screens: {
        Home: "/",
        Categories: "/categories",
        Category: "/category/:category",
      },
    },
  };
  const [mealType] = useMealType();

  return (
    <NavigationContainer linking={linking} theme={DarkTheme}>
      <StatusBar style="light" />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          component={Home}
          name="Home"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Categories}
          name="Categories"
          options={{
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          component={Category}
          name="Category"
          options={({ route, navigation }) => ({
            title: `${upperFirst(route.params.category)} ${upperFirst(
              mealType === "fastfood" ? "Fast Food" : pluralize(mealType)
            )}`,
            headerBackTitleVisible: false,
          })}
          initialParams={{
            category: "",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
