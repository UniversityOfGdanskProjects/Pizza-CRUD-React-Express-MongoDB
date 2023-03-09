import {
  createSelector,
  createEntityAdapter
} from "@reduxjs/toolkit";

import { apiSlice } from "../api/api-slice";

const reportAdapter = createEntityAdapter({})

const initialState = reportAdapter.getInitialState()

export const reportApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
      getReport: builder.query({
          query: () => '/info',
          validateStatus: (response, result) => {
              return response.status === 200 && !result.isError
          },
          providesTags: (result, error, arg) => {
              if (result?.ids) {
                  return [
                      { type: 'Report', id: 'LIST' },
                      ...result.ids.map(id => ({ type: 'Report', id }))
                  ]
              } else return [{ type: 'Report', id: 'LIST' }]
          }
      }),
  }),
})

export const {
  useGetReportQuery,
} = reportApiSlice

export const selectReportResult = reportApiSlice.endpoints.getReport.select()

const selectReportData = createSelector(
  selectReportResult,
  reportResult => reportResult.data
)

export const {
  selectAll: selectAllReport,
  selectById: selectReportById,
  selectIds: selectReportIds
} = reportAdapter.getSelectors(state => selectReportData(state) ?? initialState)