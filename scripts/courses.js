const courseContainer = document.querySelector(".course-list");
const credits = document.querySelector(".credits");
const allButton = document.querySelector("#all");
const wddButton = document.querySelector("#wdd");
const cseButton = document.querySelector("#cse");
const courses = [
{
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    certificate: "Web and Computer Programming",
    description: "...",
    technology: ["Python"],
    completed: true
},
{
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description: "...",
    technology: ["HTML","CSS"],
    completed: true
},
{
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    certificate: "Web and Computer Programming",
    description: "...",
    technology: ["Python"],
    completed: true
},
{
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    certificate: "Web and Computer Programming",
    description: "...",
    technology: ["C#"],
    completed: true
},
{
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description: "...",
    technology: ["HTML","CSS","JavaScript"],
    completed: true
},
{
    subject: "WDD",
    number: 231,
    title: "Frontend Web Development I",
    credits: 2,
    certificate: "Web and Computer Programming",
    description: "...",
    technology: ["HTML","CSS","JavaScript"],
    completed: false
}
];

function displayCourses(courseList) {

    courseContainer.innerHTML = "";

    courseList.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course");
        if (course.completed) {
            card.classList.add("completed");
            card.innerHTML = `
                <span class="status">✓</span>
                <strong>${course.subject} ${course.number}</strong>
            `;
        } else {
            card.classList.add("incomplete");
            card.innerHTML = `
                <span class="status">✗</span>
                <strong>${course.subject} ${course.number}</strong>
            `;
        }
        courseContainer.appendChild(card);
    });

    displayCredits(courseList);
}

function displayCredits(courseList) {
    const total = courseList.reduce((sum, course) => sum + course.credits, 0);
    credits.textContent =
        `The total credits for the displayed courses is ${total}`;
}

allButton.addEventListener("click", () => {
    displayCourses(courses);
});

wddButton.addEventListener("click", () => {
    const filtered = courses.filter(course => course.subject === "WDD");
    displayCourses(filtered);
});

cseButton.addEventListener("click", () => {
    const filtered = courses.filter(course => course.subject === "CSE");
    displayCourses(filtered);
});

displayCourses(courses);