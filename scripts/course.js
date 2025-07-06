/**
 * Course Management Module
 * Handles display and filtering of course cards
 */

document.addEventListener('DOMContentLoaded', initCourseModule);

function initCourseModule() {
    // Course data
    const courses = [
        {
            subject: 'CSE',
            number: 110,
            title: 'Introduction to Programming',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
            technology: ['Python'],
            completed: false
        },
        {
            subject: 'WDD',
            number: 130,
            title: 'Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming.',
            technology: ['HTML', 'CSS'],
            completed: false
        },
        {
            subject: 'CSE',
            number: 111,
            title: 'Programming with Functions',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions.',
            technology: ['Python'],
            completed: false
        },
        {
            subject: 'CSE',
            number: 210,
            title: 'Programming with Classes',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
            technology: ['C#'],
            completed: false
        },
        {
            subject: 'WDD',
            number: 131,
            title: 'Dynamic Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
            technology: ['HTML', 'CSS', 'JavaScript'],
            completed: false
        },
        {
            subject: 'WDD',
            number: 231,
            title: 'Frontend Web Development I',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
            technology: ['HTML', 'CSS', 'JavaScript'],
            completed: false
        }
    ];

    // Store courses in localStorage for filtering
    localStorage.setItem('courses', JSON.stringify(courses));

    // DOM Elements
    const elements = {
        container: document.getElementById("courseContainer"),
        creditTotal: document.getElementById("creditTotal"),
        filterButtons: document.querySelectorAll(".filter-btn")
    };

    // Mark completed courses
    markCompletedCourses(courses);

    // Initialize module
    setupEventListeners(elements.filterButtons, courses);
    displayCourses(courses, elements.container, elements.creditTotal);
}

function markCompletedCourses(courses) {
    courses.forEach(course => {
        if (course.number === 130 || course.number === 131) {
            course.completed = true;
        }
    });
}

function setupEventListeners(buttons, courses) {
    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
            filterCourses(e.target.dataset.filter, courses);
        });
    });
}

function displayCourses(courseList, container, creditElement) {
    if (!container || !creditElement) {
        console.error("Required DOM elements not found");
        return;
    }

    container.innerHTML = "";
    let totalCredits = 0;

    courseList.forEach(course => {
        const card = createCourseCard(course);
        container.appendChild(card);
        totalCredits += course.credits;
    });

    creditElement.textContent = `Total Credits: ${totalCredits}`;
}

function createCourseCard(course) {
    const card = document.createElement("div");
    card.className = `course-card ${course.completed ? 'completed' : 'incomplete'}`;

    card.innerHTML = `
        <div class="card-header">
            <h3>${course.subject} ${course.number}: ${course.title}</h3>
            <span class="badge ${course.completed ? 'badge-completed' : 'badge-pending'}">
                ${course.completed ? 'Completed' : 'In Progress'}
            </span>
        </div>
        <div class="card-body">
            <p class="course-description">${course.description}</p>
            <div class="course-meta">
                <p><strong>Credits:</strong> ${course.credits}</p>
                <p><strong>Certificate:</strong> ${course.certificate}</p>
                <div class="tech-stack">
                    <strong>Technologies:</strong>
                    ${course.technology.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        </div>
    `;

    return card;
}

function filterCourses(type, courses) {
    const container = document.getElementById("courseContainer");
    const creditTotal = document.getElementById("creditTotal");

    if (type === "all") {
        displayCourses(courses, container, creditTotal);
    } else {
        const filtered = courses.filter(c => c.subject === type);
        displayCourses(filtered, container, creditTotal);
    }
}
