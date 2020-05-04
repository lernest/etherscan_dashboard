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
    blockNumber: null,
    accounts: [],
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
  },
  actions: {
    initialize({ state, dispatch }, url) {
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
    getAccountInfo({ dispatch }, address) {
      console.log('Getting account info', address)
      dispatch('getBalance', address)
      dispatch('getAccounts')
      dispatch('getBlockNumber')
      dispatch('getTxnCount')
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
  },
  getters: {
    balanceEther: (state) => {
      return state.web3.utils.fromWei(state.balance, 'ether')
    },
  },
  modules: {},
})
