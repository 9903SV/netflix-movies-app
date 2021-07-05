import {SocialIcon} from 'react-social-icons'
import './index.css'

const socialMediaData = [
  {
    id: 0,
    url:
      'https://www.google.com/search?q=netflix&sxsrf=ALeKk00QGh7KCvkYObkfzlDcXLDyWXEL9A%3A1624985056345&source=hp&ei=4E3bYL6eEtmp3LUP6fussAw&iflsig=AINFCbYAAAAAYNtb8PND2Ymo2goStnyjHwqeJ_iK94zk&oq=netflix&gs_lcp=Cgdnd3Mtd2l6EAMyBAgjECcyBAgjECcyBAgjECcyBQgAEJECMgUIABCRAjIICAAQsQMQkQIyCggAEIcCELEDEBQyBQgAELEDMgUIABCxAzIFCAAQsQM6BAgAEEM6AggAOggIABCxAxCDAToHCAAQsQMQQzoFCAAQyQNQiwpY7RJgqztoAHAAeACAAb4FiAGDFpIBDTAuMS4wLjIuMy4wLjGYAQCgAQGqAQdnd3Mtd2l6&sclient=gws-wiz&ved=0ahUKEwi-jq-Ipb3xAhXZFLcAHek9C8YQ4dUDCAc&uact=5',
  },
  {
    id: 1,
    url: 'https://twitter.com/netflix?lang=en',
  },
  {
    id: 2,
    url: 'https://www.instagram.com/netflix/',
  },
  {
    id: 3,
    url: 'https://www.youtube.com/channel/UCWOA1ZGywLbqmigxE4Qlvuw',
  },
]

const Footer = () => (
  <div className="footer-bg-container">
    <div>
      {socialMediaData.map(eachData => (
        <SocialIcon
          target="_blank"
          bgColor="transparent"
          fgColor="#ffffff"
          url={eachData.url}
          key={eachData.id}
        />
      ))}
    </div>
    <p>Contact Us</p>
  </div>
)

export default Footer
