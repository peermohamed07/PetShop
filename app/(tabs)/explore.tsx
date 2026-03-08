import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PetCard } from '@/components/challenge/pet-card';
import { useCartStore } from '@/store/use-cart-store';
import { usePetStore } from '@/store/use-pet-store';

export default function PetListingScreen() {
  const pets = usePetStore((state) => state.pets);
  const addToCart = useCartStore((state) => state.addToCart);
  const [query, setQuery] = useState('');

  const filteredPets = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return pets.filter((pet) =>
      normalized.length === 0
        ? true
        : `${pet.name} ${pet.breed}`.toLowerCase().includes(normalized)
    );
  }, [pets, query]);

  const submittedCount = pets.filter((pet) => pet.source === 'submitted').length;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.title}>Pet listing screen</Text>
          <Text style={styles.subtitle}>
            Card-based listing with image, name, breed, price, and add-to-cart actions.
          </Text>
        </View>

        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{pets.length}</Text>
            <Text style={styles.metricLabel}>Total pets</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{submittedCount}</Text>
            <Text style={styles.metricLabel}>Submitted via form</Text>
          </View>
        </View>

        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search by pet name or breed"
          placeholderTextColor="#9A8D7E"
          style={styles.search}
        />

        <View style={styles.list}>
          {filteredPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} onAddToCart={addToCart} />
          ))}
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
    gap: 8,
  },
  title: {
    color: '#1F1A14',
    fontSize: 30,
    fontWeight: '900',
  },
  subtitle: {
    color: '#5F5549',
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
    padding: 16,
    gap: 4,
  },
  metricValue: {
    color: '#1F1A14',
    fontSize: 24,
    fontWeight: '900',
  },
  metricLabel: {
    color: '#6B6256',
    fontSize: 13,
    fontWeight: '700',
  },
  search: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EAE3D6',
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#1F1A14',
    fontSize: 15,
  },
  list: {
    gap: 16,
    paddingBottom: 24,
  },
});
