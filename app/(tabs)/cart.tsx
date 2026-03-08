import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useCartStore } from '@/store/use-cart-store';
import { formatCurrency } from '@/utils/format';

export default function CartScreen() {
  const { items, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = useCartStore();
  const subtotal = items.reduce((sum, item) => sum + item.pet.price * item.quantity, 0);
  const total = subtotal;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Your cart</Text>
          <Text style={styles.subtitle}>
            Global cart state is managed with Zustand across tabs.
          </Text>
        </View>

        {items.length ? (
          <>
            <View style={styles.list}>
              {items.map((entry) => (
                <View key={entry.pet.id} style={styles.card}>
                  <View style={styles.art}>
                    <Text style={styles.artEmoji}>Pet</Text>
                  </View>
                  <View style={styles.cardBody}>
                    <Text style={styles.cardMeta}>
                      {entry.pet.breed} | {entry.pet.source === 'submitted' ? 'Submitted' : 'Seed'}
                    </Text>
                    <Text style={styles.cardTitle}>{entry.pet.name}</Text>
                    <Text style={styles.cardPrice}>{formatCurrency(entry.pet.price)} each</Text>
                    <View style={styles.cardFooter}>
                      <View style={styles.quantityRow}>
                        <Pressable onPress={() => decrementQuantity(entry.pet.id)} style={styles.qtyButton}>
                          <Text style={styles.qtyButtonText}>-</Text>
                        </Pressable>
                        <Text style={styles.qtyValue}>{entry.quantity}</Text>
                        <Pressable onPress={() => incrementQuantity(entry.pet.id)} style={styles.qtyButton}>
                          <Text style={styles.qtyButtonText}>+</Text>
                        </Pressable>
                      </View>
                      <Pressable onPress={() => removeFromCart(entry.pet.id)}>
                        <Text style={styles.removeText}>Remove</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.summary}>
              <Text style={styles.summaryTitle}>Order summary</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>{formatCurrency(subtotal)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
              </View>
              <Pressable onPress={clearCart} style={styles.checkoutButton}>
                <Text style={styles.checkoutButtonText}>Clear cart</Text>
              </Pressable>
            </View>
          </>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptyText}>
              Browse the catalog and add products to see totals and quantity controls here.
            </Text>
            <Link href="/(tabs)/explore" style={styles.emptyButton}>
              <Text style={styles.emptyButtonText}>Browse products</Text>
            </Link>
          </View>
        )}
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
  header: {
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
  list: {
    gap: 14,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#EAE3D6',
    padding: 16,
    flexDirection: 'row',
    gap: 14,
  },
  art: {
    width: 72,
    height: 72,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0E6D8',
  },
  artEmoji: {
    fontSize: 34,
  },
  cardBody: {
    flex: 1,
    gap: 6,
  },
  cardMeta: {
    color: '#7C6F60',
    fontSize: 12,
    fontWeight: '700',
  },
  cardTitle: {
    color: '#1F1A14',
    fontSize: 18,
    fontWeight: '800',
  },
  cardPrice: {
    color: '#5F5549',
    fontSize: 14,
  },
  cardFooter: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  qtyButton: {
    width: 30,
    height: 30,
    borderRadius: 999,
    backgroundColor: '#1F1A14',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyButtonText: {
    color: '#FFF9F1',
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 18,
  },
  qtyValue: {
    color: '#1F1A14',
    fontSize: 16,
    fontWeight: '800',
    minWidth: 18,
    textAlign: 'center',
  },
  removeText: {
    color: '#D86F45',
    fontSize: 13,
    fontWeight: '800',
  },
  summary: {
    backgroundColor: '#1F1A14',
    borderRadius: 28,
    padding: 22,
    gap: 14,
    marginBottom: 24,
  },
  summaryTitle: {
    color: '#FFF9F1',
    fontSize: 22,
    fontWeight: '900',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    color: '#D7CCBE',
    fontSize: 15,
  },
  summaryValue: {
    color: '#FFF9F1',
    fontSize: 15,
    fontWeight: '700',
  },
  totalLabel: {
    color: '#FFF9F1',
    fontSize: 16,
    fontWeight: '900',
  },
  totalValue: {
    color: '#FFF9F1',
    fontSize: 18,
    fontWeight: '900',
  },
  checkoutButton: {
    backgroundColor: '#D86F45',
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  checkoutButtonText: {
    color: '#FFF9F1',
    fontSize: 15,
    fontWeight: '800',
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#EAE3D6',
    padding: 22,
    gap: 12,
  },
  emptyTitle: {
    color: '#1F1A14',
    fontSize: 24,
    fontWeight: '900',
  },
  emptyText: {
    color: '#5F5549',
    fontSize: 15,
    lineHeight: 22,
  },
  emptyButton: {
    backgroundColor: '#1F1A14',
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: 'center',
  },
  emptyButtonText: {
    color: '#FFF9F1',
    fontSize: 15,
    fontWeight: '800',
  },
});
