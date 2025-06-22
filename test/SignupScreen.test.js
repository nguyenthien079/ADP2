import test from 'node:test';
import assert from 'node:assert/strict';
import { isValidSignup } from '../src/screens/utils.js';

// Giả định utils.js có hàm isValidSignup:
// function isValidSignup(email, password, confirmPassword) { ... }

test('isValidSignup: trường trống => false', () => {
  assert.strictEqual(isValidSignup('', '', ''), false);
  assert.strictEqual(isValidSignup('user@example.com', '', ''), false);
  assert.strictEqual(isValidSignup('', 'password', 'password'), false);
});

test('isValidSignup: email không đúng định dạng => false', () => {
  assert.strictEqual(isValidSignup('not-an-email', 'password123', 'password123'), false);
  assert.strictEqual(isValidSignup('user@', 'password123', 'password123'), false);
});

test('isValidSignup: password quá ngắn => false', () => {
  // Giả sử rule: password phải >= 6 ký tự
  assert.strictEqual(isValidSignup('user@example.com', '123', '123'), false);
  assert.strictEqual(isValidSignup('user@example.com', '12345', '12345'), false);
});

test('isValidSignup: password và confirm không khớp => false', () => {
  assert.strictEqual(isValidSignup('user@example.com', 'password123', 'pass123'), false);
});

test('isValidSignup: tất cả hợp lệ => true', () => {
  assert.strictEqual(isValidSignup('user@example.com', 'password123', 'password123'), true);
});