import axios from 'axios';
import BigNumber from 'bignumber.js';

const apiKey = 'IY6ZY6HJGS51185EIPCG4GCS8XP5D38PDJ';
const contractAddress = '0x28767E286113Ab01EE819b9398A22D6f27BaDb6E';
const decimals = 18; // replace this with the number of decimal places your token uses
const nonCirculatingSupply = new BigNumber(125).multipliedBy(new BigNumber(10).pow(6)); // 125 million

export default async (req, res) => {
    try {
        const url = `https://api.polygonscan.com/api?module=stats&action=tokensupply&contractaddress=${contractAddress}&apikey=${apiKey}`;
        const response = await axios.get(url);
        const totalSupplyInWei = new BigNumber(response.data.result);
        const totalSupply = totalSupplyInWei.dividedBy(new BigNumber(10).pow(decimals));
        const circulatingSupply = totalSupply.minus(nonCirculatingSupply); // Subtracting non-circulating supply
        res.status(200).send(circulatingSupply.toString(10)); // Only sending the circulating supply value as a string
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching circulating supply.');
    }
};
