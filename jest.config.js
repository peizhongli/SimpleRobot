module.exports = {
    testEnvironment: 'jsdom',
    collectCoverageFrom: [
        'src/components/**/*.{js,jsx,ts,tsx}',
        '!src/components/**/*.d.ts',
    ],
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
        '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
    ],
    moduleFileExtensions: [
        'js',
        'jsx',
        // tell Jest to handle *.vue files
        'vue',
    ],
    transform: {
        '.+\\.(css|styl|less)$':
            'jest-transform-stub',
        '^.+\\.vue$': 'vue-jest',
        '^.+\\.(j|t)sx?$': 'babel-jest',
    },
    moduleNameMapper: {
        '^api/(.*)$': '<rootDir>/src/api/$1',
        '^utils/(.*)$': '<rootDir>/src/utils/$1',
        '^constants/(.*)$': '<rootDir>/src/constants/$1',
        '^components/(.*)$': '<rootDir>/src/components/$1',
        '^directive/(.*)$': '<rootDir>/src/directive/$1',
        '^@/(.*)$': '<rootDir>/src/$1',
    },
};
