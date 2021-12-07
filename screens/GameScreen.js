import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, Alert, ScrollView } from "react-native";
import App from "../App";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import NumberContainer from "../components/NumberContainer";
import { Ionicons } from "@expo/vector-icons";
import BodyText from "../components/BodyText";

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

const renderListItem = (value, numOfRound) => (
  <View key={value} style={styles.listItem}>
    <BodyText>#{numOfRound}</BodyText>
    <BodyText>{value}</BodyText>
  </View>
);

const GameScreen = (props) => {
  const intialGuess = generateRandomBetween(1, 100, props.userChoice);

  //Manage states
  const [currentGuess, setCurrentGuess] = useState(intialGuess);
  const [pastGuesses, setPastGuesses] = useState([intialGuess]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  //Deconstruct the properties so it wont trigger the useEffect everytime the parent props changes.
  const { userChoice, onGameOver } = props;

  //runs after everything has been rendered
  useEffect(() => {
    if (currentGuess === userChoice) {
      //Game ends, correct number has been guessed.
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, onGameOver, userChoice]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("FALSE", "Incorrect hint given", [
        { text: "Oops", style: "cancel" },
      ]);
      return;
    }
    //If its lower than the guess, the guess becomes the new highest boundary
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    }
    //If its higher than the guess, the guess becomes the new lowest boundary
    else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    //setRounds((curRounds) => curRounds + 1);
    setPastGuesses((curPastGuesses) => [nextNumber, ...curPastGuesses]);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
  listItem: {
    borderColor: "#ccc",
    marginVertical: 10,
    borderWidth: 1,
    backgroundColor: "white",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  listContainer: {
    flex: 1,
    width: "80%",
  },
  list: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
