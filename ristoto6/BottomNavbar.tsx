import React from 'react';
import { View, Pressable, Image, StyleSheet, Text } from 'react-native';

type Props = {
  cart: Record<string, number>;
  total?: number;
  discount?: number;
  discountedTotal?: string | number;
  navigation: any;
};

export default function BottomNavbar({
  cart,
  total = 0,
  discount = 0,
  discountedTotal,
  navigation,
}: Props) {
  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const finalTotal =
    discountedTotal !== undefined && discountedTotal !== null
      ? Number(discountedTotal).toFixed(2)
      : (total * (1 - discount)).toFixed(2);

  return (
    <View style={styles.bottomBar}>
      <Pressable style={styles.navButton} onPress={() => navigation.replace('Home')}>
        <Image source={require('./assets/homeButton.png')} style={styles.navImage} />
      </Pressable>

      {Number(finalTotal) > 0 && (
        <Text style={styles.btnText}>
          Total: €{finalTotal}
          {discount > 0 && (
            <Text style={styles.discountText}> (-{Math.round(discount * 100)}%)</Text>
          )}
        </Text>
      )}

      <Pressable style={styles.navButton} onPress={() => navigation.replace('Cart')}>
        <View>
          <Image source={require('./assets/cartButton.png')} style={styles.navImage} />
          {totalItems > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalItems}</Text>
            </View>
          )}
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    height: 60,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#000',
    overflow: 'hidden',
    zIndex: 100,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingHorizontal: 16,
  },
  navButton: {
    padding: 6,
  },
  navImage: {
    resizeMode: 'contain',
    width: 32,
    height: 32,
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  discountText: {
    color: '#fa6e23',
    fontSize: 18,
    fontWeight: 'bold',
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
