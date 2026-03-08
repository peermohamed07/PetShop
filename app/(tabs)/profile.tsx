import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useCartStore } from '@/store/use-cart-store';
import { usePetStore } from '@/store/use-pet-store';

export default function ActivityScreen() {
  const submissions = usePetStore((state) => state.submissions);
  const pets = usePetStore((state) => state.pets);
  const cartCount = useCartStore((state) =>
    state.items.reduce((count, item) => count + item.quantity, 0)
  );
  const latestSubmittedPet = pets.find((pet) => pet.source === 'submitted');

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>Activity</Text>
          <Text style={styles.title}>Submission history</Text>
          <Text style={styles.subtitle}>
            Review app-level counts and recent submission results from the form flow.
          </Text>
        </View>

        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{cartCount}</Text>
            <Text style={styles.metricLabel}>Items in cart</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{submissions.length}</Text>
            <Text style={styles.metricLabel}>Submission logs</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Latest submitted pet</Text>
          {latestSubmittedPet ? (
            <>
              <Text style={styles.sectionText}>{latestSubmittedPet.name}</Text>
              <Text style={styles.sectionText}>
                {latestSubmittedPet.breed} | Age {latestSubmittedPet.age} | ${latestSubmittedPet.price.toFixed(2)}
              </Text>
            </>
          ) : (
            <Text style={styles.sectionText}>No successful submissions yet.</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Submission history</Text>
          {submissions.length ? (
            submissions.map((submission) => (
              <View key={submission.id} style={styles.orderCard}>
                <View style={styles.orderLeft}>
                  <Text style={styles.orderId}>
                    {submission.petName} | {submission.breed}
                  </Text>
                  <Text style={styles.orderMeta}>{submission.message}</Text>
                </View>
                <View style={styles.orderRight}>
                  <Text style={styles.orderStatus}>{submission.status}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.sectionText}>No submissions recorded yet.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F1E8',
  },
  screen: {
    flex: 1,
    backgroundColor: '#F7F1E8',
  },
  content: {
    padding: 20,
    gap: 18,
  },
  hero: {
    backgroundColor: '#CFE5F7',
    borderRadius: 30,
    padding: 22,
    gap: 8,
  },
  eyebrow: {
    color: '#33526B',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: {
    color: '#142635',
    fontSize: 30,
    fontWeight: '900',
  },
  subtitle: {
    color: '#35556F',
    fontSize: 15,
    lineHeight: 22,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#EAE3D6',
    padding: 18,
    gap: 4,
  },
  metricValue: {
    color: '#1F1A14',
    fontSize: 24,
    fontWeight: '900',
  },
  metricLabel: {
    color: '#7C6F60',
    fontSize: 13,
    fontWeight: '700',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    borderWidth: 1,
    borderColor: '#EAE3D6',
    padding: 18,
    gap: 14,
  },
  sectionTitle: {
    color: '#1F1A14',
    fontSize: 20,
    fontWeight: '900',
  },
  orderCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 8,
    gap: 12,
  },
  orderLeft: {
    flex: 1,
  },
  orderId: {
    color: '#1F1A14',
    fontSize: 16,
    fontWeight: '800',
  },
  orderMeta: {
    color: '#7C6F60',
    fontSize: 13,
    marginTop: 2,
  },
  orderRight: {
    alignItems: 'flex-end',
    gap: 2,
  },
  orderStatus: {
    color: '#D86F45',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  sectionText: {
    color: '#5F5549',
    fontSize: 15,
    lineHeight: 22,
  },
});
