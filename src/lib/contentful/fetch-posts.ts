import { Post, Speaker } from "@/types";
import { client } from "./client";
import {
  GET_ALL_POSTS,
  GET_COLLABORATORS,
  GET_HIGHLIGHTED_POSTS,
  GET_POST_BY_SLUG,
  GET_RESEARCHER_BY_SLUG,
} from "./queries";

export async function getAllPosts(): Promise<Post[]> {
  const res = await client.request<{ postsCollection: { items: Post[] } }>(
    GET_ALL_POSTS
  );
  return res.postsCollection.items;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const res = await client.request<{ postsCollection: { items: Post[] } }>(
    GET_POST_BY_SLUG,
    { slug }
  );
  return res.postsCollection.items[0] || null;
}

export async function fetchHighlightedEventsNews(limit = 6): Promise<Post[]> {
  const res = await client.request<{ postsCollection: { items: Post[] } }>(
    GET_HIGHLIGHTED_POSTS
  );

  return res.postsCollection.items.slice(0, limit);
}

// export async function getCollaborators (): Promise<Speaker[]> {
//   const res = await client.request<{ speakersCollection: { items: Speaker[] } }>(GET_COLLABORATORS)
//   return res.speakersCollection.items
// }

export async function getCollaborators() {
  try {
    // Devolver directamente la respuesta de la API sin transformación
    // para que podamos manejar la estructura en el componente
    return await client.request<{ speakersCollection: { items: Speaker[] } }>(
      GET_COLLABORATORS
    );
  } catch (error) {
    console.error("Error fetching speakers:", error);
    return
  }
}

export async function getResearcherBySlug(slug: string): Promise<Speaker | null> {
  try {
    console.log("🎯 GraphQL FETCH with slug:", slug)

    const response = await client.request<{
      speakersCollection: {
        items: Speaker[];
      };
    }>(GET_RESEARCHER_BY_SLUG, { slug });

    console.log("📦 GraphQL Response:", JSON.stringify(response, null, 2))

    const researcher = response?.speakersCollection?.items?.[0];

    if (researcher) {
      if (!Array.isArray(researcher.position)) {
        researcher.position = researcher.position ? [researcher.position] : [];
      }
      return researcher;
    }

    return null;
  } catch (error) {
    console.error("❌ Error fetching researcher:", error);
    return null;
  }
}


