import React from 'react'
import Markdown from 'react-markdown'

const Article = (props) => {
  const { article } = props.pathContext
  return (
    <div>
      <section className="py-3 py-md-4 bg-blueLighter">
        <div className="container container--tight">
          <h1><strong>{article.frontmatter.title}</strong></h1>
        </div>
      </section>
      <section className="py-3 py-md-4">
        <div className="container container--tight">
          <div className="blog-post" dangerouslySetInnerHTML={{ __html: article.html }}></div>
        </div>
      </section>
    </div>
  )
}

export default Article
