 # notes-tracker
 All Your Notes In One Place.

 # Deployed to Render
 - FE - https://pranayusg-notes-tracker-app.onrender.com
 - BE - https://pranayusg-notes-tracker.onrender.com/api/

 # Tech Stack
 - Angular 16
 - NestJS
 - Postgres

 # Setup project
 To set up the project view README files in their respective folders.

 # Screens
 - Home
   ![image](https://github.com/pranayusg/notes-tracker/assets/66126225/a48fd982-058a-4d59-b52a-9ed5a5fc50fa)

 - Signup
   ![image](https://github.com/pranayusg/notes-tracker/assets/66126225/decbed4a-cdff-4063-8bbb-2bcd1fef5e5b)

 - Signin
   ![image](https://github.com/pranayusg/notes-tracker/assets/66126225/8ac19164-c40b-4930-95ad-55a916c76486)

 - my-notes
   ![image](https://github.com/pranayusg/notes-tracker/assets/66126225/66087946-953c-4a9e-aa54-2e90b6a57768)

 - 404
   ![image](https://github.com/pranayusg/notes-tracker/assets/66126225/40974a3f-33ff-4499-ad35-bb84b4bb6b4a)


 # Main Functionalities  
 - User JWT authentication.
   Used **PassportJS** along with JWT strategy to generate tokens from BE.
  ![image](https://github.com/pranayusg/notes-tracker/assets/66126225/e98218dc-2825-4033-bc45-4566f7436397)

 - CRUD operations on Notes.
   ![image](https://github.com/pranayusg/notes-tracker/assets/66126225/d3cb9d25-e5c7-4a97-bfd3-361f1935fa0a)
   ![image](https://github.com/pranayusg/notes-tracker/assets/66126225/49a31a1d-24eb-4b2a-9360-5462a9c9bd82)
   ![image](https://github.com/pranayusg/notes-tracker/assets/66126225/6be22a2a-4189-4766-b31d-1dd1a58d0257)

   
 - Signout  

# Additional Features
 - Search through my notes(case insensitive search, ILIKE used in BE).

  ![image](https://github.com/pranayusg/notes-tracker/assets/66126225/d275fcf0-3b55-4f88-bbd9-d117c6c3e923)

 - Share notes with other people.

  ![image](https://github.com/pranayusg/notes-tracker/assets/66126225/44a9ace2-08ac-40ae-830e-401fe037cfdc)

  Sharing data maintained in **sharedNote** table
  ![image](https://github.com/pranayusg/notes-tracker/assets/66126225/860a2aa8-c8c2-40e4-aa36-68f9704ac2a2)


- View notes shared with me.

  ![image](https://github.com/pranayusg/notes-tracker/assets/66126225/865e4ad9-43fb-4ac0-9342-9ce723a6ee6b)


# Angular features used
 - Forms validations (Template driven forms used).
 - Route Guards.
 - Component communication (Child to parent and Parent to child).
 - Hooks
 - Routing
 - Environment setup

# NestJS features used
 - Route validations.
 - Proper error messages (404,500,200)
 - Passport authentication.
 - Helmet for security.
 - Swagger Documentation.
 - TypeORM.
 - Migrations.
 - Environment setup


