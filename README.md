## spheron-site-deployer-service

A service to deploy web applications automatically to decentralized storage using Spheron based on blockchain events.

## Description

The Spheron site deployer service automates the deployment of frontend applications to decentralized storage. It triggers deployments through on-chain events or governance proposals within a DAO for a seamless, decentralized CI/CD pipeline.

### Why did we build this?

We built the Spheron site deployer Service to:

- Deploy frontends based on DAO governance proposals.
- Automatically deploy frontends when blockchain events like reward halving or contract events occur.

## Usage

Follow these steps to set up the Spheron site deployer Service on a local server:

1. Clone the repo: [repository link]
2. `cd [repo name]`
3. `npm install`
4. Create a `.env` file based on the `.env-example` file in the repo.

```
# 🔑 Ethereum Private Key for signing transactions and data
# this is an example private key and wont work
PRIVATE_KEY=6e32d4762c68cd4c565918abe5fb23108fe2a6875f60c97fd954701b5fba8254


# 📡 Channel Address for listening to notifications
LISTEN_TO_CHANNEL=0xFdBA275E47e3B56A5B5b0dC6765CAdB2D178e21e

# 🔧 Spheron Access Token for authentication and access to Spheron services
# this is an example access token and wont work
SPHERON_ACESS_TOKEN=zadsaJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlLZXkiOiI4NjdiYjAxODNhOWViYmFkOGEzMDk3OTAwODkzMzgxMmI4ZjU2NmU0MGM2NmU5NTZmNzMwMjhjYzI0Y2ZiOWEzNTI2ZWRjMmI1ZWZiMTMwMTFlNzUzOWY4YTg5MmM0M2IwNTJhM2QyNGQ1NTI0NWJmYTVkYTg1NDhlMTQ3YjhmNyIsImlhdCI6MTY5ODA3NjkzOCwiaXNzIjoid3d3LnNwaGVyb24ubmV0d29yayJ9.XkAxvG6085PfPtRuhgoukkrB-5TDGVePnedm1oYc1CQ

# 🌐 GitHub URL for the project repository
# this is an example link and wont work
PROJECT_GITHUB_URL=https://github.com/Giri-Spheron/demo-test

# 📛 Name of the project
PROJECT_NAME=Testing-demo

# 🌐 Custom Environment Variables for the Web Application
ENV_VAR1=Hello1
ENV_VAR2=HEllo2
ENV_VAR3=HEELO4

```

5. Create a Spheron account [here](https://app.spheron.network/#/login).
6. Learn about deployments from the [Spheron site SDK docs](https://docs.spheron.network/sdk/site/).
7. Add domain configurations post-deployment, or automate it using the SDK. Reference: [Spheron domain documentation](https://docs.spheron.network/static/projects/domain/).
8. `node main.js`

You're now running a local server that listens for Push protocol notifications to trigger web app deployments on decentralized storage via Spheron.

### Why you need to run a local server here?

Running a local server for the Spheron site deployer service is crucial for two primary reasons:

1. **Security**: Your private key, which grants full control over your blockchain assets, remains confidential and secure on your local machine. Cloud servers pose risks of unauthorized access, breaches, and often insufficient encryption, compromising your key's security.

2. **Decentralization**: In line with Web3 ethos, maintaining your keys locally promotes a decentralized architecture, avoiding reliance on centralized cloud services. This enhances trustlessness and resilience in your operational model.

### How it works

The service leverages local environmental configurations to initialize blockchain interaction tools securely. It uses PushAPI to listen for specific on-chain events and triggers a Spheron-based deployment of your web applications to IPFS when those events occur. The deployment leverages only relevant environmental variables, ensuring efficient and secure automation within the local infrastructure.

## Help

For help, discussions, or other queries
[join our community](https://community.spheron.network/).
[join our discord](https://discord.com/invite/ahxuCtm).

## Version History

- 0.1
  - Initial Release

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Spheron Site SDK Guide](https://docs.spheron.network/sdk/site/)
- [PUSH Docs for receivinf notifications](https://push.org/docs/notifications/build/stream-notifications/)
