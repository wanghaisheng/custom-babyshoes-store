import styled from 'styled-components';
import { colors } from '../theme';

export const CustomDatePicker = styled.select`
  background-color: ${colors.cardColor};
  color: ${colors.mainLightColor};
  font-size: 20px;
  padding: 10px 15px;
  border: 2px solid ${colors.textColorDarkBg};
  border-radius: 10px;
  outline: none;
  min-width: 300px;
  cursor: pointer;
  margin-bottom: 20px;
`;

