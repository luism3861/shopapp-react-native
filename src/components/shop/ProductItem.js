import React from 'react';
import {
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import Colors from '../../constants/Colors';
import styled from 'styled-components';

const ProductItem = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.product}>
      <Touchable>
        <TouchableCmp onPress={props.onViewDetail} useForeground>
          <Container>
            <ImageContainer>
              <Image source={{uri: props.image}} />
            </ImageContainer>
            <Details>
              <Title>{props.title}</Title>
              <Price>${props.price.toFixed(2)}</Price>
            </Details>
            <Actions>
              <Button
                color={Colors.primary}
                title="View Details"
                onPress={props.onViewDetail}
              />
              <Button
                color={Colors.primary}
                title="To Cart"
                onPress={props.onAddToCart}
              />
            </Actions>
          </Container>
        </TouchableCmp>
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 300,
    margin: 20,
  },
});

const Touchable = styled.View`
  border-radius: 10px;
  overflow: hidden;
`;

const Container = styled.View``;

const ImageContainer = styled.View`
  width: 100%;
  height: 60%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

const Details = styled.View`
  align-items: center;
  height: 15%;
  padding: 10px;
`;

const Title = styled.Text`
  font-size: 18px;
  margin-vertical: 2px;
  font-family: OpenSans-Bold;
`;

const Price = styled.Text`
  font-size: 14px;
  color: #888;
  font-family: OpenSans-Regular;
`;

const Actions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 25%;
  padding-horizontal: 20px;
`;

export default ProductItem;
