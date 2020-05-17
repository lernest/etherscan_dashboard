<template>
  <v-container>
    <v-card outlined class="pa-8 pb-5">
      <!-- Header -->
      <v-card-title class="display-3">About</v-card-title>
      <v-card-text class="body-1">
        The purpose of this page is to test the basic connectivity and
        functionality of
        <a
          style="text-decoration:none"
          class="green--text"
          href="https://web3js.readthedocs.io/en/v1.2.0/"
          target="_blank"
          >Web3.js.
        </a>
      </v-card-text>

      <v-divider class="my-4"></v-divider>

      <!-- Main net -->
      <v-card-title class="headline font-weight-light">Mainnet</v-card-title>
      <v-card-text class="body-1">
        By selecting the 'mainnet' option, we can look up accounts on the main
        ethereum blockchain. Accounts can be found on
        <a
          style="text-decoration:none"
          class="green--text"
          href="https:/etherscan.io/accounts"
          target="_blank"
          >Etherscan</a
        >. We can also use the information on Etherscan to check the validity of
        the information displayed. Exploring the mainnet doesn't require any
        additional set up.
      </v-card-text>

      <!-- Local net -->
      <v-card-title class="headline font-weight-light">Local net</v-card-title>
      <v-card-text class="body-1">
        The local net option allows us to inspect accounts on a locally hosted
        blockchain. It requires a few steps to set up.
        <ol class="mt-2">
          <li>Start a local node on Ganache</li>
          <li>
            In the browser, connect MetaMask to the correct localhost port
          </li>
          <li>Deploy a smart contract onto the local blockchain from Remix.</li>
          <li>Copy an address from Ganache and paste it into Web3 explorer</li>
        </ol>
      </v-card-text>

      <v-divider class="my-4"></v-divider>

      <!-- Web3 API -->
      <v-card-title class="headline font-weight-light">Web3 API</v-card-title>
      <v-card-text class="body-1">
        A handful of Web3 methods are used in this app.
      </v-card-text>

      <v-expansion-panels class="px-12">
        <v-expansion-panel v-for="apiCall in apiCalls" :key="apiCall.method">
          <v-expansion-panel-header class="body-1 font-weight-light">
            {{ apiCall.method }}
          </v-expansion-panel-header>
          <v-expansion-panel-content class="body-1 font-weight-thin">
            {{ apiCall.description }}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-divider class="mt-8 mb-4"></v-divider>

      <!-- Infura -->
      <v-card-title class="headline font-weight-light">Infura</v-card-title>
      <v-card-text class="body-1">
        Infura is a hosted Ethereum node cluster that lets your users run your
        application without requiring them to set up their own Ethereum node or
        wallet. You may not be familiar with Infura by name, but if you've used
        MetaMask then you've used Infura, as it is the Ethereum provider that
        powers MetaMask. Click<a
          style="text-decoration:none"
          class="green--text"
          href="https://www.trufflesuite.com/tutorials/using-infura-custom-provider"
          target="_blank"
        >
          here </a
        >for more info.
      </v-card-text>

      <!-- MetaMask -->
      <v-card-title class="headline font-weight-light">MetaMask</v-card-title>
      <v-card-text class="body-1">
        MetaMask is a bridge that allows you to visit the distributed web of
        tomorrow in your browser today. It allows you to run Ethereum dApps
        right in your browser without running a full Ethereum node. Click<a
          style="text-decoration:none"
          class="green--text"
          href="https://medium.com/@seanschoi/what-is-metamask-really-what-is-it-7bc1bf48c75"
          target="_blank"
        >
          here </a
        >for more info.
      </v-card-text>

      <!-- Ganache -->
      <v-card-title class="headline font-weight-light">Ganache</v-card-title>
      <v-card-text class="body-1">
        Ganache is a personal blockchain for rapid Ethereum and Corda
        distributed application development. You can use Ganache across the
        entire development cycle; enabling you to develop, deploy, and test your
        dApps in a safe and deterministic environment. Click<a
          style="text-decoration:none"
          class="green--text"
          href="https://www.trufflesuite.com/docs/ganache/overview"
          target="_blank"
        >
          here </a
        >for more info.
      </v-card-text>

      <!-- Remix -->
      <v-card-title class="headline font-weight-light">Remix</v-card-title>
      <v-card-text class="body-1">
        Remix is a powerful, open source tool that helps you write Solidity
        contracts straight from the browser. Written in JavaScript, Remix
        supports both usage in the browser and locally. Remix also supports
        testing, debugging and deploying of smart contracts and much more.
        Click<a
          style="text-decoration:none"
          class="green--text"
          href="https://remix-ide.readthedocs.io/en/latest/"
          target="_blank"
        >
          here </a
        >for more info.
      </v-card-text>

      <v-divider class="my-5"></v-divider>

      <v-card-title class="body-1 font-weight-light mt-9 mb-2"
        >Created by Liam Ernest - May 2020</v-card-title
      >
      <v-card-subtitle class="overline">
        <a
          style="text-decoration:none"
          class="green--text"
          href="https://github.com/lernest/etherscan_dashboard"
          target="_blank"
          >GitHub Repo</a
        >
      </v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      apiCalls: [
        {
          method: 'web3.eth.getNodeInfo',
          description: 'Returns the current client version.',
        },
        {
          method: 'web3.eth.getChainId',
          description: 'Returns the current chainId.',
        },
        {
          method: 'web3.eth.getBalance',
          description:
            'Get the balance of an address at a given block.  By default, use the latest block',
        },
        {
          method: 'web3.eth.getGasPrice',
          description:
            'Returns the current gas price oracle. The gas price is determined by the last few blocks median gas price.',
        },
        {
          method: 'web3.eth.getAccounts',
          description: 'Returns a list of accounts the node controls.',
        },
        {
          method: 'web3.eth.getBlockNumber',
          description: 'Returns the current block number.',
        },
        {
          method: 'web3.eth.getTransactionCount',
          description:
            'Get the numbers of transactions sent from this address.',
        },
        {
          method: 'state.web3.eth.getHashrate',
          description:
            'Returns the number of hashes per second that the node is mining with.',
        },
        {
          method: 'state.web3.utils.fromWei',
          description:
            'Converts any wei value to an wther value.  By default, all monetary values are displayed in wei.  Wei is the smallest unit of ether (similar to cents and dollars).  One wei is 0.000000000000000001 ether',
        },
        {
          method: 'state.web3.utils.isAddress',
          description:
            'Checks if a given string is a valid Ethereum address. It will also check the checksum, if the address has upper and lowercase letters.',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
