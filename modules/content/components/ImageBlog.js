import ImageEntity from './ImageEntity';
import fetch from 'isomorphic-unfetch';
import getPixabayApiUrl from '../../../utils/getPixabayApiUrl';
import '../styles/image-blog.scss'

class ImageBlog extends React.Component {
  state ={
    data: []
  }

  async componentDidMount() {
    const response = await fetch(getPixabayApiUrl());
    const json = await response.json();
    this.setState({ data: json });
  }

  render() {
    const { data } = this.state;
    return (
      <div className="image-blog container-fluid">
        {
          data.hits && data.hits.map(entity => (<ImageEntity key={entity.id} url={entity.webformatURL} tags={entity.tags} />))
        }
      </div>
    )
  }
}

export default ImageBlog;