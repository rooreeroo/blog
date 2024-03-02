import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import { useLoginUserMutation } from '../../../redux/blogApi'
import { emailField, passwordField } from '../../userForm/fieldsTemplates'
import UserForm from '../../userForm'

export default function SignInPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [errors, setErrors] = useState()
  const fromPage = location.state?.from?.pathname || '/'

  const [loginUser] = useLoginUserMutation()
  const onSubmit = async (data) => {
    try {
      await loginUser({ user: { email: data.email, password: data.password } }).unwrap()
      navigate(fromPage, { replace: true })
    } catch (err) {
      if (err.status === 422) {
        setErrors({
          email: 'invalid email or password',
          password: 'invalid email or password',
        })
      }
    }
  }

  const template = {
    title: 'Sign In',
    fields: [emailField, passwordField],
    labelSubmit: 'Login',
    footer: (
      <>
        Don&apos;t have an account? <Link to="/sign-up">Sign Up</Link>
      </>
    ),
  }

  return <UserForm template={template} onSubmit={(data) => onSubmit(data)} propsErrors={errors} />
}
