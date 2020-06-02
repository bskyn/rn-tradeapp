import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styled, { css, ThemeContext } from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import dayjs from 'dayjs';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { FontAwesome5 } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from 'native-base';

const Label = styled.Text`
  color: #fff;
  font-family: Roboto;
  font-size: 16px;
  width: 80px;
`;
const StyledTextInput = styled.TextInput`
  color: #fff;
  font-family: Roboto;
  font-size: 16px;
  width: 200px;
`;
const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 50px;
  background-color: ${({ color }) => color};
`;
const NonEditableText = styled.Text`
  font-family: Roboto;
  font-size: 16px;
  color: ${({ isEmpty }) => (isEmpty ? '#a8a8a8' : '#fff')};
`;

const AddTradeScreen = ({ navigation }) => {
  const { colors } = useContext(ThemeContext);

  const [type, setType] = useState('');
  const [ticker, setTicker] = useState('');
  const [quantity, setQuantity] = useState('');
  const [action, setAction] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const handleDateConfirm = (date) => {
    setDate(date);
    setDatePickerVisibility(false);
  };

  const handleTimeConfirm = (date) => {
    setTime(date);
    setTimePickerVisibility(false);
  };

  const getPortfolios = useQuery(gql`
    query get_portfolios {
      portfolio {
        name
      }
    }
  `);

  console.log('getPortfolios: ', getPortfolios?.data);

  return (
    <>
      <SafeAreaView
        css={css`
          background-color: ${colors.darkNavy};
          padding-left: 16px;
          padding-right: 16px;
          padding-bottom: 20px;
        `}
      >
        <View
          css={css`
            flex-direction: row;
            margin-top: 10px;
          `}
        >
          <TouchableOpacity
            onPress={() => navigation.pop()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <View>
              <FontAwesome5 name="arrow-left" size={22} color={colors.lakeBlue} />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        css={css`
          flex: 1;
          background-color: ${colors.darkNavy};
        `}
      >
        <View
          css={css`
            flex-direction: row;
            border-bottom-color: ${colors.skyBlue};
            border-bottom-width: 1px;

            padding-top: 20px;
            padding-bottom: 20px;
            padding-left: 10px;
            padding-right: 10px;
          `}
        >
          <Label>Type</Label>
          <Picker
            mode="dropdown"
            style={{
              width: 200,
              paddingTop: 0,
              paddingBottom: 0,
              height: 'auto',
            }}
            textStyle={{
              color: '#fff',
              paddingLeft: 0,
              paddingRight: 0,
              fontFamily: 'Roboto',
            }}
            placeholder="Select type"
            placeholderStyle={{
              color: '#a8a8a8',
              paddingLeft: 0,
              paddingRight: 0,
              fontFamily: 'Roboto',
            }}
            selectedValue={type}
            onValueChange={(selectedVal) => setType(selectedVal)}
            iosHeader="Select instrument type"
            headerTitleStyle={{ width: 200 }}
          >
            <Picker.Item label="Futures" value="futures" />
            <Picker.Item label="Equities" value="equities" />
            <Picker.Item label="Options" value="options" />
          </Picker>
        </View>

        <View
          css={css`
            flex-direction: row;
            border-bottom-color: ${colors.skyBlue};
            border-bottom-width: 1px;

            padding-top: 20px;
            padding-bottom: 20px;
            padding-left: 10px;
            padding-right: 10px;
          `}
        >
          <Label>Ticker</Label>
          <StyledTextInput
            label="ticker"
            value={ticker}
            autoCapitalize="characters"
            autoCorrect={false}
            onChangeText={setTicker}
            placeholder="Enter ticker"
            placeholderTextColor="#a8a8a8"
            maxLength={30}
          />
        </View>

        <View
          css={css`
            flex-direction: row;
            border-bottom-color: ${colors.skyBlue};
            border-bottom-width: 1px;

            padding-top: 20px;
            padding-bottom: 20px;
            padding-left: 10px;
            padding-right: 10px;
          `}
        >
          <Label>Quantity</Label>
          <StyledTextInput
            label="quantity"
            value={quantity}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={setQuantity}
            placeholder="Enter quantity"
            placeholderTextColor="#a8a8a8"
            maxLength={30}
            keyboardType="number-pad"
          />
        </View>

        <View
          css={css`
            flex-direction: row;
            border-bottom-color: ${colors.skyBlue};
            border-bottom-width: 1px;

            padding-top: 20px;
            padding-bottom: 20px;
            padding-left: 10px;
            padding-right: 10px;
          `}
        >
          <Label>Action</Label>
          <Picker
            mode="dropdown"
            style={{
              width: 200,
              paddingTop: 0,
              paddingBottom: 0,
              height: 'auto',
            }}
            textStyle={{
              color: '#fff',
              paddingLeft: 0,
              paddingRight: 0,
              fontFamily: 'Roboto',
            }}
            placeholder="Select action"
            placeholderStyle={{
              color: '#a8a8a8',
              paddingLeft: 0,
              paddingRight: 0,
              fontFamily: 'Roboto',
            }}
            selectedValue={action}
            onValueChange={(selectedVal) => setAction(selectedVal)}
            iosHeader="Select action"
            headerTitleStyle={{ width: 200 }}
          >
            <Picker.Item label="Long" value="long" />
            <Picker.Item label="Short" value="short" />
          </Picker>
        </View>

        <View
          css={css`
            flex-direction: row;
            border-bottom-color: ${colors.skyBlue};
            border-bottom-width: 1px;

            padding-top: 20px;
            padding-bottom: 20px;
            padding-left: 10px;
            padding-right: 10px;
          `}
        >
          <Label>Price</Label>
          <StyledTextInput
            label="price"
            value={price}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={setPrice}
            placeholder="Enter price"
            placeholderTextColor="#a8a8a8"
            maxLength={30}
            keyboardType="decimal-pad"
          />
        </View>

        <View
          css={css`
            flex-direction: row;
            border-bottom-color: ${colors.skyBlue};
            border-bottom-width: 1px;

            padding-top: 20px;
            padding-bottom: 20px;
            padding-left: 10px;
            padding-right: 10px;
          `}
        >
          <Label>Date</Label>
          <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
            <NonEditableText>{dayjs(date).format('MMM D, YYYY')}</NonEditableText>
          </TouchableOpacity>
        </View>

        <View
          css={css`
            flex-direction: row;
            border-bottom-color: ${colors.skyBlue};
            border-bottom-width: 1px;

            padding-top: 20px;
            padding-bottom: 20px;
            padding-left: 10px;
            padding-right: 10px;
          `}
        >
          <Label>Time</Label>
          <TouchableOpacity onPress={() => setTimePickerVisibility(true)}>
            <NonEditableText>{dayjs(time).format('h:mm A')}</NonEditableText>
          </TouchableOpacity>
        </View>

        <View
          css={css`
            flex: 1;
            align-items: center;
            justify-content: flex-end;
            height: 90px;
          `}
        >
          <Button
            color={colors.skyBlue}
            onPress={() =>
              console.log('onsubmit', { type, ticker, quantity, action, price, date, time })
            }
          >
            <Text
              css={css`
                font-family: Roboto;
                color: #fff;
                font-size: 18px;
              `}
            >
              Submit
            </Text>
          </Button>
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={() => setDatePickerVisibility(false)}
        />

        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={() => setTimePickerVisibility(false)}
          headerTextIOS="Pick a time"
        />
      </ScrollView>
    </>
  );
};

export default AddTradeScreen;
