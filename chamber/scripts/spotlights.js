const membersUrl = "https://hmoisesgb.github.io/wdd231/chamber/data/members.json";

async function getMembers(){
    const response = await fetch(membersUrl);
    const data = await response.json();
    const qualifiedMembers = data.members.filter(member => member.membership_level == 2 || member.membership_level == 3);
    const randomMembers = randomQualifiedMembers(qualifiedMembers);
    displaySpotlights(randomMembers.slice(0, 3));
}

function randomQualifiedMembers(qualifiedMembers) {
    for (let i = qualifiedMembers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [qualifiedMembers[i], qualifiedMembers[j]] = [qualifiedMembers[j], qualifiedMembers[i]];
    }
    return qualifiedMembers;
}

function displaySpotlights(members) {
    members.forEach((member, index) => {
        const spotlightContainer = document.querySelector(`#member${index + 1}`);

        let logo = document.createElement('img');
        let name = document.createElement('h3');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let website = document.createElement('a');
        let memberLevel = document.createElement('p');
        let motto = document.createElement('p');

        logo.setAttribute('src',member.image_icon);
        logo.setAttribute('alt',`${member.name} Logo`);
        logo.setAttribute('loading','lazy');
        logo.setAttribute('width', '200px');
        logo.setAttribute('height', member.icon_height);

        name.textContent = member.name;
        address.textContent = member.address;
        phone.textContent = member.phone;
        website.setAttribute('href', member.website);
        website.textContent = member.website;

        memberLevel.textContent = member.membership_level == 2 ? "Silver Member" : "Gold Member";
        
        motto.textContent = member.motto;

        spotlightContainer.appendChild(logo);
        spotlightContainer.appendChild(name);
        spotlightContainer.appendChild(motto);
        spotlightContainer.appendChild(address);
        spotlightContainer.appendChild(phone);
        spotlightContainer.appendChild(website);
        spotlightContainer.appendChild(memberLevel);

    });
}

getMembers();