import { createPublicClient, http } from 'viem'
import { bscTestnet } from 'viem/chains'
 

// Define the supported chains with their specific configurations

  const bscClient = createPublicClient({
    chain: bscTestnet,
    transport:http(`https://bnb-testnet.g.alchemy.com/v2/7MhrOFJdbrpHzDB8yhYw9mD0zjzGPeux`),
  });


// Create a client map or array for managing multiple chains
const clients = {
    97: bscClient,
  };

  // Example function to retrieve the appropriate client based on chainId
export const getClient = (chainId) => clients[chainId] || null;