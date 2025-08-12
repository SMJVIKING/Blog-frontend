import Empty from "@/ui/Empty";
import Table from "@/ui/Table";
import { getAllCommentsApi } from "@/services/commentService";
import CommentRow from "./CommentRow";

async function CommentsTable() {
  const { comments } = await getAllCommentsApi();
  
  if (!comments.length) return <Empty resourceName="کامنتی" />;

  return (
    <Table>
      <Table.Header>
            <th>#</th>
            <th>متن</th>
            <th>نویسنده</th>
            <th>تاریخ ایجاد</th>
            <th>وضعیت</th>
            <th>عملیات</th>
          </Table.Header>

          <Table.Body>
            {
              comments.map((comment,index)=>
               <CommentRow key={comment._id} comment={comment} index={index}/>
            )}
          </Table.Body>
    </Table>
  );
}
export default CommentsTable;
