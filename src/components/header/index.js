import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'

import User from '../user'
import { useAuth } from '../../hooks/useAuth'
import { clearUser } from '../../redux/slices/userSlice'
import { blogApi } from '../../redux/blogApi'

import styles from './header.module.scss'

export default function Header() {
  const dispacth = useDispatch()
  const { isAuth, username, image } = useAuth()
  const logoutHandler = () => {
    dispacth(clearUser())
    dispacth(blogApi.util.invalidateTags(['Article']))
  }

  return (
    <>
      <div className={styles.header}>
        <Link to="/" className={styles.logo}>
          Realworld Blog
        </Link>
        <div className={styles.header__right}>
          {isAuth ? (
            <>
              <Link to="/new-article" className="newArticleBtn">
                Create article
              </Link>
              <Link to="/profile" className="userBtn">
                <User username={username} image={image} />
              </Link>
              <button type="button" className="logoutBtn" onClick={logoutHandler}>
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/sign-in" className="signInBtn">
                Sign In
              </Link>
              <Link to="/sign-up" className="signUpBtn">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
      <div className={styles.main}>
        <Outlet />
      </div>
    </>
  )
}
