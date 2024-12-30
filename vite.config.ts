import { defineConfig, coverageConfigDefaults } from "vitest/config";

export default defineConfig({

    test: {
        poolOptions: {
            forks: {
                execArgv: ["--openssl-legacy-provider"],
            }
        },
        coverage: {
            enabled: true,
            all: true,
            exclude: [
                "src/**/*.spec.ts",
                "src/**/*.test.ts",
                "bin/**/*.ts",
                "interfaces",
                "vite.config.ts",
                "instrument.mjs",
                "commitlint.config.js",
                ...coverageConfigDefaults.exclude,
            ],
            reporter: ["lcov", "cobertura"],
        },
        reporters: ["junit", "default", "hanging-process"],
		outputFile: "mcos.junit.xml",
		pool: "forks",
    },
});
