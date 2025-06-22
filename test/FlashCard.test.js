import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FlashCard from '../components/FlashCard';

describe('FlashCard Component', () => {
  const question = 'What is React Native?';
  const answer = 'A framework for building native apps using React';

  test('renders question text initially', () => {
    const { getByText, queryByText } = render(
      <FlashCard question={question} answer={answer} />
    );

    // Lúc đầu phải thấy câu hỏi
    expect(getByText(question)).toBeTruthy();
    expect(getByText('Chạm để xem đáp án')).toBeTruthy();

    // Không thấy đáp án lúc đầu
    expect(queryByText(answer)).toBeNull();
  });

  test('flips to show answer when pressed', () => {
    const { getByText, queryByText, getByTestId } = render(
      <FlashCard question={question} answer={answer} />
    );

    // Lúc đầu không thấy đáp án
    expect(queryByText(answer)).toBeNull();

    // Ấn để flip
    fireEvent.press(getByText(question));

    // Sau flip, phải thấy đáp án
    expect(getByText(answer)).toBeTruthy();
    expect(getByText('Chạm để xem câu hỏi')).toBeTruthy();

    // Không thấy câu hỏi nữa
    expect(queryByText(question)).toBeNull();
  });
});
