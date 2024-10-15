import { parsePrismaJson } from "@/lib/utils";
import { getLatestAnswers } from "@/server/data-access/form";
import CsvDownload from "./csv-download";

async function Answers({ id, title }: { id: string; title: string }) {
  const answers = await getLatestAnswers(id);

  if (answers.length === 0) {
    return <div className="text-foreground-muted">No answers</div>;
  }

  return (
    <>
      <CsvDownload surveyId={id} title={title} />
      <h3 className="mt-4 font-semibold">Latest answers</h3>
      <ul className="grid gap-8 md:grid-cols-2">
        {answers.map((a) => {
          const obj = parsePrismaJson(a.answers) as Record<string, string>;
          return (
            <li key={a.id} className="space-y-1">
              <p className="mb-3 text-sm text-foreground-muted">
                {a.createdAt.toLocaleDateString()}
              </p>
              {Object.entries(obj).map(([key, value]) => (
                <p key={key} className="text-sm">
                  <span className="mr-2 font-semibold">{key}:</span>
                  <span>{value}</span>
                </p>
              ))}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Answers;
