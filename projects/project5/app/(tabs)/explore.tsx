import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";

export default function ExploreScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>탐색</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>프로젝트</Text>
        <Text style={styles.cardBody}>
          DalToori는 Expo Managed Workflow 기반으로 동작한다.
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>라우팅</Text>
        <Text style={styles.cardBody}>
          파일 기반 라우팅으로 app/(tabs)/index.tsx, app/(tabs)/explore.tsx를 사용한다.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#f5f5f5",
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6
  },
  cardBody: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22
  }
});
