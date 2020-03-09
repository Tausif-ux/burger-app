import reducer from './auth';
import * as actionTypes from '../actions/actionTypes'

describe('authentication', () => {
    it('should return initial state when reducer called with no matched action', () => {
        expect(reducer(undefined, {})).toEqual(
            {
                token: null,
                userId: null,
                isLoading: false,
                error: null,
                authRedirectPath: '/'
            }
        );
    });

    it('should return initial state when reducer called with no matched action', () => {
        expect(reducer(
            {
                token: null,
                userId: null,
                isLoading: false,
                error: null,
                authRedirectPath: '/'
            }, 
            {
                type: actionTypes.AUTH_SUCCESS,
                token: 'some_token',
                userId: 'some_userId'

            })
        ).toEqual(
                {
                    token: 'some_token',
                    userId: 'some_userId',
                    isLoading: false,
                    error: null,
                    authRedirectPath: '/'
                }
        );
    });
});