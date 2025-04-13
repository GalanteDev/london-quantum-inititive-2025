import { gql } from "graphql-request";

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    postsCollection(order: date_DESC, limit: 100) {
      items {
        title
        slug
        date
        description
        tag
        photo {
          url
        }
      }
    }
  }
`;

export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: String!) {
    postsCollection(where: { slug: $slug }, locale: "en-US") {
      items {
        title
        slug
        date
        showInNews
        description
        mainText
        address
        photo {
          url
          title
          description
          width
          height
        }
        tag
        speakers {
          ... on Speakers {
            name
            biography
            universityUrl
            isFounder
            googleScholarUrl
            photo {
              url
            }
          }
        }
      }
    }
  }
`;


export const GET_HIGHLIGHTED_POSTS = gql`
  query GetHighlightedPosts {
    postsCollection(where: { showInNews: true }, order: date_DESC, limit: 100) {
      items {
        title
        slug
        date
        tag
        showInNews
        description
        photo {
          url
        }
      }
    }
  }
`;
