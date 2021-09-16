<!-- PROJECT LOGO -->
<br />
<p align="center">
    <img src="https://hygenie.netlify.app/assets/logo.png" alt="Logo" width="200" >

  <p align="center">
    ·
    <a href="https://e-marat.netlify.app/">Live URL</a>
    ·
    <a href="https://drive.google.com/file/d/12OUZ-CbCPyCLsFsE6NtTT_dQ_WuRAIev/view?usp=sharing">Documentation</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#tools">Tools</a></li>
      </ul>
    </li>
    <li><a href="#contributors">Contributors</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://e-marat.netlify.app/)

Most Resident Welfare Association (RWAs) and cooperative societies rely on physical methods
to solve resident problems and to collect maintenance fees which is quite a tedious task and
lacks clarity and status tracking. With E-Marat, we are providing digital solutions for all the
society issues at one place. This will include payments tracking, complaints resolving, and
public announcements system. We will also provide a Social space platform for residents to
become acquainted with others by posting stories and sharing their thoughts.

Mission:

To empower cooperative society digitally by providing a platform to avail facilities easily and to connect.

Vision:

To make all the members of a society feel like a family and to resolve all the problems at one place.

Goals:

-  Simple solutions for the problems.
- All solutions are in one place.
- Bridge the communication gap within the society.

Features:

- Social Feed with realtime comments.
- Simple and consistent UI.
- Secure app with mobile Otp and JWT Token.
- Multiple Payment Option.
- Infinite scrolling to optimize long lists.

### Built With

- [Typescript](https://www.typescriptlang.org/)
- [React Js](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [Netlify](https://www.netlify.com/)

<!-- GETTING STARTED -->

## Getting Started

Following are the simple steps to run this project.

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

- firebase
  ```sh
  npm install firebase -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/pesto-students/n6-emarat-fe-eta-6.git emarat-fe
   ```
2. Set environment variables
   ```sh
REACT_APP_PROXY=https://e-marat.herokuapp.com
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_DATABASE_URL=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_FIREBASE_MEASUREMENT_ID=
REACT_APP_RAZORPAY_KEY_ID=
REACT_APP_SENTRY_DSN=
COUNTRY_CODE=+91
   ```
3. Install NPM packages
   ```sh
   cd emarat-fe && npm install
   ```
4. Run
   ```sh
   npm start
   ```
5. Open http://localhost:3000 to view it in the browser

6. Run Test cases
   ```sh
   npm test
   ```

<!--Tools-->

## Tools and Libraries 

- [Redux Tool Kit] - State Management
- [Cypress] - End to End testing
- [Jest] - Unit testing
- [React-testing-Library] - Integration testing
- [Recharts] - Charts
- [Eslint] - Linting
- [Prettier] - Automatic code formatting
- [Tailwind] - CSS styling classes
- [Styled Components] Styling

<!-- Contributors -->

## Contributors

Deepak Singh Rawat - [GiHub](https://github.com/dev-deepak-rawat) - dev.deepak.rawat@gmail.com

Haris Rahman - [GiHub](https://github.com/harisrahman) - itsharisrahman@gmail.com

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[product-screenshot]: https://res.cloudinary.com/emarat/image/upload/v1631793441/Emarat_desktop_dashboard_noa78v.png
https://res.cloudinary.com/emarat/image/upload/v1631794366/Emarat_desktop_announcements_gegjlr.png
https://res.cloudinary.com/emarat/image/upload/v1631794353/Emarat_desktop_amenities_idznjf.png
