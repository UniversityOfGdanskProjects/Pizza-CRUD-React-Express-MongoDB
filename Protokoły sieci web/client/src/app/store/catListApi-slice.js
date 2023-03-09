import {
  createSelector,
  createEntityAdapter
} from "@reduxjs/toolkit";

import { apiSlice } from "../api/api-slice";

const catsAdapter = createEntityAdapter({})

const initialState = catsAdapter.getInitialState()

export const catsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
      getCats: builder.query({
          query: () => '/cats',
          validateStatus: (response, result) => {
              return response.status === 200 && !result.isError
          },
          transformResponse: responseData => {
              const loadedCats = responseData.map(cat => {
                  cat.id = cat._id
                  return cat
              });
              return catsAdapter.setAll(initialState, loadedCats)
          },
          providesTags: (result, error, arg) => {
              if (result?.ids) {
                  return [
                      { type: 'Cat', id: 'LIST' },
                      ...result.ids.map(id => ({ type: 'Cat', id }))
                  ]
              } else return [{ type: 'Cat', id: 'LIST' }]
          }
      }),
      addNewCat: builder.mutation({
          query: initialCatData => ({
              url: '/cats',
              method: 'POST',
              body: {
                  ...initialCatData,
              }
          }),
          invalidatesTags: [
              { type: 'Cat', id: "LIST" }
          ]
      }),
      updateCat: builder.mutation({
          query: initialCatData => ({
              url: '/cats',
              method: 'PATCH',
              body: {
                  ...initialCatData,
              }
          }),
          invalidatesTags: (result, error, arg) => [
              { type: 'Cat', id: arg.id }
          ]
      }),
      deleteCat: builder.mutation({
          query: ({ id }) => ({
              url: `/cats`,
              method: 'DELETE',
              body: { id }
          }),
          invalidatesTags: (result, error, arg) => [
              { type: 'Cat', id: arg.id }
          ]
      }),
  }),
})

export const {
  useGetCatsQuery,
  useAddNewCatMutation,
  useUpdateCatMutation,
  useDeleteCatMutation,
} = catsApiSlice

export const selectCatsResult = catsApiSlice.endpoints.getCats.select()

const selectCatsData = createSelector(
  selectCatsResult,
  catsResult => catsResult.data
)

export const {
  selectAll: selectAllCats,
  selectById: selectCatById,
  selectIds: selectCatIds
} = catsAdapter.getSelectors(state => selectCatsData(state) ?? initialState)