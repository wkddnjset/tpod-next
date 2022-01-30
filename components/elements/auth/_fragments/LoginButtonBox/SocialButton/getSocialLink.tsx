import { SocialType } from 'components/elements/home/types';

interface Props {
  name: string;
}
const getSocialLink = ({ kind, clientId }: SocialType & Props) => {
  const SOCIAL_REDIRECT_URL = `${window.location.origin}/social/callback`;
  switch (String(kind.toUpperCase())) {
    case 'KAKAO':
      return `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${SOCIAL_REDIRECT_URL}&state=kakao`;
    case 'NAVER':
      return `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${SOCIAL_REDIRECT_URL}&state=naver`;
    case 'FACEBOOK':
      return `https://www.facebook.com/v9.0/dialog/oauth?response_type=code&client_id=${clientId}&redirect_uri=${SOCIAL_REDIRECT_URL}&state=facebook`;
    case 'GOOGLE':
      return `https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?response_type=code&client_id=${clientId}&redirect_uri=${SOCIAL_REDIRECT_URL}&state=google&scope=openid`;
    case 'APPLE':
      return `https://appleid.apple.com/auth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${SOCIAL_REDIRECT_URL}&state=apple`;
    default:
      return '';
  }
};

export default getSocialLink;
