import React, { useState, useRef } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  TextInput,
  Animated,
  Easing,
  Keyboard,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartScreen from './screens/CartScreen';
import BottomNavbar from './BottomNavbar';
import { Header } from './screens/Header.ios';
import { storage } from './storage';
import { StripeProvider } from '@stripe/stripe-react-native';
import { LogBox } from 'react-native';
import PaymentScreen from './screens/PaymentScreen';

LogBox.ignoreAllLogs();
const Stack = createNativeStackNavigator();
const { width, height } = Dimensions.get('window');
const STRIPE_KEY = 'pk_test_51Rc4mERg8dWEytSy7cXuwJIVW36t0Kr7XVSIrqXK6qCbgsLTgNhVB4KoCgeS5RSEZikO5ilgF8Z82nqzJbPR32K800YClVeFxF';
const productImages = [
  {
    id: 1,
    name: 'Gab Classic',
    price: 7.5,
    source: require('./assets/gabClassic.png'),
    names: 'Gab Classic',
    ingredients: 'Hamburger (100g), salad, onion, tomato and cheddar',
    allergens: ['Gluten', 'Dairy'],
    category: 'Burgers',
  },
  {
    id: 2,
    name: 'Gab Damn',
    price: 10,
    source: require('./assets/gabDamn.png'),
    names: 'Gab Damn',
    ingredients: 'Hamburger(2x100g), extra bacon, BBQ, sauce and cheddar',
    allergens: ['Gluten', 'Dairy', 'Mustard'],
    category: 'Burgers',
  },
  {
    id: 3,
    name: 'Gab Chicken',
    price: 6.5,
    source: require('./assets/gabChicken.png'),
    names: 'Gab Chicken',
    ingredients: 'Chicken burger, salad and mayonnaise',
    allergens: ['Egg', 'Mustard'],
    category: 'Burgers',
  },
  {
    id: 4,
    name: 'Gab Crispy Chicken',
    price: 8,
    source: require('./assets/gabCrispyChicken.png'),
    names: 'Gab Crispy Chicken',
    ingredients: 'Chicken burger(x2), salad, cheddar, mayonnaise and ketchup',
    allergens: ['Gluten', 'Dairy', 'Egg', 'Mustard'],
    category: 'Burgers',
  },
  {
    id: 5,
    name: 'Gab Pulled Pork',
    price: 9.8,
    source: require('./assets/gabPulledPork.png'),
    names: 'Gab Pulled Pork',
    ingredients: 'Slow-cooked pulled pork, BBQ sauce, coleslaw and pickles',
    allergens: ['Mustard', 'Sulphites'],
    category: 'Burgers',
  },
  {
    id: 6,
    name: 'Gab Dog',
    price: 5.5,
    source: require('./assets/gabDog.png'),
    names: 'Gab Dog',
    ingredients: 'Hot dog sausage, caramelized onions, mustard and ketchup',
    allergens: ['Gluten', 'Mustard', 'Sulphites'],
    category: 'Burgers',
  },
  {
    id: 7,
    name: 'Gab Chips',
    price: 4.0,
    source: require('./assets/gabChips.png'),
    names: 'Gab Chips',
    ingredients: 'Crispy golden fries, lightly salted',
    allergens: [],
    category: 'Snacks',
  },
  {
    id: 8,
    name: 'Gab Nuggets',
    price: 5.5,
    source: require('./assets/gabNuggets.png'),
    names: 'Gab Nuggets',
    ingredients: 'Breaded chicken nuggets, served with dipping sauce',
    allergens: ['Gluten', 'Egg', 'Milk'],
    category: 'Snacks',
  },
  {
    id: 9,
    name: 'Gab Rings',
    price: 3.2,
    source: require('./assets/gabRings.png'),
    names: 'Gab Rings',
    ingredients: 'Crispy onion rings, beer-battered',
    allergens: ['Gluten', 'Sulphites'],
    category: 'Snacks',
  },
  {
    id: 10,
    name: 'Gab Crocche',
    price: 4.0,
    source: require('./assets/gabCrocche.png'),
    names: 'Gab Crocche',
    ingredients: 'Potato croquettes filled with melted cheese',
    allergens: ['Dairy', 'Gluten', 'Egg'],
    category: 'Snacks',
  },
  {
    id: 11,
    name: 'Gab Chilli Bites',
    price: 3.8,
    source: require('./assets/gabChilliBites.png'),
    names: 'Gab Chilli Bites',
    ingredients: 'Spicy chili cheese bites with crunchy coating',
    allergens: ['Gluten', 'Dairy', 'Egg'],
    category: 'Snacks',
  },
  {
    id: 12,
    name: 'Gab Stick',
    price: 4.2,
    source: require('./assets/gabStick.png'),
    names: 'Gab Stick',
    ingredients: 'Mozzarella sticks, deep-fried and crunchy',
    allergens: ['Dairy', 'Gluten', 'Egg'],
    category: 'Snacks',
  },
  {
    id: 13,
    name: 'Gab Water',
    price: 1.0,
    source: require('./assets/gabWater.png'),
    names: 'Gab Water',
    ingredients: 'Natural still water, 500ml bottle',
    allergens: [],
    category: 'Drinks',
  },
  {
    id: 14,
    name: 'Gab Cola',
    price: 3.5,
    source: require('./assets/gabCola.png'),
    names: 'Gab Cola',
    ingredients: 'Classic cola soft drink, 330ml',
    allergens: [],
    category: 'Drinks',
  },
  {
    id: 15,
    name: 'Gab Beer',
    price: 4.5,
    source: require('./assets/gabBeer.png'),
    names: 'Gab Beer',
    ingredients: 'Craft lager beer, 330ml bottle',
    allergens: ['Gluten', 'Sulphites'],
    category: 'Drinks',
  },
  {
    id: 16,
    name: 'Gab Soda',
    price: 3.5,
    source: require('./assets/gabSoda.png'),
    names: 'Gab Soda',
    ingredients: 'Lemon soda drink, 330ml can',
    allergens: [],
    category: 'Drinks',
  },
  {
    id: 17,
    name: 'Gab Tea',
    price: 3.0,
    source: require('./assets/gabTea.png'),
    names: 'Gab Tea',
    ingredients: 'Iced tea with lemon, 500ml bottle',
    allergens: [],
    category: 'Drinks',
  },
  {
    id: 18,
    name: 'Gab Shake',
    price: 4.5,
    source: require('./assets/gabShake.png'),
    names: 'Gab Shake',
    ingredients: 'Vanilla milkshake with whipped cream',
    allergens: ['Dairy'],
    category: 'Drinks',
  },
  {
    id: 19,
    name: 'Gab Tart',
    price: 3,
    source: require('./assets/gabCrostata.png'),
    names: 'Gab Tart',
    ingredients: 'Vanilla milkshake with whipped cream',
    allergens: ['Dairy'],
    category: 'Desserts',
  },
  {
    id: 20,
    name: 'Gab Sacher',
    price: 3.5,
    source: require('./assets/gabSacher.png'),
    names: 'Gab Sacher',
    ingredients: 'Vanilla milkshake with whipped cream',
    allergens: ['Dairy'],
    category: 'Desserts',
  },
];


// Schermata principale dell'app
function MainScreen({ navigation, cart, setCart }: { navigation: any; cart: Record<string, number>; setCart: React.Dispatch<React.SetStateAction<Record<string, number>>> }) {
  const isDarkMode = useColorScheme() === 'dark';
  // Stato per categoria selezionata, ricerca, apertura ricerca, zoom immagine
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Burgers' | 'Snacks' | 'Drinks' | 'Desserts'>('All');
  const [searchText, setSearchText] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<any | null>(null);
  const searchInputRef = useRef<TextInput>(null);
  const animWidth = useRef(new Animated.Value(48)).current;

  // Animazione apertura barra di ricerca
  const openSearch = () => {
    setSearchOpen(true);
    Animated.timing(animWidth, {
      toValue: 260,
      duration: 250,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    });
  };
 
  // Animazione chiusura barra di ricerca
  const closeSearch = () => {
    Keyboard.dismiss();
    Animated.timing(animWidth, {
      toValue: 48,
      duration: 200,
      easing: Easing.in(Easing.ease),
      useNativeDriver: false,
    }).start(() => {
      setSearchOpen(false);
      setSearchText('');
    });
  };

  // Filtra prodotti per categoria e testo ricerca
  const filtered = productImages.filter(p => {
    const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const search = searchText.trim().toLowerCase();
    const matchSearch = selectedCategory === 'All'? (search === '' || p.name.toLowerCase().includes(search)): true;
    return matchCategory && matchSearch;
  });

  // Calcola totale carrello
  const total = Object.entries(cart).reduce((sum, [id, qty]) => {
    const pr = productImages.find(p => p.id === +id);
    return sum + (pr ? pr.price * qty : 0);
  }, 0);

  const showNoResults = filtered.length === 0;

  // Gestione zoom immagine prodotto
  const handleImagePress = (image: any) => {
    setZoomedImage(image);
  };

  const closeZoom = () => {
    setZoomedImage(null);
  };

  return (
    <>
      <View style={{ backgroundColor: isDarkMode ? '#1a0900' : '#fa6e23', flex: 1 }}>
        {/* Overlay immagine zoomata */}
        {zoomedImage && (
          <Pressable style={styles.zoomOverlay} onPress={closeZoom}>
            <View style={styles.zoomContainer}>
              {/* Immagine ingrandita */}
              <View
                style={{
                  width: width * 0.8,
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  alignSelf: 'center',
                  marginBottom: 0,
                  paddingBottom: 0,
                }}
              >
                <Image
                  source={zoomedImage.source}
                  style={{
                    width: '100%',
                    aspectRatio: zoomedImage.width / zoomedImage.height,
                  }}
                  resizeMode="cover"
                />
              </View>
              {/* Box descrizione sotto immagine */}
              <View
                style={{
                  backgroundColor: '#fff',
                  width: width * 0.8,
                  padding: 12,
                  borderBottomLeftRadius: 16,
                  borderBottomRightRadius: 16,
                  alignSelf: 'center',
                  marginTop: -1,
                  paddingTop: 0,
                  maxHeight: height * 0.4,
                }}
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    textAlign: 'left',
                    marginBottom: 6,
                    color: '#000',
                  }}
                >
                  {zoomedImage.name}
                </Text>
                {zoomedImage.ingredients && (
                  <Text
                    style={{
                      fontSize: 14,
                      lineHeight: 20,
                      color: '#333',
                      textAlign: 'left',
                    }}
                  >
                    {zoomedImage.ingredients}
                  </Text>
                )}
                {/* Mostra allergeni in rosso */}
                {zoomedImage.allergens && zoomedImage.allergens.length > 0 && (
                  <View style={{ marginTop: 8 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#b30000',
                        fontWeight: 'bold',
                        marginBottom: 2,
                      }}
                    >
                      ⚠ Allergens
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#b30000',
                        lineHeight: 20,
                      }}
                    >
                      {zoomedImage.allergens.join(', ')}
                    </Text>
                  </View>
                )}
                <Text
                  style={{
                    fontSize: 16,
                    marginTop: 8,
                    fontWeight: '600',
                    color: '#000',
                    textAlign: 'left',
                  }}
                >
                  €{zoomedImage.price.toFixed(2)}
                </Text>
              </View>
              {/* Pulsante chiusura zoom */}
              <Pressable style={styles.closeButton} onPress={closeZoom}>
                <Text style={styles.closeButtonText}>✕</Text>
              </Pressable>
            </View>
          </Pressable>
        )}

        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor = {isDarkMode ? '#1a0900' : '#fa6e23'}
        />
        <ScrollView
          style={{ backgroundColor: isDarkMode ? '#1a0900' : '#fa6e23', flex: 1 }}
          contentContainerStyle={{
            minHeight: height - 60,
            flexGrow: 1,
            paddingBottom: 100,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={{ paddingRight: '5%' }}>
            <Header />
          </View>
          {/* Barra di ricerca animata */}
          <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 10 }}>
            <Animated.View style={[styles.animatedSearchBar, { width: animWidth }]}>
              {!searchOpen ? (
                <Pressable
                  style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 38 }}
                  onPress={openSearch}
                >
                  <Image
                    source={require('./assets/searchIcon.png')}
                    style={{ width: 22, height: 22, tintColor: '#fa6e23' }}
                  />
                </Pressable>
              ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <Image
                    source={require('./assets/searchIcon.png')}
                    style={{ width: 22, height: 22, tintColor: '#fa6e23', marginRight: 8 }}
                  />
                  <TextInput
                    ref={searchInputRef}
                    style={styles.searchInput}
                    placeholder="Search by name..."
                    placeholderTextColor="#888"
                    value={searchText}
                    onChangeText={setSearchText}
                    returnKeyType="search"
                    clearButtonMode="while-editing"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <Pressable onPress={closeSearch} style={{ marginLeft: 8 }}>
                    <Text style={{ fontSize: 18, color: '#fa6e23', fontWeight: 'bold' }}>✕</Text>
                  </Pressable>
                </View>
              )}
            </Animated.View>
          </View>
            {/* Pulsanti filtro categoria */}
            <View
              style={[
              styles.buttonContainer,
              { 
                backgroundColor: isDarkMode ? '#1a0900' : 'transparent',
                flexWrap: 'wrap',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: width * 1,
                alignSelf: 'center',
              },
              ]}
            >
              {['All', 'Burgers', 'Snacks', 'Drinks', 'Desserts'].map((cat, idx) => (
              <View
                key={cat}
                style={{
                width: '30%', 
                marginHorizontal: 4,
                marginVertical: 4,
                }}
              >
                <Pressable
                style={({ pressed }) => [
                  {
                  backgroundColor:
                    selectedCategory === cat
                    ? (isDarkMode ? '#fa6e23' : '#6b2302')
                    : pressed
                    ? (isDarkMode ? '#333' : '#444')
                    : (isDarkMode ? '#222' : '#000'),
                  width: '100%',
                  alignItems: 'center',
                  },
                  styles.button,
                ]}
                onPress={() => {
                  if (selectedCategory === cat) {
                  setSelectedCategory('All');
                  } else {
                  setSelectedCategory(cat as any);
                  }
                  setSearchText('');
                  if (searchOpen) closeSearch();
                }}
                >
                <Text style={styles.btnText}>{cat}</Text>
                </Pressable>
              </View>
              ))}
            </View>
          {/* Lista prodotti */}
          <View
            style={{
              flex: 1,
              minHeight: width * 0.5,
              justifyContent: showNoResults ? 'center' : 'flex-start',
              alignItems: 'center',
            }}
          >
            {showNoResults ? (
              // Nessun prodotto trovato
              <Text
                style={{
                  color: '#fff',
                  fontSize: 22,
                  marginTop: 60,
                  textAlign: 'center',
                }}
              >
                This product doesn't exist, try again...
              </Text>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  width: '120%',
                }}
              >
                {filtered.map((img, idx) => (
                  <Pressable
                    key={idx}
                    onPress={() => handleImagePress(img)}
                    style={[
                      styles.shadowContainer,
                      { backgroundColor: isDarkMode ? '#b05310' : '#fff' }
                    ]}
                  >
                    {/* Immagine prodotto */}
                    <Image
                      style={[styles.image, { width: width * 0.4, height: width * 0.4 }]}
                      source={img.source}
                      resizeMode="cover"
                    />
                    {/* Titolo + ingredienti */}
                    <View
                      style={{
                        marginTop: 8,
                        width: width * 0.4,
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 16,
                          textAlign: 'left',
                          color: isDarkMode ? '#fff' : '#000',
                        }}
                      >
                        {img.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          textAlign: 'left',
                          lineHeight: 18,
                          textAlignVertical: 'center',
                          color: isDarkMode ? '#fff' : '#000',
                        }}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                      >
                        {img.ingredients}
                      </Text>
                    </View>
                    {/* Controlli quantità e prezzo */}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '5%',
                      }}
                    >
                      {/* Rimuovi dal carrello */}
                        <Pressable
                          onPress={() =>
                            setCart((c: Record<string, number>) => ({
                              ...c,
                              [img.id]: Math.max((c[img.id] || 0) - 1, 0),
                            }))
                          }
                          style={({ pressed }) => [
                            {
                              backgroundColor: pressed
                                ? (isDarkMode ? '#6b2302' : '#fa6e23')
                                : (isDarkMode ? '#fff' : '#222'),
                              borderRadius: 16,
                              width: 28,
                              height: 28,
                              alignItems: 'center',
                              justifyContent: 'center',
                            },
                          ]}
                        >
                          <Text style={{ color: isDarkMode ? '#000' : '#fff', fontSize: 22, fontWeight: 'bold' }}>–</Text>
                        </Pressable>
                        {/* Quantità */}
                        <Text style={{ fontSize: 20, paddingHorizontal: '5%', color: isDarkMode ? '#fff' : '#000' }}>
                          {cart[img.id] || 0}
                        </Text>
                        {/* Aggiungi al carrello */}
                        <Pressable
                          onPress={() =>
                            setCart((c: Record<string, number>) => ({
                              ...c,
                              [img.id]: (c[img.id] || 0) + 1,
                            }))
                          }
                          style={({ pressed }) => [
                            {
                              backgroundColor: pressed
                                ? (isDarkMode ? '#6b2302' : '#fa6e23')
                                : (isDarkMode ? '#fff' : '#222'),
                              borderRadius: 16,
                              width: 28,
                              height: 28,
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginLeft: '5%',
                            },
                          ]}
                        >
                          <Text style={{ color: isDarkMode ? '#000' : '#fff', fontSize: 22, fontWeight: 'bold', fontFamily: 'arial' }}>+</Text>
                        </Pressable>
                      {/* Prezzo */}
                      <Text style={{ fontSize: 16, marginLeft: '5%', color: isDarkMode ? '#fff' : '#000' }}>
                        €{img.price.toFixed(2)}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      {/* Barra di navigazione in basso */}
      <BottomNavbar cart={cart} total={total} navigation={navigation} />
    </>
  );
}
const styles = StyleSheet.create({
  shadowContainer: {
    // backgroundColor moved to inline style for dynamic theming
    borderRadius: 16,
    margin: 10,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    minWidth: width * 0.42,
    maxWidth: width * 0.45,
  },
  image: {
    borderRadius: 12,
    backgroundColor: '#eee',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    marginTop: 4,
  },
  button: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 6,
    marginVertical: 2,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  animatedSearchBar: {
    backgroundColor: '#fff',
    borderRadius: 24,
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingVertical: 0,
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
  },
  zoomOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#fa6e23',
    fontWeight: 'bold',
  },
});

export default function App() {
  const [cart, setCart] = useState<{ [id: number]: number }>({});
  const [loading, setLoading] = useState(true);
  const isDarkMode = useColorScheme() === 'dark';

  // Carica carrello da storage locale all'avvio
  React.useEffect(() => {
    const savedCart = storage.getString('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Salva carrello su storage locale ad ogni modifica
  React.useEffect(() => {
    storage.set('cart', JSON.stringify(cart));
  }, [cart]);

  // Splash screen iniziale
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: isDarkMode ? '#1a0900' : '#fa6e23' }}>
        <Image style={{ resizeMode:'center' }} source={require('./assets/appLogo.png')} />
      </View>
    );
  }

  // Navigazione principale con StripeProvider
  return (
    <StripeProvider publishableKey={STRIPE_KEY}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home">
            {props => <MainScreen {...props} cart={cart} setCart={setCart} />}
          </Stack.Screen>
          <Stack.Screen name="Cart">
            {props => <CartScreen discount={undefined} setDiscount={undefined} {...props} cart={cart} setCart={setCart} />}
          </Stack.Screen>
          <Stack.Screen name="Payment" component={PaymentScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
}
