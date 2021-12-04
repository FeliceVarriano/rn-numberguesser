import React from "react";
import { ProgressViewIOSComponent, StyleSheet, Text, View } from "react-native";

const HeaderText = (props) => {
  return (
    <Text style={{ ...styles.title, ...props.style }}>{props.children}</Text>
  );
};

export default HeaderText;

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    color: "black",
  },
});
