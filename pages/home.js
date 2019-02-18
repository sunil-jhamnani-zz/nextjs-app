import Layout from '../modules/layout/components/Layout';
import ImageBlog from '../modules/content/components/ImageBlog';
import Router from 'next/router'
import cookie from 'js-cookie'

class Home extends React.Component {
  componentDidMount() {
    if (!cookie.get('token')) {
      Router.push('/login');
    }
  }

  render() {
    return (
      <Layout>
        <ImageBlog />
      </Layout>
    )
  }
}


export default Home;