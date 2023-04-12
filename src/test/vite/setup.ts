/// <reference types="vitest/globals" />
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

// todo seems broken at the moment, see https://github.com/mswjs/msw/issues/1267#issuecomment-1308017930
//// import { server } from '~/mocks/server.js';

// Establish API mocking before all tests.
// beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
// afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
// afterAll(() => server.close());
