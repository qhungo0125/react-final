# react-final

## Development

- install nvm
- `$ nvm use` with version in .nvmrc
- `$ npm i`
- `$ npm run dev`

## Deployment

- We are using free deployment in Vercel that can be visited in [here](http://react-final-jade.vercel.app/)

### Deployment Steps:

- Connect to [this](github.com/qhungo0125/react-final) git repository:
- Log in to your Vercel account.
- Click on the "+ New Project" button.
- Choose your Git provider (GitHub) and connect to the repository.
- Add env variables:

  - VITE_API_URL=`${APIURL}/api` (Ex: `http://localhost:8080/api`)
  - VITE_API_URL_SOCKET=`${APIURL}` (Ex: `http://localhost:8080`)

- Click on the "Deploy" button. Vercel will start building and deploying your React app.
  Access Your Deployment:

Once the deployment is successful, you will receive a unique URL for your React app (e.g., `s`).
