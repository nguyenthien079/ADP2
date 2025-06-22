export function isValidCard(q, a) {
    return q.trim() !== '' && a.trim() !== '';
  }
  export function isValidSignup(email, password, confirmPassword) {
  // Kiểm tra không null/undefined/empty
  if (!email || !password || !confirmPassword) return false;

  const emailTrim = email.trim();
  if (emailTrim === "") return false;

  // Regex email cơ bản
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailTrim)) return false;

  // Kiểm tra password không chỉ toàn whitespace
  if (password.trim() === "") return false;

  // Độ dài tối thiểu, ví dụ 6 ký tự
  if (password.length < 6) return false;

  if (password !== confirmPassword) return false;

  return true;
}
export function isValidDeck(title, description = '') {
  if (typeof title !== 'string' || title.trim().length === 0) {
    return false;
  }
  return true;
}