import React from "react";
import {
  ProgressViewIOSComponent,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
} from "react-native";
import BodyText from "../components/BodyText";
import HeaderText from "../components/HeaderText";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <HeaderText>The game is over!</HeaderText>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={require("../assets/success.png")}
        />
      </View>
      <BodyText>Number of Rounds: {props.roundsNumber}</BodyText>
      <BodyText>Number was: {props.userNumber}</BodyText>
      <Button title="NEW GAME" onPress={props.onRestart} />
    </View>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "black",
    width: 300,
    height: 300,
    overflow: "hidden",
    marginVertical: 30,
  },
});
