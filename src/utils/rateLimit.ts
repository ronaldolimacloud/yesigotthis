export function createRateLimiter(maxAttempts: number, timeWindow: number) {
  const attempts = new Map<string, number[]>();

  return function checkRateLimit(key: string): boolean {
    const now = Date.now();
    const userAttempts = attempts.get(key) || [];
    
    // Remove old attempts outside the time window
    const validAttempts = userAttempts.filter(timestamp => 
      now - timestamp < timeWindow
    );
    
    if (validAttempts.length >= maxAttempts) {
      return false;
    }
    
    validAttempts.push(now);
    attempts.set(key, validAttempts);
    return true;
  };
} 