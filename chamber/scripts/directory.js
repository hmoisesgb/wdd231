const url = "https://hmoisesgb.github.io/wdd231/chamber/data/members.json";

const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

async function getMembers() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to fetch member data.");
        }

        const data = await response.json();
        displayMembers(data.members);

    } catch (error) {
        console.error("Error fetching members:", error);
    }
}

function displayMembers(members) {

    membersContainer.innerHTML = "";

    members.forEach(member => {

        const card = document.createElement("section");
        card.classList.add("member-card");

        const header = document.createElement("div");
        header.classList.add("member-header");

        const body = document.createElement("div");
        body.classList.add("member-body");

        const logo = document.createElement("img");
        const name = document.createElement("h3");
        const motto = document.createElement("p");

        const email = document.createElement("p");
        const phone = document.createElement("p");
        const website = document.createElement("p");

        logo.src = member.image_icon;
        logo.alt = `${member.name} logo`;
        logo.loading = "lazy";
        logo.width = 100;

        name.textContent = member.name;
        motto.textContent = member.motto;
        motto.classList.add("motto");

        const emailLink = document.createElement("a");
        emailLink.href = `mailto:${member.email}`;
        emailLink.textContent = member.email;

        email.innerHTML = "<strong>Email:</strong> ";
        email.appendChild(emailLink);

        const phoneLink = document.createElement("a");
        phoneLink.href = `tel:${member.phone}`;
        phoneLink.textContent = member.phone;

        phone.innerHTML = "<strong>Phone:</strong> ";
        phone.appendChild(phoneLink);

        const websiteLink = document.createElement("a");
        websiteLink.href = member.website;
        websiteLink.target = "_blank";
        websiteLink.rel = "noopener noreferrer";
        websiteLink.textContent = member.website.replace(/^https?:\/\//, "");

        website.innerHTML = "<strong>URL:</strong> ";
        website.appendChild(websiteLink);

        header.appendChild(name);
        header.appendChild(motto);

        body.appendChild(logo);
        body.appendChild(email);
        body.appendChild(phone);
        body.appendChild(website);

        card.appendChild(header);
        card.appendChild(body);

        membersContainer.appendChild(card);
    });
}

getMembers();

gridButton.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
});

listButton.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
});