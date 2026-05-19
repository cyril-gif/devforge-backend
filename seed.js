import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from './models/Course.js';
import Lesson from './models/Lesson.js';

dotenv.config();

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    await Lesson.deleteMany();
    await Course.deleteMany();
    console.log('✅ Cleared existing data');
    
    // Courses
    const courses = [
      { title: 'HTML', description: 'Learn the structure of the web. Master every HTML tag and semantic markup.', icon: '🌐', xpReward: 1000 },
      { title: 'CSS', description: 'Style websites like a pro. Flexbox, Grid, animations, and responsive design.', icon: '🎨', xpReward: 1000 },
      { title: 'JavaScript', description: 'Master the language of the web. ES6+, DOM, async programming, and more.', icon: '⚡', xpReward: 1200 },
      { title: 'Node.js', description: 'Build backend APIs, authentication, databases, and deploy full-stack apps.', icon: '🚀', xpReward: 1200 },
      { title: 'Vibe Coding', description: 'Real-world projects: portfolio, weather app, todo, full-stack app, and deployment.', icon: '🎵', xpReward: 1500 }
    ];
    
    const savedCourses = [];
    for (const courseData of courses) {
      const course = new Course(courseData);
      await course.save();
      savedCourses.push(course);
      console.log(`📚 Created course: ${course.title}`);
    }
    
    // Helper
    function createLesson(title, content, quiz, xp = 50, videoUrl = '') {
      return { title, content, videoUrl, xpValue: xp, quiz };
    }
    
    // ==================== HTML LESSONS (10 lessons, 8 quizzes each) ====================
    const htmlLessons = [
      // Lesson 1
      createLesson(
        '1. HTML Fundamentals: Your First Web Page',
        `<div class="space-y-6">
          <div class="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-6 rounded-lg">
            <h2 class="text-2xl font-bold text-orange-400">📖 Learning Objectives</h2>
            <ul class="list-disc list-inside mt-2 text-gray-300"><li>Understand what HTML is and how the web works</li><li>Learn the structure of an HTML document</li><li>Write and run your first "Hello World" page</li><li>Understand tags, elements, and attributes</li></ul>
          </div>
          <div><h2 class="text-xl font-bold text-neon-cyan">What is HTML?</h2><p class="text-gray-300">HTML (HyperText Markup Language) is the standard markup language for creating web pages. Every website you visit is built with HTML. It uses tags to structure content.</p><p class="text-gray-300 mt-2">Think of HTML as the <strong class="text-orange-400">skeleton</strong> of a house. CSS adds paint, JavaScript adds electricity.</p></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">Basic HTML Document</h2><div class="bg-black/50 rounded-lg p-4"><pre class="text-green-400"><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;My First Page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Hello, DevForge!&lt;/h1&gt;
    &lt;p&gt;This is my first paragraph.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre></div></div>
          <div class="bg-blue-500/10 p-4 rounded"><p class="text-blue-300">💡 <strong>Pro Tip:</strong> Use consistent indentation (2 spaces) for readability. Browsers ignore extra whitespace, but humans don't!</p></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">🎥 Watch Tutorial</h2><div class="aspect-w-16 aspect-h-9"><iframe class="w-full h-64 rounded-lg" src="https://www.youtube.com/embed/UB1O30fR-EE" frameborder="0" allowfullscreen></iframe></div><p class="text-gray-400 text-sm mt-2">Replace with your own video URL.</p></div>
          <div class="bg-green-500/10 p-6 rounded-lg"><h2 class="text-xl font-bold text-green-400">✅ Practice Task</h2><p class="text-gray-300">Create an HTML file named <code>index.html</code> with a title "My DevForge Journey", an H1 heading, and two paragraphs about why you want to learn coding. Open it in your browser.</p></div>
        </div>`,
        [
          { question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'], correct: 0 },
          { question: 'Which tag is the root element of an HTML page?', options: ['<head>', '<body>', '<html>', '<!DOCTYPE>'], correct: 2 },
          { question: 'Where does the visible content go?', options: ['<head>', '<body>', '<footer>', '<main>'], correct: 1 },
          { question: 'What is the correct tag for the largest heading?', options: ['<heading>', '<h6>', '<h1>', '<head>'], correct: 2 },
          { question: 'Which tag is used to link to another page?', options: ['<link>', '<a>', '<href>', '<url>'], correct: 1 },
          { question: 'What attribute specifies the URL in an <a> tag?', options: ['src', 'link', 'href', 'url'], correct: 2 },
          { question: 'What does <!DOCTYPE html> declare?', options: ['A style sheet', 'HTML5 version', 'A comment', 'A script'], correct: 1 },
          { question: 'Which element contains meta information like the page title?', options: ['<html>', '<body>', '<head>', '<meta>'], correct: 2 }
        ],
        50,
        'https://www.youtube.com/embed/HTML1'
      ),
      // Lesson 2
      createLesson(
        '2. HTML Text: Headings, Paragraphs & Formatting',
        `<div class="space-y-6">
          <div class="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-6 rounded-lg"><h2 class="text-2xl font-bold text-orange-400">📖 Learning Objectives</h2><ul><li>Master headings from H1 to H6</li><li>Create paragraphs and line breaks</li><li>Format text with bold, italic, and more</li></ul></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">Headings</h2><p>HTML has six heading levels: H1 (most important) to H6 (least). Use them to structure your content like an outline.</p><div class="bg-black/50 p-4 rounded"><pre class="text-green-400"><code>&lt;h1&gt;Main Title&lt;/h1&gt;\n&lt;h2&gt;Chapter 1&lt;/h2&gt;\n&lt;h3&gt;Section 1.1&lt;/h3&gt;</code></pre></div></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">Paragraphs & Formatting</h2><p>Use <code>&lt;p&gt;</code> for paragraphs. For inline text styling: <code>&lt;strong&gt;</code> (bold + importance), <code>&lt;em&gt;</code> (italic + emphasis), <code>&lt;br&gt;</code> for line break.</p><div class="bg-black/50 p-4 rounded"><pre class="text-green-400"><code>&lt;p&gt;This is &lt;strong&gt;important&lt;/strong&gt; and &lt;em&gt;emphasized&lt;/em&gt;.&lt;/p&gt;\n&lt;p&gt;Line one&lt;br&gt;Line two&lt;/p&gt;</code></pre></div></div>
          <div class="bg-blue-500/10 p-4 rounded"><p class="text-blue-300">💡 Use <strong>&lt;strong&gt;</strong> for important text (screen readers emphasize it) and <strong>&lt;b&gt;</strong> only for visual boldness.</p></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">🎥 Watch Tutorial</h2><iframe class="w-full h-64 rounded-lg" src="https://www.youtube.com/embed/HTML2" frameborder="0"></iframe></div>
          <div class="bg-green-500/10 p-6 rounded-lg"><h2 class="text-xl font-bold text-green-400">✅ Practice Task</h2><p>Create a web page with: an H1, two H2 sections, three paragraphs, and some bold/italic text inside each.</p></div>
        </div>`,
        [
          { question: 'How many heading levels in HTML?', options: ['3', '4', '5', '6'], correct: 3 },
          { question: 'Which tag makes text bold with semantic importance?', options: ['<b>', '<strong>', '<bold>', '<em>'], correct: 1 },
          { question: 'Which tag creates a paragraph?', options: ['<para>', '<p>', '<text>', '<div>'], correct: 1 },
          { question: 'What is the correct HTML for italic text?', options: ['<i>', '<em>', 'Both A and B', '<italic>'], correct: 2 },
          { question: 'Which heading is the smallest?', options: ['<h1>', '<h3>', '<h6>', '<p>'], correct: 2 },
          { question: 'What does the <br> tag do?', options: ['Bold text', 'Line break', 'Horizontal rule', 'Paragraph'], correct: 1 },
          { question: 'Which tag creates a horizontal rule?', options: ['<hr>', '<br>', '<line>', '<rule>'], correct: 0 },
          { question: 'Which tag is used for emphasized text (typically italic)?', options: ['<i>', '<em>', '<italic>', '<emphasis>'], correct: 1 }
        ],
        50,
        'https://www.youtube.com/embed/HTML2'
      ),
      // Lesson 3
      createLesson(
        '3. Links, Images & Multimedia',
        `<div class="space-y-6"><div class="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-6"><h2>Learning Objectives</h2><ul><li>Create hyperlinks to other pages and websites</li><li>Embed images with proper attributes</li><li>Add video and audio to your pages</li></ul></div>
        <div><h2>Hyperlinks</h2><p>The &lt;a&gt; tag creates links. The <code>href</code> attribute defines the destination.</p><pre><code>&lt;a href="https://google.com" target="_blank"&gt;Google&lt;/a&gt;\n&lt;a href="about.html"&gt;About Us&lt;/a&gt;\n&lt;a href="mailto:me@example.com"&gt;Email Me&lt;/a&gt;</code></pre></div>
        <div><h2>Images</h2><p>Use &lt;img&gt; with <code>src</code> (source) and <code>alt</code> (alternative text).</p><pre><code>&lt;img src="photo.jpg" alt="A beautiful scenery" width="300"&gt;</code></pre></div>
        <div><h2>Multimedia</h2><p>HTML5 supports &lt;video&gt; and &lt;audio&gt; elements.</p><pre><code>&lt;video controls width="400"&gt;&lt;source src="movie.mp4" type="video/mp4"&gt;&lt;/video&gt;</code></pre></div>
        <div class="bg-blue-500/10 p-4">💡 Always include <code>alt</code> text for images (accessibility and SEO).</div>
        <div><h2>🎥 Watch Tutorial</h2><iframe class="w-full h-64 rounded-lg" src="https://www.youtube.com/embed/HTML3" frameborder="0"></iframe></div>
        <div class="bg-green-500/10 p-6"><h2>✅ Practice Task</h2><p>Build a "gallery" page with three images. Each image should link to a larger version or an external site.</p></div></div>`,
        [
          { question: 'Which attribute sets link URL?', options: ['src', 'href', 'link', 'url'], correct: 1 },
          { question: 'What does target="_blank" do?', options: ['Open in same tab', 'Open in new tab', 'Open in parent frame', 'Download link'], correct: 1 },
          { question: 'Which attribute provides image description?', options: ['title', 'alt', 'desc', 'caption'], correct: 1 },
          { question: 'What is the correct HTML for an email link?', options: ['<a href="mailto:me@example.com">', '<a email="me@example.com">', '<mail to="me@example.com">', '<contact>'], correct: 0 },
          { question: 'How do you make an image clickable?', options: ['Wrap with <a>', 'Use <click> tag', 'Add onclick attribute', 'Both A and C'], correct: 0 },
          { question: 'Which attribute specifies image source?', options: ['href', 'src', 'source', 'link'], correct: 1 },
          { question: 'Which video file format is most common for web?', options: ['.avi', '.mp4', '.mov', '.wmv'], correct: 1 },
          { question: 'What attribute in <video> shows native controls?', options: ['controls', 'play', 'autoplay', 'buttons'], correct: 0 }
        ],
        50,
        'https://www.youtube.com/embed/HTML3'
      ),
      // Lesson 4 – Lists
      createLesson(
        '4. HTML Lists: Ordered, Unordered & Definition Lists',
        `<div>... (similar detailed content) ...</div>`,
        [
          { question: 'Which tag creates an unordered list?', options: ['<list>', '<ol>', '<ul>', '<li>'], correct: 2 },
          { question: 'Which tag creates a numbered list?', options: ['<ul>', '<ol>', '<li>', '<dl>'], correct: 1 },
          { question: 'What tag defines a list item?', options: ['<item>', '<li>', '<list-item>', '<it>'], correct: 1 },
          { question: 'Which list type uses definition terms?', options: ['<ul>', '<ol>', '<dl>', '<dt>'], correct: 2 },
          { question: 'Can lists be nested inside lists?', options: ['Yes', 'No', 'Only unordered', 'Only ordered'], correct: 0 },
          { question: 'What does "type" attribute in <ol> do?', options: ['Sets numbering style', 'Sets color', 'Sets size', 'Sets alignment'], correct: 0 },
          { question: 'Which tag is used for description term in <dl>?', options: ['<dt>', '<dd>', '<dl>', '<li>'], correct: 0 },
          { question: 'How to create a square bullet in <ul>?', options: ['list-style-type: square', '<ul type="square">', 'Both A and B', 'None'], correct: 2 }
        ],
        50,
        'https://www.youtube.com/embed/HTML4'
      ),
      // Lesson 5 – Tables
      createLesson(
        '5. HTML Tables: Rows, Columns & Advanced Features',
        `<div>... detailed table tutorial ...</div>`,
        [
          { question: 'Which tag defines a table row?', options: ['<td>', '<tr>', '<th>', '<table>'], correct: 1 },
          { question: 'Which tag defines a table header cell?', options: ['<th>', '<td>', '<thead>', '<header>'], correct: 0 },
          { question: 'What attribute merges two columns?', options: ['rowspan', 'colspan', 'merge', 'span'], correct: 1 },
          { question: 'Which tag defines the table body?', options: ['<tbody>', '<tfoot>', '<thead>', '<body>'], correct: 0 },
          { question: 'How do you add a caption to a table?', options: ['<caption>', '<title>', '<desc>', '<legend>'], correct: 0 },
          { question: 'What does the <colgroup> element do?', options: ['Groups rows', 'Groups columns', 'Styles tables', 'Creates forms'], correct: 1 },
          { question: 'Which attribute adds spacing between cells?', options: ['cellspacing', 'cellpadding', 'border', 'spacing'], correct: 0 },
          { question: 'What is the default display of a table?', options: ['inline-block', 'block', 'table', 'flex'], correct: 2 }
        ],
        50,
        'https://www.youtube.com/embed/HTML5'
      ),
      // Lesson 6 – Forms (basic)
      createLesson(
        '6. HTML Forms: Input Types & Basic Controls',
        `<div>... detailed forms with text, password, radio, checkbox, submit ...</div>`,
        [
          { question: 'Which form attribute defines the HTTP method?', options: ['action', 'method', 'enctype', 'target'], correct: 1 },
          { question: 'What input type creates a text field?', options: ['text', 'password', 'email', 'number'], correct: 0 },
          { question: 'How do you create a radio button group?', options: ['Same name attribute', 'Same id', 'Same class', 'Same value'], correct: 0 },
          { question: 'Which input type is for email validation?', options: ['text', 'email', 'mail', 'string'], correct: 1 },
          { question: 'What does the "required" attribute do?', options: ['Makes field mandatory', 'Makes field hidden', 'Sets default value', 'Disables field'], correct: 0 },
          { question: 'Which tag creates a drop-down list?', options: ['<select>', '<dropdown>', '<list>', '<input type="dropdown">'], correct: 0 },
          { question: 'What is the default type of <input> if omitted?', options: ['text', 'submit', 'button', 'hidden'], correct: 0 },
          { question: 'Which attribute sets maximum length of a text field?', options: ['max', 'maxlength', 'size', 'limit'], correct: 1 }
        ],
        50,
        'https://www.youtube.com/embed/HTML6'
      ),
      // Lesson 7 – Semantic HTML
      createLesson(
        '7. Semantic HTML: Header, Nav, Main, Article, Section, Footer',
        `<div>... semantic tags for accessibility and SEO ...</div>`,
        [
          { question: 'Which tag represents the main content of a page?', options: ['<main>', '<content>', '<body>', '<section>'], correct: 0 },
          { question: 'Which tag is used for navigation links?', options: ['<nav>', '<menu>', '<ul>', '<navbar>'], correct: 0 },
          { question: 'What is the purpose of <article>?', options: ['Self-contained composition', 'Sidebar', 'Footer', 'Header'], correct: 0 },
          { question: 'Which tag defines a section in a document?', options: ['<div>', '<section>', '<group>', '<part>'], correct: 1 },
          { question: 'What does <aside> represent?', options: ['Main content', 'Sidebar or related content', 'Footer', 'Header'], correct: 1 },
          { question: 'Which tag defines the header of a page or section?', options: ['<head>', '<header>', '<hgroup>', '<top>'], correct: 1 },
          { question: 'What is the benefit of semantic HTML?', options: ['SEO', 'Accessibility', 'Code clarity', 'All of the above'], correct: 3 },
          { question: 'Which element defines the footer?', options: ['<bottom>', '<footer>', '<end>', '<foot>'], correct: 1 }
        ],
        50,
        'https://www.youtube.com/embed/HTML7'
      ),
      // Lesson 8 – Forms Advanced
      createLesson(
        '8. Advanced Forms: Input Types (date, range, color, file)',
        `<div>... detailed with new HTML5 input types ...</div>`,
        [
          { question: 'Which input type creates a date picker?', options: ['date', 'calendar', 'datetime-local', 'Both A and C'], correct: 3 },
          { question: 'Which input type is for color selection?', options: ['color', 'picker', 'select-color', 'color-picker'], correct: 0 },
          { question: 'Which attribute restricts file types?', options: ['accept', 'type', 'extensions', 'allow'], correct: 0 },
          { question: 'What does <input type="range"> create?', options: ['Slider', 'Progress bar', 'Number box', 'Scrollbar'], correct: 0 },
          { question: 'Which input type is used for numeric input with step?', options: ['number', 'range', 'digit', 'integer'], correct: 0 },
          { question: 'What does the "multiple" attribute on file input allow?', options: ['Single file', 'Multiple files', 'Only images', 'Any file'], correct: 1 },
          { question: 'How to show a placeholder in input?', options: ['placeholder="text"', 'default="text"', 'hint="text"', 'example="text"'], correct: 0 },
          { question: 'Which attribute makes input read-only?', options: ['disabled', 'readonly', 'readonly="true"', 'Both B and C'], correct: 1 }
        ],
        50,
        'https://www.youtube.com/embed/HTML8'
      ),
      // Lesson 9 – HTML5 APIs (Geolocation, LocalStorage)
      createLesson(
        '9. HTML5 APIs: Geolocation, LocalStorage & Drag-and-Drop',
        `<div>... practical examples of modern browser APIs ...</div>`,
        [
          { question: 'Which method gets user location?', options: ['navigator.geolocation.getCurrentPosition()', 'window.location()', 'document.geo()', 'navigator.getLocation()'], correct: 0 },
          { question: 'How to store data locally in the browser?', options: ['localStorage.setItem()', 'session.set()', 'cache.store()', 'document.store()'], correct: 0 },
          { question: 'What is the difference between localStorage and sessionStorage?', options: ['Persistency vs tab only', 'Size', 'Speed', 'Security'], correct: 0 },
          { question: 'Which event handles drag-and-drop?', options: ['dragstart', 'drag', 'drop', 'All of the above'], correct: 3 },
          { question: 'What method removes an item from localStorage?', options: ['removeItem()', 'deleteItem()', 'clearItem()', 'erase()'], correct: 0 },
          { question: 'Can localStorage store objects directly?', options: ['Yes', 'No, only strings', 'Only numbers', 'Only arrays'], correct: 1 },
          { question: 'How to convert object to string for localStorage?', options: ['JSON.stringify()', 'object.toString()', 'JSON.parse()', 'String(object)'], correct: 0 },
          { question: 'Which attribute makes an element draggable?', options: ['draggable="true"', 'draggable="yes"', 'drag="enabled"', 'movable="true"'], correct: 0 }
        ],
        50,
        'https://www.youtube.com/embed/HTML9'
      ),
      // Lesson 10 – Project: Build a Portfolio Page
      createLesson(
        '10. Final Project: Build a Complete Portfolio Website',
        `<div class="space-y-6">
          <div class="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-6"><h2>📝 Final Project: Personal Portfolio</h2><p>Apply everything you've learned to build a professional portfolio page.</p></div>
          <div><h2>Requirements</h2><ul><li>Semantic HTML structure (header, nav, main, section, footer)</li><li>Navigation menu with links to Home, Projects, Contact</li><li>Projects section with at least 3 project cards (image, title, description, link)</li><li>Contact form with name, email, message, and submit button</li><li>Responsive design (using CSS later, but HTML structure ready)</li><li>Use tables or lists for skills section</li><li>Embed a video (tutorial or demo) using iframe</li></ul></div>
          <div class="bg-blue-500/10 p-4">💡 Upload your finished page to GitHub Pages or Netlify to get a live URL for your resume.</div>
          <div><h2>🎥 Watch Tutorial</h2><iframe class="w-full h-64" src="https://www.youtube.com/embed/HTML10"></iframe></div>
          <div class="bg-green-500/10 p-6"><h2>✅ Submission</h2><p>Create all files in a folder named "portfolio". Zip and share with peers or get feedback. You've mastered HTML!</p></div>
        </div>`,
        [
          { question: 'Which semantic tag is best for the main navigation?', options: ['<nav>', '<div class="nav">', '<ul>', '<menu>'], correct: 0 },
          { question: 'What tag should you use for a group of introductory content?', options: ['<header>', '<head>', '<top>', '<intro>'], correct: 0 },
          { question: 'Which element is used for self-contained content like a blog post?', options: ['<section>', '<article>', '<div>', '<aside>'], correct: 1 },
          { question: 'How to make a form submit to a server?', options: ['Set action attribute', 'Use method="post"', 'Both A and B', 'Add submit event'], correct: 2 },
          { question: 'What does an iframe embed?', options: ['Another HTML page', 'Video only', 'Audio only', 'JavaScript code'], correct: 0 },
          { question: 'Why is semantic HTML good for SEO?', options: ['Search engines understand structure', 'More keywords', 'Faster loading', 'More images'], correct: 0 },
          { question: 'Which tag is best for contact information?', options: ['<address>', '<footer>', '<contact>', '<info>'], correct: 0 },
          { question: 'What is the purpose of the <figure> and <figcaption>?', options: ['Group media with caption', 'Create figures', 'Style images', 'Add charts'], correct: 0 }
        ],
        100,
        'https://www.youtube.com/embed/HTML10'
      )
    ];
    
    // Associate HTML lessons
    const htmlCourse = savedCourses.find(c => c.title === 'HTML');
    for (let i = 0; i < htmlLessons.length; i++) {
      const lessonData = htmlLessons[i];
      const lesson = new Lesson({
        courseId: htmlCourse._id,
        title: lessonData.title,
        content: lessonData.content,
        videoUrl: lessonData.videoUrl,
        quiz: lessonData.quiz,
        xpValue: lessonData.xpValue,
        order: i + 1
      });
      await lesson.save();
      htmlCourse.lessons.push(lesson._id);
      console.log(`  📖 HTML: ${lesson.title}`);
    }
    await htmlCourse.save();
    
    // ==================== CONTINUE WITH CSS IN NEXT MESSAGE ====================
    console.log('\n✅ HTML course seeded with 10 lessons. Next messages will contain CSS, JavaScript, Node.js, and Vibe Coding.\n');

    // ==================== CSS LESSONS (10 lessons, 8 quizzes each) ====================
    const cssLessons = [
      // Lesson 1
      createLesson(
        '1. CSS Fundamentals: Syntax, Selectors & Inclusion Methods',
        `<div class="space-y-6">
          <div class="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-6 rounded-lg"><h2 class="text-2xl font-bold text-blue-400">📖 Learning Objectives</h2><ul><li>Understand what CSS is and why it's used</li><li>Learn CSS syntax (selector, property, value)</li><li>Use three ways to add CSS: inline, internal, external</li><li>Understand basic selectors (element, class, id)</li></ul></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">What is CSS?</h2><p>CSS (Cascading Style Sheets) controls the look and feel of HTML. It handles colors, fonts, layout, and animations. Without CSS, websites would be plain text on a white background.</p></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">CSS Syntax</h2><div class="bg-black/50 p-4 rounded"><pre class="text-green-400"><code>selector {
  property: value;
  another-property: value;
}

h1 {
  color: blue;
  font-size: 32px;
  text-align: center;
}</code></pre></div></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">Three Ways to Add CSS</h2><div class="space-y-2"><div><strong>Inline</strong><pre><code>&lt;h1 style="color: blue;"&gt;Hello&lt;/h1&gt;</code></pre></div><div><strong>Internal</strong><pre><code>&lt;style&gt; h1 { color: blue; } &lt;/style&gt;</code></pre></div><div><strong>External (best)</strong><pre><code>&lt;link rel="stylesheet" href="styles.css"&gt;</code></pre></div></div></div>
          <div class="bg-blue-500/10 p-4"><p class="text-blue-300">💡 <strong>Pro Tip:</strong> Always prefer external CSS for maintainability and caching.</p></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">🎥 Watch Tutorial</h2><iframe class="w-full h-64 rounded-lg" src="https://www.youtube.com/embed/CSS1" frameborder="0"></iframe></div>
          <div class="bg-green-500/10 p-6"><h2>✅ Practice Task</h2><p>Create an external CSS file, link it to your HTML, and change the background color of the page to light gray and all headings to navy blue.</p></div>
        </div>`,
        [
          { question: 'What does CSS stand for?', options: ['Creative Style Sheets', 'Computer Style Sheets', 'Cascading Style Sheets', 'Colorful Style Sheets'], correct: 2 },
          { question: 'Which HTML tag is used to link an external CSS file?', options: ['<style>', '<link>', '<css>', '<stylesheet>'], correct: 1 },
          { question: 'What is the correct CSS syntax?', options: ['body:color=black;', '{body:color=black;}', 'body {color: black;}', '{body;color:black;}'], correct: 2 },
          { question: 'How do you select an element with class "header"?', options: ['.header', '#header', 'header', '*header'], correct: 0 },
          { question: 'How do you select an element with id "menu"?', options: ['.menu', '#menu', 'menu', '*menu'], correct: 1 },
          { question: 'Which property changes text color?', options: ['text-color', 'color', 'font-color', 'foreground'], correct: 1 },
          { question: 'Which property changes background color?', options: ['bgcolor', 'background-color', 'color-background', 'bg'], correct: 1 },
          { question: 'What is the default position of an element in CSS?', options: ['static', 'relative', 'absolute', 'fixed'], correct: 0 }
        ],
        50,
        'https://www.youtube.com/embed/CSS1'
      ),
      // Lesson 2
      createLesson(
        '2. Colors & Typography: Hex, RGB, HSL, Fonts, Text Styling',
        `<div class="space-y-6">
          <div class="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-6"><h2>🎨 Learning Objectives</h2><ul><li>Use different color models (hex, rgb, hsl)</li><li>Apply Google Fonts and system fonts</li><li>Style text with size, weight, alignment, and decoration</li><li>Understand line-height and letter-spacing</li></ul></div>
          <div><h2>Color Models</h2><div class="grid grid-cols-3 gap-2"><div class="bg-black/50 p-2 rounded"><strong>Hex</strong><br><code>#FF5733</code></div><div class="bg-black/50 p-2 rounded"><strong>RGB</strong><br><code>rgb(255,87,51)</code></div><div class="bg-black/50 p-2 rounded"><strong>HSL</strong><br><code>hsl(12,100%,60%)</code></div></div><p class="mt-2">RGBA and HSLA include alpha (transparency).</p></div>
          <div><h2>Typography</h2><pre><code>body {
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
}</code></pre></div>
          <div class="bg-blue-500/10 p-4">💡 Use <strong>rem</strong> units for font-size (1rem = 16px) for better accessibility.</div>
          <div><h2>🎥 Watch Tutorial</h2><iframe class="w-full h-64 rounded-lg" src="https://www.youtube.com/embed/CSS2"></iframe></div>
          <div class="bg-green-500/10 p-6"><h2>✅ Practice</h2><p>Style a paragraph: dark gray color, 18px font, 2em letter-spacing, and italic. Then change its background to a light gradient using linear-gradient.</p></div>
        </div>`,
        [
          { question: 'What is the hex code for white?', options: ['#FFFFFF', '#000000', '#FF0000', '#00FF00'], correct: 0 },
          { question: 'Which property sets the font family?', options: ['font', 'font-family', 'family', 'text-font'], correct: 1 },
          { question: 'What does "rem" stand for?', options: ['Root em', 'Relative em', 'Responsive em', 'Regular em'], correct: 0 },
          { question: 'Which property makes text bold?', options: ['font-style: bold', 'font-weight: bold', 'text-bold: yes', 'font: bold'], correct: 1 },
          { question: 'How to center text horizontally?', options: ['text-align: center', 'align: center', 'text-center', 'margin: auto'], correct: 0 },
          { question: 'What is the default font size of a browser?', options: ['12px', '14px', '16px', '18px'], correct: 2 },
          { question: 'Which color model includes alpha transparency?', options: ['RGB', 'RGBA', 'HSL', 'HEX'], correct: 1 },
          { question: 'How to add a shadow to text?', options: ['text-shadow', 'box-shadow', 'font-shadow', 'shadow-text'], correct: 0 }
        ],
        50,
        'https://www.youtube.com/embed/CSS2'
      ),
      // Lesson 3 – Box Model
      createLesson(
        '3. Box Model: Content, Padding, Border, Margin',
        `<div class="space-y-6"><div class="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-6"><h2>📦 Learning Objectives</h2><ul><li>Understand the CSS box model</li><li>Differentiate between padding and margin</li><li>Use border properties</li><li>Calculate total element width/height</li></ul></div>
        <div><h2>Box Model Diagram</h2><div class="bg-black/50 p-4 text-center"><div class="border-2 border-red-500 p-2">Margin (transparent)<div class="border-2 border-blue-500 p-2">Border<div class="border-2 border-green-500 p-2">Padding<div class="border-2 border-yellow-500 p-4">Content</div></div></div></div></div></div>
        <div><h2>Properties</h2><pre><code>.box {
  width: 300px;
  padding: 20px;    /* space inside border */
  border: 2px solid black;
  margin: 10px;     /* space outside border */
  box-sizing: border-box; /* includes padding & border in width */
}</code></pre></div>
        <div class="bg-blue-500/10 p-4">💡 Use <code>box-sizing: border-box</code> to make layout predictable.</div>
        <div><h2>🎥 Watch Tutorial</h2><iframe class="w-full h-64" src="https://www.youtube.com/embed/CSS3"></iframe></div>
        <div class="bg-green-500/10 p-6"><h2>✅ Practice</h2><p>Create three divs with different padding/margin values. Calculate their total width with and without border-box.</p></div></div>`,
        [
          { question: 'What creates space INSIDE an element?', options: ['margin', 'padding', 'border', 'outline'], correct: 1 },
          { question: 'What creates space OUTSIDE an element?', options: ['margin', 'padding', 'border', 'outline'], correct: 0 },
          { question: 'Which property adds a line around the element?', options: ['border', 'margin', 'padding', 'outline'], correct: 0 },
          { question: 'What does `box-sizing: border-box` do?', options: ['Includes padding+border in width', 'Excludes padding', 'Changes border style', 'Resets box model'], correct: 0 },
          { question: 'If width=200px, padding=10px, border=2px, what is total width with default box-sizing?', options: ['200px', '212px', '224px', '220px'], correct: 2 },
          { question: 'What is the default value of box-sizing?', options: ['border-box', 'content-box', 'padding-box', 'margin-box'], correct: 1 },
          { question: 'Which CSS property sets the thickness of a border?', options: ['border-width', 'border-size', 'border-thickness', 'border-style'], correct: 0 },
          { question: 'Can margin be negative?', options: ['Yes', 'No', 'Only vertical', 'Only horizontal'], correct: 0 }
        ],
        50,
        'https://www.youtube.com/embed/CSS3'
      ),
      // Lesson 4 – Flexbox
      createLesson(
        '4. Flexbox: One-Dimensional Layout Mastery',
        `<div>... detailed Flexbox (container properties and item properties) ...</div>`,
        [
          { question: 'Which property enables Flexbox?', options: ['display: flex', 'display: block', 'display: grid', 'display: inline'], correct: 0 },
          { question: 'What does "justify-content: center" do?', options: ['Centers horizontally', 'Centers vertically', 'Centers both', 'Adds space'], correct: 0 },
          { question: 'Which property aligns items vertically in a row flex container?', options: ['justify-content', 'align-items', 'align-content', 'flex-direction'], correct: 1 },
          { question: 'What is the default flex-direction?', options: ['row', 'column', 'row-reverse', 'column-reverse'], correct: 0 },
          { question: 'How to make flex items wrap to next line?', options: ['flex-wrap: wrap', 'flex-flow: wrap', 'flex: wrap', 'wrap: true'], correct: 0 },
          { question: 'Which property controls order of flex items?', options: ['order', 'z-index', 'flex-order', 'priority'], correct: 0 },
          { question: 'What does "flex: 1" mean?', options: ['Grow equally', 'Shrink to 1px', 'Fixed width 1px', 'No growth'], correct: 0 },
          { question: 'How to center an item both horizontally and vertically with Flexbox?', options: ['justify + align: center', 'margin: auto', 'place-items: center', 'Both A and C'], correct: 3 }
        ],
        50,
        'https://www.youtube.com/embed/CSS4'
      ),
      // Lesson 5 – Grid
      createLesson(
        '5. CSS Grid: Two-Dimensional Layouts',
        `<div>... CSS Grid (grid-template-columns, rows, areas, gap) ...</div>`,
        [
          { question: 'Which property creates a grid container?', options: ['display: grid', 'display: flex', 'display: block', 'display: table'], correct: 0 },
          { question: 'What does "repeat(3, 1fr)" mean?', options: ['3 equal columns', '3 rows', '3 pixels', '3 rem'], correct: 0 },
          { question: 'Which property creates gaps between grid items?', options: ['gap', 'grid-gap', 'margin', 'Both A and B'], correct: 3 },
          { question: 'What does "fr" unit stand for?', options: ['Fractional unit', 'Free ratio', 'Flexible row', 'Full responsive'], correct: 0 },
          { question: 'How to place an item from column line 1 to 3?', options: ['grid-column: 1 / 3', 'column-span: 2', 'col-start: 1; col-end: 3', 'Both A and C'], correct: 3 },
          { question: 'What property defines named grid areas?', options: ['grid-template-areas', 'grid-areas', 'areas', 'template-areas'], correct: 0 },
          { question: 'Which property aligns grid items horizontally?', options: ['justify-items', 'align-items', 'place-items', 'justify-content'], correct: 0 },
          { question: 'Can you combine Flexbox and Grid?', options: ['Yes', 'No', 'Only inside Grid', 'Only inside Flex'], correct: 0 }
        ],
        50,
        'https://www.youtube.com/embed/CSS5'
      ),
      // Lesson 6 – Positioning (static, relative, absolute, fixed, sticky)
      createLesson(
        '6. CSS Positioning & Z-Index',
        `<div>... detailed positioning examples ...</div>`,
        [
          { question: 'Which position value removes element from normal flow?', options: ['absolute', 'fixed', 'relative', 'Both A and B'], correct: 3 },
          { question: 'What does "position: relative" do?', options: ['Offset relative to normal position', 'Relative to viewport', 'Relative to parent', 'Relative to absolute'], correct: 0 },
          { question: 'Which property stacks overlapping elements?', options: ['z-index', 'layer', 'stack', 'order'], correct: 0 },
          { question: 'What is the default position value?', options: ['static', 'relative', 'absolute', 'fixed'], correct: 0 },
          { question: 'Which position makes an element stick to the top on scroll?', options: ['sticky', 'fixed', 'absolute', 'relative'], correct: 0 },
          { question: 'For absolute positioning, what is the containing block?', options: ['Nearest positioned ancestor', 'Viewport', 'Parent element', 'Document body'], correct: 0 },
          { question: 'How to make a modal overlay cover entire screen?', options: ['position: fixed; inset: 0;', 'position: absolute; top:0; left:0;', 'position: sticky;', 'position: relative;'], correct: 0 },
          { question: 'What is the default z-index value?', options: ['auto', '0', '1', 'none'], correct: 0 }
        ],
        50,
        'https://www.youtube.com/embed/CSS6'
      ),
      // Lesson 7 – Responsive Design & Media Queries
      createLesson(
        '7. Responsive Design: Media Queries, Mobile First',
        `<div>... media queries, breakpoints, viewport meta, responsive images ...</div>`,
        [
          { question: 'Which meta tag enables responsive design on mobile?', options: ['viewport', 'scale', 'responsive', 'width=device-width'], correct: 3 },
          { question: 'What does `@media (max-width: 768px)` target?', options: ['Screens ≤768px', 'Screens ≥768px', 'Print', 'Portrait orientation'], correct: 0 },
          { question: 'What is mobile-first approach?', options: ['Start with mobile styles then add breakpoints for larger', 'Start with desktop then shrink', 'Only mobile', 'Separate CSS files'], correct: 0 },
          { question: 'Which CSS unit is relative to viewport width?', options: ['vw', 'vh', 'vmin', 'rem'], correct: 0 },
          { question: 'How to hide an element on mobile?', options: ['display: none', 'visibility: hidden', 'opacity: 0', 'Any of the above'], correct: 3 },
          { question: 'What does `@media (orientation: landscape)` detect?', options: ['Screen wider than tall', 'Screen taller than wide', 'Device rotation', 'Both A and C'], correct: 3 },
          { question: 'Which property makes images fluid?', options: ['max-width: 100%', 'width: 100%', 'height: auto', 'All of the above'], correct: 3 },
          { question: 'What is a common breakpoint for tablets?', options: ['768px', '480px', '1024px', '1200px'], correct: 0 }
        ],
        50,
        'https://www.youtube.com/embed/CSS7'
      ),
      // Lesson 8 – Animations & Transitions
      createLesson(
        '8. CSS Transitions & Keyframe Animations',
        `<div>... transitions, transform, keyframes, animation properties ...</div>`,
        [
          { question: 'Which property creates smooth transitions?', options: ['transition', 'animation', 'transform', 'keyframes'], correct: 0 },
          { question: 'What does `transform: rotate(45deg)` do?', options: ['Rotates element 45 degrees', 'Scales element', 'Moves element', 'Skews element'], correct: 0 },
          { question: 'How to define a keyframe animation?', options: ['@keyframes name', '@animation name', '@keyframe name', '@animate name'], correct: 0 },
          { question: 'Which property repeats animation?', options: ['animation-iteration-count', 'animation-repeat', 'iteration-count', 'repeat-count'], correct: 0 },
          { question: 'What is the default transition timing function?', options: ['ease', 'linear', 'ease-in', 'ease-out'], correct: 0 },
          { question: 'How to make a hover effect that changes background color over 0.5 seconds?', options: ['transition: background-color 0.5s;', 'animation: bg-change 0.5s;', 'transform: bg 0.5s;', 'transition: all 0.5s;'], correct: 0 },
          { question: 'What does `animation-fill-mode: forwards` do?', options: ['Retains final keyframe values', 'Runs animation once', 'Reverse animation', 'Pauses at end'], correct: 0 },
          { question: 'Which property delays the start of an animation?', options: ['animation-delay', 'transition-delay', 'animation-start', 'delay'], correct: 0 }
        ],
        50,
        'https://www.youtube.com/embed/CSS8'
      ),
      // Lesson 9 – CSS Variables (Custom Properties)
      createLesson(
        '9. CSS Variables & Modern Features',
        `<div>... custom properties, var() function, theming, fallbacks ...</div>`,
        [
          { question: 'How do you define a CSS variable?', options: ['--variable-name: value;', '$variable-name: value;', '@variable-name: value;', 'var variable-name: value;'], correct: 0 },
          { question: 'How do you use a CSS variable?', options: ['var(--variable-name)', 'get(--variable-name)', 'value(--variable-name)', '--variable-name'], correct: 0 },
          { question: 'What is the scope of a variable defined on :root?', options: ['Global', 'Element only', 'File only', 'Block only'], correct: 0 },
          { question: 'How to provide a fallback value for variable?', options: ['var(--name, fallback)', 'var(--name fallback)', '--name: fallback', 'var(--name): fallback'], correct: 0 },
          { question: 'Can you change CSS variable values with JavaScript?', options: ['Yes, via setProperty', 'No', 'Only with jQuery', 'Only in inline styles'], correct: 0 },
          { question: 'Which selector is best for global variables?', options: [':root', 'html', 'body', '*'], correct: 0 },
          { question: 'What is the benefit of CSS variables?', options: ['Easy theme switching', 'Reusability', 'Dynamic updates', 'All of the above'], correct: 3 },
          { question: 'Do CSS variables support fallback to another variable?', options: ['Yes, var(--primary, var(--secondary))', 'No', 'Only with extra function', 'Only numeric values'], correct: 0 }
        ],
        50,
        'https://www.youtube.com/embed/CSS9'
      ),
      // Lesson 10 – Final Project: Responsive Portfolio Styling
      createLesson(
        '10. Final Project: Style Your Portfolio with Modern CSS',
        `<div class="space-y-6"><div class="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-6"><h2>🚀 Final Project</h2><p>Take the HTML portfolio you built in the HTML course and make it look professional with CSS.</p></div><div><h2>Requirements</h2><ul><li>Use Flexbox for navigation and project cards</li><li>Use CSS Grid for the overall layout</li><li>Implement a color scheme using CSS variables</li><li>Add hover effects on links and cards</li><li>Make the page fully responsive (mobile, tablet, desktop)</li><li>Include at least one keyframe animation (e.g., fade-in)</li><li>Style the contact form beautifully</li><li>Add a dark/light mode toggle using CSS variables and JavaScript</li></ul></div><div class="bg-blue-500/10 p-4">💡 Use Google Fonts and a gradient background for hero section.</div><div><h2>🎥 Watch Tutorial</h2><iframe class="w-full h-64" src="https://www.youtube.com/embed/CSS10"></iframe></div><div class="bg-green-500/10 p-6"><h2>✅ Submission</h2><p>Submit your fully styled portfolio. Ensure it looks great on all devices. You're now a CSS master!</p></div></div>`,
        [
          { question: 'Which layout system is best for overall page structure?', options: ['CSS Grid', 'Flexbox', 'Float', 'Table'], correct: 0 },
          { question: 'What is the recommended way to make navigation links horizontal?', options: ['Flexbox', 'Grid', 'Inline-block', 'All of the above'], correct: 3 },
          { question: 'How to create a card hover effect?', options: ['transform: scale(1.05); transition: transform 0.3s;', 'animation: zoom;', 'hover: scale;', 'transition: all 0.3s;'], correct: 0 },
          { question: 'Which unit is best for responsive font size?', options: ['vw', 'rem', 'px', 'pt'], correct: 1 },
          { question: 'How to implement dark mode?', options: ['Use CSS variables and toggle class', 'Use media query prefers-color-scheme', 'Both A and B', 'Only with JavaScript'], correct: 2 },
          { question: 'What property creates rounded corners?', options: ['border-radius', 'corner-radius', 'border-round', 'border-curve'], correct: 0 },
          { question: 'Which property adds shadow to a card?', options: ['box-shadow', 'text-shadow', 'card-shadow', 'shadow'], correct: 0 },
          { question: 'What is the purpose of responsive design?', options: ['Works on any screen size', 'Faster loading', 'More animations', 'Uses less code'], correct: 0 }
        ],
        100,
        'https://www.youtube.com/embed/CSS10'
      )
    ];
    
    const cssCourse = savedCourses.find(c => c.title === 'CSS');
    for (let i = 0; i < cssLessons.length; i++) {
      const lessonData = cssLessons[i];
      const lesson = new Lesson({
        courseId: cssCourse._id,
        title: lessonData.title,
        content: lessonData.content,
        videoUrl: lessonData.videoUrl,
        quiz: lessonData.quiz,
        xpValue: lessonData.xpValue,
        order: i + 1
      });
      await lesson.save();
      cssCourse.lessons.push(lesson._id);
      console.log(`  📖 CSS: ${lesson.title}`);
    }
    await cssCourse.save();
    
    console.log('✅ CSS course seeded with 10 lessons.');

  } catch (error) {
    console.error('Error seeding data:', error);


// ==================== JAVASCRIPT LESSONS (10 lessons, 8 quizzes each) ====================
    const jsLessons = [
      // Lesson 1
      createLesson(
        '1. JavaScript Basics: Variables, Data Types & Operators',
        `<div class="space-y-6">
          <div class="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-6 rounded-lg"><h2 class="text-2xl font-bold text-yellow-400">📖 Learning Objectives</h2><ul><li>Understand what JavaScript is and how it runs</li><li>Declare variables using let, const, and var</li><li>Learn primitive data types (string, number, boolean, etc.)</li><li>Use arithmetic, comparison, and logical operators</li></ul></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">What is JavaScript?</h2><p>JavaScript is a programming language that makes websites interactive. It runs in the browser and on the server (Node.js).</p></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">Variables</h2><div class="bg-black/50 p-4 rounded"><pre class="text-green-400"><code>let name = "Alice";      // can be reassigned
const birthYear = 1995;  // cannot be reassigned
var oldWay = "avoid";     // older, function-scoped</code></pre></div></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">Data Types & Operators</h2><div class="bg-black/50 p-4 rounded"><pre class="text-green-400"><code>let price = 19.99;        // Number
let message = 'Hello';     // String
let isLoggedIn = true;     // Boolean
let sum = 5 + 3;           // addition
let isEqual = (5 === 5);   // strict equality</code></pre></div></div>
          <div class="bg-blue-500/10 p-4 rounded"><p class="text-blue-300">💡 <strong>Pro Tip:</strong> Use <code>const</code> by default, <code>let</code> when you need to reassign. Avoid <code>var</code>.</p></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">🎥 Watch Tutorial</h2><iframe class="w-full h-64 rounded-lg" src="https://www.youtube.com/embed/JS1" frameborder="0" allowfullscreen></iframe></div>
          <div class="bg-green-500/10 p-6 rounded-lg"><h2 class="text-xl font-bold text-green-400">✅ Practice Task</h2><p>Declare a <code>const</code> for your name, a <code>let</code> for your age, and a boolean for whether you like coding. Log them to the console.</p></div>
        </div>`,
        [
          { question: 'Which keyword declares a constant variable?', options: ['let', 'const', 'var'], correct: 1 },
          { question: 'What is the correct way to write a variable name in camelCase?', options: ['user-name', 'userName', 'User_Name'], correct: 1 },
          { question: 'Which operator checks for equality of value AND type?', options: ['==', '===', '='], correct: 1 },
          { question: 'What is the data type of `true`?', options: ['Boolean', 'String', 'Number'], correct: 0 },
          { question: 'How do you log something to the console?', options: ['console.log()', 'log.console()', 'print()'], correct: 0 },
          { question: 'What will `typeof null` return?', options: ['null', 'object', 'undefined'], correct: 1 },
          { question: 'What is the result of `"10" + 5`?', options: ['15', '"105"', 'Error'], correct: 1 },
          { question: 'Which symbol represents strict inequality?', options: ['!=', '!==', 'not='], correct: 1 }
        ],
        50,
        'https://www.youtube.com/embed/JS1'
      ),
      // Lesson 2
      createLesson(
        '2. Functions & Scope',
        `<div class="space-y-6">
          <div class="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-6 rounded-lg"><h2 class="text-2xl font-bold text-yellow-400">📖 Learning Objectives</h2><ul><li>Define and call functions</li><li>Understand parameters and return values</li><li>Use function expressions and arrow functions</li><li>Differentiate between global, function, and block scope</li></ul></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">Function Declaration</h2><div class="bg-black/50 p-4 rounded"><pre class="text-green-400"><code>function greet(name) {
  return "Hello, " + name + "!";
}
console.log(greet("Alice")); // Hello, Alice!</code></pre></div></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">Arrow Functions (modern)</h2><div class="bg-black/50 p-4 rounded"><pre class="text-green-400"><code>const add = (a, b) => a + b;
const square = x => x * x;
const logMessage = () => console.log("Hi");</code></pre></div></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">Scope</h2><div class="bg-black/50 p-4 rounded"><pre class="text-green-400"><code>let globalVar = "global";
function test() {
  let localVar = "local";
  if (true) {
    let blockVar = "block";
  }
  // blockVar not accessible here
}</code></pre></div></div>
          <div class="bg-blue-500/10 p-4 rounded"><p class="text-blue-300">💡 Arrow functions inherit <code>this</code> from surrounding scope; regular functions have their own <code>this</code>.</p></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">🎥 Watch Tutorial</h2><iframe class="w-full h-64 rounded-lg" src="https://www.youtube.com/embed/JS2" frameborder="0" allowfullscreen></iframe></div>
          <div class="bg-green-500/10 p-6 rounded-lg"><h2 class="text-xl font-bold text-green-400">✅ Practice Task</h2><p>Write an arrow function that takes a number and returns whether it's even or odd.</p></div>
        </div>`,
        [
          { question: 'Which keyword is used to return a value from a function?', options: ['return', 'exit', 'break'], correct: 0 },
          { question: 'What is the output of `(() => 5)()`?', options: ['5', 'undefined', 'function'], correct: 0 },
          { question: 'What is a closure?', options: ['Function with access to outer scope', 'Built-in object', 'Block of code'], correct: 0 },
          { question: 'Which of these creates a function?', options: ['function myFn() {}', 'const myFn = () => {}', 'Both'], correct: 2 },
          { question: 'What is the difference between `function` and `=>` regarding `this`?', options: ['Arrow functions don\'t bind own this', 'No difference', 'Arrow functions bind this globally'], correct: 0 },
          { question: 'Can a function be stored in a variable?', options: ['Yes', 'No', 'Only arrow functions'], correct: 0 },
          { question: 'What does a function without a return statement return?', options: ['undefined', 'null', '0'], correct: 0 },
          { question: 'What is the scope of a variable declared with `let` inside a block?', options: ['Block scope', 'Function scope', 'Global scope'], correct: 0 }
        ],
        50,
        'https://www.youtube.com/embed/JS2'
      ),
      // Lesson 3
      createLesson(
        '3. Arrays & Objects',
        `<div class="space-y-6">
          <div class="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-6 rounded-lg"><h2 class="text-2xl font-bold text-yellow-400">📖 Learning Objectives</h2><ul><li>Create and manipulate arrays</li><li>Use array methods (push, pop, map, filter)</li><li>Create and access object properties</li><li>Understand JSON and object iteration</li></ul></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">Arrays</h2><div class="bg-black/50 p-4 rounded"><pre class="text-green-400"><code>let colors = ["red", "green", "blue"];
colors.push("yellow");     // add to end
let last = colors.pop();   // remove from end
console.log(colors[0]);    // "red"</code></pre></div></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">Array Methods</h2><div class="bg-black/50 p-4 rounded"><pre class="text-green-400"><code>let doubled = numbers.map(n => n * 2);
let evens = numbers.filter(n => n % 2 === 0);
let sum = numbers.reduce((acc, n) => acc + n, 0);</code></pre></div></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">Objects</h2><div class="bg-black/50 p-4 rounded"><pre class="text-green-400"><code>let person = { name: "Alice", age: 25 };
console.log(person.name);   // "Alice"
person.city = "New York";    // add property</code></pre></div></div>
          <div class="bg-blue-500/10 p-4 rounded"><p class="text-blue-300">💡 Use <code>const</code> for arrays and objects – you can still modify their contents, just not reassign.</p></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">🎥 Watch Tutorial</h2><iframe class="w-full h-64 rounded-lg" src="https://www.youtube.com/embed/JS3" frameborder="0" allowfullscreen></iframe></div>
          <div class="bg-green-500/10 p-6 rounded-lg"><h2 class="text-xl font-bold text-green-400">✅ Practice Task</h2><p>Create an array of 5 favorite movies. Use <code>map</code> to create a new array with the movie titles in uppercase. Create an object representing a book (title, author, year).</p></div>
        </div>`,
        [
          { question: 'How do you create an array?', options: ['let arr = []', 'let arr = {}', 'let arr = ()'], correct: 0 },
          { question: 'Which method adds an element to the end of an array?', options: ['push()', 'pop()', 'unshift()'], correct: 0 },
          { question: 'How to access the first element of array `arr`?', options: ['arr[0]', 'arr.first', 'arr[1]'], correct: 0 },
          { question: 'Which method creates a new array by applying a function to each element?', options: ['map()', 'filter()', 'reduce()'], correct: 0 },
          { question: 'How to define an object property?', options: ['{ key: value }', '[key: value]', 'key => value'], correct: 0 },
          { question: 'What does `JSON.stringify` do?', options: ['Converts object to JSON string', 'Parses JSON string', 'Clones object'], correct: 0 },
          { question: 'How to loop through an array?', options: ['for...of', 'forEach()', 'Both'], correct: 2 },
          { question: 'What is the difference between `null` and `undefined`?', options: ['undefined means not assigned; null is intentional absence', 'Same', 'null is for numbers only'], correct: 0 }
        ],
        50,
        'https://www.youtube.com/embed/JS3'
      ),
      // Lesson 4
      createLesson(
        '4. DOM Manipulation',
        `<div class="space-y-6">
          <div class="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-6 rounded-lg"><h2 class="text-2xl font-bold text-yellow-400">📖 Learning Objectives</h2><ul><li>Select elements using querySelector and getElementById</li><li>Modify content, attributes, and styles</li><li>Create and remove elements dynamically</li><li>Understand the DOM tree</li></ul></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">Selecting Elements</h2><div class="bg-black/50 p-4 rounded"><pre class="text-green-400"><code>// By ID
const header = document.getElementById('main-header');
// By CSS selector
const button = document.querySelector('.btn');
const allParagraphs = document.querySelectorAll('p');</code></pre></div></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">Modifying Elements</h2><div class="bg-black/50 p-4 rounded"><pre class="text-green-400"><code>// Change text
heading.textContent = "New Title";
// Change HTML
container.innerHTML = "<strong>Important</strong>";
// Change style
box.style.backgroundColor = "blue";</code></pre></div></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">Creating & Removing Elements</h2><div class="bg-black/50 p-4 rounded"><pre class="text-green-400"><code>const newDiv = document.createElement('div');
newDiv.textContent = "Hello";
document.body.appendChild(newDiv);
// Remove element
oldElement.remove();</code></pre></div></div>
          <div class="bg-blue-500/10 p-4 rounded"><p class="text-blue-300">💡 Use <code>textContent</code> for plain text to avoid XSS attacks; use <code>innerHTML</code> only when you need to insert HTML markup.</p></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">🎥 Watch Tutorial</h2><iframe class="w-full h-64 rounded-lg" src="https://www.youtube.com/embed/JS4" frameborder="0" allowfullscreen></iframe></div>
          <div class="bg-green-500/10 p-6 rounded-lg"><h2 class="text-xl font-bold text-green-400">✅ Practice Task</h2><p>Create a button that, when clicked, adds a new paragraph to the page with the current time. Also create a "Remove Last" button that removes the last added paragraph.</p></div>
        </div>`,
        [
          { question: 'Which method selects an element by ID?', options: ['getElementById()', 'querySelector("#id")', 'Both'], correct: 2 },
          { question: 'How to change the text of an element?', options: ['element.textContent = "new"', 'element.innerHTML = "new"', 'Both'], correct: 2 },
          { question: 'Which property adds a CSS class to an element?', options: ['classList.add()', 'className.add()', 'addClass()'], correct: 0 },
          { question: 'How to create a new div element?', options: ['document.createElement("div")', 'new Element("div")', 'document.new("div")'], correct: 0 },
          { question: 'What does `innerHTML` do?', options: ['Sets HTML content', 'Sets text only', 'Deletes content'], correct: 0 },
          { question: 'How to remove an element from the DOM?', options: ['element.remove()', 'element.parentNode.removeChild(element)', 'Both'], correct: 2 },
          { question: 'What is the difference between `textContent` and `innerText`?', options: ['textContent returns all text, innerText respects styling', 'No difference', 'innerText is faster'], correct: 0 },
          { question: 'Which method selects multiple elements and returns a NodeList?', options: ['querySelectorAll()', 'getElementsByClassName()', 'Both'], correct: 2 }
        ],
        50,
        'https://www.youtube.com/embed/JS4'
      ),
      // Lesson 5
      createLesson(
        '5. Events & Event Handling',
        `<div class="space-y-6">
          <div class="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-6 rounded-lg"><h2 class="text-2xl font-bold text-yellow-400">📖 Learning Objectives</h2><ul><li>Add event listeners to elements</li><li>Understand the event object</li><li>Handle common events (click, submit, keydown)</li><li>Understand event bubbling and delegation</li></ul></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">Adding Event Listeners</h2><div class="bg-black/50 p-4 rounded"><pre class="text-green-400"><code>button.addEventListener('click', () => {
  alert('Button clicked!');
});</code></pre></div></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">The Event Object</h2><div class="bg-black/50 p-4 rounded"><pre class="text-green-400"><code>button.addEventListener('click', (event) => {
  console.log(event.target);  // the clicked element
  console.log(event.type);    // "click"
  event.preventDefault();     // stop default action (e.g., form submit)
});</code></pre></div></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">Event Bubbling & Delegation</h2><div class="bg-black/50 p-4 rounded"><pre class="text-green-400"><code>// Stop bubbling
event.stopPropagation();

// Event delegation: listen on parent
document.querySelector('.list').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    console.log('List item clicked:', e.target.textContent);
  }
});</code></pre></div></div>
          <div class="bg-blue-500/10 p-4 rounded"><p class="text-blue-300">💡 Use event delegation when you have dynamically added elements – it's more efficient and works for future children.</p></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">🎥 Watch Tutorial</h2><iframe class="w-full h-64 rounded-lg" src="https://www.youtube.com/embed/JS5" frameborder="0" allowfullscreen></iframe></div>
          <div class="bg-green-500/10 p-6 rounded-lg"><h2 class="text-xl font-bold text-green-400">✅ Practice Task</h2><p>Create a to-do list: an input field and an "Add" button. When the button is clicked, add a new list item. Clicking any list item should remove it. Use event delegation.</p></div>
        </div>`,
        [
          { question: 'How do you add an event listener to an element?', options: ['addEventListener()', 'onclick = handler', 'Both'], correct: 2 },
          { question: 'What does `event.preventDefault()` do?', options: ['Prevents default browser action', 'Stops event propagation', 'Removes the element'], correct: 0 },
          { question: 'What is event bubbling?', options: ['Event propagates up the DOM tree', 'Event propagates down', 'Event stops at target'], correct: 0 },
          { question: 'How to stop event bubbling?', options: ['event.stopPropagation()', 'event.preventDefault()', 'event.stopImmediatePropagation()'], correct: 0 },
          { question: 'Which event occurs when a form is submitted?', options: ['submit', 'click', 'change'], correct: 0 },
          { question: 'What is `this` inside an event handler?', options: ['The element that received the event', 'The window object', 'The event object'], correct: 0 },
          { question: 'How to remove an event listener?', options: ['removeEventListener()', 'deleteEventListener()', 'removeEvent()'], correct: 0 },
          { question: 'Which keyboard event fires when a key is pressed down?', options: ['keydown', 'keypress', 'keyup'], correct: 0 }
        ],
        50,
        'https://www.youtube.com/embed/JS5'
      ),
      // Lesson 6
      createLesson(
        '6. Loops & Iteration',
        `<div class="space-y-6">
          <div class="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-6 rounded-lg"><h2 class="text-2xl font-bold text-yellow-400">📖 Learning Objectives</h2><ul><li>Use for, while, and do...while loops</li><li>Iterate over arrays with forEach, for...of</li><li>Use break and continue</li><li>Understand array iteration methods (map, filter, reduce)</li></ul></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">Classic For Loop</h2><div class="bg-black/50 p-4 rounded"><pre class="text-green-400"><code>for (let i = 0; i < 5; i++) {
  console.log(i);
}</code></pre></div></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">While & Do...While</h2><div class="bg-black/50 p-4 rounded"><pre class="text-green-400"><code>let count = 0;
while (count < 3) {
  console.log(count);
  count++;
}

// do...while runs at least once
let x = 10;
do {
  console.log(x);
} while (x < 5);</code></pre></div></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">Array Iteration Methods</h2><div class="bg-black/50 p-4 rounded"><pre class="text-green-400"><code>colors.forEach(color => console.log(color));
for (let color of colors) { console.log(color); }</code></pre></div></div>
          <div class="bg-blue-500/10 p-4 rounded"><p class="text-blue-300">💡 Prefer <code>for...of</code> for arrays and <code>forEach</code> for simple iteration; use <code>map/filter/reduce</code> for transformations.</p></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">🎥 Watch Tutorial</h2><iframe class="w-full h-64 rounded-lg" src="https://www.youtube.com/embed/JS6" frameborder="0" allowfullscreen></iframe></div>
          <div class="bg-green-500/10 p-6 rounded-lg"><h2 class="text-xl font-bold text-green-400">✅ Practice Task</h2><p>Given an array of numbers, use <code>map</code> to double each number, <code>filter</code> to keep only numbers greater than 10, and <code>reduce</code> to sum the filtered array.</p></div>
        </div>`,
        [
          { question: 'Which loop runs a block of code a specific number of times?', options: ['for loop', 'while loop', 'do...while'], correct: 0 },
          { question: 'What does `array.forEach(item => {})` do?', options: ['Iterates over array elements', 'Filters array', 'Maps array'], correct: 0 },
          { question: 'How to break out of a loop?', options: ['break', 'exit', 'stop'], correct: 0 },
          { question: 'What is the difference between `for...in` and `for...of`?', options: ['in iterates over keys, of iterates over values', 'Same', 'in for objects, of for arrays'], correct: 0 },
          { question: 'Which loop ensures the code runs at least once?', options: ['do...while', 'while', 'for'], correct: 0 },
          { question: 'What will `while(false)` do?', options: ['Never runs', 'Runs once', 'Infinite loop'], correct: 0 },
          { question: 'Which method creates a new array with transformed values?', options: ['map()', 'filter()', 'reduce()'], correct: 0 },
          { question: 'Which method filters elements based on a condition?', options: ['filter()', 'map()', 'find()'], correct: 0 }
        ],
        50,
        'https://www.youtube.com/embed/JS6'
      ),
      // Lesson 7
      createLesson(
        '7. Asynchronous JavaScript (Promises, Async/Await)',
        `<div class="space-y-6">
          <div class="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-6 rounded-lg"><h2 class="text-2xl font-bold text-yellow-400">📖 Learning Objectives</h2><ul><li>Understand synchronous vs asynchronous code</li><li>Use callbacks and setTimeout</li><li>Work with Promises</li><li>Use async/await syntax</li></ul></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">setTimeout & Callbacks</h2><div class="bg-black/50 p-4 rounded"><pre class="text-green-400"><code>setTimeout(() => {
  console.log("Delayed 1 second");
}, 1000);</code></pre></div></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">Promises</h2><div class="bg-black/50 p-4 rounded"><pre class="text-green-400"><code>const fetchData = new Promise((resolve, reject) => {
  // async operation
  if (success) resolve(data);
  else reject(error);
});
fetchData.then(data => console.log).catch(err => console.error);</code></pre></div></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">Async/Await (modern)</h2><div class="bg-black/50 p-4 rounded"><pre class="text-green-400"><code>async function getData() {
  try {
    const response = await fetch('https://api.example.com');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}</code></pre></div></div>
          <div class="bg-blue-500/10 p-4 rounded"><p class="text-blue-300">💡 Always handle promise rejections with <code>.catch()</code> or <code>try/catch</code> when using async/await.</p></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">🎥 Watch Tutorial</h2><iframe class="w-full h-64 rounded-lg" src="https://www.youtube.com/embed/JS7" frameborder="0" allowfullscreen></iframe></div>
          <div class="bg-green-500/10 p-6 rounded-lg"><h2 class="text-xl font-bold text-green-400">✅ Practice Task</h2><p>Use <code>fetch</code> to get data from a public API (e.g., JSONPlaceholder). Display the first post's title on the page. Handle errors gracefully.</p></div>
        </div>`,
        [
          { question: 'What does `setTimeout` do?', options: ['Delays function execution', 'Repeats function', 'Clears timeout'], correct: 0 },
          { question: 'What is a Promise?', options: ['Object representing eventual completion', 'Function', 'Array'], correct: 0 },
          { question: 'How to wait for a promise?', options: ['await', 'then()', 'Both'], correct: 2 },
          { question: 'What does the `fetch` function return?', options: ['Promise', 'String', 'Object'], correct: 0 },
          { question: 'How to handle errors in async/await?', options: ['try/catch', '.catch()', 'Both'], correct: 2 },
          { question: 'What is the state of a resolved promise?', options: ['fulfilled', 'rejected', 'pending'], correct: 0 },
          { question: 'Which method runs multiple promises in parallel?', options: ['Promise.all()', 'Promise.race()', 'Promise.any()'], correct: 0 },
          { question: 'What does the `async` keyword do to a function?', options: ['Makes it return a Promise', 'Makes it synchronous', 'Adds callback'], correct: 0 }
        ],
        50,
        'https://www.youtube.com/embed/JS7'
      ),
      // Lesson 8
      createLesson(
        '8. Modern JavaScript (ES6+)',
        `<div class="space-y-6">
          <div class="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-6 rounded-lg"><h2 class="text-2xl font-bold text-yellow-400">📖 Learning Objectives</h2><ul><li>Use destructuring for arrays and objects</li><li>Use spread and rest operators</li><li>Understand template literals</li><li>Use modules (import/export)</li></ul></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">Destructuring</h2><div class="bg-black/50 p-4 rounded"><pre class="text-green-400"><code>// Array destructuring
const [first, second] = ["apple", "banana"];
// Object destructuring
const { name, age } = person;</code></pre></div></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">Spread & Rest</h2><div class="bg-black/50 p-4 rounded"><pre class="text-green-400"><code>// Spread (expand)
const combined = [...arr1, ...arr2];
const newObj = { ...obj1, ...obj2 };
// Rest (collect)
function sum(...numbers) {
  return numbers.reduce((a,b) => a+b, 0);
}</code></pre></div></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">Template Literals</h2><div class="bg-black/50 p-4 rounded"><pre class="text-green-400"><code>const name = "Alice";
console.log(`Hello, ${name}!`);</code></pre></div></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">Modules</h2><div class="bg-black/50 p-4 rounded"><pre class="text-green-400"><code>// math.js
export const add = (a,b) => a+b;
export default multiply;
// app.js
import multiply, { add } from './math.js';</code></pre></div></div>
          <div class="bg-blue-500/10 p-4 rounded"><p class="text-blue-300">💡 Use default export for the main value of a module, named exports for utilities.</p></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">🎥 Watch Tutorial</h2><iframe class="w-full h-64 rounded-lg" src="https://www.youtube.com/embed/JS8" frameborder="0" allowfullscreen></iframe></div>
          <div class="bg-green-500/10 p-6 rounded-lg"><h2 class="text-xl font-bold text-green-400">✅ Practice Task</h2><p>Write a function that takes an object with properties `x` and `y` and returns their sum using destructuring. Use the spread operator to merge two objects.</p></div>
        </div>`,
        [
          { question: 'What does `const { name } = person` do?', options: ['Destructures name from person object', 'Creates a new object', 'Copies array'], correct: 0 },
          { question: 'What does the spread operator `...` do?', options: ['Expands an iterable into elements', 'Collects arguments into an array', 'Both'], correct: 2 },
          { question: 'How to export a function as default?', options: ['export default function fn()', 'module.exports = fn', 'Both'], correct: 0 },
          { question: 'What does `...rest` in function parameters do?', options: ['Collects remaining arguments into array', 'Spreads array', 'Destructures'], correct: 0 },
          { question: 'What is the result of `[...arr1, ...arr2]`?', options: ['Concatenated array', 'Nested array', 'Object'], correct: 0 },
          { question: 'Which is a valid destructuring assignment?', options: ['const {a,b} = obj', 'const [x,y] = arr', 'Both'], correct: 2 },
          { question: 'What does `import * as utils from "./utils.js"` do?', options: ['Imports all named exports as an object', 'Imports default only', 'Imports specific functions'], correct: 0 },
          { question: 'What is the purpose of a default export?', options: ['Export a single value from a module', 'Export multiple values', 'Export with alias'], correct: 0 }
        ],
        50,
        'https://www.youtube.com/embed/JS8'
      ),
      // Lesson 9
      createLesson(
        '9. Working with APIs & Browser Storage',
        `<div class="space-y-6">
          <div class="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-6 rounded-lg"><h2 class="text-2xl font-bold text-yellow-400">📖 Learning Objectives</h2><ul><li>Use fetch to make API requests</li><li>Parse JSON responses</li><li>Store data in localStorage and sessionStorage</li><li>Understand cookies vs storage</li></ul></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">Fetch API</h2><div class="bg-black/50 p-4 rounded"><pre class="text-green-400"><code>fetch('https://api.example.com/users')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));</code></pre></div></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">localStorage</h2><div class="bg-black/50 p-4 rounded"><pre class="text-green-400"><code>// Save data
localStorage.setItem('theme', 'dark');
// Retrieve data
const theme = localStorage.getItem('theme');
// Remove data
localStorage.removeItem('theme');
// Clear all
localStorage.clear();</code></pre></div></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">sessionStorage</h2><div class="bg-black/50 p-4 rounded"><pre class="text-green-400"><code>// Same methods, but data is cleared when the tab is closed
sessionStorage.setItem('tempData', 'value');</code></pre></div></div>
          <div class="bg-blue-500/10 p-4 rounded"><p class="text-blue-300">💡 localStorage persists across browser sessions; sessionStorage only for the current tab.</p></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">🎥 Watch Tutorial</h2><iframe class="w-full h-64 rounded-lg" src="https://www.youtube.com/embed/JS9" frameborder="0" allowfullscreen></iframe></div>
          <div class="bg-green-500/10 p-6 rounded-lg"><h2 class="text-xl font-bold text-green-400">✅ Practice Task</h2><p>Build a simple "Note Taker": a textarea and a save button. When saved, store the note in localStorage. On page reload, load the saved note into the textarea.</p></div>
        </div>`,
        [
          { question: 'How do you store data in localStorage?', options: ['localStorage.setItem(key, value)', 'localStorage.store(key, value)', 'localStorage.put(key, value)'], correct: 0 },
          { question: 'What method retrieves data from localStorage?', options: ['getItem()', 'retrieveItem()', 'get()'], correct: 0 },
          { question: 'How to parse a JSON string?', options: ['JSON.parse()', 'JSON.stringify()', 'parseJSON()'], correct: 0 },
          { question: 'What does the `fetch` function return?', options: ['Promise', 'Response object', 'Both'], correct: 2 },
          { question: 'How to convert an object to a JSON string?', options: ['JSON.stringify()', 'JSON.parse()', 'toString()'], correct: 0 },
          { question: 'What is the difference between localStorage and sessionStorage?', options: ['sessionStorage clears on tab close', 'localStorage clears on tab close', 'No difference'], correct: 0 },
          { question: 'Which HTTP method is typically used to retrieve data?', options: ['GET', 'POST', 'PUT'], correct: 0 },
          { question: 'What is an API endpoint?', options: ['URL where the API is accessed', 'A function', 'A database'], correct: 0 }
        ],
        50,
        'https://www.youtube.com/embed/JS9'
      ),
      // Lesson 10
      createLesson(
        '10. Final Project: Build a Quiz Application',
        `<div class="space-y-6">
          <div class="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-6 rounded-lg"><h2 class="text-2xl font-bold text-yellow-400">🚀 Final Project</h2><p>Apply everything you've learned to build an interactive quiz app.</p></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">Requirements</h2><ul><li>Display questions one at a time with multiple‑choice options</li><li>Keep track of the user's score</li><li>Show the final result when the quiz ends</li><li>Include a timer for each question (bonus)</li><li>Store high scores in localStorage</li><li>Allow the user to restart the quiz</li><li>Fetch questions from a JSON file using fetch</li><li>Make the UI fully responsive with CSS</li></ul></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">Project Structure</h2><div class="bg-black/50 p-4 rounded"><pre class="text-green-400"><code>index.html
style.css
script.js
questions.json</code></pre></div></div>
          <div class="bg-blue-500/10 p-4 rounded"><p class="text-blue-300">💡 Use an array of question objects: <code>{ question, options, correctAnswer }</code>.</p></div>
          <div><h2 class="text-xl font-bold text-neon-cyan">🎥 Watch Tutorial</h2><iframe class="w-full h-64 rounded-lg" src="https://www.youtube.com/embed/JS10" frameborder="0" allowfullscreen></iframe></div>
          <div class="bg-green-500/10 p-6 rounded-lg"><h2 class="text-xl font-bold text-green-400">✅ Submission</h2><p>Upload your quiz app to GitHub Pages or CodePen. Share the link. Congratulations, you've mastered JavaScript!</p></div>
        </div>`,
        [
          { question: 'How would you store quiz questions?', options: ['Array of objects', 'Separate variables', 'LocalStorage only'], correct: 0 },
          { question: 'How to update the score display on the page?', options: ['textContent', 'innerHTML', 'Both'], correct: 2 },
          { question: 'How to prevent the user from answering after time runs out?', options: ['Disable buttons', 'Remove event listeners', 'Both'], correct: 2 },
          { question: 'Which browser storage is best for temporarily storing high scores?', options: ['localStorage', 'sessionStorage', 'Cookies'], correct: 0 },
          { question: 'How to fetch questions from a JSON file?', options: ['fetch("questions.json").then(res => res.json())', 'import from file', 'require()'], correct: 0 },
          { question: 'What HTML element is best for displaying the score?', options: ['<span>', '<div>', 'Either'], correct: 2 },
          { question: 'How to reset the quiz without reloading the page?', options: ['Reinitialize variables and DOM', 'Use location.reload()', 'Both'], correct: 2 },
          { question: 'What is the purpose of event delegation in the quiz?', options: ['Handling clicks on dynamically created answer buttons', 'To style elements', 'To store data'], correct: 0 }
        ],
        100,
        'https://www.youtube.com/embed/JS10'
      )
    ];

    const jsCourse = savedCourses.find(c => c.title === 'JavaScript');
    for (let i = 0; i < jsLessons.length; i++) {
      const lessonData = jsLessons[i];
      const lesson = new Lesson({
        courseId: jsCourse._id,
        title: lessonData.title,
        content: lessonData.content,
        videoUrl: lessonData.videoUrl,
        quiz: lessonData.quiz,
        xpValue: lessonData.xpValue,
        order: i + 1
      });
      await lesson.save();
      jsCourse.lessons.push(lesson._id);
      console.log(`  📖 JavaScript: ${lessonData.title}`);
    }
    await jsCourse.save();
    
    console.log('✅ JavaScript course seeded with 10 lessons.');    
    
  }
}


seedData();