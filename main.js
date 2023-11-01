// 📦 Importing required packages and modules
const dotenv = require("dotenv");
// 🚀 Load environment variables from .env file
dotenv.config();

// Ethereum library for interacting with the blockchain
const { ethers } = require("ethers");

// 📡 PushAPI related imports for notifications
const { PushAPI } = require("@pushprotocol/restapi");
const {
  STREAM,
} = require("@pushprotocol/restapi/src/lib/pushstream/pushStreamTypes");



/*
🔧 Spheron related imports for site deployment
refer site-SDK at ( https://docs.spheron.network/sdk/site/ )
*/ 
const {
  SpheronClient,
  ProtocolEnum,
  ProviderEnum,
  FrameworkEnum,
  NodeVersionEnum,
} = require("@spheron/site");


/*
🛠️ Initialization for PushAPI : 
Initializes the Ethereum signer with the private key 
from environment variables for PushAPI authentication
*/ 
const PK = process.env.PRIVATE_KEY;
const Pkey = `0x${PK}`;
const _signer = new ethers.Wallet(Pkey);



/* 🚀 Initialization for Spheron - 
get your access token at ( https://docs.spheron.network/rest-api/#creating-an-access-token )
Sets up the Spheron client with an access token for deploying projects, and configures project 
repository and name.
*/
const token = process.env.SPHERON_ACESS_TOKEN;
// 🤖 Initialize Spheron client with access token
const client = new SpheronClient({ token });
const gitUrl = process.env.PROJECT_GITHUB_URL;
const projectName = process.env.PROJECT_NAME;


/**
 * Filters and extracts environment variables prefixed with "ENV_VAR" from process.env.
 * The resulting envVariables object maps these specific keys to their corresponding values,
 * ready for use in application configuration.
 */
const envVariables = Object.keys(process.env)
  .filter((key) => key.startsWith("ENV_VAR"))
  .reduce((obj, key) => {
    obj[key] = process.env[key];
    return obj;
  }, {});




/**
 * Asynchronously deploys a website to Spheron using the provided configuration.
 * The function constructs a deployment configuration object with repository details,
 * project name, environment variables, and other necessary deployment parameters.
 * It then uses the SpheronClient instance to initiate the deployment process.
 * If the deployment starts successfully, it logs the response to the console.
 * If there is an error during deployment, it catches and logs the error.
 * 
 * This function should be called when a deployment event is triggered,
 * such as when a new commit is made to the main branch of the project repository,
 * or when a specific notification is received from the PushAPI stream.
 */
async function deploySite() {
  // 🚀 Configuration for deploying the site using Sphero
  let deployConfig = {
    gitUrl, // the url of the repository
    projectName, // if the project for the repository does not exists, a new project will be created with this name
    environmentVariables: envVariables,
    provider: ProviderEnum.GITHUB, // the provider of the git url
    branch: "main", // the branch name that should be deployed
    protocol: ProtocolEnum.IPFS, // the protocol on which the deployment should be uploaded
    configuration: {
      framework: FrameworkEnum.REACT,
      workspace: "",
      installCommand: "yarn install",
      buildCommand: "yarn build",
      publishDir: "build",
      nodeVersion: NodeVersionEnum.V_16,
    },
    gitProviderPreferences: {
      prComments: true,
      commitComments: false,
      buildStatus: false,
      githubDeployment: true,
    },
  };

  try {
    const deploymentResponse = await client.deployments.deploy(deployConfig);
    console.log("🚀 Deployment has started\n", deploymentResponse);
  } catch (error) {
    console.log("❌ Deployment failed\n", error);
  }
}



/**
 * Initializes PushAPI with a signer, subscribes to a notification channel,
 * and sets up a listener for new notifications to trigger site deployment.
 */
async function main() {
  // 🚦 Initializing a user for PushAPI
  const userAlice = await PushAPI.initialize(_signer, { env: "staging" });
  console.log("🚶‍♂️ step-1 - user initialized");

  // 📡 Subscribing to a notification channel
  const channelAddress = process.env.LISTEN_TO_CHANNEL;
  const response = await userAlice.notification.subscribe(
    `eip155:5:${channelAddress}`
  );
  console.log("📢 step-2 - Channel Subscribed");

  if (userAlice && userAlice.stream) {
    console.log("🎧 step-3 - Setting up streaming options");

    userAlice.stream.options = {
      listen: [STREAM.NOTIF],
      filter: {
        channels: [process.env.LISTEN_TO_CHANNEL],
      },
      connection: {
        auto: true,
        retries: 3,
      },
      raw: false,
    };

    userAlice.stream.on(STREAM.NOTIF, async (data) => {
      console.log("📩 New Notification:\n", data);
      // Call the deploySite function upon receiving a notification
      await deploySite();
    });
  } else {
    console.error("❌ Failed to initialize user or stream is not available");
  }
  console.log("👂 Listening to notifications");
}



// 🚦 Starting the main process
main();
