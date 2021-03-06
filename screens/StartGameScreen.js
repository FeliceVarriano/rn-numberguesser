import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Card from "../components/Card";
import colors from "../constants/colors";
import Input from "../components/input";
import NumberContainer from "../components/NumberContainer";
import BodyText from "../components/BodyText";
import HeaderText from "../components/HeaderText";
import MainButton from "../components/MainButton";

const StartGameScreen = (props) => {
  //States
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  //Handle user input
  const numberInputHandler = (inputText) => {
    //replace any non number value, store into new state.
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  //Set the input to a blank string handler.
  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    //Batched state calls, will execute next time the components render.
    //Validate input layer 2
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid Number", "Number has to be between 1 and 99.", [
        { text: "Okay", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
    }
    setConfirmed(true);
    setEnteredValue("");
    setSelectedNumber(parseInt(enteredValue));
    Keyboard.dismiss();
  };

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton
          //onStartGame coming from props from app.js
          onPress={() => props.onStartGame(selectedNumber)}
        >
          START GAME
        </MainButton>
      </Card>
    );
  }

  return (
    //For Ios, register a touch event without feedback to close the keyboard.
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <HeaderText style={styles.title}>Start a New Game!</HeaderText>
        <Card style={styles.inputContainer}>
          <BodyText>Select a Number</BodyText>
          <Input
            style={styles.textInput}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View>
              <MainButton
                style={styles.button}
                onPress={resetInputHandler}
                color={colors.primary}
              >
                Reset
              </MainButton>
            </View>
            <View>
              <MainButton
                style={styles.button}
                onPress={confirmInputHandler}
                color={colors.acccent}
              >
                Confirm
              </MainButton>
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  inputContainer: {
    width: 400,
    maxWidth: "80%",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "open-sans-bold",
  },
  button: {
    width: 100,
    padding: 5,
  },
  textInput: {
    width: 50,
    textAlign: "center",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default StartGameScreen;
