import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

//Generates a random number, if its the correct answer first try, recursively call itself.
const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min) + min);

  if (rndNum == exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = (props) => {
  //Manage states
  const [currentGuess, setCurrentGuess] = useState(generateRandomBetween());
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({});
