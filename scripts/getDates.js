const currentYear = new Date().getFullYear();
const lastModified = document.lastModified;
document.getElementById('currentYear').textContent=currentYear;
document.getElementById('lastModified').textContent=`Last Modification: ${lastModified}`;