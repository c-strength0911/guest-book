const guestbook = document.getElementById("guestbook");
const guestbook__form = document.getElementById("guestbook__form");
const guestbook_template = document.getElementById("guestbook-template");
const xhr = new XMLHttpRequest();
guestbook__form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = {
    name: event.target.name.value,
    content: event.target.content.value,
  };
  xhr.open("POST", "http://localhost:8000/insert");
  xhr.onreadystatechange = () => {
    if (xhr.readyState !== 4) {
      return;
    }
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      if (response.result === "success") {
        guestbook_template.innerHTML
          .replace("{name}", data.name)
          .replace("{content}", data.content);
        guestbook.innerHTML = `${response.name}님 안녕하세요.`;
      } else {
        guestbook.innerHTML = "성공적으로 요청하지 못했습니다.";
      }
    } else if (xhr.status === 400) {
      guestbook.innerHTML = "내용을 입력해주세요.";
    }
  };
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(data));
  console.log("✅ ajax 요청");
});

window.addEventListener("load", function (event) {
  xhr.open("get", "http://localhost:8000/join");
  xhr.onreadystatechange = () => {
    if (xhr.readyState !== 4) {
      return;
    }
  };
});
