const guestbook = document.getElementById("guestbook");
const guestbook__form = document.getElementById("guestbook__form");
const guestbook_template = document.getElementById("guestbook-template");
const xhr = new XMLHttpRequest(); //중요3

// guestbook__form.addEventListener("submit", (event) => {
//   event.preventDefault(); //중요
//   const data = {
//     name: event.target.name.value,
//     content: event.target.content.value,
//   };
//   xhr.open("POST", "http://localhost:8000/insert"); //중요
//   xhr.onreadystatechange = () => {
//     //중요
//     if (xhr.readyState !== 4) {
//       return;
//     }
//     if (xhr.status === 200) {
//       const response = JSON.parse(xhr.responseText);
//       if (response.result === "success") {
//         guestbook_template.innerHTML
//           .replace("{name}", data.name) //사용자가 입력한 이름
//           .replace("{content}", data.content); //사용자가 입력한 컨텐츠
//         // 수정
//         guestbook.innerHTML = `${response.name}님 안녕하세요.`;
//       } else {
//         guestbook.innerHTML = "성공적으로 요청하지 못했습니다.";
//       }
//     } else if (xhr.status === 500) {
//       guestbook.innerHTML = "내용을 입력해주세요.";
//     }
//   };
//   xhr.setRequestHeader("Content-Type", "application/json"); //중요
//   xhr.send(JSON.stringify(data)); //중요
//   console.log("✅ ajax 요청");
// });

// 우체국 접수 -> 배송중 -> 배송완료
// AJAX 접수 -> 서버에게 가는중 -> 요청받고 처리중 -> 응답하는중 -> 응답완료
window.addEventListener("load", function fetchGuestbookData(event) {
  xhr.open("get", "http://localhost:8000/join"); // HTTP GET http://localhost:8000/join
  xhr.onreadystatechange = () => {
    if (xhr.readyState !== 4) {
      return;
    }
    const response = JSON.parse(xhr.responseText);
    console.log("✅ 조회 기능 응답 완료");
    console.log(response[0].name);
  };
  xhr.send();
});
