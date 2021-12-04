import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Card from "../components/Card";
import colors from "../constants/colors";
import Input from "../components/input";

const StartGameScreen = (props) => {
  //States
  const [enteredValue, setEnteredValue] = useState("");

  //Handle user input
  const numberInputHandler = (inputText) => {
    //replace any non number value, store into new state.
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  return (
    //For Ios, register a touch event without feedback to close the keyboard.
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
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
            <View style={styles.button}>
              <Button title="Reset" onPress={() => {}} color={colors.primary} />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={() => {}}
                color={colors.acccent}
              />
            </View>
          </View>
        </Card>
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
    width: 300,
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
  },
  button: {
    width: 100,
    padding: 5,
  },
  textInput: {
    width: 50,
    textAlign: "center",
  },
});

export default StartGameScreen;
