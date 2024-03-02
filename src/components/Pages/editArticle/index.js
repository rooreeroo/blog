import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { message } from 'antd'

import { useAuth } from '../../../hooks/useAuth'
import { useUpdateArticleMutation, useGetArticleQuery } from '../../../redux/blogApi'
import ArticleForm from '../../articleForm'
import LoadingIndicator from '../../loadingIndicator'
import ErrorIndicator from '../../errorIndicator'

export default function EditArticlePage() {
  const { slug } = useParams()
  const { data = {}, isLoading, isError, error } = useGetArticleQuery(slug)
  const navigate = useNavigate()
  const [updateArticle, { isLoading: isUpdateArticle }] = useUpdateArticleMutation()
  const { username } = useAuth()

  if (data.article.author.username !== username) {
    navigate(`/articles/${slug}`)
  }

  const updateArticleHandler = async (updArticle) => {
    try {
      await updateArticle({
        article: { ...updArticle },
        slug,
      }).unwrap()
      message.success('Article updated')
      navigate(`/articles/${slug}`)
    } catch (err) {
      message.error(`Error ${err.status}`)
    }
  }

  if (isUpdateArticle) {
    return <LoadingIndicator tip="Updating article" />
  }
  if (isLoading) {
    return <LoadingIndicator tip="Loading article info" />
  }

  if (isError) {
    return <ErrorIndicator error={error} />
  }

  return <ArticleForm title="Edit article" article={data.article} onSubmit={updateArticleHandler} />
}
