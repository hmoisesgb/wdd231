const url = "https://hmoisesgb.github.io/wdd231/chamber/data/members.json";
const grid = document.querySelector(".grid");

async function getMembers(){
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data.members);
}

const displayMembers = (members) =>{
    members.forEach((member) => {
        let section = document.createElement('section');
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
        website.innerHTML = member.website;
        memberLevel.textContent = member.membership_level;
        motto.textContent = member.motto;

        section.appendChild(logo);
        section.appendChild(name);
        section.appendChild(address);
        section.appendChild(phone);
        section.appendChild(website);
        section.appendChild(memberLevel);
        section.appendChild(motto);
        grid.appendChild(section);
    });
}

getMembers();