import React from 'react';
import styled from 'styled-components';
import CartItem from './CartItem';
import {View, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const OrderItem = props => {
  return (
    <View style={styles.orderItem}>
      <Summary>
        <Total>$ {props.amount.toFixed(2)}</Total>
        <Date>{props.date}</Date>
      </Summary>
      <Button color={Colors.primary} title="Show Details" />
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
    alignItems: 'center',
  },
});

const Summary = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Total = styled.Text`
  font-family: OpenSans-Bold;
  font-size: 16px;
`;

const Date = styled.Text`
  font-size: 16px;
  font-family: OpenSans-Regular;
  color: #888;
`;

const Button = styled.Button``;

export default OrderItem;
