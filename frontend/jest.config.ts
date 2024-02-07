import type {Config} from 'jest';
import { defaults } from 'jest-config';

const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
}


const config: Config = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
};

export default config;

module.exports = createJestConfig(customJestConfig)
