module.exports = {
  use: [
    ['@neutrinojs/react', {
      babel: {
        plugins: [
          "react-hot-loader/babel"
        ]
      }
    }],
    ['@neutrinojs/jest', {
      collectCoverageFrom: ["index.js"],
      coveragePathIgnorePatterns: [
        "/node_modules/",
        "/build/",
        "/src/"
      ],
      setupTestFrameworkScriptFile: '<rootDir>/test/setup.js',
      setupFiles: [
        '<rootDir>/test/shim.js'
      ]
    }]
  ],
  env: {
    NODE_ENV: {
      test: (neutrino) => neutrino.config.module
        .rule('compile')
        .use('babel')
    }
  }
};
