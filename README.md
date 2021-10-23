
# AnbeShivam

A decentralized and completely transparent project funding platform which allows only accredited investors to access the platform content.

> AnbeShivam Beta is now live on the Polygon Mumbai Testnet. Visit https://anbe-shivam.vercel.app
<br/>

## AnbeShivam Smart Contract Deployments

**Mumbai**

| Contract | Deployed address  |
| :----- | :- |
| [AnbeShivamMain Contract](https://mumbai.polygonscan.com/address/0x6C5452e7822c82af4ee38041f4749EdaBfaa2F79) | `0x6C5452e7822c82af4ee38041f4749EdaBfaa2F79` |
| [GODS Token Contract](https://mumbai.polygonscan.com/token/0xFfFcC7aFa25fC131e54c4E194eC9D97eAA1C62d9) | `0xFfFcC7aFa25fC131e54c4E194eC9D97eAA1C62d9`|
| [AnbeShivam NFT Contract](https://mumbai.polygonscan.com/token/0x28a3a80bF1A53653f85150cBB0BA2A3E3cb817Fc) | `0x28a3a80bF1A53653f85150cBB0BA2A3E3cb817Fc`|
<br/>

## Tech Stack Used

- Truffle Suite
- Next js
- IPFS
- OpenZeppelin Contracts
- react-bootstrap

## Run Locally

### Pre-Requisites

- Node JS version 12 or higher
- Truffle Suite
- ganache-cli

  
Clone the project

```bash
  git clone git@github.com:crypticnfk/AnbeShivam.git
```

Go to the project directory

```bash
  cd AnbeShivam

```


### Deploying locally to personal blockchain using Ganache

Install dependencies

```bash
  npm install
```

Compile the Smart Contracts

```bash
  truffle compile
```

Run Ganache (spins up a local blockchain)

```bash
  ganache-cli
```  

Run migrations to deploy the smart contracts to the local blockchain

```bash
  truffle migrate
```  

### Setting up the client
 
Go to the client directory

```bash
  cd client

```
Install dependencies

```bash
  npm install

```

Start a dev server

```bash
  npm run dev

```
Visit http://localhost:3000/ to view the DApp.


## Running Tests

To run tests, run the following command

```bash
  truffle test
```

## Contribute

Contributions are what makes the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

 1. Fork the Project
 2.  Create your Feature Branch (git checkout -b feature/AmazingFeature)
 3. Commit your Changes (git commit -m 'Add some AmazingFeature')
 4.  Push to the Branch (git push origin feature/AmazingFeature)
 5. Open a Pull Request

  
## Authors

- [@abhigamez](https://github.com/abhinav-TB)
- [@crypticnfk](https://github.com/crypticnfk)
- [@Navneeth87](https://github.com/Navneeth87)
- [@HishamHR5](https://github.com/HishamHR5)
- [@aZrael936](https://github.com/aZrael936)

  
## Feedback

If you have any feedback, please reach out to us at cryptomaniac@anbeshivam.com

  
## License

[MIT](https://choosealicense.com/licenses/mit/)  
