import Head from 'next/head'
import { useState, useEffect } from 'react'
import { Container, Row, Col, Image, Stack, Button } from "react-bootstrap"

export default function Home() {
  const [products, setProducts ] = useState([])
  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
  }, [setProducts])
  return (
    <main>
      <Head>
        <title>Next EC</title>
        <meta name="description" content="using stripe" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Container>
          <Stack gap={3}>
            {products.map(product => {
              return (
                <Row key={product.id}>
                  <Col xs={4}>
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      style={{maxWidth: '100%'}}
                    />
                  </Col>
                  <Col>
                    <Stack gap={3}>
                      <h2>{product.name}</h2>
                      <p>{product.description}</p>
                    </Stack>
                    <Stack direction="horizontal">
                      {product.prices.map(price => {
                        return (
                          <dl key={price.id}>
                            <dt>price</dt>
                            <dd>
                              <span>{price.unit_amount.toLocaleString()} {price.currency.toLocaleUpperCase()}</span>
                              {price.transform_quantity ? <small>({price.transform_quantity.divide_by}pcs)</small> : null}
                            </dd>
                            <dd>
                              <Button>Order</Button>
                            </dd>
                          </dl>
                        )
                      })}
                    </Stack>
                  </Col>
                </Row>
              )
            })}
          </Stack>
        </Container>
    </main>
  )
}