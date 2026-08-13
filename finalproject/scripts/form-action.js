const submissionDetails = document.querySelector("#submission-details");
const params = new URLSearchParams(window.location.search);

function formatRole(role) {
    if (!role) {
        return "";
    }

    if (role === "adc") {
        return "ADC";
    }

    return role.charAt(0).toUpperCase() + role.slice(1);
}

function createDetail(label, value) {
    const paragraph = document.createElement("p");
    const strong = document.createElement("strong");

    strong.textContent = `${label}: `;
    paragraph.appendChild(strong);
    paragraph.append(value || "Not provided");

    return paragraph;
}

if (submissionDetails) {
    const heading = document.createElement("h2");
    heading.textContent = "Submission Details";

    submissionDetails.appendChild(heading);

    submissionDetails.appendChild(
        createDetail("Name", params.get("name"))
    );

    submissionDetails.appendChild(
        createDetail("Email", params.get("email"))
    );

    submissionDetails.appendChild(
        createDetail(
            "Favorite Champion",
            params.get("favorite-champion")
        )
    );

    submissionDetails.appendChild(
        createDetail(
            "Favorite Role",
            formatRole(params.get("favorite-role"))
        )
    );

    submissionDetails.appendChild(
        createDetail(
            "Your Experience",
            params.get("message")
        )
    );
}