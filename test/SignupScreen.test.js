
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignupScreen from '../src/screens/SignupScreen';
import * as authService from '../src/services/authService';
import { Alert } from 'react-native';

jest.spyOn(Alert, 'alert');
jest.mock('../src/services/authService');

describe('SignupScreen', () => {
  const navigation = { navigate: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders email, password, confirm inputs and signup button', () => {
    const { getByPlaceholderText, getByText } = render(<SignupScreen navigation={navigation} />);
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Mật khẩu')).toBeTruthy();
    expect(getByPlaceholderText('Xác nhận mật khẩu')).toBeTruthy();
    expect(getByText('Đăng ký')).toBeTruthy();
  });

  it('shows error if passwords do not match', async () => {
    const { getByPlaceholderText, getByText } = render(<SignupScreen navigation={navigation} />);
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Mật khẩu'), 'pass1');
    fireEvent.changeText(getByPlaceholderText('Xác nhận mật khẩu'), 'pass2');
    fireEvent.press(getByText('Đăng ký'));
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Lỗi', 'Mật khẩu không khớp.');
      expect(authService.signup).not.toHaveBeenCalled();
    });
  });

  it('calls signup and navigates on success', async () => {
    authService.signup.mockResolvedValueOnce({ user: { uid: 'newuser' } });
    const { getByPlaceholderText, getByText } = render(<SignupScreen navigation={navigation} />);
    fireEvent.changeText(getByPlaceholderText('Email'), 'newuser@example.com');
    fireEvent.changeText(getByPlaceholderText('Mật khẩu'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Xác nhận mật khẩu'), 'password123');
    fireEvent.press(getByText('Đăng ký'));
    await waitFor(() => {
      expect(authService.signup).toHaveBeenCalledWith('newuser@example.com', 'password123');
      expect(navigation.navigate).toHaveBeenCalledWith('Home');
      expect(Alert.alert).not.toHaveBeenCalled();
    });
  });

  it('shows error on signup failure', async () => {
    const errorMsg = 'Email đã tồn tại';
    authService.signup.mockRejectedValueOnce(new Error(errorMsg));
    const { getByPlaceholderText, getByText } = render(<SignupScreen navigation={navigation} />);
    fireEvent.changeText(getByPlaceholderText('Email'), 'exist@example.com');
    fireEvent.changeText(getByPlaceholderText('Mật khẩu'), 'pass123');
    fireEvent.changeText(getByPlaceholderText('Xác nhận mật khẩu'), 'pass123');
    fireEvent.press(getByText('Đăng ký'));
    await waitFor(() => {
      expect(authService.signup).toHaveBeenCalledWith('exist@example.com', 'pass123');
      expect(Alert.alert).toHaveBeenCalledWith('Lỗi', errorMsg);
      expect(navigation.navigate).not.toHaveBeenCalled();
    });
  });
});
