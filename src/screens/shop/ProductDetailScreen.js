import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';
import styled from 'styled-components';

const ProductDetailScreen = ({navigation}) => {
  const productId = navigation.getParam('productId');
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId),
  );
  const dispatch = useDispatch();

  return (
    <Container>
      <Image source={{uri: selectedProduct.imageUrl}} />
      <Actions>
        <Button
          color={Colors.primary}
          title="Add to Cart"
          onPress={() => {
            dispatch(cartActions.addToCart(selectedProduct));
          }}
        />
      </Actions>
      <Price>${selectedProduct.price.toFixed(2)}</Price>
      <Description>{selectedProduct.description}</Description>
    </Container>
  );
};

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle'),
  };
};

const Container = styled.ScrollView``;

const Image = styled.Image`
  width: 100%;
  height: 300px;
`;

const Button = styled.Button``;

const Actions = styled.View`
  margin-vertical: 10px;
  align-items: center;
`;

const Price = styled.Text`
  font-size: 20px;
  color: 888;
  text-align: center;
  margin-vertical: 20px;
`;

const Description = styled.Text`
  font-size: 15px;
  text-align: center;
  margin-horizontal: 20px;
`;

export default ProductDetailScreen;
