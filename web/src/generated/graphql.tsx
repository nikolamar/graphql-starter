import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  helloWorld: Scalars['String'];
  hotels: PaginatedHotels;
  hotel?: Maybe<Hotel>;
  images: PaginatedImages;
  test: Scalars['Boolean'];
  profiles: PaginatedProfiles;
  reviews: PaginatedReviews;
  review?: Maybe<Review>;
  users: PaginatedUsers;
  user?: Maybe<User>;
  me?: Maybe<User>;
};


export type QueryHotelsArgs = {
  order?: Maybe<Scalars['String']>;
  cursor?: Maybe<Scalars['Timestamp']>;
  limit: Scalars['Int'];
};


export type QueryHotelArgs = {
  id: Scalars['Int'];
};


export type QueryImagesArgs = {
  order?: Maybe<Scalars['String']>;
  cursor?: Maybe<Scalars['Timestamp']>;
  limit: Scalars['Int'];
};


export type QueryProfilesArgs = {
  order?: Maybe<Scalars['String']>;
  cursor?: Maybe<Scalars['Timestamp']>;
  limit: Scalars['Int'];
};


export type QueryReviewsArgs = {
  filter?: Maybe<ReviewFilterInput>;
  order?: Maybe<Scalars['String']>;
  cursor?: Maybe<Scalars['Timestamp']>;
  limit: Scalars['Int'];
};


export type QueryReviewArgs = {
  id: Scalars['Int'];
};


export type QueryUsersArgs = {
  order?: Maybe<Scalars['String']>;
  cursor?: Maybe<Scalars['Timestamp']>;
  limit: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type PaginatedHotels = {
  __typename?: 'PaginatedHotels';
  hotels: Array<Hotel>;
  hasMore: Scalars['Boolean'];
};

export type Hotel = {
  __typename?: 'Hotel';
  id: Scalars['Float'];
  name: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  description: Scalars['String'];
  location: Scalars['String'];
  stars: Scalars['Float'];
  price: Scalars['Float'];
  userId: Scalars['Float'];
  user: User;
  reviews: Array<Review>;
  imageId?: Maybe<Scalars['Float']>;
  createdAt: Scalars['Timestamp'];
  updatedAt: Scalars['Timestamp'];
  descriptionSnippet?: Maybe<Scalars['String']>;
  image?: Maybe<Image>;
  images: Array<Image>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  count: Scalars['Float'];
  type: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  profileId?: Maybe<Scalars['Float']>;
  imageId?: Maybe<Scalars['Float']>;
  createdAt: Scalars['Timestamp'];
  updatedAt: Scalars['Timestamp'];
  profile: Profile;
  images: Array<Image>;
  image?: Maybe<Image>;
};


export type Profile = {
  __typename?: 'Profile';
  id?: Maybe<Scalars['Float']>;
  gender?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  birthDate?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  createdAt: Scalars['Timestamp'];
  updatedAt: Scalars['Timestamp'];
  fullName?: Maybe<Scalars['String']>;
};

export type Image = {
  __typename?: 'Image';
  id: Scalars['Float'];
  url?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['Float']>;
  user: User;
  hotelId?: Maybe<Scalars['Float']>;
  hotel: Hotel;
  createdAt: Scalars['Timestamp'];
  updatedAt: Scalars['Timestamp'];
};

export type Review = {
  __typename?: 'Review';
  id: Scalars['Float'];
  message: Scalars['String'];
  likes: Scalars['Float'];
  dislikes: Scalars['Float'];
  voteStatus?: Maybe<Scalars['Int']>;
  hotelId: Scalars['Float'];
  createdAt: Scalars['Timestamp'];
  updatedAt: Scalars['Timestamp'];
};

export type PaginatedImages = {
  __typename?: 'PaginatedImages';
  images: Array<Image>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedProfiles = {
  __typename?: 'PaginatedProfiles';
  profiles: Array<Profile>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedReviews = {
  __typename?: 'PaginatedReviews';
  reviews: Array<Review>;
  hasMore: Scalars['Boolean'];
};

export type ReviewFilterInput = {
  hotelId?: Maybe<Scalars['Int']>;
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  users: Array<User>;
  hasMore: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createHotel: Hotel;
  updateHotel?: Maybe<Hotel>;
  deleteHotel: Scalars['Boolean'];
  createImage: Image;
  deleteImage: Scalars['Boolean'];
  createProfile: Profile;
  updateProfile?: Maybe<Profile>;
  deleteProfile: Scalars['Boolean'];
  createReview: Review;
  updateReview?: Maybe<Review>;
  deleteReview: Scalars['Boolean'];
  vote: Scalars['Boolean'];
  imageUpload: ImageUrl;
  deleteUser: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  forgotPassword: UserResponse;
  changePassword: UserResponse;
};


export type MutationCreateHotelArgs = {
  input: HotelInput;
};


export type MutationUpdateHotelArgs = {
  input: HotelUpdateInput;
  id: Scalars['Int'];
};


export type MutationDeleteHotelArgs = {
  id: Scalars['Int'];
};


export type MutationCreateImageArgs = {
  url: Scalars['String'];
};


export type MutationDeleteImageArgs = {
  id: Scalars['Int'];
};


export type MutationCreateProfileArgs = {
  input: ProfileInput;
};


export type MutationUpdateProfileArgs = {
  input: ProfileInput;
  id: Scalars['Int'];
};


export type MutationDeleteProfileArgs = {
  id: Scalars['Int'];
};


export type MutationCreateReviewArgs = {
  message: Scalars['String'];
  hotelId: Scalars['Int'];
};


export type MutationUpdateReviewArgs = {
  message: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationDeleteReviewArgs = {
  id: Scalars['Int'];
};


export type MutationVoteArgs = {
  reviewId: Scalars['Int'];
  value: Scalars['Int'];
};


export type MutationImageUploadArgs = {
  file: Scalars['Upload'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationForgotPasswordArgs = {
  usernameoremail: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newpassword: Scalars['String'];
  token: Scalars['String'];
};

export type HotelInput = {
  name: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  location: Scalars['String'];
  stars?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['Int']>;
};

export type HotelUpdateInput = {
  name?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  stars?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['Int']>;
};

export type ProfileInput = {
  gender?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  birthDate?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

export type ImageUrl = {
  __typename?: 'ImageUrl';
  url: Scalars['String'];
};


export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginInput = {
  usernameoremail: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};

export type ErrorSnippetFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type HotelSnippetFragment = (
  { __typename?: 'Hotel' }
  & Pick<Hotel, 'id' | 'name' | 'city' | 'country' | 'stars' | 'description' | 'descriptionSnippet' | 'price' | 'location' | 'createdAt' | 'userId'>
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ), image?: Maybe<(
    { __typename?: 'Image' }
    & Pick<Image, 'id' | 'url'>
  )>, images: Array<(
    { __typename?: 'Image' }
    & Pick<Image, 'id' | 'url'>
  )> }
);

export type ProfileSnippetFragment = (
  { __typename?: 'Profile' }
  & Pick<Profile, 'id' | 'gender' | 'fullName' | 'firstName' | 'middleName' | 'lastName' | 'city' | 'country' | 'birthDate' | 'phone'>
);

export type ReviewSnippetFragment = (
  { __typename?: 'Review' }
  & Pick<Review, 'id' | 'message' | 'likes' | 'dislikes' | 'voteStatus' | 'hotelId' | 'createdAt'>
);

export type UserImagesSnippetFragment = (
  { __typename?: 'User' }
  & { image?: Maybe<(
    { __typename?: 'Image' }
    & Pick<Image, 'id' | 'url'>
  )>, images: Array<(
    { __typename?: 'Image' }
    & Pick<Image, 'id' | 'url'>
  )> }
);

export type UserProfileSnippetFragment = (
  { __typename?: 'User' }
  & { profile: (
    { __typename?: 'Profile' }
    & Pick<Profile, 'id' | 'gender' | 'firstName' | 'middleName' | 'lastName' | 'fullName' | 'city' | 'country' | 'birthDate' | 'phone'>
  ) }
);

export type UserResponseSnippetFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & ErrorSnippetFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & UserSnippetFragment
    & UserProfileSnippetFragment
    & UserImagesSnippetFragment
  )> }
);

export type UserSnippetFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'email' | 'username' | 'createdAt'>
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newpassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & UserResponseSnippetFragment
  ) }
);

export type CreateHotelMutationVariables = Exact<{
  name: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  description: Scalars['String'];
  image: Scalars['String'];
  location: Scalars['String'];
  stars: Scalars['Int'];
  price: Scalars['Int'];
}>;


export type CreateHotelMutation = (
  { __typename?: 'Mutation' }
  & { createHotel: (
    { __typename?: 'Hotel' }
    & HotelSnippetFragment
  ) }
);

export type CreateReviewMutationVariables = Exact<{
  hotelId: Scalars['Int'];
  message: Scalars['String'];
}>;


export type CreateReviewMutation = (
  { __typename?: 'Mutation' }
  & { createReview: (
    { __typename?: 'Review' }
    & ReviewSnippetFragment
  ) }
);

export type DeleteHotelMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteHotelMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteHotel'>
);

export type ForgotPasswordMutationVariables = Exact<{
  usernameoremail: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & { forgotPassword: (
    { __typename?: 'UserResponse' }
    & UserResponseSnippetFragment
  ) }
);

export type ImageUploadMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type ImageUploadMutation = (
  { __typename?: 'Mutation' }
  & { imageUpload: (
    { __typename?: 'ImageUrl' }
    & Pick<ImageUrl, 'url'>
  ) }
);

export type LoginMutationVariables = Exact<{
  usernameoremail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & UserResponseSnippetFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & UserResponseSnippetFragment
  ) }
);

export type UpdateHotelMutationVariables = Exact<{
  id: Scalars['Int'];
  name: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  description: Scalars['String'];
  image: Scalars['String'];
  location: Scalars['String'];
  stars: Scalars['Int'];
  price: Scalars['Int'];
}>;


export type UpdateHotelMutation = (
  { __typename?: 'Mutation' }
  & { updateHotel?: Maybe<(
    { __typename?: 'Hotel' }
    & HotelSnippetFragment
  )> }
);

export type UpdateProfileMutationVariables = Exact<{
  id: Scalars['Int'];
  gender: Scalars['String'];
  firstName: Scalars['String'];
  middleName: Scalars['String'];
  lastName: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  birthDate: Scalars['String'];
  phone: Scalars['String'];
}>;


export type UpdateProfileMutation = (
  { __typename?: 'Mutation' }
  & { updateProfile?: Maybe<(
    { __typename?: 'Profile' }
    & ProfileSnippetFragment
  )> }
);

export type VoteMutationVariables = Exact<{
  reviewId: Scalars['Int'];
  value: Scalars['Int'];
}>;


export type VoteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'vote'>
);

export type HotelQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type HotelQuery = (
  { __typename?: 'Query' }
  & { hotel?: Maybe<(
    { __typename?: 'Hotel' }
    & HotelSnippetFragment
  )> }
);

export type HotelsQueryVariables = Exact<{
  limit: Scalars['Int'];
  order?: Maybe<Scalars['String']>;
  cursor?: Maybe<Scalars['Timestamp']>;
}>;


export type HotelsQuery = (
  { __typename?: 'Query' }
  & { hotels: (
    { __typename?: 'PaginatedHotels' }
    & Pick<PaginatedHotels, 'hasMore'>
    & { hotels: Array<(
      { __typename?: 'Hotel' }
      & HotelSnippetFragment
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & UserSnippetFragment
    & UserProfileSnippetFragment
    & UserImagesSnippetFragment
  )> }
);

export type ReviewsQueryVariables = Exact<{
  limit: Scalars['Int'];
  order?: Maybe<Scalars['String']>;
  cursor?: Maybe<Scalars['Timestamp']>;
  hotelId?: Maybe<Scalars['Int']>;
}>;


export type ReviewsQuery = (
  { __typename?: 'Query' }
  & { reviews: (
    { __typename?: 'PaginatedReviews' }
    & Pick<PaginatedReviews, 'hasMore'>
    & { reviews: Array<(
      { __typename?: 'Review' }
      & ReviewSnippetFragment
    )> }
  ) }
);

export type UsersQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['Timestamp']>;
}>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: (
    { __typename?: 'PaginatedUsers' }
    & Pick<PaginatedUsers, 'hasMore'>
    & { users: Array<(
      { __typename?: 'User' }
      & UserSnippetFragment
    )> }
  ) }
);

export const HotelSnippetFragmentDoc = gql`
    fragment HotelSnippet on Hotel {
  id
  name
  city
  country
  stars
  description
  descriptionSnippet
  price
  location
  createdAt
  userId
  user {
    id
    username
  }
  image {
    id
    url
  }
  images {
    id
    url
  }
}
    `;
export const ProfileSnippetFragmentDoc = gql`
    fragment ProfileSnippet on Profile {
  id
  gender
  fullName
  firstName
  middleName
  lastName
  fullName
  city
  country
  birthDate
  phone
}
    `;
export const ReviewSnippetFragmentDoc = gql`
    fragment ReviewSnippet on Review {
  id
  message
  likes
  dislikes
  voteStatus
  hotelId
  createdAt
}
    `;
export const ErrorSnippetFragmentDoc = gql`
    fragment ErrorSnippet on FieldError {
  field
  message
}
    `;
export const UserSnippetFragmentDoc = gql`
    fragment UserSnippet on User {
  id
  email
  username
  createdAt
}
    `;
export const UserProfileSnippetFragmentDoc = gql`
    fragment UserProfileSnippet on User {
  profile {
    id
    gender
    firstName
    middleName
    lastName
    fullName
    city
    country
    birthDate
    phone
  }
}
    `;
export const UserImagesSnippetFragmentDoc = gql`
    fragment UserImagesSnippet on User {
  image {
    id
    url
  }
  images {
    id
    url
  }
}
    `;
export const UserResponseSnippetFragmentDoc = gql`
    fragment UserResponseSnippet on UserResponse {
  errors {
    ...ErrorSnippet
  }
  user {
    ...UserSnippet
    ...UserProfileSnippet
    ...UserImagesSnippet
  }
}
    ${ErrorSnippetFragmentDoc}
${UserSnippetFragmentDoc}
${UserProfileSnippetFragmentDoc}
${UserImagesSnippetFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newpassword: String!) {
  changePassword(token: $token, newpassword: $newpassword) {
    ...UserResponseSnippet
  }
}
    ${UserResponseSnippetFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newpassword: // value for 'newpassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateHotelDocument = gql`
    mutation CreateHotel($name: String!, $city: String!, $country: String!, $description: String!, $image: String!, $location: String!, $stars: Int!, $price: Int!) {
  createHotel(
    input: {name: $name, city: $city, country: $country, description: $description, image: $image, location: $location, stars: $stars, price: $price}
  ) {
    ...HotelSnippet
  }
}
    ${HotelSnippetFragmentDoc}`;
export type CreateHotelMutationFn = Apollo.MutationFunction<CreateHotelMutation, CreateHotelMutationVariables>;

/**
 * __useCreateHotelMutation__
 *
 * To run a mutation, you first call `useCreateHotelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateHotelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createHotelMutation, { data, loading, error }] = useCreateHotelMutation({
 *   variables: {
 *      name: // value for 'name'
 *      city: // value for 'city'
 *      country: // value for 'country'
 *      description: // value for 'description'
 *      image: // value for 'image'
 *      location: // value for 'location'
 *      stars: // value for 'stars'
 *      price: // value for 'price'
 *   },
 * });
 */
export function useCreateHotelMutation(baseOptions?: Apollo.MutationHookOptions<CreateHotelMutation, CreateHotelMutationVariables>) {
        return Apollo.useMutation<CreateHotelMutation, CreateHotelMutationVariables>(CreateHotelDocument, baseOptions);
      }
export type CreateHotelMutationHookResult = ReturnType<typeof useCreateHotelMutation>;
export type CreateHotelMutationResult = Apollo.MutationResult<CreateHotelMutation>;
export type CreateHotelMutationOptions = Apollo.BaseMutationOptions<CreateHotelMutation, CreateHotelMutationVariables>;
export const CreateReviewDocument = gql`
    mutation CreateReview($hotelId: Int!, $message: String!) {
  createReview(hotelId: $hotelId, message: $message) {
    ...ReviewSnippet
  }
}
    ${ReviewSnippetFragmentDoc}`;
export type CreateReviewMutationFn = Apollo.MutationFunction<CreateReviewMutation, CreateReviewMutationVariables>;

/**
 * __useCreateReviewMutation__
 *
 * To run a mutation, you first call `useCreateReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReviewMutation, { data, loading, error }] = useCreateReviewMutation({
 *   variables: {
 *      hotelId: // value for 'hotelId'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useCreateReviewMutation(baseOptions?: Apollo.MutationHookOptions<CreateReviewMutation, CreateReviewMutationVariables>) {
        return Apollo.useMutation<CreateReviewMutation, CreateReviewMutationVariables>(CreateReviewDocument, baseOptions);
      }
export type CreateReviewMutationHookResult = ReturnType<typeof useCreateReviewMutation>;
export type CreateReviewMutationResult = Apollo.MutationResult<CreateReviewMutation>;
export type CreateReviewMutationOptions = Apollo.BaseMutationOptions<CreateReviewMutation, CreateReviewMutationVariables>;
export const DeleteHotelDocument = gql`
    mutation DeleteHotel($id: Int!) {
  deleteHotel(id: $id)
}
    `;
export type DeleteHotelMutationFn = Apollo.MutationFunction<DeleteHotelMutation, DeleteHotelMutationVariables>;

/**
 * __useDeleteHotelMutation__
 *
 * To run a mutation, you first call `useDeleteHotelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteHotelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteHotelMutation, { data, loading, error }] = useDeleteHotelMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteHotelMutation(baseOptions?: Apollo.MutationHookOptions<DeleteHotelMutation, DeleteHotelMutationVariables>) {
        return Apollo.useMutation<DeleteHotelMutation, DeleteHotelMutationVariables>(DeleteHotelDocument, baseOptions);
      }
export type DeleteHotelMutationHookResult = ReturnType<typeof useDeleteHotelMutation>;
export type DeleteHotelMutationResult = Apollo.MutationResult<DeleteHotelMutation>;
export type DeleteHotelMutationOptions = Apollo.BaseMutationOptions<DeleteHotelMutation, DeleteHotelMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($usernameoremail: String!) {
  forgotPassword(usernameoremail: $usernameoremail) {
    ...UserResponseSnippet
  }
}
    ${UserResponseSnippetFragmentDoc}`;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      usernameoremail: // value for 'usernameoremail'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const ImageUploadDocument = gql`
    mutation ImageUpload($file: Upload!) {
  imageUpload(file: $file) {
    url
  }
}
    `;
export type ImageUploadMutationFn = Apollo.MutationFunction<ImageUploadMutation, ImageUploadMutationVariables>;

/**
 * __useImageUploadMutation__
 *
 * To run a mutation, you first call `useImageUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useImageUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [imageUploadMutation, { data, loading, error }] = useImageUploadMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useImageUploadMutation(baseOptions?: Apollo.MutationHookOptions<ImageUploadMutation, ImageUploadMutationVariables>) {
        return Apollo.useMutation<ImageUploadMutation, ImageUploadMutationVariables>(ImageUploadDocument, baseOptions);
      }
export type ImageUploadMutationHookResult = ReturnType<typeof useImageUploadMutation>;
export type ImageUploadMutationResult = Apollo.MutationResult<ImageUploadMutation>;
export type ImageUploadMutationOptions = Apollo.BaseMutationOptions<ImageUploadMutation, ImageUploadMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameoremail: String!, $password: String!) {
  login(input: {usernameoremail: $usernameoremail, password: $password}) {
    ...UserResponseSnippet
  }
}
    ${UserResponseSnippetFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameoremail: // value for 'usernameoremail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!, $email: String!) {
  register(input: {username: $username, password: $password, email: $email}) {
    ...UserResponseSnippet
  }
}
    ${UserResponseSnippetFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdateHotelDocument = gql`
    mutation UpdateHotel($id: Int!, $name: String!, $city: String!, $country: String!, $description: String!, $image: String!, $location: String!, $stars: Int!, $price: Int!) {
  updateHotel(
    id: $id
    input: {name: $name, city: $city, country: $country, description: $description, image: $image, location: $location, stars: $stars, price: $price}
  ) {
    ...HotelSnippet
  }
}
    ${HotelSnippetFragmentDoc}`;
export type UpdateHotelMutationFn = Apollo.MutationFunction<UpdateHotelMutation, UpdateHotelMutationVariables>;

/**
 * __useUpdateHotelMutation__
 *
 * To run a mutation, you first call `useUpdateHotelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateHotelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateHotelMutation, { data, loading, error }] = useUpdateHotelMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      city: // value for 'city'
 *      country: // value for 'country'
 *      description: // value for 'description'
 *      image: // value for 'image'
 *      location: // value for 'location'
 *      stars: // value for 'stars'
 *      price: // value for 'price'
 *   },
 * });
 */
export function useUpdateHotelMutation(baseOptions?: Apollo.MutationHookOptions<UpdateHotelMutation, UpdateHotelMutationVariables>) {
        return Apollo.useMutation<UpdateHotelMutation, UpdateHotelMutationVariables>(UpdateHotelDocument, baseOptions);
      }
export type UpdateHotelMutationHookResult = ReturnType<typeof useUpdateHotelMutation>;
export type UpdateHotelMutationResult = Apollo.MutationResult<UpdateHotelMutation>;
export type UpdateHotelMutationOptions = Apollo.BaseMutationOptions<UpdateHotelMutation, UpdateHotelMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($id: Int!, $gender: String!, $firstName: String!, $middleName: String!, $lastName: String!, $city: String!, $country: String!, $birthDate: String!, $phone: String!) {
  updateProfile(
    id: $id
    input: {gender: $gender, firstName: $firstName, middleName: $middleName, lastName: $lastName, city: $city, country: $country, birthDate: $birthDate, phone: $phone}
  ) {
    ...ProfileSnippet
  }
}
    ${ProfileSnippetFragmentDoc}`;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      id: // value for 'id'
 *      gender: // value for 'gender'
 *      firstName: // value for 'firstName'
 *      middleName: // value for 'middleName'
 *      lastName: // value for 'lastName'
 *      city: // value for 'city'
 *      country: // value for 'country'
 *      birthDate: // value for 'birthDate'
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, baseOptions);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const VoteDocument = gql`
    mutation Vote($reviewId: Int!, $value: Int!) {
  vote(reviewId: $reviewId, value: $value)
}
    `;
export type VoteMutationFn = Apollo.MutationFunction<VoteMutation, VoteMutationVariables>;

/**
 * __useVoteMutation__
 *
 * To run a mutation, you first call `useVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutation, { data, loading, error }] = useVoteMutation({
 *   variables: {
 *      reviewId: // value for 'reviewId'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useVoteMutation(baseOptions?: Apollo.MutationHookOptions<VoteMutation, VoteMutationVariables>) {
        return Apollo.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument, baseOptions);
      }
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = Apollo.MutationResult<VoteMutation>;
export type VoteMutationOptions = Apollo.BaseMutationOptions<VoteMutation, VoteMutationVariables>;
export const HotelDocument = gql`
    query Hotel($id: Int!) {
  hotel(id: $id) {
    ...HotelSnippet
  }
}
    ${HotelSnippetFragmentDoc}`;

/**
 * __useHotelQuery__
 *
 * To run a query within a React component, call `useHotelQuery` and pass it any options that fit your needs.
 * When your component renders, `useHotelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHotelQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useHotelQuery(baseOptions: Apollo.QueryHookOptions<HotelQuery, HotelQueryVariables>) {
        return Apollo.useQuery<HotelQuery, HotelQueryVariables>(HotelDocument, baseOptions);
      }
export function useHotelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HotelQuery, HotelQueryVariables>) {
          return Apollo.useLazyQuery<HotelQuery, HotelQueryVariables>(HotelDocument, baseOptions);
        }
export type HotelQueryHookResult = ReturnType<typeof useHotelQuery>;
export type HotelLazyQueryHookResult = ReturnType<typeof useHotelLazyQuery>;
export type HotelQueryResult = Apollo.QueryResult<HotelQuery, HotelQueryVariables>;
export const HotelsDocument = gql`
    query Hotels($limit: Int!, $order: String, $cursor: Timestamp) {
  hotels(limit: $limit, order: $order, cursor: $cursor) {
    hasMore
    hotels {
      ...HotelSnippet
    }
  }
}
    ${HotelSnippetFragmentDoc}`;

/**
 * __useHotelsQuery__
 *
 * To run a query within a React component, call `useHotelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useHotelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHotelsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      order: // value for 'order'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useHotelsQuery(baseOptions: Apollo.QueryHookOptions<HotelsQuery, HotelsQueryVariables>) {
        return Apollo.useQuery<HotelsQuery, HotelsQueryVariables>(HotelsDocument, baseOptions);
      }
export function useHotelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HotelsQuery, HotelsQueryVariables>) {
          return Apollo.useLazyQuery<HotelsQuery, HotelsQueryVariables>(HotelsDocument, baseOptions);
        }
export type HotelsQueryHookResult = ReturnType<typeof useHotelsQuery>;
export type HotelsLazyQueryHookResult = ReturnType<typeof useHotelsLazyQuery>;
export type HotelsQueryResult = Apollo.QueryResult<HotelsQuery, HotelsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...UserSnippet
    ...UserProfileSnippet
    ...UserImagesSnippet
  }
}
    ${UserSnippetFragmentDoc}
${UserProfileSnippetFragmentDoc}
${UserImagesSnippetFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const ReviewsDocument = gql`
    query Reviews($limit: Int!, $order: String, $cursor: Timestamp, $hotelId: Int) {
  reviews(
    limit: $limit
    order: $order
    cursor: $cursor
    filter: {hotelId: $hotelId}
  ) {
    hasMore
    reviews {
      ...ReviewSnippet
    }
  }
}
    ${ReviewSnippetFragmentDoc}`;

/**
 * __useReviewsQuery__
 *
 * To run a query within a React component, call `useReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReviewsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      order: // value for 'order'
 *      cursor: // value for 'cursor'
 *      hotelId: // value for 'hotelId'
 *   },
 * });
 */
export function useReviewsQuery(baseOptions: Apollo.QueryHookOptions<ReviewsQuery, ReviewsQueryVariables>) {
        return Apollo.useQuery<ReviewsQuery, ReviewsQueryVariables>(ReviewsDocument, baseOptions);
      }
export function useReviewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReviewsQuery, ReviewsQueryVariables>) {
          return Apollo.useLazyQuery<ReviewsQuery, ReviewsQueryVariables>(ReviewsDocument, baseOptions);
        }
export type ReviewsQueryHookResult = ReturnType<typeof useReviewsQuery>;
export type ReviewsLazyQueryHookResult = ReturnType<typeof useReviewsLazyQuery>;
export type ReviewsQueryResult = Apollo.QueryResult<ReviewsQuery, ReviewsQueryVariables>;
export const UsersDocument = gql`
    query Users($limit: Int!, $cursor: Timestamp) {
  users(limit: $limit, cursor: $cursor) {
    hasMore
    users {
      ...UserSnippet
    }
  }
}
    ${UserSnippetFragmentDoc}`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useUsersQuery(baseOptions: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;