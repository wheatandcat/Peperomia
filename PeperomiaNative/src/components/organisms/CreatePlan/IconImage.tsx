import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Feather } from "@expo/vector-icons";
import { IconImage } from "primitive";
import { whenIPhoneSE } from "../../../lib/responsive";

interface Props {
  image: string;
  imageSrc: string;
  imageSize: number;
  backgroundColor: string;
  onSave: () => void;
  onOpenActionSheet: () => void;
}

export default (props: Props) => {
  return (
    <>
      <View style={{ alignItems: "center", paddingVertical: 15 }}>
        {props.image ? (
          <Image
            style={{
              width: props.imageSize,
              height: props.imageSize,
              opacity: 0.85
            }}
            source={{ uri: props.image }}
          />
        ) : (
          <IconImage
            src={props.imageSrc}
            name=""
            size={whenIPhoneSE(60, 100)}
            opacity={0.85}
            defaultIcon
          />
        )}
      </View>
      <View style={{ height: 54 }}>
        <View>
          <View
            style={[
              styles.cameraIconBackground,
              { backgroundColor: props.backgroundColor }
            ]}
          />

          <View style={styles.cameraIconContainer}>
            <TouchableOpacity onPress={props.onOpenActionSheet}>
              <Feather name="camera" size={32} style={styles.cameraIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = EStyleSheet.create({
  cameraIconBackground: {
    borderTopWidth: 3,
    borderColor: "$icon",
    marginTop: 27,
    height: "100%"
  },
  cameraIconContainer: {
    height: 54,
    width: 54,
    borderWidth: 3,
    borderRadius: 54,
    borderColor: "$icon",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "$background",
    right: 40
  },
  cameraIcon: {
    color: "$icon"
  }
});
