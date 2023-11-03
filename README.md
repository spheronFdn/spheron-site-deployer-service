## Spheron-Site-Deployer-Service

A service to deploy web applications automatically to decentralized storage using Spheron based on blockchain events.

## Description

The Spheron site deployer service automates the deployment of frontend applications to decentralized storage. It triggers deployments through on-chain events or governance proposals within a DAO for a seamless, decentralized CI/CD pipeline.

### Why did we build this?

We built the Spheron site deployer Service to:

- Deploy frontends based on DAO governance proposals.
- Automatically deploy frontends when blockchain events like reward halving or contract events occur.

## Usage

Follow these steps to set up the Spheron site deployer Service on a local server:

1. Clone the repo: https://github.com/spheronFdn/spheron-site-deployer-service.git
2. Go inside the project directory and install dependencies:
```
cd spheron-site-deployer-service
npm install
```
5. Create a `.env` file based on the `.env-example` file in the repo.

```
# 🔑 Ethereum Private Key for signing transactions and data
PRIVATE_KEY=xxxx

# 📡 Channel Address for listening to notifications
LISTEN_TO_CHANNEL=xxxx

# 🔧 Spheron Access Token for authentication and access to Spheron services
SPHERON_ACESS_TOKEN=xxxx

# 🌐 GitHub URL for the project repository
PROJECT_GITHUB_URL=xxxx

# 📛 Name of the project
PROJECT_NAME=Spheron-Site-Deployer

# 🌐 Custom Environment Variables for the Web Application
ENV_VAR1=xxxx
ENV_VAR2=xxxx
ENV_VAR3=xxxx

```
5. Learn how to create an access token [here.](https://docs.spheron.network/rest-api/#creating-an-access-token)
6. Create a Spheron account [here](https://app.spheron.network/#/login).
7. Learn about deployments from the [Spheron site SDK docs](https://docs.spheron.network/sdk/site/).
8. Add domain configurations post-deployment, or automate it using the SDK. Reference: [Spheron domain documentation](https://docs.spheron.network/static/projects/domain/).
9. Start the server:
```
node main.js
```

Yayyy! 🚀
You're now running a local server that listens for Push protocol notifications to trigger web app deployments on decentralized storage via Spheron.

### Why you need to run a local server here?

Running a local server for the Spheron site deployer service is crucial for two primary reasons:

1. **Security**: Your private key, which grants full control over your blockchain assets, remains confidential and secure on your local machine. Cloud servers pose risks of unauthorized access, breaches, and often insufficient encryption, compromising your key's security.

2. **Decentralization**: In line with Web3 ethos, maintaining your keys locally promotes a decentralized architecture, avoiding reliance on centralized cloud services. This enhances trustlessness and resilience in your operational model.

### How it works?

The service leverages local environmental configurations to initialize blockchain interaction tools securely. It uses PushAPI to listen for specific on-chain events and triggers a Spheron-based deployment of your web applications to IPFS when those events occur. The deployment leverages only relevant environmental variables, ensuring efficient and secure automation within the local infrastructure.

## Help

For help, discussions or any other queries: [Join our Community](https://community.spheron.network/)

## Version History

- 0.1
  - Initial Release

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Spheron Site SDK Guide](https://docs.spheron.network/sdk/site/)
- [PUSH Docs for receivinf notifications](https://push.org/docs/notifications/build/stream-notifications/)
