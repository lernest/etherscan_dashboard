import Vue from 'vue'
import Vuex from 'vuex'
import Web3 from 'web3'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    web3: null,
    address: '',
    nodeInfo: '',
    chainID: '',
    balance: '',
    txnCount: '',
    gasPrice: '',
    hashRate: '',
    blockNumber: null,
    accounts: [],
    isValidAddress: true,
    apiCalls: [
      {
        name: 'getNodeInfo',
        method: 'web3.eth.getNodeInfo',
        description: 'Returns the current client version.',
      },
      {
        name: 'getChainId',
        method: 'web3.eth.getChainId',
        description: 'Returns the current chainId.',
      },
      {
        name: 'getBalance',
        method: 'web3.eth.getBalance',
        description:
          'Get the balance of an address at a given block.  By default, use the latest block',
      },
      {
        name: 'getGasPrice',
        method: 'web3.eth.getGasPrice',
        description:
          'Returns the current gas price oracle. The gas price is determined by the last few blocks median gas price.',
      },
      {
        name: 'getAccounts',
        method: 'web3.eth.getAccounts',
        description: 'Returns a list of accounts the node controls.',
      },
      {
        name: 'getBlockNumber',
        method: 'web3.eth.getBlockNumber',
        description: 'Returns the current block number.',
      },
      {
        name: 'getTransactionCount',
        method: 'web3.eth.getTransactionCount',
        description: 'Get the numbers of transactions sent from this address.',
      },
      {
        name: 'getHashrate',
        method: 'state.web3.eth.getHashrate',
        description:
          'Returns the number of hashes per second that the node is mining with.',
      },
      {
        name: 'fromWei',
        method: 'state.web3.utils.fromWei',
        description:
          'Converts any wei value to an wther value.  By default, all monetary values are displayed in wei.  Wei is the smallest unit of ether (similar to cents and dollars).  One wei is 0.000000000000000001 ether',
      },
      {
        name: 'isAddress',
        method: 'state.web3.utils.isAddress',
        description:
          'Checks if a given string is a valid Ethereum address. It will also check the checksum, if the address has upper and lowercase letters.',
      },
    ],
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
    initialize({ state, dispatch }, url) {
      // URL is either localhost or infura
      console.log('Initalizing web3...')
      state.web3 = new Web3(url)

      console.log('Getting node info...')
      state.web3.eth
        .getNodeInfo()
        .then((info) => {
          console.log(info)
          state.nodeInfo = info
        })
        .catch((e) => {
          console.log(e)
        })

      console.log('Getting chain id...')
      state.web3.eth
        .getChainId()
        .then((id) => {
          console.log(id)
          state.chainID = id
        })
        .catch((e) => {
          console.log(e)
        })

      dispatch('getBlockNumber')
      dispatch('getGasPrice')
    },
    getAccountInfo({ state, dispatch }, address) {
      state.isValidAddress = true
      console.log('Checking if account is valid...')
      state.isValidAddress = state.web3.utils.isAddress(address)
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
      console.log('Getting balance of ', address)
      commit('SET_ADDRESS', address)
      state.web3.eth
        .getBalance(address)
        .then((bal) => {
          console.log(bal)
          commit('SET_BALANCE', bal)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    getGasPrice({ state, commit }) {
      console.log('Getting gas price...')
      state.web3.eth
        .getGasPrice()
        .then((price) => {
          console.log(price)
          commit('SET_GAS_PRICE', price)
        })
        .catch((e) => console.log(e))
    },
    getAccounts({ state, commit }) {
      console.log('Getting accounts...')
      state.web3.eth
        .getAccounts()
        .then((accts) => {
          console.log(accts)
          commit('SET_ACCOUNTS', accts)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    getBlockNumber({ state, commit }) {
      console.log('Getting block number...')
      state.web3.eth
        .getBlockNumber()
        .then((num) => {
          console.log(num)
          commit('SET_BLOCK_NUMBER', num)
        })
        .catch((e) => console.log(e))
    },
    getTxnCount({ state, commit }) {
      console.log('Getting txn count...')
      state.web3.eth
        .getTransactionCount(state.address)
        .then((count) => {
          commit('SET_TXN_COUNT', count)
        })
        .catch((e) => console.log(e))
    },
    getHashRate({ state, commit }) {
      console.log('Getting hash rate...')
      state.web3.eth
        .getHashrate()
        .then((rate) => {
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
