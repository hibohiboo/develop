module.exports = {
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@/(.+)': '<rootDir>/src/$1',
  },
  preset: '@shelf/jest-mongodb',
  // globals: {
  //   __MONGO_URI__: process.env.MONGO_URL,
  //   __MONGO_DB_NAME__: 'users',
  //   'ts-jest': {
  //     compiler: 'typescript',
  //   }
  // }
};
