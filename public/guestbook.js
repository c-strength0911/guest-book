const guestbookList = document.querySelector(".guestbook__list");
const guestbookForm = document.querySelector(".guestbook__form");
const template = document.getElementById("guestbook-template");

const fetchGuestbook = () => {
  fetch("http://localhost:8000/join")
    .then((response) => response.json())
    .then((json) => {
      const date = Date.now();
      guestbookList.innerHTML = "";
      console.log(json);
      json.forEach((e) => {
        const subtractedTime = date - new Date(e.createAt);
        let createAt;
        if (subtractedTime >= 24 * 60 * 60 * 1000) {
          createAt = `${Math.floor(
            subtractedTime / (24 * 60 * 60 * 1000)
          )}일전`;
        } else if (subtractedTime >= 60 * 60 * 1000) {
          createAt = `${Math.floor(subtractedTime / (60 * 60 * 1000))}시간전`;
        } else if (subtractedTime >= 60 * 1000) {
          createAt = `${Math.floor(subtractedTime / (60 * 1000))}분전`;
        } else {
          createAt = `${Math.floor(subtractedTime / 1000)}초전`;
        }
        guestbookList.innerHTML += template.innerHTML
          .replace("{name}", e.name)
          .replace("{content}", e.content)
          .replace("{createAt}", createAt);
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

const submitGuestbook = (event) => {
  event.preventDefault();
  const { name, content } = event.currentTarget;

  // 폼값검증
  if (name.value.trim().length <= 0 || content.value.trim().length <= 0) {
    return alert("양식에 알맞게 입력하세요.");
  }
  if (content.value.trim().length > 200) {
    return alert("방명록은 200자이내로 입력하세요.");
  }

  fetch("http://localhost:8000/insert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name.value.trim(),
      content: content.value.trim(),
    }),
  })
    .then((response) => {
      if (response.ok) {
        name.value = "";
        content.value = "";
        fetchGuestbook();
      } else {
        alert("방명록 등록에 실패하였습니다.");
      }
    })
    .catch((error) => console.log(error));
};

window.addEventListener("DOMContentLoaded", () => {
  fetchGuestbook();
  guestbookForm.addEventListener("submit", submitGuestbook);
});
// gusetbookForm.addEventListener("submit", (event) => {
//   event.preventDefault();
//   var date = new Date();
//   var resultHtml = "";
//   const curGuestbook = {
//     name: event.target.name.valu,
//     date: date.toLocaleString(),
//     content: event.target.content.value,
//   };
//   const xhr = new XMLHttpRequest();
//   xhr.open("POST", "https://localhost:5500/create");
//   xhr.onreadystatechange = () => {
//     console.log("✅✅✅ ajax ✅✅✅");
//     if (xhr.readyState != 4) {
//       return;
//     }
//     if (xhr.status === 200) {
//       const response = JSON.parse(xhr.responseText);
//       if (response.result === "success") {
//         resultHtml = template
//           .replace("{name}", response.name)
//           .replace("{content}", response.content)
//           .replace("date", date.toLocaleString());
//         guestbookList.innerHTML = resultHtml;
//       }
//     }
//   };
// });
