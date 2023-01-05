import { SetElement, useSetElement } from '@onus-elements/react'
import { useEffect, useState } from 'react'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { Link, Outlet } from 'react-router-dom'
import styles from '../app.module.css'

const gf = new GiphyFetch(process.env.NX_GIPHY_API_KEY as string)

console.log({ API_KEY: process.env.NX_GIPHY_API_KEY })

const Nested = ({ name }: { name: string }) => {
  useSetElement(
    {
      append: true,
      name: 'breadcrumb',
      priority: 2,
    },
    <Link className={styles['breadcrumb-item']} to='/page-2/nested'>
      {name}
    </Link>
  )

  const [gifUrl, setGifUrl] = useState<string>('')

  useEffect(() => {
    const fetchGif = async () => {
      const { data } = await gf.random({ tag: 'random', rating: 'pg' })
      setGifUrl((gifUrl) => gifUrl || data.images.downsized.url)
    }
    fetchGif()
  }, [])

  return (
    <div>
      <SetElement priority={2} name='header'>
        {name}
      </SetElement>
      <Outlet />
      <h2>Random gif:</h2>
      {gifUrl && <img src={gifUrl} alt='random gif' />}
    </div>
  )
}

export default Nested
