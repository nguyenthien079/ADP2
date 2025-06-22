# FlashCard App – Học Từ Vựng Tiếng Anh

Trong thời đại toàn cầu hóa, việc thành thạo tiếng Anh trở thành một kỹ năng thiết
yếu đối với học sinh, sinh viên và người đi làm. Tuy nhiên, việc ghi nhớ từ vựng tiếng Anh
thường gặp nhiều khó khăn do số lượng từ lớn và cách học chưa hiệu quả.
Phương pháp học từ vựng bằng Flashcard được chứng minh là mang lại hiệu quả
cao trong việc ghi nhớ lâu dài nhờ vào cơ chế lặp lại ngắt quãng (spaced repetition). Vì vậy,
nhóm chúng tôi quyết định lựa chọn đề tài "Thiết kế phần mềm học từ vựng tiếng Anh theo
phương pháp Flashcard" nhằm hỗ trợ người học tiếp cận từ vựng một cách trực quan, chủ
động và hiệu quả hơn thông qua thiết bị di động.


## Giới thiệu
**Tên dự án**: FlashCard App – Học Từ Vựng Tiếng Anh  
**Mục đích**:
- Hỗ trợ người học tiếp cận và ghi nhớ từ vựng tiếng Anh qua Flashcard, tận dụng cơ chế lặp lại ngắt quãng (spaced repetition) 
- Cung cấp chức năng tạo/bổ sung/bảo trì bộ Flashcard, học tập, kiểm tra nhanh (Quiz), xem thống kê tiến trình, và chia sẻ bộ Flashcard với người khác.
- Ứng dụng hoạt động ổn định trên Android (có khả năng mở rộng iOS trong tương lai)

**Người phát triển**: Nhóm 9:
Nguyễn Hồng Thanh, Nguyễn Nhật Quỳnh, Lương Thành Vinh, Võ Minh Nghĩa   
**Ngày khởi tạo**: 22/06/2025

> nhằm hỗ trợ người học tiếp cận từ vựng một cách trực quan, chủ
động và hiệu quả hơn thông qua thiết bị di động.

---

## Tính năng
- **Đăng ký / Đăng nhập / Quên mật khẩu** qua Firebase Authentication.
- **Quản lý Deck (Bộ Flashcard)**: Tạo, sửa, xóa Deck theo chủ đề tùy chọn, hiển thị danh sách Deck trên HomeScreen .
- **Quản lý Card (Thẻ Flashcard)**: Trong mỗi Deck, thêm mới thẻ gồm mặt trước (từ tiếng Anh) và mặt sau (nghĩa tiếng Việt), chỉnh sửa, xóa thẻ 
- **Học Flashcard (Study)**: Lật thẻ (flip card) hiển thị Anh–Việt, Việt–Anh, và chế độ ghép từ tương đồng.
- **Quiz**: Sinh câu hỏi trắc nghiệm dựa trên từ đã học, hiển thị kết quả đúng/sai sau bài làm.
- **Thống kê (Stats)**: Hiển thị số lượng thẻ đã học, tỉ lệ trả lời đúng trong Quiz, mức độ ghi nhớ từng Deck.
- **Chia sẻ Deck**: Cho phép người dùng chia sẻ Deck của mình; người khác có thể xem và tải Deck chia sẻ về học.


---

## Công nghệ sử dụng
- **Framework & Ngôn ngữ**: React Native (Expo Framework).
- **Backend-as-a-Service**: Firebase Authentication, Firestore Database, Storage (nếu lưu hình ảnh minh họa).
- **Navigation**: react-navigation.
- **Form & Validation**: Formik, Yup.
- **Animation & Gesture**: react-native-gesture-handler, react-native-reanimated, react-native-flip-card (hoặc custom).
- **Firebase Integration**: expo-firebase-auth, expo-firebase-firestore (hoặc firebase JS SDK).
- **UI Library**: react-native-paper hoặc native-base (tuỳ chọn) .
- **Testing**: Jest, cấu hình trong jest-setup.js và thư mục test.
- **Build & Deploy**: Expo EAS Build (Android, hướng phát triển iOS).


---

## Yêu cầu
- Node.js >= 14.x
- npm hoặc yarn
- Expo CLI:
  ```bash
  npm install -g expo-cli
 - Firebase CLI (nếu deploy rules/indexes hoặc functions sau này)
 - Xcode / Apple Developer account để build iOS.

## Tài liệu & Tham khảo
 - React Native: https://reactnative.dev/

 - Expo: https://docs.expo.dev/

 - Firebase: https://firebase.google.com/docs

 - Jest: https://jestjs.io/

 - EAS: https://docs.expo.dev/eas/

 - Formik & Yup docs

 - react-navigation docs
