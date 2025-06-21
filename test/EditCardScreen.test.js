
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import EditCardScreen from '../src/screens/EditCardScreen';
import * as service from '../src/services/flashcardService';
import { Alert } from 'react-native';

jest.spyOn(Alert, 'alert');
jest.mock('../src/services/flashcardService');

describe('EditCardScreen', () => {
  const deckId = 'deck1';
  const cardId = 'card1';
  const existingQuestion = 'Old Q';
  const existingAnswer = 'Old A';
  const route = { params: { deckId, cardId, question: existingQuestion, answer: existingAnswer } };
  const navigation = { goBack: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders inputs with existing values and save button', () => {
    const { getByPlaceholderText, getByText } = render(<EditCardScreen route={route} navigation={navigation} />);
    const qInput = getByPlaceholderText('Câu hỏi');
    const aInput = getByPlaceholderText('Câu trả lời');
    expect(qInput.props.value).toBe(existingQuestion);
    expect(aInput.props.value).toBe(existingAnswer);
    expect(getByText('Lưu')).toBeTruthy(); // giả sử button title là 'Lưu'
  });

  it('shows error if inputs empty after trim', async () => {
    const { getByPlaceholderText, getByText } = render(<EditCardScreen route={route} navigation={navigation} />);
    fireEvent.changeText(getByPlaceholderText('Câu hỏi'), '   ');
    fireEvent.changeText(getByPlaceholderText('Câu trả lời'), '');
    fireEvent.press(getByText('Lưu'));
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Lỗi', 'Vui lòng nhập đầy đủ câu hỏi và câu trả lời.');
      expect(service.updateFlashcard).not.toHaveBeenCalled();
    });
  });

  it('calls updateFlashcard and goBack on success', async () => {
    service.updateFlashcard.mockResolvedValueOnce();
    const { getByPlaceholderText, getByText } = render(<EditCardScreen route={route} navigation={navigation} />);
    fireEvent.changeText(getByPlaceholderText('Câu hỏi'), 'New Q');
    fireEvent.changeText(getByPlaceholderText('Câu trả lời'), 'New A');
    fireEvent.press(getByText('Lưu'));
    await waitFor(() => {
      expect(service.updateFlashcard).toHaveBeenCalledWith(deckId, cardId, 'New Q', 'New A');
      expect(navigation.goBack).toHaveBeenCalled();
    });
  });

  it('shows error on update failure and keeps inputs', async () => {
    const errorMsg = 'Update failed';
    service.updateFlashcard.mockRejectedValueOnce(new Error(errorMsg));
    const { getByPlaceholderText, getByText } = render(<EditCardScreen route={route} navigation={navigation} />);
    const qInput = getByPlaceholderText('Câu hỏi');
    const aInput = getByPlaceholderText('Câu trả lời');
    fireEvent.changeText(qInput, 'Changed Q');
    fireEvent.changeText(aInput, 'Changed A');
    fireEvent.press(getByText('Lưu'));
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Lỗi khi lưu thẻ', errorMsg);
      expect(qInput.props.value).toBe('Changed Q');
      expect(aInput.props.value).toBe('Changed A');
      expect(navigation.goBack).not.toHaveBeenCalled();
    });
  });
});
