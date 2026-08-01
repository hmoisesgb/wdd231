const params = new URLSearchParams(window.location.search);

document.querySelector("#displayFirstName").textContent =
    params.get("fName") || "";
document.querySelector("#displayLastName").textContent =
    params.get("lName") || "";
document.querySelector("#displayEmail").textContent =
    params.get("email") || "";
document.querySelector("#displayPhone").textContent =
    params.get("phone") || "";
document.querySelector("#displayBusiness").textContent =
    params.get("bName") || "";

const timestamp = params.get("timestamp");
if (timestamp) {
    document.querySelector("#displayTimestamp").textContent =
        new Date(timestamp).toLocaleString();
}