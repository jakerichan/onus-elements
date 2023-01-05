import { SetElement, useSetElement } from '@onus-elements/react'
import { Link, Outlet, useLocation, useMatch } from 'react-router-dom'
import styles from '../app.module.css'

const Page2 = () => {
  useSetElement(
    {
      append: true,
      name: 'breadcrumb',
      priority: 1,
    },
    <Link className={styles['breadcrumb-item']} to='/page-2'>
      Page 2
    </Link>
  )

  const result = useMatch('/path-2')
  const location = useLocation()
  console.log(result, location)
  return (
    <div>
      <aside>Sub navigation</aside>
      <ul>
        <li>
          <Link to='nested'>Nested</Link>
        </li>
        <li>
          <Link to='custom'>Custom</Link>
        </li>
        <li>
          <Link to='third'>Third</Link>
        </li>
      </ul>
      <SetElement priority={1} name='header'>
        Page 2
      </SetElement>
      Index route still renders
      <Outlet />
    </div>
  )
}

export default Page2
