import { Stack, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { products } from '@/constants/pet-shop-data';
import { useShop } from '@/context/shop-context';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addToCart } = useShop();
  const product = products.find((entry) => entry.id === id);

  if (!product) {
    return (
      <>
        <Stack.Screen options={{ title: 'Product not found' }} />
        <View style={styles.missingState}>
          <Text style={styles.missingTitle}>Product not found</Text>
          <Text style={styles.missingText}>This item is not available in the current catalog.</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: product.name, headerBackTitle: 'Back' }} />
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        <View style={[styles.hero, { backgroundColor: product.color }]}>
          <Text style={styles.heroEmoji}>{product.emoji}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{product.badge}</Text>
          </View>
        </View>

        <View style={styles.header}>
          <Text style={styles.eyebrow}>
            {product.petType} • {product.category}
          </Text>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.subtitle}>{product.description}</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>★ {product.rating}</Text>
            <Text style={styles.statLabel}>{product.reviews} reviews</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>${product.price.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Per pack</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why pet owners buy it</Text>
          {product.details.map((detail) => (
            <View key={detail} style={styles.detailRow}>
              <Text style={styles.detailDot}>•</Text>
              <Text style={styles.detailText}>{detail}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery promise</Text>
          <Text style={styles.deliveryText}>
            Order in the next 45 minutes for same-day dispatch. Refill reminders and repeat orders
            can be added later when you connect a backend.
          </Text>
        </View>

        <Pressable onPress={() => addToCart(product.id)} style={styles.cta}>
          <Text style={styles.ctaText}>Add to cart</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F1E8',
  },
  content: {
    padding: 20,
    gap: 20,
  },
  hero: {
    borderRadius: 32,
    minHeight: 240,
    padding: 24,
    justifyContent: 'space-between',
  },
  heroEmoji: {
    fontSize: 72,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#1F1A14',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  badgeText: {
    color: '#FFF9F1',
    fontSize: 12,
    fontWeight: '700',
  },
  header: {
    gap: 8,
  },
  eyebrow: {
    color: '#7C6F60',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  title: {
    color: '#1F1A14',
    fontSize: 32,
    fontWeight: '900',
  },
  subtitle: {
    color: '#5F5549',
    fontSize: 16,
    lineHeight: 24,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#EAE3D6',
    padding: 18,
    gap: 4,
  },
  statValue: {
    color: '#1F1A14',
    fontSize: 20,
    fontWeight: '800',
  },
  statLabel: {
    color: '#7C6F60',
    fontSize: 13,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#EAE3D6',
    padding: 18,
    gap: 12,
  },
  sectionTitle: {
    color: '#1F1A14',
    fontSize: 18,
    fontWeight: '800',
  },
  detailRow: {
    flexDirection: 'row',
    gap: 10,
  },
  detailDot: {
    color: '#D86F45',
    fontSize: 18,
    fontWeight: '900',
  },
  detailText: {
    flex: 1,
    color: '#5F5549',
    fontSize: 15,
    lineHeight: 22,
  },
  deliveryText: {
    color: '#5F5549',
    fontSize: 15,
    lineHeight: 23,
  },
  cta: {
    backgroundColor: '#1F1A14',
    borderRadius: 999,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 24,
  },
  ctaText: {
    color: '#FFF9F1',
    fontSize: 16,
    fontWeight: '800',
  },
  missingState: {
    flex: 1,
    backgroundColor: '#F7F1E8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 12,
  },
  missingTitle: {
    color: '#1F1A14',
    fontSize: 24,
    fontWeight: '900',
  },
  missingText: {
    color: '#5F5549',
    fontSize: 15,
    textAlign: 'center',
  },
});
