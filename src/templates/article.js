import React from 'react'
import Layout from '../Layout'

const Article = (props) => {
  const { article } = props.pageContext
  return (
    <Layout>
      <div>
        <section className="py-3 py-md-4 bg-blue">
          <div className="container container--tight">
            <h1 className="text-green">
              <strong>{article.frontmatter.title}</strong>
            </h1>
          </div>
        </section>
        <section className="py-3 py-md-4">
          <div className="container container--tight">
            <div
              className="blog-post"
              dangerouslySetInnerHTML={{ __html: article.html }}
            />
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Article
