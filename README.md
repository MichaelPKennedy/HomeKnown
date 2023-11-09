# HomeKnown

### purpose

In an age where remote work is not just a trend but a lifestyle, the question isn't just about 'where to work', but more importantly, 'where to live'. Enter Home Known, a sophisticated web application tailored to bridge this gap. It features a powerful content-based recommendation system enhanced by machine learning and makes use of publicly available data on topics such as industry, salary, weather, venues and recreational opportunities, demographics, crime rate, and more in order to recommend locations that are right fit for any individual user.

### structure

HomeKnown employs a monorepo structure, encompassing both the React-powered front-end and a Feathers Node.js backend, fully separated. The architecture ensures seamless integration while maintaining clear boundaries for developmental ease.

#### Frontend

Location: HomeKnown/packages/web
Framework: React
Description: The frontend drives the user interface, allowing users to interact with the application, set preferences, and view results.

#### Backend

Location: HomeKnown/packages/api
Framework: Feathers Node.js
Description: The backend manages data processing, recommendation algorithms, and serves requests made by the front-end.

### Getting Started

Step 1: Clone Repo
`git clone https://github.com/MichaelPKennedy/HomeKnown.git`

Step 2: cd into both the frontend and backend base directories and run `npm install` in each

Step 3: Navigate to packages/api/config. Create a new file called default.json. Copy the contents of default-example.json into the new file and fill out the database credentials given to you by an admin.

Step 4: cd into both the frontend and backend base directories and run `npm run dev` in each

The React app will be accessible at http://localhost:3000.
The Feathers backend app will be hosted at http://localhost:3030.
