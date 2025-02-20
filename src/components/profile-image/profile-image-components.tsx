import styled from 'styled-components';
import DefaultImageUrl from '../../assets/images/user_profile.svg'

type ImageProps = {
    image?:string,
    size?:string
}
export const ProfileIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor:pointer;
  border:2px solid #fff;
  background-image:url(${DefaultImageUrl});
  ${({ image, size }: ImageProps) => {
    if (image && size === "large") {
      return `background-image:url(${image});
              width:50px;
              height:50px;`
    } else if (image) {
      return `background-image:url(${image});`
    } else if (size === "large") {
      return `width:50px;
              height:50px;`
    }
  }}
`