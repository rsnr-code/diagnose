<br>

<p align="center">
     <img src="public/assets/img/logo.png" width="30%" height="30%">
</p>

<br>

[Diagnose](https://diagnoseapp.herokuapp.com/) is a full-stack application built using Node.js as a backend JavaScript runtime environment, Express.js as a backend framework, MongoDB as a database, and EJS as a template language to generate HTML markup. 

The web application is meant for medical experts to share images of particular cases they would like to initiate discussions on with other medical experts. The website can be described in three simple steps:
  1. Create an account. 
  2. Post an image of your case with detailed description.
  3. Join the discussion by commenting.

Currently, other features in this application include deletion of posts, liking posts, bookmarking posts, and visiting user profiles. 

**Link to project:** https://diagnoseapp.herokuapp.com/

If you just want to try out the app, use these credentials email: demo@demo.com password: demodemo

<p align="center">
     <img src="public/assets/img/screenshot.png">
</p>


## Optimizations

This program works, however in the future it would be great to:

- Add the ability to edit and delete comments.

- Ability to unbookmark a post.

- Being able to post a profile picture and displaying it in your profile page and beside username.

- Ability to post more than one photo of case.

- Ability to share a link to a particular case.

- Personalize userpage more by including work experience and education. 

- Add a search capability to find users, cases, and comments.

- Provide medical students ability to make accounts (for educational purposes) and differentiate their accounts from medical experts.

- Add a "similar cases" section in the posts page.

- Ability to reply to specific comments and creating a thread for it.

## Lessons Learned:

- Learned how the controller communicates with the database by pulling out the information I requested and how to display that information into the ejs template by passing it into the render.

- Learned about the amazing populate() function which replaces the specific path in the documents with documents from other collections.

- Learned about how you can format the display of your dates using moment.

## Install

Install dependencies:

`npm install`


Add an .env file:

- Create a `.env` file in config folder and add the following as `key = value`
  - PORT = 2121 (can be any port example: 3000)
  - DB_STRING = `your database URI`
  - CLOUD_NAME = `your cloudinary cloud name`
  - API_KEY = `your cloudinary api key`
  - API_SECRET = `your cloudinary api secret`


Run:

`npm start`
