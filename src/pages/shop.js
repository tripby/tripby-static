import React from 'react'
import Layout from '../Layout'

const Shop = () => (
  <Layout>
    <div>
      <section className="py-3 py-md-4 bg-blueLighter">
        <div className="container container--tight">
          <h1 className="text-uppercase">
            <strong>Shop</strong>
          </h1>
        </div>
      </section>
      <section className="py-3 py-md-4">
        <div className="container container--tight">
          <h3>Contribua com o TRIPBY e leve um presentinho :)</h3>
          <p className="lead">
            Estamos ativos desde abril de 2015, e desde então,{' '}
            <strong>mais de 200.000 usuários</strong> já se beneficiaram das
            informações que disponibilizamos.
          </p>
          <p className="lead">
            O projeto está em constante desenvolvimento, e contribuindo você dá
            uma força a mais!
          </p>
          <p className="lead">
            O shop é uma parceria entre o TRIPBY e artistas da comunidade. Para
            cada compra,{' '}
            <strong>
              o ganho é dividido por igual entre o TRIPBY e o autor da peça.
            </strong>
          </p>
          <hr />
          <div style={{ maxWidth: 360 }} className="mx-auto">
            <a
              href="https://tripby.bigcartel.com"
              className="btn btn-primary text-center btn-block btn-lg "
            >
              Ir para o shop
            </a>
            <a
              href="https://join.slack.com/t/tripby/shared_invite/enQtMzQwOTcyNTUyNjYzLTY5MjFiZjIyOWVkZDk2ZDQ2Zjc3MmE0N2FmNmE3NmFhMzA3MzY3MTFkNjJhZjgxMjYzOWZhNGQyNzg1YWM4ZTU"
              className="btn btn-outline-primary text-center btn-block btn-lg "
            >
              Enviar minha arte
            </a>
          </div>
        </div>
      </section>
    </div>
  </Layout>
)

export default Shop
