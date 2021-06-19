import React from "react";
import { ImageBackground, Text, TextStyle, View } from "react-native";
import { Link } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { iOSUIKit } from "react-native-typography";
import { StyleProp } from "react-native";

export interface CardProps {
  label: string;
  to: string;
  onPress?: VoidFunction;
  unsplashID: string;
  style?: StyleProp<TextStyle>;
}

export default function Card({
  label,
  to,
  onPress,
  unsplashID,
  style,
}: CardProps) {
  const aspectRatio = 1200 / 534;

  return (
    <Link
      to={to}
      onPress={onPress}
      style={[
        {
          aspectRatio,
        },
        style,
      ]}
    >
      <ImageBackground
        source={{ uri: `https://source.unsplash.com/${unsplashID}/1200x534` }}
        resizeMode="cover"
        width={1200}
        height={534}
        style={{
          flex: 1,
          aspectRatio,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 5,
          }}
        >
          <Text
            style={[
              iOSUIKit.title3EmphasizedWhite,
              {
                position: "absolute",
                bottom: 12,
                left: 12,
                fontSize: 24,
                lineHeight: 24,
              },
            ]}
          >
            {label}
          </Text>
        </LinearGradient>
      </ImageBackground>
    </Link>
  );
}
