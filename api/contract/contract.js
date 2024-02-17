const {Web3}=require("web3")
const ABI=require("../ABI.json")
const web3= new Web3('https://eth-sepolia.g.alchemy.com/v2/-5hNbXp19DrbGO8I7U5MLXwKp3uLnz5J')
const contractAddress="0x3877663f86De524EA1b63dC22d99ea2D1F5bdfEa"
const contract=new web3.eth.Contract(ABI,contractAddress)

module.exports={contract} 