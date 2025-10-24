export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  ENDPOINTS: {
    JOBS: '/jobs',
    ACTIVITIES: '/activities',
    VISITORS: '/visitor',
    ACTIVITY: '/activity'
  }
};
