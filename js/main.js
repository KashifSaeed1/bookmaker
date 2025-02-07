var submitBtn = document.getElementById("submitBtn");
var siteName = document.getElementById("siteName");
var c = document.getElementById("siteURL");
var tableBody = document.getElementById("tableBody");
var validitionAlert = document.getElementById("validitionAlert");
var closeBtn = document.getElementById("closeBtn");
var sitesContainer = [];
if (localStorage.getItem("sites") != null) {
  sitesContainer = JSON.parse(localStorage.getItem("sites"));
  displayData();
}
submitBtn.addEventListener("click", function () {
  addSite();
});

function addSite() {
  if (validtionName() == true && validtionURL() == true) {
    var siteDetiles = {
      siteObName: siteName.value,
      siteObURL: siteURL.value,
    };
    sitesContainer.push(siteDetiles);
    localStorage.setItem("sites", JSON.stringify(sitesContainer));
    displayData();
    siteName.value = "";
    siteURL.value = "";
    clearValiditonRegex();
  } else {
    alertDisplay();
  }
}

function displayData() {
  var newSite = "";
  for (var i = 0; i < sitesContainer.length; i++) {
    newSite += `
  <tr>
  <td>${i + 1}</td>
  <td>${sitesContainer[i].siteObName}</td>
  <td>
    <a href="${
      sitesContainer[i].siteObURL
    }" target="_blank" class="btn btn-visit">
      <i class="fa-solid fa-eye pe-2"></i>Visit
    </a>
  </td>
  <td>
    <button onclick=(deleteItem(${i})) class="btn btn-delete pe-2">
      <i class="fa-solid fa-trash-can"></i>
      Delete
    </button>
  </td>
</tr>
  `;
  }
  tableBody.innerHTML = newSite;
}

function deleteItem(deleteIndex) {
  sitesContainer.splice(deleteIndex, 1);
  localStorage.setItem("sites", JSON.stringify(sitesContainer));
  displayData();
}

// Start Validation

const regexURL =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
const regetNAme = /^\w{4,}$/;

siteName.addEventListener("input", function () {
  validtionName();
});

function validtionName() {
  if (regetNAme.test(siteName.value)) {
    siteName.classList.add("is-valid");
    siteName.classList.remove("is-invalid");
    return true;
  } else if (siteName.value == "") {
    siteName.classList.remove("is-invalid");
    siteName.classList.remove("is-valid");
    return false;
  } else if (regetNAme.test(siteName.value) != true) {
    siteName.classList.add("is-invalid");
    siteName.classList.remove("is-valid");
    return false;
  }
}

siteURL.addEventListener("input", function () {
  validtionURL();
});

function validtionURL() {
  if (regexURL.test(siteURL.value)) {
    siteURL.classList.add("is-valid");
    siteURL.classList.remove("is-invalid");
    return true;
  } else if (siteURL.value == "") {
    siteURL.classList.remove("is-invalid");
    siteURL.classList.remove("is-valid");
    return false;
  } else if (regexURL.test(siteURL.value) != true) {
    siteURL.classList.add("is-invalid");
    siteURL.classList.remove("is-valid");
    return false;
  }
}

function clearValiditonRegex() {
  siteURL.classList.remove("is-valid");
  siteName.classList.remove("is-valid");
}

function alertDisplay() {
  validitionAlert.classList.add("d-block");
  validitionAlert.classList.remove("d-none");
}

closeBtn.addEventListener("click", function () {
  validitionAlert.classList.remove("d-block");
  validitionAlert.classList.add("d-none");
});
