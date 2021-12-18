import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
export type WebpackModeType = 'development' | 'production' | 'none';
export type WebpackEnvsType = Record<string, any>;

export type WebpackCustomConfigCallback = (
  envs: { mode: WebpackModeType } & WebpackEnvsType,
  cb: (
    envs: Record<string, string>,
    params: Configuration,
  ) => WebpackBaseCustomConfigEnvsCallback,
) => Configuration;

export type WebpackBaseCustomConfigEnvsCallback = (
  envs: { mode: WebpackModeType } & Record<string, any>,
  config: Configuration,
) => Configuration;

export type Configuration = {
  devServer?: DevServerConfiguration;
} & WebpackConfiguration;

export interface GetWebpackBaseCustomConfigCallback {
  (
    mode: WebpackModeType,
    cb: (envs: WebpackEnvsType, config: Configuration) => Configuration,
  );
}
