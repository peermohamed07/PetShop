import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { PetItem } from '@/types/pet';
import { formatCurrency } from '@/utils/format';

type PetCardProps = {
  pet: PetItem;
  onAddToCart: (pet: PetItem) => void;
};

export function PetCard({ pet, onAddToCart }: PetCardProps) {
  return (
    <View style={styles.card}>
      <Image source={pet.imageUrl} style={styles.image} contentFit="cover" />
      <View style={styles.content}>
        <View style={styles.metaRow}>
          <Text style={styles.breed}>{pet.breed}</Text>
          <Text style={styles.source}>{pet.source === 'submitted' ? 'Submitted' : 'Featured'}</Text>
        </View>
        <Text style={styles.name}>{pet.name}</Text>
        <Text style={styles.info}>Age {pet.age} years</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>{formatCurrency(pet.price)}</Text>
          <Pressable onPress={() => onAddToCart(pet)} style={styles.button}>
            <Text style={styles.buttonText}>Add to cart</Text>
          </Pressable>
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
    borderColor: '#E4DED3',
  },
  image: {
    width: '100%',
    height: 190,
    backgroundColor: '#EAE6DF',
  },
  content: {
    padding: 16,
    gap: 8,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  breed: {
    color: '#6B6256',
    fontSize: 13,
    fontWeight: '700',
  },
  source: {
    color: '#D86F45',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  name: {
    color: '#1A1713',
    fontSize: 21,
    fontWeight: '900',
  },
  info: {
    color: '#6B6256',
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  price: {
    color: '#1A1713',
    fontSize: 20,
    fontWeight: '900',
  },
  button: {
    backgroundColor: '#1A1713',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  buttonText: {
    color: '#FFF8F0',
    fontSize: 13,
    fontWeight: '800',
  },
});
