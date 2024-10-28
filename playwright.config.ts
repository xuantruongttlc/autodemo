import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, 'env', '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    baseURL: process.env.STAGING === '1' ? 'http://staging.example.test/' : 'http://example.test/',
    viewport: { width: 1920, height: 1080 },
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    launchOptions: {
      slowMo: 100,
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], ...{ video: 'retain-on-failure' } },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], ...{ video: 'retain-on-failure' } },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], ...{ video: 'retain-on-failure' } },
    },
  ],
});
