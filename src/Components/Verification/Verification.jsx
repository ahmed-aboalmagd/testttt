import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EmailVerification = () => {
  const { token } = useParams(); // Get the token from the URL
  console.log("Token being sent for verification:", token);

  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState('Verifying...');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/verify-email', {
          params: { token } // Send token as a query parameter
        });

        if (response.data.success) {
          setVerificationStatus('Email verified successfully! Redirecting to login page...');
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          setVerificationStatus('Invalid or expired verification link.');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setVerificationStatus('An error occurred during verification. Please try again.');
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Email Verification</h2>
        <p className="text-center text-gray-700">{verificationStatus}</p>
      </div>
    </div>
  );
};

export default EmailVerification;
