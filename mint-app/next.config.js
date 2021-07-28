module.exports = {
  reactStrictMode: true,
  env: {
    RPC_URL: process.env.RPC_URL,
    CHAIN_ID: process.env.CHAIN_ID,
    INFURA_KEY: process.env.INFURA_KEY,
    STORAGE_API_TOKEN: process.env.STORAGE_API_TOKEN,
  },
};
