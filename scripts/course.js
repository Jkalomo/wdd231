// Course data array
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

// SVG Assets as Data URLs
const techIcons = {
    python: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path fill='%233776AB' d='M50 10c-13 0-23 3-23 10v20c0 7 11 10 23 10h10v-5H47v-9h26v-6c0-7-10-10-23-10z'/><path fill='%23FFD43B' d='M50 90c13 0 27-3 27-10V50c0-7-14-10-27-10H40v5h13v9H27v16c0 7 10 10 23 10z'/></svg>`,
    html: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path fill='%23E34F26' d='M18 8l7 72 32 10 32-10 7-72H18zm60 18H40l1 12h36l-2 24H49l1 12 15 5 15-5 2-18h8l-3 32-27 9-27-9-3-32h8l1 12 15 5h1l15-5 1-12H25l-2-24h42l-1-12z'/></svg>`,
    css: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path fill='%231572B6' d='M18 8l7 72 32 10 32-10 7-72H18zm60 18H40l1 12h36l-2 24H49l1 12 15 5 15-5 2-18h8l-3 32-27 9-27-9-3-32h8l1 12 15 5h1l15-5 1-12H25l-2-24h42l-1-12z'/></svg>`,
    javascript: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path fill='%23F7DF1E' d='M8 8h84v84H8V8zm45 67c0 10-6 16-15 16-8 0-13-4-16-9l11-6c2 3 4 6 8 6 3 0 6-2 6-5V40h12v35zm22 16c-9 0-15-4-18-10l11-7c3 5 6 8 12 8 5 0 8-2 8-6 0-4-3-6-9-8l-3-1c-9-3-15-7-15-16 0-10 8-17 19-17 8 0 14 3 18 9l-10 7c-2-4-5-5-8-5-4 0-6 2-6 5 0 3 2 5 8 7l3 1c11 4 17 8 17 17 0 11-8 18-21 18z'/></svg>`,
    csharp: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path fill='%23239120' d='M50 8c23 0 42 19 42 42s-19 42-42 42S8 73 8 50 27 8 50 8zm-5 15v22H23v10h22v22h10V55h22V45H55V23h-10z'/><path fill='%23239120' d='M68 60l7 5-14 14-5-7 12-12zm-12-12l7 5-14 14-5-7 12-12z'/></svg>`
};

const statusIcons = {
    completed: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%234CAF50'/><path fill='none' stroke='white' stroke-width='10' d='M30 50l15 15 25-30'/></svg>`,
    inProgress: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='40' fill='none' stroke='%232196F3' stroke-width='10'/><path fill='%232196F3' d='M50 10a40 40 0 1 1 0 80 40 40 0 0 1 0-80zm0 10a30 30 0 1 0 0 60 30 30 0 0 0 0-60z'/><path fill='%232196F3' d='M50 10v30l20 20'/></svg>`
};

// DOM elements
const courseCardsContainer = document.getElementById('course-cards');
const totalCreditsElement = document.getElementById('total-credits');
const filterButtons = {
    all: document.getElementById('all'),
    wdd: document.getElementById('wdd'),
    cse: document.getElementById('cse')
};

// Function to create course card HTML with embedded SVGs
function createCourseCard(course) {
    const techList = course.technology.map(tech => {
        const techLower = tech.toLowerCase();
        return `
        <li title="${tech}">
            <img src="${techIcons[techLower]}" alt="${tech}" width="16" onerror="this.parentNode.innerHTML = '<span>${tech}</span>'">
            <span>${tech}</span>
        </li>`;
    }).join('');

    return `
    <div class="course-card ${course.completed ? 'completed' : ''}">
        <div class="course-badge">${course.subject}</div>
        <div class="course-header">
            <h3>${course.number}: ${course.title}</h3>
            <span class="credits">${course.credits} CR</span>
        </div>
        <p class="description">${course.description}</p>
        <div class="technology">
            <ul>${techList}</ul>
        </div>
        <div class="course-footer">
            <div class="status ${course.completed ? 'completed' : 'incomplete'}">
                <img src="${course.completed ? statusIcons.completed : statusIcons.inProgress}" 
                     alt="${course.completed ? 'Completed' : 'In Progress'}" 
                     width="14"
                     style="vertical-align:middle; margin-right:4px;">
                ${course.completed ? 'Completed' : 'In Progress'}
            </div>
            <div class="certificate">${course.certificate}</div>
        </div>
    </div>
    `;
}

// Display courses function with filtering
function displayCourses(filter = 'all') {
    let filteredCourses = [];

    switch (filter) {
        case 'wdd':
            filteredCourses = courses.filter(course => course.subject === 'WDD');
            break;
        case 'cse':
            filteredCourses = courses.filter(course => course.subject === 'CSE');
            break;
        default:
            filteredCourses = [...courses];
    }

    // Clear previous cards
    courseCardsContainer.innerHTML = '';

    // Create new cards
    filteredCourses.forEach(course => {
        const cardHTML = createCourseCard(course);
        courseCardsContainer.insertAdjacentHTML('beforeend', cardHTML);
    });

    // Update total credits
    updateTotalCredits(filteredCourses);
}

// Calculate and display total credits
function updateTotalCredits(courses) {
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsElement.textContent = totalCredits;
}

// Set active filter button
function setActiveFilter(activeButton) {
    Object.values(filterButtons).forEach(button => {
        button.classList.remove('active');
    });
    activeButton.classList.add('active');
}

// Event listeners for filter buttons
filterButtons.all.addEventListener('click', () => {
    displayCourses('all');
    setActiveFilter(filterButtons.all);
});

filterButtons.wdd.addEventListener('click', () => {
    displayCourses('wdd');
    setActiveFilter(filterButtons.wdd);
});

filterButtons.cse.addEventListener('click', () => {
    displayCourses('cse');
    setActiveFilter(filterButtons.cse);
});

// Initialize page
function init() {
    // Mark your completed courses here
    // Example: courses.find(c => c.subject === 'WDD' && c.number === 130).completed = true;

    displayCourses();
    setActiveFilter(filterButtons.all);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);