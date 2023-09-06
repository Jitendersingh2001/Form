////////////////////////////////////
/* VARIBALE DECLARATION START*/
////////////////////////////////////
const fName = document.getElementById("FirstName");
const lName = document.getElementById("LastName");
const phoneNo = document.getElementById("PhoneNo");
const email = document.getElementById("email");
const password = document.getElementById("Password");
const cPassword = document.getElementById("ConfirmPassword");
const subjectCheckboxes = document.querySelectorAll('input[name="Subject"]');
const AgreeCheckboxes = document.getElementById("agree");
const submitBtn = document.getElementById("submit");
const resetBtn = document.getElementById("Reset");
const Form = document.getElementById("myForm");
const validRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9-]+)*$/;
const { AES, enc } = CryptoJS;
////////////////////////////////////
/* VARIBALE DECLARATION END*/
///////////////////////////////////
////////////////////////////////////
/* RESET BTN START*/
///////////////////////////////////
let resetfiled = () => {
  fName.value = "";
  lName.value = "";
  phoneNo.value = "";
  email.value = "";
  password.value = "";
  cPassword.value = "";
  subjectCheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
  AgreeCheckboxes.checked = false;
};
resetBtn.addEventListener("click", resetfiled);
////////////////////////////////////
/* RESET BTN END*/
///////////////////////////////////
////////////////////////////////////
/* Subject Checkbox start*/
///////////////////////////////////
subjectCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    subjectCheckboxes.forEach((cb) => {
      if (cb !== checkbox) {
        cb.checked = false;
      }
    });
  });
});
////////////////////////////////////
/*  Subject Checkbox END*/
///////////////////////////////////
////////////////////////////////////
/* VALIDATE start*/
///////////////////////////////////
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  onSubmit();
});

function onSubmit() {
  if (fName.value === "") {
    alert("Please enter First Name");
    return false;
  }
  if (lName.value === "") {
    alert("Please enter Last Name");
    return false;
  }
  if (phoneNo.value === "") {
    alert("Please enter Phone Number");
    return false;
  }
  if (phoneNo.value.length > 10) {
    alert("Please enter a valid number");
    return false;
  }
  if (email.value === "") {
    alert("Please enter the E-mail ID");
    return false;
  }
  if (!email.value.match(validRegex)) {
    alert("Please enter a valid email");
    return false;
  }
  if (password.value === "") {
    alert("Please enter the Password");
    return false;
  }
  if (password.value.length < 8) {
    alert("Password should have at least 8 characters");
    return false;
  }
  if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password.value)) {
    alert("Password should contain at least one special character");
    return false;
  }
  if (cPassword.value === "") {
    alert("Please enter the Confirm Password");
    return false;
  }
  if (password.value !== cPassword.value) {
    alert("Passwords do not match");
    return false;
  }
  let subjectSelected = false;
  subjectCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      subjectSelected = true;
    }
  });
  if (!subjectSelected) {
    alert("Please select at least one subject");
    return false;
  }
  if (!AgreeCheckboxes.checked) {
    alert("Please agree to the Terms and Conditions");
    return false;
  }
  let formData;
  formData = {
    firstName: fName.value,
    lastName: lName.value,
    phone: phoneNo.value,
    emailAddress: email.value,
    password: password.value,
    selectedSubjects: Array.from(subjectCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value),
    AgreeCheckboxes: "Yes",
  };
  // let jsonString = JSON.stringify(formData);
  // const encryptionKey = "#1335%";
  // let encryptedData = AES.encrypt(jsonString, encryptionKey);
  // let encryptedString = encryptedData.toString();
  let formDataArray = JSON.parse(localStorage.getItem("formData")) || [];
  // formDataArray.push(encryptedString);
  localStorage.setItem("formData", JSON.stringify(formDataArray));
  resetfiled();
  Redirect();
  return true;
}

////////////////////////////////////
/*Validate end*/
///////////////////////////////////

function Redirect() {
  location.href = "/table.html";
}
