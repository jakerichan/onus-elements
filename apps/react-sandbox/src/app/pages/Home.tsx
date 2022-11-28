import { SetElement, useSetElement } from "@onus-elements/react";
import { Link, Outlet } from "react-router-dom";
import styles from '../app.module.css'

const Home = () => {
  useSetElement({
    append: true,
    name: 'breadcrumb',
    priority: 1
  }, <Link className={styles['breadcrumb-item']} to='/'>Home</Link>)

  return (
      <div>
        This is the generated root route.
        <SetElement name='header' priority={1}>Home</SetElement>
        <Link to="/page-2">Click here for page 2.</Link>
        <Outlet />
      </div>
  )
}

export default Home
