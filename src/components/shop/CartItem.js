import React from 'react';
import {Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';

const Container = styled.View`
  padding: 10px;
  background-color: white;
  flex-direction: row;
  justify-content: space-between;
  margin-horizontal: 20px;
`;

const ItemData = styled.View`
  flex-direction: row;
  align-items: center;
  justify-con
`;

const Quantity = styled.Text`
  font-family: OpenSans-Regular;
  color: #827e7e;
  font-size: 17px;
  margin-right: 10px;
`;

const MainText = styled.Text`
  font-family: OpenSans-Bold;
  font-size: 16px;
`;

const Button = styled.TouchableOpacity`
  margin-left: 20px;
`;

const CartItem = props => {
  return (
    <Container>
      <ItemData>
        <Quantity>{props.quantity}</Quantity>
        <MainText>{props.title}</MainText>
      </ItemData>
      <ItemData>
        <MainText>${props.amount.toFixed(2)}</MainText>
        {props.deletable && (
          <Button onPress={props.onRemove}>
            <Icon
              name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
              size={25}
              color="red"
            />
          </Button>
        )}
      </ItemData>
    </Container>
  );
};

export default CartItem;
