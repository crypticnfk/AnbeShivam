
# AnbeShivam

A decentralized and completely transparent project funding platform which allows only accredited investors to access the platform content


## Tech Stack Used

- Truffle Suite
- Next js
- ganache
- IPFS
- openzeppelin
- react-bootstrap

## AnbeShivam Smart Contract Deployments

**Mumbai**

| Contract | Deployed address  |
| :----- | :- |
| [AnbeShivamMain Contract](https://mumbai.polygonscan.com/address/0x6C5452e7822c82af4ee38041f4749EdaBfaa2F79) | `0x6C5452e7822c82af4ee38041f4749EdaBfaa2F79` |
| [GODS Token Contract](https://mumbai.polygonscan.com/token/0xFfFcC7aFa25fC131e54c4E194eC9D97eAA1C62d9) | `0xFfFcC7aFa25fC131e54c4E194eC9D97eAA1C62d9`|
| [AnbeShivam NFT Contract](https://mumbai.polygonscan.com/token/0x28a3a80bF1A53653f85150cBB0BA2A3E3cb817Fc) | `0x28a3a80bF1A53653f85150cBB0BA2A3E3cb817Fc`|



## Run Locally


### Pre-Requisites

- truffle
- ganache-cli

  
Clone the project

```bash
  git clone git@github.com:crypticnfk/AnbeShivam.git
```

Go to the project directory

```bash
  cd AnbeShivam

```


### Setting up a local Block Chain Server
Install dependencies

```bash
  npm install
```

Compile Smart Contracts

```bash
  truffel Compile
```

Run ganache (a local block chain)

```bash
  ganache-cli
```  

Run migrations to deploy the smart contracts to ganache


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

Starting a dev server

```bash
  npm run dev

```
Visit http://localhost:3000/ to view the app


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
- [Navneeth Ranjith](https://github.com/Navneeth87)
- [@HishamHR5](https://github.com/HishamHR5)
- [@aZrael936](https://github.com/aZrael936)

  
## Feedback

If you have any feedback, please reach out to us at cryptomaniac@anbeshivam.com

  
## License

[MIT](https://choosealicense.com/licenses/mit/)

  
