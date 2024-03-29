import React, { useContext } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { css, ThemeContext } from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Row, Grid } from 'react-native-easy-grid';

const HomeScreen = ({ navigation }) => {
  const { colors } = useContext(ThemeContext);

  return (
    <>
      <SafeAreaView
        css={css`
          background-color: ${colors.darkNavy};
        `}
      />

      <Grid
        css={css`
          background-color: ${colors.darkNavy};
          align-items: center;
        `}
      >
        <Row
          size={50}
          css={css`
            align-items: center;
          `}
        >
          <View
            css={css`
              align-items: center;
            `}
          >
            <Image
              css={css`
                width: 120px;
                height: 120px;
              `}
              source={require('assets/png/logo_icon_medium.png')}
            />

            <Text
              css={css`
                font-family: Roboto;
                font-size: 26px;
                margin-top: 16px;
                color: ${colors.skyBlue};
              `}
            >
              tradebook
            </Text>
          </View>
        </Row>
        <Row size={50}>
          <View
            css={css`
              justify-content: center;
            `}
          >
            <TouchableOpacity onPress={() => navigation.navigate('SignupModal')}>
              <View
                css={css`
                  border-radius: 10px;
                  padding: 4px;
                  background-color: #314146;
                  width: 120px;
                  height: 50px;
                  justify-content: center;
                  align-items: center;
                `}
              >
                <Text
                  css={css`
                    font-family: Roboto-Bold;
                    color: ${colors.skyBlue};
                    font-size: 24px;
                  `}
                >
                  Sign up
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('SigninModal')}>
              <View
                css={css`
                  margin-top: 25px;
                  justify-content: center;
                  align-items: center;
                  padding: 4px;
                `}
              >
                <Text
                  css={css`
                    font-family: Roboto-Bold;
                    color: ${colors.heather};
                    font-size: 20px;
                  `}
                >
                  Log in
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Row>
      </Grid>
    </>
  );
};

export default HomeScreen;
