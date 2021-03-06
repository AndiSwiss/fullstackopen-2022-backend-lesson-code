# fullstackopen-2022-backend-lesson-code

This is a repo for **lesson-code backends** for the Open University Course "Full Stack Open" https://fullstackopen.com/en. It is an addition to my other repos for this course: 
- Main repo: https://github.com/AndiSwiss/fullstackopen-2022
- Backends for the **exercises**: https://github.com/AndiSwiss/fullstackopen-2022-backend

## For local execution
- create a `.env`-file in the root-directory with the following content (change port at will):
```
PORT=3001
LOCAL_HOST_URL=http://localhost
```
Then run `heroku local` or the run-config _heroku-local_.

## Organized in branches / tags / releases
- Release / Tag `part3b-lesson-code`: Lesson-code for part3b => deployed to Heroku:
  - Dashboard: https://dashboard.heroku.com/apps/fullstackopen-part3b-lesson
  - Available at: https://fullstackopen-part3b-lesson.herokuapp.com
  - **NOTE:** Originally, I had this branch on my other git-project on https://github.com/AndiSwiss/fullstackopen-2022-backend in the branch `part3b-lesson-code`, but then I copied all the git-commits manually to this repo to have separate repos.
  - For changes:
    - Do your changes in this backend and/or in the frontend in repo https://github.com/AndiSwiss/fullstackopen-2022 in `part3/lesson-code-frontend`
    - then use the run-config `deploy:full` => this script does a lot:
      - Fetch and build frontend, copy the build, make an automated commit, set the correct heroku git-link, and deploy the app to heroku! 
      - => see scripts-section in package.json for exact commands
  - Start the web-app: `heroku open`
  - Start the app locally: `heroku local`
- Release / Tag `part3c-lesson-code`: Lesson-code for part3c => deployed to Heroku - to the same address and with the same settings as in part3b
