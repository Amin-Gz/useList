// imports------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
import { data } from "autoprefixer";
import axios from "axios";
import { Result } from "postcss";

// consts------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const pageNum = document.getElementById("pageNum");
const prvBtn = document.getElementById("prv");
const nextBtn = document.getElementById("next");
const postBtn = document.getElementById("postBtn");
const fName = document.getElementById("fName");
const lName = document.getElementById("lName");
const mail = document.getElementById("Email");
const avatar = document.getElementById("avatar");
const closeBtn = document.getElementById("closeBtn");
const userDetailsParentDiv = document.getElementById("userDetailsParentDiv");
const ulChildren = document.getElementById("ulList").children;
const deleteUserBtn = document.getElementById("deleteUserBtn");

let imgDetail = document.getElementById("imgDetail");
let fnDetail = document.getElementById("fnDetail");
let lnDetail = document.getElementById("lnDetail");
let idDetail = document.getElementById("idDetail");
let mailDetail = document.getElementById("mailDetail");
let datasaver = [];
let url = "https://reqres.in/api/";
// get api from the server--------------------------------------------------------------------------------------------------------------------------------------------------------
async function getapi() {
  for (let i = 1; i < 3; i++) {
    const appAxios = await axios.get(url + `users?page=${i}`);
    appAxios.data.data.forEach((element) => {
      datasaver.push({
        id: element.id,
        email: element.email,
        firstName: element.first_name,
        lastName: element.last_name,
        avatar: element.avatar,
      });
    });
  }
  showlist();
}

// when the window is fully loaded call functions--------------------------------------------------------------------------------------------------------------------------------------------------------
window.onload = (event) => {
  getapi();
};
// show users in ul called with callback method from where api was got-----------------------------------------------------------------------------------------------------------------
async function showlist() {
  // & handling eachpage's data and the number of how many 'LI's to have in the ul
  if (datasaver.length <= 6 && pageNum.innerHTML === "1") {
    showingData(datasaver);
  } else if (datasaver.length > 6 && pageNum.innerHTML === "1") {
    showingData(datasaver.slice(0, 6));
  } else if (datasaver.length <= 12 && pageNum.innerHTML === "2") {
    showingData(datasaver.slice(6));
  } else if (datasaver.length > 12 && pageNum.innerHTML === "2") {
    showingData(datasaver.slice(6, 12));
  } else if (datasaver.length <= 18 && pageNum.innerHTML === "3") {
    showingData(datasaver.slice(12));
  } else if (datasaver.length > 18 && pageNum.innerHTML === "3") {
    showingData(datasaver.slice(12, 18));
  }
  // & too add fourth page of users
  // //else if (datasaver.length <= 24 && pageNum.innerHTML === "4") {
  // //showingData(datasaver.slice(18));}
  // & showing data in ul
  function showingData(data) {
    for (let j = 0; j, j < 6; j++) {
      ulChildren[j].innerHTML = "";
    }
    for (let i = 0; i < data.length; i++) {
      ulChildren[i].innerHTML = `
          <img src="${data[i].avatar}" alt="avatar" class="w-[62px] h-[62px] block rounded-full border border-black">
          <div class="flex flex-col gap-3">
            <p>Name: ${data[i].firstName}</p>
            <p>Last name: ${data[i].lastName}</p>
          </div>
      `;
    }
  }
}
// onclick event buttons for page handling----------------------------------------------------------------------------------------------------------------------------------------------------------
nextBtn.addEventListener("click", () => {
  pageNum.innerHTML = Number(pageNum.innerHTML) + 1;
  pageNum.innerHTML === "3" && nextBtn.classList.add("disable");
  pageNum.innerHTML === "2" && prvBtn.classList.remove("disable");
  showlist();
});
prvBtn.addEventListener("click", () => {
  pageNum.innerHTML = Number(pageNum.innerHTML) - 1;
  pageNum.innerHTML === "2" && nextBtn.classList.remove("disable");
  pageNum.innerHTML === "1" && prvBtn.classList.add("disable");
  showlist();
});

// Create User------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//& submit button
postBtn.addEventListener("click", postData);
// &  Posting data
function postData() {
  let avatar2 = "";
  avatar2 =
    avatar.value.includes("fakepath") || avatar.value === ""
      ? "./assets/images/person.svg"
      : avatar;
  axios
    .post(url + `users`, {
      email: mail,
      firstName: fName,
      lastName: lName,
      avatar: avatar,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.error(error);
    });
  //  & nullish form of when user use no data
  if (
    fName.value === "" ||
    lName.value === "" ||
    mail.value === "" ||
    mail.value.indexOf("@") === -1 ||
    mail.value.slice(-4) !== ".com"
  ) {
    alert("Wrong value");
  } else {
    datasaver.push({
      id: datasaver[datasaver.length - 1].id + 1,
      email: mail.value.trim(),
      firstName:
        fName.value.trim().charAt(0).toUpperCase() + fName.value.slice(1),
      lastName:
        lName.value.trim().charAt(0).toUpperCase() + lName.value.slice(1),
      avatar: avatar2,
    });
  }
  // & resetting the input values
  showlist();
  fName.value = "";
  lName.value = "";
  mail.value = "";
  avatar.value = [""];
}

// UserDetails---------------------------------------------------------------------------------------------------------------------------------------
closeBtn.addEventListener("click", function closeuserDetailsParentDiv() {
  userDetailsParentDiv.classList.add("hidden");
});
for (let i = 0; i < 6; i++) {
  let j = i;
  let x = i;
  ulChildren[i].addEventListener("click", () => {
    pageNum.innerHTML === "3"
      ? (i += 12) && (x += 13)
      : pageNum.innerHTML === "2"
      ? (i += 6) && (x += 7)
      : (x += 1);
    if (datasaver[i] === undefined) {
      return;
    } else {
      showDataDetails();
    }
    //& showing one user's data From Arr & fetching sigle user
    function showDataDetails() {
      axios.get(url + "users/" + x).then((response) => {
        console.log("reqres api");
        console.log(response.data.data);
        console.log("reqres api");
      });
      userDetailsParentDiv.classList.remove("hidden");
      imgDetail.src = datasaver[i].avatar;
      fnDetail.innerHTML = datasaver[i].firstName;
      lnDetail.innerHTML = datasaver[i].lastName;
      console.log("DataSaver arr");
      console.log(datasaver[i]);
      console.log("DataSaver arr");
      idDetail.innerHTML = datasaver[i].id;
      mailDetail.innerHTML = datasaver[i].email;
    }
    // ?chon let "i" ii ke taif karde boodam be khatere data ha meghdaresh avaz mishod ye copy az meghdar avvalash gereftam ke akhar dobare behesh bedam ke tooye select kardane li ha be moshkel nakhoram
    // ? moteghayyere X ro serfan jahate modiriate single user i ke az reqres get mikonim gozashtam chon aslan az api esh nemikhaym estfade konim serfan be ostad neshoonmidam ke kar mikone vali chon data nemitoonam behesh push konam inja namayesh midatesh
    i = j;
    x = j;
  });
}

// Delete Single User ------------------------------------------------------------------------------------------------------------------------------------------------------------------
deleteUserBtn.addEventListener("click", () => {
  let deletecheck = window.confirm(
    "Are You sure you want to delete this user?"
  );
  if (deletecheck) {
    let elementIndex = 0;
    const idDetailNumber = Number(idDetail.innerHTML);
    datasaver.findIndex((element) => {
      if (element.id === idDetailNumber) {
        elementIndex = datasaver.indexOf(element);
      }
    });
    datasaver.splice(elementIndex, 1);
    axios.delete(url + `user/` + elementIndex).then((response) => {
      console.log(response);
    });
    userDetailsParentDiv.classList.add("hidden");
    showlist();
  } else {
    return;
  }
});
