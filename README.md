<div align ="center">
  
# WORKOUT TRACKER PROJECT
## [PROJECT_LINK](https://roadmap.sh/projects/fitness-workout-tracker) on [ROADMAP.SH](https://roadmap.sh/)
  <img src="https://www.time4nutrition.co.uk/wp-content/uploads/2023/07/shutterstock_2310881869-scaled.jpg" height="250" alt="avatar" />
</div>

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Features

- **authentication:** JWT authentication to ensure many users can interact with it.
- **CRUD:** Implementing simple CRUD operations.
- **Search:** Ability to view and search for exercises and workout plans.
- **Roles:** only admin or moderator can read all profiles.
  
```
Endpoint: http://localhost:5001/auth/signup

Method: POST

Request body: {"username":"123", "email":"123@a.com", "password":"123456"}

//Get Response {token: tokenvalue}


Endpoint: http://localhost:5001/auth/signin

Method: POST

Request body: {"email":"123@a.com", "password":"123456"}

//Get Response {token: tokenvalue}



Below is protected routes, you need to add Bearer Token as Auth when request.



Endpoint: http://localhost:5001/exercise

Method: POST

Request body:{"name":"Running", "description":"running", "category":"cardio"}  or {"name":"Squat", "description":"lift weight", "category":"strength","muscle_group":"legs"}



Endpoint: http://localhost:5001/exercise

Method: GET



Endpoint: http://localhost:5001/exercise/:id

Method: GET



Endpoint: http://localhost:5001/exercise/:id

Method: PUT

Request body:{"name":"Running updated", "description":"running", "category":"cardio"} 



Endpoint: http://localhost:5001/exercise/:id

Method: DELETE



Endpoint: http://localhost:5001/workoutPlan

Method: POST

Request body:{"exercise":["running","press","rope"],"date":"2024-10-09","time":"14:30", "weight":90.0, "reps":20, "sets":5}



Endpoint: http://localhost:5001/workoutPlan

Method: GET



Endpoint: http://localhost:5001/workoutPlan/:id

Method: DELETE



Endpoint: http://localhost:5001/profile

Method: POST

Request body:{"age":23, "weight":75.0, "fitnessGoals":"lean"}


Endpoint: http://localhost:5001/profile:id

Method: DELETE




Endpoint: http://localhost:5001/profile

Method: GET
```
