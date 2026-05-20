# project-alpha

# Eureka!

## Overview
**Eureka!** is an educational web application created by **Knowledge Guys** to improve student engagement in non-STEM subjects through interactive quiz-based learning.

The project was developed in response to a brief focused on the declining interest in non-STEM subjects across secondary schools. Our solution aims to make learning more enjoyable, accessible and motivating by combining subject-based quiz gameplay with progress tracking, XP and a competitive leaderboard.

Eureka is designed to support students in revisiting content in a fun and low-pressure way, while also giving teachers a clearer view of student performance.


## Problem Statement
The management team of the Hive group of secondary schools identified a drop in engagement in non-STEM subjects over the last two years. They wanted a solution that would place student enjoyment at the heart of the learning experience while still supporting curriculum-aligned learning.

Students reported that some subjects felt repetitive, content-heavy and difficult to retain. Teachers highlighted that students often disengage when learning relies too heavily on textbook work or repeated classroom activities. Parents expressed concerns about low enjoyment and lack of motivation, while stakeholders also wanted a solution that could be used easily on school devices such as tablets.

Eureka! was created to respond to these challenges by offering an interactive and 


## Installation & Usage
### Installation
- Clone the repo

### Usage
- Open the terminal
- Navigate to the `server` folder
- Create a `.env` file containing the variables `PORT`, `DB_URL`, `JWT_SECRET`, and `BCRYPT_SALT_ROUNDS`
    - Run on port 3000, or alter frontend API calls to match your chosen port
    - Note - the `DB_URL` will need to connect to a database
- Run `npm install` to install dependencies
- Run `npm run start` to run the server
- In VS Code, right-click on your `index.html` file within `client/signup`
    - You can also deploy the frontend, e.g. using Netlify 


## Process
The frontend for Eureka! was developed through an iterative design and implementation process with a strong focus on usability, accessibility and student engagement.

We began by analysing the project brief and stakeholder needs to understand the main problem the application needed to solve. From this, we identified that the frontend had to feel more engaging and rewarding than traditional classroom quiz tools while still remaining simple and easy to use for students in a school environment.

After the initial planning stage, we produced wireframes to map out the structure and user journey of the application. These early designs helped us define the core pages of the platform including signup, login, homepage, quiz, leaderboard and profile views. The wireframes also guided layout decisions, visual hierarchy and how students would move through the platform from one stage to the next.

Once the user flow had been agreed, the frontend was built page by page using HTML, CSS and JavaScript. We focused on creating a clear and consistent interface across the application so that users could move between screens easily. Styling choices were made to support a game like but still school appropriate feel, using bright visuals, simple navigation and subject based imagery to increase engagement.

Throughout development, the frontend was refined collaboratively alongside backend integration. As more backend functionality became available, pages were updated to fetch and display live data such as quiz questions, leaderboard results and user progress. This meant that some frontend work was completed in stages, beginning with structure and layout, then moving into interactivity, validation and database connected features.

The team used an agile workflow supported by Trello to organise tasks, track progress and divide responsibility across features. This helped us to manage the project efficiently within a one week sprint and allowed frontend work to progress in parallel with backend and database development.

Overall, the frontend process combined planning, wireframing, implementation, testing, debugging and collaborative iteration to create a functional educational interface that supports both learning and engagement.


## Bugs
There are no major unresolved bugs that prevent the frontend from working at MVP level, but there are a few limitations and minor issues:
- ⁠Content on some pages rely on backend/database data, so content may not appear unless the database is populated correctly.
- Certain progress-related displays were adjusted to fit the available stored data during development. 
- Error messages and their handling might be further refined for future versions.



## Style Guide
### Design Principles
- Target Audience - KS3 pupils, especially focusing on Year 7
- Accessibility - Sufficient colour contrast, readable fonts, intuitive UI
- Responsiveness -Optimised for iPads, responds to different screen sizes
- Consistency - Use the same CSS variables across all pages

### Variables
- CSS custom properties (variables) are defined at the beginning of each CSS file, for colour schemes and fonts
- Use these for changing any colours or fonts - do not hardcode
<details>
<summary>Colour Variables</summary>
<br>
    --primary - primary buttons, headings
    <br>
    --secondary - secondary elements
    <br>
    --background - page background
    <br>
    --text - main text colour
    <br>
    --text-light - secondary text colour
    <br>
    --accent - highlights, borders
</details>
<details>
<summary>Font Variables</summary>
<br>
    --font-heading - `Fredoka One`, cursive - headings
    <br>
    --font-body - `Comic Neue`, cursive - body text, paragraphs
    <br>
    --font-button - `Press Start 2P', cursive - buttons, interactive elements
</details>    

### Themes
- This app currently supports **5 themes**, applied via the `data-theme` attribute on the `<html>` tag<details><summary>**themes**</summary><br>`light`(default)<br> `dark` <br> `ocean` <br> `forest` <br> `sunset`</details>
<br>
**Note**: Theme preferences are saved per user

### Animations
The **challenge page** uses animations to keep users engaged:
- Colour changes: Green for correct answers, red for incorrect
- Confetti: Triggered on correct answers
- Button effects: Pulsing, shaking, and scaling on hover / click


## Future Features
Here's what's coming next to **Eureka!**
- **Profile Page** - View XP, streaks, and achievements
- **Practice Mode** - Try questions without saving scores
- **Scores Page** - Review past challenge attempts
- **Customisation** - More themes, avatars, and profile options
- **Teacher Dashboard** - Add questions, track student progress
- **Multiplayer Quizzes** - Compete in real time with classmates
