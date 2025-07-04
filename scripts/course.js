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

// DOM elements
const courseCardsContainer = document.getElementById('course-cards');
const totalCreditsElement = document.getElementById('total-credits');
const filterButtons = {
    all: document.getElementById('all'),
    wdd: document.getElementById('wdd'),
    cse: document.getElementById('cse')
};

// Function to create course card HTML
function createCourseCard(course) {
    const techList = course.technology.map(tech => `
        <li title="${tech}">
            <img src="images/tech-${tech.toLowerCase()}.svg" alt="${tech}" width="16">
            <span>${tech}</span>
        </li>
    `).join('');

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
                ${course.completed ? '✓ Completed' : 'In Progress'}
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