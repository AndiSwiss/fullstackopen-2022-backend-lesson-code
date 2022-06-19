# fullstackopen-2022-backend-lesson-code

This is a repo for **lesson-code** backends for the Open University Course "Full Stack Open" https://fullstackopen.com/en. It is an addition to my other repos for this course: 
- https://github.com/AndiSwiss/fullstackopen-2022
- https://github.com/AndiSwiss/fullstackopen-2022-backend  (Backends for the exercises)

## Organized in branches
- Branch `part3b-lesson-code`: Lesson-code for part3b => deployed to Heroku:
  - Dashboard: https://dashboard.heroku.com/apps/fullstackopen-part3b-lesson
  - Available at: https://fullstackopen-part3b-lesson.herokuapp.com
  - For changes:
```bash
heroku git:remote -a fullstackopen-part3b-lesson

# create your commits

# Push changes (always to branch 'main'
# => with branch-mapping)
git push heroku part3b-lesson-code:main

# or also just push the current HEAD on whichever branch to main:
git push heroku HEAD:main

# Start the web-app
heroku open
# Start the app locally
heroku local
```
