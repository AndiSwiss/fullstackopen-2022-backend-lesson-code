# fullstackopen-2022-backend-lesson-code

This is a repo for **lesson-code backends** for the Open University Course "Full Stack Open" https://fullstackopen.com/en. It is an addition to my other repos for this course: 
- Main repo: https://github.com/AndiSwiss/fullstackopen-2022
- Backends for the **exercises**: https://github.com/AndiSwiss/fullstackopen-2022-backend

## Organized in branches
- Branch `part3b-lesson-code`: Lesson-code for part3b => deployed to Heroku:
  - Dashboard: https://dashboard.heroku.com/apps/fullstackopen-part3b-lesson
  - Available at: https://fullstackopen-part3b-lesson.herokuapp.com
  - **NOTE:** Originally, I had this branch on my other git-project on https://github.com/AndiSwiss/fullstackopen-2022-backend in the branch `part3b-lesson-code`, but then I copied all the git-commits manually to this repo to have separate repos.
  - For changes:
    - Do your changes in this backend and/or in the frontend in repo https://github.com/AndiSwiss/fullstackopen-2022 in `part3/lesson-code-frontend`
    - then use the run-config `deploy:full` => this script does a lot:
      - Fetch and build frontend, copy the build, make an automated commit, set the correct heroku git-link, and deploy the app to heroku! 
      - => see scripts-section in package.json for exact commands

```bash
# Start the web-app
heroku open
# Start the app locally
heroku local
```
