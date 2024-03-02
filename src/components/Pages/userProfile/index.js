import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../../hooks/useAuth'
import { useUpdateUserMutation } from '../../../redux/blogApi'
import { usernameField, passwordField, imageField, emailField } from '../../userForm/fieldsTemplates'
import UserForm from '../../userForm'

export default function UserProfilePage() {
  const navigate = useNavigate()
  const [errors, setErrors] = useState()
  const [updateUser] = useUpdateUserMutation()
  const updateUserHandler = async (data) => {
    try {
      await updateUser({
        user: {
          username: data.username,
          email: data.email,
          image: data.image,
        },
      }).unwrap()
      navigate('/')
    } catch (err) {
      setErrors(err.data.errors)
    }
  }
  const { username, email, image } = useAuth()
  const propsValues = { username, email, image }
  const template = {
    title: 'Edit profile',
    fields: [
      usernameField,
      emailField,
      {
        ...passwordField,
        label: 'New password',
        placeholder: 'New password',
        validationProps: { ...passwordField.validationProps, required: { value: false } },
      },
      imageField,
    ],
    labelSubmit: 'Save',
  }

  return (
    <UserForm
      template={template}
      onSubmit={(data) => updateUserHandler(data)}
      propsErrors={errors}
      propsValues={propsValues}
    />
  )
}
