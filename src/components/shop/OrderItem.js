import React, {useState} from 'react';
import styled from 'styled-components';
import CartItem from './CartItem';
import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
import Card from '../UI/Card';

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: 'center',
  },
});

const Container = styled.View`
  width: 100%;
`;

const Summary = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
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

const OrderItem = props => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Card style={styles.orderItem}>
      <Summary>
        <Total>$ {props.amount.toFixed(2)}</Total>
        <Date>{props.date}</Date>
      </Summary>
      <Button
        color={Colors.primary}
        title={showDetails ? 'Hide Details' : 'Show Details'}
        onPress={() => {
          setShowDetails(prevState => !prevState);
        }}
      />

      {showDetails && (
        <Container>
          {props.items.map(cartItem => (
            <CartItem
              key={cartItem.productId}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={cartItem.productTitle}
            />
          ))}
        </Container>
      )}
    </Card>
  );
};

export default OrderItem;
