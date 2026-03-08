import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Product } from '@/constants/pet-shop-data';

type ProductCardProps = {
  product: Product;
  onAddToCart?: (productId: string) => void;
  compact?: boolean;
};

export function ProductCard({ product, onAddToCart, compact = false }: ProductCardProps) {
  return (
    <View style={[styles.card, compact && styles.compactCard]}>
      <View style={[styles.artwork, { backgroundColor: product.color }]}>
        <Text style={styles.emoji}>{product.emoji}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{product.badge}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.metaRow}>
          <Text style={styles.category}>
            {product.petType} • {product.category}
          </Text>
          <Text style={styles.rating}>★ {product.rating}</Text>
        </View>
        <Text style={styles.name}>{product.name}</Text>
        <Text numberOfLines={compact ? 2 : 3} style={styles.description}>
          {product.description}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <View style={styles.actions}>
            <Link href={`/products/${product.id}`} style={styles.linkButton}>
              <Text style={styles.linkButtonText}>Details</Text>
            </Link>
            {onAddToCart ? (
              <Pressable onPress={() => onAddToCart(product.id)} style={styles.cta} hitSlop={8}>
                <Text style={styles.ctaText}>Add</Text>
              </Pressable>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EAE3D6',
  },
  compactCard: {
    width: 260,
  },
  artwork: {
    minHeight: 140,
    padding: 18,
    justifyContent: 'space-between',
  },
  emoji: {
    fontSize: 42,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#1F1A14',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeText: {
    color: '#FFF9F1',
    fontSize: 12,
    fontWeight: '700',
  },
  content: {
    gap: 10,
    padding: 18,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  category: {
    color: '#7C6F60',
    fontSize: 12,
    fontWeight: '600',
  },
  rating: {
    color: '#7C6F60',
    fontSize: 12,
    fontWeight: '700',
  },
  name: {
    color: '#1F1A14',
    fontSize: 19,
    fontWeight: '800',
  },
  description: {
    color: '#615547',
    fontSize: 14,
    lineHeight: 21,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  price: {
    color: '#1F1A14',
    fontSize: 20,
    fontWeight: '800',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  linkButton: {
    borderWidth: 1,
    borderColor: '#D7CBBC',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  linkButtonText: {
    color: '#1F1A14',
    fontSize: 13,
    fontWeight: '700',
  },
  cta: {
    backgroundColor: '#1F1A14',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  ctaText: {
    color: '#FFF9F1',
    fontSize: 13,
    fontWeight: '700',
  },
});
