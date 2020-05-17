<template>
  <div>
    <v-container>
      <!-- Header -->
      <v-row>
        <v-col>
          <v-card outlined class="pa-5 pb-2">
            <v-card-title class="display-3 mb-4"
              >Web3 Ethereum Explorer</v-card-title
            >
            <v-card-subtitle class="body-1">
              Querying information from the Ethereum blockchain using
              <a
                style="text-decoration:none"
                class="green--text"
                href="https://web3js.readthedocs.io/en/v1.2.7/"
                target="_blank"
                ><span title="Link will open in a new tab">web3.js</span></a
              >
              and
              <a
                v-if="!isLocal"
                style="text-decoration:none"
                class="green--text"
                href="https://infura.io/"
                target="_blank"
                ><span title="Link will open in a new tab">Inufra</span></a
              >
              <a
                v-if="isLocal"
                style="text-decoration:none"
                class="green--text"
                href="https://www.trufflesuite.com/ganache"
                target="_blank"
                ><span title="Link will open in a new tab">Ganache</span></a
              >. Click on a card below for more information.
            </v-card-subtitle>

            <v-card-text class="body-1" v-if="!isLocal">
              Go to
              <a
                style="text-decoration:none"
                class="green--text"
                href="https://www.etherscan.io/accounts"
                target="_blank"
                ><span title="Link will open in a new tab">Etherscan</span></a
              >
              and find an account to inspect. For example,
              0xbe0eb53f46cd790cd13851d5eff43d12404d33e8
            </v-card-text>

            <v-card-text class="body-1" v-if="isLocal">
              Start up Ganache on http://127.0.0.1:8545 and select an account to
              inspect. Then go to to
              <a
                style="text-decoration:none"
                class="green--text"
                href="https://remix.io"
                target="_blank"
                ><span title="Link will open in a new tab">Remix.io</span></a
              >
              and change the environment to 'Web3 Provider' with the same
              address. Deploy a smart contract to view account changes.
            </v-card-text>

            <!-- Select main net or local net -->
            <v-card-actions>
              <v-btn-toggle class="mx-8" v-model="isLocalButton" mandatory>
                <v-btn @click="connectToNetwork">
                  Mainnet
                  <v-icon></v-icon>
                </v-btn>
                <v-btn @click="connectToNetwork">
                  Localnet
                  <v-icon></v-icon>
                </v-btn>
              </v-btn-toggle>
            </v-card-actions>
            <v-card-subtitle v-if="!isConnected" class="mx-2 overline red--text"
              >Unable to connect to the network</v-card-subtitle
            >
            <v-card-subtitle
              v-if="isConnected && !isLocal"
              class="mx-1 overline green--text"
              >Successfully connected to the main net</v-card-subtitle
            >
            <v-card-subtitle
              v-if="isConnected && isLocal"
              class="mx-1 overline red--text"
              >Successfully connected to the local net</v-card-subtitle
            >
          </v-card>
        </v-col>
      </v-row>

      <!-- Enter an address -->
      <v-row>
        <v-col>
          <v-card outlined class="custom-card mx-auto mb-4 my-1 pa-5">
            <v-text-field
              class="body-1 mb-n6"
              outlined
              color="green"
              label="Address"
              placeholder="0xbe0eb53f46cd790cd13851d5eff43d12404d33e8"
              v-model="addressInput"
            ></v-text-field>

            <v-card-actions>
              <v-btn color="success" outlined block @click="getAccountInfo"
                >Clicky click</v-btn
              >
            </v-card-actions>
            <v-card-subtitle class="red--text" v-if="!isValidAddress">
              Please enter a valid address.
            </v-card-subtitle>
          </v-card>

          <!-- Display node info and chain ID -->
          <v-card flat class="mx-auto mt-8">
            <FlipCard>
              <!-- Front of the card -->
              <template v-slot:front>
                <v-card-title class="title font-weight-light">
                  Node info</v-card-title
                >
                <v-card-text
                  v-if="isConnected"
                  class="body-1 font-weight-light"
                  >{{ nodeInfo }}</v-card-text
                >

                <v-card-title class="title font-weight-light">
                  Chain ID</v-card-title
                >
                <v-card-text
                  v-if="isConnected"
                  class="body-1 font-weight-light"
                  >{{ chainID }}</v-card-text
                >
              </template>
              <!-- Back of the card -->
              <template v-slot:back>
                <v-card-text class="body-1 font-weight-light"
                  >Node info refers to the current client version. This will be
                  different whether we're connected to the mainnet via Infura,
                  or a local node with Ganache.</v-card-text
                >
                <v-card-text class="body-1 font-weight-light"
                  >ChainID is an integer number used when signing and verifying
                  transactions to ensure that a transaction is submitted to only
                  one chain. This prevents
                  <a
                    style="text-decoration:none"
                    class="green--text"
                    href="https://en.wikipedia.org/wiki/Replay_attack"
                    target="_blank"
                    ><span title="Link will open in a new tab"
                      >replay attacks</span
                    ></a
                  >.
                </v-card-text>
              </template>
            </FlipCard>
          </v-card>
        </v-col>
      </v-row>

      <!-- Row of account info -->
      <v-row>
        <!-- Display accounts on node and hash rate-->
        <v-col sm="12" md="4">
          <FlipCard>
            <!-- Front of the card -->
            <template v-slot:front>
              <v-card-title class="title font-weight-light"
                >Accounts on node</v-card-title
              >
              <v-card-text
                v-if="isConnected"
                class="body-1 font-weight-light"
                >{{ accounts }}</v-card-text
              >
              <v-card-title class="title font-weight-light"
                >Hash Rate</v-card-title
              >
              <v-card-text
                v-if="isConnected"
                class="body-1 font-weight-light"
                >{{ hashRate }}</v-card-text
              >
            </template>
            <!-- Back of the card -->
            <template v-slot:back>
              <v-card-text class="body-1 font-weight-light"
                >When connected to the main chain, this will be an empty array.
              </v-card-text>
              <v-card-text class="body-1 font-weight-light">
                On the local net, it will reflect the same account addresses as
                shown in Ganache.
              </v-card-text>
              <v-card-text class="body-1 font-weight-light"
                >Hash rate will be blank unless connected to a mining
                node.</v-card-text
              >
            </template>
          </FlipCard>
        </v-col>

        <!-- Display transaction count -->
        <v-col sm="12" md="4">
          <FlipCard>
            <!-- Front of the card -->
            <template v-slot:front>
              <v-card-title class="title font-weight-light"
                >Transaction count</v-card-title
              >
              <v-card-text
                v-if="isConnected"
                class="body-1 font-weight-light"
                >{{ txnCount }}</v-card-text
              >
            </template>
            <!-- Back of the card -->
            <template v-slot:back>
              <v-card-text class="body-1 font-weight-light"
                >This displays the number of transactions that have been sent
                from a given address at the time of the latest
                block.</v-card-text
              >
            </template>
          </FlipCard>
        </v-col>

        <!-- Display account balance -->
        <v-col sm="12" md="4">
          <FlipCard>
            <!-- Front of the card -->
            <template v-slot:front>
              <v-card-title class="title font-weight-light"
                >Balance in Wei</v-card-title
              >
              <v-card-text
                v-if="isConnected"
                class="body-1 font-weight-light"
                >{{ balance }}</v-card-text
              >
              <v-card-title class="title font-weight-light"
                >Balance in Ether</v-card-title
              >
              <v-card-text
                v-if="isConnected"
                class="body-1 font-weight-light"
                >{{ balanceEther }}</v-card-text
              >
            </template>
            <!-- Back of the card -->
            <template v-slot:back>
              <v-card-text class="body-1 font-weight-light"
                >Wei is the smallest unit of ether (similar to cents and
                dollars). 1 wei is 1x10<sup>18</sup> ether.
              </v-card-text>
              <v-card-text class="body-1 font-weight-light"
                >All monetary values are represented in wei and must be
                converted if a different denomenation is desired.
              </v-card-text>
            </template>
          </FlipCard>
        </v-col>
      </v-row>

      <!-- Row of chain info -->
      <v-row>
        <!-- Display gas price -->
        <v-col xs="12" sm="6">
          <FlipCard>
            <!-- Front of the card -->
            <template v-slot:front>
              <v-card-title class="title font-weight-light"
                >Current Gas Price</v-card-title
              >
              <v-card-text
                v-if="isConnected"
                class="body-1 font-weight-light"
                >{{ gasPrice }}</v-card-text
              >
            </template>
            <!-- Back of the card -->
            <template v-slot:back>
              <v-card-text class="body-1 font-weight-light"
                >Gas refers to the cost necessary to perform a transaction on
                the network. Miners set the price of gas and can decline to
                process a transaction if it does not meet their price threshold.
                <a
                  style="text-decoration:none"
                  class="green--text"
                  href="https://kb.myetherwallet.com/en/transactions/what-is-gas/"
                  target="_blank"
                  ><span title="Link will open in a new tab">More info</span></a
                ></v-card-text
              >
            </template>
          </FlipCard>
        </v-col>

        <!-- Display block number -->
        <v-col xs="12" sm="6">
          <FlipCard>
            <!-- Front of the card -->
            <template v-slot:front>
              <v-card-title class="title font-weight-light"
                >Current block number</v-card-title
              >
              <v-card-text
                v-if="isConnected"
                class="body-1 font-weight-light"
                >{{ blockNumber }}</v-card-text
              >
            </template>
            <!-- Back of the card -->
            <template v-slot:back>
              <v-card-text class="body-1 font-weight-light">
                Blocks contain transactions and smart contracts. The blocks are
                created or mined by some participants and distributed to other
                participants who validate them. A new block is created every
                10-20 seconds.
              </v-card-text>
            </template>
          </FlipCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import FlipCard from '../components/FlipCard'
export default {
  components: {
    FlipCard,
  },
  data() {
    return {
      addressInput: '',
      isLocalButton: 0,
      isLocal: false, // local | mainnet
    }
  },
  beforeCreate() {
    console.log('beforeCreate')
    this.$store.dispatch(
      'initialize',
      'https://mainnet.infura.io/v3/f38d41e09e72422ca0ed626bd48df37d'
    )
  },
  methods: {
    getAccountInfo() {
      console.log(this.addressInput)
      this.$store.dispatch('getAccountInfo', this.addressInput)
    },
    connectToNetwork() {
      this.isLocal = !this.isLocal
      console.log('Network: ', this.isLocal)
      if (this.isLocal === true) {
        console.log('Connecting to local net...')
        this.isLocalButton = 1 // ensures that the button and actual network remain the same
        this.$store.dispatch('initialize', 'HTTP://127.0.0.1:8545')
      } else if (this.isLocal === false) {
        console.log('Connecting to mainnet...')
        this.isLocalButton = 0 // ensures that the button and actual network remain the same
        this.$store.dispatch(
          'initialize',
          'https://mainnet.infura.io/v3/f38d41e09e72422ca0ed626bd48df37d'
        )
      } else {
        console.log('Unable to connect to network')
      }
    },
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
      'hashRate',
      'isValidAddress',
      'isConnected',
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
