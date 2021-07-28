import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer} = await getNamedAccounts();

  await deploy('SmartistContract', {
    from: deployer,
    args: [process.env.TOKEN_NAME, process.env.TOKEN_SYMBOL],
    log: true,
  });
};
export default func;
func.tags = ['SmartistContract'];
