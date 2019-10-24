import React from 'react';
import {View, FlatList, StyleSheet, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../../constants/Colors';
import styled from 'styled-components';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/orders';

const CartScreen = props => {
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
    const transformCartItems = [];
    for (const key in state.cart.items) {
      transformCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformCartItems.sort((a, b) =>
      a.productId > b.producrId ? 1 : -1,
    );
  });

  const dispatch = useDispatch();
  return (
    <Screen style={styles.screen}>
      <View style={styles.summary}>
        <SummaryText>
          Total: <Amount>${cartTotalAmount.toFixed(2)}</Amount>
        </SummaryText>
        <Button
          title="Order Now"
          disabled={cartItems.length === 0}
          onPress={() => {
            dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
          }}
        />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={itemData => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deletable
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </Screen>
  );
};

CartScreen.navigationOptions = {
  headerTitle: 'Your Cart',
};

const Screen = styled.View`
  margin: 20px;
`;

const SummaryText = styled.Text`
  font-family: OpenSans-Bold;
  font-size: 18px;
`;

const Amount = styled.Text`
  color: ${Colors.accent};
`;

const styles = StyleSheet.create({
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});

export default CartScreen;
