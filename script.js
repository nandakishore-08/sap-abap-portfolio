const nav = document.querySelector('.nav');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const backTop = document.querySelector('.back-top');
const sections = [...document.querySelectorAll('main, section[id]')];
const links = [...document.querySelectorAll('.nav-links a')];

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

links.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const updateNavigation = () => {
  const scrollPosition = window.scrollY + 150;
  let currentId = 'home';
  sections.forEach((section) => {
    if (section.offsetTop <= scrollPosition) currentId = section.id || currentId;
  });
  links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`));
  nav.classList.toggle('scrolled', window.scrollY > 30);
  backTop.classList.toggle('visible', window.scrollY > 700);
};

window.addEventListener('scroll', updateNavigation, { passive: true });
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const form = document.querySelector('.contact-form');
const resumeLink = document.querySelector('.resume-link');
const assistantToggle = document.querySelector('.assistant-toggle');
const assistantPanel = document.querySelector('.assistant-panel');
const assistantClose = document.querySelector('.assistant-close');
const assistantMessages = document.querySelector('.assistant-messages');
const assistantForm = document.querySelector('.assistant-form');
const assistantInput = assistantForm.querySelector('input');

const assistantAnswers = [
  { matches: ['skill', 'technology', 'abap', 'stack'], answer: 'Nanda focuses on SAP ABAP, Data Dictionary, Open SQL, internal tables, reports, ALV, debugging, modularization, and Object-Oriented ABAP. He also works with HTML5, CSS3, JavaScript, Java, Git, GitHub, SAP GUI, and VS Code.' },
  { matches: ['project', 'work', 'rescue', 'retail', 'queue', 'water'], answer: 'Featured projects include Retail Stock Organizer in SAP ABAP, Rescue Hub in ServiceNow, Smart Queue Manager, and a sensor-based automatic water dispenser. Rescue Hub won 1st Place in a 24-hour hackathon.' },
  { matches: ['certif', 'credential', 'csa', 'cad'], answer: 'Nanda holds SAP ABAP Certification, ServiceNow Certified Application Developer (CAD), and ServiceNow Certified System Administrator (CSA).' },
  { matches: ['contact', 'email', 'linkedin', 'github', 'leetcode', 'reach'], answer: 'You can reach Nanda at neelamnandakishore@gmail.com, or connect through LinkedIn, GitHub, and LeetCode in the contact section.' },
  { matches: ['name', 'who'], answer: "Nanda Kishore Neelam is a Computer Science Engineering student and aspiring SAP ABAP Developer focused on enterprise application development." }
];

const answerQuestion = (question) => {
  const normalized = question.toLowerCase();
  const result = assistantAnswers.find((item) => item.matches.some((match) => normalized.includes(match)));
  return result ? result.answer : 'I can help with Nanda\'s skills, projects, certifications, name, or contact details.';
};

const addAssistantMessage = (message, type) => {
  const element = document.createElement('div');
  element.className = `assistant-message ${type}`;
  element.textContent = message;
  assistantMessages.appendChild(element);
  assistantMessages.scrollTop = assistantMessages.scrollHeight;
};

const toggleAssistant = (isOpen) => {
  assistantPanel.hidden = !isOpen;
  assistantToggle.setAttribute('aria-expanded', String(isOpen));
};

assistantToggle.addEventListener('click', () => toggleAssistant(assistantPanel.hidden));
assistantClose.addEventListener('click', () => toggleAssistant(false));
document.querySelectorAll('.assistant-suggestions button').forEach((button) => {
  button.addEventListener('click', () => {
    addAssistantMessage(button.dataset.question, 'user');
    addAssistantMessage(answerQuestion(button.dataset.question), 'bot');
  });
});
assistantForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const question = assistantInput.value.trim();
  if (!question) return;
  addAssistantMessage(question, 'user');
  addAssistantMessage(answerQuestion(question), 'bot');
  assistantInput.value = '';
});

resumeLink.addEventListener('click', () => {
  const status = form.querySelector('.form-status');
  status.textContent = 'Resume download placeholder - add your PDF link when ready.';
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const status = form.querySelector('.form-status');
  const formData = new FormData(form);
  const subject = encodeURIComponent(formData.get('subject'));
  const body = encodeURIComponent(`Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\n${formData.get('message')}`);
  status.textContent = 'Opening your email app...';
  window.location.href = `mailto:neelamnandakishore@gmail.com?subject=${subject}&body=${body}`;
});

updateNavigation();
