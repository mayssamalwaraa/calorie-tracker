import { Link, useParams } from "react-router-dom";
export function DetailPage() {
  const params = useParams();
  return (
    <p>
      This is detail of the id {params.recordId}
      <Link to=".." relative="path">
        Go back to Record List
      </Link>
    </p>
  );
}
