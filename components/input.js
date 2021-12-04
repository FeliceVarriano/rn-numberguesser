import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

const input = (props) => {
  //Forward props to component, and allow outside styling to be used on the component.
  return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
};

export default input;

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});
