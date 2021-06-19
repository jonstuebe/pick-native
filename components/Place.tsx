import React from "react";
import { Linking, Share, Text, TouchableOpacity } from "react-native";
import { iOSUIKit } from "react-native-typography";

export interface PlaceProps {
  label: string;
  brandColor: string;
  type: "fastfood" | "restaurant" | "both";
  url: string;
  show?: () => boolean;
}

export default function Place({ label, brandColor, url }: PlaceProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        (async () => {
          try {
            await Share.share({
              title: "Pick",
              message: `Wanna go to ${label} for dinner?\n\n`,
              url,
            });
          } catch (e) {
            if (Linking.canOpenURL(url)) {
              await Linking.openURL(url);
            }
          }
        })();
      }}
      style={{
        backgroundColor: brandColor,
        paddingHorizontal: 12,
        paddingBottom: 12,
        paddingTop: 40,
      }}
    >
      <Text
        style={[
          iOSUIKit.title3EmphasizedWhite,
          {
            textAlign: "left",
            fontSize: 24,
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
