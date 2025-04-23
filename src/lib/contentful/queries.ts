import { gql } from "graphql-request";

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    postsCollection(order: date_DESC, limit: 100) {
      items {
        title
        slug
        date
        dateTo
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
    postsCollection(where: { slug: $slug }, limit: 1) {
      items {
        title
        slug
        date
        dateTo
        showInNews
        description
        mainText
        address
        photo {
          url
        }
        tag
        speakersCollection {
          items {
            ... on Speakers {
              name
              photo {
                url
              }
            }
          }
        }
      }
    }
  }
`;


// export const GET_POST_BY_SLUG = gql`
//   query GetPostBySlug($slug: String!) {
//     postsCollection(where: { slug: $slug }, locale: "en-US") {
//       items {
//         title
//         slug
//         date
//         showInNews
//         description
//         mainText
//         address
//         photo {
//           url
//         }
//         tag
//         speakers {
//           ... on Speakers {
//             name
//             photo {
//               url
//             }
//             biography
//             researchInterests
//             googleScholarUrl
//             position
//             member
//             institution
//             country
//             nextJob
//             phdInstitution
//             slug
//             phdSupervisor
//             fellowship
//             universityPosition
//             universityLogo {
//               url
//             }
//           }
//         }
//       }
//     }
//   }
// `;

export const GET_HIGHLIGHTED_POSTS = gql`
  query GetHighlightedPosts {
    postsCollection(where: { showInNews: true }, order: date_DESC, limit: 100) {
      items {
        title
        slug
        date
        dateTo
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

export const GET_COLLABORATORS = gql`
  query GetCollaborators {
    speakersCollection {
      items {
        name
        photo {
          url
        }
        biography
        researchInterests
        googleScholarUrl
        position
        member
        institution
        country
        nextJob
        phdInstitution
        slug
        phdSupervisor
        fellowship
        universityPosition
        universityLogo {
          url
        }
      }
    }
  }
`;

export const GET_RESEARCHER_BY_SLUG = `
  query GetResearcherBySlug($slug: String!) {
    speakersCollection(where: { slug: $slug }, limit: 1) {
      items {
        name
        biography
        researchInterests
        googleScholarUrl
        position
        member
        institution
        country
        nextJob
        phdInstitution
        phdSupervisor
        fellowship
        universityPosition
        email
        slug
        universityLogo {
          url
        }
        photo {
          url
        }
      }
    }
  }
`;

export const GET_EVENTS_POSTS = gql`
  query GetEventsPosts {
    postsCollection(where: { tag_contains_some: ["Events"] }, order: date_DESC, limit: 100) {
      items {
        title
        slug
        date
        dateTo
        tag
        description
        photo {
          url
        }
      }
    }
  }
`;

export const GET_PAPERS_POSTS = gql`
  query GetPapersPosts {
    postsCollection(where: { tag_contains_some: ["Research"] }, order: date_DESC, limit: 100) {
      items {
        title
        slug
        date
        dateTo
        tag
        description
        photo {
          url
        }
      }
    }
  }
`;
