/* eslint-disable react/prop-types */
import '../../styles/main.scss'

const CircleBtn = ({ iconUrl, className, width, height, handlePress }) => {
  return (
    <button type="button" className={className} onClick={handlePress}>
      <img
        style={{ width: width, height: height, borderRadius: '4px' }}
        src={iconUrl}
        alt="btn"
      />
    </button>
  )
}

export default CircleBtn
