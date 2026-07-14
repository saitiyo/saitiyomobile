import { gql } from "@apollo/client";

export const GET_SITE_TEAM_MEMBERS = gql`
  query GetSiteTeamMembers($siteId: ID!) {
    getSiteTeamMembers(siteId: $siteId) {
      id
      role
      status
      joinedAt

      user {
        id
        firstName
        lastName
      }
    }
  }
`;

export const GET_SUPPORT_TEAM_MEMBERS = gql`
  query GetSupportTeamMembers(
    $siteId: ID!
    $status: SupportMemberStatus
  ) {
    getSupportTeamMembers(
      siteId: $siteId
      status: $status
    ) {
      _id
      firstName
      lastName
      email
      mobileNumber
      status
      createdAt
    }
  }
`;

export const INVITE_TEAM_MEMBER = gql`
mutation InviteTeamMember(
    $siteId: ID!,
    $invitedByUserId: ID!,
    $invitedMobileNumber: String!
){

inviteTeamMember(

siteId:$siteId

invitedByUserId:$invitedByUserId

invitedMobileNumber:$invitedMobileNumber

){

success

message

}

}
`;