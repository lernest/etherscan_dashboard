<template>
  <div>
    <v-container>
      <!-- Header -->
      <v-row>
        <v-col>
          <v-card outlined>
            <v-card-title class="display-3 mb-4"
              >Web3 Ethereum Explorer</v-card-title
            >
            <v-card-subtitle>
              Querying information from the Ethereum blockchain using
              <a
                style="text-decoration:none"
                href="https://web3js.readthedocs.io/en/v1.2.7/"
                >web3.js</a
              >
              and
              <a
                v-if="!network"
                style="text-decoration:none"
                href="https://infura.io/"
                >Inufra</a
              >
              <a
                v-if="network"
                style="text-decoration:none"
                href="https://www.trufflesuite.com/ganache"
                >Ganache</a
              >
            </v-card-subtitle>

            <v-card-text v-if="!network">
              Go to
              <a
                style="text-decoration:none"
                href="https://www.etherscan.io/accounts"
                >Etherscan</a
              >
              and find an account to inspect. For example,
              0xbe0eb53f46cd790cd13851d5eff43d12404d33e8
            </v-card-text>

            <v-card-text v-if="network">
              Start up Ganache on http://127.0.0.1:8545 and select an account to
              inspect. Then go to to
              <a style="text-decoration:none" href="https://remix.io"
                >Remix.io</a
              >
              and change the environment to
              <strong> Web3 Provider </strong> with the same address.
            </v-card-text>

            <!-- Main net or local net -->
            <v-card-actions>
              <v-btn-toggle v-model="network" mandatory>
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
          </v-card>
        </v-col>
      </v-row>

      <!-- Address and account info -->
      <v-row>
        <v-col>
          <v-card outlined class="custom-card mx-auto my-1 pa-4">
            <v-text-field
              class="mb-n6"
              outlined
              label="Address"
              placeholder="0xbe0eb53f46cd790cd13851d5eff43d12404d33e8"
              v-model="addressInput"
            ></v-text-field>

            <v-card-actions>
              <v-btn color="success" outlined block @click="getAccountInfo"
                >Clicky click</v-btn
              >
            </v-card-actions>
          </v-card>

          <v-card outlined class="custom-card mx-auto mb-1 mt-4 pa-4">
            <v-card-title> Node info</v-card-title>
            <v-card-text>{{ nodeInfo }}</v-card-text>

            <v-card-title> Chain ID</v-card-title>
            <v-card-text>{{ chainID }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Account Info -->
      <v-row>
        <!-- Accounts on node -->
        <v-col>
          <v-card outlined class="custom-card mx-auto my-1 pa-4" height="100%">
            <v-card-title>Accounts on node</v-card-title>
            <v-card-text>{{ accounts }}</v-card-text>
          </v-card>
        </v-col>

        <!-- Transaction count -->
        <v-col>
          <v-card outlined class="custom-card mx-auto my-1 pa-4" height="100%">
            <v-card-title>Transaction count</v-card-title>
            <v-card-text>{{ txnCount }}</v-card-text>
          </v-card>
        </v-col>

        <!-- Balance -->
        <v-col>
          <v-card outlined class="custom-card mx-auto my-1 pa-4" height="100%">
            <v-card-title>Balance in Wei</v-card-title>
            <v-card-text>{{ balance }}</v-card-text>
            <v-card-title>Balance in Ether</v-card-title>
            <v-card-text>{{ balanceEther }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Chain info -->
      <v-row>
        <!-- Gas Price -->
        <v-col>
          <v-card outlined class="custom-card mx-auto my-1 pa-4" height="100%">
            <v-card-title>Current Gas Price</v-card-title>
            <v-card-text>{{ gasPrice }}</v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <!-- Block number -->
          <v-card outlined class="custom-card mx-auto my-1 pa-4" height="100%">
            <v-card-title>Current block number</v-card-title>
            <v-card-text>{{ blockNumber }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      addressInput: "",
      network: 0
    };
  },
  beforeCreate() {
    console.log("beforeCreate");
    this.$store.dispatch(
      "initialize",
      "https://mainnet.infura.io/v3/f38d41e09e72422ca0ed626bd48df37d"
    );
  },
  methods: {
    getAccountInfo() {
      console.log(this.addressInput);
      this.$store.dispatch("getAccountInfo", this.addressInput);
    },
    connectToNetwork() {
      console.log("Network: ", this.network);
      if (this.network === 0) {
        this.$store.dispatch("initialize", "HTTP://127.0.0.1:8545");
      } else if (this.network === 1) {
        this.$store.dispatch(
          "initialize",
          "https://mainnet.infura.io/v3/f38d41e09e72422ca0ed626bd48df37d"
        );
      } else {
        console.log("Unable to connect to network: ", this.network);
      }
    }
  },
  computed: {
    ...mapState([
      "balance",
      "address",
      "gasPrice",
      "accounts",
      "blockNumber",
      "nodeInfo",
      "chainID",
      "txnCount"
    ]),
    ...mapGetters(["balanceEther"])
  }
};
</script>

<style lang="scss" scoped>
.custom-card {
  margin-bottom: 15px;
}
</style>
