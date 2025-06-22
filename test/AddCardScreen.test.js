import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AddCardScreen from '../AddCardScreen';
import * as service from '../services/flashcardService';
import { Alert } from 'react-native';

// Spy và mock
jest.spyOn(Alert, 'alert');
jest.mock('../services/flashcardService');

describe('AddCardScreen UI', () => {
  const deckId = 'deck1';
  const navigation = { goBack: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders inputs and save button', () => {
    const { getByPlaceholderText, getByText } = render(
      <AddCardScreen route={{ params: { deckId } }} navigation={navigation} />
    );
    expect(getByPlaceholderText('Câu hỏi')).toBeTruthy();
    expect(getByPlaceholderText('Câu trả lời')).toBeTruthy();
    expect(getByText('Lưu thẻ!')).toBeTruthy();
  });

  it('shows error alert if question or answer empty', async () => {
    const { getByText } = render(
      <AddCardScreen route={{ params: { deckId } }} navigation={navigation} />
    );
    fireEvent.press(getByText('Lưu thẻ'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Lỗi',
        'Vui lòng nhập đầy đủ câu hỏi và câu trả lời.'
      );
      expect(service.createFlashcard).not.toHaveBeenCalled();
    });
  });

  it('calls createFlashcard and navigates back on valid input', async () => {
    service.createFlashcard.mockResolvedValueOnce();

    const { getByPlaceholderText, getByText } = render(
      <AddCardScreen route={{ params: { deckId } }} navigation={navigation} />
    );

    fireEvent.changeText(getByPlaceholderText('Câu hỏi'), 'Test Q?');
    fireEvent.changeText(getByPlaceholderText('Câu trả lời'), 'Test A.');
    fireEvent.press(getByText('Lưu thẻ'));

    await waitFor(() => {
      expect(service.createFlashcard).toHaveBeenCalledWith(
        deckId,
        'Test Q?',
        'Test A.'
      );
      expect(navigation.goBack).toHaveBeenCalled();
    });
  });

  it('shows error alert on createFlashcard failure', async () => {
    service.createFlashcard.mockRejectedValueOnce(new Error('Network failed'));

    const { getByPlaceholderText, getByText } = render(
      <AddCardScreen route={{ params: { deckId } }} navigation={navigation} />
    );

    fireEvent.changeText(getByPlaceholderText('Câu hỏi'), 'Q2?');
    fireEvent.changeText(getByPlaceholderText('Câu trả lời'), 'A2.');
    fireEvent.press(getByText('Lưu thẻ'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Lỗi khi lưu thẻ', 'Network failed');
      expect(navigation.goBack).not.toHaveBeenCalled();
    });
  });
});
