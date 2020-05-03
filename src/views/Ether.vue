<template>
  <div>
    <v-container>
      <h1>Web3 Ethereum Explorer</h1>
      <p>
        Query information from the Ethereum blockchain using
        <a href="https://web3js.readthedocs.io/en/v1.2.7/">web3.js</a> and
        <a href="https://infura.io/">Inufra</a>
      </p>
      <p>
        Go to <a href="https://www.etherscan.io/accounts">Etherscan</a> and find
        an account to inspect.
      </p>
      <p>
        For example, 0xbe0eb53f46cd790cd13851d5eff43d12404d33e8
      </p>

      <v-card class="custom-card mx-auto" color="white" width="700px">
        <v-card-text>
          <p>Node Info: {{ nodeInfo }}</p>
          <p>Chain ID: {{ chainID }}</p>
        </v-card-text>

        <v-text-field
          outlined
          label="Address"
          placeholder="0xbe0eb53f46cd790cd13851d5eff43d12404d33e8"
          v-model="addressInput"
        ></v-text-field>
        <v-card-actions>
          <v-btn @click="getBalance">Clicky click</v-btn>
        </v-card-actions>
      </v-card>
      <v-card class="custom-card mx-auto" color="white" width="700px">
        <h2>Transaction count from this address</h2>
        <p>{{ txnCount }}</p>
        <v-btn @click="getTxnCount">Refresh</v-btn>
      </v-card>
      <v-card class="custom-card mx-auto" color="white" width="700px">
        <h2>Balance in Wei</h2>
        <p>{{ balance }}</p>
        <h2>Balance in Ether</h2>
        <p>{{ balanceEther }}</p>
      </v-card>
      <v-card class="custom-card mx-auto" color="white" width="700px">
        <h2>Current Gas Price</h2>
        <p>{{ gasPrice }}</p>
        <v-btn @click="getGasPrice">Refresh</v-btn>
      </v-card>
      <v-card class="custom-card mx-auto" color="white" width="700px">
        <h2>Current block number</h2>
        <p>{{ blockNumber }}</p>
        <v-btn @click="getBlockNumber">Refresh</v-btn>
      </v-card>
      <v-card class="custom-card mx-auto" color="white" width="700px">
        <h2>Accounts on node</h2>
        <p>{{ accounts }}</p>
        <v-btn @click="getAccounts">Refresh</v-btn>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      addressInput: '',
    }
  },
  beforeCreate: function() {
    console.log('mounting')
    this.$store.dispatch('initialize')
  },
  methods: {
    getBalance() {
      this.$store.dispatch('getBalance', this.addressInput)
    },
    ...mapActions([
      'getGasPrice',
      'getAccounts',
      'getBlockNumber',
      'getTxnCount',
    ]),
  },
  computed: {
    ...mapState([
      'balance',
      'address',
      'gasPrice',
      'accounts',
      'blockNumber',
      'nodeInfo',
      'chainID',
      'txnCount',
    ]),
    ...mapGetters(['balanceEther']),
  },
}
</script>

<style lang="scss" scoped>
.custom-card {
  margin-bottom: 15px;
}
</style>
