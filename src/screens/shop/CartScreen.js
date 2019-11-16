import React from 'react';
import {FlatList, StyleSheet, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../../constants/Colors';
import styled from 'styled-components';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/orders';
import Card from '../../components/UI/Card';

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
      a.productId > b.producId ? 1 : -1,
    );
  });

  const dispatch = useDispatch();
  return (
    <Screen style={styles.screen}>
      <Card style={styles.summary}>
        <SummaryText>
          Total:{' '}
          <Amount>
            ${Math.round((cartTotalAmount.toFixed(2) * 100) / 100)}
          </Amount>
        </SummaryText>
        <Button
          title="Order Now"
          disabled={cartItems.length === 0}
          onPress={() => {
            dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
          }}
        />
      </Card>
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
  },
});

export default CartScreen;
