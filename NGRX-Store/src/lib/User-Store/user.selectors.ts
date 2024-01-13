import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USER_FEATURE_KEY, State, userAdapter } from './user.reducers';

export const getAccountState = createFeatureSelector<State>(USER_FEATURE_KEY);

const { selectAll, selectEntities } = userAdapter.getSelectors();


export const getLoggedUser = createSelector(
  getAccountState,
  (state: State) => state.loggedUser
);

export const getStatus = createSelector(
  getAccountState,
  (state: State) => state.status
)

export const getRegistrationStatus = createSelector(
  getAccountState,
  (state: State) => state.registrationStatus
)

export const getAllDoctors = createSelector(
  getAccountState,
  (state: State) => state.allDocs
);

export const getFilteredDoctors = createSelector(
  getAccountState,
  (state: State) => state.filteredDocs
);

export const getAccountError = createSelector(
  getAccountState,
  (state: State) => state.error
);

export const getAllUsers = createSelector(getAccountState, (state: State) =>
  selectAll(state)
);

export const getAccountEntities = createSelector(
  getAccountState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getAccountState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getAccountEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
