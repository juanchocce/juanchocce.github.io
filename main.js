import { initTheme, setTheme } from './js/theme.js';
import { initLang } from './js/lang.js';
import { initProjects } from './js/projects.js';
import { initForm } from './js/form.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Modules
    initTheme();
    initLang();
    initProjects();
    initForm();

    console.log('Portfolio initialized');
});

// Immediate Theme Check (to prevent FOUC if script is module but loaded defer)
// Ideally this part is in head, but we handle the JS initialization here.
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
}
