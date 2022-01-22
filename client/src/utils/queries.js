import { gql } from "@apollo/client";

export const QUERY_USER = gql`
    {
        user {
            username
            email
            songs {
                song_name
            }
            scores {
                points
                date_created
            }
        }
    }
`;
