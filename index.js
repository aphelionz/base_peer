const IPFS = require('ipfs');
const OrbitDB = require('orbit-db');

class PersistentPeer {
  constructor(configAppend) {
    var ipfsConfig = {
      relay: { enabled: true, hop: { enabled: true, active: true } },
      config: {
        "Bootstrap": [
        ]
      },
      EXPERIMENTAL: {
        pubsub: true
      }
    };
   
    var finalConfig = Object.assign(ipfsConfig, configAppend) 
    console.log(finalConfig);

    this.ipfs = new IPFS(finalConfig);
    this.ipfs.on('error', (e) => console.error(e));
    this.ipfs.once('ready', () => this._setupOrbitDB.apply(this));
  }

  async _setupOrbitDB() {
    this.orbitdb = new OrbitDB(this.ipfs);
    this.postDBCreation();
  }
  
  async postDBCreation() { }
}

module.exports = PersistentPeer;
