
import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,

  handler: (req, res, next, options) => {
    const resetTime = req.rateLimit?.resetTime;

    const remainingMs = resetTime
      ? Math.max(0, resetTime.getTime() - Date.now())
      : options.windowMs;

    const remainingSeconds = Math.ceil(remainingMs / 1000);

    res.status(options.statusCode).json({
      success: false,
      message: 'Too many login attempts. Please try again later.',
      retryAfterSeconds: remainingSeconds,
      retryAfterMinutes: Math.ceil(remainingSeconds / 60),
      retryAt: new Date(Date.now() + remainingMs).toISOString(),
    });
  },
});
