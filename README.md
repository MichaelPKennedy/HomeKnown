# HomeKnown
###purpose
In an age where remote work is not just a trend but a lifestyle, the question isn't just about 'where to work', but more importantly, 'where to live'. Enter Home Known, a sophisticated web application tailored to bridge this gap. 

###structure
HomeKnown employs a monorepo structure, encompassing both the React-powered front-end and a Feathers Node.js backend, fully separated. The architecture ensures seamless integration while maintaining clear boundaries for developmental ease.

####Frontend
Location: HomeKnown/packages/web
Framework: React
Description: The frontend drives the user interface, allowing users to interact with the application, set preferences, and view results.

####Backend
Location: HomeKnown/packages/api
Framework: Feathers Node.js
Description: The backend manages data processing, recommendation algorithms, and serves requests made by the front-end.

###Getting Started
Step 1: Clone Repo
`git clone https://github.com/MichaelPKennedy/HomeKnown.git`

Step 2: cd into both the frontend and backend base directories and run `npm install` in each

Step 3: move back into the repo's home directory and run the command `npm run dev`. This deploys a script which will start up the backend development server as well as the client-side development server. By default:

The React app will be accessible at http://localhost:3000.
The Feathers backend app will be hosted at http://localhost:3030.

