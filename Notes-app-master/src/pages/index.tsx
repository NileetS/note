import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Card, { AddCard } from "~/components/card";
import { LoadingPage } from "~/components/loading";
// import Link from "next/link";

import { api } from "~/utils/api";
// import { type RouterOutputs } from "../utils/api";

const Home: NextPage = () => {
  const { user } = useUser();
  // const ctx = api.useContext();

  // const revalidate = async () => {
  //   await ctx.notes.invalidate();
  // };

  // const Create = api.notes.createNote.useMutation({
  //   onSuccess: revalidate,
  // });

  if (!user) return <div>Please Sign In</div>;

  const { data, isLoading, isError } = api.notes.getUserNotes.useQuery(
    {
      userId: user.id,
    },
    { refetchOnWindowFocus: false }
  );

  if (isLoading) return <LoadingPage />;
  if (!data || isError) return <div>Something Went Wrong</div>;

  return (
    <>
      <Head>
        <title>Notes</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-2 md:p-6">
        <div>{/* Search */}</div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AddCard userId={user.id} />
          {data.map((note) => (
            <Card key={note.id} data={note} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;

// TODO: Rename the app to NoteX
