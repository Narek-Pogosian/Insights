"use client";

import { useState } from "react";
import { api } from "@/trpc/react";

// Wrap the client components that uses useSuspenseQuery with HydrateClient
// and use void api.route.query.prefetch() in the parent server component.

export function Example() {
  const [latestPost] = api.example.getAllPosts.useSuspenseQuery(undefined, {});

  const utils = api.useUtils();
  const [name, setName] = useState("");

  const createPost = api.example.create.useMutation({
    onMutate: async () => {
      setName("");
    },
    // onSuccess: async () => {
    //   await utils.example.getAllPosts.invalidate();
    // },
  });

  const deletePost = api.example.deletePost.useMutation({
    onMutate: ({ id }) => {
      const previous = utils.example.getAllPosts.getData();

      utils.example.getAllPosts.setData(undefined, (data) => {
        return data?.filter((post) => post.id !== id);
      });

      return { previous };
    },
    onError: (err, _, ctx) => {
      utils.example.getAllPosts.setData(undefined, () => {
        return ctx?.previous;
      });
    },
  });

  const toggleComplete = api.example.toggleComplete.useMutation({
    // Keep toggle components seperate have a state that controls the isComplete, debounce when trying to update.
    onMutate: ({ id }) => {
      const previous = utils.example.getAllPosts.getData();
      utils.example.getAllPosts.setData(undefined, (data) => {
        return data?.map((post) =>
          post.id === id ? { ...post, isComplete: !post.isComplete } : post,
        );
      });
      return { previous };
    },
    onError: (err, _, ctx) => {
      utils.example.getAllPosts.setData(undefined, () => {
        return ctx?.previous;
      });
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    createPost.mutate({ name });
  }

  function handleToggleComplete(post: Post) {
    toggleComplete.mutate({
      id: post.id,
      isComplete: !post.isComplete,
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" disabled={createPost.isPending}>
          {createPost.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
      <ul>
        {latestPost.map((post) => (
          <li key={post.id}>
            <div>
              <input
                type="checkbox"
                id={post.id.toString()}
                checked={post.isComplete}
                onChange={() => handleToggleComplete(post)}
              />
              <label htmlFor={post.id.toString()}>{post.title}</label>
            </div>
            <button onClick={() => deletePost.mutate({ id: post.id })}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
