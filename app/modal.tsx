import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { supportTopics } from '@/constants/pet-shop-data';

export default function ModalScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.title}>Pet care help</Text>
        <Text style={styles.subtitle}>
          A lightweight support surface for delivery, nutrition, and routine-care guidance.
        </Text>
      </View>
      {supportTopics.map((topic) => (
        <View key={topic} style={styles.card}>
          <Text style={styles.cardTitle}>{topic}</Text>
          <Text style={styles.cardText}>
            Connect this screen to live chat, FAQs, or CRM data when you add backend services.
          </Text>
        </View>
      ))}
      <Link href="/" dismissTo style={styles.link}>
        <Text style={styles.linkText}>Back to shop</Text>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F1E8',
  },
  container: {
    padding: 20,
    gap: 16,
  },
  hero: {
    backgroundColor: '#1F1A14',
    borderRadius: 28,
    padding: 22,
    gap: 8,
  },
  title: {
    color: '#FFF9F1',
    fontSize: 28,
    fontWeight: '900',
  },
  subtitle: {
    color: '#E9DDCE',
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#EAE3D6',
    padding: 18,
    gap: 6,
  },
  cardTitle: {
    color: '#1F1A14',
    fontSize: 17,
    fontWeight: '800',
  },
  cardText: {
    color: '#5F5549',
    fontSize: 14,
    lineHeight: 21,
  },
  link: {
    backgroundColor: '#D86F45',
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 6,
  },
  linkText: {
    color: '#FFF9F1',
    fontSize: 15,
    fontWeight: '800',
  },
});
