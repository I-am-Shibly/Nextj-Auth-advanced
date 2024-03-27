/**
 * An array of routes that are accessible to public
 * These routes don't require authentication
 *  @type {string[]}
 */
export const publicRoutes = ['/'];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings page
 *  @type {string[]}
 */
export const authRoutes: string[] = ['/auth/login', '/auth/register'];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authetication purposes
 *  @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * The default redirect after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings';
