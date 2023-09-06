let tableBody = document.getElementById("table-body");
let formDataArray = JSON.parse(localStorage.getItem("formData")) || [];
function decryptData(encryptedData, encryptionKey) {
  let decryptedBytes = AES.decrypt(encryptedData, encryptionKey);
  let decryptedString = decryptedBytes.toString(enc.Utf8);
  return decryptedString;
}
for (let i = 0; i < formDataArray.length; i++) {
  let decryptedData = JSON.parse(decryptData(formDataArray[i], "#1335%"));
  if (decryptedData) {
    tableBody.innerHTML += `
      <tr>
        <td>${decryptedData.firstName}</td>
        <td>${decryptedData.lastName}</td>
        <td>${decryptedData.phone}</td>
        <td>${decryptedData.emailAddress}</td>
        <td>${decryptedData.password}</td>
        <td>${decryptedData.selectedSubjects.join(", ")}</td>
      </tr>`;
  }
}
