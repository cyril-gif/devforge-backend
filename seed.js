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
      { title: 'Vibe Coding', description: 'Real-world projects: portfolio, weather app, todo, full-stack app, and deployment.', icon: '🎵', xpReward: 1500 },
      { title: 'Express.js', description: 'Learn how to build robust backend APIs with Express.js, including routing, middleware, and database integration.', icon: '🛠️', xpReward: 1200 },
      { title: 'Python', description: 'Learn Python programming from basics to advanced concepts, including data structures, OOP, and web scraping.', icon: '🐍', xpReward: 1200 }
    ];

    
    const savedCourses = [];
    for (const courseData of courses) {
      const course = new Course(courseData);
      await course.save();
      savedCourses.push(course);
      console.log(`📚 Created course: ${course.title}`);
    }


// ─────────────────────────────────────────────
//  HELPER
// ─────────────────────────────────────────────
function lesson(title, content, quiz, xp = 50, videoUrl = '') {
  return { title, content, videoUrl, xpValue: xp, quiz };
}

// ─────────────────────────────────────────────
//  HTML LESSONS
// ─────────────────────────────────────────────
const htmlLessons = [
  // ── Lesson 1 ──
  lesson(
    '1. HTML Fundamentals: How the Web Works & Your First Page',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-orange-400 mb-2">📖 What You Will Learn</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li>How browsers and servers communicate (HTTP basics)</li>
          <li>What HTML really is and why it matters</li>
          <li>The anatomy of every HTML document</li>
          <li>Tags, elements, and attributes explained clearly</li>
          <li>How to create and open your first web page</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🌐 How the Web Works</h2>
        <p class="text-gray-300 mb-3">When you type a URL into your browser, this is what happens: your browser sends an <strong class="text-orange-400">HTTP request</strong> to a server. The server responds with an <strong class="text-orange-400">HTML file</strong>. Your browser reads that file and paints the page you see.</p>
        <p class="text-gray-300 mb-3">Three languages power every website:</p>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li><strong class="text-orange-400">HTML</strong> – the structure (skeleton)</li>
          <li><strong class="text-purple-400">CSS</strong> – the style (skin and clothes)</li>
          <li><strong class="text-yellow-400">JavaScript</strong> – the behaviour (muscles)</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">📄 Anatomy of an HTML Document</h2>
        <p class="text-gray-300 mb-3">Every valid HTML page has the same skeleton. Let's break each part down:</p>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>&lt;!DOCTYPE html&gt;         &lt;!-- Tells the browser this is HTML5 --&gt;
&lt;html lang="en"&gt;        &lt;!-- Root element. lang="en" helps screen readers --&gt;
  &lt;head&gt;               &lt;!-- Invisible metadata about your page --&gt;
    &lt;meta charset="UTF-8"&gt;            &lt;!-- Character encoding --&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;My First Page&lt;/title&gt;      &lt;!-- Shows in browser tab --&gt;
  &lt;/head&gt;
  &lt;body&gt;               &lt;!-- Everything visible lives here --&gt;
    &lt;h1&gt;Hello, World!&lt;/h1&gt;
    &lt;p&gt;This is my first paragraph.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
        </div>
        <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-blue-500/10 p-4 rounded-lg">
            <p class="text-blue-300 font-semibold">🔵 &lt;head&gt;</p>
            <p class="text-gray-400 text-sm">Contains page metadata: title, character set, links to CSS files, SEO tags. Nothing inside &lt;head&gt; appears on screen.</p>
          </div>
          <div class="bg-green-500/10 p-4 rounded-lg">
            <p class="text-green-300 font-semibold">🟢 &lt;body&gt;</p>
            <p class="text-gray-400 text-sm">Everything the user sees: headings, text, images, buttons, forms. This is your canvas.</p>
          </div>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🏷️ Tags, Elements & Attributes</h2>
        <p class="text-gray-300 mb-3">An <strong>element</strong> is everything from the opening tag to the closing tag:</p>
        <div class="bg-black/60 rounded-xl p-4 overflow-x-auto">
          <pre class="text-green-400 text-sm"><code>&lt;p class="intro"&gt;This is a paragraph element.&lt;/p&gt;
 ↑ opening tag   ↑ content                     ↑ closing tag

&lt;img src="photo.jpg" alt="My photo"&gt;   &lt;!-- Self-closing: no closing tag needed --&gt;
      ↑ attribute  ↑ attribute value</code></pre>
        </div>
        <p class="text-gray-300 mt-3">Attributes always go inside the opening tag as <code class="text-yellow-400">name="value"</code> pairs. They add extra information or configuration to elements.</p>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">💻 Your First Web Page – Step by Step</h2>
        <ol class="list-decimal list-inside text-gray-300 space-y-2">
          <li>Open VS Code (or any text editor)</li>
          <li>Create a new file and save it as <code class="text-yellow-400">index.html</code></li>
          <li>Type the boilerplate above (type it — don't copy; your fingers need to learn it)</li>
          <li>Double-click the file in your file explorer — it opens in your browser</li>
          <li>Every time you save changes, refresh the browser to see the update</li>
        </ol>
        <div class="bg-yellow-500/10 p-4 rounded-lg mt-4">
          <p class="text-yellow-300">⚡ <strong>Install the Live Server extension in VS Code</strong> — it auto-refreshes your browser every time you save. Life-changing for beginners.</p>
        </div>
      </div>

      <div class="bg-green-500/10 p-6 rounded-xl">
        <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
        <p class="text-gray-300">Create <code>index.html</code> with a proper HTML5 boilerplate. In the body, add an H1 with your name, an H2 saying "My Goals", and three paragraphs describing what you want to build after this course. Open it in your browser. Then edit the title tag and watch the browser tab change.</p>
      </div>
    </div>`,
    [
      { question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'], correct: 0 },
      { question: 'Which part of the HTML document contains visible content?', options: ['<head>', '<meta>', '<body>', '<html>'], correct: 2 },
      { question: 'What does the <!DOCTYPE html> declaration do?', options: ['Links a stylesheet', 'Declares the document as HTML5', 'Creates a comment', 'Defines the page title'], correct: 1 },
      { question: 'Where does the page title (shown in the browser tab) go?', options: ['Inside <body>', 'Inside <title> in <head>', 'Inside <h1>', 'Inside <meta>'], correct: 1 },
      { question: 'What is an HTML attribute?', options: ['A closing tag', 'Extra info added inside an opening tag', 'The text content of an element', 'A CSS rule'], correct: 1 },
      { question: 'Which of these is a self-closing tag?', options: ['<p>', '<div>', '<img>', '<section>'], correct: 2 },
      { question: 'What does the lang="en" attribute on <html> do?', options: ['Sets text color to English theme', 'Helps screen readers and search engines identify the language', 'Loads an English font', 'Translates the page to English'], correct: 1 },
      { question: 'What is the correct file extension for an HTML file?', options: ['.htm or .html', '.hml', '.web', '.page'], correct: 0 }
    ],
    50,
    'https://www.youtube.com/embed/UB1O30fR-EE'
  ),

  // ── Lesson 2 ──
  lesson(
    '2. Headings, Paragraphs, Text Formatting & Semantic Meaning',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-orange-400 mb-2">📖 What You Will Learn</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li>The six heading levels and when to use each</li>
          <li>How to create well-structured paragraphs</li>
          <li>The difference between semantic and presentational formatting</li>
          <li>Inline vs block-level elements</li>
          <li>Special characters and HTML entities</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">📰 Headings: The Outline of Your Page</h2>
        <p class="text-gray-300 mb-3">Headings create a hierarchy — like a newspaper. Search engines and screen readers rely on this hierarchy to understand your page. <strong>Never skip heading levels</strong> (e.g., don't go from H1 straight to H3).</p>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>&lt;h1&gt;Ghana's Waste Crisis — And How Tech Is Solving It&lt;/h1&gt;  &lt;!-- ONE per page --&gt;
&lt;h2&gt;The Problem in Accra&lt;/h2&gt;
  &lt;h3&gt;The Role of Tricycles&lt;/h3&gt;
    &lt;h4&gt;Cost Breakdown&lt;/h4&gt;
      &lt;h5&gt;Government Subsidies&lt;/h5&gt;
        &lt;h6&gt;Local NGO Partners&lt;/h6&gt;</code></pre>
        </div>
        <div class="bg-red-500/10 p-4 rounded-lg mt-3">
          <p class="text-red-300">⚠️ <strong>Common Mistake:</strong> Using headings just to make text big. That's CSS's job. Use headings for <em>structure and meaning</em>, not for styling.</p>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">📝 Paragraphs, Breaks & Horizontal Rules</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>&lt;p&gt;Paragraphs have automatic top and bottom margins. Browsers handle spacing.&lt;/p&gt;
&lt;p&gt;A second paragraph. Notice the gap above — that's the default margin.&lt;/p&gt;

&lt;p&gt;Use &lt;br&gt; for a line break&lt;br&gt;within the same paragraph.&lt;/p&gt;

&lt;hr&gt;  &lt;!-- A thematic break — a horizontal rule. Not just a decorative line. --&gt;</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">✍️ Semantic vs Presentational Formatting</h2>
        <p class="text-gray-300 mb-3">This is critical. Two tags can look the same but have <em>completely different meaning</em>:</p>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>&lt;!-- SEMANTIC (preferred) --&gt;
&lt;strong&gt;Warning: Do not delete this file.&lt;/strong&gt;   &lt;!-- important text --&gt;
&lt;em&gt;Please read this carefully.&lt;/em&gt;                  &lt;!-- emphasis --&gt;
&lt;mark&gt;Highlighted term&lt;/mark&gt;                          &lt;!-- highlighted --&gt;
&lt;del&gt;Old price: $50&lt;/del&gt; &lt;ins&gt;New price: $35&lt;/ins&gt;  &lt;!-- edits --&gt;
&lt;abbr title="Progressive Web App"&gt;PWA&lt;/abbr&gt;          &lt;!-- abbreviation --&gt;
&lt;code&gt;localStorage.getItem('key')&lt;/code&gt;               &lt;!-- inline code --&gt;
&lt;sub&gt;2&lt;/sub&gt; and &lt;sup&gt;2&lt;/sup&gt;                        &lt;!-- subscript/superscript --&gt;

&lt;!-- PRESENTATIONAL (avoid for meaning) --&gt;
&lt;b&gt;Bold without importance&lt;/b&gt;
&lt;i&gt;Italic without emphasis&lt;/i&gt;</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🔡 Block vs Inline Elements</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-purple-500/10 p-4 rounded-lg">
            <p class="text-purple-300 font-semibold">Block Elements</p>
            <p class="text-gray-400 text-sm">Take the full width of their container. Start on a new line. Examples: &lt;p&gt;, &lt;h1&gt;–&lt;h6&gt;, &lt;div&gt;, &lt;section&gt;, &lt;article&gt;</p>
          </div>
          <div class="bg-pink-500/10 p-4 rounded-lg">
            <p class="text-pink-300 font-semibold">Inline Elements</p>
            <p class="text-gray-400 text-sm">Flow within text. Take only as much width as needed. Examples: &lt;strong&gt;, &lt;em&gt;, &lt;a&gt;, &lt;span&gt;, &lt;code&gt;, &lt;img&gt;</p>
          </div>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🔣 HTML Entities</h2>
        <p class="text-gray-300 mb-3">Some characters are reserved in HTML (like &lt; and &gt;). Use entities instead:</p>
        <div class="bg-black/60 rounded-xl p-4 overflow-x-auto">
          <pre class="text-green-400 text-sm"><code>&amp;lt;    → &lt;
&amp;gt;    → &gt;
&amp;amp;   → &amp;
&amp;copy;  → ©
&amp;nbsp;  → non-breaking space</code></pre>
        </div>
      </div>

      <div class="bg-green-500/10 p-6 rounded-xl">
        <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
        <p class="text-gray-300">Write a news article page about a tech topic you like. Use H1 for the title, H2 for each section heading, and H3 for sub-sections. Mark at least one word as &lt;strong&gt;, one as &lt;em&gt;, and include a &lt;mark&gt; highlight. Add an &lt;abbr&gt; for any acronym. Add a copyright line using the &amp;copy; entity.</p>
      </div>
    </div>`,
    [
      { question: 'How many heading levels does HTML have?', options: ['4', '5', '6', '8'], correct: 2 },
      { question: 'What is the main difference between <strong> and <b>?', options: ['They are identical', '<strong> has semantic importance; <b> is purely visual', '<b> is for screen readers', '<strong> only works in forms'], correct: 1 },
      { question: 'Which of the following is a block-level element?', options: ['<span>', '<em>', '<a>', '<p>'], correct: 3 },
      { question: 'What does the <abbr> tag do?', options: ['Makes text italic', 'Defines an abbreviation with a full tooltip', 'Creates a link', 'Centers text'], correct: 1 },
      { question: 'How do you display the < character in HTML without it being treated as a tag?', options: ['\\lt', '&lt;', '<char>', '(lt)'], correct: 1 },
      { question: 'What does <br> do?', options: ['Creates a new paragraph', 'Inserts a line break within the current element', 'Adds bold text', 'Creates a horizontal rule'], correct: 1 },
      { question: 'What is the correct use of <hr>?', options: ['Decorative divider for looks', 'A thematic break between content sections', 'It creates a table row', 'It is the same as <br>'], correct: 1 },
      { question: 'Which element is used for inline code snippets?', options: ['<pre>', '<code>', '<script>', '<kbd>'], correct: 1 }
    ],
    50,
    'https://www.youtube.com/embed/yTHTo28hwTQ'
  ),

  // ── Lesson 3 ──
  lesson(
    '3. Links, Images & Embedding Media',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-orange-400 mb-2">📖 What You Will Learn</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li>How hyperlinks work (absolute vs relative URLs)</li>
          <li>Linking to sections on the same page with anchor IDs</li>
          <li>Embedding images with proper alt text and dimensions</li>
          <li>Responsive images with srcset</li>
          <li>Embedding video, audio, and iframes</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🔗 Hyperlinks In Depth</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>&lt;!-- Absolute URL (full address) --&gt;
&lt;a href="https://www.google.com"&gt;Visit Google&lt;/a&gt;

&lt;!-- Relative URL (same website, different page) --&gt;
&lt;a href="about.html"&gt;About Us&lt;/a&gt;
&lt;a href="../pages/contact.html"&gt;Contact&lt;/a&gt;   &lt;!-- ../ goes up one folder --&gt;

&lt;!-- Open in new tab (always add rel="noopener" for security) --&gt;
&lt;a href="https://github.com" target="_blank" rel="noopener noreferrer"&gt;GitHub&lt;/a&gt;

&lt;!-- Email link --&gt;
&lt;a href="mailto:hello@wastego.gh"&gt;Email Us&lt;/a&gt;

&lt;!-- Phone link (great for mobile) --&gt;
&lt;a href="tel:+233244000000"&gt;Call Us&lt;/a&gt;

&lt;!-- Anchor link (jumps to section on same page) --&gt;
&lt;a href="#services"&gt;See Our Services&lt;/a&gt;
...
&lt;section id="services"&gt;...&lt;/section&gt;</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🖼️ Images: The Right Way</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>&lt;!-- Basic image --&gt;
&lt;img src="images/rider.jpg" alt="WasteGo rider on a tricycle in Accra" width="600" height="400"&gt;

&lt;!-- Always set width and height to prevent layout shift (CLS) --&gt;
&lt;!-- Alt text describes the image for screen readers and if the image fails to load --&gt;

&lt;!-- Decorative image (skip alt text with empty string) --&gt;
&lt;img src="decoration.svg" alt=""&gt;

&lt;!-- Responsive image (serves different sizes for different screens) --&gt;
&lt;img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1200.jpg 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"
  alt="A busy street in Accra"&gt;

&lt;!-- Image with caption --&gt;
&lt;figure&gt;
  &lt;img src="chart.png" alt="Waste collection growth chart 2024"&gt;
  &lt;figcaption&gt;WasteGo collection volume grew 300% in 2024.&lt;/figcaption&gt;
&lt;/figure&gt;</code></pre>
        </div>
        <div class="bg-blue-500/10 p-4 rounded-lg mt-3">
          <p class="text-blue-300">💡 <strong>Supported formats:</strong> JPEG (photos), PNG (logos/transparency), SVG (icons/illustrations), WebP (modern — smaller files, great quality). Use WebP when possible.</p>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🎬 Video, Audio & iframes</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>&lt;!-- HTML5 Video --&gt;
&lt;video controls width="720" poster="thumbnail.jpg"&gt;
  &lt;source src="demo.mp4" type="video/mp4"&gt;
  &lt;source src="demo.webm" type="video/webm"&gt;
  &lt;p&gt;Your browser doesn't support video. &lt;a href="demo.mp4"&gt;Download instead&lt;/a&gt;.&lt;/p&gt;
&lt;/video&gt;

&lt;!-- HTML5 Audio --&gt;
&lt;audio controls&gt;
  &lt;source src="notification.mp3" type="audio/mpeg"&gt;
&lt;/audio&gt;

&lt;!-- Embed YouTube video --&gt;
&lt;iframe
  width="560" height="315"
  src="https://www.youtube.com/embed/UB1O30fR-EE"
  title="HTML Tutorial"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen&gt;
&lt;/iframe&gt;</code></pre>
        </div>
      </div>

      <div class="bg-green-500/10 p-6 rounded-xl">
        <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
        <p class="text-gray-300">Build a "Media Gallery" page. Include: a navigation bar with anchor links to three sections (Photos, Videos, Contact). Each section has at least two images with proper alt text wrapped in &lt;figure&gt;. Embed one YouTube video. Add a mailto link in the contact section. All images should link to a larger version using &lt;a&gt; wrapping &lt;img&gt;.</p>
      </div>
    </div>`,
    [
      { question: 'What attribute on <a> specifies the destination URL?', options: ['src', 'href', 'link', 'url'], correct: 1 },
      { question: 'What does target="_blank" do on a link?', options: ['Downloads the file', 'Opens the link in a new tab/window', 'Opens in an iframe', 'Opens in the parent frame'], correct: 1 },
      { question: 'Why should you add rel="noopener noreferrer" when using target="_blank"?', options: ['For SEO ranking', 'To prevent security vulnerabilities', 'To improve page speed', 'To fix broken links'], correct: 1 },
      { question: 'What is the purpose of the alt attribute on an image?', options: ['Sets the image title tooltip', 'Describes the image for screen readers and when image fails', 'Links the image to another page', 'Sets the image file format'], correct: 1 },
      { question: 'Which element should you use to group an image with its caption?', options: ['<picture>', '<figure>', '<section>', '<div>'], correct: 1 },
      { question: 'What does the srcset attribute on an <img> allow you to do?', options: ['Set multiple alt texts', 'Provide different image sizes for different screen resolutions', 'Add multiple images in a slideshow', 'Set fallback images'], correct: 1 },
      { question: 'Which HTML element is used to embed external content like YouTube videos?', options: ['<embed>', '<video>', '<iframe>', '<object>'], correct: 2 },
      { question: 'How do you create a link that opens the user\'s email client?', options: ['<a href="email:user@example.com">', '<a href="mailto:user@example.com">', '<a email="user@example.com">', '<mail>user@example.com</mail>'], correct: 1 }
    ],
    50,
    'https://www.youtube.com/embed/GNmX2-uLU_E'
  ),

  // ── Lesson 4 ──
  lesson(
    '4. Lists, Tables & Structuring Data',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-orange-400 mb-2">📖 What You Will Learn</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li>Unordered, ordered, and definition lists</li>
          <li>Nested lists for complex hierarchies</li>
          <li>Building full HTML tables with headers, body, and footer</li>
          <li>Merging cells with rowspan and colspan</li>
          <li>Accessible tables with scope and caption</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">📋 The Three Types of Lists</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>&lt;!-- Unordered List (bullets) --&gt;
&lt;ul&gt;
  &lt;li&gt;Collect waste&lt;/li&gt;
  &lt;li&gt;Sort recyclables&lt;/li&gt;
  &lt;li&gt;Dispatch to landfill&lt;/li&gt;
&lt;/ul&gt;

&lt;!-- Ordered List (numbers) --&gt;
&lt;ol start="1" type="1"&gt;  &lt;!-- type can be 1, A, a, I, i --&gt;
  &lt;li&gt;Register on WasteGo&lt;/li&gt;
  &lt;li&gt;Book a pickup&lt;/li&gt;
  &lt;li&gt;Rider arrives in 30 minutes&lt;/li&gt;
&lt;/ol&gt;

&lt;!-- Definition List (term + description) --&gt;
&lt;dl&gt;
  &lt;dt&gt;PWA&lt;/dt&gt;
  &lt;dd&gt;Progressive Web App — a website that behaves like a mobile app.&lt;/dd&gt;
  &lt;dt&gt;API&lt;/dt&gt;
  &lt;dd&gt;Application Programming Interface — how software talks to software.&lt;/dd&gt;
&lt;/dl&gt;

&lt;!-- Nested List --&gt;
&lt;ul&gt;
  &lt;li&gt;Ghana Regions
    &lt;ul&gt;
      &lt;li&gt;Greater Accra
        &lt;ol&gt;
          &lt;li&gt;Tema&lt;/li&gt;
          &lt;li&gt;Madina&lt;/li&gt;
        &lt;/ol&gt;
      &lt;/li&gt;
      &lt;li&gt;Ashanti&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/li&gt;
&lt;/ul&gt;</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">📊 HTML Tables — Complete Guide</h2>
        <p class="text-gray-300 mb-3">Tables are for tabular data — not for page layout (that's CSS Grid's job). A well-structured table has a head, body, and foot.</p>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>&lt;table&gt;
  &lt;caption&gt;Monthly Waste Collection Stats — WasteGo 2024&lt;/caption&gt;

  &lt;colgroup&gt;
    &lt;col style="background:#1a1a2e"&gt;
    &lt;col span="3" style="background:#16213e"&gt;
  &lt;/colgroup&gt;

  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th scope="col"&gt;Month&lt;/th&gt;
      &lt;th scope="col"&gt;Pickups&lt;/th&gt;
      &lt;th scope="col"&gt;Tonnage (kg)&lt;/th&gt;
      &lt;th scope="col"&gt;Revenue (GHS)&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;

  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;td&gt;January&lt;/td&gt;
      &lt;td&gt;420&lt;/td&gt;
      &lt;td rowspan="2"&gt;8,500&lt;/td&gt;  &lt;!-- Merges 2 rows --&gt;
      &lt;td&gt;12,600&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;February&lt;/td&gt;
      &lt;td&gt;380&lt;/td&gt;
      &lt;td&gt;11,400&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td colspan="2"&gt;Q1 Totals&lt;/td&gt;  &lt;!-- Merges 2 columns --&gt;
      &lt;td&gt;17,000&lt;/td&gt;
      &lt;td&gt;24,000&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;

  &lt;tfoot&gt;
    &lt;tr&gt;
      &lt;td colspan="4"&gt;Data verified by GhanaData Analytics&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tfoot&gt;
&lt;/table&gt;</code></pre>
        </div>
      </div>

      <div class="bg-green-500/10 p-6 rounded-xl">
        <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
        <p class="text-gray-300">Create a "Skills Tracker" page. Include: an ordered list of courses you are studying. A definition list of 5 tech terms you've learned. A table of your weekly study schedule (days as columns, time slots as rows) with at least one colspan and one rowspan. Add a caption to the table.</p>
      </div>
    </div>`,
    [
      { question: 'Which tag creates an unordered (bullet) list?', options: ['<ol>', '<ul>', '<li>', '<dl>'], correct: 1 },
      { question: 'Which tag creates a numbered list?', options: ['<ul>', '<nl>', '<ol>', '<list>'], correct: 2 },
      { question: 'Which attribute merges multiple table columns?', options: ['rowspan', 'merge', 'colspan', 'colmerge'], correct: 2 },
      { question: 'What is the correct structure for a definition list item?', options: ['<li> inside <dl>', '<dt> for term and <dd> for description', '<term> and <def>', '<h3> inside <dl>'], correct: 1 },
      { question: 'Which element adds an accessible title/caption to a table?', options: ['<title>', '<caption>', '<thead>', '<summary>'], correct: 1 },
      { question: 'What is <tfoot> used for?', options: ['The first row of a table', 'The footer/summary rows at the bottom of a table', 'Styling the table', 'Creating table borders'], correct: 1 },
      { question: 'Can you nest a list inside another list item?', options: ['No, lists cannot be nested', 'Yes, any list type can be nested inside <li>', 'Only ordered inside unordered', 'Only if you add a special attribute'], correct: 1 },
      { question: 'What does the scope attribute on <th> improve?', options: ['Visual styling', 'Accessibility by associating headers with data cells', 'Colspan functionality', 'Column sorting'], correct: 1 }
    ],
    50,
    'https://www.youtube.com/embed/3PHXvlpOkf4'
  ),

  // ── Lesson 5 ──
  lesson(
    '5. HTML Forms: Collecting User Input',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-orange-400 mb-2">📖 What You Will Learn</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li>Form action and method attributes</li>
          <li>All important input types with real examples</li>
          <li>Labels, fieldsets, and accessibility best practices</li>
          <li>Validation attributes (required, min, max, pattern)</li>
          <li>Dropdowns, textareas, and file uploads</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">📝 The Form Element</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>&lt;form action="/submit" method="POST" enctype="multipart/form-data"&gt;
  &lt;!-- action: where data is sent (URL or server endpoint) --&gt;
  &lt;!-- method: GET (data in URL, for searches) or POST (hidden in body, for sensitive data) --&gt;
  &lt;!-- enctype: needed when uploading files --&gt;
&lt;/form&gt;</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🔤 Input Types — All the Important Ones</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>&lt;!-- Always link label to input via id/for --&gt;
&lt;label for="name"&gt;Full Name&lt;/label&gt;
&lt;input type="text" id="name" name="name" placeholder="Kwame Mensah" required
       minlength="2" maxlength="100"&gt;

&lt;label for="email"&gt;Email&lt;/label&gt;
&lt;input type="email" id="email" name="email" required&gt;

&lt;label for="phone"&gt;Phone (Ghana)&lt;/label&gt;
&lt;input type="tel" id="phone" name="phone" pattern="0[235][0-9]{8}"
       placeholder="0244000000"&gt;

&lt;label for="password"&gt;Password&lt;/label&gt;
&lt;input type="password" id="password" name="password" minlength="8" required&gt;

&lt;label for="age"&gt;Age&lt;/label&gt;
&lt;input type="number" id="age" name="age" min="16" max="99" step="1"&gt;

&lt;label for="pickup"&gt;Pickup Date&lt;/label&gt;
&lt;input type="date" id="pickup" name="pickup" min="2024-01-01"&gt;

&lt;label for="time"&gt;Preferred Time&lt;/label&gt;
&lt;input type="time" id="time" name="time"&gt;

&lt;label for="avatar"&gt;Profile Photo&lt;/label&gt;
&lt;input type="file" id="avatar" name="avatar" accept="image/*" multiple&gt;

&lt;label for="weight"&gt;Waste Weight Estimate&lt;/label&gt;
&lt;input type="range" id="weight" name="weight" min="1" max="100" value="20"&gt;

&lt;input type="color" id="themeColor" name="themeColor" value="#00ff88"&gt;

&lt;input type="hidden" name="userId" value="usr_abc123"&gt;

&lt;input type="checkbox" id="terms" name="terms" required&gt;
&lt;label for="terms"&gt;I agree to the Terms of Service&lt;/label&gt;

&lt;!-- Radio group: same name attribute --&gt;
&lt;fieldset&gt;
  &lt;legend&gt;Waste Type&lt;/legend&gt;
  &lt;input type="radio" id="organic" name="wasteType" value="organic"&gt;
  &lt;label for="organic"&gt;Organic&lt;/label&gt;
  &lt;input type="radio" id="plastic" name="wasteType" value="plastic"&gt;
  &lt;label for="plastic"&gt;Plastic&lt;/label&gt;
&lt;/fieldset&gt;

&lt;!-- Dropdown --&gt;
&lt;label for="region"&gt;Region&lt;/label&gt;
&lt;select id="region" name="region"&gt;
  &lt;option value=""&gt;-- Select Region --&lt;/option&gt;
  &lt;optgroup label="Southern"&gt;
    &lt;option value="gr"&gt;Greater Accra&lt;/option&gt;
    &lt;option value="cr"&gt;Central Region&lt;/option&gt;
  &lt;/optgroup&gt;
&lt;/select&gt;

&lt;!-- Multiline text --&gt;
&lt;label for="notes"&gt;Special Instructions&lt;/label&gt;
&lt;textarea id="notes" name="notes" rows="4" cols="50" maxlength="500"&gt;&lt;/textarea&gt;

&lt;!-- Buttons --&gt;
&lt;button type="submit"&gt;Book Pickup&lt;/button&gt;
&lt;button type="reset"&gt;Clear Form&lt;/button&gt;
&lt;button type="button" onclick="doSomething()"&gt;Custom Action&lt;/button&gt;</code></pre>
        </div>
      </div>

      <div class="bg-green-500/10 p-6 rounded-xl">
        <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
        <p class="text-gray-300">Build a complete "Waste Pickup Booking Form" with: Full name, email, Ghana phone (with pattern), pickup date and time, waste type radio buttons (organic/plastic/e-waste), region dropdown, a file upload for photo evidence, a range slider for estimated weight, a notes textarea, terms checkbox, and a submit button. Make all required fields actually required.</p>
      </div>
    </div>`,
    [
      { question: 'What is the difference between GET and POST form methods?', options: ['GET is faster; POST is slower', 'GET appends data to the URL; POST sends it in the request body', 'GET is for files; POST is for text', 'They are identical'], correct: 1 },
      { question: 'Why should every <input> have a matching <label>?', options: ['It makes forms look nicer', 'It is required by HTML spec', 'It improves accessibility and usability (clicking label focuses input)', 'Labels are optional decoration'], correct: 2 },
      { question: 'What does the required attribute do?', options: ['Adds a red border', 'Prevents form submission if the field is empty', 'Makes the field read-only', 'Sets a default value'], correct: 1 },
      { question: 'How do radio buttons in a group work together?', options: ['They share the same id', 'They share the same name attribute', 'They share the same value', 'They share the same class'], correct: 1 },
      { question: 'Which input type creates a slider control?', options: ['<input type="slide">', '<input type="range">', '<input type="slider">', '<input type="scale">'], correct: 1 },
      { question: 'What enctype is needed when your form uploads files?', options: ['text/plain', 'application/json', 'multipart/form-data', 'application/x-www-form-urlencoded'], correct: 2 },
      { question: 'What does the pattern attribute on an input do?', options: ['Sets a CSS pattern background', 'Validates input against a regular expression', 'Creates a template', 'Groups similar inputs'], correct: 1 },
      { question: 'What element groups related form controls with a visible border and legend?', options: ['<group>', '<section>', '<fieldset>', '<formgroup>'], correct: 2 }
    ],
    50,
    'https://www.youtube.com/embed/SBmUPnzjGEc'
  ),

  // ── Lesson 6 ──
  lesson(
    '6. Semantic HTML5: Structure That Means Something',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-orange-400 mb-2">📖 What You Will Learn</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li>Why semantic HTML matters for SEO and accessibility</li>
          <li>All major HTML5 semantic elements and their exact purpose</li>
          <li>The difference between &lt;div&gt; soup and meaningful structure</li>
          <li>Building a real page layout with semantic tags</li>
          <li>ARIA roles and when to use them</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🧠 Why Semantics Matter</h2>
        <p class="text-gray-300 mb-3">A screen reader used by a blind person doesn't see your design — it reads your HTML. Google's crawler doesn't see colors — it reads your structure. <strong class="text-orange-400">Semantic HTML communicates meaning</strong>, not just appearance.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-red-500/10 p-4 rounded-lg">
            <p class="text-red-400 font-semibold">❌ Div Soup (bad)</p>
            <pre class="text-gray-400 text-xs mt-2"><code>&lt;div class="header"&gt;...&lt;/div&gt;
&lt;div class="nav"&gt;...&lt;/div&gt;
&lt;div class="main"&gt;...&lt;/div&gt;
&lt;div class="sidebar"&gt;...&lt;/div&gt;
&lt;div class="footer"&gt;...&lt;/div&gt;</code></pre>
          </div>
          <div class="bg-green-500/10 p-4 rounded-lg">
            <p class="text-green-400 font-semibold">✅ Semantic (correct)</p>
            <pre class="text-gray-400 text-xs mt-2"><code>&lt;header&gt;...&lt;/header&gt;
&lt;nav&gt;...&lt;/nav&gt;
&lt;main&gt;...&lt;/main&gt;
&lt;aside&gt;...&lt;/aside&gt;
&lt;footer&gt;...&lt;/footer&gt;</code></pre>
          </div>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🏗️ Every Semantic Element Explained</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>&lt;header&gt;
  &lt;!-- Introductory content for the page or a section --&gt;
  &lt;!-- Contains: logo, site title, top nav, hero area --&gt;
  &lt;h1&gt;WasteGo — Ghana's Waste Revolution&lt;/h1&gt;
  &lt;nav&gt;
    &lt;!-- Primary navigation links --&gt;
    &lt;ul&gt;
      &lt;li&gt;&lt;a href="/"&gt;Home&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href="/book"&gt;Book Pickup&lt;/a&gt;&lt;/li&gt;
      &lt;li&gt;&lt;a href="/about"&gt;About&lt;/a&gt;&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/nav&gt;
&lt;/header&gt;

&lt;main&gt;  &lt;!-- ONE per page — the main content --&gt;

  &lt;section&gt;  &lt;!-- Thematic grouping with a heading --&gt;
    &lt;h2&gt;How WasteGo Works&lt;/h2&gt;

    &lt;article&gt;  &lt;!-- Self-contained, reusable content (blog post, card, news item) --&gt;
      &lt;h3&gt;Step 1: Book Online&lt;/h3&gt;
      &lt;p&gt;Request a pickup in 30 seconds...&lt;/p&gt;
      &lt;footer&gt;Posted by Admin | 12 Jan 2024&lt;/footer&gt;  &lt;!-- footer inside article --&gt;
    &lt;/article&gt;

    &lt;article&gt;
      &lt;h3&gt;Step 2: Rider Arrives&lt;/h3&gt;
      &lt;p&gt;Your assigned rider shows up within 30 minutes...&lt;/p&gt;
    &lt;/article&gt;
  &lt;/section&gt;

  &lt;section&gt;
    &lt;h2&gt;Impact Statistics&lt;/h2&gt;
    &lt;!-- Stats, charts, etc. --&gt;
  &lt;/section&gt;

&lt;/main&gt;

&lt;aside&gt;
  &lt;!-- Tangentially related content: sidebar, related links, ads --&gt;
  &lt;h2&gt;Recent News&lt;/h2&gt;
  &lt;p&gt;WasteGo wins Ghana Tech Award 2024&lt;/p&gt;
&lt;/aside&gt;

&lt;footer&gt;
  &lt;!-- Page footer: copyright, links, contact --&gt;
  &lt;address&gt;
    &lt;!-- Contact info (not mailing address only) --&gt;
    &lt;a href="mailto:info@wastego.gh"&gt;info@wastego.gh&lt;/a&gt;
    &lt;a href="tel:+233244000000"&gt;+233 24 400 0000&lt;/a&gt;
  &lt;/address&gt;
  &lt;p&gt;&amp;copy; 2024 WasteGo Ltd. All rights reserved.&lt;/p&gt;
&lt;/footer&gt;

&lt;!-- Other semantic elements --&gt;
&lt;time datetime="2024-06-15"&gt;15 June 2024&lt;/time&gt;
&lt;details&gt;
  &lt;summary&gt;What areas do you cover?&lt;/summary&gt;
  &lt;p&gt;We currently serve Greater Accra, Kumasi, and Tema.&lt;/p&gt;
&lt;/details&gt;</code></pre>
        </div>
      </div>

      <div class="bg-green-500/10 p-6 rounded-xl">
        <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
        <p class="text-gray-300">Rewrite a previous practice page completely replacing all &lt;div&gt; elements with the correct semantic tags. Add a &lt;details&gt;/&lt;summary&gt; FAQ section with 3 questions. Use &lt;time&gt; for any dates. Add an &lt;address&gt; in the footer. Validate your HTML at validator.w3.org.</p>
      </div>
    </div>`,
    [
      { question: 'What is the main benefit of semantic HTML?', options: ['Makes pages load faster', 'Communicates meaning to browsers, screen readers, and search engines', 'Reduces file size', 'Removes the need for CSS'], correct: 1 },
      { question: 'How many <main> elements should a page have?', options: ['As many as needed', 'One per section', 'Exactly one', 'Two — one for desktop, one for mobile'], correct: 2 },
      { question: 'What is the difference between <section> and <article>?', options: ['They are identical', '<article> is self-contained and reusable; <section> groups thematic content', '<section> is for navigation', '<article> is for images only'], correct: 1 },
      { question: 'What element is best for a sidebar or related content panel?', options: ['<div class="sidebar">', '<aside>', '<section>', '<extra>'], correct: 1 },
      { question: 'What does the <details> element do?', options: ['Shows developer details in console', 'Creates an expandable/collapsible disclosure widget', 'Provides metadata to search engines', 'Defines table details'], correct: 1 },
      { question: 'Which element should wrap contact information like email and phone?', options: ['<contact>', '<footer>', '<address>', '<info>'], correct: 2 },
      { question: 'What does the datetime attribute on <time> do?', options: ['Sets a countdown timer', 'Provides machine-readable date/time for bots and parsers', 'Formats the displayed time', 'Links to a calendar event'], correct: 1 },
      { question: 'When should you use a <div>?', options: ['Never — always use semantic elements', 'When no semantic element appropriately describes the content', 'For every container on the page', 'Only for navigation'], correct: 1 }
    ],
    50,
    'https://www.youtube.com/embed/kGW8Al_cga4'
  ),

  // ── Lesson 7 ──
  lesson(
    '7. HTML5 APIs: LocalStorage, Geolocation & Drag-and-Drop',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-orange-400 mb-2">📖 What You Will Learn</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li>Store data in the browser with localStorage and sessionStorage</li>
          <li>Get the user's GPS location with the Geolocation API</li>
          <li>Build drag-and-drop interfaces natively in HTML5</li>
          <li>The Web Notifications API</li>
          <li>Real-world use cases for PWA development</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">💾 localStorage vs sessionStorage</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>// localStorage — persists FOREVER until manually cleared
localStorage.setItem('userName', 'Kwame');
const name = localStorage.getItem('userName');  // 'Kwame'
localStorage.removeItem('userName');
localStorage.clear();  // remove everything

// Storing objects — must stringify first
const user = { id: 'usr_1', role: 'rider', region: 'accra' };
localStorage.setItem('currentUser', JSON.stringify(user));
const retrieved = JSON.parse(localStorage.getItem('currentUser'));
console.log(retrieved.role);  // 'rider'

// sessionStorage — cleared when browser tab is closed
sessionStorage.setItem('tempToken', 'abc123');

// Check if key exists
if (localStorage.getItem('currentUser')) {
  console.log('User is logged in');
} else {
  console.log('Please log in');
}

// Get all keys
for (let i = 0; i &lt; localStorage.length; i++) {
  const key = localStorage.key(i);
  console.log(key, localStorage.getItem(key));
}</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">📍 Geolocation API</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>// Check if supported
if ('geolocation' in navigator) {
  // Get current position (prompts user for permission)
  navigator.geolocation.getCurrentPosition(
    function(position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const accuracy = position.coords.accuracy;  // in metres
      console.log(\`Location: \${lat}, \${lng} (±\${accuracy}m)\`);
      // Store for WasteGo rider matching
      localStorage.setItem('userLocation', JSON.stringify({ lat, lng }));
    },
    function(error) {
      switch(error.code) {
        case error.PERMISSION_DENIED: console.log('User denied location'); break;
        case error.POSITION_UNAVAILABLE: console.log('GPS unavailable'); break;
        case error.TIMEOUT: console.log('Request timed out'); break;
      }
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
  );

  // Watch position in real-time (for rider tracking)
  const watchId = navigator.geolocation.watchPosition(successFn, errorFn);
  // Stop watching
  navigator.geolocation.clearWatch(watchId);
}</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🖱️ Drag and Drop API</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>&lt;!-- HTML --&gt;
&lt;div id="item" draggable="true"&gt;Drag me&lt;/div&gt;
&lt;div id="dropzone"&gt;Drop here&lt;/div&gt;

&lt;script&gt;
const item = document.getElementById('item');
const zone = document.getElementById('dropzone');

item.addEventListener('dragstart', e =&gt; {
  e.dataTransfer.setData('text/plain', e.target.id);
  e.target.style.opacity = '0.5';
});

item.addEventListener('dragend', e =&gt; {
  e.target.style.opacity = '1';
});

zone.addEventListener('dragover', e =&gt; {
  e.preventDefault();  // REQUIRED to allow dropping
  zone.style.background = '#00ff8840';
});

zone.addEventListener('drop', e =&gt; {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  zone.appendChild(document.getElementById(id));
  zone.style.background = '';
});
&lt;/script&gt;</code></pre>
        </div>
      </div>

      <div class="bg-green-500/10 p-6 rounded-xl">
        <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
        <p class="text-gray-300">Build a "WasteGo Lite" app: a page that gets the user's location and displays latitude/longitude. Saves the user's name to localStorage and greets them by name on return. Has a drag-and-drop waste sorter with three zones: Organic, Plastic, Electronic — drag waste items into the correct zone and store the sorted result in localStorage.</p>
      </div>
    </div>`,
    [
      { question: 'What is the key difference between localStorage and sessionStorage?', options: ['localStorage is faster', 'sessionStorage clears when the tab is closed; localStorage persists', 'sessionStorage holds more data', 'They are identical'], correct: 1 },
      { question: 'How do you store an object in localStorage?', options: ['localStorage.setItem("key", myObject)', 'localStorage.setItem("key", JSON.stringify(myObject))', 'localStorage.store(myObject)', 'localStorage.save("key", myObject)'], correct: 1 },
      { question: 'Which navigator API provides GPS coordinates?', options: ['navigator.location', 'navigator.gps', 'navigator.geolocation', 'navigator.position'], correct: 2 },
      { question: 'What method is needed in a dragover event handler to allow dropping?', options: ['e.allowDrop()', 'e.preventDefault()', 'e.stopPropagation()', 'e.permit()'], correct: 1 },
      { question: 'What attribute makes an HTML element draggable?', options: ['drag="true"', 'movable="yes"', 'draggable="true"', 'ondrag="start"'], correct: 2 },
      { question: 'What method watches the user\'s position continuously for real-time tracking?', options: ['navigator.geolocation.track()', 'navigator.geolocation.watchPosition()', 'navigator.geolocation.streamPosition()', 'navigator.geolocation.follow()'], correct: 1 },
      { question: 'What does localStorage.clear() do?', options: ['Clears only the last saved item', 'Removes all key-value pairs from localStorage', 'Resets all values to null', 'Clears sessionStorage'], correct: 1 },
      { question: 'What happens if the user denies the Geolocation permission?', options: ['The page crashes', 'The success callback runs with null', 'The error callback runs with PERMISSION_DENIED', 'The browser retries automatically'], correct: 2 }
    ],
    50,
    'https://www.youtube.com/embed/AQn22gjtSWQ'
  ),

  // ── Lesson 8 ──
  lesson(
    '8. Accessibility (a11y): Building for Everyone',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-orange-400 mb-2">📖 What You Will Learn</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li>Why accessibility is a legal and moral requirement</li>
          <li>WCAG guidelines overview</li>
          <li>ARIA roles, labels, and live regions</li>
          <li>Keyboard navigation and focus management</li>
          <li>Testing your page with accessibility tools</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">♿ Why Accessibility Matters</h2>
        <p class="text-gray-300 mb-3">1 in 6 people worldwide has some form of disability. Visual, motor, cognitive, auditory. Building accessible websites means <strong class="text-orange-400">your app works for everyone</strong>. In many countries it is also a legal requirement (ADA, WCAG 2.1).</p>
        <p class="text-gray-300">Good accessibility also means better SEO, better mobile experience, and cleaner code. There is no downside.</p>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🔖 ARIA — Accessible Rich Internet Applications</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>&lt;!-- aria-label: describes element when no visible text exists --&gt;
&lt;button aria-label="Close modal"&gt;&lt;svg&gt;...&lt;/svg&gt;&lt;/button&gt;

&lt;!-- aria-labelledby: references another element as the label --&gt;
&lt;section aria-labelledby="stats-heading"&gt;
  &lt;h2 id="stats-heading"&gt;Impact Statistics&lt;/h2&gt;
  ...
&lt;/section&gt;

&lt;!-- aria-describedby: additional description --&gt;
&lt;input type="password" aria-describedby="pw-hint"&gt;
&lt;p id="pw-hint"&gt;Must be 8+ characters with a number.&lt;/p&gt;

&lt;!-- aria-hidden: hides from screen readers (decorative icons) --&gt;
&lt;span aria-hidden="true"&gt;🚀&lt;/span&gt;

&lt;!-- aria-live: announce dynamic changes to screen readers --&gt;
&lt;div aria-live="polite" id="status"&gt;&lt;/div&gt;
&lt;script&gt;
  document.getElementById('status').textContent = 'Rider is on the way!';
  // Screen reader announces this change automatically
&lt;/script&gt;

&lt;!-- role: when you cannot use native elements --&gt;
&lt;div role="button" tabindex="0" aria-pressed="false"&gt;Toggle&lt;/div&gt;

&lt;!-- aria-expanded: for dropdowns/accordions --&gt;
&lt;button aria-expanded="false" aria-controls="menu"&gt;Menu&lt;/button&gt;
&lt;ul id="menu" hidden&gt;...&lt;/ul&gt;</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">⌨️ Keyboard Navigation</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>&lt;!-- tabindex: controls keyboard focus order --&gt;
&lt;div tabindex="0"&gt;Focusable div (follows DOM order)&lt;/div&gt;
&lt;div tabindex="-1"&gt;Focusable by JS only (skip tab)&lt;/div&gt;

&lt;!-- Skip navigation link (jump to main content) --&gt;
&lt;a href="#main-content" class="skip-link"&gt;Skip to main content&lt;/a&gt;

&lt;!-- Always show focus outlines — never do this: --&gt;
/* BAD */
* { outline: none; }

/* GOOD — custom visible focus style */
button:focus-visible {
  outline: 3px solid #00ff88;
  outline-offset: 4px;
}

&lt;!-- Manage focus programmatically --&gt;
&lt;script&gt;
  document.getElementById('modal').focus();
  document.getElementById('closeBtn').addEventListener('click', () =&gt; {
    document.getElementById('openBtn').focus();  // Return focus
  });
&lt;/script&gt;</code></pre>
        </div>
      </div>

      <div class="bg-green-500/10 p-6 rounded-xl">
        <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
        <p class="text-gray-300">Take your portfolio or booking form. Run it through the WAVE accessibility checker (wave.webaim.org). Fix all errors. Add aria-label to all icon-only buttons. Add a skip-to-main-content link at the top. Make sure all form inputs have proper &lt;label&gt; elements. Test navigating the entire page using only the keyboard (Tab, Enter, Space).</p>
      </div>
    </div>`,
    [
      { question: 'What does ARIA stand for?', options: ['Accessible Rich Internet Applications', 'Automatic Resource Interaction API', 'Advanced Rendering and Interface Architecture', 'Application Rendering Integration API'], correct: 0 },
      { question: 'What does aria-label do?', options: ['Adds a visible text label', 'Provides a text description for screen readers when no visible label exists', 'Links to a help page', 'Labels a CSS class'], correct: 1 },
      { question: 'What value of tabindex makes an element focusable only via JavaScript (skipped by Tab)?', options: ['tabindex="0"', 'tabindex="1"', 'tabindex="-1"', 'tabindex="skip"'], correct: 2 },
      { question: 'What is a "skip navigation" link used for?', options: ['To skip loading slow images', 'To allow keyboard users to jump past the navbar to main content', 'To skip page animations', 'To bypass form validation'], correct: 1 },
      { question: 'What does aria-live="polite" do?', options: ['Makes the page speak immediately on load', 'Announces dynamic content changes to screen readers after the user finishes their current task', 'Hides the element from visual users', 'Sets animation speed to polite/slow'], correct: 1 },
      { question: 'Why should you never use * { outline: none; } in CSS?', options: ['It slows down the browser', 'It removes focus indicators, making keyboard navigation impossible for many users', 'It breaks CSS specificity', 'It is deprecated in CSS3'], correct: 1 },
      { question: 'What does aria-hidden="true" do?', options: ['Makes the element invisible visually', 'Hides the element from screen readers while keeping it visible', 'Removes the element from the DOM', 'Disables all click events on the element'], correct: 1 },
      { question: 'What WCAG guideline level is typically required for legal compliance?', options: ['Level A only', 'Level AA', 'Level AAA', 'There are no legal requirements'], correct: 1 }
    ],
    50,
    'https://www.youtube.com/embed/1A6SrPwmGpg'
  ),

  // ── Lesson 9 ──
  lesson(
    '9. SEO Fundamentals: HTML That Search Engines Love',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-orange-400 mb-2">📖 What You Will Learn</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li>How search engines crawl and index HTML</li>
          <li>Meta tags that actually matter</li>
          <li>Open Graph tags for social sharing</li>
          <li>Structured data with JSON-LD</li>
          <li>Performance and Core Web Vitals basics</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🔍 Meta Tags That Matter</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>&lt;head&gt;
  &lt;!-- Character encoding — always first --&gt;
  &lt;meta charset="UTF-8"&gt;

  &lt;!-- Viewport — critical for mobile (responsive design) --&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;

  &lt;!-- Page title: most important SEO element. 50-60 chars ideal --&gt;
  &lt;title&gt;Book Waste Pickup in Accra | WasteGo Ghana&lt;/title&gt;

  &lt;!-- Meta description: shown in search results. 150-160 chars --&gt;
  &lt;meta name="description" content="WasteGo connects you with tricycle waste collectors in Accra, Kumasi, and Tema. Book a pickup in 30 seconds. Serving 50,000+ households across Ghana."&gt;

  &lt;!-- Robots --&gt;
  &lt;meta name="robots" content="index, follow"&gt;  &lt;!-- default --&gt;
  &lt;meta name="robots" content="noindex, nofollow"&gt;  &lt;!-- admin pages --&gt;

  &lt;!-- Canonical URL (prevents duplicate content) --&gt;
  &lt;link rel="canonical" href="https://wastego.gh/book"&gt;

  &lt;!-- Favicon --&gt;
  &lt;link rel="icon" type="image/png" href="/icons/favicon.png"&gt;
  &lt;link rel="apple-touch-icon" href="/icons/apple-icon-180.png"&gt;

  &lt;!-- Open Graph (Facebook, WhatsApp, LinkedIn previews) --&gt;
  &lt;meta property="og:title" content="WasteGo — Waste Collection Made Easy"&gt;
  &lt;meta property="og:description" content="Book a waste pickup in Accra in 30 seconds."&gt;
  &lt;meta property="og:image" content="https://wastego.gh/og-image.jpg"&gt;
  &lt;meta property="og:url" content="https://wastego.gh"&gt;
  &lt;meta property="og:type" content="website"&gt;

  &lt;!-- Twitter/X Cards --&gt;
  &lt;meta name="twitter:card" content="summary_large_image"&gt;
  &lt;meta name="twitter:title" content="WasteGo — Waste Collection Made Easy"&gt;
  &lt;meta name="twitter:image" content="https://wastego.gh/og-image.jpg"&gt;

  &lt;!-- PWA Manifest --&gt;
  &lt;link rel="manifest" href="/manifest.json"&gt;
  &lt;meta name="theme-color" content="#00ff88"&gt;
&lt;/head&gt;</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">📊 Structured Data (JSON-LD)</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>&lt;script type="application/ld+json"&gt;
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "WasteGo Ghana",
  "description": "On-demand waste collection in Ghana",
  "url": "https://wastego.gh",
  "telephone": "+233244000000",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Accra",
    "addressCountry": "GH"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 5.6037,
    "longitude": -0.1870
  },
  "openingHours": "Mo-Fr 06:00-20:00",
  "priceRange": "GHS 5-50"
}
&lt;/script&gt;</code></pre>
        </div>
        <p class="text-gray-300 mt-3">Structured data gives Google rich result features — star ratings, address panels, FAQ dropdowns in search results. It's free SEO juice.</p>
      </div>

      <div class="bg-green-500/10 p-6 rounded-xl">
        <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
        <p class="text-gray-300">Add a complete &lt;head&gt; section to your portfolio with: a keyword-rich title, meta description, viewport tag, canonical URL, Open Graph tags with a real OG image URL, Twitter card tags, a favicon link, and a JSON-LD schema for "Person" with your name, url, and job title. Test the OG tags at opengraph.xyz.</p>
      </div>
    </div>`,
    [
      { question: 'What is the ideal character length for a page <title> tag for SEO?', options: ['20-30 characters', '50-60 characters', '100-120 characters', 'No limit'], correct: 1 },
      { question: 'What does the viewport meta tag do?', options: ['Sets the browser window size', 'Controls how the page scales on mobile devices', 'Loads different CSS for mobile', 'Defines the page resolution'], correct: 1 },
      { question: 'What are Open Graph meta tags used for?', options: ['Google search ranking directly', 'Controlling how pages appear when shared on social media', 'Setting page permissions', 'Defining page animations'], correct: 1 },
      { question: 'What does a canonical URL tag prevent?', options: ['Duplicate content penalties from multiple URLs serving the same content', 'Broken links', 'Slow page loads', 'Cookie tracking'], correct: 0 },
      { question: 'What is JSON-LD used for in HTML?', options: ['Styling pages with JSON data', 'Providing structured data about a page to search engines for rich results', 'Loading JavaScript modules', 'Configuring server responses'], correct: 1 },
      { question: 'What meta robots value prevents a page from appearing in search results?', options: ['robots: hide', 'noindex, nofollow', 'private: true', 'crawl: no'], correct: 1 },
      { question: 'What does the theme-color meta tag do?', options: ['Changes the page background', 'Sets the browser UI color on mobile (address bar, task switcher)', 'Applies a color theme to all elements', 'Sets a brand color variable'], correct: 1 },
      { question: 'Which element is most important for on-page SEO?', options: ['<meta name="keywords">', '<title>', '<h6>', '<meta name="author">'], correct: 1 }
    ],
    50,
    'https://www.youtube.com/embed/qPn0klJ0bao'
  ),

  // ── Lesson 10 ──
  lesson(
    '10. Final HTML Project: Build a Full Portfolio Website',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-orange-400 mb-2">🏆 Final Project Brief</h2>
        <p class="text-gray-300">You've learned everything. Now you will build a complete, production-quality portfolio website from scratch — applying every concept from this course.</p>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">📋 Full Requirements Checklist</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-black/60 p-4 rounded-lg">
            <p class="text-orange-400 font-semibold mb-2">Structure</p>
            <ul class="text-gray-300 text-sm space-y-1 list-disc list-inside">
              <li>Valid HTML5 boilerplate with all meta tags</li>
              <li>Full SEO head (title, description, OG tags, JSON-LD)</li>
              <li>Semantic layout: header, nav, main, sections, aside, footer</li>
              <li>Skip-to-content link for keyboard users</li>
            </ul>
          </div>
          <div class="bg-black/60 p-4 rounded-lg">
            <p class="text-purple-400 font-semibold mb-2">Content Sections</p>
            <ul class="text-gray-300 text-sm space-y-1 list-disc list-inside">
              <li>Hero section with your name, role, and CTA</li>
              <li>About section with a &lt;figure&gt; photo and bio</li>
              <li>Skills section using a definition list</li>
              <li>Projects section with 3+ project cards (image, title, desc, links)</li>
              <li>Timeline using ordered list</li>
              <li>FAQ using &lt;details&gt;/&lt;summary&gt;</li>
              <li>Contact form (all inputs, validation, file upload)</li>
            </ul>
          </div>
          <div class="bg-black/60 p-4 rounded-lg">
            <p class="text-cyan-400 font-semibold mb-2">Technical Requirements</p>
            <ul class="text-gray-300 text-sm space-y-1 list-disc list-inside">
              <li>All images: proper alt text, width/height, figure/figcaption</li>
              <li>Responsive images with srcset for hero image</li>
              <li>Embedded video (YouTube iframe) in projects</li>
              <li>Navigation with anchor links to all sections</li>
              <li>mailto and tel links in contact section</li>
              <li>localStorage: remember visitor's name</li>
              <li>Geolocation API: display visitor's city</li>
            </ul>
          </div>
          <div class="bg-black/60 p-4 rounded-lg">
            <p class="text-green-400 font-semibold mb-2">Accessibility & Validation</p>
            <ul class="text-gray-300 text-sm space-y-1 list-disc list-inside">
              <li>WAVE checker: zero errors</li>
              <li>W3C validator: valid HTML</li>
              <li>All form labels properly linked</li>
              <li>ARIA labels on icon-only buttons</li>
              <li>Full keyboard navigation working</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🚀 Deployment</h2>
        <ol class="list-decimal list-inside text-gray-300 space-y-2">
          <li>Create a GitHub account and a new repository called <code class="text-yellow-400">portfolio</code></li>
          <li>Upload all your files</li>
          <li>Go to Settings → Pages → Source: main branch</li>
          <li>Your site is live at <code class="text-yellow-400">yourusername.github.io/portfolio</code></li>
          <li>Share the live URL — that's your first deployed website!</li>
        </ol>
      </div>

      <div class="bg-yellow-500/10 p-4 rounded-lg">
        <p class="text-yellow-300">🎓 <strong>You have mastered HTML.</strong> Every tag, every attribute, accessibility, SEO, and browser APIs. You are now ready for CSS — where your pages go from structured to stunning.</p>
      </div>
    </div>`,
    [
      { question: 'What is the recommended first step when creating a new HTML project?', options: ['Start writing content', 'Set up the HTML5 boilerplate with proper meta tags', 'Link the CSS file', 'Open the browser'], correct: 1 },
      { question: 'Why should images always have explicit width and height attributes?', options: ['For SEO keywords', 'To prevent layout shift (CLS) while the image loads', 'To make images resize automatically', 'It is a HTML5 requirement'], correct: 1 },
      { question: 'Which semantic tag best represents an individual project card?', options: ['<div class="card">', '<section>', '<article>', '<card>'], correct: 2 },
      { question: 'What tool can you use to host a portfolio for free?', options: ['Only paid hosting works', 'GitHub Pages', 'You need a server', 'Only Netlify'], correct: 1 },
      { question: 'What is the purpose of a skip-to-content link?', options: ['Skips loading slow content', 'Allows keyboard users to bypass the navigation menu', 'Skips to the last viewed section', 'Loads the page faster'], correct: 1 },
      { question: 'Why should you validate your HTML with the W3C validator?', options: ['Google requires it', 'It catches structural errors that cause inconsistent browser rendering', 'It automatically fixes bugs', 'It compresses your HTML'], correct: 1 },
      { question: 'What does the WAVE tool check?', options: ['Page speed', 'Web accessibility errors', 'HTML validation', 'CSS errors'], correct: 1 },
      { question: 'After completing this HTML course, what is the best next step?', options: ['Learn PHP immediately', 'Learn CSS to style your HTML pages', 'Skip to React', 'Learn SQL first'], correct: 1 }
    ],
    100,
    'https://www.youtube.com/embed/mJgBOIoGihA'
  )
];

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
}
await htmlCourse.save();
console.log(`✅ HTML: added ${htmlLessons.length} lessons`);

console.log(' Html Lessons seeded successfully.');

// ─────────────────────────────────────────────
//  CSS LESSONS
// ─────────────────────────────────────────────
const cssLessons = [
  lesson(
    '1. CSS Fundamentals: Selectors, Properties & The Cascade',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-purple-400 mb-2">📖 What You Will Learn</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li>What CSS is and how it connects to HTML</li>
          <li>Inline, internal, and external stylesheets</li>
          <li>Element, class, ID, and attribute selectors</li>
          <li>Specificity — why one rule beats another</li>
          <li>The cascade, inheritance, and the C in CSS</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🎨 Three Ways to Add CSS</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>&lt;!-- 1. Inline (avoid — hard to maintain) --&gt;
&lt;p style="color: red; font-size: 18px;"&gt;Red text&lt;/p&gt;

&lt;!-- 2. Internal (OK for demos, not for real projects) --&gt;
&lt;style&gt;
  p { color: blue; }
&lt;/style&gt;

&lt;!-- 3. External (always use this) --&gt;
&lt;link rel="stylesheet" href="styles.css"&gt;

/* styles.css */
p {
  color: #333;
  font-size: 1rem;
  line-height: 1.6;
}</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🎯 Selectors — Targeting HTML Elements</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>/* Element selector */
h1 { color: orange; }

/* Class selector (reusable) */
.btn { padding: 12px 24px; border-radius: 8px; }
.btn-primary { background: #00ff88; }

/* ID selector (unique per page) */
#hero { background: #0a0a0a; min-height: 100vh; }

/* Descendant combinator */
nav a { text-decoration: none; }  /* any <a> inside <nav> */

/* Child combinator */
ul > li { margin-bottom: 8px; }  /* direct children only */

/* Adjacent sibling */
h2 + p { font-size: 1.2rem; }  /* <p> immediately after <h2> */

/* Attribute selectors */
input[type="email"] { border-color: blue; }
a[href^="https"] { color: green; }   /* href starts with https */
a[href$=".pdf"] { color: red; }     /* href ends with .pdf */
a[href*="wastego"] { font-weight: bold; } /* href contains wastego */

/* Pseudo-classes */
a:hover { color: #00ff88; }
input:focus { outline: 2px solid #00ff88; }
li:first-child { font-weight: bold; }
li:last-child { border-bottom: none; }
li:nth-child(2n) { background: #1a1a1a; }   /* even rows */
p:not(.intro) { color: #666; }              /* not .intro */

/* Pseudo-elements */
p::first-line { font-weight: bold; }
p::before { content: "→ "; color: orange; }
p::after  { content: " ←"; color: orange; }
::selection { background: #00ff88; color: black; }

/* Universal selector */
* { box-sizing: border-box; margin: 0; padding: 0; }</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">⚖️ Specificity — Who Wins?</h2>
        <p class="text-gray-300 mb-3">When two rules target the same element, specificity determines which wins. Think of it as a 4-part score: (Inline, IDs, Classes, Elements)</p>
        <div class="bg-black/60 rounded-xl p-4 overflow-x-auto">
          <pre class="text-green-400 text-sm"><code>p              →  (0, 0, 0, 1)  — lowest
.text          →  (0, 0, 1, 0)
p.text         →  (0, 0, 1, 1)
#main          →  (0, 1, 0, 0)
#main .text    →  (0, 1, 1, 0)
style=""       →  (1, 0, 0, 0)  — highest
!important     →  Nuclear option — avoid it</code></pre>
        </div>
      </div>

      <div class="bg-green-500/10 p-6 rounded-xl">
        <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
        <p class="text-gray-300">Create a stylesheet and style a page with: element selectors for all headings, class selectors for buttons and cards, ID selector for the hero section. Use at least 3 pseudo-classes (:hover, :focus, :nth-child) and one pseudo-element (::before). Calculate the specificity of 5 of your rules and write it in a CSS comment.</p>
      </div>
    </div>`,
    [
      { question: 'Which method of applying CSS is best for production projects?', options: ['Inline styles', 'Internal <style> tag', 'External stylesheet linked with <link>', 'JavaScript-injected styles'], correct: 2 },
      { question: 'What is CSS specificity?', options: ['The order rules appear in the file', 'A scoring system that determines which CSS rule applies when multiple rules target the same element', 'How fast CSS is applied', 'The number of properties in a rule'], correct: 1 },
      { question: 'Which selector has the highest specificity?', options: ['Element selector', 'Class selector', 'ID selector', 'Inline style'], correct: 3 },
      { question: 'What does the > combinator select?', options: ['All descendants', 'Only direct children', 'Adjacent siblings', 'All siblings'], correct: 1 },
      { question: 'What does the :nth-child(2n) pseudo-class select?', options: ['Every second element', 'Every even-numbered element', 'The second child only', 'Children with class "2n"'], correct: 1 },
      { question: 'What is the purpose of * { box-sizing: border-box; }?', options: ['Makes all elements square', 'Includes padding and border in the element\'s total width/height calculation', 'Removes all margins', 'Sets default fonts'], correct: 1 },
      { question: 'What does the ::before pseudo-element do?', options: ['Selects the element before in the DOM', 'Inserts content before the element\'s content (without adding HTML)', 'Styles the first character', 'Adds a hover effect'], correct: 1 },
      { question: 'What does !important do in CSS and why should you avoid it?', options: ['Makes the rule load faster', 'Overrides all other rules regardless of specificity, making debugging very difficult', 'Marks a rule as optional', 'Applies the rule to all elements'], correct: 1 }
    ],
    50,
    'https://www.youtube.com/embed/1PnVor36_40'
  ),

  lesson(
    '2. The Box Model: Margin, Border, Padding & Display',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-purple-400 mb-2">📖 What You Will Learn</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li>The CSS box model — content, padding, border, margin</li>
          <li>box-sizing: border-box and why it's essential</li>
          <li>Display values: block, inline, inline-block, none</li>
          <li>Shorthand properties for efficient CSS</li>
          <li>Margin collapse — the most confusing CSS behaviour</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">📦 The Box Model</h2>
        <p class="text-gray-300 mb-3">Every single element on a page is a rectangle. Every rectangle has four layers:</p>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>.card {
  /* CONTENT — width/height applies here */
  width: 300px;
  height: 200px;

  /* PADDING — space INSIDE the border (part of the element) */
  padding-top: 16px;
  padding-right: 24px;
  padding-bottom: 16px;
  padding-left: 24px;
  padding: 16px 24px;            /* shorthand: top/bottom left/right */
  padding: 16px 24px 12px 20px; /* top right bottom left (clockwise) */

  /* BORDER — the element's edge */
  border-width: 2px;
  border-style: solid;           /* solid, dashed, dotted, double, none */
  border-color: #00ff88;
  border: 2px solid #00ff88;     /* shorthand */
  border-radius: 12px;           /* rounded corners */
  border-radius: 50%;            /* perfect circle (when width = height) */

  /* MARGIN — space OUTSIDE the border (between elements) */
  margin: 24px auto;             /* center horizontally + 24px top/bottom */

  /* CRITICAL: border-box makes width/height include padding and border */
  box-sizing: border-box;
  /* Without it: final width = 300 + 48 (padding) + 4 (border) = 352px */
  /* With it: final width = 300px exactly */
}

/* Apply border-box to everything — the golden rule */
*, *::before, *::after {
  box-sizing: border-box;
}</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🖥️ Display Property</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>display: block;        /* Full width, starts on new line: div, p, h1 */
display: inline;       /* Flows in text, width/height ignored: span, a, em */
display: inline-block; /* Flows in text BUT accepts width/height and margin */
display: none;         /* Completely removed from layout (not just invisible) */
display: flex;         /* Flexbox container (next lesson) */
display: grid;         /* Grid container */

/* visibility: hidden vs display: none */
visibility: hidden;  /* Invisible but STILL takes up space */
display: none;       /* Invisible AND takes up NO space */

/* opacity: 0 */
opacity: 0;          /* Invisible but takes space AND still captures clicks */</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🤯 Margin Collapse</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>/* Two vertical margins touching collapse into the LARGER of the two */
.paragraph-1 { margin-bottom: 32px; }
.paragraph-2 { margin-top: 20px; }
/* Gap between them = 32px (not 52px) — this is margin collapse */

/* Margin collapse does NOT happen with: */
/* - Flexbox or Grid containers */
/* - Elements with padding or border between them */
/* - Horizontal margins */</code></pre>
        </div>
      </div>

      <div class="bg-green-500/10 p-6 rounded-xl">
        <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
        <p class="text-gray-300">Build a "Product Card" component with exact dimensions. The card should be 320px wide, have 24px padding, a 1px border, and 16px border-radius. Center it on the page with auto margins. Inside: an image (full width), title (h3), description (p), and a button. Use the browser DevTools to inspect the box model of each element.</p>
      </div>
    </div>`,
    [
      { question: 'What are the four layers of the CSS box model from inside to outside?', options: ['Content, margin, border, padding', 'Content, padding, border, margin', 'Padding, content, border, margin', 'Border, padding, content, margin'], correct: 1 },
      { question: 'What does box-sizing: border-box do?', options: ['Adds a border to all boxes', 'Makes width and height include padding and border in the calculation', 'Removes the default padding and margin', 'Makes all elements the same size'], correct: 1 },
      { question: 'What is the shorthand for padding: 16px top/bottom and 24px left/right?', options: ['padding: 24px 16px', 'padding: 16px 24px', 'padding: 16 24', 'padding: top 16px side 24px'], correct: 1 },
      { question: 'What is the difference between display: none and visibility: hidden?', options: ['They are identical', 'display:none removes the element from layout; visibility:hidden hides it but keeps its space', 'visibility:hidden is for screen readers', 'display:none is for images only'], correct: 1 },
      { question: 'How do you center a block element horizontally with CSS?', options: ['text-align: center', 'margin: auto', 'margin-left: auto; margin-right: auto (with a set width)', 'align: center'], correct: 2 },
      { question: 'What is margin collapse?', options: ['When margins get deleted', 'When adjacent vertical margins combine to become the size of the larger margin', 'When margin becomes negative', 'When padding overrides margin'], correct: 1 },
      { question: 'What display value allows an element to sit inline but still respect width and height?', options: ['block', 'inline', 'inline-block', 'flex'], correct: 2 },
      { question: 'What does border-radius: 50% create when applied to a square element?', options: ['A rounded rectangle', 'A perfect circle', 'An oval', 'A triangle'], correct: 1 }
    ],
    50,
    'https://www.youtube.com/embed/rIO5326FgPE'
  ),

  lesson(
    '3. Colors, Typography & CSS Variables',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-purple-400 mb-2">📖 What You Will Learn</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li>All CSS color formats: named, hex, rgb, hsl, oklch</li>
          <li>Typography: font families, sizes, weights, line-height</li>
          <li>Loading Google Fonts properly</li>
          <li>CSS Custom Properties (variables) for design systems</li>
          <li>Building a complete color and type theme</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🎨 Color Formats</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>/* Named colors (limited, avoid for brand colors) */
color: tomato;
color: steelblue;

/* Hex (most common) */
color: #ff6b35;          /* 6-digit: #RRGGBB */
color: #f63;             /* 3-digit shorthand for #ff6633 */
color: #ff6b3599;        /* 8-digit: #RRGGBBAA (last 2 = alpha) */

/* RGB and RGBA */
color: rgb(255, 107, 53);
color: rgba(255, 107, 53, 0.8);  /* 0.0 transparent → 1.0 opaque */

/* HSL (most intuitive for designers: Hue, Saturation, Lightness) */
color: hsl(16, 100%, 60%);       /* hue: 0-360°, sat: 0-100%, light: 0-100% */
color: hsl(16 100% 60% / 0.8);  /* modern syntax with alpha */

/* OKLCH (most modern, perceptually uniform — great for design tokens) */
color: oklch(70% 0.2 30);        /* lightness, chroma, hue */

/* CSS Color Level 4 — mixing colors */
color: color-mix(in oklch, #ff6b35 60%, white);</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">✍️ Typography</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>/* Load Google Fonts — always in <head> BEFORE your stylesheet */
/* &lt;link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet"&gt; */

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 16px;        /* base: browser default is 16px */
  font-weight: 400;       /* 100-900, or: normal=400, bold=700 */
  line-height: 1.6;       /* unitless! 1.6 × font-size. Best for readability */
  color: #e0e0e0;
  letter-spacing: 0.01em;
}

h1, h2, h3 {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  line-height: 1.2;       /* tighter for headings */
  letter-spacing: -0.02em; /* slight negative tracking looks premium */
}

/* Fluid typography — scales with viewport */
h1 {
  font-size: clamp(2rem, 5vw, 4rem);
  /* minimum 32px, scales with vw, maximum 64px */
}

/* Font size units */
font-size: 16px;    /* absolute */
font-size: 1rem;    /* relative to root (html) font size — prefer this */
font-size: 1.2em;   /* relative to parent — compounds, use carefully */

/* Text properties */
text-align: center | left | right | justify;
text-transform: uppercase | lowercase | capitalize;
text-decoration: underline | none | line-through;
text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
word-spacing: 0.1em;
white-space: nowrap;      /* prevent text wrapping */
overflow: hidden;
text-overflow: ellipsis;  /* add "..." when text overflows */</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🔧 CSS Custom Properties (Variables)</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>/* Define variables on :root for global access */
:root {
  /* Colors */
  --color-primary: #00ff88;
  --color-primary-dark: oklch(from var(--color-primary) calc(l - 0.2) c h);
  --color-bg: #0a0a0a;
  --color-surface: #141414;
  --color-text: #e0e0e0;
  --color-muted: #666;
  --color-danger: #ff4d4f;
  --color-success: #00ff88;

  /* Typography */
  --font-heading: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;

  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.3);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.4);
  --shadow-glow: 0 0 24px rgba(0, 255, 136, 0.3);

  /* Transitions */
  --transition: 200ms ease;
}

/* Using variables */
.btn-primary {
  background: var(--color-primary);
  color: var(--color-bg);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-full);
  font-family: var(--font-heading);
  transition: all var(--transition);
  box-shadow: var(--shadow-glow);
}

/* Dark/Light theme toggle */
[data-theme="light"] {
  --color-bg: #ffffff;
  --color-text: #1a1a1a;
}</code></pre>
        </div>
      </div>

      <div class="bg-green-500/10 p-6 rounded-xl">
        <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
        <p class="text-gray-300">Create a complete design system in CSS variables. Define: 10 color tokens (primary, secondary, backgrounds, text, borders, states), 6 typography tokens, 8 spacing tokens. Apply them to build a styled card component and a navigation bar. Add a toggle button that switches between dark and light themes by changing a data-theme attribute on the body.</p>
      </div>
    </div>`,
    [
      { question: 'Which color format is most useful for creating design systems with easy lightness control?', options: ['Hex', 'RGB', 'HSL or OKLCH', 'Named colors'], correct: 2 },
      { question: 'What unit should you prefer for font sizes in CSS and why?', options: ['px, for pixel-perfect control', 'rem, as it scales with the user\'s browser font preference', 'em, as it is always relative to body', 'vw, for responsive text'], correct: 1 },
      { question: 'What line-height value is generally recommended for body text readability?', options: ['1.0', '1.6', '2.5', '12px'], correct: 1 },
      { question: 'Where should CSS Custom Properties (variables) be defined for global scope?', options: ['Inside .body {}', 'Inside :root {}', 'Inside * {}', 'Inside html {}'], correct: 1 },
      { question: 'What does clamp(2rem, 5vw, 4rem) do for font-size?', options: ['Sets font-size to 5vw always', 'Sets a minimum of 2rem, scales with viewport, maximum of 4rem', 'Clamps the element width', 'Applies to clamp() at 5% viewport'], correct: 1 },
      { question: 'How do you use a CSS variable?', options: ['$(--variable-name)', 'var(--variable-name)', '@variable-name', '#variable-name'], correct: 1 },
      { question: 'What does text-overflow: ellipsis do?', options: ['Removes overflow text', 'Adds ... when text overflows its container', 'Wraps text to next line', 'Centers overflow text'], correct: 1 },
      { question: 'What is the advantage of using unitless line-height (e.g. 1.6 vs 1.6em)?', options: ['It is faster to compute', 'It scales proportionally with the element\'s font-size without inheritance issues', 'It works in more browsers', 'It is the only valid syntax'], correct: 1 }
    ],
    50,
    'https://www.youtube.com/embed/OXGznpKZ_sA'
  ),

  lesson(
    '4. Flexbox: One-Dimensional Layouts',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-purple-400 mb-2">📖 What You Will Learn</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li>Flex container vs flex items</li>
          <li>flex-direction, flex-wrap, flex-flow</li>
          <li>justify-content — main axis alignment</li>
          <li>align-items and align-content — cross axis alignment</li>
          <li>flex-grow, flex-shrink, flex-basis on items</li>
          <li>Real-world patterns: navbar, card row, centering anything</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🧩 Flexbox Complete Reference</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>/* ── CONTAINER PROPERTIES ── */
.container {
  display: flex;           /* activate flexbox */
  display: inline-flex;    /* inline flex container */

  /* Direction of the main axis */
  flex-direction: row;            /* → default, left to right */
  flex-direction: row-reverse;    /* ← right to left */
  flex-direction: column;         /* ↓ top to bottom */
  flex-direction: column-reverse; /* ↑ bottom to top */

  /* Wrapping */
  flex-wrap: nowrap;    /* default — all on one line, may overflow */
  flex-wrap: wrap;      /* items wrap to new lines */
  flex-wrap: wrap-reverse;

  /* Shorthand */
  flex-flow: row wrap;

  /* MAIN AXIS alignment (justify) */
  justify-content: flex-start;    /* pack to start */
  justify-content: flex-end;      /* pack to end */
  justify-content: center;        /* center all items */
  justify-content: space-between; /* equal space BETWEEN items */
  justify-content: space-around;  /* equal space AROUND items */
  justify-content: space-evenly;  /* equal space between AND at edges */

  /* CROSS AXIS alignment (align) */
  align-items: stretch;     /* default — items fill container height */
  align-items: flex-start;  /* align to top of cross axis */
  align-items: flex-end;    /* align to bottom */
  align-items: center;      /* vertically center */
  align-items: baseline;    /* align by text baseline */

  /* Multi-line cross-axis alignment */
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;

  gap: 16px;              /* gap between flex items */
  gap: 16px 24px;         /* row-gap column-gap */
}

/* ── ITEM PROPERTIES ── */
.item {
  /* flex-grow: how much does this item grow relative to siblings? */
  flex-grow: 0;   /* default — don't grow */
  flex-grow: 1;   /* grow to fill available space */
  flex-grow: 2;   /* grow twice as much as flex-grow: 1 siblings */

  /* flex-shrink: how much can this item shrink? */
  flex-shrink: 1; /* default — can shrink */
  flex-shrink: 0; /* never shrink (useful for fixed-size items) */

  /* flex-basis: initial size before grow/shrink */
  flex-basis: auto;    /* use content size */
  flex-basis: 200px;
  flex-basis: 33.333%;

  /* Shorthand: grow shrink basis */
  flex: 0 1 auto;      /* default */
  flex: 1;             /* flex: 1 1 0 — grow, shrink, start at 0 */
  flex: 1 0 200px;     /* grow, don't shrink, start at 200px */

  /* Override alignment for this specific item */
  align-self: center;
  align-self: flex-start;

  /* Control display order (visual only, not DOM) */
  order: 2;  /* default is 0 */
  order: -1; /* move to front */
}</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🌟 Real Patterns</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>/* Perfect centering — any element in a container */
.center-anything {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Full-height centering */
.full-page-center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* Navigation bar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
}

/* Card row — equal-width cards that wrap */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}
.card { flex: 1 1 280px; }  /* min 280px, grow equally */

/* Holy Grail layout (header, sidebar, main, sidebar, footer) */
.layout { display: flex; flex-direction: column; min-height: 100vh; }
.layout-body { display: flex; flex: 1; }
.sidebar { flex: 0 0 250px; }   /* fixed width, never shrink */
.main { flex: 1; }              /* fill remaining space */
footer { margin-top: auto; }   /* push to bottom */</code></pre>
        </div>
      </div>

      <div class="bg-green-500/10 p-6 rounded-xl">
        <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
        <p class="text-gray-300">Build these 4 layouts using only Flexbox: (1) A sticky navbar with logo left and nav links right. (2) A hero section with centered text and two buttons side-by-side. (3) A row of 3 equal cards that wrap on small screens. (4) A sidebar + main content layout where sidebar is fixed at 250px and content fills the rest. No CSS Grid allowed — Flexbox only.</p>
      </div>
    </div>`,
    [
      { question: 'What CSS property enables Flexbox on a container?', options: ['flex: 1', 'display: flex', 'flex-layout: true', 'position: flex'], correct: 1 },
      { question: 'What does justify-content control in a flex container?', options: ['Cross-axis alignment', 'Main-axis alignment of items', 'The direction of flex', 'Individual item alignment'], correct: 1 },
      { question: 'How do you perfectly center an element both horizontally and vertically?', options: ['margin: auto', 'display:flex; justify-content:center; align-items:center', 'position:absolute; top:50%; left:50%', 'text-align:center; vertical-align:middle'], correct: 1 },
      { question: 'What does flex: 1 mean?', options: ['The item is 1px wide', 'flex-grow:1, flex-shrink:1, flex-basis:0 — the item grows to fill space', 'The item is at position 1', 'flex-direction: 1'], correct: 1 },
      { question: 'What does flex-wrap: wrap do?', options: ['Adds text wrapping to flex items', 'Allows flex items to wrap onto multiple lines when they overflow', 'Wraps the container in a border', 'Enables word wrapping inside items'], correct: 1 },
      { question: 'What does align-self: center do on a flex item?', options: ['Centers the item on the main axis', 'Overrides align-items for that specific item, centering it on the cross axis', 'Centers the text inside the item', 'Same as justify-self'], correct: 1 },
      { question: 'What does flex-shrink: 0 do?', options: ['Prevents the item from growing', 'Prevents the item from shrinking below its flex-basis', 'Sets item order to 0', 'Removes the item from flex flow'], correct: 1 },
      { question: 'What property controls the gap between flex items?', options: ['margin', 'padding', 'gap', 'spacing'], correct: 2 }
    ],
    50,
    'https://www.youtube.com/embed/u044iM9xsWU'
  ),

  lesson(
    '5. CSS Grid: Two-Dimensional Layouts',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-purple-400 mb-2">📖 What You Will Learn</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li>grid-template-columns and grid-template-rows</li>
          <li>The fr unit and auto-fill/auto-fit</li>
          <li>grid-column and grid-row for item placement</li>
          <li>grid-template-areas for named layouts</li>
          <li>Responsive grids without media queries</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🔲 CSS Grid Complete Reference</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>/* ── CONTAINER ── */
.grid {
  display: grid;

  /* Define columns */
  grid-template-columns: 200px 1fr 2fr;      /* 3 columns: fixed, 1 fraction, 2 fractions */
  grid-template-columns: repeat(3, 1fr);     /* 3 equal columns */
  grid-template-columns: repeat(4, minmax(200px, 1fr)); /* min 200px, max equal */

  /* Responsive — no media queries needed! */
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  /* auto-fill: creates as many tracks as fit; fills empty tracks */
  /* auto-fit: same but collapses empty tracks */

  /* Define rows */
  grid-template-rows: 80px 1fr auto;

  /* Gaps */
  column-gap: 24px;
  row-gap: 32px;
  gap: 32px 24px;   /* row-gap column-gap */

  /* Alignment of all items */
  justify-items: start | end | center | stretch;   /* in their cell */
  align-items: start | end | center | stretch;
  place-items: center;   /* shorthand: align-items justify-items */

  /* Alignment of the grid inside the container */
  justify-content: start | end | center | space-between;
  align-content: start | end | center | space-between;
}

/* ── ITEMS ── */
.item {
  /* Column span: grid-column: start / end (1-indexed, or span N) */
  grid-column: 1 / 3;       /* from column line 1 to 3 (spans 2 columns) */
  grid-column: 1 / -1;      /* from first to last line (full width) */
  grid-column: span 2;      /* span 2 columns from current position */
  grid-column: 2 / span 3;  /* start at 2, span 3 */

  grid-row: 1 / 3;          /* span 2 rows */

  /* Shorthand */
  grid-area: 1 / 1 / 3 / 4; /* row-start / col-start / row-end / col-end */

  /* Override alignment for this item */
  justify-self: center;
  align-self: end;
  place-self: center end;
}

/* ── NAMED AREAS — the most readable approach ── */
.page {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main    main"
    "sidebar aside   aside"
    "footer  footer  footer";
  grid-template-columns: 250px 1fr 1fr;
  grid-template-rows: 80px 1fr 200px 60px;
  min-height: 100vh;
  gap: 16px;
}

.page-header  { grid-area: header; }
.page-sidebar { grid-area: sidebar; }
.page-main    { grid-area: main; }
.page-aside   { grid-area: aside; }
.page-footer  { grid-area: footer; }</code></pre>
        </div>
      </div>

      <div class="bg-green-500/10 p-6 rounded-xl">
        <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
        <p class="text-gray-300">Build these layouts: (1) A fully responsive image gallery: repeat(auto-fill, minmax(250px, 1fr)) — no media queries. (2) A magazine layout with a featured article that spans 2 columns and 2 rows, with 3 smaller articles beside and below it. (3) The WasteGo admin dashboard layout using grid-template-areas: header, sidebar, stats section, and main content table.</p>
      </div>
    </div>`,
    [
      { question: 'What does the fr unit in CSS Grid represent?', options: ['Frames per second', 'A fractional unit of the remaining available space', 'Font ratio', 'Fixed ratio'], correct: 1 },
      { question: 'What does repeat(auto-fill, minmax(250px, 1fr)) do?', options: ['Creates exactly 4 columns', 'Creates as many columns as fit, each at least 250px, growing equally to fill space', 'Fills the grid with auto height rows', 'Repeats a pattern 250 times'], correct: 1 },
      { question: 'What does grid-column: 1 / -1 do?', options: ['Spans from line 1 to the second-to-last line', 'Spans from the first to the last column line (full width)', 'Sets negative margin', 'Removes the item from the grid'], correct: 1 },
      { question: 'What is the advantage of using grid-template-areas?', options: ['Better performance', 'Visual, readable ASCII-art style layout definition that names each area', 'It is required for grid to work', 'Automatically makes layouts responsive'], correct: 1 },
      { question: 'What is the difference between auto-fill and auto-fit in repeat()?', options: ['They are identical', 'auto-fill preserves empty tracks; auto-fit collapses them so items stretch', 'auto-fit is for columns; auto-fill is for rows', 'auto-fill is deprecated'], correct: 1 },
      { question: 'What does place-items: center do?', options: ['Centers the grid on the page', 'Sets both align-items and justify-items to center', 'Centers text in all grid cells', 'Places items at center of grid tracks only'], correct: 1 },
      { question: 'When should you use CSS Grid over Flexbox?', options: ['Always use Grid, never Flexbox', 'Grid for two-dimensional layouts; Flexbox for one-dimensional (row or column)', 'Flexbox is always better', 'They cannot be used together'], correct: 1 },
      { question: 'What does grid-row: span 2 do on a grid item?', options: ['Sets the item\'s height to 2rem', 'Makes the item span across 2 row tracks', 'Moves item to row 2', 'Creates 2 new rows'], correct: 1 }
    ],
    50,
    'https://www.youtube.com/embed/EiNiSFIPIQE'
  ),

  lesson(
    '6. Responsive Design & Media Queries',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-purple-400 mb-2">📖 What You Will Learn</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li>Mobile-first design philosophy</li>
          <li>Media queries: min-width, max-width, prefers-color-scheme</li>
          <li>Responsive images and typography</li>
          <li>Container queries — the future of responsive</li>
          <li>Building fully responsive layouts from scratch</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">📱 Mobile-First Approach</h2>
        <p class="text-gray-300 mb-3">Write your base CSS for mobile. Then <em>add</em> complexity for larger screens. This produces smaller, cleaner stylesheets and better performance on mobile networks (which your Ghanaian users rely on heavily).</p>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>/* ── MOBILE FIRST ── */

/* Base styles: mobile (no media query needed) */
.card-grid {
  display: grid;
  grid-template-columns: 1fr;     /* single column */
  gap: 16px;
}

.navbar {
  flex-direction: column;
  gap: 16px;
}

h1 { font-size: clamp(1.8rem, 5vw, 3.5rem); }

/* ── MEDIA QUERIES ── */

/* Tablet: 600px+ */
@media (min-width: 600px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .navbar { flex-direction: row; }
}

/* Desktop: 900px+ */
@media (min-width: 900px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
}

/* Large desktop: 1200px+ */
@media (min-width: 1200px) {
  .container { max-width: 1200px; margin: 0 auto; }
}

/* ── OTHER MEDIA FEATURES ── */

/* Dark mode preference */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #0a0a0a;
    --color-text: #e0e0e0;
  }
}

/* Reduced motion (respect user's system setting) */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* Print styles */
@media print {
  .navbar, .sidebar, .ads { display: none; }
  body { font-size: 12pt; color: black; }
}

/* High-resolution screens (retina) */
@media (min-resolution: 2dppx) {
  .logo { background-image: url('logo@2x.png'); }
}

/* ── CONTAINER QUERIES (modern) ── */
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card { flex-direction: row; }  /* Respond to CONTAINER size, not viewport */
}</code></pre>
        </div>
      </div>

      <div class="bg-green-500/10 p-6 rounded-xl">
        <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
        <p class="text-gray-300">Take your portfolio site and make it fully responsive mobile-first. Start with single-column mobile layout. Add breakpoints at 600px (2 columns), 900px (3 columns). Make the navbar hamburger-menu on mobile (toggle with JavaScript). Add a prefers-color-scheme dark mode that inverts your color tokens. Test on Chrome DevTools mobile emulator for iPhone SE, Pixel 7, and iPad.</p>
      </div>
    </div>`,
    [
      { question: 'What does "mobile-first" CSS mean?', options: ['Building a separate mobile website', 'Writing base styles for mobile and using min-width queries to enhance for larger screens', 'Making the desktop version first then stripping features for mobile', 'Using only flexbox and no grid'], correct: 1 },
      { question: 'What does @media (prefers-color-scheme: dark) detect?', options: ['If the website has a dark theme class', 'The user\'s OS-level dark mode preference', 'If the user is in a dark room', 'If the background is darker than 50% lightness'], correct: 1 },
      { question: 'What is the viewport meta tag\'s role in responsive design?', options: ['It loads mobile CSS', 'It prevents the browser from zooming out to fit desktop content on mobile', 'It sets the maximum width', 'It enables touch events'], correct: 1 },
      { question: 'What is the difference between max-width and min-width in media queries?', options: ['They are opposite: max-width targets screens UP TO that size; min-width targets FROM that size up', 'max-width is for images; min-width is for containers', 'They are identical', 'max-width is CSS, min-width is HTML'], correct: 0 },
      { question: 'What does @media (prefers-reduced-motion: reduce) help with?', options: ['Reducing page file size', 'Disabling animations for users who have motion sensitivity settings enabled', 'Reducing CSS complexity', 'Preventing layout shifts'], correct: 1 },
      { question: 'What is a Container Query and how does it differ from a media query?', options: ['They are identical', 'Container queries respond to the size of a parent container; media queries respond to the viewport', 'Container queries only work in Grid', 'Media queries are deprecated'], correct: 1 },
      { question: 'What does max-width: 1200px; margin: 0 auto; on a .container achieve?', options: ['Hides content wider than 1200px', 'Limits content width and centers it horizontally on wide screens', 'Sets a minimum width', 'Applies only on mobile'], correct: 1 },
      { question: 'What breakpoints are commonly used in mobile-first design?', options: ['100px, 500px, 1000px', '576px (mobile), 768px (tablet), 992px/1200px (desktop)', '320px, 640px, 960px only', 'Breakpoints are not needed in modern CSS'], correct: 1 }
    ],
    50,
    'https://www.youtube.com/embed/srvUrASNj0s'
  ),

  lesson(
    '7. CSS Animations & Transitions',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-purple-400 mb-2">📖 What You Will Learn</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li>CSS transitions for smooth state changes</li>
          <li>@keyframes and animation properties</li>
          <li>Timing functions and cubic-bezier curves</li>
          <li>Transform: translate, rotate, scale, skew</li>
          <li>Performance-safe animations (transform and opacity only)</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">⚡ Transitions</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>/* Transition: property duration timing-function delay */
.btn {
  background: #00ff88;
  color: black;
  transform: scale(1);
  transition: background 200ms ease,
              transform 200ms ease,
              box-shadow 200ms ease;
}

.btn:hover {
  background: #00cc6a;
  transform: scale(1.05);
  box-shadow: 0 8px 24px rgba(0, 255, 136, 0.4);
}

/* Transition all properties (less optimal but convenient) */
.card { transition: all 300ms ease; }

/* Timing functions */
transition-timing-function: ease;         /* slow-fast-slow (default) */
transition-timing-function: linear;       /* constant speed */
transition-timing-function: ease-in;      /* starts slow */
transition-timing-function: ease-out;     /* ends slow (feels natural) */
transition-timing-function: ease-in-out;  /* slow both ends */
transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); /* spring bounce */</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🎬 @keyframes Animations</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>/* Define the animation */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0%   { transform: scale(1);    box-shadow: 0 0 0   0 rgba(0,255,136,0.4); }
  50%  { transform: scale(1.05); box-shadow: 0 0 20px 10px rgba(0,255,136,0); }
  100% { transform: scale(1);    box-shadow: 0 0 0   0 rgba(0,255,136,0); }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes shimmer {
  from { background-position: -200% center; }
  to   { background-position:  200% center; }
}

/* Apply the animation */
.hero-title {
  animation-name: fadeIn;
  animation-duration: 600ms;
  animation-timing-function: ease-out;
  animation-delay: 200ms;
  animation-fill-mode: both;  /* apply from/to styles outside animation */
}
/* Shorthand */
.hero-title { animation: fadeIn 600ms ease-out 200ms both; }

.badge { animation: pulse 2s ease-in-out infinite; }
.spinner { animation: spin 1s linear infinite; }

/* Stagger animations with delay */
.card:nth-child(1) { animation: fadeIn 500ms ease-out 0ms    both; }
.card:nth-child(2) { animation: fadeIn 500ms ease-out 100ms  both; }
.card:nth-child(3) { animation: fadeIn 500ms ease-out 200ms  both; }

/* ── TRANSFORMS ── */
.el {
  transform: translateX(100px);           /* move right */
  transform: translateY(-50%);            /* move up by 50% own height */
  transform: translate(-50%, -50%);       /* center trick */
  transform: rotate(45deg);
  transform: scale(1.2);
  transform: scale(1.2, 0.8);            /* x scale, y scale */
  transform: skew(10deg, 5deg);
  /* Chain multiple */
  transform: rotate(45deg) scale(1.5) translateX(20px);
}

/* GPU-accelerated (smooth, no repaints) — only animate these! */
/* ✅ transform, opacity */
/* ❌ Avoid animating: width, height, margin, padding, top, left */</code></pre>
        </div>
      </div>

      <div class="bg-green-500/10 p-6 rounded-xl">
        <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
        <p class="text-gray-300">Build an animated landing hero: (1) Fade in the title from below on page load. (2) Stagger-animate 3 feature cards with 100ms delays each. (3) Add a pulsing glow to the CTA button. (4) Create a loading spinner component using spin animation. (5) Add hover effects on cards (lift up with translateY and shadow). All animations must use only transform and opacity for performance.</p>
      </div>
    </div>`,
    [
      { question: 'Which CSS properties should you animate for best performance?', options: ['width and height', 'margin and padding', 'transform and opacity (GPU-accelerated, no repaints)', 'color and background-color'], correct: 2 },
      { question: 'What does animation-fill-mode: both do?', options: ['Fills the animation in both directions', 'Applies the from styles before the animation starts and to styles after it ends', 'Runs the animation both forwards and backwards', 'Both forwards and backwards fill modes'], correct: 1 },
      { question: 'What is the difference between CSS transitions and animations?', options: ['They are the same', 'Transitions react to state changes; animations run automatically on their own timeline', 'Animations require JavaScript', 'Transitions use @keyframes'], correct: 1 },
      { question: 'What does transform: translate(-50%, -50%) do when combined with position absolute?', options: ['Removes the element', 'Perfectly centers an absolute element at its anchor point', 'Moves element to top-left', 'Scales by 50%'], correct: 1 },
      { question: 'What timing function gives a natural "spring" or "bounce" feel?', options: ['linear', 'ease', 'cubic-bezier with overshoot values (e.g. cubic-bezier(0.34, 1.56, 0.64, 1))', 'ease-in'], correct: 2 },
      { question: 'What does animation-delay: 200ms do?', options: ['Slows the animation by 200ms', 'Waits 200ms before the animation starts', 'Repeats after 200ms', 'Extends animation by 200ms'], correct: 1 },
      { question: 'How do you create a continuous looping animation?', options: ['animation-repeat: forever', 'animation-iteration-count: infinite', 'animation-loop: true', 'animation-fill-mode: loop'], correct: 1 },
      { question: 'What does @keyframes define?', options: ['A JavaScript function', 'The intermediate steps (frames) of a CSS animation', 'A responsive breakpoint', 'A CSS variable animation'], correct: 1 }
    ],
    50,
    'https://www.youtube.com/embed/YszONjKpgg4'
  ),

  lesson(
    '8. Advanced CSS: Pseudo-Classes, Custom Properties & Modern Features',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-purple-400 mb-2">📖 What You Will Learn</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li>Advanced selectors: :is(), :where(), :has()</li>
          <li>CSS logical properties for international layouts</li>
          <li>Scroll snap, scroll-driven animations</li>
          <li>CSS nesting (native)</li>
          <li>Subgrid for precise alignment</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🔥 Modern CSS Selectors</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>/* :is() — group selectors with one specificity */
:is(h1, h2, h3, h4) { line-height: 1.2; color: white; }
:is(section, article, aside) > :is(h2, h3) { margin-top: 0; }

/* :where() — same as :is() but ZERO specificity (easy to override) */
:where(h1, h2, h3) { margin: 0 0 1rem; }

/* :has() — "parent selector" — select based on children! */
.card:has(img) { padding-top: 0; }  /* card with an image */
form:has(input:invalid) { border-color: red; }  /* invalid form */
li:has(+ li) { border-bottom: 1px solid #333; }  /* li with a sibling after it */
h2:has(+ p) { margin-bottom: 0.5rem; }

/* :not() with complex arguments */
a:not([href^="http"]):not([href^="#"]) { color: purple; }  /* internal links */

/* CSS Nesting (native — no preprocessor needed!) */
.card {
  background: #141414;
  padding: 24px;
  border-radius: 12px;

  & h3 { font-size: 1.25rem; margin-bottom: 8px; }  /* .card h3 */
  & p  { color: #888; line-height: 1.6; }

  &:hover {
    border-color: var(--color-primary);
    transform: translateY(-4px);
  }

  & .card__badge {
    background: var(--color-primary);
    color: black;
    padding: 4px 12px;
    border-radius: 999px;
  }
}

/* Scroll Snap */
.slider {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}
.slide {
  flex: 0 0 100%;
  scroll-snap-align: start;
}

/* Scroll-driven animations */
@keyframes reveal {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-on-scroll {
  animation: reveal linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 30%;
}</code></pre>
        </div>
      </div>

      <div class="bg-green-500/10 p-6 rounded-xl">
        <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
        <p class="text-gray-300">Refactor your portfolio CSS using modern features: Replace grouped selectors with :is(). Use :has() to style a form differently when it has invalid inputs. Refactor card styles using CSS nesting. Build an image slider with scroll-snap. Add scroll-driven reveal animations for each section. Ensure everything still works on latest Chrome, Firefox, and Safari.</p>
      </div>
    </div>`,
    [
      { question: 'What is the key difference between :is() and :where() selectors?', options: ['They are identical', ':is() takes the highest specificity of its arguments; :where() always has zero specificity', ':where() is for elements; :is() is for classes', ':is() only works in Chrome'], correct: 1 },
      { question: 'What revolutionary feature does :has() bring to CSS?', options: ['It adds JavaScript to CSS', 'It allows selecting an element based on its descendants (parent selector)', 'It improves performance', 'It replaces all other pseudo-classes'], correct: 1 },
      { question: 'What does CSS nesting with & allow you to do?', options: ['Nest media queries', 'Write related styles together, like Sass/LESS, but natively in CSS', 'Improve animation performance', 'Apply global styles'], correct: 1 },
      { question: 'What does scroll-snap-type: x mandatory do?', options: ['Locks the page from scrolling', 'Makes the scroll container snap to defined points on the X axis', 'Forces horizontal layout', 'Adds a scrollbar'], correct: 1 },
      { question: 'What does scroll-snap-align: start do on a slide?', options: ['Aligns text to start', 'Snaps the start edge of the slide to the container\'s snap port', 'Starts animation on scroll', 'Aligns the grid to start'], correct: 1 },
      { question: 'What does animation-timeline: view() enable?', options: ['Time-based animations', 'Animations driven by the element\'s visibility in the viewport as you scroll', 'Animation synced to a video', 'Multiple timeline tracks'], correct: 1 },
      { question: 'What does :not(a:not(.active)) select?', options: ['This is invalid CSS', 'All elements that are not anchor tags, or are active anchor tags', 'Only active anchors', 'Nothing'], correct: 1 },
      { question: 'What CSS feature replaced SASS/LESS variables for most use cases?', options: ['LESS variables', 'CSS Preprocessors', 'CSS Custom Properties (--variable-name)', 'JavaScript inline styles'], correct: 2 }
    ],
    50,
    'https://www.youtube.com/embed/qm0IfG1GyZU'
  ),

  lesson(
    '9. CSS Architecture: BEM, Utility Classes & Real Codebases',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-purple-400 mb-2">📖 What You Will Learn</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li>BEM naming convention: Block, Element, Modifier</li>
          <li>OOCSS and SMACSS principles</li>
          <li>Utility-first CSS (like Tailwind) vs component CSS</li>
          <li>Structuring a real CSS codebase that doesn't fall apart</li>
          <li>Critical CSS and performance optimisation</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🏗️ BEM — Block Element Modifier</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>&lt;!-- BEM HTML --&gt;
&lt;div class="card card--featured"&gt;
  &lt;img class="card__image" src="..."&gt;
  &lt;div class="card__body"&gt;
    &lt;h3 class="card__title"&gt;WasteGo Rider&lt;/h3&gt;
    &lt;p class="card__description"&gt;...&lt;/p&gt;
    &lt;button class="card__btn card__btn--primary"&gt;View Profile&lt;/button&gt;
    &lt;button class="card__btn card__btn--ghost"&gt;Message&lt;/button&gt;
  &lt;/div&gt;
&lt;/div&gt;

/* BEM CSS */
/* Block */
.card { background: #141414; border-radius: 12px; overflow: hidden; }
/* Modifier: --featured */
.card--featured { border: 2px solid var(--color-primary); }

/* Elements: __ */
.card__image   { width: 100%; height: 200px; object-fit: cover; }
.card__body    { padding: 24px; }
.card__title   { font-size: 1.25rem; margin-bottom: 8px; }
.card__btn     { padding: 10px 20px; border-radius: 8px; cursor: pointer; }
.card__btn--primary { background: var(--color-primary); color: black; }
.card__btn--ghost   { background: transparent; border: 1px solid #333; }</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">📁 Scalable CSS File Structure</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>styles/
├── base/
│   ├── reset.css          /* box-sizing, margins, defaults */
│   ├── typography.css     /* body, headings, text styles */
│   └── variables.css      /* all CSS custom properties */
├── components/
│   ├── button.css
│   ├── card.css
│   ├── navbar.css
│   ├── modal.css
│   └── form.css
├── layouts/
│   ├── grid.css
│   └── container.css
├── pages/
│   ├── home.css
│   └── dashboard.css
├── utilities/
│   └── helpers.css        /* .hidden, .sr-only, .text-center */
└── main.css               /* @import all others in order */

/* main.css */
@import './base/variables.css';
@import './base/reset.css';
@import './base/typography.css';
@import './components/button.css';
/* ... etc */</code></pre>
        </div>
      </div>

      <div class="bg-green-500/10 p-6 rounded-xl">
        <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
        <p class="text-gray-300">Refactor all your CSS into the file structure above. Rename classes using BEM. Create a utility classes file with: .sr-only (screen reader only), .container, .text-center, .hidden, .flex-center, .mb-4, .mt-8. Write a README.md explaining your CSS architecture choices. Then time how long it takes to find and change a specific style — good architecture should make this instant.</p>
      </div>
    </div>`,
    [
      { question: 'In BEM, what does the double underscore (__) signify?', options: ['A CSS comment', 'A modifier', 'An element — a child part of a block', 'A global style'], correct: 2 },
      { question: 'In BEM, what does the double dash (--) signify?', options: ['A comment', 'A modifier — a variation of a block or element', 'An element', 'A CSS variable'], correct: 1 },
      { question: 'What is the main advantage of BEM naming?', options: ['Shorter class names', 'Self-documenting, avoids specificity conflicts, scales on teams', 'Better browser performance', 'Required by CSS3'], correct: 1 },
      { question: 'What does the .sr-only utility class typically do?', options: ['Styles screen recording overlays', 'Hides an element visually but keeps it accessible to screen readers', 'Shows element only on small screens', 'Applies to a specific screen resolution'], correct: 1 },
      { question: 'What is the "utility-first" CSS approach?', options: ['Writing CSS with utility functions', 'Using small, single-purpose classes (like Tailwind) to build UI directly in HTML', 'Removing all CSS and using inline styles', 'Using only !important rules'], correct: 1 },
      { question: 'Why should you avoid deeply nested CSS selectors (e.g. .nav ul li a span)?', options: ['They are slower to type', 'They create very high specificity, making styles hard to override and fragile', 'Browsers don\'t support deep nesting', 'They only work in Chrome'], correct: 1 },
      { question: 'What does "critical CSS" mean?', options: ['CSS with !important flags', 'The minimum CSS needed to render above-the-fold content, inlined in <head> for fast first paint', 'CSS that causes bugs', 'A Sass feature'], correct: 1 },
      { question: 'What is the correct order to import CSS files for architecture?', options: ['Components first, then base', 'Base/variables → reset → typography → components → layouts → pages → utilities', 'Alphabetical order', 'Any order — CSS import order doesn\'t matter'], correct: 1 }
    ],
    50,
    'https://www.youtube.com/embed/SLjAcQLikfI'
  ),

  lesson(
    '10. Final CSS Project: Design a Complete App UI',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-purple-400 mb-2">🏆 Final CSS Project Brief</h2>
        <p class="text-gray-300">You've mastered CSS. Now you will design a pixel-perfect, fully responsive, animated UI for a real app — applying every concept from this course.</p>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">📋 Build the WasteGo Landing Page</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-black/60 p-4 rounded-lg">
            <p class="text-orange-400 font-semibold mb-2">Design System</p>
            <ul class="text-gray-300 text-sm space-y-1 list-disc list-inside">
              <li>Complete CSS custom properties (colors, type, spacing, shadows)</li>
              <li>Dark and light theme with system preference detection</li>
              <li>Google Font pairing (display + body)</li>
              <li>BEM-structured components</li>
            </ul>
          </div>
          <div class="bg-black/60 p-4 rounded-lg">
            <p class="text-purple-400 font-semibold mb-2">Sections</p>
            <ul class="text-gray-300 text-sm space-y-1 list-disc list-inside">
              <li>Animated hero with gradient background</li>
              <li>3-column features grid (Flexbox)</li>
              <li>Stats bar (CSS counters or large typography)</li>
              <li>Pricing cards (Grid, with "popular" modifier)</li>
              <li>Testimonials slider (scroll-snap)</li>
              <li>Contact form (styled, with focus states)</li>
            </ul>
          </div>
          <div class="bg-black/60 p-4 rounded-lg">
            <p class="text-cyan-400 font-semibold mb-2">Responsive</p>
            <ul class="text-gray-300 text-sm space-y-1 list-disc list-inside">
              <li>Mobile-first with 3 breakpoints</li>
              <li>Mobile hamburger nav (CSS-only toggle or JS)</li>
              <li>Responsive images with srcset</li>
              <li>Fluid typography with clamp()</li>
            </ul>
          </div>
          <div class="bg-black/60 p-4 rounded-lg">
            <p class="text-green-400 font-semibold mb-2">Animations</p>
            <ul class="text-gray-300 text-sm space-y-1 list-disc list-inside">
              <li>Hero fade-in on load</li>
              <li>Staggered card reveals</li>
              <li>Button hover lift + glow</li>
              <li>Scroll-driven section reveals</li>
              <li>Pulsing status badge</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="bg-yellow-500/10 p-4 rounded-lg">
        <p class="text-yellow-300">🎓 <strong>You have mastered CSS.</strong> Flexbox, Grid, responsive design, animations, architecture, and modern selectors. Your HTML now has a stunning visual layer. Next: JavaScript — bringing everything to life.</p>
      </div>
    </div>`,
    [
      { question: 'What is the best approach for a responsive CSS layout in 2024?', options: ['Use table-based layouts', 'CSS Grid and Flexbox together, mobile-first with min-width media queries', 'Float-based layouts', 'Absolute positioning everything'], correct: 1 },
      { question: 'What does object-fit: cover do on an image inside a fixed-size container?', options: ['Distorts image to fit', 'Scales image to cover the container, cropping if needed, maintaining aspect ratio', 'Adds a border around the image', 'Makes image transparent'], correct: 1 },
      { question: 'How do you make a sticky navigation bar that stays at the top when scrolling?', options: ['position: absolute; top: 0', 'position: fixed; top: 0; left: 0; width: 100%', 'display: sticky', 'position: sticky; top: 0'], correct: 3 },
      { question: 'What CSS property creates a blurred background behind a glass/frosted card?', options: ['background-blur: 10px', 'filter: blur(10px)', 'backdrop-filter: blur(10px)', 'box-shadow: blur(10px)'], correct: 2 },
      { question: 'How do you create a gradient background that flows diagonally?', options: ['background: gradient(diagonal, ...)', 'background: linear-gradient(135deg, #color1, #color2)', 'background: diagonal-gradient(#color1, #color2)', 'background: angle-gradient(45deg)'], correct: 1 },
      { question: 'What is the CSS property that controls how the background image is sized?', options: ['background-position', 'background-size', 'background-scale', 'background-resize'], correct: 1 },
      { question: 'What does overflow: hidden on a parent with border-radius achieve?', options: ['Hides all overflow content globally', 'Clips child elements to the parent\'s rounded corners', 'Adds hidden scrollbars', 'Removes the border'], correct: 1 },
      { question: 'What should be your first step when starting a new CSS project?', options: ['Start styling headings', 'Set up CSS custom properties and a global reset (box-sizing, margins)', 'Add animations', 'Import Google Fonts'], correct: 1 }
    ],
    100,
    'https://www.youtube.com/embed/p0bGHP-PXD4'
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
}
await cssCourse.save();
console.log(`✅ CSS: added ${cssLessons.length} lessons`);


 console.log('CSS lessons seeded successfully');

// ─────────────────────────────────────────────
//  JAVASCRIPT LESSONS
// ─────────────────────────────────────────────
const jsLessons = [
  lesson(
    '1. JavaScript Foundations: Variables, Types & Operators',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-yellow-400 mb-2">📖 What You Will Learn</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li>var, let, const — the right one for every situation</li>
          <li>All JavaScript data types explained deeply</li>
          <li>Type coercion and how to avoid bugs</li>
          <li>All operators: arithmetic, comparison, logical, nullish</li>
          <li>Strict mode and modern JavaScript best practices</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🔢 Variables: var, let, const</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>'use strict'; // Always add this — prevents many silent bugs

// const: use by default (can't be reassigned)
const APP_NAME = 'WasteGo';
const MAX_WEIGHT = 1000; // in kg
const config = { api: 'https://api.wastego.gh', version: '2.0' };
config.api = 'https://new.api.wastego.gh'; // ✅ object properties CAN change
// config = {}; ❌ Cannot reassign the binding

// let: use when you need to reassign
let currentPage = 1;
let isLoggedIn = false;
currentPage = 2; // ✅

// var: AVOID. Function-scoped, hoisted, causes confusing bugs
// var wastes the last 10 years of learning — don't use it

// ── Scope ──
function example() {
  const blockScoped = 'only here';
  if (true) {
    const ifScoped = 'only in this if block';
    let alsoBlockScoped = 'same';
  }
  // ifScoped and alsoBlockScoped are not accessible here
}</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">📦 Data Types</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>// ── PRIMITIVE types (immutable, compared by VALUE) ──
const name = 'Kwame';        // String
const age = 24;              // Number (no int/float distinction)
const price = 15.50;         // Also Number
const isRider = true;        // Boolean
const nothing = null;        // Null (intentional empty value)
let notSet;                  // undefined (declared but not assigned)
const id = Symbol('userId'); // Symbol (always unique)
const bigNum = 9999999999999999n; // BigInt

// ── REFERENCE types (compared by REFERENCE) ──
const user = { name: 'Kwame', role: 'rider' };  // Object
const regions = ['accra', 'kumasi', 'tema'];      // Array
const greet = function(name) { return \`Hello \${name}\`; }; // Function

// Checking types
typeof 'hello'      // 'string'
typeof 42           // 'number'
typeof true         // 'boolean'
typeof undefined    // 'undefined'
typeof null         // 'object' ← FAMOUS BUG in JS (not actually an object)
typeof {}           // 'object'
typeof []           // 'object' ← use Array.isArray() instead
typeof function(){} // 'function'
Array.isArray([])   // true

// ── Type Coercion (automatic type conversion — source of many bugs!) ──
'5' + 3     // '53'  (number coerced to string — concatenation)
'5' - 3     // 2     (string coerced to number — subtraction)
'5' == 5    // true  ← loose equality coerces types (AVOID)
'5' === 5   // false ← strict equality (ALWAYS USE THIS)
null == undefined   // true (loose)
null === undefined  // false (strict)
!!0         // false (falsy values: 0, '', null, undefined, NaN, false)
!!''        // false
!!'hello'   // true (truthy)</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">➕ Operators</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>// Arithmetic
10 + 3   // 13
10 - 3   // 7
10 * 3   // 30
10 / 3   // 3.333...
10 % 3   // 1  (remainder/modulo)
10 ** 3  // 1000 (exponentiation)
++count  // increment before return
count++  // increment after return

// Comparison (always use ===)
5 === 5   // true
5 !== 3   // true
5 > 3     // true
5 >= 5    // true

// Logical
true && false   // false (both must be true)
true || false   // true  (at least one must be true)
!true           // false (NOT)

// Short-circuit evaluation
const user = null;
const name = user && user.name;  // null (stops at falsy user)
const display = name || 'Guest'; // 'Guest' (name is null/falsy)

// Nullish coalescing (??) — only null/undefined, NOT 0 or ''
const count = 0;
const display1 = count || 10;   // 10 (WRONG: treats 0 as falsy)
const display2 = count ?? 10;   // 0  (CORRECT: 0 is a valid value)

// Optional chaining (?.)
const city = user?.address?.city;  // undefined instead of TypeError
const firstTag = data?.tags?.[0];

// Assignment
let x = 5;
x += 3;   // x = 8
x -= 2;   // x = 6
x *= 4;   // x = 24
x **= 2;  // x = 576
x ??= 'default'; // assign only if x is null/undefined</code></pre>
        </div>
      </div>

      <div class="bg-green-500/10 p-6 rounded-xl">
        <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
        <p class="text-gray-300">Open browser DevTools console. Predict the output of 20 expressions (coercion, operators, typeof). Create a user object with 8 properties. Use optional chaining to safely access 3 nested properties. Use nullish coalescing for 3 default values. Use Array.isArray() to test 5 different values. Write a comment next to each line explaining why the output is what it is.</p>
      </div>
    </div>`,
    [
      { question: 'What is the key difference between == and === in JavaScript?', options: ['They are identical', '=== checks value AND type (strict); == coerces types before comparing (loose)', '== is faster', '=== only works with strings'], correct: 1 },
      { question: 'When should you use const vs let?', options: ['Always use let', 'Use const by default; only use let when you need to reassign the variable', 'Always use var', 'const is for strings; let is for numbers'], correct: 1 },
      { question: 'What does the ?? (nullish coalescing) operator do differently from ||?', options: ['They are identical', '?? only returns the right side if the left is null or undefined; || returns right side for any falsy value (0, empty string too)', '?? is for booleans; || is for strings', '?? is faster than ||'], correct: 1 },
      { question: 'What does typeof null return, and why is it a bug?', options: ['"null" — correct behavior', '"object" — a historical JavaScript bug that was never fixed for backwards compatibility', '"undefined" — null is not set', '"boolean" — null is falsy'], correct: 1 },
      { question: 'What does the ?. (optional chaining) operator do?', options: ['Creates optional CSS classes', 'Accesses nested properties safely, returning undefined instead of throwing TypeError if a link in the chain is null/undefined', 'Checks if a method is optional', 'Creates optional function parameters'], correct: 1 },
      { question: 'What are falsy values in JavaScript?', options: ['Only false and 0', 'false, 0, "" (empty string), null, undefined, NaN', 'null and undefined only', 'Everything that is not a string'], correct: 1 },
      { question: 'Why should you avoid var in modern JavaScript?', options: ['var is slower', 'var is function-scoped and hoisted, causing confusing bugs; let and const are block-scoped and predictable', 'var is deprecated', 'var causes security issues'], correct: 1 },
      { question: 'What does the % operator do?', options: ['Calculates percentage', 'Returns the remainder of division (modulo)', 'Divides two numbers', 'Converts to percentage string'], correct: 1 }
    ],
    50,
    'https://www.youtube.com/embed/PkZNo7MFNFg'
  ),

  lesson(
    '2. Control Flow: Conditionals, Loops & Error Handling',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-yellow-400 mb-2">📖 What You Will Learn</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li>if/else, switch, and ternary expressions</li>
          <li>for, while, do-while, for...of, for...in loops</li>
          <li>break, continue, and labeled statements</li>
          <li>try/catch/finally for error handling</li>
          <li>Custom errors and error types</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🔀 Conditionals</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>// if / else if / else
const wasteWeight = 25; // kg
let price;

if (wasteWeight <= 10) {
  price = 5;
} else if (wasteWeight <= 50) {
  price = 15;
} else if (wasteWeight <= 200) {
  price = 40;
} else {
  price = 80;
}

// Ternary (use for simple two-option logic)
const status = isOnline ? 'Available' : 'Offline';
const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
// Avoid nested ternaries for readability

// Switch (great for exact value matching)
const paymentMethod = 'momo';
switch (paymentMethod) {
  case 'momo':
    console.log('MTN Mobile Money selected');
    break; // ALWAYS add break or execution falls through!
  case 'vodafone':
  case 'airtel':
    console.log('Other mobile money');
    break;
  case 'cash':
    console.log('Cash on delivery');
    break;
  default:
    console.log('Unknown payment method');
}

// Logical guard clauses (prefer early returns over nested ifs)
function processPickup(request) {
  if (!request) return null;            // guard: null check
  if (!request.userId) return null;     // guard: required field
  if (request.weight > 1000) return null; // guard: invalid data
  // main logic here — less nesting!
  return doPickup(request);
}</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🔄 Loops</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>const regions = ['accra', 'kumasi', 'tema', 'takoradi'];

// for — classic, full control
for (let i = 0; i < regions.length; i++) {
  console.log(i, regions[i]);
}

// for...of — iterate VALUES (arrays, strings, sets, maps) ← prefer this
for (const region of regions) {
  console.log(region);
}

// for...in — iterate KEYS (use for objects, careful with arrays)
const user = { name: 'Kwame', role: 'rider', region: 'accra' };
for (const key in user) {
  console.log(key, user[key]); // name Kwame, role rider, region accra
}

// while — run while condition is true
let attempts = 0;
while (attempts < 3) {
  const success = tryConnect();
  if (success) break;
  attempts++;
}

// do...while — always runs at least once
let input;
do {
  input = prompt('Enter your phone number:');
} while (!isValidGhanaPhone(input));

// break — exit the loop
for (const item of list) {
  if (item.id === targetId) {
    foundItem = item;
    break; // stop searching once found
  }
}

// continue — skip current iteration
for (const pickup of pickups) {
  if (pickup.status === 'cancelled') continue; // skip cancelled
  processPickup(pickup);
}</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🚨 Error Handling</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>// try / catch / finally
async function fetchRiders() {
  try {
    const response = await fetch('/api/riders');
    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      console.error('Network error — user may be offline:', error.message);
    } else {
      console.error('API error:', error.message);
    }
    return null; // don't crash the app
  } finally {
    hideLoadingSpinner(); // ALWAYS runs, error or not
  }
}

// Custom error classes
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

function validatePhone(phone) {
  if (!/^0[235][0-9]{8}$/.test(phone)) {
    throw new ValidationError('phone', 'Invalid Ghana phone number format');
  }
  return true;
}

try {
  validatePhone('12345');
} catch (error) {
  if (error instanceof ValidationError) {
    showFieldError(error.field, error.message);
  }
}</code></pre>
        </div>
      </div>

      <div class="bg-green-500/10 p-6 rounded-xl">
        <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
        <p class="text-gray-300">Write a ride-pricing function: takes waste type (organic/plastic/electronic) and weight in kg. Uses nested conditionals for pricing tiers per type. Throws a ValidationError if weight is negative or over 2000. Catches errors and returns a price object with {subtotal, tax, total, currency: 'GHS'}. Write a loop that tests this function with 10 different inputs, logs results, and skips any that throw errors.</p>
      </div>
    </div>`,
    [
      { question: 'What happens if you forget a break statement in a switch case?', options: ['A syntax error is thrown', 'Execution falls through to the next case', 'The switch exits automatically', 'Nothing — break is optional'], correct: 1 },
      { question: 'What is the advantage of using for...of over a traditional for loop?', options: ['It is faster', 'It directly gives you the value, not the index, making code more readable', 'It works on objects', 'It has better browser support'], correct: 1 },
      { question: 'What does the finally block in try/catch do?', options: ['Runs only if there is an error', 'Runs only if there is no error', 'Always runs, whether there was an error or not', 'Runs the catch block again'], correct: 2 },
      { question: 'What is a "guard clause" pattern?', options: ['A security feature', 'Early return statements at the start of a function to handle edge cases, reducing nesting', 'A try/catch block', 'A type check'], correct: 1 },
      { question: 'What does continue do inside a loop?', options: ['Exits the loop', 'Skips the rest of the current iteration and goes to the next one', 'Pauses the loop', 'Restarts the loop from the beginning'], correct: 1 },
      { question: 'What is the difference between for...of and for...in?', options: ['They are identical', 'for...of iterates values of iterables; for...in iterates keys/property names of objects', 'for...in is faster', 'for...of only works on strings'], correct: 1 },
      { question: 'When should you use a ternary operator vs an if/else statement?', options: ['Always use ternary', 'Ternary for simple, single-line two-option logic; if/else for complex multi-step logic', 'Always use if/else', 'They are completely interchangeable'], correct: 1 },
      { question: 'What does throw new Error("message") do?', options: ['Logs a message to console', 'Creates and throws an Error object that stops execution and can be caught by try/catch', 'Shows an alert to the user', 'Stops the browser'], correct: 1 }
    ],
    50,
    'https://www.youtube.com/embed/IsG4Xd6LlsM'
  ),

  lesson(
    '3. Functions: Declarations, Arrows, Closures & Higher-Order',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-yellow-400 mb-2">📖 What You Will Learn</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li>Function declarations vs expressions vs arrow functions</li>
          <li>Default parameters, rest params, destructured params</li>
          <li>Closures — JavaScript's most powerful concept</li>
          <li>Higher-order functions: map, filter, reduce, find</li>
          <li>Pure functions and avoiding side effects</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🔧 Function Syntax</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>// ── Declaration (hoisted — can call before definition) ──
function greet(name) {
  return \`Hello, \${name}!\`;
}

// ── Expression (not hoisted) ──
const greet = function(name) {
  return \`Hello, \${name}!\`;
};

// ── Arrow function (modern, concise) ──
const greet = (name) => \`Hello, \${name}!\`;  // implicit return
const double = x => x * 2;                    // single param: no parens needed
const getTotal = (price, tax) => {
  const amount = price * (1 + tax);
  return amount;                               // explicit return with block body
};

// ── Key difference: arrow functions have NO own 'this' ──
// Use regular functions for methods; arrows for callbacks

// ── Parameters ──
// Default parameters
function createRequest(userId, type = 'organic', priority = 'normal') {
  return { userId, type, priority };
}

// Rest parameters (collects remaining args into array)
function sum(first, ...rest) {
  return rest.reduce((total, n) => total + n, first);
}
sum(1, 2, 3, 4, 5); // 15

// Destructured parameters
function displayUser({ name, role = 'customer', region }) {
  return \`\${name} is a \${role} in \${region}\`;
}
displayUser({ name: 'Kwame', region: 'accra' });

// Spread operator in calls
const nums = [1, 2, 3, 4, 5];
Math.max(...nums); // same as Math.max(1, 2, 3, 4, 5)</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🔒 Closures</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>// A closure is a function that remembers its outer scope even after the outer function returns

// Example 1: Counter factory
function createCounter(start = 0) {
  let count = start; // private variable — not accessible outside

  return {
    increment: () => ++count,
    decrement: () => --count,
    reset: () => { count = start; },
    get: () => count
  };
}

const pickupCounter = createCounter(0);
pickupCounter.increment(); // 1
pickupCounter.increment(); // 2
pickupCounter.get();       // 2
// count is private — cannot be accessed directly

// Example 2: Event handler factory
function createHandler(eventType) {
  return function(event) { // captures eventType in closure
    console.log(\`\${eventType} event triggered:\`, event.target);
  };
}
document.addEventListener('click', createHandler('click'));

// Example 3: Memoization (cache expensive calculations)
function memoize(fn) {
  const cache = new Map(); // persists in closure
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}
const fastCalc = memoize(expensiveCalculation);</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🗺️ Higher-Order Functions</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>const pickups = [
  { id: 1, customer: 'Kwame', weight: 25, status: 'completed', amount: 15 },
  { id: 2, customer: 'Ama',   weight: 5,  status: 'cancelled',  amount: 5 },
  { id: 3, customer: 'Kofi',  weight: 80, status: 'completed', amount: 40 },
  { id: 4, customer: 'Efua',  weight: 10, status: 'pending',   amount: 8 },
];

// map — transform each element, returns new array of same length
const amounts = pickups.map(p => p.amount);
// [15, 5, 40, 8]

const summaries = pickups.map(p => \`\${p.customer}: GHS \${p.amount}\`);

// filter — keep elements matching condition, returns new (possibly shorter) array
const completed = pickups.filter(p => p.status === 'completed');
// [pickup 1, pickup 3]

const heavyCompleted = pickups.filter(p => p.status === 'completed' && p.weight > 20);

// find — returns FIRST match (not an array)
const pendingPickup = pickups.find(p => p.status === 'pending');
// { id: 4, customer: 'Efua', ... }

// findIndex — returns index of first match
const idx = pickups.findIndex(p => p.id === 3); // 2

// reduce — accumulate all elements into a single value
const totalRevenue = pickups.reduce((total, p) => {
  return p.status === 'completed' ? total + p.amount : total;
}, 0);
// 55

const byStatus = pickups.reduce((groups, p) => {
  groups[p.status] = groups[p.status] || [];
  groups[p.status].push(p);
  return groups;
}, {});
// { completed: [...], cancelled: [...], pending: [...] }

// some / every
const hasHeavy = pickups.some(p => p.weight > 50);        // true
const allCompleted = pickups.every(p => p.status === 'completed'); // false

// sort (mutates original — sort a copy!)
const sorted = [...pickups].sort((a, b) => b.weight - a.weight); // descending by weight

// Chaining — the real power
const topEarners = pickups
  .filter(p => p.status === 'completed')
  .sort((a, b) => b.amount - a.amount)
  .slice(0, 3)
  .map(p => ({ name: p.customer, earned: p.amount }));</code></pre>
        </div>
      </div>

      <div class="bg-green-500/10 p-6 rounded-xl">
        <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
        <p class="text-gray-300">Write a WasteGo analytics module using closures and HOFs: Create a createAnalytics(pickups) factory function that returns methods: getTotalRevenue(), getCompletionRate(), getAverageWeight(), getTopCustomers(n), getRevenueByRegion(). All using map/filter/reduce. The pickups array is private in the closure. Create a memoized version of getRevenueByRegion so it caches results.</p>
      </div>
    </div>`,
    [
      { question: 'What is the key difference between arrow functions and regular functions?', options: ['Arrow functions are faster', 'Arrow functions do not have their own "this" binding; they inherit it from the enclosing scope', 'Arrow functions cannot have parameters', 'Arrow functions must have a return statement'], correct: 1 },
      { question: 'What is a closure?', options: ['A function with no return value', 'A function that has access to its outer scope\'s variables even after the outer function has returned', 'A way to close the browser', 'A function that cannot be called twice'], correct: 1 },
      { question: 'What does Array.map() return?', options: ['The first matching element', 'A new array of the same length with each element transformed', 'A single accumulated value', 'Nothing — it mutates the original array'], correct: 1 },
      { question: 'What does Array.reduce() do?', options: ['Reduces the array length by removing elements', 'Accumulates all array elements into a single value using a callback and initial value', 'Finds the smallest element', 'Removes duplicates'], correct: 1 },
      { question: 'What is the difference between Array.find() and Array.filter()?', options: ['They are identical', 'find() returns the first matching element; filter() returns ALL matching elements in a new array', 'filter() is faster', 'find() works on objects; filter() works on arrays'], correct: 1 },
      { question: 'What are rest parameters (...args) used for?', options: ['Spreading an array into function arguments', 'Collecting any number of remaining function arguments into an array', 'Defining optional parameters', 'Destructuring parameters'], correct: 1 },
      { question: 'What makes a function "pure"?', options: ['It uses arrow syntax', 'It always produces the same output for the same input and has no side effects', 'It has no parameters', 'It returns a primitive value'], correct: 1 },
      { question: 'Why should you sort a COPY of an array instead of the original?', options: ['It is faster', 'Array.sort() mutates the original array; sorting a copy (via spread [...arr]) preserves the original', 'JavaScript requires it', 'Original arrays cannot be sorted'], correct: 1 }
    ],
    50,
    'https://www.youtube.com/embed/N8ap4k_1QEQ'
  ),

  lesson(
    '4. Arrays & Objects: Deep Mastery',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-yellow-400 mb-2">📖 What You Will Learn</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li>Destructuring arrays and objects deeply</li>
          <li>Spread and rest operators in practice</li>
          <li>Object methods: keys, values, entries, assign, freeze</li>
          <li>Array methods: flat, flatMap, at, findLast, groupBy</li>
          <li>Immutable data patterns for bug-free code</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">📦 Destructuring</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>// ── OBJECT DESTRUCTURING ──
const user = {
  id: 'usr_1',
  name: 'Kwame Mensah',
  role: 'rider',
  address: { city: 'Accra', region: 'Greater Accra' },
  skills: ['navigation', 'customer-service']
};

// Basic destructuring
const { name, role } = user;
console.log(name); // 'Kwame Mensah'

// Rename while destructuring
const { name: userName, role: userRole } = user;

// Default values
const { badge = 'bronze', name: n } = user; // badge doesn't exist, defaults to 'bronze'

// Nested destructuring
const { address: { city, region } } = user;
console.log(city); // 'Accra'

// Skip some properties using rest
const { id, ...profile } = user; // profile = { name, role, address, skills }

// In function parameters (very common in React!)
function renderCard({ name, role, address: { city } = {} }) {
  return \`\${name} (\${role}) — \${city}\`;
}

// ── ARRAY DESTRUCTURING ──
const [lat, lng, altitude = 0] = [5.6037, -0.1870]; // default for missing

// Swap variables
let a = 1, b = 2;
[a, b] = [b, a]; // a=2, b=1

// Skip elements
const [first, , third] = [10, 20, 30]; // skip 20

// Mixed
const { name: riderName, skills: [primarySkill, ...otherSkills] } = user;</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🔀 Spread & Immutability Patterns</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>// ALWAYS create new objects/arrays — never mutate state
const user = { name: 'Kwame', role: 'rider', region: 'accra' };

// Update a field immutably
const updatedUser = { ...user, role: 'admin', updatedAt: Date.now() };
// Original user is unchanged

// Add to array immutably
const pickups = ['p1', 'p2'];
const newPickups = [...pickups, 'p3'];          // add to end
const prepended = ['p0', ...pickups];            // add to start
const inserted = [...pickups.slice(0,1), 'p1.5', ...pickups.slice(1)]; // insert at index 1

// Remove from array immutably
const without = pickups.filter(p => p !== 'p1'); // remove by value

// Merge objects (later keys win)
const defaults = { timeout: 5000, retries: 3, debug: false };
const custom = { retries: 5, debug: true };
const config = { ...defaults, ...custom }; // { timeout: 5000, retries: 5, debug: true }

// Deep clone (simple objects — no functions/dates)
const deepCopy = JSON.parse(JSON.stringify(originalObject));
// For complex objects use structuredClone() (modern)
const deepCopy2 = structuredClone(originalObject);

// Object methods
const keys = Object.keys(user);    // ['name', 'role', 'region']
const vals = Object.values(user);  // ['Kwame', 'rider', 'accra']
const entries = Object.entries(user); // [['name','Kwame'], ['role','rider'], ...]

// Build object from entries
const fromEntries = Object.fromEntries([['a', 1], ['b', 2]]); // { a: 1, b: 2 }
// Useful: transform object values
const doubled = Object.fromEntries(
  Object.entries(prices).map(([key, val]) => [key, val * 2])
);

// Freeze (prevent mutations)
const RATES = Object.freeze({ organic: 5, plastic: 8, electronic: 20 });
RATES.organic = 100; // silently fails in non-strict, throws in strict mode

// Modern array methods
const matrix = [[1,2],[3,4],[5,6]];
matrix.flat();   // [1, 2, 3, 4, 5, 6]
matrix.flatMap(row => row.map(x => x * 2)); // [2, 4, 6, 8, 10, 12]

const last = pickups.at(-1);  // last element (negative indexing!)
const lastCompleted = pickups.findLast(p => p.status === 'completed');</code></pre>
        </div>
      </div>

      <div class="bg-green-500/10 p-6 rounded-xl">
        <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
        <p class="text-gray-300">Build a WasteGo data manager with immutable patterns: Start with an array of 10 pickup objects. Write pure functions: addPickup(pickups, newPickup) → returns new array. updatePickup(pickups, id, changes) → returns new array with updated item. deletePickup(pickups, id) → returns filtered array. getStats(pickups) → returns object using Object.fromEntries. Every function must return new arrays/objects — never mutate the input.</p>
      </div>
    </div>`,
    [
      { question: 'What is object destructuring?', options: ['Deleting an object\'s properties', 'Extracting properties from an object into individual variables in one expression', 'Converting an object to a string', 'Merging two objects'], correct: 1 },
      { question: 'What does the spread operator (...) do when applied to an object?', options: ['Spreads the object to the console', 'Creates a shallow copy of the object\'s properties', 'Deletes the original object', 'Makes the object iterable'], correct: 1 },
      { question: 'How do you create an immutable copy of an object with one field updated?', options: ['Object.update(obj, {field: value})', 'const newObj = {...originalObj, field: newValue}', 'originalObj.field = newValue', 'Object.assign(originalObj, {field: newValue})'], correct: 1 },
      { question: 'What does Object.freeze() do?', options: ['Saves the object to localStorage', 'Prevents any properties from being added, removed, or modified', 'Creates a deep copy', 'Optimizes the object for performance'], correct: 1 },
      { question: 'What does array.at(-1) return?', options: ['An error', 'The last element of the array', 'The element at index -1 (which is undefined)', 'A new array without the last element'], correct: 1 },
      { question: 'What does Array.flat() do?', options: ['Sorts an array', 'Removes duplicates', 'Flattens nested arrays one level deep by default', 'Converts array to string'], correct: 2 },
      { question: 'What does Object.entries() return?', options: ['An array of the object\'s keys', 'An array of [key, value] pairs for each property', 'An array of the object\'s values', 'A string representation of the object'], correct: 1 },
      { question: 'Why should you use structuredClone() over JSON.parse(JSON.stringify()) for deep cloning?', options: ['It is slower but prettier', 'structuredClone handles dates, Maps, Sets, and circular references that JSON cannot', 'JSON method is deprecated', 'They are identical'], correct: 1 }
    ],
    50,
    'https://www.youtube.com/embed/NIq3qLaHCIs'
  ),

  lesson(
    '5. The DOM: Selecting, Manipulating & Events',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-yellow-400 mb-2">📖 What You Will Learn</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li>Selecting elements: querySelector vs getElementById</li>
          <li>Creating, inserting, and removing elements</li>
          <li>Modifying text, HTML, attributes, classes, and styles</li>
          <li>Event listeners: click, input, submit, keydown, custom events</li>
          <li>Event delegation and event bubbling</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🎯 Selecting Elements</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>// Single element (returns first match or null)
const btn = document.querySelector('#submit-btn');
const title = document.querySelector('h1');
const activeCard = document.querySelector('.card.active');
const emailInput = document.querySelector('input[type="email"]');

// Multiple elements (returns NodeList)
const allCards = document.querySelectorAll('.card');
const allLinks = document.querySelectorAll('nav a');

// Convert NodeList to array for .map/.filter etc.
const cardsArray = [...allCards];
Array.from(allCards).forEach(card => card.classList.add('loaded'));

// Faster lookups (when you have an ID)
const form = document.getElementById('booking-form'); // no # needed

// Traversal
const parent = element.parentElement;
const children = element.children;         // HTMLCollection
const childNodes = element.childNodes;     // NodeList (includes text nodes)
const next = element.nextElementSibling;
const prev = element.previousElementSibling;
const firstChild = element.firstElementChild;
const lastChild = element.lastElementChild;</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🛠️ Manipulating the DOM</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>// ── Text & HTML ──
element.textContent = 'Safe text — no HTML parsed'; // SAFE
element.innerHTML = '&lt;strong&gt;Rich content&lt;/strong&gt;';  // ⚠️ DANGEROUS with user input (XSS)

// ── Attributes ──
element.getAttribute('href');
element.setAttribute('data-id', 'pickup_123');
element.removeAttribute('disabled');
element.hasAttribute('required');
// dataset (data-* attributes)
element.dataset.id;          // reads data-id attribute
element.dataset.status = 'active'; // sets data-status

// ── Classes ──
element.classList.add('active', 'highlighted');
element.classList.remove('loading');
element.classList.toggle('dark-mode');     // add if not present, remove if present
element.classList.toggle('visible', true); // force add
element.classList.contains('active');      // true/false
element.classList.replace('old', 'new');

// ── Inline styles (use classes when possible) ──
element.style.backgroundColor = '#00ff88';
element.style.transform = 'translateY(-8px)';
Object.assign(element.style, { opacity: '1', display: 'block' });

// ── Creating elements ──
const card = document.createElement('div');
card.className = 'card';
card.dataset.id = pickup.id;
card.innerHTML = \`
  &lt;h3 class="card__title"&gt;\${pickup.customer}&lt;/h3&gt;
  &lt;p class="card__weight"&gt;\${pickup.weight}kg&lt;/p&gt;
\`;

// ── Inserting elements ──
parent.appendChild(card);                    // add to end
parent.prepend(card);                        // add to start
parent.insertBefore(card, referenceElement); // before reference
referenceElement.after(card);               // after reference
referenceElement.before(card);              // before reference
parent.insertAdjacentHTML('beforeend', htmlString); // no reparsing needed

// ── Removing elements ──
element.remove();
parent.removeChild(element);</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🎪 Events & Event Delegation</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>// ── Event Listeners ──
const btn = document.querySelector('#book-btn');

function handleBooking(event) {
  event.preventDefault();       // stop form submission / link navigation
  event.stopPropagation();      // stop event bubbling up to parent
  console.log('Button clicked!', event.target);
}

btn.addEventListener('click', handleBooking);
btn.removeEventListener('click', handleBooking); // must pass same function reference

// Common events
element.addEventListener('click', handler);
input.addEventListener('input', e => console.log(e.target.value));   // every keystroke
input.addEventListener('change', handler);  // on blur/commit
form.addEventListener('submit', e => { e.preventDefault(); validate(); });
element.addEventListener('keydown', e => { if(e.key === 'Enter') submit(); });
element.addEventListener('mouseover', handler);
element.addEventListener('mouseout', handler);
window.addEventListener('resize', debounce(handleResize, 200));
window.addEventListener('scroll', throttle(handleScroll, 100));

// ── Event Delegation ── (VERY IMPORTANT — handle dynamic elements)
// Instead of attaching listeners to each card (which might not exist yet):
document.querySelector('.pickup-list').addEventListener('click', (event) => {
  const deleteBtn = event.target.closest('.delete-btn');
  const card = event.target.closest('.pickup-card');

  if (deleteBtn) {
    const id = deleteBtn.dataset.id;
    deletePickup(id);
  } else if (card) {
    openPickupDetails(card.dataset.id);
  }
});

// ── Custom Events ──
const pickupBooked = new CustomEvent('pickupBooked', {
  detail: { pickupId: 'p123', rider: 'Kwame' },
  bubbles: true
});
document.dispatchEvent(pickupBooked);
document.addEventListener('pickupBooked', (e) => {
  showNotification(\`Pickup \${e.detail.pickupId} booked!\`);
});</code></pre>
        </div>
      </div>

      <div class="bg-green-500/10 p-6 rounded-xl">
        <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
        <p class="text-gray-300">Build a dynamic pickup management UI: Render a list of 5 pickups from an array using DOM creation (no innerHTML for the list). Add a form to add new pickups. Delete pickups with a button — use event delegation on the list. Toggle a pickup's status (pending → completed) on click. Filter pickups by status using querySelector on live DOM. Dispatch a custom "pickupCompleted" event when status changes, and catch it to show a toast notification.</p>
      </div>
    </div>`,
    [
      { question: 'What is the difference between textContent and innerHTML?', options: ['They are identical', 'textContent is safe (treats content as text); innerHTML parses HTML and is vulnerable to XSS attacks', 'innerHTML is faster', 'textContent is deprecated'], correct: 1 },
      { question: 'What does event.preventDefault() do?', options: ['Stops the event from firing', 'Prevents the default browser behavior (like form submission or link navigation)', 'Removes the event listener', 'Stops event propagation'], correct: 1 },
      { question: 'What is Event Delegation?', options: ['Delegating events to a web worker', 'Attaching a single event listener to a parent element to handle events from its current and future children', 'Using custom events', 'Removing event listeners'], correct: 1 },
      { question: 'What does element.closest(selector) do?', options: ['Returns the nearest child matching the selector', 'Traverses UP the DOM tree and returns the nearest ancestor (or self) matching the selector', 'Selects similar elements', 'Returns the offsetParent'], correct: 1 },
      { question: 'What is the difference between the input and change events on an input element?', options: ['They are the same', 'input fires on every keystroke; change fires when the element loses focus after the value changed', 'change is deprecated', 'input only works on checkboxes'], correct: 1 },
      { question: 'What does classList.toggle("active") do?', options: ['Always adds the class', 'Always removes the class', 'Adds the class if it\'s absent, removes it if it\'s present', 'Checks if the class is present'], correct: 2 },
      { question: 'What is the advantage of insertAdjacentHTML over innerHTML?', options: ['insertAdjacentHTML is safer', 'insertAdjacentHTML does not re-parse the existing DOM, only adds new content', 'innerHTML is deprecated', 'insertAdjacentHTML only works on tables'], correct: 1 },
      { question: 'What does element.dataset provide access to?', options: ['All CSS variables', 'Data attributes (data-*) on the element as a convenient object', 'The element\'s dataset metadata', 'Local storage data'], correct: 1 }
    ],
    50,
    'https://www.youtube.com/embed/5fb2aPlgoys'
  ),

  lesson(
    '6. Async JavaScript: Promises, Async/Await & Fetch API',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-yellow-400 mb-2">📖 What You Will Learn</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li>Why JavaScript is asynchronous and how the event loop works</li>
          <li>Callbacks and callback hell — the problem</li>
          <li>Promises: then/catch/finally chains</li>
          <li>Async/Await — the modern solution</li>
          <li>Fetch API: GET, POST, headers, JSON</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">⏳ The Event Loop (The Foundation)</h2>
        <p class="text-gray-300 mb-3">JavaScript is single-threaded. Only one thing runs at a time. But browsers have Web APIs (fetch, setTimeout, DOM events) that run in the background. When they finish, their callbacks go into the task queue. The event loop moves them to the call stack when it's empty.</p>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>console.log('1'); // Synchronous — runs immediately

setTimeout(() => console.log('2'), 0); // Task queue — runs AFTER all sync code
Promise.resolve().then(() => console.log('3')); // Microtask — runs before task queue

console.log('4'); // Synchronous

// Output: 1, 4, 3, 2
// Microtasks (Promises) ALWAYS run before macrotasks (setTimeout/setInterval)</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🤝 Promises</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>// Creating a Promise
function delay(ms) {
  return new Promise((resolve, reject) => {
    if (ms < 0) reject(new Error('Duration must be positive'));
    setTimeout(() => resolve(\`Done after \${ms}ms\`), ms);
  });
}

// Consuming with .then() chain
delay(1000)
  .then(message => { console.log(message); return delay(500); })
  .then(message => console.log('Second:', message))
  .catch(error => console.error('Error:', error.message))
  .finally(() => console.log('Cleanup done'));

// Promise combinators
Promise.all([fetch('/api/riders'), fetch('/api/zones')])
  // Waits for ALL — rejects if ANY fails
  .then(([ridersRes, zonesRes]) => Promise.all([ridersRes.json(), zonesRes.json()]))
  .then(([riders, zones]) => initialize(riders, zones));

Promise.allSettled([...promises])
  // Waits for ALL — never rejects, gives status for each
  .then(results => results.filter(r => r.status === 'fulfilled').map(r => r.value));

Promise.race([...promises]);  // Returns first to settle (fulfilled OR rejected)
Promise.any([...promises]);   // Returns first FULFILLED, ignores rejections</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">✨ Async/Await + Fetch</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>// ── Fetch API ── GET
async function getRiders(region) {
  try {
    const response = await fetch(\`https://api.wastego.gh/riders?region=\${region}\`, {
      method: 'GET',
      headers: {
        'Authorization': \`Bearer \${localStorage.getItem('token')}\`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || \`HTTP \${response.status}\`);
    }

    const data = await response.json();
    return data.riders;
  } catch (error) {
    if (error.name === 'AbortError') return null; // cancelled request
    console.error('getRiders failed:', error);
    throw error; // re-throw for caller to handle
  }
}

// ── POST with JSON body ──
async function bookPickup(pickupData) {
  const response = await fetch('https://api.wastego.gh/pickups', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${getToken()}\`
    },
    body: JSON.stringify(pickupData)
  });
  return response.json();
}

// ── Abort Controller (cancel requests) ──
const controller = new AbortController();
const { signal } = controller;

fetch('/api/riders', { signal })
  .then(r => r.json())
  .catch(e => { if (e.name !== 'AbortError') throw e; });

// Cancel after 10 seconds
setTimeout(() => controller.abort(), 10000);

// ── Parallel fetching (most efficient) ──
async function loadDashboard() {
  const [riders, pickups, zones] = await Promise.all([
    fetch('/api/riders').then(r => r.json()),
    fetch('/api/pickups').then(r => r.json()),
    fetch('/api/zones').then(r => r.json())
  ]);
  return { riders, pickups, zones };
}</code></pre>
        </div>
      </div>

      <div class="bg-green-500/10 p-6 rounded-xl">
        <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
        <p class="text-gray-300">Build a weather widget that uses async/await: Fetch the user's location (Geolocation API). Use that lat/lng to call open-meteo.com (free, no key needed) to get current weather. Display temperature, weather code, wind speed. Show a loading skeleton while fetching, error state if it fails, and use AbortController to cancel if user navigates away. Handle offline state with a try/catch checking navigator.onLine.</p>
      </div>
    </div>`,
    [
      { question: 'What is the JavaScript Event Loop responsible for?', options: ['Running JavaScript on multiple threads', 'Moving callbacks from the task queue to the call stack when the stack is empty, enabling async behavior', 'Managing DOM events only', 'Garbage collection'], correct: 1 },
      { question: 'What does async/await do under the hood?', options: ['Creates actual threads', 'Is syntactic sugar over Promises, making async code read like synchronous code', 'Blocks JavaScript execution', 'Runs code in a web worker'], correct: 1 },
      { question: 'What does Promise.all() do?', options: ['Runs promises one after another', 'Runs all promises in parallel and resolves when all complete, or rejects if any one fails', 'Returns the first promise to resolve', 'Resolves all promises regardless of rejections'], correct: 1 },
      { question: 'What does response.ok check in the Fetch API?', options: ['If the server is online', 'If the HTTP status code is in the 200-299 range', 'If the JSON is valid', 'If the response has data'], correct: 1 },
      { question: 'What does Promise.allSettled() do differently from Promise.all()?', options: ['It is faster', 'It waits for all promises regardless of outcome, never rejecting — each result has a status', 'It only works with fetch', 'It cancels failed promises'], correct: 1 },
      { question: 'How do you cancel an in-flight fetch request?', options: ['fetch.cancel()', 'response.abort()', 'Using AbortController and passing its signal to fetch, then calling controller.abort()', 'Setting the request timeout to 0'], correct: 2 },
      { question: 'Why should you NOT use await inside a forEach loop?', options: ['It causes a syntax error', 'forEach doesn\'t await the promise, so iterations run in parallel without waiting — use for...of instead', 'It is slower', 'forEach is deprecated with async functions'], correct: 1 },
      { question: 'What does JSON.stringify() do to the fetch body?', options: ['Validates the JSON', 'Converts a JavaScript object to a JSON string for sending in the request body', 'Compresses the data', 'Encrypts the data'], correct: 1 }
    ],
    50,
    'https://www.youtube.com/embed/PoRJizFvM7s'
  ),

  lesson(
    '7. ES6+ Modern JavaScript: Classes, Modules & New Syntax',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-yellow-400 mb-2">📖 What You Will Learn</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li>Classes: constructor, methods, inheritance, private fields</li>
          <li>ES Modules: import/export (named and default)</li>
          <li>Template literals, tagged templates</li>
          <li>Symbols, Iterators, Generators</li>
          <li>Map, Set, WeakMap, WeakSet</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🏛️ Classes</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>class User {
  // Private fields (# prefix — truly private, not accessible outside)
  #password;
  #sessionToken = null;

  // Static property (on the class, not instances)
  static activeCount = 0;

  constructor(name, email, role = 'customer') {
    this.id = crypto.randomUUID();
    this.name = name;
    this.email = email;
    this.role = role;
    this.createdAt = new Date();
    User.activeCount++;
  }

  // Instance method
  greet() {
    return \`Hello, I'm \${this.name} (\${this.role})\`;
  }

  // Getter (access like a property)
  get displayName() {
    return \`\${this.name} [\${this.role.toUpperCase()}]\`;
  }

  // Setter (set like a property, with validation)
  set password(value) {
    if (value.length < 8) throw new Error('Password too short');
    this.#password = hashPassword(value); // private
  }

  // Static method (on the class itself)
  static fromJSON(json) {
    const { name, email, role } = JSON.parse(json);
    return new User(name, email, role);
  }

  toJSON() {
    return { id: this.id, name: this.name, email: this.email, role: this.role };
  }
}

// Inheritance
class Rider extends User {
  #rating = 5.0;

  constructor(name, email, vehicle) {
    super(name, email, 'rider'); // call parent constructor
    this.vehicle = vehicle;
    this.pickupsCompleted = 0;
  }

  get rating() { return this.#rating.toFixed(1); }

  completePickup(amount) {
    this.pickupsCompleted++;
    this.#rating = (this.#rating * 0.9) + (amount > 0 ? 0.5 : 0.1);
    return this;  // allow chaining
  }

  // Override parent method
  greet() {
    return \`\${super.greet()} — Rider with \${this.pickupsCompleted} pickups\`;
  }
}

const rider = new Rider('Kwame', 'kwame@wastego.gh', 'tricycle');
rider.completePickup(25).completePickup(15); // chaining
console.log(rider.rating); // '5.1'
console.log(rider instanceof User);  // true
console.log(rider instanceof Rider); // true</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">📦 ES Modules</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>// ── utils.js ── (named exports)
export const formatCurrency = (amount, currency = 'GHS') =>
  \`\${currency} \${amount.toFixed(2)}\`;

export function validateGhanaPhone(phone) {
  return /^0[235][0-9]{8}$/.test(phone);
}

export class EventEmitter { ... }

// ── api.js ── (default export)
const api = {
  baseUrl: 'https://api.wastego.gh',
  async get(path) { ... },
  async post(path, body) { ... }
};
export default api;

// ── main.js ── (importing)
import api from './api.js';                        // default import
import { formatCurrency, validateGhanaPhone } from './utils.js'; // named imports
import { formatCurrency as fmt } from './utils.js'; // rename
import * as Utils from './utils.js';               // namespace import

// Dynamic import (lazy loading)
const button = document.querySelector('#load-map');
button.addEventListener('click', async () => {
  const { initMap } = await import('./map.js'); // loads only when needed
  initMap();
});</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🗺️ Map & Set</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>// Map — key-value pairs with ANY key type
const riderCache = new Map();
riderCache.set('rider_1', { name: 'Kwame', online: true });
riderCache.set('rider_2', { name: 'Ama', online: false });
riderCache.get('rider_1');         // { name: 'Kwame', online: true }
riderCache.has('rider_3');         // false
riderCache.size;                   // 2
riderCache.delete('rider_2');
for (const [id, rider] of riderCache) { console.log(id, rider.name); }

// Set — unique values only
const onlineRiders = new Set(['rider_1', 'rider_3', 'rider_1']); // rider_1 only once
onlineRiders.size;                 // 2
onlineRiders.add('rider_4');
onlineRiders.has('rider_1');       // true

// Remove duplicates from array
const unique = [...new Set(['a', 'b', 'a', 'c', 'b'])]; // ['a', 'b', 'c']</code></pre>
        </div>
      </div>

      <div class="bg-green-500/10 p-6 rounded-xl">
        <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
        <p class="text-gray-300">Build a modular WasteGo auth system: Create User and Rider classes with private fields for password (hashed). Build auth.js module: login(), logout(), getCurrentUser(), isAuthenticated(). Build api.js module as a class with private #token field and methods for GET/POST. Use dynamic import() to load the admin panel module only when the admin logs in. Use a Map to cache API responses.</p>
      </div>
    </div>`,
    [
      { question: 'What do private class fields (# prefix) do in JavaScript?', options: ['Mark a field as deprecated', 'Make the field truly inaccessible from outside the class — enforced at the language level', 'Create a readonly field', 'Make the field static'], correct: 1 },
      { question: 'What is the difference between a named export and a default export?', options: ['Named exports are faster', 'A file can have many named exports but only one default export; import syntax differs', 'Default exports cannot be renamed', 'Named exports require curly braces in the file but not on import'], correct: 1 },
      { question: 'What does super() do in a class constructor?', options: ['Calls a superpower method', 'Calls the parent class constructor, required before using "this" in a derived class', 'Makes the class a superclass', 'Subscribes to an observable'], correct: 1 },
      { question: 'What is the advantage of Map over a plain object for key-value storage?', options: ['Maps are always faster', 'Maps allow any data type as keys, maintain insertion order, have built-in size, and don\'t have prototype issues', 'Maps are older and more compatible', 'Maps can be frozen'], correct: 1 },
      { question: 'What does new Set([1, 2, 2, 3, 3]) produce?', options: ['[1, 2, 2, 3, 3]', 'Set {1, 2, 3} — duplicates removed', '[1, 2, 3]', 'An error'], correct: 1 },
      { question: 'What is dynamic import() used for?', options: ['Importing at the top of the file dynamically', 'Lazy loading modules at runtime when needed, reducing initial bundle size', 'Importing from URLs only', 'Importing JSON files'], correct: 1 },
      { question: 'What does a getter method (get propertyName()) allow?', options: ['It gets a property from another object', 'Access the method result like a property without parentheses', 'It is required for all class properties', 'It prevents property modification'], correct: 1 },
      { question: 'What does Object.assign() do and what is its main limitation?', options: ['Deep clones all objects', 'Copies own enumerable properties from sources to target; limitation: shallow copy only', 'Merges class prototypes', 'It has no limitations'], correct: 1 }
    ],
    50,
    'https://www.youtube.com/embed/NCwa_xi0Uuc'
  ),

  lesson(
    '8. Browser APIs: Storage, Notifications, Service Workers & PWA',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-yellow-400 mb-2">📖 What You Will Learn</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li>IndexedDB for complex client-side storage</li>
          <li>Web Notifications API</li>
          <li>Service Workers: caching, offline, background sync</li>
          <li>Web Push notifications</li>
          <li>PWA manifest.json and installability</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🔔 Notifications API</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>// Request permission
async function requestNotificationPermission() {
  if (!('Notification' in window)) return false;
  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

// Show notification
function showNotification(title, body, icon = '/icons/icon-192.png') {
  if (Notification.permission !== 'granted') return;
  const notification = new Notification(title, {
    body,
    icon,
    badge: '/icons/badge-72.png',
    tag: 'pickup-update',        // replaces previous notification with same tag
    requireInteraction: true,    // stays until user interacts
    data: { url: '/pickups' }    // pass data for click handler
  });
  notification.onclick = () => {
    window.focus();
    window.location.href = notification.data.url;
    notification.close();
  };
}

showNotification('Rider Assigned!', 'Kwame will arrive in ~15 minutes');</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">⚙️ Service Worker Basics</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code">// ── Register in main JS ──
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('SW registered:', reg.scope))
    .catch(err => console.error('SW failed:', err));
}

// ── sw.js — the service worker ──
const CACHE_NAME = 'wastego-v1';
const STATIC_ASSETS = [
  '/', '/index.html', '/styles.css', '/app.js',
  '/icons/icon-192.png', '/offline.html'
];

// Install: cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting()) // activate immediately
  );
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  if (!event.request.url.startsWith('http')) return;
  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) return cached;
        return fetch(event.request)
          .then(response => {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
            return response;
          })
          .catch(() => caches.match('/offline.html'));
      })
  );
});</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">📱 PWA Manifest</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>// manifest.json
{
  "name": "WasteGo — Waste Collection",
  "short_name": "WasteGo",
  "description": "On-demand waste collection in Ghana",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0a0a0a",
  "theme_color": "#00ff88",
  "orientation": "portrait",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any maskable" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "screenshots": [
    { "src": "/screenshots/home.png", "sizes": "390x844", "type": "image/png", "form_factor": "narrow" }
  ]
}</code></pre>
        </div>
      </div>

      <div class="bg-green-500/10 p-6 rounded-xl">
        <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
        <p class="text-gray-300">Turn your weather widget or booking form into a PWA: Write a manifest.json with all required fields. Register a service worker that caches the app shell (HTML, CSS, JS). Implement a "Cache First" strategy for static assets and "Network First" for API calls. Add an offline.html page that shows when the network fails. Test installability with Chrome's Lighthouse audit — aim for 100% PWA score.</p>
      </div>
    </div>`,
    [
      { question: 'What is a Service Worker?', options: ['A backend web server', 'A JavaScript script that runs in the background, separate from the page, enabling offline, caching, and push notifications', 'A type of web worker for data processing', 'A browser plugin'], correct: 1 },
      { question: 'What does the install event in a service worker do?', options: ['Installs the app on the user\'s device', 'Fires when the SW is first registered, used to cache static assets', 'Updates the service worker', 'Sends an installation notification'], correct: 1 },
      { question: 'What is the Cache First strategy?', options: ['Cache everything aggressively', 'Serve from cache if available; fall back to network — best for static assets', 'Network always comes first', 'Only cache on first visit'], correct: 1 },
      { question: 'What does PWA display: "standalone" in the manifest do?', options: ['Makes the app display in full screen', 'Makes the app look like a native app — no browser chrome (URL bar, etc.)', 'Hides the status bar', 'Makes the app run in a separate window'], correct: 1 },
      { question: 'Why do Service Workers require HTTPS?', options: ['For faster connections', 'Because they can intercept and modify all network requests, making security essential', 'HTTPS is optional', 'For better caching'], correct: 1 },
      { question: 'What does Notification.requestPermission() return?', options: ['true or false', '"granted", "denied", or "default"', 'A notification object', 'A Promise that resolves to a boolean'], correct: 1 },
      { question: 'What does self.skipWaiting() do in a service worker?', options: ['Skips the install phase', 'Forces the new service worker to activate immediately without waiting for existing pages to close', 'Skips caching errors', 'Pauses the service worker'], correct: 1 },
      { question: 'What is the minimum required content in a PWA manifest for it to be installable?', options: ['Only an icon', 'name, icons (192px and 512px), start_url, and display', 'theme_color and background_color', 'Any valid JSON file'], correct: 1 }
    ],
    50,
    'https://www.youtube.com/embed/sFsRylCQblw'
  )
];
const jsLesson9 = lesson(
  '9. JavaScript Patterns: Debounce, Throttle, Observer & State',
  `<div class="space-y-6">
    <div class="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-6 rounded-xl">
      <h2 class="text-2xl font-bold text-yellow-400 mb-2">📖 What You Will Learn</h2>
      <ul class="list-disc list-inside text-gray-300 space-y-1">
        <li>Debounce and throttle for scroll and input performance</li>
        <li>Observer / EventEmitter pattern for decoupled code</li>
        <li>Building a mini Redux-style state store</li>
        <li>The Singleton and Factory patterns</li>
        <li>Memoization and lazy evaluation</li>
      </ul>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">⏱️ Debounce & Throttle</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>// DEBOUNCE — waits until user STOPS firing the event
// Best for: search inputs, form validation, window resize
function debounce(fn, delay = 300) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const searchRiders = debounce(async (query) => {
  const results = await api.get(\`/riders?q=\${query}\`);
  renderResults(results);
}, 400);

document.querySelector('#search').addEventListener('input', e =>
  searchRiders(e.target.value)
);
// API only fires 400ms AFTER user stops typing — saves hundreds of requests

// THROTTLE — fires at most once per interval
// Best for: scroll, mousemove, live GPS tracking
function throttle(fn, interval = 100) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= interval) {
      lastCall = now;
      return fn.apply(this, args);
    }
  };
}

const trackRider = throttle((position) => {
  updateMarkerOnMap(position);
  sendPositionToServer(position);
}, 2000); // send location at most every 2 seconds

navigator.geolocation.watchPosition(trackRider);</code></pre>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">📡 Observer / EventEmitter Pattern</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>class EventEmitter {
  #listeners = new Map();

  on(event, callback) {
    if (!this.#listeners.has(event)) this.#listeners.set(event, []);
    this.#listeners.get(event).push(callback);
    // Return unsubscribe function
    return () => this.off(event, callback);
  }

  off(event, callback) {
    const cbs = this.#listeners.get(event) || [];
    this.#listeners.set(event, cbs.filter(cb => cb !== callback));
  }

  emit(event, data) {
    (this.#listeners.get(event) || []).forEach(cb => cb(data));
  }

  once(event, callback) {
    const wrapper = (data) => { callback(data); this.off(event, wrapper); };
    this.on(event, wrapper);
  }
}

// Global app event bus
const bus = new EventEmitter();

// Rider module listens for pickup assignment
const unsubscribe = bus.on('pickupAssigned', ({ pickupId, rider }) => {
  showToast(\`Rider \${rider.name} is on the way!\`);
  updateMapMarker(rider.location);
});

// Payment module emits when payment is confirmed
bus.emit('pickupAssigned', { pickupId: 'p123', rider: riderData });

// Clean up listener when component unmounts
unsubscribe();</code></pre>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🏪 Mini State Store (Redux-style)</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>function createStore(reducer, initialState) {
  let state = initialState;
  const listeners = new Set();

  return {
    getState: () => structuredClone(state), // return copy, never original
    dispatch(action) {
      state = reducer(state, action);
      listeners.forEach(fn => fn(state));
    },
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn); // unsubscribe
    }
  };
}

// Reducer — pure function: (state, action) => newState
function appReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'ADD_PICKUP':
      return { ...state, pickups: [...state.pickups, action.payload] };
    case 'UPDATE_PICKUP':
      return {
        ...state,
        pickups: state.pickups.map(p =>
          p.id === action.payload.id ? { ...p, ...action.payload } : p
        )
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

const store = createStore(appReducer, {
  user: null, pickups: [], loading: false
});

// Subscribe to state changes
store.subscribe(state => {
  renderPickupList(state.pickups);
  updateNavbar(state.user);
});

// Dispatch actions
store.dispatch({ type: 'SET_USER', payload: { name: 'Kwame', role: 'rider' } });
store.dispatch({ type: 'ADD_PICKUP', payload: { id: 'p1', weight: 25 } });</code></pre>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🏭 Singleton & Factory Patterns</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>// SINGLETON — only one instance ever exists
class Database {
  static #instance = null;
  #connection = null;

  constructor(url) {
    if (Database.#instance) return Database.#instance;
    this.#connection = connectToDb(url);
    Database.#instance = this;
  }

  query(sql) { return this.#connection.run(sql); }
}

const db1 = new Database('mongodb://...');
const db2 = new Database('mongodb://...');
console.log(db1 === db2); // true — same instance

// FACTORY — create objects without new keyword
function createPickup({ customerId, type, weight, address }) {
  return {
    id: crypto.randomUUID(),
    customerId,
    type,
    weight,
    address,
    status: 'pending',
    createdAt: new Date().toISOString(),
    estimatedPrice: calculatePrice(type, weight)
  };
}

const pickup = createPickup({
  customerId: 'usr_1',
  type: 'organic',
  weight: 25,
  address: '14 Independence Ave, Accra'
});</code></pre>
      </div>
    </div>

    <div class="bg-green-500/10 p-6 rounded-xl">
      <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
      <p class="text-gray-300">Build a WasteGo mini-app: Create a state store with appReducer handling users, pickups, and UI state. Wire a search input with debounce (500ms) to filter pickups from the store. Use throttle on a simulated GPS update that fires every 200ms but only sends to the server every 2s. Create a global EventEmitter bus — emit events when pickups are added or status changes, and subscribe in separate UI modules to react.</p>
    </div>
  </div>`,
  [
    { question: 'What is the difference between debounce and throttle?', options: ['They are the same', 'Debounce waits until events stop firing; throttle fires at a fixed maximum rate', 'Throttle is for clicks; debounce is for scrolls', 'Debounce is faster'], correct: 1 },
    { question: 'When should you use debounce?', options: ['Scroll events', 'Search inputs — to wait until the user stops typing before calling the API', 'Button clicks', 'Page load'], correct: 1 },
    { question: 'What does an EventEmitter\'s emit() method do?', options: ['Sends an HTTP request', 'Calls all registered callbacks for a given event with the provided data', 'Removes all listeners', 'Creates a new event type'], correct: 1 },
    { question: 'What is a pure reducer function?', options: ['A function that reduces array length', 'A function that takes state and an action and returns NEW state without mutating the original', 'A function with no parameters', 'A function that only runs once'], correct: 1 },
    { question: 'What makes the Singleton pattern unique?', options: ['It creates many instances', 'Only one instance of the class can ever exist — subsequent instantiations return the same object', 'It is the fastest pattern', 'It uses private fields only'], correct: 1 },
    { question: 'What does store.subscribe() return in a Redux-style store?', options: ['The current state', 'A promise', 'An unsubscribe function to clean up the listener', 'The action that was dispatched'], correct: 2 },
    { question: 'Why should getState() return a copy of state rather than the original?', options: ['Copies are faster', 'To prevent external code from mutating the store state directly, breaking predictability', 'It is required by JavaScript', 'Original state cannot be returned'], correct: 1 },
    { question: 'What does the Factory pattern solve?', options: ['Memory leaks', 'Creates objects with consistent shape and logic without exposing the new keyword or constructor details', 'Prevents singleton issues', 'Manages async operations'], correct: 1 }
    ],
    50,
    'https://www.youtube.com/embed/kuirGzerU0Y'
  );  

// ── JS Lesson 10 ──
const jsLesson10 = lesson(
  '10. Final JS Project: Build a Dynamic Single-Page App',
  `<div class="space-y-6">
    <div class="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-6 rounded-xl">
      <h2 class="text-2xl font-bold text-yellow-400 mb-2">🏆 Final JavaScript Project</h2>
      <p class="text-gray-300">You will build a fully dynamic, API-driven single-page application using everything you have learned — no frameworks, pure JavaScript mastery.</p>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">📋 Project: WasteGo Dashboard SPA</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-black/60 p-4 rounded-lg">
          <p class="text-orange-400 font-semibold mb-2">Core Features</p>
          <ul class="text-gray-300 text-sm space-y-1 list-disc list-inside">
            <li>Client-side router (hash or history API)</li>
            <li>Login/register with localStorage auth</li>
            <li>Protected routes (redirect if not logged in)</li>
            <li>Pickup booking form with full validation</li>
            <li>Live pickup list with filter and sort</li>
            <li>Real-time status polling every 5 seconds</li>
          </ul>
        </div>
        <div class="bg-black/60 p-4 rounded-lg">
          <p class="text-purple-400 font-semibold mb-2">Technical Requirements</p>
          <ul class="text-gray-300 text-sm space-y-1 list-disc list-inside">
            <li>State store (createStore pattern)</li>
            <li>EventEmitter for cross-module communication</li>
            <li>Debounced search on pickup list</li>
            <li>Throttled scroll for infinite pagination</li>
            <li>Fetch with abort controller on route change</li>
            <li>Service worker for offline support</li>
          </ul>
        </div>
        <div class="bg-black/60 p-4 rounded-lg">
          <p class="text-cyan-400 font-semibold mb-2">Code Architecture</p>
          <ul class="text-gray-300 text-sm space-y-1 list-disc list-inside">
            <li>ES Modules: one file per concern</li>
            <li>router.js, store.js, api.js, auth.js</li>
            <li>components/: navbar, card, modal, toast</li>
            <li>pages/: home, login, dashboard, booking</li>
            <li>utils/: debounce, throttle, formatters</li>
          </ul>
        </div>
        <div class="bg-black/60 p-4 rounded-lg">
          <p class="text-green-400 font-semibold mb-2">Data & API</p>
          <ul class="text-gray-300 text-sm space-y-1 list-disc list-inside">
            <li>JSONBin.io or mockapi.io as backend</li>
            <li>Full CRUD: create, read, update, delete pickups</li>
            <li>Optimistic UI updates</li>
            <li>Error boundaries with retry logic</li>
            <li>localStorage cache with TTL</li>
          </ul>
        </div>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🗂️ Starter File Structure</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>wastego-spa/
├── index.html
├── manifest.json
├── sw.js
├── styles/
│   └── main.css
└── src/
    ├── main.js          ← entry point, bootstraps app
    ├── router.js        ← client-side routing
    ├── store.js         ← state management
    ├── api.js           ← all fetch calls
    ├── auth.js          ← login/logout/session
    ├── components/
    │   ├── navbar.js
    │   ├── toast.js
    │   └── modal.js
    ├── pages/
    │   ├── home.js
    │   ├── login.js
    │   ├── dashboard.js
    │   └── booking.js
    └── utils/
        ├── debounce.js
        ├── throttle.js
        └── format.js</code></pre>
      </div>
    </div>

    <div class="bg-yellow-500/10 p-4 rounded-lg">
      <p class="text-yellow-300">🎓 <strong>You have mastered JavaScript.</strong> Variables, functions, DOM, async, classes, modules, and professional patterns. You now think like a JavaScript developer. Next: Node.js — taking your JS skills to the server.</p>
    </div>
  </div>`,
  [
    { question: 'What is client-side routing in a SPA?', options: ['Server redirects the user to new pages', 'JavaScript intercepts navigation and swaps content without full page reloads', 'Using iframe for each page', 'A routing library only'], correct: 1 },
    { question: 'What is optimistic UI?', options: ['UI that always shows success', 'Updating the UI immediately before the server confirms, then reverting if it fails', 'A loading spinner pattern', 'UI that only shows on fast connections'], correct: 1 },
    { question: 'Why split a JS app into ES Modules (one file per concern)?', options: ['It is required by browsers', 'Separation of concerns, easier testing, better tree-shaking, team collaboration', 'Modules are faster', 'To avoid using classes'], correct: 1 },
    { question: 'What is a TTL cache?', options: ['A type-safe cache', 'Cached data that expires after a set time-to-live, forcing a fresh fetch', 'A throttled cache', 'A localStorage limit'], correct: 1 },
    { question: 'When should you cancel a fetch with AbortController?', options: ['Always after 5 seconds', 'When the user navigates away from the page that initiated the request', 'When the response is too large', 'AbortController is for images only'], correct: 1 },
    { question: 'What does "error boundary" mean in vanilla JS?', options: ['A CSS boundary', 'A try/catch wrapper around UI rendering that shows a fallback instead of crashing the whole app', 'A network firewall', 'A type check'], correct: 1 },
    { question: 'What is the History API used for in SPAs?', options: ['Viewing browser history', 'Programmatically changing the URL without page reload using pushState/replaceState', 'Storing app history in localStorage', 'Undoing user actions'], correct: 1 },
    { question: 'What does tree-shaking do in a JavaScript build?', options: ['Organizes the file tree', 'Removes unused exported code from the final bundle, reducing file size', 'Sorts imports alphabetically', 'Creates a dependency tree visualization'], correct: 1 }
  ],
  100,
  'https://www.youtube.com/embed/Ik1PBbCFnVE'
  )



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
}
await jsCourse.save();

console.log(`✅ JavaScript: added ${jsLessons.length} lessons`);


console.log('JavaScript Lessons seeded successfully');

// ═══════════════════════════════════════════
//  NODE.JS LESSONS (10 lessons)
// ═══════════════════════════════════════════
const nodejsLessons = [

lesson(
  '1. Node.js Fundamentals: Runtime, Modules & the File System',
  `<div class="space-y-6">
    <div class="bg-gradient-to-r from-green-500/10 to-teal-500/10 p-6 rounded-xl">
      <h2 class="text-2xl font-bold text-green-400 mb-2">📖 What You Will Learn</h2>
      <ul class="list-disc list-inside text-gray-300 space-y-1">
        <li>What Node.js is and how it differs from browser JS</li>
        <li>The Node.js event loop and non-blocking I/O</li>
        <li>CommonJS vs ES Modules in Node</li>
        <li>Built-in modules: fs, path, os, url</li>
        <li>Reading and writing files synchronously and asynchronously</li>
      </ul>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🟢 What is Node.js?</h2>
      <p class="text-gray-300 mb-3">Node.js is a JavaScript runtime built on Chrome's V8 engine. It lets you run JavaScript <strong class="text-green-400">outside the browser</strong> — on servers, your laptop, or a cloud function. This means one language (JS) for both frontend and backend.</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="bg-blue-500/10 p-4 rounded-lg">
          <p class="text-blue-300 font-semibold">Browser JS can:</p>
          <ul class="text-gray-400 text-sm list-disc list-inside">
            <li>Manipulate the DOM</li>
            <li>Handle user events</li>
            <li>Make fetch requests</li>
          </ul>
        </div>
        <div class="bg-green-500/10 p-4 rounded-lg">
          <p class="text-green-300 font-semibold">Node.js can:</p>
          <ul class="text-gray-400 text-sm list-disc list-inside">
            <li>Read/write files on disk</li>
            <li>Create HTTP servers</li>
            <li>Connect to databases</li>
            <li>Access environment variables</li>
          </ul>
        </div>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">📦 Modules: CommonJS vs ESM</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>// ── CommonJS (default in Node, .js files) ──
const fs = require('fs');
const path = require('path');
const { EventEmitter } = require('events');

module.exports = { myFunction, MyClass };
module.exports = singleThing;

// ── ES Modules (modern, use "type":"module" in package.json or .mjs) ──
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

export function myFunction() {}
export default class MyClass {}

// __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);</code></pre>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">📁 File System Module</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>import { promises as fs } from 'fs';
import path from 'path';

// READ a file
const content = await fs.readFile('data.json', 'utf8');
const data = JSON.parse(content);

// WRITE a file (creates or overwrites)
await fs.writeFile('output.json', JSON.stringify(data, null, 2), 'utf8');

// APPEND to file
await fs.appendFile('log.txt', \`[\${new Date().toISOString()}] Pickup booked\n\`);

// Check if file exists
try {
  await fs.access('config.json');
  console.log('File exists');
} catch {
  console.log('File does not exist');
}

// Read directory
const files = await fs.readdir('./uploads');
const jsonFiles = files.filter(f => f.endsWith('.json'));

// Create directory (recursive creates parent dirs too)
await fs.mkdir('./uploads/photos', { recursive: true });

// Delete file
await fs.unlink('./temp/old-file.txt');

// Rename / move
await fs.rename('./old-name.txt', './new-name.txt');

// Get file stats
const stats = await fs.stat('data.json');
console.log(stats.size);        // bytes
console.log(stats.mtime);       // last modified date
console.log(stats.isDirectory()); // false

// path utilities
path.join(__dirname, 'uploads', 'photo.jpg'); // safe path join
path.resolve('./data.json');    // absolute path
path.extname('photo.jpg');      // '.jpg'
path.basename('path/to/file.js'); // 'file.js'
path.dirname('path/to/file.js');  // 'path/to'</code></pre>
      </div>
    </div>

    <div class="bg-green-500/10 p-6 rounded-xl">
      <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
      <p class="text-gray-300">Build a CLI tool: Read a JSON file of 10 WasteGo pickups. Filter only completed ones. Calculate total revenue. Write a summary report to report.txt with the date, count, and revenue. Log each step to a log.txt file with timestamps. Handle the case where the input file doesn't exist by creating it with default data.</p>
    </div>
  </div>`,
  [
    { question: 'What is Node.js?', options: ['A browser extension', 'A JavaScript runtime that lets you run JS on the server/outside the browser', 'A database', 'A frontend framework'], correct: 1 },
    { question: 'What is the main difference between require() and import?', options: ['require is faster', 'require is CommonJS (synchronous, Node default); import is ESM (static, modern standard)', 'import works in Node only', 'They are identical'], correct: 1 },
    { question: 'What does fs.readFile() return when using the promises API?', options: ['A string directly', 'A Promise that resolves to the file contents', 'A Buffer always', 'An event emitter'], correct: 1 },
    { question: 'What does path.join() do?', options: ['Combines URLs', 'Safely joins path segments with the OS-appropriate separator', 'Joins arrays', 'Creates a directory'], correct: 1 },
    { question: 'What does the "utf8" encoding argument in readFile do?', options: ['Compresses the file', 'Returns a string instead of a raw Buffer', 'Encrypts the file', 'Sets file permissions'], correct: 1 },
    { question: 'What does fs.mkdir with { recursive: true } do?', options: ['Creates only the final directory', 'Creates all parent directories that don\'t exist yet, like mkdir -p', 'Recursively deletes and recreates', 'Loops through all files'], correct: 1 },
    { question: 'What is __dirname in Node.js?', options: ['The current user\'s home directory', 'The absolute path of the current module\'s directory', 'The root of the project', 'A global date variable'], correct: 1 },
    { question: 'What does module.exports do in CommonJS?', options: ['Imports a module', 'Defines what a module exposes when required by another file', 'Runs the module immediately', 'Sets module metadata'], correct: 1 }
  ],
  50,
  'https://www.youtube.com/embed/TlB_eWDSMt4'
),

lesson(
  '2. npm, package.json & Managing Dependencies',
  `<div class="space-y-6">
    <div class="bg-gradient-to-r from-green-500/10 to-teal-500/10 p-6 rounded-xl">
      <h2 class="text-2xl font-bold text-green-400 mb-2">📖 What You Will Learn</h2>
      <ul class="list-disc list-inside text-gray-300 space-y-1">
        <li>What npm is and how the Node ecosystem works</li>
        <li>package.json: every field explained</li>
        <li>Installing, updating, and removing packages</li>
        <li>devDependencies vs dependencies</li>
        <li>npm scripts for automation</li>
        <li>Semantic versioning (semver)</li>
      </ul>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">📦 package.json — The Full Picture</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>{
  "name": "wastego-api",
  "version": "1.0.0",
  "description": "WasteGo backend API server",
  "main": "src/index.js",
  "type": "module",
  "private": true,

  "scripts": {
    "start":   "node src/index.js",
    "dev":     "nodemon src/index.js --env-file .env",
    "test":    "node --test src/**/*.test.js",
    "lint":    "eslint src/",
    "build":   "tsc",
    "seed":    "node scripts/seed.js",
    "db:reset": "node scripts/reset-db.js"
  },

  "dependencies": {
    "express":         "^4.18.2",
    "mongoose":        "^7.6.3",
    "bcryptjs":        "^2.4.3",
    "jsonwebtoken":    "^9.0.2",
    "dotenv":          "^16.3.1",
    "cors":            "^2.8.5",
    "helmet":          "^7.1.0",
    "express-rate-limit": "^7.1.5",
    "zod":             "^3.22.4"
  },

  "devDependencies": {
    "nodemon":   "^3.0.2",
    "eslint":    "^8.55.0"
  },

  "engines": {
    "node": ">=18.0.0"
  }
}</code></pre>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🔧 Essential npm Commands</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code># Initialize a new project
npm init -y         # create package.json with defaults

# Install packages
npm install express mongoose    # save to dependencies
npm install -D nodemon eslint   # save to devDependencies (-D)
npm install -g nodemon          # global install (available everywhere)

# Install exact versions (no updates)
npm install express@4.18.2

# Install all dependencies from package.json
npm install         # or: npm ci (clean install — uses package-lock.json exactly)

# Update packages
npm update          # update within semver range
npm outdated        # see what can be updated

# Remove packages
npm uninstall express

# Run scripts
npm run dev
npm run seed
npm start           # special: no "run" needed
npm test            # special: no "run" needed

# Audit for security vulnerabilities
npm audit
npm audit fix

# Semver ranges in package.json
"express": "4.18.2"   # exact version only
"express": "~4.18.2"  # patch updates: 4.18.x
"express": "^4.18.2"  # minor updates: 4.x.x (default with npm install)
"express": "*"        # any version (dangerous!)</code></pre>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🔒 .env & dotenv</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code># .env (NEVER commit this to git!)
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/wastego
JWT_SECRET=super-secret-key-change-in-production
NODE_ENV=development
HUBTEL_CLIENT_ID=your-hubtel-id
HUBTEL_CLIENT_SECRET=your-hubtel-secret

# .gitignore
node_modules/
.env
.env.local
dist/

# In your Node.js code (Node 20.6+ has built-in --env-file flag)
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI;
const jwtSecret = process.env.JWT_SECRET;

if (!mongoUri) throw new Error('MONGODB_URI is required');</code></pre>
      </div>
    </div>

    <div class="bg-green-500/10 p-6 rounded-xl">
      <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
      <p class="text-gray-300">Set up a new Node.js project from scratch: npm init, install express + mongoose + dotenv as dependencies, nodemon as devDependency. Write scripts for start, dev, and seed. Create a .env file with PORT and MONGODB_URI. Create a .gitignore. Read and validate all required env variables at startup — throw descriptive errors if any are missing. Test npm run dev restarts on file save.</p>
    </div>
  </div>`,
  [
    { question: 'What is the difference between dependencies and devDependencies?', options: ['They are identical', 'dependencies are needed in production; devDependencies are only needed during development', 'devDependencies are global packages', 'dependencies are for frontend; devDependencies for backend'], correct: 1 },
    { question: 'What does npm ci do differently from npm install?', options: ['It is faster on all machines', 'It installs exact versions from package-lock.json without updating it — ideal for CI/CD', 'It clears the cache', 'It installs global packages'], correct: 1 },
    { question: 'What does the ^ prefix on a version mean (e.g. "^4.18.2")?', options: ['Install any version', 'Install compatible minor/patch updates within major version 4', 'Install exact version only', 'Install only patch updates'], correct: 1 },
    { question: 'Why should you never commit your .env file?', options: ['It slows git down', 'It contains secrets like database passwords and API keys that must not be public', 'npm ignores it anyway', '.env files are binary and git can\'t handle them'], correct: 1 },
    { question: 'What does nodemon do?', options: ['Manages Node versions', 'Watches your files and automatically restarts the Node server on changes', 'Monitors server performance', 'Lints Node.js code'], correct: 1 },
    { question: 'What does process.env give you access to?', options: ['The current process ID only', 'Environment variables set in .env or the system environment', 'The package.json contents', 'npm scripts'], correct: 1 },
    { question: 'What is the purpose of package-lock.json?', options: ['It locks the Node.js version', 'It records the exact dependency tree installed so every developer gets identical packages', 'It prevents package updates', 'It is a backup of package.json'], correct: 1 },
    { question: 'What does npm audit do?', options: ['Checks code quality', 'Scans installed packages for known security vulnerabilities', 'Counts total package size', 'Audits npm script performance'], correct: 1 }
  ],
  50,
  'https://www.youtube.com/embed/P3aKRdUyr0s'
),

lesson(
  '3. Building an HTTP Server & Understanding REST',
  `<div class="space-y-6">
    <div class="bg-gradient-to-r from-green-500/10 to-teal-500/10 p-6 rounded-xl">
      <h2 class="text-2xl font-bold text-green-400 mb-2">📖 What You Will Learn</h2>
      <ul class="list-disc list-inside text-gray-300 space-y-1">
        <li>HTTP from scratch with Node's http module</li>
        <li>Request methods, headers, status codes</li>
        <li>REST API design principles</li>
        <li>Parsing request body and query strings</li>
        <li>Why Express exists and what it solves</li>
      </ul>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🌐 HTTP From Scratch</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>import http from 'http';
import { URL } from 'url';

// In-memory data (replace with DB later)
let pickups = [
  { id: '1', customer: 'Kwame', weight: 25, status: 'pending' }
];

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, \`http://\${req.headers.host}\`);
  const pathname = url.pathname;
  const method = req.method;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  // Parse JSON body
  const body = await parseBody(req);

  // Route matching
  if (method === 'GET' && pathname === '/pickups') {
    res.writeHead(200);
    res.end(JSON.stringify({ success: true, data: pickups }));

  } else if (method === 'GET' && pathname.startsWith('/pickups/')) {
    const id = pathname.split('/')[2];
    const pickup = pickups.find(p => p.id === id);
    if (!pickup) {
      res.writeHead(404);
      res.end(JSON.stringify({ success: false, error: 'Pickup not found' }));
    } else {
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, data: pickup }));
    }

  } else if (method === 'POST' && pathname === '/pickups') {
    const newPickup = { id: Date.now().toString(), ...body, status: 'pending' };
    pickups.push(newPickup);
    res.writeHead(201);
    res.end(JSON.stringify({ success: true, data: newPickup }));

  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

function parseBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => {
      try { resolve(JSON.parse(data)); }
      catch { resolve({}); }
    });
  });
}

server.listen(3000, () => console.log('Server running on http://localhost:3000'));</code></pre>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">📐 REST API Design</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>// REST: REpresentational State Transfer
// Resources are nouns. Methods describe the action.

// ── WasteGo REST API Design ──
GET    /api/v1/pickups              → list all pickups (with filters)
GET    /api/v1/pickups/:id          → get one pickup
POST   /api/v1/pickups              → create a pickup
PUT    /api/v1/pickups/:id          → replace a pickup fully
PATCH  /api/v1/pickups/:id          → update specific fields
DELETE /api/v1/pickups/:id          → delete a pickup

GET    /api/v1/pickups/:id/rider    → get rider assigned to pickup
POST   /api/v1/pickups/:id/accept   → rider accepts pickup

// ── Query parameters for filtering ──
GET /api/v1/pickups?status=completed&region=accra&page=2&limit=20

// ── HTTP Status Codes ──
200 OK           → success
201 Created      → resource created (POST)
204 No Content   → success, no body (DELETE)
400 Bad Request  → invalid input (your fault)
401 Unauthorized → not logged in
403 Forbidden    → logged in but no permission
404 Not Found    → resource doesn't exist
409 Conflict     → duplicate (email already registered)
422 Unprocessable → validation error
429 Too Many Requests → rate limited
500 Internal Server Error → our bug

// ── Standard response envelope ──
// Success:
{ "success": true,  "data": {...},  "meta": { "total": 100, "page": 1 } }
// Error:
{ "success": false, "error": "Pickup not found", "code": "PICKUP_NOT_FOUND" }</code></pre>
      </div>
    </div>

    <div class="bg-green-500/10 p-6 rounded-xl">
      <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
      <p class="text-gray-300">Build a pure Node.js REST API (no Express) for WasteGo pickups: GET /pickups (with ?status= filter), GET /pickups/:id, POST /pickups, PATCH /pickups/:id/status, DELETE /pickups/:id. Use an in-memory array as the database. Return proper status codes and the standard response envelope. Test all routes with Postman or Thunder Client.</p>
    </div>
  </div>`,
  [
    { question: 'What does REST stand for?', options: ['Runtime Execution State Transfer', 'REpresentational State Transfer', 'Request and Response Standard Template', 'Remote Execution Service Technology'], correct: 1 },
    { question: 'What HTTP method should you use to partially update a resource?', options: ['POST', 'PUT', 'PATCH', 'UPDATE'], correct: 2 },
    { question: 'What HTTP status code means "resource created successfully"?', options: ['200', '201', '204', '202'], correct: 1 },
    { question: 'What is the difference between PUT and PATCH?', options: ['They are identical', 'PUT replaces the entire resource; PATCH updates only specified fields', 'PATCH creates; PUT updates', 'PUT is for files; PATCH is for JSON'], correct: 1 },
    { question: 'What does HTTP 401 mean?', options: ['Not found', 'Server error', 'Not authenticated — the request requires login', 'Rate limited'], correct: 2 },
    { question: 'Why should REST API URLs use nouns not verbs?', options: ['It is a naming convention only', 'Because the HTTP method already describes the action — the URL describes the resource', 'Verbs are slower to parse', 'REST forbids verbs in URLs'], correct: 1 },
    { question: 'What does the Content-Type: application/json header tell the server?', options: ['The server should return JSON', 'The request body is formatted as JSON', 'The API version is JSON-compatible', 'To skip body parsing'], correct: 1 },
    { question: 'What does HTTP 429 mean?', options: ['Invalid JSON', 'Too Many Requests — the client is being rate limited', 'Request timeout', 'Payload too large'], correct: 1 }
  ],
  50,
  'https://www.youtube.com/embed/SccSCuHhOw0'
),

lesson(
  '4. MongoDB & Mongoose: Database Design & CRUD',
  `<div class="space-y-6">
    <div class="bg-gradient-to-r from-green-500/10 to-teal-500/10 p-6 rounded-xl">
      <h2 class="text-2xl font-bold text-green-400 mb-2">📖 What You Will Learn</h2>
      <ul class="list-disc list-inside text-gray-300 space-y-1">
        <li>MongoDB document model vs relational databases</li>
        <li>Connecting to MongoDB Atlas with Mongoose</li>
        <li>Schemas, Models, and data validation</li>
        <li>Full CRUD with Mongoose methods</li>
        <li>Querying: filter, sort, limit, populate (joins)</li>
      </ul>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🍃 Mongoose Schema & Model</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>import mongoose from 'mongoose';

// ── User Schema ──
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
  },
  phone: {
    type: String,
    required: true,
    match: [/^0[235][0-9]{8}$/, 'Invalid Ghana phone number']
  },
  role: {
    type: String,
    enum: ['customer', 'rider', 'admin'],
    default: 'customer'
  },
  passwordHash: { type: String, required: true, select: false }, // hidden by default
  isActive: { type: Boolean, default: true },
  region: { type: String, enum: ['accra', 'kumasi', 'tema', 'takoradi'] }
}, {
  timestamps: true // adds createdAt and updatedAt automatically
});

// Virtual field (not stored in DB)
userSchema.virtual('displayName').get(function() {
  return \`\${this.name} (\${this.role})\`;
});

// Instance method
userSchema.methods.toPublicJSON = function() {
  return { id: this._id, name: this.name, email: this.email, role: this.role };
};

// Static method (on the Model)
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

export const User = mongoose.model('User', userSchema);

// ── Pickup Schema ──
const pickupSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rider:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  wasteType: { type: String, enum: ['organic', 'plastic', 'electronic', 'mixed'], required: true },
  estimatedWeight: { type: Number, required: true, min: 1, max: 2000 },
  address: {
    street: String,
    city: { type: String, default: 'Accra' },
    coordinates: {
      lat: { type: Number, min: -90, max: 90 },
      lng: { type: Number, min: -180, max: 180 }
    }
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  price: { amount: Number, currency: { type: String, default: 'GHS' } },
  paymentMethod: { type: String, enum: ['momo', 'cash'], required: true },
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  notes: { type: String, maxlength: 500 }
}, { timestamps: true });

export const Pickup = mongoose.model('Pickup', pickupSchema);</code></pre>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🔍 CRUD & Querying</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>// ── CREATE ──
const pickup = await Pickup.create({
  customer: userId,
  wasteType: 'organic',
  estimatedWeight: 25,
  paymentMethod: 'momo'
});

// ── READ ──
const all = await Pickup.find({});                          // all documents
const pending = await Pickup.find({ status: 'pending' });   // filter
const one = await Pickup.findById(id);                      // by _id
const byCustomer = await Pickup.findOne({ customer: userId });

// Chaining query operators
const results = await Pickup.find({
  status: 'completed',
  'address.city': 'Accra',
  estimatedWeight: { $gte: 10, $lte: 100 }  // between 10 and 100
})
  .select('customer wasteType status price -_id') // include/exclude fields
  .populate('customer', 'name email phone')       // JOIN: replace ObjectId with user data
  .populate('rider', 'name phone')
  .sort({ createdAt: -1 })                        // newest first
  .limit(20)
  .skip(0)                                         // pagination: skip * limit
  .lean();                                         // returns plain JS objects (faster)

// ── UPDATE ──
await Pickup.findByIdAndUpdate(
  id,
  { status: 'accepted', rider: riderId },
  { new: true, runValidators: true }  // return updated doc, run schema validation
);

await Pickup.updateMany(
  { status: 'pending', createdAt: { $lt: oneDayAgo } },
  { status: 'cancelled' }
);

// ── DELETE ──
await Pickup.findByIdAndDelete(id);
await Pickup.deleteMany({ customer: userId });

// ── Aggregation (powerful analytics) ──
const stats = await Pickup.aggregate([
  { $match: { status: 'completed' } },
  { $group: {
    _id: '$wasteType',
    totalPickups: { $sum: 1 },
    totalRevenue: { $sum: '$price.amount' },
    avgWeight: { $avg: '$estimatedWeight' }
  }},
  { $sort: { totalRevenue: -1 } }
]);</code></pre>
      </div>
    </div>

    <div class="bg-green-500/10 p-6 rounded-xl">
      <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
      <p class="text-gray-300">Design and implement the full WasteGo database schema: User, Rider (extends User with vehicle, rating, wallet), Pickup, and Transaction models. Write a seed script that creates 5 users, 3 riders, 20 pickups (mixed statuses), and 10 transactions. Write query functions: getPickupsByRegion(region, page), getRiderLeaderboard(), getRevenueStats(startDate, endDate) using aggregation. Test all in Compass or Mongo Atlas UI.</p>
    </div>
  </div>`,
  [
    { question: 'What is a Mongoose Schema?', options: ['A database table', 'A blueprint that defines the structure, types, and validation rules for a MongoDB document', 'A SQL query', 'A MongoDB index'], correct: 1 },
    { question: 'What does the ref property in a Mongoose schema field do?', options: ['References a CSS class', 'Links the field to another model, enabling populate() to join data', 'Sets a field as required', 'Refers to a validation function'], correct: 1 },
    { question: 'What does .populate() do in a Mongoose query?', options: ['Fills an array with mock data', 'Replaces ObjectId references with the actual document data from another collection', 'Adds default values', 'Populates required fields'], correct: 1 },
    { question: 'What does { new: true } do in findByIdAndUpdate()?', options: ['Creates a new document', 'Returns the updated document instead of the original pre-update document', 'Runs the update twice', 'Adds a new field'], correct: 1 },
    { question: 'What does .lean() do in a Mongoose query?', options: ['Makes the query faster by skipping validation', 'Returns plain JavaScript objects instead of Mongoose Documents, improving performance', 'Removes empty fields', 'Enables lazy loading'], correct: 1 },
    { question: 'What does the $gte operator do in MongoDB?', options: ['Greater than exclusive', 'Greater than or equal to', 'Get the first element', 'Global text expression'], correct: 1 },
    { question: 'What does Mongoose aggregation allow you to do?', options: ['Aggregate npm packages', 'Perform complex data transformations and analytics using a pipeline of stages', 'Join multiple databases', 'Run multiple queries in parallel'], correct: 1 },
    { question: 'What does { select: false } on a schema field do?', options: ['Deletes the field', 'Excludes the field from query results by default (useful for passwords)', 'Makes the field read-only', 'Hides it from validators'], correct: 1 }
  ],
  50,
  'https://www.youtube.com/embed/DZBGEVgL2eE'
),

lesson(
  '5. Authentication: JWT, Bcrypt & Secure Sessions',
  `<div class="space-y-6">
    <div class="bg-gradient-to-r from-green-500/10 to-teal-500/10 p-6 rounded-xl">
      <h2 class="text-2xl font-bold text-green-400 mb-2">📖 What You Will Learn</h2>
      <ul class="list-disc list-inside text-gray-300 space-y-1">
        <li>How authentication and authorization differ</li>
        <li>Hashing passwords with bcrypt (never store plaintext!)</li>
        <li>JWT: structure, signing, verifying, refresh tokens</li>
        <li>Auth middleware to protect routes</li>
        <li>Security best practices for Node.js APIs</li>
      </ul>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🔐 Password Hashing with bcrypt</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from './models/User.js';

// ── REGISTER ──
export async function register(req, res) {
  try {
    const { name, email, password, phone, role } = req.body;

    // Check if email already exists
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(409).json({ error: 'Email already registered' });

    // Hash password (cost factor 12 = ~300ms per hash, good balance)
    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      name, email, phone, role: role || 'customer', passwordHash
    });

    const token = signToken(user._id);
    res.status(201).json({
      success: true,
      token,
      user: user.toPublicJSON()
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// ── LOGIN ──
export async function login(req, res) {
  const { email, password } = req.body;

  // Must explicitly select passwordHash (it has select: false)
  const user = await User.findOne({ email }).select('+passwordHash');
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

  const token = signToken(user._id);
  res.json({ success: true, token, user: user.toPublicJSON() });
}

// ── JWT ──
function signToken(userId) {
  return jwt.sign(
    { sub: userId, iat: Date.now() },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// ── AUTH MIDDLEWARE ──
export async function protect(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.sub).select('-passwordHash');
    if (!req.user) return res.status(401).json({ error: 'User not found' });
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// ── ROLE MIDDLEWARE ──
export function restrictTo(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'You do not have permission' });
    }
    next();
  };
}

// Usage in routes:
// router.get('/admin/users', protect, restrictTo('admin'), getAllUsers);</code></pre>
      </div>
    </div>

    <div class="bg-green-500/10 p-6 rounded-xl">
      <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
      <p class="text-gray-300">Implement full auth for WasteGo: POST /auth/register (hash password, create user, return JWT). POST /auth/login (compare hash, return JWT). GET /auth/me (protected — return current user from token). Implement restrictTo middleware so only admins can DELETE users and only riders can PATCH pickup status to "completed". Test the entire auth flow with Postman including expired tokens and wrong passwords.</p>
    </div>
  </div>`,
  [
    { question: 'Why should you never store passwords in plaintext?', options: ['It takes more storage', 'If the database is breached, attackers get all passwords immediately', 'Plaintext is slower to compare', 'It is a Node.js limitation'], correct: 1 },
    { question: 'What is bcrypt\'s "cost factor" (salt rounds)?', options: ['The number of characters hashed', 'A number that controls how computationally expensive the hash is — higher = slower = more secure', 'The password length requirement', 'The number of database queries'], correct: 1 },
    { question: 'What are the three parts of a JWT?', options: ['Username, password, role', 'Header (algorithm), Payload (claims), Signature (verification)', 'Token, secret, expiry', 'ID, timestamp, hash'], correct: 1 },
    { question: 'What does jwt.verify() do?', options: ['Creates a new token', 'Checks the token\'s signature and expiry, returning the payload if valid', 'Hashes the token', 'Sends the token to the server'], correct: 1 },
    { question: 'What is the difference between authentication and authorization?', options: ['They are the same', 'Authentication proves WHO you are; authorization determines WHAT you can do', 'Authentication is for APIs; authorization is for UIs', 'Authorization happens first'], correct: 1 },
    { question: 'Why do you need to add .select("+passwordHash") in the login query?', options: ['To improve query speed', 'Because the schema has select:false on passwordHash, hiding it by default', 'It is required for bcrypt.compare()', 'To prevent SQL injection'], correct: 1 },
    { question: 'Where should a JWT be stored on the client?', options: ['In a cookie (httpOnly, secure) or in memory — NOT localStorage (XSS risk)', 'Always in localStorage for convenience', 'In the URL query string', 'In sessionStorage only'], correct: 0 },
    { question: 'What does the middleware next() function do in Express?', options: ['Goes to the next route in the router file', 'Passes control to the next middleware function in the chain', 'Ends the request-response cycle', 'Sends a response with status 200'], correct: 1 }
  ],
  50,
  'https://www.youtube.com/embed/mbsmsi7l3r4'
),

lesson(
  '6. Streams, Events & Node.js Core Architecture',
  `<div class="space-y-6">
    <div class="bg-gradient-to-r from-green-500/10 to-teal-500/10 p-6 rounded-xl">
      <h2 class="text-2xl font-bold text-green-400 mb-2">📖 What You Will Learn</h2>
      <ul class="list-disc list-inside text-gray-300 space-y-1">
        <li>Node.js EventEmitter in depth</li>
        <li>Readable, Writable, Transform, and Duplex streams</li>
        <li>Piping streams for file processing</li>
        <li>Worker threads for CPU-intensive tasks</li>
        <li>Child processes and shell commands from Node</li>
      </ul>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🌊 Streams</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>import fs from 'fs';
import { Transform, pipeline } from 'stream';
import { promisify } from 'util';
const pipelineAsync = promisify(pipeline);

// ── Read large file with streams (memory-efficient) ──
// Instead of: const data = await fs.promises.readFile('huge.csv') // loads ALL into memory
// Use streams:
const readable = fs.createReadStream('pickups-export.csv', { encoding: 'utf8' });
const writable = fs.createWriteStream('pickups-filtered.csv');

// Transform stream — process data chunk by chunk
const filterCompleted = new Transform({
  transform(chunk, encoding, callback) {
    const lines = chunk.toString().split('\n');
    const filtered = lines
      .filter(line => line.includes('completed'))
      .join('\n');
    callback(null, filtered);
  }
});

// Pipeline: readable → transform → writable
await pipelineAsync(readable, filterCompleted, writable);
console.log('Done! Processed without loading entire file into memory.');

// ── HTTP response as stream (send large data efficiently) ──
app.get('/export/pickups', (req, res) => {
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="pickups.csv"');
  const stream = fs.createReadStream('./exports/pickups.csv');
  stream.pipe(res); // streams directly to HTTP response
});</code></pre>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">⚙️ Child Processes</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>import { exec, spawn } from 'child_process';
import { promisify } from 'util';
const execAsync = promisify(exec);

// Run a shell command
const { stdout } = await execAsync('ls -la ./uploads');
console.log(stdout);

// Run a long process with streaming output
const child = spawn('node', ['scripts/seed.js'], { env: process.env });
child.stdout.on('data', data => console.log('[seed]', data.toString()));
child.stderr.on('data', data => console.error('[seed error]', data.toString()));
child.on('close', code => console.log(\`Seeder exited with code \${code}\`));</code></pre>
      </div>
    </div>

    <div class="bg-green-500/10 p-6 rounded-xl">
      <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
      <p class="text-gray-300">Build a CSV export endpoint: GET /api/export/pickups streams a CSV file of all pickups without loading them all into memory. Use a Transform stream to convert each Mongoose document to a CSV row. Add a Content-Disposition header so browsers trigger a download. Then build a CSV import endpoint: POST /api/import/pickups that reads an uploaded CSV file using streams and creates Pickup documents in the database.</p>
    </div>
  </div>`,
  [
    { question: 'What is the main advantage of using Node.js streams over loading an entire file into memory?', options: ['Streams are always faster', 'Streams process data in chunks, using constant low memory even for files of any size', 'Streams support more file formats', 'Streams work without async/await'], correct: 1 },
    { question: 'What does stream.pipe() do?', options: ['Connects to a database pipe', 'Automatically flows data from a readable stream into a writable stream', 'Filters stream data', 'Converts stream to array'], correct: 1 },
    { question: 'What is a Transform stream?', options: ['A stream that only reads', 'A stream that only writes', 'A duplex stream that can modify data passing through it', 'A stream that transforms files to strings'], correct: 2 },
    { question: 'What does promisify() from the util module do?', options: ['Converts a Promise to a callback', 'Converts a callback-based function to return a Promise', 'Validates Promise chains', 'Creates async functions'], correct: 1 },
    { question: 'What is the Node.js EventEmitter used for?', options: ['Browser DOM events', 'Implementing the observer pattern in Node — emit named events and register listeners', 'HTTP request events only', 'Database change events only'], correct: 1 },
    { question: 'Why use child_process.spawn() over exec() for long-running processes?', options: ['spawn() is faster', 'spawn() streams stdout/stderr in real-time; exec() buffers all output and only returns when done', 'exec() is deprecated', 'spawn() runs in a separate thread'], correct: 1 },
    { question: 'What does fs.createReadStream() do?', options: ['Creates a writable stream', 'Opens a file and returns a readable stream that emits chunks', 'Reads the entire file at once', 'Creates a temporary file'], correct: 1 },
    { question: 'When would you use Worker Threads in Node.js?', options: ['For all database queries', 'For CPU-intensive tasks (image processing, heavy calculation) that would block the event loop', 'For all file operations', 'Worker threads replace async/await'], correct: 1 }
  ],
  50,
  'https://www.youtube.com/embed/GlybFFZtK_Y'
),

lesson(
  '7. Error Handling, Logging & Production Best Practices',
  `<div class="space-y-6">
    <div class="bg-gradient-to-r from-green-500/10 to-teal-500/10 p-6 rounded-xl">
      <h2 class="text-2xl font-bold text-green-400 mb-2">📖 What You Will Learn</h2>
      <ul class="list-disc list-inside text-gray-300 space-y-1">
        <li>Global error handlers in Node.js</li>
        <li>Structured logging with Winston or Pino</li>
        <li>Graceful shutdown — handle SIGTERM properly</li>
        <li>Input validation with Zod</li>
        <li>Rate limiting, security headers, and CORS</li>
      </ul>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🛡️ Input Validation with Zod</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>import { z } from 'zod';

// Define schema
const createPickupSchema = z.object({
  wasteType: z.enum(['organic', 'plastic', 'electronic', 'mixed']),
  estimatedWeight: z.number().min(1).max(2000),
  address: z.object({
    street: z.string().min(5),
    city: z.string().default('Accra')
  }),
  paymentMethod: z.enum(['momo', 'cash']),
  notes: z.string().max(500).optional()
});

// Validation middleware
function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(422).json({
        error: 'Validation failed',
        details: result.error.flatten().fieldErrors
      });
    }
    req.body = result.data; // replace body with sanitized data
    next();
  };
}

// Usage
router.post('/pickups', protect, validate(createPickupSchema), createPickup);</code></pre>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🏁 Graceful Shutdown & Global Errors</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code">// Handle uncaught errors — prevent silent crashes
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
  process.exit(1); // always exit — state is unknown
});

process.on('unhandledRejection', (reason) => {
  console.error('UNHANDLED REJECTION:', reason);
  process.exit(1);
});

// Graceful shutdown — finish in-flight requests before closing
async function gracefulShutdown(signal) {
  console.log(\`\${signal} received. Shutting down gracefully...\`);
  server.close(async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed. Process terminated.');
    process.exit(0);
  });
  // Force exit after 10s if graceful shutdown hangs
  setTimeout(() => process.exit(1), 10000);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT',  () => gracefulShutdown('SIGINT'));</code></pre>
      </div>
    </div>

    <div class="bg-green-500/10 p-6 rounded-xl">
      <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
      <p class="text-gray-300">Harden your WasteGo API: Add Zod validation to all POST/PATCH routes. Add a global Express error handler that formats all errors consistently. Add rate limiting (100 requests per 15 minutes per IP). Add helmet for security headers. Add CORS with an allowed origins list. Add graceful shutdown on SIGTERM. Add pino or winston logging that writes JSON logs to a file in production. Run npm audit and fix all vulnerabilities.</p>
    </div>
  </div>`,
  [
    { question: 'What does process.on("unhandledRejection") catch?', options: ['Syntax errors', 'Promises that were rejected but had no .catch() handler', 'All errors in Node.js', 'Network errors only'], correct: 1 },
    { question: 'Why should you always call process.exit(1) after an uncaughtException?', options: ['To restart the server', 'Because after an uncaught exception the process state is unknown and unreliable — it must restart clean', 'It is optional', 'To send an error email'], correct: 1 },
    { question: 'What is graceful shutdown?', options: ['Shutting down with a friendly message', 'Allowing in-flight requests to complete and closing database connections before the process exits', 'Restarting the server automatically', 'Saving state to disk before shutdown'], correct: 1 },
    { question: 'What does Zod\'s safeParse() return?', options: ['Throws on error', 'An object with { success, data } on success or { success, error } on failure — never throws', 'The validated data directly', 'A Promise'], correct: 1 },
    { question: 'What does the helmet npm package do?', options: ['Hides server errors', 'Sets various HTTP security headers (CSP, HSTS, X-Frame-Options, etc.)', 'Adds authentication', 'Validates input'], correct: 1 },
    { question: 'What is rate limiting used for?', options: ['Limiting database query size', 'Preventing brute force attacks and API abuse by limiting requests per IP per time window', 'Limiting response size', 'Limiting concurrent connections'], correct: 1 },
    { question: 'What is structured logging (JSON logs)?', options: ['Pretty-printed console.log statements', 'Log entries as JSON objects with consistent fields, making them searchable and parseable by log management tools', 'Logging only errors', 'Logging to a database'], correct: 1 },
    { question: 'What does CORS protect against?', options: ['SQL injection', 'Unauthorized cross-origin requests — only allowed origins can call your API from a browser', 'XSS attacks', 'Password attacks'], correct: 1 }
  ],
  50,
  'https://www.youtube.com/embed/1aXZQcG2Y6I'
),

lesson(
  '8. File Uploads, Email & External APIs',
  `<div class="space-y-6">
    <div class="bg-gradient-to-r from-green-500/10 to-teal-500/10 p-6 rounded-xl">
      <h2 class="text-2xl font-bold text-green-400 mb-2">📖 What You Will Learn</h2>
      <ul class="list-disc list-inside text-gray-300 space-y-1">
        <li>Handling file uploads with Multer</li>
        <li>Uploading to Cloudinary or AWS S3</li>
        <li>Sending transactional emails with Resend or Nodemailer</li>
        <li>Calling external APIs (weather, maps, payment)</li>
        <li>Webhook handling — receiving push notifications from APIs</li>
      </ul>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">📤 File Uploads with Multer</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer config: memory storage (upload directly to cloud)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only images allowed'), false);
    }
    cb(null, true);
  }
});

// Upload to Cloudinary
async function uploadToCloud(buffer, folder = 'wastego') {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, transformation: [{ width: 800, crop: 'limit' }, { quality: 'auto' }] },
      (error, result) => error ? reject(error) : resolve(result)
    );
    stream.end(buffer);
  });
}

// Route
router.post('/pickups/:id/photo', protect, upload.single('photo'), async (req, res) => {
  const result = await uploadToCloud(req.file.buffer);
  await Pickup.findByIdAndUpdate(req.params.id, { photoUrl: result.secure_url });
  res.json({ url: result.secure_url });
});</code></pre>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">📧 Sending Emails</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code">import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendPickupConfirmation(user, pickup) {
  await resend.emails.send({
    from: 'WasteGo <noreply@wastego.gh>',
    to: user.email,
    subject: 'Your pickup is confirmed! 🚛',
    html: \`
      <h1>Pickup Confirmed</h1>
      <p>Hi \${user.name}, your waste pickup has been scheduled.</p>
      <p><strong>Waste Type:</strong> \${pickup.wasteType}</p>
      <p><strong>Estimated Weight:</strong> \${pickup.estimatedWeight}kg</p>
      <p><strong>Pickup ID:</strong> \${pickup._id}</p>
      <a href="https://wastego.gh/track/\${pickup._id}">Track Your Pickup</a>
    \`
  });
}</code></pre>
      </div>
    </div>

    <div class="bg-green-500/10 p-6 rounded-xl">
      <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
      <p class="text-gray-300">Add these integrations to WasteGo: (1) Photo upload for pickups — customer can upload a photo of their waste, stored on Cloudinary. (2) Email confirmation using Resend when a pickup is booked. (3) Email notification to the rider when a pickup is assigned to them. (4) Webhook endpoint POST /webhooks/payment that receives Hubtel payment callbacks and updates pickup paymentStatus. Verify webhook signatures for security.</p>
    </div>
  </div>`,
  [
    { question: 'What does Multer do in a Node.js application?', options: ['Validates request headers', 'Handles multipart/form-data — parsing file uploads from HTTP requests', 'Manages database files', 'Compresses responses'], correct: 1 },
    { question: 'What is the difference between disk storage and memory storage in Multer?', options: ['Disk is faster', 'Disk saves files to the filesystem; memory storage keeps files in memory as Buffer for cloud uploads', 'They are identical', 'Memory storage is for small files only'], correct: 1 },
    { question: 'What is a webhook?', options: ['A web hook for user interactions', 'An HTTP POST request sent by an external service to notify your server of an event', 'A browser API', 'A type of API authentication'], correct: 1 },
    { question: 'Why should you validate webhook signatures?', options: ['For performance', 'To verify the request actually came from the expected service, not a spoofed attacker', 'Required by HTTP spec', 'To log webhook data'], correct: 1 },
    { question: 'What does cloudinary do for images?', options: ['Stores images in MongoDB', 'Cloud image hosting with on-the-fly transformations (resize, compress, crop) via CDN', 'Validates image formats', 'Creates image thumbnails locally'], correct: 1 },
    { question: 'What does req.file contain after Multer processes an upload?', options: ['The file path on disk', 'The file information including buffer, originalname, mimetype, and size', 'A URL to the file', 'A file ID'], correct: 1 },
    { question: 'What is transactional email?', options: ['Emails sent in bulk for marketing', 'Automated emails triggered by user actions (signup, order confirmation, password reset)', 'Emails attached to transactions in a database', 'Encrypted emails'], correct: 1 },
    { question: 'What is a CDN and why use it for images?', options: ['Content Delivery Network — serves files from servers near the user, reducing latency globally', 'Centralized Data Node — a server type', 'Content Delivery Notifications — webhook type', 'CDN is only for videos'], correct: 0 }
  ],
  50,
  'https://www.youtube.com/embed/MqedS74fHRQ'
),

lesson(
  '9. Testing Node.js: Unit, Integration & API Tests',
  `<div class="space-y-6">
    <div class="bg-gradient-to-r from-green-500/10 to-teal-500/10 p-6 rounded-xl">
      <h2 class="text-2xl font-bold text-green-400 mb-2">📖 What You Will Learn</h2>
      <ul class="list-disc list-inside text-gray-300 space-y-1">
        <li>Why testing matters and what to test</li>
        <li>Unit tests with Node's built-in test runner</li>
        <li>API integration tests with Supertest</li>
        <li>Mocking database calls</li>
        <li>Test coverage and CI integration</li>
      </ul>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🧪 Unit Tests</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>import { test, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { calculatePrice, validateGhanaPhone, formatCurrency } from '../utils.js';

describe('calculatePrice()', () => {
  it('returns 5 GHS for organic waste under 10kg', () => {
    assert.equal(calculatePrice('organic', 5), 5);
  });
  it('returns 15 GHS for organic waste 10-50kg', () => {
    assert.equal(calculatePrice('organic', 25), 15);
  });
  it('throws for negative weight', () => {
    assert.throws(() => calculatePrice('organic', -1), { message: /invalid/i });
  });
});

describe('validateGhanaPhone()', () => {
  it('accepts valid MTN numbers', () => assert.ok(validateGhanaPhone('0244000000')));
  it('accepts valid Vodafone numbers', () => assert.ok(validateGhanaPhone('0204000000')));
  it('rejects 9-digit numbers', () => assert.ok(!validateGhanaPhone('024400000')));
  it('rejects non-Ghana numbers', () => assert.ok(!validateGhanaPhone('+1234567890')));
});</code></pre>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🌐 API Integration Tests with Supertest</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code">import request from 'supertest';
import app from '../src/app.js';

describe('POST /api/auth/register', () => {
  it('creates a new user and returns a JWT', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Test User', email: 'test@wastego.gh',
              password: 'password123', phone: '0244000000' })
      .expect(201)
      .expect('Content-Type', /json/);

    assert.ok(res.body.token);
    assert.equal(res.body.user.role, 'customer');
  });

  it('returns 409 if email already exists', async () => {
    await request(app).post('/api/auth/register').send(existingUser);
    const res = await request(app).post('/api/auth/register').send(existingUser);
    assert.equal(res.status, 409);
  });

  it('returns 422 for invalid phone number', async () => {
    const res = await request(app).post('/api/auth/register')
      .send({ ...validUser, phone: '12345' });
    assert.equal(res.status, 422);
  });
});</code></pre>
      </div>
    </div>

    <div class="bg-green-500/10 p-6 rounded-xl">
      <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
      <p class="text-gray-300">Write a full test suite for WasteGo: Unit tests for all utility functions (calculatePrice, validatePhone, formatCurrency). API tests for all auth routes (register, login, /me with valid/invalid token). API tests for pickup CRUD. Test that protected routes return 401 without a token. Aim for 80%+ coverage. Add npm test to your CI workflow.</p>
    </div>
  </div>`,
  [
    { question: 'What is the difference between unit tests and integration tests?', options: ['Unit tests are harder', 'Unit tests test a single function in isolation; integration tests test how multiple parts work together', 'Integration tests use mocks; unit tests use real data', 'They are the same'], correct: 1 },
    { question: 'What does Supertest allow you to test?', options: ['Frontend UI interactions', 'HTTP endpoints by making real requests to your Express app without a running server', 'Unit functions only', 'Database queries'], correct: 1 },
    { question: 'What is test coverage?', options: ['The number of tests written', 'The percentage of your codebase that is executed during tests', 'Whether tests pass in CI', 'The test execution time'], correct: 1 },
    { question: 'What is the purpose of mocking in tests?', options: ['Making tests look realistic', 'Replacing real dependencies (database, APIs) with controlled fake versions to test in isolation', 'Generating test data', 'Running tests in parallel'], correct: 1 },
    { question: 'What does assert.throws() test?', options: ['That a function returns undefined', 'That a function throws an error when called', 'That an async function rejects', 'That an error was logged'], correct: 1 },
    { question: 'Why should tests use a separate test database?', options: ['It is faster', 'To avoid polluting or corrupting the production database with test data', 'Test databases support more query types', 'It is required by Mongoose'], correct: 1 },
    { question: 'What does .expect(201) do in a Supertest chain?', options: ['Waits 201 milliseconds', 'Asserts that the HTTP response status code is 201', 'Sends a 201 status', 'Checks 201 records exist'], correct: 1 },
    { question: 'What is a good minimum code coverage target for a production API?', options: ['20%', '50%', '80%+', '100% is always required'], correct: 2 }
  ],
  50,
  'https://www.youtube.com/embed/Fgf9s26Oo1U'
),

lesson(
  '10. Deploying Node.js: Environment, Docker & Cloud',
  `<div class="space-y-6">
    <div class="bg-gradient-to-r from-green-500/10 to-teal-500/10 p-6 rounded-xl">
      <h2 class="text-2xl font-bold text-green-400 mb-2">🚀 What You Will Learn</h2>
      <ul class="list-disc list-inside text-gray-300 space-y-1">
        <li>Deploying to Railway, Render, or Fly.io</li>
        <li>Environment variables in production</li>
        <li>Dockerizing a Node.js app</li>
        <li>Process management with PM2</li>
        <li>CI/CD with GitHub Actions</li>
      </ul>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🐳 Dockerfile for Node.js</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code># Dockerfile
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM base AS production
COPY src/ ./src/
USER node
EXPOSE 5000
CMD ["node", "src/index.js"]

# .dockerignore
node_modules
.env
.git
*.test.js</code></pre>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">⚡ PM2 Process Manager</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code"># Install PM2
npm install -g pm2

# Start with cluster mode (uses all CPU cores)
pm2 start src/index.js --name wastego-api -i max

# ecosystem.config.js
export default {
  apps: [{
    name: 'wastego-api',
    script: 'src/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env_production: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: 'logs/err.log',
    out_file: 'logs/out.log',
    time: true
  }]
};

pm2 start ecosystem.config.js --env production
pm2 monit        # real-time monitoring
pm2 logs         # tail logs
pm2 restart all  # zero-downtime restart
pm2 save         # persist on server reboot
pm2 startup      # auto-start on reboot</code></pre>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🔄 GitHub Actions CI/CD</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code"># .github/workflows/deploy.yml
name: Deploy WasteGo API
on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Railway
        run: railway up
        env:
          RAILWAY_TOKEN: \${{ secrets.RAILWAY_TOKEN }}</code></pre>
      </div>
    </div>

    <div class="bg-yellow-500/10 p-4 rounded-lg">
      <p class="text-yellow-300">🎓 <strong>You have mastered Node.js.</strong> File system, REST APIs, MongoDB, auth, streams, testing, and deployment. Next: Express.js — the framework that makes all of this 10x faster to build.</p>
    </div>
  </div>`,
  [
    { question: 'What is the purpose of NODE_ENV=production?', options: ['Makes Node faster by default', 'Signals to frameworks and libraries to enable production optimizations and disable debug features', 'Switches to a production database automatically', 'Required for npm install'], correct: 1 },
    { question: 'What does PM2\'s cluster mode do?', options: ['Clusters the database connections', 'Spawns one Node.js process per CPU core, maximizing throughput', 'Clusters log files', 'Runs multiple app versions simultaneously'], correct: 1 },
    { question: 'What is the advantage of using a multi-stage Docker build?', options: ['Faster build time', 'Produces a smaller final image by not including build tools in the production image', 'Required for Node.js', 'Enables multi-platform builds only'], correct: 1 },
    { question: 'What does npm ci do differently from npm install in CI/CD?', options: ['It skips devDependencies', 'It installs exact versions from package-lock.json without modifying it — reproducible builds', 'It clears cache', 'It only runs in CI environments'], correct: 1 },
    { question: 'What is a GitHub Actions secret?', options: ['A hidden repository', 'Encrypted environment variable stored in GitHub, injected into workflow runs without exposure in logs', 'A private GitHub account', 'An encrypted commit'], correct: 1 },
    { question: 'What does pm2 save do?', options: ['Saves application state to disk', 'Persists the current process list so PM2 restores it on server reboot', 'Saves logs to a file', 'Creates a backup of the source code'], correct: 1 },
    { question: 'Why should you run Node.js as a non-root user in Docker?', options: ['It is faster', 'Security — if the container is compromised, the attacker doesn\'t have root privileges', 'Root is not available in Docker', 'It is required by npm'], correct: 1 },
    { question: 'What is zero-downtime deployment?', options: ['Deploying at midnight', 'Deploying new code without dropping any requests — done by restarting workers one at a time', 'Deploying with no environment variables', 'A deployment that requires no testing'], correct: 1 }
  ],
  100,
  'https://www.youtube.com/embed/l134cBAJCuc'
)

]; // end nodejsLessons

const nodeCourse = savedCourses.find(c => c.title === 'Node.js');
for (let i = 0; i < nodejsLessons.length; i++) {
  const lessonData = nodejsLessons[i];
  const lesson = new Lesson({
    courseId: nodeCourse._id,
    title: lessonData.title,
    content: lessonData.content,
    videoUrl: lessonData.videoUrl,
    quiz: lessonData.quiz,
    xpValue: lessonData.xpValue,
    order: i + 1
  });
  await lesson.save();
  nodeCourse.lessons.push(lesson._id);
}
await nodeCourse.save();
console.log(`✅ Node.js: added ${nodejsLessons.length} lessons`);

console.log('Node.js Lessons seeded successfully.');


//  EXPRESS.JS LESSONS (10 lessons)
// ═══════════════════════════════════════════
const expressLessons = [

lesson(
  '1. Express.js Basics: Setup, Routes & Middleware',
  `<div class="space-y-6">
    <div class="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 p-6 rounded-xl">
      <h2 class="text-2xl font-bold text-blue-400 mb-2">📖 What You Will Learn</h2>
      <ul class="list-disc list-inside text-gray-300 space-y-1">
        <li>What Express is and why it exists</li>
        <li>Creating your first Express server</li>
        <li>Defining routes: GET, POST, PUT, PATCH, DELETE</li>
        <li>What middleware is and how the request pipeline works</li>
        <li>Built-in middleware: express.json(), express.static()</li>
      </ul>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🚀 Your First Express Server</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ── Built-in Middleware ──
app.use(express.json());                        // parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // parse form data
app.use(express.static('public'));              // serve static files from /public

// ── Routes ──
// Route: METHOD + PATH + HANDLER
app.get('/', (req, res) => {
  res.json({ message: 'WasteGo API is running 🚛', version: '1.0' });
});

app.get('/pickups', (req, res) => {
  // req.query  → query string params: /pickups?status=pending&region=accra
  const { status, region, page = 1, limit = 20 } = req.query;
  res.json({ status, region, page, limit });
});

app.get('/pickups/:id', (req, res) => {
  // req.params → URL parameters: /pickups/abc123
  const { id } = req.params;
  res.json({ pickupId: id });
});

app.post('/pickups', (req, res) => {
  // req.body → parsed JSON body (needs express.json() middleware)
  const data = req.body;
  res.status(201).json({ success: true, data });
});

app.patch('/pickups/:id', (req, res) => {
  res.json({ updated: req.params.id, changes: req.body });
});

app.delete('/pickups/:id', (req, res) => {
  res.status(204).send(); // 204 No Content
});

// ── Start Server ──
app.listen(PORT, () => {
  console.log(\`✅ Server running on http://localhost:\${PORT}\`);
});</code></pre>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🔗 How Middleware Works</h2>
      <p class="text-gray-300 mb-3">Every request flows through a pipeline of middleware functions. Each function gets <code class="text-yellow-400">req</code>, <code class="text-yellow-400">res</code>, and <code class="text-yellow-400">next</code>. Calling <code class="text-yellow-400">next()</code> passes control to the next middleware.</p>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>// Middleware signature: (req, res, next) => void

// 1. Application-level middleware (runs on ALL routes)
app.use((req, res, next) => {
  console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.url}\`);
  next(); // MUST call next() or request hangs forever
});

// 2. Route-specific middleware
function checkApiKey(req, res, next) {
  const key = req.headers['x-api-key'];
  if (!key || key !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Invalid API key' });
    // NOT calling next() here — stops the pipeline
  }
  next();
}

app.get('/admin/stats', checkApiKey, (req, res) => {
  res.json({ total: 1000 });
});

// 3. Error-handling middleware (4 params — Express detects this)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});

// Pipeline for POST /pickups:
// express.json() → logger → checkApiKey → route handler → error handler</code></pre>
      </div>
    </div>

    <div class="bg-green-500/10 p-6 rounded-xl">
      <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
      <p class="text-gray-300">Build a WasteGo Express server with: a logger middleware that logs method, URL, and response time. Routes for all pickup CRUD operations using an in-memory array. A middleware that checks for an x-api-key header on all /admin routes. A 404 handler for unknown routes. A global error handler. Test all routes with Thunder Client or Postman.</p>
    </div>
  </div>`,
  [
    { question: 'What does app.use() do in Express?', options: ['Creates a new route', 'Mounts middleware that runs for every request matching the optional path', 'Starts the server', 'Parses the URL'], correct: 1 },
    { question: 'What happens if you forget to call next() in a middleware?', options: ['Express calls it automatically', 'The request hangs indefinitely — no response is ever sent', 'The next route runs anyway', 'An error is thrown'], correct: 1 },
    { question: 'What does express.json() do?', options: ['Converts responses to JSON', 'Parses incoming request bodies with Content-Type: application/json into req.body', 'Validates JSON schemas', 'Serializes JavaScript objects'], correct: 1 },
    { question: 'How do you access URL parameters like /pickups/:id in Express?', options: ['req.query.id', 'req.params.id', 'req.body.id', 'req.url.id'], correct: 1 },
    { question: 'How do you access query string params like /pickups?status=pending?', options: ['req.params.status', 'req.body.status', 'req.query.status', 'req.search.status'], correct: 2 },
    { question: 'What makes Express recognize a function as an error-handling middleware?', options: ['It must be named "errorHandler"', 'It must have exactly 4 parameters: (err, req, res, next)', 'It must use app.error() instead of app.use()', 'It must return a Promise'], correct: 1 },
    { question: 'What does express.static("public") do?', options: ['Makes all routes public', 'Serves files from the /public directory as static assets', 'Makes the app stateless', 'Creates a public API key'], correct: 1 },
    { question: 'What status code should a DELETE route return when successful with no body?', options: ['200', '201', '204', '200 with null body'], correct: 2 }
  ],
  50,
  'https://www.youtube.com/embed/L72fhGm1tfE'
),

lesson(
  '2. Express Router: Organizing Routes Like a Pro',
  `<div class="space-y-6">
    <div class="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 p-6 rounded-xl">
      <h2 class="text-2xl font-bold text-blue-400 mb-2">📖 What You Will Learn</h2>
      <ul class="list-disc list-inside text-gray-300 space-y-1">
        <li>express.Router() for modular route files</li>
        <li>Mounting routers at base paths</li>
        <li>Route-level vs app-level middleware</li>
        <li>Chaining route handlers with router.route()</li>
        <li>Full MVC folder structure for a production API</li>
      </ul>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">📁 MVC File Structure</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>src/
├── index.js            ← entry point (start server)
├── app.js              ← Express app setup (middleware, routes)
├── routes/
│   ├── auth.routes.js
│   ├── pickup.routes.js
│   ├── rider.routes.js
│   └── admin.routes.js
├── controllers/
│   ├── auth.controller.js
│   ├── pickup.controller.js
│   └── rider.controller.js
├── middleware/
│   ├── auth.middleware.js   ← protect, restrictTo
│   ├── validate.middleware.js
│   └── upload.middleware.js
├── models/
│   ├── User.model.js
│   └── Pickup.model.js
├── services/
│   ├── email.service.js
│   └── payment.service.js
└── utils/
    ├── AppError.js
    └── catchAsync.js</code></pre>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🗂️ Router Files</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>// ── routes/pickup.routes.js ──
import { Router } from 'express';
import { protect, restrictTo } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { createPickupSchema, updateStatusSchema } from '../schemas/pickup.schema.js';
import * as PickupController from '../controllers/pickup.controller.js';

const router = Router();

// Apply protect to ALL routes in this router
router.use(protect);

// Chain handlers for same path
router.route('/')
  .get(PickupController.getAllPickups)
  .post(validate(createPickupSchema), PickupController.createPickup);

router.route('/:id')
  .get(PickupController.getPickup)
  .patch(validate(updateStatusSchema), PickupController.updatePickup)
  .delete(restrictTo('admin'), PickupController.deletePickup);

router.patch('/:id/accept', restrictTo('rider'), PickupController.acceptPickup);
router.patch('/:id/complete', restrictTo('rider'), PickupController.completePickup);

export default router;

// ── app.js ──
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/auth.routes.js';
import pickupRoutes from './routes/pickup.routes.js';
import riderRoutes from './routes/rider.routes.js';
import adminRoutes from './routes/admin.routes.js';

const app = express();

// Global middleware
app.use(helmet());
app.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(',') }));
app.use(express.json({ limit: '10kb' }));

// Mount routers
app.use('/api/v1/auth',    authRoutes);
app.use('/api/v1/pickups', pickupRoutes);
app.use('/api/v1/riders',  riderRoutes);
app.use('/api/v1/admin',   adminRoutes);

// 404 handler
app.all('*', (req, res) => res.status(404).json({ error: \`Route \${req.url} not found\` }));

// Global error handler (must be last)
app.use(globalErrorHandler);

export default app;</code></pre>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🎮 Controllers</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>// ── utils/catchAsync.js ──
// Wraps async route handlers — no more try/catch in every controller
export const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// ── controllers/pickup.controller.js ──
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/AppError.js';
import { Pickup } from '../models/Pickup.model.js';

export const getAllPickups = catchAsync(async (req, res) => {
  const { status, region, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (region) filter['address.city'] = region;

  const pickups = await Pickup.find(filter)
    .populate('customer', 'name phone')
    .populate('rider', 'name phone')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .lean();

  const total = await Pickup.countDocuments(filter);

  res.json({
    success: true,
    data: pickups,
    meta: { total, page: +page, limit: +limit, pages: Math.ceil(total / limit) }
  });
});

export const createPickup = catchAsync(async (req, res) => {
  const pickup = await Pickup.create({ ...req.body, customer: req.user._id });
  res.status(201).json({ success: true, data: pickup });
});

export const getPickup = catchAsync(async (req, res, next) => {
  const pickup = await Pickup.findById(req.params.id)
    .populate('customer', 'name email phone')
    .populate('rider', 'name phone');
  if (!pickup) return next(new AppError('Pickup not found', 404));
  res.json({ success: true, data: pickup });
});</code></pre>
      </div>
    </div>

    <div class="bg-green-500/10 p-6 rounded-xl">
      <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
      <p class="text-gray-300">Refactor your WasteGo API into full MVC structure: Separate router files for auth, pickups, riders, admin. Controllers folder with catchAsync wrappers on all handlers. AppError class for consistent errors. Validate middleware using Zod schemas. Test that the structure works: npm run dev should start cleanly and all routes should respond correctly.</p>
    </div>
  </div>`,
  [
    { question: 'What does express.Router() create?', options: ['A new Express app', 'A mini-application with its own middleware and routes that can be mounted on the main app', 'A database connection', 'A middleware function'], correct: 1 },
    { question: 'What does router.route("/") allow you to do?', options: ['Define the base URL', 'Chain multiple HTTP method handlers for the same path in one readable block', 'Create a default route', 'Group routers together'], correct: 1 },
    { question: 'What does app.use("/api/v1/pickups", pickupRouter) do?', options: ['Creates a pickup controller', 'Mounts the pickupRouter so all its routes are prefixed with /api/v1/pickups', 'Imports the pickup model', 'Validates pickup routes'], correct: 1 },
    { question: 'What problem does the catchAsync utility solve?', options: ['It catches CSS errors', 'Eliminates repetitive try/catch blocks in every async controller by forwarding errors to next()', 'It catches network timeouts', 'It validates async functions'], correct: 1 },
    { question: 'What is the MVC pattern?', options: ['Model-View-Controller — separates data logic, presentation, and request handling', 'Module-Version-Config', 'MongoDB-Validate-Create', 'Middleware-Validation-Cache'], correct: 0 },
    { question: 'Why should app.js and index.js be separate files?', options: ['It is required by Express', 'Separating app setup from server startup makes the app importable in tests without starting a real server', 'It improves performance', 'node_modules requires it'], correct: 1 },
    { question: 'What does app.all("*") match?', options: ['All GET requests only', 'All HTTP methods on all paths — used for 404 handlers', 'All middleware', 'All error handlers'], correct: 1 },
    { question: 'Where should the global error handler be placed in Express?', options: ['Before all routes', 'As the first middleware', 'After all routes and other middleware — it must be last', 'In a separate file only'], correct: 2 }
  ],
  50,
  'https://www.youtube.com/embed/Oe421EPjeBE'
),

lesson(
  '3. Express Middleware Deep Dive: Auth, Validation & Rate Limiting',
  `<div class="space-y-6">
    <div class="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 p-6 rounded-xl">
      <h2 class="text-2xl font-bold text-blue-400 mb-2">📖 What You Will Learn</h2>
      <ul class="list-disc list-inside text-gray-300 space-y-1">
        <li>Writing reusable middleware factories</li>
        <li>JWT auth middleware with role-based access</li>
        <li>Request validation middleware with Zod</li>
        <li>Rate limiting per route with express-rate-limit</li>
        <li>Request logging with Morgan</li>
      </ul>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🔐 Complete Auth Middleware</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>// middleware/auth.middleware.js
import jwt from 'jsonwebtoken';
import { User } from '../models/User.model.js';
import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';

// Protect: verify JWT, load user
export const protect = catchAsync(async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    return next(new AppError('Please log in to access this resource', 401));
  }

  const token = auth.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.sub);
  if (!user) return next(new AppError('User no longer exists', 401));
  if (!user.isActive) return next(new AppError('Account suspended', 403));

  req.user = user; // attach user to request
  next();
});

// Role-based access control
export const restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(new AppError(\`Access denied. Required role: \${roles.join(' or ')}\`, 403));
  }
  next();
};

// Optional auth: attach user if token exists, but don't block if missing
export const optionalAuth = catchAsync(async (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth?.startsWith('Bearer ')) {
    try {
      const decoded = jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET);
      req.user = await User.findById(decoded.sub);
    } catch {} // silently ignore invalid tokens
  }
  next();
});</code></pre>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">⚡ Rate Limiting</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>import rateLimit from 'express-rate-limit';

// General API rate limit
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again in 15 minutes.' }
});

// Strict limit for auth routes (prevent brute force)
export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: { error: 'Too many login attempts. Please try again in 1 hour.' }
});

// Usage in app.js
app.use('/api/v1', apiLimiter);
app.use('/api/v1/auth/login', authLimiter);
app.use('/api/v1/auth/register', authLimiter);</code></pre>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">📊 Morgan Request Logger</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

// Development: colorful console logs
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  // Output: GET /api/v1/pickups 200 45ms - 1.2kb
}

// Production: JSON logs to file
if (process.env.NODE_ENV === 'production') {
  const logStream = fs.createWriteStream(
    path.join('logs', 'access.log'),
    { flags: 'a' }
  );
  app.use(morgan('combined', { stream: logStream }));
}</code></pre>
      </div>
    </div>

    <div class="bg-green-500/10 p-6 rounded-xl">
      <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
      <p class="text-gray-300">Build a complete middleware stack for WasteGo: protect and restrictTo on all appropriate routes. Separate rate limits for auth (10/hr) and general API (100/15min). Zod validation on all POST/PATCH bodies. Morgan logging (dev console + production file). A custom middleware that adds a unique requestId header to every response. Test that a wrong token returns 401, a customer trying to access /admin returns 403, and 11 rapid login attempts get rate limited.</p>
    </div>
  </div>`,
  [
    { question: 'What is a middleware factory?', options: ['A tool that generates middleware files', 'A function that returns a middleware function, allowing it to be configured with parameters', 'A type of Express plugin', 'A factory design pattern for routes'], correct: 1 },
    { question: 'What does req.user contain after the protect middleware runs?', options: ['The raw JWT token', 'The authenticated user document fetched from the database', 'The user ID only', 'The JWT payload'], correct: 1 },
    { question: 'What does the authLimiter rate limiter protect against?', options: ['XSS attacks', 'Brute force attacks by limiting how many login attempts can be made per IP', 'SQL injection', 'Token theft'], correct: 1 },
    { question: 'What does optionalAuth middleware do differently from protect?', options: ['It is slower', 'It attaches the user if a valid token exists but does not block requests without a token', 'It only works for GET routes', 'It skips JWT verification'], correct: 1 },
    { question: 'What does Morgan log in "dev" mode?', options: ['Only errors', 'Method, URL, status code, response time, and size in a colorful format', 'Full request/response headers', 'Database queries'], correct: 1 },
    { question: 'Why should auth routes have a stricter rate limit than general API routes?', options: ['Auth routes are slower', 'Auth endpoints are prime targets for brute force attacks — stricter limits reduce risk', 'General routes have unlimited requests', 'JWT verification requires fewer requests'], correct: 1 },
    { question: 'What does jwt.verify() throw if the token is expired?', options: ['A 401 response', 'A TokenExpiredError that must be caught', 'undefined', 'A database error'], correct: 1 },
    { question: 'What does the standardHeaders option in express-rate-limit do?', options: ['Adds standard HTTP headers', 'Sends RateLimit-* headers in responses so clients know their limit status', 'Validates headers format', 'Sets Content-Type header'], correct: 1 }
  ],
  50,
  'https://www.youtube.com/embed/9NikSb8aGiM'
),

lesson(
  '4. Express Error Handling: AppError, Global Handler & Async Errors',
  `<div class="space-y-6">
    <div class="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 p-6 rounded-xl">
      <h2 class="text-2xl font-bold text-blue-400 mb-2">📖 What You Will Learn</h2>
      <ul class="list-disc list-inside text-gray-300 space-y-1">
        <li>Custom AppError class for operational errors</li>
        <li>Distinguishing operational vs programming errors</li>
        <li>Global error handler for all error types</li>
        <li>Handling Mongoose, JWT, and validation errors</li>
        <li>Different error responses for dev vs production</li>
      </ul>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🚨 AppError Class</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>// utils/AppError.js
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = String(statusCode).startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // safe to send to client
    Error.captureStackTrace(this, this.constructor);
  }
}

// Usage in controllers:
if (!pickup) return next(new AppError('Pickup not found', 404));
if (!user.isActive) return next(new AppError('Account suspended', 403));</code></pre>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🛡️ Global Error Handler</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>// middleware/errorHandler.js
import { AppError } from '../utils/AppError.js';

// Transform known errors into AppErrors
function handleCastError(err) {
  return new AppError(\`Invalid \${err.path}: \${err.value}\`, 400);
}
function handleDuplicateKey(err) {
  const field = Object.keys(err.keyValue)[0];
  return new AppError(\`\${field} already exists. Please use a different value.\`, 409);
}
function handleValidationError(err) {
  const messages = Object.values(err.errors).map(e => e.message);
  return new AppError(\`Validation failed: \${messages.join('. ')}\`, 422);
}
function handleJWTError() {
  return new AppError('Invalid token. Please log in again.', 401);
}
function handleTokenExpiredError() {
  return new AppError('Your token has expired. Please log in again.', 401);
}

export function globalErrorHandler(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Transform library errors into AppErrors
  if (err.name === 'CastError') err = handleCastError(err);
  if (err.code === 11000)       err = handleDuplicateKey(err);
  if (err.name === 'ValidationError') err = handleValidationError(err);
  if (err.name === 'JsonWebTokenError') err = handleJWTError();
  if (err.name === 'TokenExpiredError') err = handleTokenExpiredError();

  // Development: send full error details
  if (process.env.NODE_ENV === 'development') {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
      stack: err.stack,
      err
    });
  }

  // Production: only send safe, operational errors to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message
    });
  }

  // Programming error (bug): don't leak details
  console.error('PROGRAMMING ERROR:', err);
  res.status(500).json({
    success: false,
    error: 'Something went wrong. Please try again later.'
  });
}</code></pre>
      </div>
    </div>

    <div class="bg-green-500/10 p-6 rounded-xl">
      <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
      <p class="text-gray-300">Wire up full error handling in WasteGo: AppError class used in all controllers. globalErrorHandler handles Mongoose CastError, duplicate key (11000), ValidationError, JWT errors. In development mode, stack traces included in response. In production, only operational errors shown. Test by: sending invalid MongoDB IDs, duplicate emails, expired JWTs, and routes that don't exist.</p>
    </div>
  </div>`,
  [
    { question: 'What is an "operational error" in Node.js?', options: ['A bug in the code', 'An expected error like 404, invalid input, or auth failure — safe to show to the client', 'A database crash', 'A network timeout always'], correct: 1 },
    { question: 'What does isOperational: true on an error signify?', options: ['The error is critical', 'The error is expected and safe to send to the client — not a programming bug', 'The error should be logged', 'The error auto-recovers'], correct: 1 },
    { question: 'What does Mongoose error code 11000 mean?', options: ['Connection failed', 'Duplicate key — a unique field value already exists', 'Validation failed', 'Cast error'], correct: 1 },
    { question: 'Why should you never send stack traces to clients in production?', options: ['Stack traces are too large', 'They expose internal code structure and file paths, helping attackers', 'Stack traces are inaccurate in production', 'Clients cannot render them'], correct: 1 },
    { question: 'What is a CastError in Mongoose?', options: ['A schema casting failure', 'When an invalid value is passed for a typed field — e.g. a non-ObjectId string as an _id', 'A connection error', 'A populate error'], correct: 1 },
    { question: 'What happens when you call next(err) in Express?', options: ['The next route runs', 'Express skips all regular middleware and routes, jumping to the error handler', 'The request is retried', 'A 500 response is sent automatically'], correct: 1 },
    { question: 'What does Error.captureStackTrace(this, this.constructor) do in AppError?', options: ['Creates a custom error type', 'Removes the AppError constructor from the stack trace for cleaner debugging', 'Captures runtime errors', 'Records the error in a log file'], correct: 1 },
    { question: 'Why differentiate between development and production error responses?', options: ['Performance reasons', 'Dev needs full details for debugging; production must protect sensitive implementation details', 'Production has no errors', 'Development errors are different objects'], correct: 1 }
  ],
  50,
  'https://www.youtube.com/embed/w1V2SdzdQBs'
),

lesson(
  '5. Advanced Querying: Filtering, Sorting, Pagination & Search',
  `<div class="space-y-6">
    <div class="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 p-6 rounded-xl">
      <h2 class="text-2xl font-bold text-blue-400 mb-2">📖 What You Will Learn</h2>
      <ul class="list-disc list-inside text-gray-300 space-y-1">
        <li>Building a reusable API query class</li>
        <li>Filtering with operators: gte, lte, in, regex</li>
        <li>Sorting by multiple fields</li>
        <li>Cursor-based and offset pagination</li>
        <li>Full-text search with MongoDB</li>
      </ul>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🔍 Reusable APIQuery Class</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>// utils/APIQuery.js
export class APIQuery {
  constructor(query, queryString) {
    this.query = query;           // Mongoose query object
    this.queryString = queryString; // req.query
  }

  filter() {
    // Copy and exclude special fields
    const params = { ...this.queryString };
    ['page', 'limit', 'sort', 'fields', 'search'].forEach(f => delete params[f]);

    // Convert operators: gte → $gte etc.
    let str = JSON.stringify(params);
    str = str.replace(/\b(gte|gt|lte|lt|in|nin|ne)\b/g, match => \`$\${match}\`);
    this.query = this.query.find(JSON.parse(str));
    return this;
  }

  search(fields = ['wasteType', 'notes']) {
    if (this.queryString.search) {
      const regex = new RegExp(this.queryString.search, 'i');
      this.query = this.query.find({
        $or: fields.map(f => ({ [f]: regex }))
      });
    }
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      // "sort=-createdAt,weight" → "-createdAt weight" for Mongoose
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt'); // default: newest first
    }
    return this;
  }

  selectFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    }
    return this;
  }

  paginate() {
    const page  = Math.max(1, parseInt(this.queryString.page)  || 1);
    const limit = Math.min(100, parseInt(this.queryString.limit) || 20);
    this.query = this.query.skip((page - 1) * limit).limit(limit);
    this.page  = page;
    this.limit = limit;
    return this;
  }
}

// Usage in controller:
export const getAllPickups = catchAsync(async (req, res) => {
  const apiQuery = new APIQuery(Pickup.find(), req.query)
    .filter()
    .search()
    .sort()
    .selectFields()
    .paginate();

  const [pickups, total] = await Promise.all([
    apiQuery.query.populate('customer', 'name phone').lean(),
    Pickup.countDocuments()
  ]);

  res.json({
    success: true,
    data: pickups,
    meta: {
      total,
      page: apiQuery.page,
      limit: apiQuery.limit,
      pages: Math.ceil(total / apiQuery.limit)
    }
  });
});

// Example API calls:
// GET /pickups?status=completed&region=accra
// GET /pickups?estimatedWeight[gte]=10&estimatedWeight[lte]=100
// GET /pickups?sort=-createdAt,estimatedWeight
// GET /pickups?fields=customer,status,price
// GET /pickups?search=organic&page=2&limit=10</code></pre>
      </div>
    </div>

    <div class="bg-green-500/10 p-6 rounded-xl">
      <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
      <p class="text-gray-300">Add the APIQuery class to your WasteGo API. Wire it up to the GET /pickups route. Test these queries: filter by status and region, filter weight between 10-100kg using operators, sort by newest first then by price, search for "organic" in notes, paginate with page=2&limit=5, select only customer and status fields. Add a MongoDB text index on wasteType and notes fields for proper text search.</p>
    </div>
  </div>`,
  [
    { question: 'What does the APIQuery class pattern achieve?', options: ['Replaces Mongoose', 'Provides a reusable, chainable interface for building complex database queries from URL query strings', 'Creates REST endpoints automatically', 'Validates query parameters'], correct: 1 },
    { question: 'How do you query documents where weight is greater than 10 using the APIQuery pattern?', options: ['/pickups?weight>10', '/pickups?estimatedWeight[gte]=10', '/pickups?weight=gte:10', '/pickups?filter=weight>10'], correct: 1 },
    { question: 'What does .lean() do on a Mongoose query?', options: ['Makes the query run faster by skipping schema methods', 'Returns plain JavaScript objects instead of full Mongoose Documents with methods', 'Reduces the number of fields returned', 'Enables lazy population'], correct: 1 },
    { question: 'What is offset-based pagination?', options: ['Paginating by document ID cursor', 'Skipping a fixed number of records (page-1 * limit) to get each page', 'Random sampling of records', 'Paginating by timestamp'], correct: 1 },
    { question: 'Why use Promise.all() when fetching pickups and their total count?', options: ['It is required by Mongoose', 'To run both queries in parallel, reducing total wait time to the slower of the two', 'Promise.all() improves database performance', 'countDocuments() requires it'], correct: 1 },
    { question: 'What does a MongoDB text index enable?', options: ['Faster range queries', 'Full-text search across indexed string fields using $text and $search operators', 'Unique field enforcement', 'Case-sensitive exact matching'], correct: 1 },
    { question: 'What does sort=-createdAt mean in a Mongoose query?', options: ['Sort by creation date ascending', 'Sort by creation date descending (- prefix means descending)', 'Remove the sort order', 'Sort by the reverse of creation date'], correct: 1 },
    { question: 'Why set a maximum limit (e.g. 100) on pagination?', options: ['MongoDB has a built-in limit', 'Prevent clients from requesting millions of records at once, crashing the server', 'Pagination breaks above 100', 'JWT tokens only handle 100 records'], correct: 1 }
  ],
  50,
  'https://www.youtube.com/embed/zhq7DA1-QDQ'
),

lesson(
  '6. Real-Time with Socket.io: Live Rider Tracking',
  `<div class="space-y-6">
    <div class="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 p-6 rounded-xl">
      <h2 class="text-2xl font-bold text-blue-400 mb-2">📖 What You Will Learn</h2>
      <ul class="list-disc list-inside text-gray-300 space-y-1">
        <li>WebSockets vs HTTP — why real-time needs a different protocol</li>
        <li>Setting up Socket.io with Express</li>
        <li>Rooms and namespaces for targeted messaging</li>
        <li>Authenticating socket connections with JWT</li>
        <li>Building live rider location tracking</li>
      </ul>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🔌 Socket.io Setup</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>// index.js
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { User } from './models/User.model.js';

const app = express();
const httpServer = createServer(app); // wrap Express with http.Server
const io = new Server(httpServer, {
  cors: { origin: process.env.FRONTEND_URL, methods: ['GET', 'POST'] }
});

// ── Authenticate socket connections ──
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Authentication required'));
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = await User.findById(decoded.sub);
    next();
  } catch (err) {
    next(new Error('Invalid token'));
  }
});

// ── Connection handler ──
io.on('connection', (socket) => {
  const user = socket.user;
  console.log(\`\${user.name} (\${user.role}) connected: \${socket.id}\`);

  // Join personal room (for direct messages)
  socket.join(\`user:\${user._id}\`);

  // Rider-specific events
  if (user.role === 'rider') {
    socket.join('riders'); // join riders group

    // Rider broadcasts location
    socket.on('rider:location', async ({ lat, lng, pickupId }) => {
      // Emit to the specific customer assigned to this pickup
      io.to(\`pickup:\${pickupId}\`).emit('rider:location', {
        riderId: user._id,
        riderName: user.name,
        lat, lng,
        timestamp: Date.now()
      });
    });

    socket.on('rider:online', () => {
      io.emit('rider:status', { riderId: user._id, status: 'online' });
    });
  }

  // Customer-specific events
  if (user.role === 'customer') {
    // Customer joins their pickup room to get rider updates
    socket.on('customer:watchPickup', (pickupId) => {
      socket.join(\`pickup:\${pickupId}\`);
    });
  }

  // Disconnect
  socket.on('disconnect', () => {
    if (user.role === 'rider') {
      io.emit('rider:status', { riderId: user._id, status: 'offline' });
    }
    console.log(\`\${user.name} disconnected\`);
  });
});

// Emit from REST routes (e.g. when pickup is assigned)
export function notifyPickupAssigned(pickup, rider) {
  io.to(\`user:\${pickup.customer}\`).emit('pickup:assigned', {
    pickupId: pickup._id,
    riderName: rider.name,
    riderPhone: rider.phone
  });
}

httpServer.listen(5000);</code></pre>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">📱 Client-Side Socket.io</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>// Frontend (browser)
import { io } from 'socket.io-client';

const socket = io('https://api.wastego.gh', {
  auth: { token: localStorage.getItem('token') }
});

socket.on('connect', () => console.log('Connected to WasteGo live server'));
socket.on('connect_error', (err) => console.error('Connection failed:', err.message));

// Watch a pickup for rider updates
function watchPickup(pickupId) {
  socket.emit('customer:watchPickup', pickupId);
}

// Listen for rider location
socket.on('rider:location', ({ riderName, lat, lng }) => {
  updateRiderMarker(lat, lng); // update Leaflet map marker
  document.querySelector('#rider-eta').textContent = \`\${riderName} is on the way\`;
});

// Listen for pickup assignment
socket.on('pickup:assigned', ({ riderName, riderPhone }) => {
  showToast(\`\${riderName} has been assigned to your pickup!\`);
});</code></pre>
      </div>
    </div>

    <div class="bg-green-500/10 p-6 rounded-xl">
      <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
      <p class="text-gray-300">Add real-time features to WasteGo: Socket.io server with JWT auth middleware. Rider app emits location every 5 seconds when on an active pickup. Customer app watches their pickup room and updates a Leaflet map marker in real-time. When admin assigns a pickup via REST API, notifyPickupAssigned() emits to the customer's socket room. Show online/offline rider badges in the admin dashboard.</p>
    </div>
  </div>`,
  [
    { question: 'What is the main difference between WebSockets and HTTP?', options: ['WebSockets are faster', 'WebSockets maintain a persistent two-way connection; HTTP is request-response only', 'HTTP supports more data types', 'WebSockets only work on mobile'], correct: 1 },
    { question: 'What is a Socket.io room?', options: ['A physical server room', 'A named channel that sockets can join to receive targeted messages', 'A namespace for namespaces', 'A WebSocket connection type'], correct: 1 },
    { question: 'What does io.to("roomName").emit() do?', options: ['Sends to all connected sockets', 'Sends an event only to sockets that have joined the specified room', 'Broadcasts to all except sender', 'Emits to a specific socket ID'], correct: 1 },
    { question: 'How do you authenticate a Socket.io connection?', options: ['Using HTTP cookies only', 'Via the handshake auth object and an io.use() middleware that verifies the token', 'Socket.io auto-authenticates', 'Via query string only'], correct: 1 },
    { question: 'What does socket.join("room") do?', options: ['Joins a database collection', 'Adds the socket to a named room so it receives events emitted to that room', 'Creates a new namespace', 'Connects to another server'], correct: 1 },
    { question: 'Why must you wrap the Express app in http.createServer() when using Socket.io?', options: ['Express requires it', 'Socket.io attaches to the raw HTTP server, not the Express app directly', 'For performance', 'CORS requires it'], correct: 1 },
    { question: 'What does socket.on("disconnect") allow you to do?', options: ['Stop the server', 'Run cleanup code when a client disconnects — update status, notify others', 'Reconnect automatically', 'Remove all listeners'], correct: 1 },
    { question: 'What is a Socket.io namespace?', options: ['A URL path prefix for socket connections, allowing multiple independent apps on one server', 'A room with authentication', 'A WebSocket protocol type', 'A way to version socket events'], correct: 0 }
  ],
  50,
  'https://www.youtube.com/embed/ZKEqqIO7n-k'
),

lesson(
  '7. API Security: CORS, Helmet, XSS & SQL Injection Prevention',
  `<div class="space-y-6">
    <div class="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 p-6 rounded-xl">
      <h2 class="text-2xl font-bold text-blue-400 mb-2">📖 What You Will Learn</h2>
      <ul class="list-disc list-inside text-gray-300 space-y-1">
        <li>CORS configuration for production APIs</li>
        <li>Security headers with Helmet</li>
        <li>XSS and NoSQL injection prevention</li>
        <li>HTTPS enforcement and secure cookies</li>
        <li>Security audit checklist for production</li>
      </ul>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🔒 Complete Security Setup</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>import helmet from 'helmet';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';

// ── CORS ──
const corsOptions = {
  origin: (origin, callback) => {
    const allowed = process.env.ALLOWED_ORIGINS.split(',');
    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(\`CORS: origin \${origin} not allowed\`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
  credentials: true,  // allow cookies in cross-origin requests
  maxAge: 86400       // preflight cache: 24 hours
};
app.use(cors(corsOptions));

// ── Security headers ──
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
      imgSrc: ["'self'", 'data:', 'res.cloudinary.com'],
      connectSrc: ["'self'", 'api.wastego.gh']
    }
  },
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true }
}));

// ── NoSQL injection prevention ──
// Strips out $ and . from req.body, req.query, req.params
// Prevents: { "email": { "$gt": "" } } attacks
app.use(mongoSanitize());

// ── XSS prevention ──
// Sanitizes user input to prevent script injection
app.use(xss());

// ── HTTP Parameter Pollution prevention ──
// Prevents: /pickups?sort=price&sort=status (confusion attack)
app.use(hpp({ whitelist: ['status', 'wasteType'] }));

// ── Request size limit ──
app.use(express.json({ limit: '10kb' }));

// ── Force HTTPS in production ──
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(301, \`https://\${req.headers.host}\${req.url}\`);
    }
    next();
  });
}</code></pre>
      </div>
    </div>

    <div class="bg-green-500/10 p-6 rounded-xl">
      <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
      <p class="text-gray-300">Security-harden your WasteGo API: Add all middleware above. Run npm audit and fix vulnerabilities. Test NoSQL injection: POST /auth/login with body {"email":{"$gt":""}} — it should be sanitized and fail. Test XSS: submit a pickup note with script tags — should be escaped. Use https://observatory.mozilla.org to scan your deployed API and aim for a B+ security grade.</p>
    </div>
  </div>`,
  [
    { question: 'What is a CORS preflight request?', options: ['A test to check server speed', 'An OPTIONS request sent by browsers before cross-origin requests to verify the server allows them', 'A security scan', 'A cached request'], correct: 1 },
    { question: 'What does mongoSanitize() protect against?', options: ['SQL injection', 'NoSQL injection by removing MongoDB operators ($, .) from user input', 'XSS attacks', 'Brute force attacks'], correct: 1 },
    { question: 'What is XSS (Cross-Site Scripting)?', options: ['Cross-server scripting', 'Injecting malicious scripts into web pages viewed by other users', 'CSS styling attacks', 'Cross-site request forgery'], correct: 1 },
    { question: 'What does the Helmet package do?', options: ['Encrypts the request body', 'Sets various security-related HTTP response headers to protect against common attacks', 'Validates input', 'Manages authentication'], correct: 1 },
    { question: 'What does credentials: true in CORS options enable?', options: ['Basic authentication', 'Allows browsers to include cookies and auth headers in cross-origin requests', 'API key validation', 'HTTPS requirement'], correct: 1 },
    { question: 'What is HTTP Parameter Pollution (HPP)?', options: ['Polluting environment variables', 'Sending duplicate query parameters to confuse parsing logic — e.g. ?sort=price&sort=hack', 'Overloading request headers', 'Sending malformed HTTP requests'], correct: 1 },
    { question: 'Why limit request body size (e.g. 10kb)?', options: ['JSON cannot exceed 10kb', 'Prevent denial-of-service attacks by sending enormous request bodies', 'MongoDB has a 10kb document limit', 'JWT tokens require it'], correct: 1 },
    { question: 'What does HSTS (HTTP Strict Transport Security) do?', options: ['Forces all future connections from browsers to use HTTPS, even if user types http://', 'Encrypts cookies', 'Prevents XSS', 'Validates SSL certificates'], correct: 0 }
  ],
  50,
  'https://www.youtube.com/embed/enopDX9uAwo'
),

lesson(
  '8. Caching with Redis: Speed Up Your API',
  `<div class="space-y-6">
    <div class="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 p-6 rounded-xl">
      <h2 class="text-2xl font-bold text-blue-400 mb-2">📖 What You Will Learn</h2>
      <ul class="list-disc list-inside text-gray-300 space-y-1">
        <li>What Redis is and when to use caching</li>
        <li>Connecting to Redis from Node.js</li>
        <li>Cache-aside pattern for API responses</li>
        <li>Cache invalidation strategies</li>
        <li>Session storage with Redis</li>
      </ul>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">⚡ Redis Caching Pattern</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>import { createClient } from 'redis';

const redis = createClient({ url: process.env.REDIS_URL });
await redis.connect();

// ── Cache middleware ──
export function cache(ttlSeconds = 60) {
  return async (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') return next();

    const key = \`cache:\${req.originalUrl}\`;
    const cached = await redis.get(key);

    if (cached) {
      res.setHeader('X-Cache', 'HIT');
      return res.json(JSON.parse(cached));
    }

    // Patch res.json to intercept and cache the response
    const originalJson = res.json.bind(res);
    res.json = (data) => {
      redis.setEx(key, ttlSeconds, JSON.stringify(data));
      res.setHeader('X-Cache', 'MISS');
      return originalJson(data);
    };

    next();
  };
}

// Usage
router.get('/stats', cache(300), getStats);          // cache 5 minutes
router.get('/regions', cache(3600), getRegions);     // cache 1 hour
router.get('/pickups', cache(10), getAllPickups);     // cache 10 seconds

// ── Cache invalidation ──
async function invalidatePickupCache() {
  const keys = await redis.keys('cache:/api/v1/pickups*');
  if (keys.length > 0) await redis.del(keys);
}

// Invalidate when data changes
export const createPickup = catchAsync(async (req, res) => {
  const pickup = await Pickup.create({ ...req.body, customer: req.user._id });
  await invalidatePickupCache(); // clear stale cache
  res.status(201).json({ success: true, data: pickup });
});

// ── Rate limit storage with Redis ──
import RedisStore from 'rate-limit-redis';
const limiter = rateLimit({
  store: new RedisStore({ sendCommand: (...args) => redis.sendCommand(args) }),
  windowMs: 15 * 60 * 1000,
  max: 100
});</code></pre>
      </div>
    </div>

    <div class="bg-green-500/10 p-6 rounded-xl">
      <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
      <p class="text-gray-300">Add Redis caching to WasteGo: Cache GET /pickups for 30 seconds, GET /stats for 5 minutes, GET /regions for 1 hour. Invalidate pickup cache on every POST/PATCH/DELETE to pickups. Store rate limit counters in Redis so they persist across server restarts. Measure response time before and after caching with Postman — document the improvement in a comment.</p>
    </div>
  </div>`,
  [
    { question: 'What is the cache-aside pattern?', options: ['The cache stores data automatically', 'The app checks cache first; on miss, fetches from DB, stores in cache, returns data', 'All writes go to cache first', 'Cache is a write-through layer'], correct: 1 },
    { question: 'What does redis.setEx(key, ttl, value) do?', options: ['Sets a key that never expires', 'Sets a key with a TTL (time to live) in seconds — auto-deletes after expiry', 'Sets multiple keys', 'Gets and sets atomically'], correct: 1 },
    { question: 'What is cache invalidation?', options: ['Filling the cache with data', 'Removing or updating cached data when the underlying data changes to prevent stale responses', 'Clearing all Redis keys', 'Setting cache TTL to zero'], correct: 1 },
    { question: 'Why should you only cache GET requests?', options: ['POST is not supported by Redis', 'GET requests are read-only and safe to serve cached; POST/PATCH/DELETE modify data', 'GET is faster in Redis', 'Only GET has a stable cache key'], correct: 1 },
    { question: 'What is the X-Cache header used for?', options: ['Cross-cache communication', 'Telling the client whether the response came from cache (HIT) or the database (MISS)', 'Authentication', 'CORS preflight'], correct: 1 },
    { question: 'Why store rate limit counters in Redis instead of memory?', options: ['Redis is faster', 'In-memory counters reset on server restart and don\'t work with multiple server instances', 'Redis has no limits', 'Memory cannot store integers'], correct: 1 },
    { question: 'What is a TTL in caching?', options: ['Total Transfer Limit', 'Time To Live — how long a cached item is valid before it expires', 'Type Translation Layer', 'Transaction Total Log'], correct: 1 },
    { question: 'When should you NOT cache an API response?', options: ['Large responses', 'User-specific data (like "my pickups"), real-time data, or responses that change every request', 'Slow database queries', 'Frequently accessed data'], correct: 1 }
  ],
  50,
  'https://www.youtube.com/embed/jgpVdJB2sKQ'
),

lesson(
  '9. Background Jobs & Task Queues with Bull',
  `<div class="space-y-6">
    <div class="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 p-6 rounded-xl">
      <h2 class="text-2xl font-bold text-blue-400 mb-2">📖 What You Will Learn</h2>
      <ul class="list-disc list-inside text-gray-300 space-y-1">
        <li>Why background jobs matter (don't block the API)</li>
        <li>Setting up BullMQ with Redis</li>
        <li>Creating queues and workers</li>
        <li>Scheduled/cron jobs</li>
        <li>Retry logic and failed job handling</li>
      </ul>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">📬 BullMQ Queue Setup</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>import { Queue, Worker, QueueScheduler } from 'bullmq';
const connection = { host: 'localhost', port: 6379 };

// ── Define Queues ──
export const emailQueue = new Queue('emails', { connection });
export const smsQueue   = new Queue('sms',    { connection });
export const reportQueue = new Queue('reports', { connection });

// ── Add jobs to queue (from your controllers) ──
// Instead of: await sendEmail(user, pickup); // blocks the response!
// Do this:
await emailQueue.add('pickup-confirmation', {
  userId: user._id,
  pickupId: pickup._id,
  email: user.email,
  name: user.name
}, {
  attempts: 3,                          // retry up to 3 times
  backoff: { type: 'exponential', delay: 5000 }, // wait 5s, 10s, 20s
  removeOnComplete: 100,                // keep last 100 completed jobs
  removeOnFail: 500                     // keep last 500 failed jobs
});

// ── Worker: processes jobs ──
const emailWorker = new Worker('emails', async (job) => {
  const { name, email, pickupId } = job.data;

  switch (job.name) {
    case 'pickup-confirmation':
      await sendPickupConfirmationEmail(email, name, pickupId);
      break;
    case 'rider-assignment':
      await sendRiderAssignmentEmail(email, name, job.data.riderName);
      break;
    case 'weekly-report':
      const report = await generateWeeklyReport(job.data.userId);
      await sendReportEmail(email, report);
      break;
  }

  return { sent: true, to: email }; // stored as job result
}, { connection, concurrency: 5 }); // process 5 emails at once

emailWorker.on('completed', (job, result) => {
  console.log(\`Email job \${job.id} completed:\`, result);
});
emailWorker.on('failed', (job, err) => {
  console.error(\`Email job \${job.id} failed:\`, err.message);
});

// ── Scheduled/Cron jobs ──
await reportQueue.add('daily-summary', {}, {
  repeat: { cron: '0 8 * * *' } // every day at 8am
});

await emailQueue.add('cleanup-pending', {}, {
  repeat: { every: 60 * 60 * 1000 } // every hour
});</code></pre>
      </div>
    </div>

    <div class="bg-green-500/10 p-6 rounded-xl">
      <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
      <p class="text-gray-300">Add a job queue to WasteGo: emailQueue — send confirmation email when pickup is created, assignment email when rider is assigned. smsQueue — send SMS via Hubtel when pickup status changes to "in_progress". reportQueue — generate a daily CSV revenue report every morning at 7am and email it to admin. Set retry logic with exponential backoff on all jobs. Monitor jobs with Bull Board dashboard.</p>
    </div>
  </div>`,
  [
    { question: 'What is the main reason to use background jobs instead of doing work inline in a route handler?', options: ['Background jobs are more secure', 'To avoid blocking the HTTP response — return immediately and process slow tasks asynchronously', 'Jobs are required for emails', 'Route handlers cannot do async work'], correct: 1 },
    { question: 'What does "concurrency: 5" on a BullMQ worker mean?', options: ['Process 5 queues', 'Process up to 5 jobs simultaneously on this worker', 'Retry 5 times', 'Use 5 Redis connections'], correct: 1 },
    { question: 'What is exponential backoff in job retry logic?', options: ['The job retries with increasing delays (5s, 10s, 20s), reducing pressure on failing services', 'The job speed increases exponentially', 'Retries happen in parallel', 'Backoff disables retries'], correct: 0 },
    { question: 'What does a cron expression "0 8 * * *" mean?', options: ['Every 8 minutes', 'Every day at 8:00 AM', 'Every 8 hours', 'At minute 0 of hour 8 on day 8'], correct: 1 },
    { question: 'What does removeOnComplete: 100 do on a BullMQ job?', options: ['Removes jobs after 100 retries', 'Keeps only the last 100 completed jobs — prevents Redis memory bloat', 'Completes after 100ms', 'Removes 100 jobs at once'], correct: 1 },
    { question: 'What is a job queue worker?', options: ['A Node.js thread', 'A process that pulls jobs from the queue and executes them', 'A Redis command', 'A cron daemon'], correct: 1 },
    { question: 'Why use Redis as the backend for BullMQ?', options: ['Only Redis supports queues', 'Redis has atomic operations, persistence, and pub/sub needed for reliable distributed queues', 'MongoDB cannot store jobs', 'Redis is free'], correct: 1 },
    { question: 'What happens to a failed job in BullMQ after all retries are exhausted?', options: ['It is deleted automatically', 'It moves to the "failed" set and stays there for inspection and manual retry', 'The worker crashes', 'It is re-queued indefinitely'], correct: 1 }
  ],
  50,
  'https://www.youtube.com/embed/iYALMOKZfaA'
),

lesson(
  '10. Final Express Project: Production-Ready WasteGo API',
  `<div class="space-y-6">
    <div class="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 p-6 rounded-xl">
      <h2 class="text-2xl font-bold text-blue-400 mb-2">🏆 Final Project: Full Production API</h2>
      <p class="text-gray-300">You will build and deploy a complete, production-grade REST API for WasteGo using every Express concept from this course.</p>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">📋 Complete API Specification</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-black/60 p-4 rounded-lg">
          <p class="text-orange-400 font-semibold mb-2">Auth Endpoints</p>
          <ul class="text-gray-300 text-sm space-y-1 font-mono">
            <li>POST /auth/register</li>
            <li>POST /auth/login</li>
            <li>GET  /auth/me</li>
            <li>PATCH /auth/update-password</li>
            <li>POST /auth/forgot-password</li>
            <li>PATCH /auth/reset-password/:token</li>
          </ul>
        </div>
        <div class="bg-black/60 p-4 rounded-lg">
          <p class="text-purple-400 font-semibold mb-2">Pickup Endpoints</p>
          <ul class="text-gray-300 text-sm space-y-1 font-mono">
            <li>GET    /pickups (filter, sort, paginate)</li>
            <li>POST   /pickups</li>
            <li>GET    /pickups/:id</li>
            <li>PATCH  /pickups/:id</li>
            <li>DELETE /pickups/:id (admin)</li>
            <li>PATCH  /pickups/:id/accept (rider)</li>
            <li>PATCH  /pickups/:id/complete (rider)</li>
            <li>POST   /pickups/:id/photo</li>
          </ul>
        </div>
        <div class="bg-black/60 p-4 rounded-lg">
          <p class="text-cyan-400 font-semibold mb-2">Admin Endpoints</p>
          <ul class="text-gray-300 text-sm space-y-1 font-mono">
            <li>GET  /admin/users</li>
            <li>PATCH /admin/users/:id/ban</li>
            <li>GET  /admin/stats</li>
            <li>GET  /admin/revenue</li>
          </ul>
        </div>
        <div class="bg-black/60 p-4 rounded-lg">
          <p class="text-green-400 font-semibold mb-2">Production Checklist</p>
          <ul class="text-gray-300 text-sm space-y-1 list-disc list-inside">
            <li>Helmet + CORS + rate limiting</li>
            <li>Zod validation on all inputs</li>
            <li>Redis caching on GET routes</li>
            <li>BullMQ for emails and SMS</li>
            <li>Socket.io for live tracking</li>
            <li>Supertest API tests (80%+ coverage)</li>
            <li>GitHub Actions CI/CD</li>
            <li>Deployed on Railway or Render</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="bg-yellow-500/10 p-4 rounded-lg">
      <p class="text-yellow-300">🎓 <strong>You have mastered Express.js.</strong> Routing, middleware, auth, error handling, real-time, caching, queues, security, and deployment. You can now build any production API. Next: Vibe Coding — putting it all together on real projects.</p>
    </div>
  </div>`,
  [
    { question: 'What is the recommended structure for a production Express API?', options: ['All code in one file', 'MVC with separate routes, controllers, models, middleware, and services directories', 'Routes only, no controllers', 'One file per HTTP method'], correct: 1 },
    { question: 'What should the password reset flow look like?', options: ['Email the password directly', 'Generate a signed time-limited token, email a link, verify token on reset, hash new password', 'Store reset PIN in database', 'Ask user to re-register'], correct: 1 },
    { question: 'What does a health check endpoint (GET /health) do?', options: ['Tests user health', 'Returns server status (uptime, DB connection, memory) for monitoring tools', 'Validates API keys', 'Returns server logs'], correct: 1 },
    { question: 'What is API versioning (e.g. /api/v1/) for?', options: ['SEO optimization', 'Allowing breaking changes without disrupting existing clients by maintaining old versions', 'Database versioning', 'JWT versioning'], correct: 1 },
    { question: 'What does the Supertest library test?', options: ['Unit functions only', 'HTTP endpoints by making real requests to your Express app in tests', 'Frontend UI components', 'Database queries'], correct: 1 },
    { question: 'What should you always do before deploying an API to production?', options: ['Delete all tests', 'Run npm audit, run all tests, review env variables, test auth flows, check error handling', 'Set NODE_ENV to development', 'Remove all console.log statements only'], correct: 1 },
    { question: 'What is a good API documentation tool for Express?', options: ['README only', 'Swagger/OpenAPI — generates interactive docs from code annotations or schema definitions', 'Postman is for docs', 'HTML pages only'], correct: 1 },
    { question: 'What monitoring should a production Node.js API have?', options: ['None — it is managed by the host', 'Error tracking (Sentry), uptime monitoring, response time alerts, and database performance metrics', 'Only server logs', 'CPU monitoring only'], correct: 1 }
  ],
  100,
  'https://www.youtube.com/embed/fgTGADljAeg'
)

]; // end expressLessons

const expressCourse = savedCourses.find(c => c.title === 'Express.js');
for (let i = 0; i < expressLessons.length; i++) {
  const lessonData = expressLessons[i];
  const lesson = new Lesson({
    courseId: expressCourse._id,
    title: lessonData.title,
    content: lessonData.content,
    videoUrl: lessonData.videoUrl,
    quiz: lessonData.quiz,
    xpValue: lessonData.xpValue,
    order: i + 1
  });
  await lesson.save();
  expressCourse.lessons.push(lesson._id);
}
await expressCourse.save();
console.log(`✅ Express.js: added ${expressLessons.length} lessons`);
console.log('Express.js lessons seeded successfully!');


//  VIBE CODING LESSONS (10 lessons)
// ═══════════════════════════════════════════
const vibeLessons = [

lesson(
  '1. Vibe Coding: What It Is & How to Think Like a Builder',
  `<div class="space-y-6">
    <div class="bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-6 rounded-xl">
      <h2 class="text-2xl font-bold text-pink-400 mb-2">📖 What You Will Learn</h2>
      <ul class="list-disc list-inside text-gray-300 space-y-1">
        <li>What vibe coding means and why it's changing how software is built</li>
        <li>How to go from idea to working product fast</li>
        <li>The builder mindset vs the learner mindset</li>
        <li>Setting up your ultimate developer environment</li>
        <li>How to use AI as your co-pilot without becoming dependent on it</li>
      </ul>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🎵 What is Vibe Coding?</h2>
      <p class="text-gray-300 mb-3">Vibe coding is the art of building real products at high speed by combining your technical knowledge with AI tools, good taste, and ruthless focus on what matters. It is not about cutting corners — it is about shipping real value fast.</p>
      <p class="text-gray-300 mb-3">The best vibe coders have three traits:</p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-pink-500/10 p-4 rounded-lg">
          <p class="text-pink-300 font-semibold">🎯 Clarity</p>
          <p class="text-gray-400 text-sm">They know exactly what they are building and who it is for before writing a single line of code.</p>
        </div>
        <div class="bg-purple-500/10 p-4 rounded-lg">
          <p class="text-purple-300 font-semibold">⚡ Speed</p>
          <p class="text-gray-400 text-sm">They ship a working version in days not months. Then they improve based on real feedback.</p>
        </div>
        <div class="bg-blue-500/10 p-4 rounded-lg">
          <p class="text-blue-300 font-semibold">🧠 Taste</p>
          <p class="text-gray-400 text-sm">They know when something is good enough to ship and when it needs more work.</p>
        </div>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🛠️ The Ultimate Dev Environment</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code># Core tools every vibe coder needs

# 1. VS Code with these extensions:
#    - GitHub Copilot (AI autocomplete)
#    - Prettier (auto-format on save)
#    - ESLint (catch bugs before runtime)
#    - GitLens (see who wrote what)
#    - Thunder Client (test APIs without Postman)
#    - Live Server (instant HTML preview)
#    - Error Lens (inline error highlights)

# 2. Terminal setup
brew install zsh          # better shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
# Oh My Zsh: git shortcuts, syntax highlighting, autocomplete

# 3. Node version manager
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20

# 4. Git config
git config --global user.name "Your Name"
git config --global user.email "you@email.com"
git config --global core.editor "code --wait"
git config --global init.defaultBranch main

# 5. Key shortcuts to memorize
# VS Code:
# Ctrl+P          → open any file
# Ctrl+Shift+P    → command palette
# Ctrl+          → toggle terminal
# Alt+Shift+F     → format document
# Ctrl+D          → select next occurrence
# F2              → rename all occurrences</code></pre>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🗺️ The Vibe Coding Process</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code># The 5-step vibe coding loop

# Step 1: DEFINE (30 minutes max)
# - Who is this for? (one specific person)
# - What is the ONE problem it solves?
# - What does v1 look like? (list only essential features)
# - What does success look like?

# Step 2: DESIGN (1-2 hours)
# - Rough wireframe on paper or Figma
# - Pick your tech stack (match to the problem, not the hype)
# - Define your data models
# - Plan your API routes

# Step 3: BUILD (timebox it)
# - Backend first: models → routes → controllers
# - Frontend second: layout → data → interactions
# - Use AI to generate boilerplate, NOT logic
# - Commit every 30-60 minutes

# Step 4: SHIP (same day if possible)
# - Deploy to Railway/Vercel/Netlify
# - Share with 3 real people
# - Get feedback BEFORE adding more features

# Step 5: ITERATE
# - Fix the top 3 complaints
# - Add only what users actually ask for
# - Repeat</code></pre>
      </div>
    </div>

    <div class="bg-green-500/10 p-6 rounded-xl">
      <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
      <p class="text-gray-300">Set up your full dev environment: VS Code with all 7 extensions, Oh My Zsh, Node 20 via nvm, and Git configured. Then do the 30-minute DEFINE exercise for one app idea you have. Write it in a README.md: problem, target user, v1 features (max 5), success metric. Share it in the community for feedback before building anything.</p>
    </div>
  </div>`,
  [
    { question: 'What is the most important thing to do BEFORE writing any code on a new project?', options: ['Choose a framework', 'Clearly define the problem, target user, and v1 feature set', 'Set up the database', 'Write tests'], correct: 1 },
    { question: 'What does "shipping" mean in vibe coding?', options: ['Sending code to a colleague', 'Deploying a working version to a real URL that real users can access', 'Committing to git', 'Completing all planned features'], correct: 1 },
    { question: 'What is the role of AI in vibe coding?', options: ['AI writes all the code', 'AI is a co-pilot for boilerplate and suggestions — the developer drives decisions and logic', 'AI replaces the need to learn programming', 'AI is only for debugging'], correct: 1 },
    { question: 'What does "timebox" mean in the build step?', options: ['Building a timer app', 'Setting a fixed time limit for a task to prevent over-engineering', 'Using setTimeout in code', 'Scheduling meetings'], correct: 1 },
    { question: 'Why should you get user feedback BEFORE adding more features?', options: ['To save time writing code', 'Users reveal what actually matters — features you think are important often are not', 'It is a legal requirement', 'Feedback improves code quality'], correct: 1 },
    { question: 'What does the Prettier extension do in VS Code?', options: ['Makes code run faster', 'Automatically formats code to a consistent style on save', 'Finds security issues', 'Generates documentation'], correct: 1 },
    { question: 'What is the correct order in the vibe coding build step?', options: ['Frontend first, then backend', 'Backend first (models, routes, controllers), then frontend', 'Tests first, then code', 'Database last'], correct: 1 },
    { question: 'What makes a good v1 (first version) of a product?', options: ['Every feature the user might ever want', 'Only the essential features that solve the core problem — nothing more', 'A perfect UI', 'Full test coverage'], correct: 1 }
  ],
  50,
  'https://www.youtube.com/embed/MM7CAsquMOs'
),

lesson(
  '2. Build a Weather App: API Integration from Scratch',
  `<div class="space-y-6">
    <div class="bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-6 rounded-xl">
      <h2 class="text-2xl font-bold text-pink-400 mb-2">📖 What You Will Build</h2>
      <ul class="list-disc list-inside text-gray-300 space-y-1">
        <li>A fully functional weather PWA with real data</li>
        <li>Geolocation to auto-detect user location</li>
        <li>Open-Meteo API (free, no key needed)</li>
        <li>Search any city with OpenStreetMap geocoding</li>
        <li>5-day forecast with weather icons</li>
      </ul>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🌦️ Project Architecture</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code">weather-app/
├── index.html
├── styles.css
└── app.js

// ── Geocoding: city name → coordinates ──
async function geocodeCity(cityName) {
  const url = \`https://nominatim.openstreetmap.org/search?q=\${encodeURIComponent(cityName)}&format=json&limit=1\`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'WeatherApp/1.0' }
  });
  const data = await res.json();
  if (!data.length) throw new Error('City not found');
  return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon), name: data[0].display_name };
}

// ── Weather: coordinates → weather data ──
async function getWeather(lat, lng) {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.set('latitude',  lat);
  url.searchParams.set('longitude', lng);
  url.searchParams.set('current', [
    'temperature_2m', 'relative_humidity_2m',
    'wind_speed_10m', 'weather_code', 'apparent_temperature'
  ].join(','));
  url.searchParams.set('daily', [
    'temperature_2m_max', 'temperature_2m_min',
    'weather_code', 'precipitation_sum'
  ].join(','));
  url.searchParams.set('timezone', 'auto');
  url.searchParams.set('forecast_days', '5');

  const res = await fetch(url);
  return res.json();
}

// ── Weather code → emoji + description ──
function getWeatherInfo(code) {
  const codes = {
    0: { icon: '☀️', desc: 'Clear sky' },
    1: { icon: '🌤️', desc: 'Mainly clear' },
    2: { icon: '⛅', desc: 'Partly cloudy' },
    3: { icon: '☁️', desc: 'Overcast' },
    51: { icon: '🌦️', desc: 'Light drizzle' },
    61: { icon: '🌧️', desc: 'Light rain' },
    71: { icon: '❄️', desc: 'Light snow' },
    80: { icon: '🌦️', desc: 'Rain showers' },
    95: { icon: '⛈️', desc: 'Thunderstorm' },
  };
  // Find closest code
  const key = Object.keys(codes).reverse().find(k => code >= +k);
  return codes[key] || { icon: '🌡️', desc: 'Unknown' };
}

// ── Main app flow ──
async function loadWeather(lat, lng, locationName) {
  showSkeleton();
  try {
    const weather = await getWeather(lat, lng);
    renderCurrent(weather.current, locationName);
    renderForecast(weather.daily);
    cacheWeather(lat, lng, weather); // localStorage cache
  } catch (err) {
    showError(err.message);
  }
}

// ── Auto-detect location ──
document.querySelector('#detect-btn').addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(
    async ({ coords }) => {
      const { lat, lng } = { lat: coords.latitude, lng: coords.longitude };
      const geo = await geocodeCity(\`\${lat},\${lng}\`); // reverse geocode
      loadWeather(lat, lng, geo.name);
    },
    () => showError('Location access denied')
  );
});

// ── Search ──
const searchInput = document.querySelector('#city-search');
searchInput.addEventListener('keydown', async (e) => {
  if (e.key !== 'Enter') return;
  const city = searchInput.value.trim();
  if (!city) return;
  try {
    const { lat, lng, name } = await geocodeCity(city);
    loadWeather(lat, lng, name);
  } catch (err) {
    showError(err.message);
  }
});</code></pre>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🎨 Render Functions</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>function renderCurrent(current, locationName) {
  const info = getWeatherInfo(current.weather_code);
  document.querySelector('#current-weather').innerHTML = \`
    <div class="weather-card">
      <p class="location">\${locationName.split(',')[0]}</p>
      <p class="icon">\${info.icon}</p>
      <h1 class="temp">\${Math.round(current.temperature_2m)}°C</h1>
      <p class="desc">\${info.desc}</p>
      <div class="details">
        <span>💧 \${current.relative_humidity_2m}%</span>
        <span>💨 \${current.wind_speed_10m} km/h</span>
        <span>🌡️ Feels \${Math.round(current.apparent_temperature)}°C</span>
      </div>
    </div>
  \`;
}

function renderForecast(daily) {
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const html = daily.time.map((date, i) => {
    const info = getWeatherInfo(daily.weather_code[i]);
    const day = days[new Date(date).getDay()];
    return \`
      <div class="forecast-card">
        <p class="day">\${i === 0 ? 'Today' : day}</p>
        <p class="icon">\${info.icon}</p>
        <p class="high">\${Math.round(daily.temperature_2m_max[i])}°</p>
        <p class="low">\${Math.round(daily.temperature_2m_min[i])}°</p>
        \${daily.precipitation_sum[i] > 0
          ? \`<p class="rain">🌧 \${daily.precipitation_sum[i]}mm</p>\`
          : ''}
      </div>
    \`;
  }).join('');
  document.querySelector('#forecast').innerHTML = html;
}</code></pre>
      </div>
    </div>

    <div class="bg-green-500/10 p-6 rounded-xl">
      <h2 class="text-xl font-bold text-green-400 mb-2">✅ Full Build Challenge</h2>
      <p class="text-gray-300">Build the complete weather app in one sitting (4-6 hours): Geolocation auto-detect, city search, current weather display, 5-day forecast cards, loading skeleton, error handling, localStorage cache (refresh shows cached data instantly), dark/light theme toggle, PWA manifest + service worker. Deploy to GitHub Pages or Netlify. Share the live URL.</p>
    </div>
  </div>`,
  [
    { question: 'What API is used for weather data in this project?', options: ['OpenWeatherMap', 'Open-Meteo (free, no API key required)', 'WeatherAPI', 'AccuWeather'], correct: 1 },
    { question: 'What does the Nominatim API (OpenStreetMap) do in this project?', options: ['Provides weather data', 'Converts city names to coordinates (geocoding) and coordinates to city names (reverse geocoding)', 'Displays maps', 'Provides timezone data'], correct: 1 },
    { question: 'Why cache the weather response in localStorage?', options: ['APIs require caching', 'So the app shows data instantly on reload without waiting for a new API call', 'To save API costs', 'localStorage is faster than fetch'], correct: 1 },
    { question: 'What does encodeURIComponent() do in the geocoding URL?', options: ['Encodes the URL for security', 'Safely encodes special characters in the city name so they are valid in a URL', 'Compresses the request', 'Validates the city name'], correct: 1 },
    { question: 'What event should trigger the city search?', options: ['click on the input', 'keydown with key === "Enter"', 'input event', 'blur event'], correct: 1 },
    { question: 'What is a loading skeleton UI?', options: ['A CSS animation bug', 'Placeholder content that shows the layout while real data is loading, improving perceived performance', 'A loading spinner only', 'An empty page'], correct: 1 },
    { question: 'What does url.searchParams.set() do?', options: ['Sets a cookie', 'Adds or updates a query parameter on a URL object safely', 'Sets the base URL', 'Validates URL parameters'], correct: 1 },
    { question: 'Why split the app into separate functions (geocodeCity, getWeather, renderCurrent)?', options: ['JavaScript requires it', 'Separation of concerns — each function does one thing, making code testable and reusable', 'It is faster', 'APIs require function separation'], correct: 1 }
  ],
  50,
  'https://www.youtube.com/embed/MIYQR-Ybrn4'
),

lesson(
  '3. Build a Full-Stack Todo App with Node, Express & MongoDB',
  `<div class="space-y-6">
    <div class="bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-6 rounded-xl">
      <h2 class="text-2xl font-bold text-pink-400 mb-2">📖 What You Will Build</h2>
      <ul class="list-disc list-inside text-gray-300 space-y-1">
        <li>A real full-stack CRUD app from zero to deployed</li>
        <li>Express REST API with MongoDB storage</li>
        <li>User authentication with JWT</li>
        <li>Vanilla JS frontend that talks to your own API</li>
        <li>Deployed backend on Railway, frontend on Netlify</li>
      </ul>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🏗️ Backend: Express + MongoDB</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>// models/Todo.js
import mongoose from 'mongoose';
const todoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true, trim: true, maxlength: 500 },
  completed: { type: Boolean, default: false },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  dueDate: { type: Date }
}, { timestamps: true });

export const Todo = mongoose.model('Todo', todoSchema);

// routes/todo.routes.js
import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import * as Todo from '../controllers/todo.controller.js';

const router = Router();
router.use(protect); // all todo routes require login

router.route('/')
  .get(Todo.getAll)
  .post(Todo.create);

router.route('/:id')
  .patch(Todo.update)
  .delete(Todo.remove);

router.patch('/:id/toggle', Todo.toggle);
export default router;

// controllers/todo.controller.js
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/AppError.js';
import { Todo } from '../models/Todo.js';

export const getAll = catchAsync(async (req, res) => {
  const { completed, priority, sort = '-createdAt' } = req.query;
  const filter = { user: req.user._id };
  if (completed !== undefined) filter.completed = completed === 'true';
  if (priority) filter.priority = priority;

  const todos = await Todo.find(filter).sort(sort).lean();
  res.json({ success: true, count: todos.length, data: todos });
});

export const create = catchAsync(async (req, res) => {
  const todo = await Todo.create({ ...req.body, user: req.user._id });
  res.status(201).json({ success: true, data: todo });
});

export const toggle = catchAsync(async (req, res, next) => {
  const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });
  if (!todo) return next(new AppError('Todo not found', 404));
  todo.completed = !todo.completed;
  await todo.save();
  res.json({ success: true, data: todo });
});</code></pre>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">💻 Frontend: Vanilla JS SPA</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code">// api.js — all fetch calls in one place
const BASE = 'https://your-api.railway.app/api/v1';

const api = {
  headers: () => ({
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${localStorage.getItem('token')}\`
  }),

  async get(path) {
    const res = await fetch(BASE + path, { headers: this.headers() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async post(path, body) {
    const res = await fetch(BASE + path, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async patch(path, body = {}) {
    const res = await fetch(BASE + path, {
      method: 'PATCH',
      headers: this.headers(),
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async delete(path) {
    const res = await fetch(BASE + path, {
      method: 'DELETE',
      headers: this.headers()
    });
    if (res.status === 204) return null;
    return res.json();
  }
};

// app.js
let todos = [];

async function loadTodos() {
  showSkeleton();
  const { data } = await api.get('/todos');
  todos = data;
  renderTodos();
}

function renderTodos(filter = 'all') {
  const filtered = filter === 'all' ? todos
    : todos.filter(t => filter === 'completed' ? t.completed : !t.completed);

  document.querySelector('#todo-list').innerHTML = filtered.map(todo => \`
    <li class="todo-item \${todo.completed ? 'completed' : ''}" data-id="\${todo._id}">
      <button class="toggle-btn" data-action="toggle">\${todo.completed ? '✅' : '⬜'}</button>
      <span class="todo-text">\${todo.text}</span>
      <span class="priority priority--\${todo.priority}">\${todo.priority}</span>
      <button class="delete-btn" data-action="delete">🗑️</button>
    </li>
  \`).join('');
}

// Event delegation
document.querySelector('#todo-list').addEventListener('click', async (e) => {
  const action = e.target.dataset.action;
  const id = e.target.closest('[data-id]')?.dataset.id;
  if (!id) return;

  if (action === 'toggle') {
    await api.patch(\`/todos/\${id}/toggle\`);
    await loadTodos();
  }
  if (action === 'delete') {
    await api.delete(\`/todos/\${id}\`);
    todos = todos.filter(t => t._id !== id);
    renderTodos();
  }
});</code></pre>
      </div>
    </div>

    <div class="bg-green-500/10 p-6 rounded-xl">
      <h2 class="text-xl font-bold text-green-400 mb-2">✅ Full Build Challenge</h2>
      <p class="text-gray-300">Build and deploy the full-stack todo app in one day: Backend — Express + MongoDB + JWT auth, all CRUD routes, filter and sort. Frontend — login/register forms, todo list with filter tabs (All/Active/Completed), add form, toggle and delete, priority badges, due date display, item count. Deploy backend to Railway, frontend to Netlify. Share the live URL.</p>
    </div>
  </div>`,
  [
    { question: 'Why put all API fetch calls in a single api.js module?', options: ['JavaScript requires it', 'Centralizes the base URL and auth headers so you only update them in one place', 'It is faster', 'Fetch only works from one file'], correct: 1 },
    { question: 'Why filter todos by user: req.user._id in the database query?', options: ['For performance', 'To ensure users can only see and modify their own todos — data isolation', 'MongoDB requires it', 'Mongoose needs the user reference'], correct: 1 },
    { question: 'What does the toggle route (PATCH /:id/toggle) do?', options: ['Toggles the visibility of the todo', 'Flips the completed boolean on the todo document', 'Toggles between priority levels', 'Shows/hides the todo in the UI'], correct: 1 },
    { question: 'What is the advantage of using event delegation on the todo list?', options: ['It is required for dynamic elements', 'One listener handles all todo actions (toggle, delete) even for todos added after page load', 'It prevents event bubbling', 'It is faster than individual listeners'], correct: 1 },
    { question: 'Why deploy the frontend and backend separately?', options: ['They cannot run on the same server', 'Separate deployment allows independent scaling, different hosting optimizations, and cleaner architecture', 'Netlify requires it', 'MongoDB requires separate hosting'], correct: 1 },
    { question: 'What does the lean() method do on a Mongoose query in the controller?', options: ['Reduces query complexity', 'Returns plain JS objects instead of Mongoose Documents — faster for read-only operations', 'Removes empty fields', 'Enables lazy loading'], correct: 1 },
    { question: 'How do you check which HTTP method the request used in Express?', options: ['req.type', 'req.method', 'req.httpMethod', 'req.verb'], correct: 1 },
    { question: 'What does CORS need to be configured for when frontend and backend are on different domains?', options: ['CORS is not needed for separate domains', 'The backend must allow the frontend origin so browsers permit cross-origin requests', 'Only the frontend needs CORS', 'CORS is automatic with JWT'], correct: 1 }
  ],
  50,
  'https://www.youtube.com/embed/98BzS5Oz5E4'
),

lesson(
  '4. Build a Real-Time Chat App with Socket.io',
  `<div class="space-y-6">
    <div class="bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-6 rounded-xl">
      <h2 class="text-2xl font-bold text-pink-400 mb-2">📖 What You Will Build</h2>
      <ul class="list-disc list-inside text-gray-300 space-y-1">
        <li>A real-time group chat application</li>
        <li>Multiple chat rooms with join/leave</li>
        <li>Typing indicators and online user list</li>
        <li>Message history from MongoDB</li>
        <li>File/image sharing capability</li>
      </ul>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">💬 Chat Server</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';

// Message model
const messageSchema = new mongoose.Schema({
  room: { type: String, required: true, index: true },
  sender: { name: String, id: String },
  text: String,
  type: { type: String, enum: ['text', 'image', 'system'], default: 'text' },
  imageUrl: String,
  readBy: [String]
}, { timestamps: true });
const Message = mongoose.model('Message', messageSchema);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: '*' },
  pingTimeout: 60000
});

// Track online users per room
const rooms = new Map(); // roomId → Set of { socketId, name, userId }

io.on('connection', (socket) => {
  let currentRoom = null;
  let currentUser = null;

  // Join a room
  socket.on('join:room', async ({ room, user }) => {
    // Leave previous room
    if (currentRoom) {
      socket.leave(currentRoom);
      rooms.get(currentRoom)?.delete(socket.id);
      io.to(currentRoom).emit('room:users', [...(rooms.get(currentRoom) || [])]);
    }

    // Join new room
    socket.join(room);
    currentRoom = room;
    currentUser = user;

    if (!rooms.has(room)) rooms.set(room, new Map());
    rooms.get(room).set(socket.id, { ...user, socketId: socket.id });

    // Send last 50 messages
    const history = await Message.find({ room })
      .sort({ createdAt: -1 }).limit(50).lean();
    socket.emit('message:history', history.reverse());

    // Notify room of new user
    const systemMsg = await Message.create({
      room, type: 'system',
      text: \`\${user.name} joined the room\`,
      sender: { name: 'System', id: 'system' }
    });
    io.to(room).emit('message:new', systemMsg);
    io.to(room).emit('room:users', [...rooms.get(room).values()]);
  });

  // Send message
  socket.on('message:send', async ({ text, imageUrl }) => {
    if (!currentRoom) return;
    const msg = await Message.create({
      room: currentRoom,
      sender: currentUser,
      text,
      imageUrl,
      type: imageUrl ? 'image' : 'text'
    });
    io.to(currentRoom).emit('message:new', msg);
  });

  // Typing indicators
  socket.on('typing:start', () => {
    socket.to(currentRoom).emit('typing:start', currentUser.name);
  });
  socket.on('typing:stop', () => {
    socket.to(currentRoom).emit('typing:stop', currentUser.name);
  });

  // Disconnect
  socket.on('disconnect', () => {
    if (!currentRoom) return;
    rooms.get(currentRoom)?.delete(socket.id);
    io.to(currentRoom).emit('room:users', [...(rooms.get(currentRoom)?.values() || [])]);
    socket.to(currentRoom).emit('typing:stop', currentUser?.name);
  });
});

httpServer.listen(5000);</code></pre>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">💻 Chat Frontend</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>const socket = io('https://your-chat-api.railway.app');
const user = { id: crypto.randomUUID(), name: prompt('Enter your name:') };

// Join room
socket.emit('join:room', { room: 'general', user });

// Receive messages
socket.on('message:new', (msg) => appendMessage(msg));
socket.on('message:history', (msgs) => msgs.forEach(appendMessage));

// Typing indicator with debounce
let typingTimer;
const msgInput = document.querySelector('#msg-input');

msgInput.addEventListener('input', () => {
  socket.emit('typing:start');
  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => socket.emit('typing:stop'), 1000);
});

socket.on('typing:start', (name) => {
  document.querySelector('#typing').textContent = \`\${name} is typing...\`;
});
socket.on('typing:stop', () => {
  document.querySelector('#typing').textContent = '';
});

// Online users list
socket.on('room:users', (users) => {
  document.querySelector('#users').innerHTML =
    users.map(u => \`<li>\${u.name}</li>\`).join('');
});

// Send message
document.querySelector('#send-btn').addEventListener('click', () => {
  const text = msgInput.value.trim();
  if (!text) return;
  socket.emit('message:send', { text });
  msgInput.value = '';
  socket.emit('typing:stop');
});

function appendMessage(msg) {
  const isOwn = msg.sender.id === user.id;
  const div = document.createElement('div');
  div.className = \`message \${isOwn ? 'own' : 'other'} \${msg.type}\`;
  div.innerHTML = \`
    \${!isOwn ? \`<span class="sender">\${msg.sender.name}</span>\` : ''}
    \${msg.type === 'image'
      ? \`<img src="\${msg.imageUrl}" alt="shared image">\`
      : \`<p>\${msg.text}</p>\`}
    <span class="time">\${new Date(msg.createdAt).toLocaleTimeString()}</span>
  \`;
  document.querySelector('#messages').appendChild(div);
  div.scrollIntoView({ behavior: 'smooth' });
}</code></pre>
      </div>
    </div>

    <div class="bg-green-500/10 p-6 rounded-xl">
      <h2 class="text-xl font-bold text-green-400 mb-2">✅ Full Build Challenge</h2>
      <p class="text-gray-300">Build the complete chat app: Multiple rooms (general, tech, ghana-devs). Username prompt on entry. Real-time messages with sender name and timestamp. Typing indicators that clear after 1 second. Online users sidebar. Last 50 messages on room join. Image sharing via Cloudinary upload. Message read receipts. Deploy and test with 3 friends simultaneously in the same room.</p>
    </div>
  </div>`,
  [
    { question: 'What does socket.to(room).emit() do differently from io.to(room).emit()?', options: ['They are identical', 'socket.to() sends to everyone in the room EXCEPT the sender; io.to() sends to everyone including sender', 'io.to() is deprecated', 'socket.to() requires authentication'], correct: 1 },
    { question: 'Why debounce the typing:start event?', options: ['Socket.io requires debouncing', 'To avoid emitting a typing event on every single keystroke — batch them into one', 'Debounce is required for keyboard events', 'To prevent message sending'], correct: 1 },
    { question: 'Why save messages to MongoDB instead of only keeping them in memory?', options: ['Socket.io requires a database', 'So message history persists when the server restarts and new users joining can see past messages', 'MongoDB is faster than memory', 'To enable real-time features'], correct: 1 },
    { question: 'What does socket.leave(room) do?', options: ['Removes the socket from the server', 'Removes the socket from the named room so it no longer receives events emitted to that room', 'Disconnects the socket', 'Removes all listeners'], correct: 1 },
    { question: 'Why use a Map instead of an array to track online users per room?', options: ['Arrays don\'t support socket IDs', 'Maps allow O(1) lookup, add, and delete by socketId key — arrays require O(n) search', 'Maps are required by Socket.io', 'Arrays cannot store objects'], correct: 1 },
    { question: 'What is the purpose of the system message when a user joins a room?', options: ['Required by Socket.io', 'Notifies all room members that someone joined without having to check the users list', 'For logging purposes', 'MongoDB requires it'], correct: 1 },
    { question: 'How do you send a message only to the sender and not to others?', options: ['socket.sendSelf()', 'socket.emit() — emitting on the socket without a room targets only that socket', 'io.private(socket.id).emit()', 'socket.personal.emit()'], correct: 1 },
    { question: 'What does scrollIntoView({ behavior: "smooth" }) do?', options: ['Validates scroll position', 'Smoothly scrolls the element into the visible viewport area', 'Removes the element from DOM', 'Hides the scrollbar'], correct: 1 }
  ],
  50,
  'https://www.youtube.com/embed/ZwFA3eu4Lzc'
),

lesson(
  '5. Build an E-Commerce Product Page with Cart',
  `<div class="space-y-6">
    <div class="bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-6 rounded-xl">
      <h2 class="text-2xl font-bold text-pink-400 mb-2">📖 What You Will Build</h2>
      <ul class="list-disc list-inside text-gray-300 space-y-1">
        <li>Product listing page with filter and search</li>
        <li>Product detail page with image gallery</li>
        <li>Shopping cart with localStorage persistence</li>
        <li>Checkout form with validation</li>
        <li>Order confirmation with email</li>
      </ul>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🛒 Cart State Management</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>// cart.js — pure functions, no side effects
const CART_KEY = 'wastego_shop_cart';

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCartBadge(cart.length);
  renderCartDrawer(cart);
}

function addToCart(product, quantity = 1) {
  const cart = getCart();
  const existing = cart.find(i => i.id === product.id);
  if (existing) {
    existing.quantity = Math.min(existing.quantity + quantity, product.stock);
  } else {
    cart.push({ ...product, quantity });
  }
  saveCart(cart);
  showToast(\`\${product.name} added to cart!\`);
}

function removeFromCart(productId) {
  saveCart(getCart().filter(i => i.id !== productId));
}

function updateQuantity(productId, quantity) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  if (quantity <= 0) return removeFromCart(productId);
  item.quantity = quantity;
  saveCart(cart);
}

function getCartTotals() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax = subtotal * 0.15; // 15% VAT
  const shipping = subtotal > 200 ? 0 : 15; // free shipping over GHS 200
  return {
    subtotal,
    tax,
    shipping,
    total: subtotal + tax + shipping,
    itemCount: cart.reduce((sum, i) => sum + i.quantity, 0)
  };
}

function clearCart() {
  saveCart([]);
}

// ── Product filtering ──
function filterProducts(products, { search, category, maxPrice, sort }) {
  let result = [...products];
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }
  if (category && category !== 'all') {
    result = result.filter(p => p.category === category);
  }
  if (maxPrice) {
    result = result.filter(p => p.price <= maxPrice);
  }
  if (sort === 'price-asc')  result.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);
  if (sort === 'name')       result.sort((a, b) => a.name.localeCompare(b.name));
  return result;
}</code></pre>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🎨 Product Card & Cart Drawer</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code>function renderProducts(products) {
  document.querySelector('#products').innerHTML = products.length
    ? products.map(p => \`
        <div class="product-card" data-id="\${p.id}">
          <div class="product-img">
            <img src="\${p.image}" alt="\${p.name}" loading="lazy">
            \${p.badge ? \`<span class="badge">\${p.badge}</span>\` : ''}
          </div>
          <div class="product-info">
            <p class="category">\${p.category}</p>
            <h3 class="name">\${p.name}</h3>
            <div class="price-row">
              <span class="price">GHS \${p.price}</span>
              \${p.originalPrice ? \`<span class="original">GHS \${p.originalPrice}</span>\` : ''}
            </div>
            <div class="rating">\${'⭐'.repeat(Math.round(p.rating))} (\${p.reviews})</div>
            <button class="add-to-cart-btn \${p.stock === 0 ? 'out-of-stock' : ''}"
              data-action="add-to-cart" \${p.stock === 0 ? 'disabled' : ''}>
              \${p.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      \`).join('')
    : '<p class="no-results">No products found</p>';
}

function renderCartDrawer(cart) {
  const totals = getCartTotals();
  document.querySelector('#cart-items').innerHTML = cart.length
    ? cart.map(item => \`
        <div class="cart-item">
          <img src="\${item.image}" alt="\${item.name}">
          <div class="item-info">
            <p class="item-name">\${item.name}</p>
            <p class="item-price">GHS \${item.price}</p>
          </div>
          <div class="item-qty">
            <button data-action="decrease" data-id="\${item.id}">-</button>
            <span>\${item.quantity}</span>
            <button data-action="increase" data-id="\${item.id}">+</button>
          </div>
          <button data-action="remove" data-id="\${item.id}">🗑️</button>
        </div>
      \`).join('')
    : '<p class="empty-cart">Your cart is empty</p>';

  document.querySelector('#cart-subtotal').textContent = \`GHS \${totals.subtotal.toFixed(2)}\`;
  document.querySelector('#cart-total').textContent   = \`GHS \${totals.total.toFixed(2)}\`;
}</code></pre>
      </div>
    </div>

    <div class="bg-green-500/10 p-6 rounded-xl">
      <h2 class="text-xl font-bold text-green-400 mb-2">✅ Full Build Challenge</h2>
      <p class="text-gray-300">Build a WasteGo Shop selling eco-friendly products (reusable bags, compost bins, etc): Product grid with search, category filter, price range slider, sort dropdown. Product detail page with image gallery (click to zoom). Sliding cart drawer with quantity controls. Checkout form with Zod-like validation. Order summary page. Save cart to localStorage. Deploy and share.</p>
    </div>
  </div>`,
  [
    { question: 'Why store cart data in localStorage instead of a JavaScript variable?', options: ['Variables are slower', 'localStorage persists across page refreshes and browser sessions', 'JavaScript arrays cannot hold cart items', 'localStorage is more secure'], correct: 1 },
    { question: 'What does the pure function pattern for cart operations achieve?', options: ['Better performance', 'Predictable behavior — same input always gives same output, making bugs easier to find', 'Required by localStorage', 'Faster rendering'], correct: 1 },
    { question: 'Why use loading="lazy" on product images?', options: ['It is required for <img>', 'Images below the fold only load when they are about to enter the viewport, reducing initial load time', 'It adds a loading animation', 'Lazy images are higher quality'], correct: 1 },
    { question: 'How do you calculate the item count in a cart with multiple quantities?', options: ['cart.length', 'cart.reduce((sum, item) => sum + item.quantity, 0)', 'Object.keys(cart).length', 'cart.count()'], correct: 1 },
    { question: 'What does localeCompare() do when sorting products by name?', options: ['Compares local currency', 'Compares strings alphabetically in a locale-aware way (handles accented characters correctly)', 'Compares object references', 'Returns the locale of the string'], correct: 1 },
    { question: 'What is the purpose of data-action attributes on buttons?', options: ['CSS targeting', 'Allows event delegation to identify which action a clicked button should trigger', 'Required for accessibility', 'Sets the button type'], correct: 1 },
    { question: 'Why apply Math.min(quantity, product.stock) when adding to cart?', options: ['Math.min is required', 'Prevents adding more items than are actually in stock', 'For price calculation', 'Mongoose requires it'], correct: 1 },
    { question: 'What should happen when a user clicks "Add to Cart" on an already-carted item?', options: ['Show an error', 'Replace the item', 'Increase the quantity of the existing item instead of adding a duplicate', 'Remove the item'], correct: 2 }
  ],
  50,
  'https://www.youtube.com/embed/b3Gqq_k-g24'
),

lesson(
  '6. Build a Portfolio Website That Gets You Hired',
  `<div class="space-y-6">
    <div class="bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-6 rounded-xl">
      <h2 class="text-2xl font-bold text-pink-400 mb-2">📖 What You Will Build</h2>
      <ul class="list-disc list-inside text-gray-300 space-y-1">
        <li>A stunning portfolio that stands out from the crowd</li>
        <li>Animated hero with your personal brand</li>
        <li>Dynamic project showcase with live demo links</li>
        <li>Skills visualization and timeline</li>
        <li>Contact form connected to email API</li>
      </ul>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🎨 What Makes a Portfolio Stand Out</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code">/* Most portfolios look the same. Here is what makes yours different: */

/* 1. A clear personal brand statement */
/* BAD:  "I'm a developer who loves coding" */
/* GOOD: "I build fast, offline-capable web apps for West African businesses" */

/* 2. Projects with REAL outcomes, not just tech lists */
/* BAD:  "Weather App — HTML, CSS, JavaScript, API" */
/* GOOD: "WasteGo — Reduced collection admin time by 60% for 50+ Accra households.
          Built with Node.js, MongoDB, Socket.io. 2000+ pickups processed." */

/* 3. Live demos for EVERYTHING */
/* If it is not deployed, it does not exist to a hiring manager */

/* 4. Clean design with one accent color */
/* 5. Fast loading — Lighthouse score 90+ */
/* 6. Mobile-first and fully responsive */</code></pre>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">⚡ Animated Hero Section</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code">/* HTML */
&lt;section id="hero"&gt;
  &lt;div class="hero-content"&gt;
    &lt;p class="hero-greeting"&gt;Hello, I'm&lt;/p&gt;
    &lt;h1 class="hero-name"&gt;Cyril Asante&lt;/h1&gt;
    &lt;div class="hero-role"&gt;
      &lt;span&gt;I build &lt;/span&gt;
      &lt;span id="typed-text" class="accent"&gt;&lt;/span&gt;
      &lt;span class="cursor"&gt;|&lt;/span&gt;
    &lt;/div&gt;
    &lt;p class="hero-desc"&gt;Full-stack developer building tech for Ghana's fastest-growing businesses.&lt;/p&gt;
    &lt;div class="hero-btns"&gt;
      &lt;a href="#projects" class="btn btn--primary"&gt;See My Work&lt;/a&gt;
      &lt;a href="/resume.pdf" class="btn btn--ghost" download&gt;Download CV&lt;/a&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="hero-image"&gt;
    &lt;img src="profile.jpg" alt="Cyril Asante — Full Stack Developer"&gt;
    &lt;div class="status-badge"&gt;🟢 Open to work&lt;/div&gt;
  &lt;/div&gt;
&lt;/section&gt;

// Typing animation
const roles = [
  'PWAs that work offline.',
  'REST APIs at scale.',
  'real-time apps with Socket.io.',
  'solutions for Africa.'
];

let roleIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.querySelector('#typed-text');

function type() {
  const current = roles[roleIdx];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      return setTimeout(type, 2000); // pause before deleting
    }
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(type, deleting ? 50 : 100);
}
type();</code></pre>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">📬 Contact Form with Email</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code">// Simple serverless contact form with Formspree (free)
document.querySelector('#contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  const data = Object.fromEntries(new FormData(e.target));

  try {
    const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      showToast('Message sent! I will reply within 24 hours.');
      e.target.reset();
    } else {
      throw new Error('Failed to send');
    }
  } catch {
    showToast('Failed to send. Please email me directly.', 'error');
  } finally {
    btn.textContent = 'Send Message';
    btn.disabled = false;
  }
});</code></pre>
      </div>
    </div>

    <div class="bg-green-500/10 p-6 rounded-xl">
      <h2 class="text-xl font-bold text-green-400 mb-2">✅ Full Build Challenge</h2>
      <p class="text-gray-300">Build your personal portfolio this week: Hero with typing animation. Projects section with 3+ real projects (live demo + GitHub link for each). Skills section with animated progress bars or icons. Timeline of your learning journey. Contact form via Formspree. Dark/light theme toggle. SEO meta tags and Open Graph. Lighthouse score above 90 on all metrics. Custom domain on Netlify. Share with 5 developers for feedback.</p>
    </div>
  </div>`,
  [
    { question: 'What is the most important element of a developer portfolio?', options: ['A list of technologies', 'Live, deployed projects with real outcomes and impact described', 'A professional photo', 'A long bio'], correct: 1 },
    { question: 'What does new FormData(form) do?', options: ['Validates the form', 'Creates a key-value collection of all form field values by their name attributes', 'Submits the form to a server', 'Resets the form'], correct: 1 },
    { question: 'What does Object.fromEntries(formData) convert it into?', options: ['An array of values', 'A plain JavaScript object with field names as keys', 'A JSON string', 'An HTML form'], correct: 1 },
    { question: 'What is Formspree?', options: ['A form validation library', 'A service that handles form submissions and sends email notifications without requiring a backend', 'A CSS form styling framework', 'A browser form API'], correct: 1 },
    { question: 'Why disable the submit button after clicking and re-enable it in finally?', options: ['Required for forms', 'Prevents duplicate submissions and ensures the button is always re-enabled after the request', 'To improve performance', 'Formspree requires it'], correct: 1 },
    { question: 'What is a Lighthouse score?', options: ['A GitHub star rating', 'Google Chrome\'s audit tool scoring performance, accessibility, SEO, and best practices (0-100)', 'A server uptime metric', 'A CSS specificity score'], correct: 1 },
    { question: 'What does a typing animation achieve on a portfolio hero?', options: ['Improves SEO', 'Creates dynamic interest, shows multiple skills, and makes the site feel interactive and alive', 'Required for accessibility', 'Improves page speed'], correct: 1 },
    { question: 'Why should every portfolio project have a live demo link?', options: ['GitHub requires it', 'Hiring managers want to see it working — a deployed project proves you can ship, not just code', 'Netlify requires it', 'For SEO purposes'], correct: 1 }
  ],
  50,
  'https://www.youtube.com/embed/xV7S8BhIeBo'
),

lesson(
  '7. Build a Dashboard with Charts & Real Data',
  `<div class="space-y-6">
    <div class="bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-6 rounded-xl">
      <h2 class="text-2xl font-bold text-pink-400 mb-2">📖 What You Will Build</h2>
      <ul class="list-disc list-inside text-gray-300 space-y-1">
        <li>A real analytics dashboard with live data</li>
        <li>Line, bar, and pie charts with Chart.js</li>
        <li>KPI cards with animated counters</li>
        <li>Date range picker and data filtering</li>
        <li>Exportable CSV reports</li>
      </ul>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">📊 Chart.js Setup</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code">import Chart from 'chart.js/auto';

// ── Revenue Line Chart ──
function createRevenueChart(labels, data) {
  const ctx = document.querySelector('#revenue-chart').getContext('2d');

  // Destroy existing chart before recreating
  Chart.getChart(ctx)?.destroy();

  return new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Revenue (GHS)',
        data,
        borderColor: '#00ff88',
        backgroundColor: 'rgba(0, 255, 136, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,       // smooth curves
        pointRadius: 4,
        pointHoverRadius: 8,
        pointBackgroundColor: '#00ff88'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => \` GHS \${ctx.parsed.y.toLocaleString()}\`
          }
        }
      },
      scales: {
        x: { grid: { color: '#1a1a1a' }, ticks: { color: '#666' } },
        y: {
          grid: { color: '#1a1a1a' },
          ticks: { color: '#666', callback: (val) => \`GHS \${val.toLocaleString()}\` }
        }
      }
    }
  });
}

// ── Waste Type Doughnut Chart ──
function createWasteTypeChart(data) {
  const ctx = document.querySelector('#waste-type-chart').getContext('2d');
  Chart.getChart(ctx)?.destroy();

  return new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Organic', 'Plastic', 'Electronic', 'Mixed'],
      datasets: [{
        data: [data.organic, data.plastic, data.electronic, data.mixed],
        backgroundColor: ['#00ff88', '#4f46e5', '#f59e0b', '#ef4444'],
        borderWidth: 0,
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom', labels: { color: '#999', padding: 20 } }
      },
      cutout: '70%'
    }
  });
}

// ── Animated KPI Counter ──
function animateCounter(element, target, duration = 1500, prefix = '', suffix = '') {
  const start = parseInt(element.textContent.replace(/\D/g, '')) || 0;
  const range = target - start;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.round(start + range * ease);
    element.textContent = prefix + current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ── CSV Export ──
function exportToCSV(data, filename = 'report.csv') {
  const headers = Object.keys(data[0]);
  const rows = data.map(row => headers.map(h => \`"\${row[h]}"\`).join(','));
  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}</code></pre>
      </div>
    </div>

    <div class="bg-green-500/10 p-6 rounded-xl">
      <h2 class="text-xl font-bold text-green-400 mb-2">✅ Full Build Challenge</h2>
      <p class="text-gray-300">Build the WasteGo Admin Dashboard: 4 KPI cards (total pickups, revenue, active riders, completion rate) with animated counters. Line chart for daily revenue (last 30 days). Bar chart for pickups by region. Doughnut chart for waste type breakdown. Date range picker that refetches and re-renders all charts. Sortable data table with all pickups. Export to CSV button. Responsive layout using CSS Grid.</p>
    </div>
  </div>`,
  [
    { question: 'What does Chart.getChart(ctx)?.destroy() do before creating a new chart?', options: ['Clears the canvas visually', 'Destroys the existing Chart.js instance to prevent memory leaks and duplicate charts', 'Resets the canvas size', 'Required by Chart.js API'], correct: 1 },
    { question: 'What does tension: 0.4 do on a Chart.js line dataset?', options: ['Sets line thickness', 'Makes the line curve smoothly between points instead of being angular', 'Sets data point size', 'Controls animation speed'], correct: 1 },
    { question: 'What does requestAnimationFrame() do in the counter animation?', options: ['Delays execution', 'Schedules the next animation frame to run at the screen\'s refresh rate (60fps) for smooth animation', 'Formats numbers', 'Requests permission to animate'], correct: 1 },
    { question: 'What does URL.createObjectURL(blob) do?', options: ['Uploads a file', 'Creates a temporary URL pointing to an in-memory Blob, usable for downloads or previews', 'Validates a URL', 'Opens a URL in a new tab'], correct: 1 },
    { question: 'Why call URL.revokeObjectURL() after triggering the download?', options: ['Required by browsers', 'Releases the memory used by the temporary URL to prevent memory leaks', 'Prevents re-downloading', 'Closes the download dialog'], correct: 1 },
    { question: 'What does maintainAspectRatio: false do in Chart.js options?', options: ['Distorts the chart', 'Allows the chart to fill its container\'s height freely instead of maintaining a fixed ratio', 'Disables responsiveness', 'Sets aspect ratio to 1:1'], correct: 1 },
    { question: 'What is an ease-out cubic animation curve?', options: ['Animation that speeds up at end', 'Animation that starts fast and slows down smoothly at the end, feeling natural', 'A constant speed animation', 'Animation with a bounce effect'], correct: 1 },
    { question: 'What does responsive: true do in Chart.js?', options: ['Makes the chart work on mobile only', 'Automatically resizes the chart when its container size changes', 'Enables touch events', 'Loads a mobile-friendly theme'], correct: 1 }
  ],
  50,
  'https://www.youtube.com/embed/sE08f4iuOhA'
),

lesson(
  '8. Build & Deploy a SaaS Landing Page',
  `<div class="space-y-6">
    <div class="bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-6 rounded-xl">
      <h2 class="text-2xl font-bold text-pink-400 mb-2">📖 What You Will Build</h2>
      <ul class="list-disc list-inside text-gray-300 space-y-1">
        <li>A high-converting SaaS product landing page</li>
        <li>Hero, features, pricing, testimonials, FAQ, CTA sections</li>
        <li>Email waitlist with a backend endpoint</li>
        <li>Scroll-driven animations</li>
        <li>A/B tested headlines with localStorage</li>
      </ul>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🚀 Landing Page Structure</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code">/* The anatomy of a high-converting SaaS landing page */

/* 1. NAV */
/* Logo left, nav links center, CTA button right */
/* Sticky on scroll with subtle background on scroll */

/* 2. HERO — the most important section */
/* Above the fold: headline, subheadline, CTA, social proof */
/* Headline formula: [OUTCOME] for [AUDIENCE] without [PAIN] */
/* Example: "Get waste collected in 30 minutes — without phone calls" */

/* 3. SOCIAL PROOF */
/* Logos of notable customers or "Trusted by X households in Accra" */

/* 4. PROBLEM section */
/* Describe the painful status quo so clearly users feel seen */

/* 5. FEATURES / HOW IT WORKS */
/* 3-4 features with icon, title, description */
/* Alternate layout: feature text left, screenshot right */

/* 6. DEMO / SCREENSHOT section */
/* Animated product screenshot or embedded video */

/* 7. PRICING */
/* 3 tiers: Starter, Pro, Business */
/* Highlight the recommended tier visually */
/* Annual/Monthly toggle */

/* 8. TESTIMONIALS */
/* Real quotes with photo, name, company */
/* Star ratings */

/* 9. FAQ */
/* Top 6-8 questions using &lt;details&gt;/&lt;summary&gt; */

/* 10. FINAL CTA */
/* Repeat the main value prop + waitlist/signup form */

/* 11. FOOTER */
/* Links, social, copyright, privacy policy */</code></pre>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">📧 Email Waitlist Backend</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code">// Express route for email capture
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

// Store emails (use MongoDB in production)
const waitlist = new Set();

app.post('/api/waitlist', async (req, res) => {
  const { email, name } = req.body;

  // Validate
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(422).json({ error: 'Valid email required' });
  }

  if (waitlist.has(email)) {
    return res.json({ message: 'You are already on the waitlist!' });
  }

  waitlist.add(email);

  // Send welcome email
  await resend.emails.send({
    from: 'WasteGo <hello@wastego.gh>',
    to: email,
    subject: 'You\'re on the WasteGo waitlist! 🚛',
    html: \`
      &lt;h1&gt;Welcome \${name || 'there'}!&lt;/h1&gt;
      &lt;p&gt;You are #\${waitlist.size} on our waitlist.&lt;/p&gt;
      &lt;p&gt;We will email you the moment we launch in your area.&lt;/p&gt;
      &lt;p&gt;In the meantime, share with friends to move up the list!&lt;/p&gt;
    \`
  });

  res.json({
    message: 'You are on the list!',
    position: waitlist.size
  });
});</code></pre>
      </div>
    </div>

    <div class="bg-green-500/10 p-6 rounded-xl">
      <h2 class="text-xl font-bold text-green-400 mb-2">✅ Full Build Challenge</h2>
      <p class="text-gray-300">Build the WasteGo landing page in 2 days: All 11 sections above. Scroll-driven section reveals (CSS animation-timeline or Intersection Observer). Sticky nav that adds a background on scroll. Pricing toggle (monthly/annual). FAQ accordion with smooth CSS transitions. Email waitlist with the backend endpoint above. Google Analytics or Plausible for traffic. Deploy to Netlify with a custom domain. Share in the community.</p>
    </div>
  </div>`,
  [
    { question: 'What is the most important section on a SaaS landing page?', options: ['Pricing', 'The Hero — it is the first thing visitors see and determines if they stay', 'Testimonials', 'FAQ'], correct: 1 },
    { question: 'What is the headline formula for SaaS landing pages?', options: ['List all features', '[OUTCOME] for [AUDIENCE] without [PAIN]', 'Name the product and version', 'Show the price first'], correct: 1 },
    { question: 'What does the Intersection Observer API do?', options: ['Observes database intersections', 'Fires a callback when an element enters or leaves the viewport — used for scroll animations', 'Tracks user mouse position', 'Observes network requests'], correct: 1 },
    { question: 'Why use a Set to store waitlist emails?', options: ['Sets are faster than arrays', 'Sets automatically prevent duplicate entries', 'MongoDB requires Sets', 'Arrays cannot store emails'], correct: 1 },
    { question: 'What makes a pricing page convert well?', options: ['Show all features', 'Visually highlight a recommended plan, keep tiers simple, show annual savings, include a money-back guarantee', 'Show enterprise pricing', 'Hide pricing until signup'], correct: 1 },
    { question: 'What is social proof in a landing page context?', options: ['Social media links', 'Evidence that others trust and use the product — testimonials, logos, user counts, reviews', 'Open source code', 'A social login button'], correct: 1 },
    { question: 'Why send a confirmation email immediately when someone joins the waitlist?', options: ['It is required by law', 'Confirms their spot, sets expectations, and starts building a relationship before launch', 'Email APIs require it', 'To verify the email address'], correct: 1 },
    { question: 'What does A/B testing headlines mean?', options: ['Testing the page on two browsers', 'Showing different headlines to different visitors and measuring which converts better', 'Testing with two developers', 'Running the page on two servers'], correct: 1 }
  ],
  50,
  'https://www.youtube.com/embed/eqXans7Ikb0'
),

lesson(
  '9. Git, GitHub & Team Collaboration Workflows',
  `<div class="space-y-6">
    <div class="bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-6 rounded-xl">
      <h2 class="text-2xl font-bold text-pink-400 mb-2">📖 What You Will Learn</h2>
      <ul class="list-disc list-inside text-gray-300 space-y-1">
        <li>Git fundamentals: commit, branch, merge, rebase</li>
        <li>GitHub flow for solo and team projects</li>
        <li>Pull requests, code reviews, and merge strategies</li>
        <li>Resolving merge conflicts confidently</li>
        <li>Git hooks and conventional commits</li>
      </ul>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🌿 Git Workflow Mastery</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code"># ── Daily workflow ──
git status                      # what changed?
git diff                        # see exact changes
git add .                       # stage all changes
git add src/routes/pickup.js    # stage specific file
git commit -m "feat: add pickup filtering by region"
git push origin main

# ── Branching ──
git checkout -b feat/rider-matching   # create + switch to branch
git branch                            # list branches
git checkout main                     # switch back
git merge feat/rider-matching         # merge into main
git branch -d feat/rider-matching     # delete merged branch

# ── Conventional Commits (industry standard) ──
# Format: type(scope): description
git commit -m "feat(pickups): add weight-based pricing"
git commit -m "fix(auth): resolve token refresh race condition"
git commit -m "docs: update API documentation"
git commit -m "refactor(db): extract query builder utility"
git commit -m "test(auth): add login rate limit tests"
git commit -m "chore: upgrade mongoose to v8"
git commit -m "style: format all files with prettier"

# ── Undoing mistakes ──
git restore --staged file.js    # unstage a file
git restore file.js             # discard working changes
git reset --soft HEAD~1         # undo last commit, keep changes staged
git reset --mixed HEAD~1        # undo last commit, keep changes unstaged
git reset --hard HEAD~1         # undo last commit, DESTROY changes (careful!)
git revert abc1234              # create new commit that undoes abc1234 (safe!)

# ── Viewing history ──
git log --oneline --graph --all # visual branch history
git log -p src/auth.js          # changes to a specific file
git blame src/auth.js           # who wrote each line?
git stash                       # temporarily shelve changes
git stash pop                   # restore stashed changes

# ── Remote operations ──
git fetch origin                # download remote changes (don't merge)
git pull origin main            # fetch + merge
git pull --rebase origin main   # fetch + rebase (cleaner history)
git push --force-with-lease     # safer force push (only if your understanding is current)</code></pre>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">🔀 Resolving Merge Conflicts</h2>
      <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
        <pre class="text-green-400 text-sm leading-relaxed"><code"># A merge conflict happens when two branches change the same line
# Git marks the conflict like this:

<<<<<<< HEAD (your changes)
const price = calculatePrice(weight, 'organic');
=======
const price = calculatePrice(weight, type);
>>>>>>> feat/dynamic-pricing (incoming changes)

# Step 1: Open the file and decide which version is correct
# (or combine both)

# RESOLVED:
const price = calculatePrice(weight, type || 'organic');

# Step 2: Stage the resolved file
git add src/utils/pricing.js

# Step 3: Complete the merge
git commit -m "merge: resolve pricing calculation conflict"

# VS Code makes this easier with the conflict editor UI:
# Click "Accept Current", "Accept Incoming", or "Accept Both"</code></pre>
      </div>
    </div>

    <div class="bg-green-500/10 p-6 rounded-xl">
      <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
      <p class="text-gray-300">Practice the full GitHub flow: Create a repo for WasteGo. Make 3 feature branches (feat/auth, feat/pickups, feat/dashboard). Make changes on each, create pull requests on GitHub with a description. Review your own PR (add comments). Merge with squash. Deliberately create a merge conflict between two branches and resolve it. Set up a branch protection rule on main requiring PR reviews.</p>
    </div>
  </div>`,
  [
    { question: 'What does git reset --soft HEAD~1 do?', options: ['Deletes the last commit permanently', 'Undoes the last commit but keeps the changes staged, ready to recommit', 'Resets to the initial commit', 'Soft-deletes the branch'], correct: 1 },
    { question: 'What is the conventional commits format?', options: ['Any descriptive message', 'type(scope): description — e.g. feat(auth): add JWT refresh tokens', 'File name: change description', 'Version: change description'], correct: 1 },
    { question: 'What is a merge conflict?', options: ['Two people pushing at the same time', 'When two branches have changed the same part of the same file and Git cannot auto-merge', 'A failed git push', 'A deleted branch conflict'], correct: 1 },
    { question: 'What does git stash do?', options: ['Deletes uncommitted changes', 'Temporarily saves uncommitted changes so you can switch branches with a clean working directory', 'Stashes the git history', 'Saves a branch as a zip'], correct: 1 },
    { question: 'What is the difference between git fetch and git pull?', options: ['They are identical', 'fetch downloads remote changes without merging; pull downloads AND merges into your current branch', 'fetch is faster', 'pull only works on main branch'], correct: 1 },
    { question: 'What does a Pull Request (PR) on GitHub allow?', options: ['Pulls code from forks only', 'Proposes merging a branch, enables code review, discussion, and CI checks before merging', 'Requests someone to pull your repo', 'Automatically merges branches'], correct: 1 },
    { question: 'What does git revert do differently from git reset?', options: ['They are identical', 'revert creates a new commit that undoes changes — safe for shared branches; reset rewrites history', 'reset is safer', 'revert only works on file changes'], correct: 1 },
    { question: 'What is branch protection on GitHub main?', options: ['Encrypts the main branch', 'A rule requiring PRs and passing CI before anything can be merged into main', 'Prevents force pushes by everyone', 'Makes the branch read-only permanently'], correct: 1 }
  ],
  50,
  'https://www.youtube.com/embed/RGOj5yH7evk'
),

lesson(
  '10. Final Vibe Coding Project: Ship Your Own SaaS MVP',
  `<div class="space-y-6">
    <div class="bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-6 rounded-xl">
      <h2 class="text-2xl font-bold text-pink-400 mb-2">🏆 Final Project: Your SaaS MVP</h2>
      <p class="text-gray-300">Everything you have built leads to this. You will ideate, design, build, and ship a real SaaS product from zero in 2 weeks. This is the project you will show in job interviews.</p>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">📋 MVP Requirements</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-black/60 p-4 rounded-lg">
          <p class="text-orange-400 font-semibold mb-2">Product</p>
          <ul class="text-gray-300 text-sm space-y-1 list-disc list-inside">
            <li>Solves a real problem for a specific audience</li>
            <li>One core feature done extremely well</li>
            <li>Live at a real URL (not localhost)</li>
            <li>At least 3 real users testing it</li>
          </ul>
        </div>
        <div class="bg-black/60 p-4 rounded-lg">
          <p class="text-purple-400 font-semibold mb-2">Technical</p>
          <ul class="text-gray-300 text-sm space-y-1 list-disc list-inside">
            <li>Full-stack: Express API + MongoDB + Vanilla JS or basic framework</li>
            <li>User auth (register, login, protected routes)</li>
            <li>At least one real-time feature or external API</li>
            <li>Mobile-responsive design</li>
            <li>Error handling and loading states</li>
          </ul>
        </div>
        <div class="bg-black/60 p-4 rounded-lg">
          <p class="text-cyan-400 font-semibold mb-2">Ship</p>
          <ul class="text-gray-300 text-sm space-y-1 list-disc list-inside">
            <li>Backend on Railway or Render</li>
            <li>Frontend on Netlify or Vercel</li>
            <li>Custom domain (optional but impressive)</li>
            <li>CI/CD: GitHub Actions runs tests on push</li>
          </ul>
        </div>
        <div class="bg-black/60 p-4 rounded-lg">
          <p class="text-green-400 font-semibold mb-2">Document</p>
          <ul class="text-gray-300 text-sm space-y-1 list-disc list-inside">
            <li>README with demo GIF, tech stack, setup steps</li>
            <li>API documentation (Swagger or Postman collection)</li>
            <li>At least 10 tests passing</li>
            <li>Retrospective: what you learned and what you would do differently</li>
          </ul>
        </div>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-cyan-400 mb-2">💡 MVP Ideas for Ghana</h2>
      <div class="bg-black/60 rounded-xl p-5">
        <ul class="text-gray-300 space-y-2">
          <li>🚛 <strong class="text-green-400">WasteGo</strong> — on-demand waste collection (you are already building this!)</li>
          <li>🍽️ <strong class="text-orange-400">MealPlan GH</strong> — weekly meal planning + ingredient delivery</li>
          <li>📚 <strong class="text-blue-400">TutorMatch</strong> — connect students with tutors in Ghana</li>
          <li>🏠 <strong class="text-purple-400">RentEase</strong> — apartment listings with virtual tours</li>
          <li>💊 <strong class="text-red-400">MedRemind</strong> — medication reminder for elderly relatives</li>
          <li>🔧 <strong class="text-yellow-400">ArtisanHub</strong> — book electricians, plumbers, carpenters on demand</li>
          <li>📦 <strong class="text-cyan-400">StoreFront</strong> — no-code store builder for Accra market traders</li>
        </ul>
      </div>
    </div>

    <div class="bg-yellow-500/10 p-4 rounded-lg">
      <p class="text-yellow-300">🎓 <strong>You have completed Vibe Coding.</strong> You can now take any idea from concept to deployed product. You have shipped weather apps, todo apps, chat apps, dashboards, e-commerce, portfolios, and landing pages. The only thing left: AI Prompting — learning to work 10x faster with AI tools.</p>
    </div>
  </div>`,
  [
    { question: 'What is an MVP?', options: ['Most Valuable Player', 'Minimum Viable Product — the smallest version of your product that delivers the core value to real users', 'Maximum Viable Product', 'Minimum Viable Prototype'], correct: 1 },
    { question: 'What is the most important metric for an MVP?', options: ['Lines of code', 'Whether real users find it valuable enough to use repeatedly', 'Test coverage', 'Page speed score'], correct: 1 },
    { question: 'Why build for a specific audience instead of "everyone"?', options: ['It is easier to market', 'Specific audiences have specific needs you can solve deeply — trying to serve everyone leads to a mediocre product for nobody', 'General products don\'t sell', 'It reduces development time'], correct: 1 },
    { question: 'What should a good project README include?', options: ['Only the license', 'Demo GIF/screenshot, description, tech stack, setup instructions, live URL, and contribution guide', 'Just the install command', 'The full source code'], correct: 1 },
    { question: 'Why is a GitHub Actions CI/CD pipeline important for a portfolio project?', options: ['It is required by GitHub', 'It shows employers you understand professional software development practices beyond just writing code', 'It speeds up the app', 'GitHub requires tests'], correct: 1 },
    { question: 'What is a project retrospective?', options: ['A code review', 'A reflection on what went well, what went wrong, and what you would do differently next time', 'A user feedback session', 'A performance audit'], correct: 1 },
    { question: 'What is the biggest mistake first-time builders make with their MVP?', options: ['Deploying too early', 'Building too many features before getting any real user feedback', 'Using too many technologies', 'Making it too simple'], correct: 1 },
    { question: 'What does "ship it" mean in developer culture?', options: ['Send the code by mail', 'Deploy a working version to production for real users to access — done is better than perfect', 'Ship the codebase to a client', 'Complete 100% of planned features'], correct: 1 }
  ],
  100,
  'https://www.youtube.com/embed/kxIdSwkjFKo'
)

]; // end vibeLessons

const vibeCourse = savedCourses.find(c => c.title === 'Vibe Coding');
for (let i = 0; i < vibeLessons.length; i++) {
  const lessonData = vibeLessons[i];
  const lesson = new Lesson({
    courseId: vibeCourse._id,
    title: lessonData.title,
    content: lessonData.content,
    videoUrl: lessonData.videoUrl,
    quiz: lessonData.quiz,
    xpValue: lessonData.xpValue,
    order: i + 1
  });
  await lesson.save();
  vibeCourse.lessons.push(lesson._id);
}
await vibeCourse.save();
console.log(`✅ Vibe Coding: added ${vibeLessons.length} lessons`);
console.log(`vibe coding lessions seeded successfully`);


// ─────────────────────────────────────────────
//  PYTHON LESSONS (10 lessons, 8 quizzes each)
// ─────────────────────────────────────────────
const pythonLessons = [
  lesson(
    '1. Python Basics: Setup, Variables & Data Types',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-blue-500/10 to-green-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-blue-400 mb-2">📖 What You Will Learn</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li>Installing Python and setting up VS Code</li>
          <li>Running your first Python script</li>
          <li>Variables, dynamic typing, and naming conventions</li>
          <li>Basic data types: int, float, str, bool, None</li>
          <li>Type conversion and input() function</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🐍 Your First Python Program</h2>
        <p class="text-gray-300 mb-3">Python is an interpreted, high-level language known for its readability. It's used for web development, data science, AI, and automation.</p>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code># This is a comment
print("Hello, DevForge!")   # Output: Hello, DevForge!

# Variables (no type declaration needed)
name = "Kwame"
age = 24
price = 19.99
is_active = True
nothing = None

print(f"My name is {name}, I am {age} years old.")</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">📊 Data Types & Type Conversion</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code># Integer
count = 10

# Float
pi = 3.14159

# String
greeting = "Hello"

# Boolean
is_ready = False

# None (null)
result = None

# Type conversion
num_str = "123"
num_int = int(num_str)   # 123
float_num = float(num_int)  # 123.0
str_num = str(456)       # "456"

# Get user input
user_name = input("Enter your name: ")
print(f"Welcome, {user_name}!")</code></pre>
        </div>
      </div>

      <div class="bg-green-500/10 p-6 rounded-xl">
        <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
        <p class="text-gray-300">Write a program that asks the user for their name, age, and favorite number. Convert the age to an integer and the favorite number to a float. Print a summary sentence using f-strings. Calculate and print the user's birth year (assuming current year is 2026).</p>
      </div>
    </div>`,
    [
      { question: 'Which of the following is a valid variable name in Python?', options: ['2myVar', 'my-var', '_myVar', 'my var'], correct: 2 },
      { question: 'What is the output of `print(type(10))`?', options: ['<class \'int\'>', '<class \'float\'>', '<class \'str\'>', '<class \'bool\'>'], correct: 0 },
      { question: 'How do you convert the string "3.14" to a float?', options: ['float("3.14")', 'int("3.14")', 'str("3.14")', 'to_float("3.14")'], correct: 0 },
      { question: 'What is the correct way to print a variable `age` inside a string?', options: ['print("Age: age")', 'print(f"Age: {age}")', 'print("Age: " + age)', 'Both B and C are correct'], correct: 3 },
      { question: 'What does the `input()` function return?', options: ['An integer', 'A float', 'A string', 'A boolean'], correct: 2 },
      { question: 'Which of these is NOT a Python data type?', options: ['int', 'float', 'char', 'bool'], correct: 2 },
      { question: 'What is the result of `int(3.99)`?', options: ['3.99', '4', '3', 'Error'], correct: 2 },
      { question: 'What does `None` represent in Python?', options: ['Zero', 'Empty string', 'Null value (absence of a value)', 'False'], correct: 2 }
    ],
    50,
    'https://www.youtube.com/embed/rfscVS0vtbw'  // freeCodeCamp: Python for Beginners
  ),

  lesson(
    '2. Control Flow: Conditionals & Loops',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-blue-500/10 to-green-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-blue-400 mb-2">📖 What You Will Learn</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li>if, elif, else conditional statements</li>
          <li>Comparison and logical operators</li>
          <li>for loops and while loops</li>
          <li>Loop control: break, continue, else clause</li>
          <li>Nested loops and loop else</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🔀 Conditionals</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>age = 18

if age < 18:
    print("Minor")
elif age == 18:
    print("Just became adult")
else:
    print("Adult")

# Logical operators: and, or, not
temperature = 30
is_raining = True

if temperature > 25 and not is_raining:
    print("Perfect weather for coding outside!")

# Ternary operator (one-liner)
status = "Adult" if age >= 18 else "Minor"</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🔄 Loops</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code># for loop over a range
for i in range(5):        # 0,1,2,3,4
    print(f"Count: {i}")

# for loop over a list
fruits = ["apple", "banana", "mango"]
for fruit in fruits:
    print(f"I like {fruit}")

# while loop
count = 0
while count < 3:
    print("Looping...")
    count += 1

# break and continue
for num in range(10):
    if num == 3:
        continue    # skip 3
    if num == 7:
        break       # stop at 7
    print(num)

# else with loop (executes if loop finishes normally, not break)
for i in range(3):
    print(i)
else:
    print("Loop completed without break")</code></pre>
        </div>
      </div>

      <div class="bg-green-500/10 p-6 rounded-xl">
        <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
        <p class="text-gray-300">Write a program that asks the user for a number. Use a loop to print all numbers from 1 to that number. If the number is a multiple of 3, print "Fizz" instead; if multiple of 5, print "Buzz"; if multiple of both, print "FizzBuzz". Handle invalid input (non‑numeric).</p>
      </div>
    </div>`,
    [
      { question: 'What is the output of `if 5 > 3: print("A") else: print("B")`?', options: ['A', 'B', 'Error', 'Nothing'], correct: 0 },
      { question: 'What does the `elif` stand for?', options: ['Else if', 'Else in if', 'Else loop', 'Else if loop'], correct: 0 },
      { question: 'Which loop is best for iterating a known number of times?', options: ['while', 'for', 'do-while', 'foreach'], correct: 1 },
      { question: 'What does `range(2, 10, 2)` produce?', options: ['2,4,6,8', '2,3,4,5,6,7,8,9', '2,4,6,8,10', 'Error'], correct: 0 },
      { question: 'What does `break` do inside a loop?', options: ['Skips the current iteration', 'Exits the loop entirely', 'Pauses the loop', 'Restarts the loop'], correct: 1 },
      { question: 'Which logical operator returns True only if both conditions are true?', options: ['or', 'not', 'and', 'xor'], correct: 2 },
      { question: 'What is the output of `for i in range(1,4): print(i, end=" ")`', options: ['1 2 3', '1 2 3 4', '0 1 2 3', '1 2 3 4 5'], correct: 0 },
      { question: 'What is the `else` clause in a loop used for?', options: ['Runs if the loop condition is false initially', 'Runs after a `break`', 'Runs after the loop finishes normally (without break)', 'Runs only if an error occurs'], correct: 2 }
    ],
    50,
    'https://www.youtube.com/embed/D0Z7wJ9Hl2o'  // Corey Schafer: If Statements & Loops
  ),

  lesson(
    '3. Functions & Scope',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-blue-500/10 to-green-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-blue-400 mb-2">📖 What You Will Learn</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li>Defining and calling functions</li>
          <li>Parameters, arguments, return values</li>
          <li>Default, keyword, and variable-length arguments (*args, **kwargs)</li>
          <li>Scope: global vs local variables</li>
          <li>Lambda functions (anonymous functions)</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">📦 Functions</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code># Basic function
def greet(name):
    return f"Hello, {name}!"

print(greet("Kwame"))  # Hello, Kwame!

# Default parameter
def power(base, exponent=2):
    return base ** exponent

print(power(5))      # 25
print(power(2, 3))   # 8

# Keyword arguments
def describe_person(name, age, city):
    print(f"{name} is {age} years old from {city}")

describe_person(age=25, city="Accra", name="Ama")

# Variable-length arguments (*args = tuple, **kwargs = dict)
def sum_all(*args):
    return sum(args)

print(sum_all(1,2,3,4))  # 10

def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="John", role="rider", zone="East")

# Lambda (anonymous function)
square = lambda x: x ** 2
print(square(5))  # 25</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🔒 Scope</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>global_var = "global"

def my_function():
    local_var = "local"
    print(global_var)  # accessible
    # print(local_var)  # works inside

my_function()
# print(local_var)  # NameError (outside scope)

# Using global keyword to modify global variable
counter = 0
def increment():
    global counter
    counter += 1

increment()
print(counter)  # 1</code></pre>
        </div>
      </div>

      <div class="bg-green-500/10 p-6 rounded-xl">
        <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
        <p class="text-gray-300">Create a function calculate_tip(bill, percentage=15) that returns the tip amount. Then write a lambda function to calculate the total bill (bill + tip). Test with different arguments (positional, keyword, default).</p>
      </div>
    </div>`,
    [
      { question: 'What keyword is used to define a function in Python?', options: ['func', 'define', 'def', 'function'], correct: 2 },
      { question: 'What is the output of `lambda x: x*2` when called with 3?', options: ['6', '9', '3', 'Error'], correct: 0 },
      { question: 'How do you make a parameter optional in a function?', options: ['By setting a default value', 'By using *args', 'By using optional keyword', 'You cannot'], correct: 0 },
      { question: 'What does `*args` do in a function definition?', options: ['Accepts any number of keyword arguments', 'Accepts any number of positional arguments as a tuple', 'Accepts a single argument', 'Creates a list argument'], correct: 1 },
      { question: 'What is the scope of a variable defined inside a function?', options: ['Global', 'Local to the function', 'Module scope', 'Class scope'], correct: 1 },
      { question: 'How do you modify a global variable inside a function?', options: ['Use the `global` keyword', 'Use the `nonlocal` keyword', 'Directly reassign it', 'You cannot'], correct: 0 },
      { question: 'What does `return` do?', options: ['Exits the function and optionally returns a value', 'Prints a value', 'Stops the entire program', 'Throws an error'], correct: 0 },
      { question: 'What is the result of `def add(a,b): return a+b` then `add(b=5, a=3)`?', options: ['8', 'Error', '5', '3'], correct: 0 }
    ],
    50,
    'https://www.youtube.com/embed/9Os0o3wzS_I'  // Corey Schafer: Functions
  ),

  lesson(
    '4. Data Structures: Lists, Tuples, Dictionaries & Sets',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-blue-500/10 to-green-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-blue-400 mb-2">📖 What You Will Learn</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li>Lists: mutable, ordered, indexing, slicing, methods</li>
          <li>Tuples: immutable, ordered, unpacking</li>
          <li>Dictionaries: key-value pairs, methods, iteration</li>
          <li>Sets: unique, unordered, set operations</li>
          <li>List comprehensions and dictionary comprehensions</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">📋 Lists</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>fruits = ["apple", "banana", "cherry"]
fruits.append("orange")        # add to end
fruits.insert(1, "blueberry")  # insert at index
fruits.remove("banana")        # remove by value
popped = fruits.pop()          # remove and return last

# Slicing
print(fruits[1:3])   # from index 1 to 2
print(fruits[:2])    # first two
print(fruits[::-1])  # reverse

# List comprehension
squares = [x**2 for x in range(10)]  # [0,1,4,9,...]
even_squares = [x**2 for x in range(10) if x % 2 == 0]</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">📚 Tuples & Dictionaries</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code># Tuple (immutable)
coordinates = (10.5, 20.3)
x, y = coordinates  # unpacking
print(f"X: {x}, Y: {y}")

# Dictionary
user = {
    "name": "Kwame",
    "age": 24,
    "skills": ["Python", "JavaScript"]
}
user["email"] = "kwame@example.com"  # add
user["age"] = 25                     # update
print(user.get("country", "GH"))     # default if missing

# Dictionary comprehension
squares_dict = {x: x**2 for x in range(5)}  # {0:0, 1:1, 2:4, 3:9, 4:16}</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🔢 Sets</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>unique_nums = {1, 2, 3, 3, 4}  # {1,2,3,4}
unique_nums.add(5)
unique_nums.remove(2)
# Set operations
a = {1,2,3}
b = {3,4,5}
print(a | b)  # union: {1,2,3,4,5}
print(a & b)  # intersection: {3}
print(a - b)  # difference: {1,2}</code></pre>
        </div>
      </div>

      <div class="bg-green-500/10 p-6 rounded-xl">
        <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
        <p class="text-gray-300">Given a list of numbers, write a function that returns a dictionary with keys "even" and "odd", each mapping to a list of those numbers. Use list comprehensions. Also, given two lists, return their common elements as a set.</p>
      </div>
    </div>`,
    [
      { question: 'Which data structure is mutable and ordered?', options: ['Tuple', 'List', 'Set', 'Dictionary'], correct: 1 },
      { question: 'What is the output of `[1,2,3][:2]`?', options: ['[1,2]', '[1,2,3]', '[2,3]', 'Error'], correct: 0 },
      { question: 'How do you add an element to a set?', options: ['append()', 'add()', 'insert()', 'push()'], correct: 1 },
      { question: 'Which of the following creates a dictionary?', options: ['{}', '[]', '()', '<>'], correct: 0 },
      { question: 'What is the result of `{1,2,3} | {3,4,5}`?', options: ['{3}', '{1,2,3,4,5}', '{1,2,4,5}', 'Error'], correct: 1 },
      { question: 'What does `list(range(5))` produce?', options: ['[0,1,2,3,4]', '[1,2,3,4,5]', '[0,1,2,3,4,5]', 'Error'], correct: 0 },
      { question: 'Which method removes the last element from a list and returns it?', options: ['pop()', 'remove()', 'delete()', 'discard()'], correct: 0 },
      { question: 'What is the main difference between a list and a tuple?', options: ['Lists are faster', 'Tuples are mutable', 'Tuples are immutable', 'No difference'], correct: 2 }
    ],
    50,
    'https://www.youtube.com/embed/W8KRzmHIU4s'  // freeCodeCamp: Lists, Tuples, Dictionaries
  ),

  lesson(
    '5. File I/O & Exception Handling',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-blue-500/10 to-green-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-blue-400 mb-2">📖 What You Will Learn</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li>Reading and writing text files</li>
          <li>Using with statement (context managers)</li>
          <li>Handling exceptions with try/except/else/finally</li>
          <li>Raising custom exceptions</li>
          <li>Working with JSON files</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">📄 File I/O</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code># Write to a file
with open("output.txt", "w") as f:
    f.write("Hello, Python!\n")
    f.write("Second line")

# Read from a file
with open("output.txt", "r") as f:
    content = f.read()
    print(content)

# Read line by line
with open("data.txt") as f:
    for line in f:
        print(line.strip())

# Append to file
with open("log.txt", "a") as f:
    f.write("New entry\n")

# JSON handling
import json
data = {"name": "Kwame", "age": 24}
with open("user.json", "w") as f:
    json.dump(data, f)

with open("user.json") as f:
    loaded = json.load(f)
    print(loaded["name"])</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">⚠️ Exception Handling</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>try:
    num = int(input("Enter a number: "))
    result = 10 / num
except ValueError:
    print("That's not a valid number!")
except ZeroDivisionError:
    print("Cannot divide by zero!")
else:
    print(f"Result: {result}")  # runs if no exception
finally:
    print("Cleanup actions here")

# Raising exceptions
def withdraw(balance, amount):
    if amount > balance:
        raise ValueError("Insufficient funds")
    return balance - amount</code></pre>
        </div>
      </div>

      <div class="bg-green-500/10 p-6 rounded-xl">
        <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
        <p class="text-gray-300">Write a program that reads a list of numbers from a file (one per line), calculates their sum and average. Handle cases where the file doesn't exist or contains invalid data (non‑numeric). Write the results to a new file "summary.txt". Use try/except/finally.</p>
      </div>
    </div>`,
    [
      { question: 'Which mode opens a file for writing (overwrites)?', options: ['r', 'w', 'a', 'x'], correct: 1 },
      { question: 'What does the `with` statement do?', options: ['Defines a block', 'Automatically closes the file after the block', 'Creates a new file', 'Reads the file'], correct: 1 },
      { question: 'What exception is raised when a file is not found?', options: ['FileNotFoundError', 'IOError', 'OSError', 'ValueError'], correct: 0 },
      { question: 'How do you convert a string to JSON?', options: ['json.dumps()', 'json.loads()', 'json.stringify()', 'json.parse()'], correct: 0 },
      { question: 'What does the `else` clause in a try/except block do?', options: ['Runs if an exception occurs', 'Runs if no exception occurs', 'Always runs', 'Runs only if there is a finally'], correct: 1 },
      { question: 'Which method reads the entire file content as a string?', options: ['read()', 'readline()', 'readlines()', 'readall()'], correct: 0 },
      { question: 'What is the correct way to raise an error?', options: ['raise Error("message")', 'throw Error("message")', 'raise Exception("message")', 'Both A and C'], correct: 3 },
      { question: 'What does `json.load(f)` do?', options: ['Writes Python object to file as JSON', 'Reads JSON from file and returns Python object', 'Converts string to JSON', 'Converts JSON to string'], correct: 1 }
    ],
    50,
    'https://www.youtube.com/embed/Uh2ebFW8OYM'  // Corey Schafer: Exceptions & File I/O
  ),

  lesson(
    '6. Modules & Packages',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-blue-500/10 to-green-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-blue-400 mb-2">📖 What You Will Learn</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li>Creating and importing modules</li>
          <li>The import statement variations</li>
          <li>Using __name__ == "__main__"</li>
          <li>Installing third-party packages with pip</li>
          <li>Creating your own packages</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">📦 Modules</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code># mymodule.py
def greet(name):
    return f"Hello {name}!"

PI = 3.14159

if __name__ == "__main__":
    # This runs only when this file is executed directly
    print(greet("World"))

# main.py
import mymodule
print(mymodule.greet("Alice"))  # Hello Alice!
print(mymodule.PI)

# Alternative imports
from mymodule import greet, PI
from mymodule import *  # not recommended
import mymodule as mm  # alias

# Install third-party packages
# pip install requests pandas

import requests
response = requests.get("https://api.github.com")
print(response.status_code)</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">📁 Packages</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code># Directory structure:
# mypackage/
#   __init__.py
#   module1.py
#   module2.py

# __init__.py can be empty or contain package initialization
# Importing:
from mypackage import module1
from mypackage.module2 import function_name</code></pre>
        </div>
      </div>

      <div class="bg-green-500/10 p-6 rounded-xl">
        <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
        <p class="text-gray-300">Create a module math_utils.py with functions add, subtract, multiply, divide. Write a main.py that imports these functions and demonstrates them. Use if __name__ == "__main__" in the module to test it when run directly. Install the requests library and fetch data from a public API (e.g., JSONPlaceholder).</p>
      </div>
    </div>`,
    [
      { question: 'How do you import a module named `mymodule`?', options: ['import mymodule', 'from mymodule', 'include mymodule', 'require mymodule'], correct: 0 },
      { question: 'What is the purpose of `if __name__ == "__main__"`?', options: ['To check if the script is run directly, not imported', 'To define the main function', 'To set the module name', 'To import main'], correct: 0 },
      { question: 'What command installs a package using pip?', options: ['pip install package', 'python install package', 'install package', 'pip get package'], correct: 0 },
      { question: 'What does `import math as m` do?', options: ['Imports math with alias m', 'Imports only the math function', 'Imports math into a variable', 'Error'], correct: 0 },
      { question: 'Which of the following imports only the `sqrt` function from `math`?', options: ['import math.sqrt', 'from math import sqrt', 'import sqrt from math', 'math.sqrt import'], correct: 1 },
      { question: 'What is a Python package?', options: ['A single Python file', 'A directory containing an __init__.py file and modules', 'A ZIP archive', 'A built-in library'], correct: 1 },
      { question: 'What does `pip freeze` do?', options: ['Lists installed packages', 'Installs frozen packages', 'Freezes the environment', 'Uninstalls packages'], correct: 0 },
      { question: 'What is the output of `print(__name__)` in a script run directly?', options: ['__main__', 'script name', '__module__', 'main'], correct: 0 }
    ],
    50,
    'https://www.youtube.com/embed/CqvZ3vGoGs0'  // Corey Schafer: Modules and Packages
  ),

  lesson(
    '7. Object-Oriented Programming (OOP)',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-blue-500/10 to-green-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-blue-400 mb-2">📖 What You Will Learn</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li>Classes and objects</li>
          <li>Constructor (__init__), instance methods, attributes</li>
          <li>Encapsulation, inheritance, polymorphism</li>
          <li>Class vs static methods</li>
          <li>Magic methods (__str__, __repr__, etc.)</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🏛️ Classes</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>class Rider:
    # Class attribute (shared across all instances)
    company = "WasteGo"
    
    def __init__(self, name, vehicle):
        # Instance attributes
        self.name = name
        self.vehicle = vehicle
        self._rating = 5.0  # protected by convention
        self.__id = None    # name mangling (private)
    
    def pickups(self):
        return f"{self.name} is doing a pickup with {self.vehicle}"
    
    def _internal_method(self):  # protected
        pass
    
    @property
    def rating(self):
        return self._rating
    
    @rating.setter
    def rating(self, value):
        if 0 <= value <= 5:
            self._rating = value
    
    @classmethod
    def from_string(cls, data_str):
        name, vehicle = data_str.split(",")
        return cls(name, vehicle)
    
    @staticmethod
    def validate_vehicle(vehicle):
        return vehicle in ["tricycle", "bike", "truck"]

# Inheritance
class Manager(Rider):
    def __init__(self, name, vehicle, team_size):
        super().__init__(name, vehicle)
        self.team_size = team_size
    
    def pickups(self):  # override
        return f"{self.name} manages {self.team_size} riders"

# Usage
rider1 = Rider("Kwame", "tricycle")
print(rider1.pickups())  # Kwame is doing a pickup with tricycle

manager = Manager("Ama", "car", 5)
print(manager.pickups())  # Ama manages 5 riders

# Magic method
class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author
    def __str__(self):
        return f"{self.title} by {self.author}"
    def __repr__(self):
        return f"Book('{self.title}', '{self.author}')"
    def __eq__(self, other):
        return self.title == other.title and self.author == other.author</code></pre>
        </div>
      </div>

      <div class="bg-green-500/10 p-6 rounded-xl">
        <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
        <p class="text-gray-300">Create a BankAccount class with attributes owner, balance, and methods deposit, withdraw (with insufficient funds check), and __str__. Use properties to make balance read‑only. Then create a SavingsAccount subclass that adds an interest rate and an apply_interest method.</p>
      </div>
    </div>`,
    [
      { question: 'What is the constructor method in a Python class?', options: ['__init__', '__construct__', '__new__', 'init'], correct: 0 },
      { question: 'What does `self` represent?', options: ['The class itself', 'The current instance of the class', 'A global variable', 'A static reference'], correct: 1 },
      { question: 'How do you create a subclass?', options: ['class Child(Parent):', 'class Child extends Parent:', 'class Child inherits Parent:', 'Parent.Child = class'], correct: 0 },
      { question: 'What is method overriding?', options: ['Calling a method from parent', 'Defining a method in child with same name as parent', 'Using super()', 'Both A and C'], correct: 1 },
      { question: 'What does `@staticmethod` do?', options: ['Makes a method belong to the class, no self/cls', 'Makes a method a class method', 'Makes a method private', 'Makes a method abstract'], correct: 0 },
      { question: 'What is the purpose of `__str__`?', options: ['String representation for debugging', 'String representation for end users (print)', 'Constructor string', 'Property string'], correct: 1 },
      { question: 'How do you enforce encapsulation?', options: ['Use double underscore prefix (__var)', 'Use single underscore prefix (_var)', 'Use private keyword', 'Use class private'], correct: 0 },
      { question: 'What does `super().__init__()` do?', options: ['Calls the parent class constructor', 'Calls the child class constructor', 'Calls the superclass method', 'Initializes the super() object'], correct: 0 }
    ],
    50,
    'https://www.youtube.com/embed/ZDa-Z5Jz7Mk'  // Corey Schafer: OOP Part 1
  ),

  lesson(
    '8. Working with APIs & Web Scraping',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-blue-500/10 to-green-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-blue-400 mb-2">📖 What You Will Learn</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li>Making HTTP requests with requests</li>
          <li>Parsing JSON responses</li>
          <li>Authentication and headers</li>
          <li>Web scraping with BeautifulSoup</li>
          <li>Ethical scraping and rate limiting</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">📡 API Calls</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>import requests

# GET request
response = requests.get("https://jsonplaceholder.typicode.com/posts/1")
if response.status_code == 200:
    post = response.json()
    print(post["title"])

# Query parameters
params = {"userId": 1}
response = requests.get("https://jsonplaceholder.typicode.com/posts", params=params)

# POST with JSON
new_post = {"title": "foo", "body": "bar", "userId": 1}
response = requests.post("https://jsonplaceholder.typicode.com/posts", json=new_post)

# Headers (e.g., API keys)
headers = {"Authorization": "Bearer YOUR_TOKEN"}
response = requests.get("https://api.example.com/data", headers=headers)

# Error handling
try:
    response = requests.get("https://api.github.com", timeout=5)
    response.raise_for_status()  # raises HTTPError for 4xx/5xx
except requests.exceptions.RequestException as e:
    print(f"Request failed: {e}")</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🕸️ Web Scraping (BeautifulSoup)</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>from bs4 import BeautifulSoup
import requests

url = "https://example.com"
response = requests.get(url)
soup = BeautifulSoup(response.text, "html.parser")

# Find all headings
headings = soup.find_all("h2")
for h in headings:
    print(h.text)

# Find element by class
items = soup.find_all("div", class_="item-class")

# Find by id
main_content = soup.find(id="main")

# Extract links
links = soup.find_all("a")
for link in links:
    print(link.get("href"))</code></pre>
        </div>
        <div class="bg-red-500/10 p-4 rounded-lg mt-3">
          <p class="text-red-300">⚠️ Always check robots.txt and respect rate limits. Scraping can be illegal for some sites.</p>
        </div>
      </div>

      <div class="bg-green-500/10 p-6 rounded-xl">
        <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
        <p class="text-gray-300">Write a program that fetches the top posts from a public API (e.g., Reddit or JSONPlaceholder). Parse the JSON and print the titles and IDs. Then attempt to scrape a news website (e.g., BBC or local news) to extract all article headlines. Respect robots.txt and add a delay between requests.</p>
      </div>
    </div>`,
      [
      { question: 'Which library is commonly used for HTTP requests in Python?', options: ['urllib', 'requests', 'http.client', 'socket'], correct: 1 },
      { question: 'How do you parse JSON from an API response?', options: ['response.json()', 'json.parse(response)', 'response.to_json()', 'json.loads(response)'], correct: 0 },
      { question: 'What status code indicates a successful GET request?', options: ['200', '404', '500', '301'], correct: 0 },
      { question: 'What does `response.raise_for_status()` do?', options: ['Raises an exception for 4xx/5xx errors', 'Raises an exception for all responses', 'Returns the status code', 'Raises an exception if response is None'], correct: 0 },
      { question: 'Which library is commonly used for HTML parsing and web scraping?', options: ['Scrapy', 'BeautifulSoup', 'lxml', 'All of the above'], correct: 3 },
      { question: 'What should you check before scraping a website?', options: ['Sitemap', 'robots.txt', 'Terms of Service', 'Both B and C'], correct: 3 },
      { question: 'What does `headers` parameter in `requests.get()` do?', options: ['Sets request headers', 'Sets response headers', 'Sets cookies', 'Sets authentication'], correct: 0 },
      { question: 'How do you add a query parameter to a GET request?', options: ['Append to URL', 'Use `params` argument', 'Use `data` argument', 'Both A and B'], correct: 3 }
    ],
    50,
    'https://www.youtube.com/embed/tb8gHvYlCFs'  // freeCodeCamp: API & Web Scraping
  ),

  lesson(
    '9. Data Analysis with Pandas & NumPy',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-blue-500/10 to-green-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-blue-400 mb-2">📖 What You Will Learn</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-1">
          <li>NumPy arrays and vectorized operations</li>
          <li>Pandas Series and DataFrames</li>
          <li>Reading/writing CSV files</li>
          <li>Data cleaning and filtering</li>
          <li>Basic plotting with Matplotlib</li>
        </ul>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">📊 NumPy & Pandas Basics</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>import numpy as np
import pandas as pd

# NumPy array
arr = np.array([1,2,3,4,5])
print(arr.mean())  # 3.0
print(arr * 2)      # [2,4,6,8,10]

# Pandas Series
s = pd.Series([10,20,30], index=['a','b','c'])
print(s['b'])  # 20

# DataFrame
data = {
    'Name': ['Kwame', 'Ama', 'Kofi'],
    'Age': [24, 22, 28],
    'City': ['Accra', 'Kumasi', 'Tema']
}
df = pd.DataFrame(data)
print(df.head())

# Read CSV
df = pd.read_csv('data.csv')
# Write CSV
df.to_csv('output.csv', index=False)

# Filtering
adults = df[df['Age'] >= 18]
# Group by
grouped = df.groupby('City').mean()</code></pre>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">📈 Basic Plotting</h2>
        <div class="bg-black/60 rounded-xl p-5 overflow-x-auto">
          <pre class="text-green-400 text-sm leading-relaxed"><code>import matplotlib.pyplot as plt

# Simple line plot
x = [1,2,3,4]
y = [10,20,25,30]
plt.plot(x, y)
plt.title("Sample Plot")
plt.xlabel("X")
plt.ylabel("Y")
plt.show()

# Bar chart
df['Age'].plot(kind='bar')
plt.show()</code></pre>
        </div>
      </div>

      <div class="bg-green-500/10 p-6 rounded-xl">
        <h2 class="text-xl font-bold text-green-400 mb-2">✅ Practice Task</h2>
        <p class="text-gray-300">Download a CSV dataset (e.g., from Kaggle or use mock data). Load it into a DataFrame. Clean it: remove rows with missing values, convert columns to correct types, filter rows based on a condition, and create a new column. Then generate a summary statistics table and a bar chart for a categorical column.</p>
      </div>
    </div>`,
    [
      { question: 'What is the primary data structure in Pandas?', options: ['Series and DataFrame', 'Array', 'List', 'Dictionary'], correct: 0 },
      { question: 'How do you read a CSV file into a DataFrame?', options: ['pd.read_csv()', 'pd.load_csv()', 'pd.import_csv()', 'pd.csv_read()'], correct: 0 },
      { question: 'Which NumPy function creates an array of zeros?', options: ['np.zeros()', 'np.empty()', 'np.ones()', 'np.arange()'], correct: 0 },
      { question: 'What does `df.head()` display?', options: ['First 5 rows', 'Last 5 rows', 'Random 5 rows', 'First 10 rows'], correct: 0 },
      { question: 'How do you filter rows where Age > 30?', options: ['df[df.Age > 30]', 'df.filter(Age > 30)', 'df.query("Age>30")', 'Both A and C'], correct: 3 },
      { question: 'What is the purpose of `df.groupby()`?', options: ['Groups rows by a column and allows aggregation', 'Sorts the DataFrame', 'Removes duplicates', 'Merges two DataFrames'], correct: 0 },
      { question: 'Which library is commonly used for plotting with Pandas?', options: ['Matplotlib', 'Seaborn', 'Plotly', 'All of the above'], correct: 3 },
      { question: 'What does `df.isnull().sum()` return?', options: ['Total missing values per column', 'Total non-null values', 'Boolean mask', 'Number of rows'], correct: 0 }
    ],
    50,
    'https://www.youtube.com/embed/vmEHCJofslg'  // freeCodeCamp: Pandas & NumPy
  ),

  lesson(
    '10. Final Python Project: Build a CLI Expense Tracker',
    `<div class="space-y-6">
      <div class="bg-gradient-to-r from-blue-500/10 to-green-500/10 p-6 rounded-xl">
        <h2 class="text-2xl font-bold text-blue-400 mb-2">🏆 Final Project</h2>
        <p class="text-gray-300">You will build a complete command-line expense tracker that uses files, OOP, and error handling – applying everything you've learned.</p>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">📋 Requirements</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-black/60 p-4 rounded-lg">
            <p class="text-orange-400 font-semibold mb-2">Features</p>
            <ul class="text-gray-300 text-sm space-y-1 list-disc list-inside">
              <li>Add expenses (description, amount, category, date)</li>
              <li>List all expenses (formatted table)</li>
              <li>Filter by category or date range</li>
              <li>View summary: total spent per category</li>
              <li>Delete an expense by ID</li>
              <li>Save data to a JSON file (persistent storage)</li>
              <li>Handle invalid input (try/except)</li>
            </ul>
          </div>
          <div class="bg-black/60 p-4 rounded-lg">
            <p class="text-purple-400 font-semibold mb-2">Technical requirements</p>
            <ul class="text-gray-300 text-sm space-y-1 list-disc list-inside">
              <li>Use classes: Expense, ExpenseTracker</li>
              <li>Use functions for menu and file I/O</li>
              <li>Use argparse or interactive menu</li>
              <li>Use datetime for date handling</li>
              <li>Use tabulate or formatted strings for display</li>
              <li>Write unit tests (using unittest or pytest)</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold text-cyan-400 mb-2">🚀 Bonus Features</h2>
        <ul class="list-disc list-inside text-gray-300">
          <li>Export to CSV/Excel</li>
          <li>Generate a simple chart (using matplotlib) showing spending by category</li>
          <li>Set a monthly budget and warn when exceeded</li>
        </ul>
      </div>

      <div class="bg-yellow-500/10 p-4 rounded-lg">
        <p class="text-yellow-300">🎓 <strong>You have mastered Python!</strong> From basics to OOP, file handling, APIs, and data analysis. You are now ready to build real-world applications and continue learning frameworks like Django or Flask.</p>
      </div>
    </div>`,
    [
      { question: 'What is the best way to handle user input in a CLI app?', options: ['input() with validation', 'sys.argv', 'argparse', 'All of the above depending on complexity'], correct: 3 },
      { question: 'How do you store expenses persistently?', options: ['CSV', 'JSON', 'SQLite', 'Any of the above'], correct: 3 },
      { question: 'What module can you use to parse command-line arguments?', options: ['sys', 'argparse', 'getopt', 'All of the above'], correct: 3 },
      { question: 'How do you format a date in Python?', options: ['datetime.strftime()', 'datetime.format()', 'date.format()', 'str(date)'], correct: 0 },
      { question: 'What is the purpose of unit testing?', options: ['To run the app faster', 'To automatically verify that individual parts work correctly', 'To generate documentation', 'To measure code speed'], correct: 1 },
      { question: 'Which library is used for making nice console tables?', options: ['tabulate', 'prettytable', 'Both', 'pandas'], correct: 2 },
      { question: 'What does `__str__` method do in an Expense class?', options: ['Returns a string representation for printing', 'Returns the expense ID', 'Initializes the expense', 'Converts to dictionary'], correct: 0 },
      { question: 'What is the recommended way to manage categories?', options: ['Hardcoded list', 'Enum', 'User-defined set', 'Any of the above'], correct: 2 }
    ],
    100,
    'https://www.youtube.com/embed/8jAykqxIY6k'  // freeCodeCamp: Build a CLI App in Python
  )
];

const pythonCourse = savedCourses.find(c => c.title === 'Python');
for (let i = 0; i < pythonLessons.length; i++) {
  const lessonData = pythonLessons[i];
  const lesson = new Lesson({
    courseId: pythonCourse._id,
    title: lessonData.title,
    content: lessonData.content,
    videoUrl: lessonData.videoUrl,
    quiz: lessonData.quiz,
    xpValue: lessonData.xpValue,
    order: i + 1
  });
  await lesson.save();
  pythonCourse.lessons.push(lesson._id);
}
await pythonCourse.save();
console.log(`✅ Python: added ${pythonLessons.length} lessons`);


} catch(error){
  console.error('Error seeding database:', error);
  process.exit(1);
}

}

seedData();

