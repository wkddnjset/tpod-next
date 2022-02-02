import UserLayout from 'components/common/@Layout/UserLayout';

import Content from './_fragments/Content';

export function RoomContainer() {
  return <UserLayout content={<Content />} />;
}
