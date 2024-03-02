import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'
import { useLazyGetProfileQuery } from '../../redux/blogApi'
import { WithAuth } from '../../hoc/withAuth'
import ArticlePage from '../Pages/article'
import '../../global.scss'
import ArticleList from '../articleList'
import Header from '../header'
import SignUpPage from '../Pages/singUp'
import SignInPage from '../Pages/signIn'
import UserProfilePage from '../Pages/userProfile'
import EditArticlePage from '../Pages/editArticle'
import NewPostPage from '../Pages/newPost'
import NotFoundPage from '../Pages/notFound'

export default function App() {
  const [trigger] = useLazyGetProfileQuery()
  const { isAuth } = useAuth()
  useEffect(() => {
    if (localStorage.getItem('token') && !isAuth) {
      trigger()
    }
  }, [isAuth])

  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<ArticleList />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route element={<WithAuth />}>
          <Route path="/new-article" element={<NewPostPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/articles/:slug/edit" element={<EditArticlePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
