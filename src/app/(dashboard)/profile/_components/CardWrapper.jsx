import { fetchCardData } from "@/services/data";
import Card from "./Card";

async function CardWrapper() { 
  const { numberOfUsers, numberOfPosts, numberOfComments } =
    await fetchCardData();

  return (
    <div className="grid gap-6 mb-8 md:grid-cols-3">
      <Card title="کاربران" value={numberOfUsers} type="users" />
      <Card title="پست ها" value={numberOfPosts} type="posts" />
      <Card title="نظرات" value={numberOfComments} type="comments" />
    </div>
  );
}

export default CardWrapper;
