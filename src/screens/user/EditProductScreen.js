import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import {Platform} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as productsActions from '../../store/actions/products';

const EditProductScreen = ({navigation}) => {
  const prodId = navigation.getParam('productId');

  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId),
  );
  const dispatch = useDispatch();

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
  const [imageUrl, setImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : '',
  );
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : '',
  );

  const submitHandler = useCallback(() => {
    if (editedProduct) {
      dispatch(
        productsActions.updateProduct(prodId, title, description, imageUrl),
      );
    } else {
      dispatch(
        productsActions.createProduct(title, description, imageUrl, +price),
      );
    }
    navigation.goBack();
  }, [dispatch, prodId, title, description, imageUrl, price]);

  useEffect(() => {
    navigation.setParams({submit: submitHandler});
  }, [submitHandler]);

  return (
    <Scroll>
      <Form>
        <Container>
          <Title>Title</Title>
          <Input value={title} onChangeText={text => setTitle(text)} />
        </Container>
        <Container>
          <Title>Image url</Title>
          <Input value={imageUrl} onChangeText={image => setImageUrl(image)} />
        </Container>
        {editedProduct ? null : (
          <Container>
            <Title>Price</Title>
            <Input value={price} onChangeText={text => setPrice(text)} />
          </Container>
        )}
        <Container>
          <Title>Description</Title>
          <Input
            value={description}
            onChangeText={des => setDescription(des)}
          />
        </Container>
      </Form>
    </Scroll>
  );
};

EditProductScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit');
  return {
    headerTitle: navData.navigation.getParam('productId')
      ? 'Edit Product'
      : 'Add Product',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};

const Scroll = styled.ScrollView``;

const Form = styled.View`
  margin: 20px;
`;

const Container = styled.View`
  width: 100%;
`;

const Title = styled.Text`
  font-family: OpenSans-Bold;
  margin-vertical: 8px;
`;

const Input = styled.TextInput`
  padding-horizontal: 2px;
  padding-vertical: 5px;
  border-bottom-color: #ccc;
  border-bottom-width: 1px;
`;

export default EditProductScreen;
