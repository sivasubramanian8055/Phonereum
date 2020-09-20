import web3 from './web3';
import main from '../abis/main';

const instance = new web3.eth.Contract(
    main.abi,
    "0xED117fbA142B782C91BAe216302282cb64a72aa3"
  );

export default instance;
