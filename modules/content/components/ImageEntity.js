import { lazyload } from 'react-lazyload';
import '../styles/image-entity.scss';

@lazyload({
  height: 200,
  once: true,
  offset: 10
})
class ImageEntity extends React.Component {
  render() {
    const { key, url, tags } = this.props;

    return (
      <div className="image-entity">
        <img src={url} alt={tags} />
      </div>
    )
  }
}

export default ImageEntity;