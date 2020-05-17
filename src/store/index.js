import Vue from 'vue'
import Vuex from 'vuex'
import Web3 from 'web3'

Vue.use(Vuex)

export default new Vuex.Store({
  // prettier-ignore
  state: {
    web3: null,
    address: '',            // Address of account to inspect
    nodeInfo: '',           // Client version
    chainID: '',            // Chain ID
    balance: '',            // Balance of account in wei
    txnCount: '',           // Number of transactions sent from the account
    gasPrice: '',           // Current gas price
    hashRate: '',           // Current hash rate
    blockNumber: null,      // Current block number
    accounts: [],           // Array of accounts on the node
    isValidAddress: true,   // Address is a valid ethereum address
    isConnected: true,      // Client is connected to the network
  },
  mutations: {
    SET_BALANCE(state, balance) {
      state.balance = balance
    },
    SET_ADDRESS(state, address) {
      state.address = address
    },
    SET_GAS_PRICE(state, gasPrice) {
      state.gasPrice = gasPrice
    },
    SET_ACCOUNTS(state, accounts) {
      state.accounts = accounts
    },
    SET_BLOCK_NUMBER(state, number) {
      state.blockNumber = number
    },
    SET_TXN_COUNT(state, count) {
      state.txnCount = count
    },
    SET_HASH_RATE(state, rate) {
      state.hashRate = rate
    },
  },
  actions: {
    // Connect to the network and get chain info
    initialize({ state, dispatch }, url) {
      // URL is either localhost or infura
      console.log('Initalizing web3: ', url)
      state.web3 = new Web3(url)

      // This will fail if local connection is not configured
      state.web3.eth
        .getNodeInfo()
        .then((info) => {
          console.log('Node info: ', info)
          state.nodeInfo = info
          state.isConnected = true
        })
        .catch((e) => {
          console.log('Unable to connect')
          console.log(e)
          state.isConnected = false
        })

      state.web3.eth
        .getChainId()
        .then((id) => {
          console.log('Chain ID: ', id)
          state.chainID = id
        })
        .catch((e) => {
          console.log(e)
        })

      dispatch('getBlockNumber')
      dispatch('getGasPrice')
    },
    getAccountInfo({ state, dispatch }, address) {
      state.isValidAddress = true // reset to true before each try
      state.isValidAddress = state.web3.utils.isAddress(address)
      console.log('Account is valid? -- ', state.isValidAddress)
      if (!state.isValidAddress) {
        console.log('Address is invalid')
        return
      }
      console.log('Getting account info', address)
      dispatch('getBalance', address)
      dispatch('getAccounts')
      dispatch('getBlockNumber')
      dispatch('getTxnCount')
      dispatch('getHashRate')
    },
    getBalance({ state, commit }, address) {
      commit('SET_ADDRESS', address)
      state.web3.eth
        .getBalance(address)
        .then((bal) => {
          console.log('Balance: ', bal)
          commit('SET_BALANCE', bal)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    getGasPrice({ state, commit }) {
      state.web3.eth
        .getGasPrice()
        .then((price) => {
          console.log('Gas price: ', price)
          commit('SET_GAS_PRICE', price)
        })
        .catch((e) => console.log(e))
    },
    getAccounts({ state, commit }) {
      state.web3.eth
        .getAccounts()
        .then((accts) => {
          console.log('Accounts: ', accts)
          commit('SET_ACCOUNTS', accts)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    getBlockNumber({ state, commit }) {
      state.web3.eth
        .getBlockNumber()
        .then((num) => {
          console.log('Block number: ', num)
          commit('SET_BLOCK_NUMBER', num)
        })
        .catch((e) => console.log(e))
    },
    getTxnCount({ state, commit }) {
      state.web3.eth
        .getTransactionCount(state.address)
        .then((count) => {
          console.log('Txn count: ', count)
          commit('SET_TXN_COUNT', count)
        })
        .catch((e) => console.log(e))
    },
    getHashRate({ state, commit }) {
      state.web3.eth
        .getHashrate()
        .then((rate) => {
          console.log('Hash rate: ', rate)
          commit('SET_HASH_RATE', rate)
        })
        .catch((e) => console.log(e))
    },
  },
  getters: {
    balanceEther: (state) => {
      return state.web3.utils.fromWei(state.balance, 'ether')
    },
  },
  modules: {},
})
