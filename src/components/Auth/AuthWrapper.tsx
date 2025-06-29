import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import LoadingSpinner from '../LoadingSpinner'

interface AuthWrapperProps {
  children: React.ReactNode
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { user, loading } = useAuth()
  const [isLogin, setIsLogin] = useState(true)

  if (loading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return isLogin ? (
      <LoginForm onToggleMode={() => setIsLogin(false)} />
    ) : (
      <SignupForm onToggleMode={() => setIsLogin(true)} />
    )
  }

  return <>{children}</>
}

export default AuthWrapper