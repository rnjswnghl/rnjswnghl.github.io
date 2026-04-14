import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>모달</Text>
      <Text style={styles.description}>
        이 화면은 app/modal.tsx 이며 모달 프레젠테이션으로 표시된다.
      </Text>
      <Link href="/" style={styles.link}>
        <Text style={styles.linkText}>홈으로</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff", padding: 20
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  description: { fontSize: 16, textAlign: "center", marginBottom: 20 },
  link: { marginBottom: 20 },
  linkText: { fontSize: 16, color: "#007aff", textDecorationLine: "underline" }
});
