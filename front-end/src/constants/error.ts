export const firebaseErrorMessages = {
  "auth/invalid-phone-number": "The phone number is not valid.",
  "auth/missing-phone-number": "The phone number is missing.",
  "auth/quota-exceeded":
    "SMS quota for this project has been exceeded. Try again later.",
  "auth/user-disabled":
    "The user corresponding to the given phone number has been disabled.",
  // Add more Firebase auth error codes as needed
  default: "An unknown error occurred. Please try again.",
};
export const firebaseOtpErrorMessages = {
  "auth/invalid-verification-code": "The verification code is invalid.",
  "auth/missing-verification-code": "The verification code is missing.",
  "auth/code-expired":
    "The verification code has expired. Please request a new one.",
  "auth/invalid-phone-number": "The phone number is not valid.",
  default:
    "An unknown error occurred during OTP verification. Please try again.",
};
