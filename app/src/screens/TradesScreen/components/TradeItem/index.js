import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import styled, { css, ThemeContext } from 'styled-components/native';
import { Grid, Col } from 'react-native-easy-grid';
import dayjs from 'dayjs';
import { formatDollars } from 'helpers/string';

import { ACTION_COLOR_MAP } from 'screens/TradesScreen/helpers';

const StyledText = styled.Text`
  color: #fff;
  font-family: Roboto;
  font-size: 14px;
`;

const TradeItem = ({ data }) => {
  const { colors } = useContext(ThemeContext);

  return (
    <Grid
      css={css`
        flex-direction: row;
        align-items: center;

        background-color: ${colors.navy};
        height: 80px;
        padding: 4px;
        margin-bottom: 16px;
        margin-left: 10px;
        margin-right: 10px;
        border-radius: 6px;
      `}
    >
      <Col size={30}>
        <Text
          css={css`
            color: ${colors.skyBlue};
            padding-left: 10px;
            font-family: Roboto-Bold;
            font-size: 18px;
          `}
        >
          {data?.ticker}
        </Text>
      </Col>

      <Col size={50}>
        <View>
          <StyledText
            css={css`
              margin-bottom: 5px;
            `}
          >
            {`${dayjs(`${data?.date}T${data?.time}`).format('M/D/YY - h:mm A')}`}
          </StyledText>
          <StyledText>{`${formatDollars(data?.price)} x ${data?.quantity}`}</StyledText>
        </View>
      </Col>

      <Col
        size={20}
        css={css`
          padding-right: 10px;
        `}
      >
        <View
          css={css`
            background-color: ${ACTION_COLOR_MAP[data?.status]};
            border-radius: 5px;
            padding: 6px;
            width: 65px;
          `}
        >
          <Text
            css={css`
              color: ${colors.navy};
              text-transform: capitalize;
              font-family: Roboto;
              font-size: 14px;
              text-align: center;
            `}
          >
            {data?.status}
          </Text>
        </View>

        <View
          css={css`
            width: 65px;
            justify-content: center;
            align-items: center;
          `}
        >
          <Text
            css={css`
              margin-top: 6px;
              color: ${ACTION_COLOR_MAP[data?.action]};
              text-transform: capitalize;
              font-family: Roboto-Bold;
              font-size: 12px;
              text-align: center;
            `}
          >
            {data?.action}
          </Text>
        </View>
      </Col>
    </Grid>
  );
};

export default TradeItem;
