interface UserProfileType {
  params: {
    id: string;
  };
}

export default function UserProfile({ params }: UserProfileType) {
  const id = params.id;

  return <div>{id}</div>;
}
