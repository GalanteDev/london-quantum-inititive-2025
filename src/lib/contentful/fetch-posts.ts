import { Post } from "@/types"
import { client } from "./client"
import { GET_ALL_POSTS, GET_HIGHLIGHTED_POSTS, GET_POST_BY_SLUG } from "./queries"


export async function getAllPosts(): Promise<Post[]> {
  const res = await client.request<{ postsCollection: { items: Post[] } }>(GET_ALL_POSTS)
  return res.postsCollection.items
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const res = await client.request<{ postsCollection: { items: Post[] } }>(GET_POST_BY_SLUG, { slug })
  return res.postsCollection.items[0] || null
}

export async function fetchHighlightedEventsNews(limit = 6): Promise<Post[]> {
  const res = await client.request<{ postsCollection: { items: Post[] } }>(GET_HIGHLIGHTED_POSTS)

  return res.postsCollection.items.slice(0, limit)
}


