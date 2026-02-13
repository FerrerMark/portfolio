const resumeData = {
  name: "John Mark Ferrer",
  age: "24",
  title: "Web Developer",
  summary: "A motivated and detail-oriented Information Technology graduate with hands-on experience in web development through an internship. Skilled in HTML, CSS, PHP, JavaScript, and Laravel, with a solid foundation in database management using MySQL. A fast learner who adapts quickly to new technologies and thrives in dynamic environments. Eager to apply my technical knowledge in real-world projects while continuously expanding my skills in networking, system troubleshooting, and system integration. Committed to writing clean, efficient code and collaborating effectively in team settings.",
  relationshipStatus: "single",
  motto: "Breaking a limit one step at a time is a path to success.",
  Height: "5'8",
  WhyBSIT: "Because of my passion for technology and the opportunity to apply my knowledge in a dynamic environment.",
  employment: "unemployed",
  hobbies: "Learning new things. Watching Movies. Playing mobile game. Listening music. Sketching. ",
  availability: "still available",
  languages: ["English", "Filipino"],
  favoriteMusic: {
    genres: ["Modern Classics", "OPM", "Pop Ballads", "Acoustic"],
    artists: ["Ed Sheeran", "Lewis Capaldi", "Moira Dela Torre", "Ben&Ben", "The Script", "December Avenue", "Callalily", "6cyclemind", "Cueshé", "Eraserheads", "Kamikazee", "Mayonnaise", "Orange and Lemons", "Parokya ni Edgar", "Siakol", "Sponge Cola", "SB19", "APO Hiking Society"]
  },
  strength: [
    "Strong problem-solving skills",
    "Quick adaptability to new tools and technologies",
    "Detail-oriented and organized",
    "Excellent team collaboration and communication",
    "Ability to work under pressure and meet deadlines",
    "Eagerness to learn and grow professionally"
  ],
  weakness: [
    "Public speaking confidence (currently improving through presentations)",
    "Tendency to overcommit to tasks (learning better time estimation)",
    "Limited experience in large-scale project environments (eager to gain more exposure)",
    "Can be overly self-critical when learning new technologies"
  ],

  contacts: [
    {
      number: "0975 912 6258",
      email: "ferrerjohnmark26@gmail.com",
      address: "Camarin Caloocan, Philippines"
    }
  ],

  links: [
    {
      portfolio: ["https://portfolio-ferrerjohnmark26-gmailcoms-projects.vercel.app/"],
      github: ["https://github.com/FerrerMark"],
      facebook: ["https://www.facebook.com/ferrer.johnmark.5"]
    }
  ],

  experience: [
    {
      company: "Bestlink College of the Philippines",
      role: "System Developer Intern",
      period: "March 2025 – May 2025",
      details: [
        "Completed 250 hours of on-the-job training.",
        "Collaborated in the development of a web-based records and enrollment system.",
        "Used Laravel framework with MySQL integration.",
        "Designed user interfaces with Blade and Tailwind.",
        "Assisted in system documentation, testing, and deployment.",
        "Delivered a final system presentation and user guidance."
      ]
    }
  ],

  education: [
    {
      school: "Bestlink College of the Philippines",
      degree: "Bachelor of Science (B.S.) in Information Technology",
      year: "June 2025"
    },
    {
      school: "Bestlink College of the Philippines",
      degree: "Senior High Diploma in Information and Communication Technology",
      year: "July 2021"
    }
  ],

  certifications: [
    "Responsive Web Design Certification, 300hrs, freeCodeCamp",
    "PHP Course Certificate, SoloLearn",
    "Get Certified as an Excel Pro!, Jobstreet",
    "Certificate of Completion - On-the-Job Training, 250hrs",
    "Information Management in the Digital Age",
    "Cultivating a Multidisciplinary Research Culture with AI: Innovation and Impact",
    "BITZ 2023 Session 02 - Understanding the innovator’s Role in Digital Transformation",
    "Knowledge with the Research Trends from Multidisciplinary Perspective in Engineering, ICT",
    "SQL Course Certificate, SoloLearn",
    "Javascript Course Certificate, SoloLearn",
    "Search Engine Optimization (SEO) with Squarespace - Coursera",
    "Getting Started with Microsoft Excel - Coursera"
  ],

  skills: [
    "API integration",
    "Web development skills (HTML, CSS, PHP, JS, Node.js, React)",
    "Database management (SQL, MongoDB, MYSQL)",
    "Computer literacy",
    "Problem solving",
    "Teamwork and collaboration",
    "Time management",
    "Meeting deadlines",
    "GitHub",
    "Adaptability",
    "Proficient in Excel",
    "Figma"
  ],
  languages: ["English", "Filipino"],
  tools: ["Laravel", "MySQL", "Bootstrap", "Blade", "Excel", "Git"],
  interests: ["Open-source contribution", "Web design", "Tech meetups", "Problem solving games"],
  availability: "Available for full-time roles and internships",
  objective: "To secure a challenging role in web development where I can contribute to meaningful projects and grow my technical and professional skills.",
  preferredPositions: ["Web Developer", "Software Tester", "QA Analyst", "Automation Developer", "technical support", "System Integration Engineer"],
  preferredLocations: ["Caloocan", "Quezon City", "Makati", "Ortigas", "Remote"],
  interviewReadiness: {
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    timeRange: "10:00 AM – 10:00 PM",
    concerns: ["Public speaking nervousness", "Lack of experience in live technical interviews"]
  },
  workPreferences: {
    setup: ["Remote", "Onsite", "Hybrid"],
    teamSize: "Small to medium teams",
    companyType: ["Startup", "Tech company", "Training-focused organization"]
  }
};

if (typeof window !== 'undefined') {
  window.resumeData = resumeData;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { resumeData };
}
